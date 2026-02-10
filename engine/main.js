import { events } from './events.js';
import { StateManager } from './state.js';
import { loadWorld, loadTheme, parseRoomRef } from './world-loader.js';
import { RoomRenderer } from './room-renderer.js';
import { TileMapRenderer } from './tile-map-renderer.js';
import { Player } from './player.js';
import { Input } from './input.js';
import { initHUD, updateHUD } from '../ui/hud.js';
import { curtainTransition, worldTransition } from '../ui/transition-ui.js';
import { initNotifications } from '../ui/notification-ui.js';
import { initDialogueUI } from '../ui/dialogue-ui.js';
import { initInventoryUI } from '../ui/inventory-ui.js';
import { InventorySystem } from './inventory-system.js';
import { QuestSystem } from './quest-system.js';
import { initQuestLogUI } from '../ui/quest-log-ui.js';
import { SaveSystem } from './save-system.js';
import { initMenuUI } from '../ui/menu-ui.js';

/** Currently loaded world data */
let currentWorldData = null;

/** Whether the current room uses tile mode */
let tileMode = false;

/** Pending spawnAt for next room */
let pendingSpawnAt = null;

async function boot() {
  // Init UI systems
  initHUD();
  initNotifications();
  initDialogueUI();
  initInventoryUI();
  initQuestLogUI();
  initMenuUI();

  // Init engine systems
  InventorySystem.init();
  QuestSystem.init();
  SaveSystem.init();

  // Handle room navigation (both old exit buttons and new tile exits)
  events.on('room:navigate', async ({ target, direction, spawnAt }) => {
    const { worldId, roomId } = parseRoomRef(target, StateManager.getCurrentWorld());
    pendingSpawnAt = spawnAt || null;

    // Cancel any ongoing player movement
    Player.cancelPath();
    Input.lock();

    const isWorldChange = worldId !== StateManager.getCurrentWorld();

    if (isWorldChange) {
      // Pre-load world data so we can get the name for the splash
      const targetData = await loadWorld(worldId);
      const worldName = targetData.world.name || worldId;

      await worldTransition({ name: worldName }, async () => {
        await enterWorld(worldId, roomId);
      });
    } else {
      await curtainTransition(async () => {
        StateManager.setCurrentRoom(roomId);
        renderCurrentRoom();
      });
    }

    Input.unlock();
  });

  // Tile-mode: NPC click (walk to adjacent, then interact)
  events.on('npc:tileclick', ({ npc, worldData, x, y }) => {
    if (Input.locked) return;
    const adj = isAdjacent(Player.position, { x, y });
    if (adj) {
      faceToward(Player.position, { x, y });
      TileMapRenderer.updatePlayerPosition(Player.position.x, Player.position.y, Player.facing);
      events.emit('npc:click', { npc, worldData });
    } else {
      // Walk to adjacent tile, then interact
      Player.startPath({ x, y }, TileMapRenderer.walkGrid, { adjacent: true });
      Player._pendingInteract = { type: 'npc', npc, worldData, x, y };
    }
  });

  // Tile-mode: Item click (walk to tile)
  events.on('item:tileclick', ({ item, x, y }) => {
    if (Input.locked) return;
    if (Player.position.x === x && Player.position.y === y) {
      events.emit('item:click', { item });
    } else {
      Player.startPath({ x, y }, TileMapRenderer.walkGrid);
    }
  });

  // Tile-mode: Exit tile click
  events.on('exit:tileclick', ({ exit }) => {
    if (Input.locked) return;
    const [tx, ty] = exit.tiles[0];
    if (Player.position.x === tx && Player.position.y === ty) {
      handleExitTile(exit);
    } else {
      Player.startPath({ x: tx, y: ty }, TileMapRenderer.walkGrid);
    }
  });

  // Lock input during dialogues
  events.on('dialogue:start', () => Input.lock());
  events.on('dialogue:end', () => Input.unlock());

  // Lock input during menu
  events.on('menu:toggle', () => {
    // Toggle — menu-ui handles its own state, we just sync input
    if (Input.locked) Input.unlock();
    else Input.lock();
  });

  // Setup player callbacks
  Player.onMove = (pos) => {
    if (tileMode) {
      StateManager.setPlayerPosition(pos);
      TileMapRenderer.updatePlayerPosition(pos.x, pos.y, Player.facing);
    }
  };

  Player.onTileEnter = (pos) => {
    if (!tileMode) return;
    const entity = TileMapRenderer.entityGrid[pos.y]?.[pos.x];
    if (!entity) return;

    if (entity.type === 'item') {
      events.emit('item:click', { item: entity.data });
      TileMapRenderer.removeItemEntity(entity.data.id);
    } else if (entity.type === 'exit') {
      handleExitTile(entity.data);
    }
  };

  // When path following ends, check for pending NPC interact
  const origFollowPath = Player._followPath.bind(Player);
  const checkPendingInteract = () => {
    if (!Player.isFollowingPath() && Player._pendingInteract) {
      const pending = Player._pendingInteract;
      Player._pendingInteract = null;
      if (pending.type === 'npc') {
        faceToward(Player.position, { x: pending.x, y: pending.y });
        TileMapRenderer.updatePlayerPosition(Player.position.x, Player.position.y, Player.facing);
        events.emit('npc:click', { npc: pending.npc, worldData: pending.worldData });
      }
    }
  };

  // Wrap the onMove to check after each step
  const origOnMove = Player.onMove;
  Player.onMove = (pos) => {
    if (origOnMove) origOnMove(pos);
    // Check after a tiny delay (path may have ended)
    setTimeout(checkPendingInteract, 10);
  };

  // Re-render when flags change (exits might unlock, NPCs might change)
  events.on('flag:set', () => {
    if (tileMode) {
      // Re-render the tile map to update exits/entities
      renderCurrentRoom();
    } else {
      renderCurrentRoom();
    }
  });

  // Try loading a save, otherwise start fresh
  const hasSave = SaveSystem.loadAutoSave();
  if (hasSave) {
    const s = StateManager.get();
    await enterWorld(s.currentWorld, s.currentRoom, true);
    events.emit('notification:show', { text: 'Spielstand geladen.' });
  } else {
    await enterWorld('lobby', 'main-hall');
  }
}

/**
 * Load a world and enter a room in it.
 */
async function enterWorld(worldId, roomId, skipStateUpdate = false) {
  const data = await loadWorld(worldId);
  currentWorldData = data;
  RoomRenderer.setWorldData(data);

  // Apply per-world player sprite
  TileMapRenderer.setPlayerSprite(data.world.playerSprite || null);

  if (!skipStateUpdate) {
    StateManager.setCurrentWorld(worldId);
    StateManager.setCurrentRoom(roomId || data.world.entryRoom);
  }

  renderCurrentRoom();
}

function renderCurrentRoom() {
  const roomId = StateManager.getCurrentRoom();
  const data = currentWorldData || RoomRenderer.getWorldData();
  if (!data) return;

  const room = data.world.rooms[roomId];
  if (!room) return;

  const roomEl = document.getElementById('room');

  if (room.map) {
    // === TILE MODE ===
    tileMode = true;
    roomEl.classList.add('tile-mode');

    // Load theme tiles and render
    loadTheme(room.map.theme).then(themeTiles => {
      // Merge base + theme tiles
      import('../assets/tiles/_base.js').then(baseMod => {
        const allTiles = { ...baseMod.tiles, ...themeTiles };
        TileMapRenderer.setTiles(allTiles);
        TileMapRenderer.clear();
        TileMapRenderer.render(room, data);

        // Determine player spawn position
        let spawnPos;
        if (pendingSpawnAt) {
          spawnPos = pendingSpawnAt;
          pendingSpawnAt = null;
        } else if (StateManager.getPlayerPosition()) {
          spawnPos = StateManager.getPlayerPosition();
        } else {
          spawnPos = room.map.playerSpawn || { x: 0, y: 0 };
        }

        Player.setPosition(spawnPos.x, spawnPos.y);
        StateManager.setPlayerPosition(spawnPos);
        TileMapRenderer.updatePlayerPosition(spawnPos.x, spawnPos.y, Player.facing);

        // Init input if not already
        if (!Input._boundKeyDown) {
          Input.init(document.getElementById('map-wrapper'));
        }

        // Wire input handlers
        Input.onDirectionKey = (dir) => {
          Player.cancelPath();
          Player.moveStep(dir, TileMapRenderer.walkGrid, TileMapRenderer.entityGrid);
        };

        Input.onTileClick = (tx, ty) => {
          const entity = TileMapRenderer.entityGrid[ty]?.[tx];
          if (entity?.type === 'npc') {
            events.emit('npc:tileclick', {
              npc: entity.data, worldData: entity.worldData,
              x: tx, y: ty
            });
            return;
          }
          if (entity?.type === 'item') {
            events.emit('item:tileclick', { item: entity.data, x: tx, y: ty });
            return;
          }
          if (entity?.type === 'exit' && !entity.locked) {
            events.emit('exit:tileclick', { exit: entity.data });
            return;
          }
          // Walk to the clicked tile
          Player.startPath({ x: tx, y: ty }, TileMapRenderer.walkGrid);
        };

        Input.onInteract = () => {
          const facingTile = Player.getFacingTile();
          const entity = TileMapRenderer.entityGrid[facingTile.y]?.[facingTile.x];
          if (entity?.type === 'npc') {
            events.emit('npc:click', { npc: entity.data, worldData: entity.worldData || data });
          }
        };
      });
    });

    // Update description
    const descEl = document.getElementById('room-description');
    descEl.textContent = room.description || '';
    descEl.style.animation = 'none';
    descEl.offsetHeight;
    descEl.style.animation = '';

  } else {
    // === CLASSIC MODE ===
    tileMode = false;
    roomEl.classList.remove('tile-mode');
    TileMapRenderer.hide();
    StateManager.setPlayerPosition(null);

    RoomRenderer.render(roomId);
  }

  updateHUD(data.world.name, room ? room.name : roomId);
}

function handleExitTile(exit) {
  const isLocked = exit.locked && exit.requiredFlag && !StateManager.hasFlag(exit.requiredFlag);
  if (isLocked) {
    events.emit('notification:show', { text: '🔒 Dieser Weg ist verschlossen.' });
    return;
  }

  events.emit('room:navigate', {
    target: exit.target,
    spawnAt: exit.spawnAt,
  });
}

function isAdjacent(a, b) {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return (dx + dy) === 1;
}

function faceToward(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    Player.facing = dx > 0 ? 'right' : 'left';
  } else {
    Player.facing = dy > 0 ? 'down' : 'up';
  }
}

// Export for menu-ui.js to use
export { renderCurrentRoom, enterWorld, currentWorldData, tileMode };

boot().catch(err => {
  console.error('Game boot failed:', err);
  document.body.innerHTML = `<div style="color:red;padding:2rem;font-family:monospace">Boot Error: ${err.message}</div>`;
});
