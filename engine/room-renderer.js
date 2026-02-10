import { events } from './events.js';
import { StateManager } from './state.js';

const roomEl = document.getElementById('room');
const bgEl = document.getElementById('room-background');
const entitiesEl = document.getElementById('room-entities');
const descEl = document.getElementById('room-description');

/** Currently loaded world data (set by world-loader) */
let worldData = null;

export const RoomRenderer = {
  setWorldData(data) {
    worldData = data;
  },

  getWorldData() {
    return worldData;
  },

  render(roomId) {
    if (!worldData) return;
    const room = worldData.world.rooms[roomId];
    if (!room) {
      console.error(`Room not found: ${roomId}`);
      return;
    }

    // Clear
    entitiesEl.innerHTML = '';
    this._clearExits();

    // Background
    if (room.backgroundCSS) {
      bgEl.style.background = room.backgroundCSS;
    } else {
      bgEl.style.background = 'linear-gradient(180deg, #1a1410 0%, #0d0d0d 100%)';
    }

    // Description
    descEl.textContent = room.description || '';
    descEl.style.animation = 'none';
    descEl.offsetHeight; // reflow
    descEl.style.animation = '';

    // NPCs
    if (room.npcs && worldData.npcs) {
      for (const npcId of room.npcs) {
        const npc = worldData.npcs.npcs[npcId];
        if (npc) this._renderNPC(npc);
      }
    }

    // Items - only show if not yet picked up
    if (room.items && worldData.items) {
      for (const itemId of room.items) {
        if (StateManager.hasItem(itemId)) continue;
        // Check if item was already picked up via flag
        if (StateManager.hasFlag(`picked-up-${itemId}`)) continue;
        const item = worldData.items.items[itemId];
        if (item) this._renderItem(item);
      }
    }

    // Exits
    this._renderExits(room.exits || {});
  },

  _renderNPC(npc) {
    // Check visibility conditions
    if (npc.visibleIf && !StateManager.hasFlag(npc.visibleIf)) return;
    if (npc.hiddenIf && StateManager.hasFlag(npc.hiddenIf)) return;

    const el = document.createElement('div');
    el.className = 'entity npc';
    el.style.left = `${npc.position.x}%`;
    el.style.top = `${npc.position.y}%`;
    el.dataset.npcId = npc.id;

    const spriteContent = npc.spriteSVG
      ? `<div class="entity-sprite entity-sprite-svg">${npc.spriteSVG}</div>`
      : `<div class="entity-sprite">${npc.sprite || '🧑'}</div>`;
    el.innerHTML = `
      ${spriteContent}
      <span class="entity-label">${npc.name}</span>
    `;

    el.addEventListener('click', () => {
      events.emit('npc:click', { npc, worldData });
    });

    entitiesEl.appendChild(el);
  },

  _renderItem(item) {
    const el = document.createElement('div');
    el.className = 'entity item';
    el.style.left = `${item.position.x}%`;
    el.style.top = `${item.position.y}%`;
    el.dataset.itemId = item.id;

    el.innerHTML = `
      <div class="entity-sprite">${item.sprite || '✨'}</div>
      <span class="entity-label">${item.name}</span>
    `;

    el.addEventListener('click', () => {
      events.emit('item:click', { item });
    });

    entitiesEl.appendChild(el);
  },

  _renderExits(exits) {
    const directionMap = { north: 'exit-north', south: 'exit-south', east: 'exit-east', west: 'exit-west' };
    const arrowMap = { north: '↑', south: '↓', east: '→', west: '←' };

    for (const [dir, exit] of Object.entries(exits)) {
      const slot = document.getElementById(directionMap[dir]);
      if (!slot) continue;

      const isLocked = exit.locked && exit.requiredFlag && !StateManager.hasFlag(exit.requiredFlag);

      const btn = document.createElement('button');
      btn.className = `exit-btn${isLocked ? ' locked' : ''}`;
      btn.innerHTML = `<span class="exit-arrow">${arrowMap[dir]}</span> ${exit.label}`;

      if (isLocked) {
        btn.title = 'Verschlossen';
        btn.addEventListener('click', () => {
          events.emit('notification:show', { text: '🔒 Dieser Weg ist verschlossen.' });
        });
      } else {
        btn.addEventListener('click', () => {
          events.emit('room:navigate', { target: exit.roomId, direction: dir });
        });
      }

      slot.appendChild(btn);
    }
  },

  _clearExits() {
    for (const id of ['exit-north', 'exit-south', 'exit-east', 'exit-west']) {
      document.getElementById(id).innerHTML = '';
    }
  },

  /** Remove a specific entity from the DOM */
  removeEntity(entityId) {
    const el = entitiesEl.querySelector(`[data-item-id="${entityId}"], [data-npc-id="${entityId}"]`);
    if (el) el.remove();
  },
};
