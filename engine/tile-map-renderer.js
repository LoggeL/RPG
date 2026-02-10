import { events } from './events.js';
import { StateManager } from './state.js';

const TILE_SIZE = 48;

/**
 * Renders a tile-based room using CSS Grid.
 * Manages camera, entity placement, exit labels, and player sprite.
 */
export const TileMapRenderer = {
  /** @type {object|null} merged tile registry (base + theme) */
  _tiles: null,

  /** @type {string|null} custom player SVG override (per-world) */
  _playerSVG: null,

  /** @type {HTMLElement|null} */
  _wrapper: null,
  _camera: null,
  _grid: null,
  _playerEl: null,
  _interactHint: null,

  /** @type {boolean[][]} walkability grid */
  walkGrid: [],

  /** @type {object} entityGrid[y][x] = { type: 'npc'|'item'|'exit', data } or null */
  entityGrid: [],

  /** @type {object} current map data */
  _mapData: null,

  /** @type {number} */
  _viewportW: 0,
  _viewportH: 0,

  /**
   * Set the tile registry (base + theme merged).
   */
  setTiles(tileRegistry) {
    this._tiles = tileRegistry;
  },

  /**
   * Set a custom player sprite SVG for the current world.
   * Pass null to revert to the default sprite.
   */
  setPlayerSprite(svg) {
    this._playerSVG = svg || null;
    if (this._playerEl) {
      this._playerEl.innerHTML = svg || this._createDefaultPlayerSVG();
    }
  },

  /**
   * Initialize DOM elements. Call once.
   */
  init() {
    const room = document.getElementById('room');

    // Create map wrapper
    this._wrapper = document.createElement('div');
    this._wrapper.id = 'map-wrapper';
    room.appendChild(this._wrapper);

    // Camera container
    this._camera = document.createElement('div');
    this._camera.id = 'map-camera';
    this._wrapper.appendChild(this._camera);

    // Tile grid
    this._grid = document.createElement('div');
    this._grid.id = 'tile-grid';
    this._camera.appendChild(this._grid);

    // Player sprite
    this._playerEl = document.createElement('div');
    this._playerEl.id = 'player';
    this._playerEl.innerHTML = this._playerSVG || this._createDefaultPlayerSVG();
    this._camera.appendChild(this._playerEl);

    // Interact hint
    this._interactHint = document.createElement('div');
    this._interactHint.className = 'interact-hint';
    this._camera.appendChild(this._interactHint);
  },

  /**
   * Render a tile map for the given room.
   * @param {object} room - room data with .map property
   * @param {object} worldData - full world data for NPC/item lookup
   */
  render(room, worldData) {
    if (!this._wrapper) this.init();
    if (!room.map) return;

    const map = room.map;
    this._mapData = map;
    const { width, height } = map;

    // Show wrapper, hide old renderer elements
    this._wrapper.style.display = '';

    // Configure grid
    this._grid.style.gridTemplateColumns = `repeat(${width}, ${TILE_SIZE}px)`;
    this._grid.style.gridTemplateRows = `repeat(${height}, ${TILE_SIZE}px)`;
    this._grid.innerHTML = '';

    // Build walkability & entity grids
    this.walkGrid = Array.from({ length: height }, () => Array(width).fill(true));
    this.entityGrid = Array.from({ length: height }, () => Array(width).fill(null));

    // Parse legend
    const legend = map.legend || {};

    // Render ground + object layers
    for (let y = 0; y < height; y++) {
      const groundRow = map.layers.ground[y] || '';
      const objectRow = (map.layers.objects && map.layers.objects[y]) || '';

      for (let x = 0; x < width; x++) {
        const groundChar = groundRow[x] || '.';
        const objectChar = objectRow[x] || '.';

        const groundTileId = legend[groundChar] || null;
        const objectTileId = objectChar !== '.' ? (legend[objectChar] || null) : null;

        const cell = document.createElement('div');
        cell.className = 'tile';
        cell.dataset.x = x;
        cell.dataset.y = y;

        // Ground tile
        if (groundTileId && this._tiles[groundTileId]) {
          cell.innerHTML = this._tiles[groundTileId];
        } else {
          cell.style.background = '#0d0d0d';
        }

        // Object overlay
        if (objectTileId && this._tiles[objectTileId]) {
          const objDiv = document.createElement('div');
          objDiv.className = 'tile-object';
          objDiv.innerHTML = this._tiles[objectTileId];
          cell.appendChild(objDiv);
        }

        // Wall tiles are not walkable
        if (this._isWallTile(groundTileId) || this._isWallTile(objectTileId)) {
          this.walkGrid[y][x] = false;
        }

        this._grid.appendChild(cell);
      }
    }

    // Place entities on the grid
    this._placeEntities(map, worldData);

    // Place exit labels
    this._placeExits(map);

    // Update viewport size
    const viewport = document.getElementById('viewport');
    this._viewportW = viewport.clientWidth;
    this._viewportH = viewport.clientHeight;
  },

  /**
   * Update player sprite position and camera.
   */
  updatePlayerPosition(x, y, facing) {
    if (!this._playerEl) return;

    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;

    this._playerEl.style.left = px + 'px';
    this._playerEl.style.top = py + 'px';

    // Facing direction
    this._playerEl.classList.toggle('face-left', facing === 'left');

    // Update camera to center on player
    this._updateCamera(x, y);

    // Update interact hint
    this._updateInteractHint(x, y, facing);
  },

  _updateCamera(px, py) {
    if (!this._camera || !this._mapData) return;

    const mapW = this._mapData.width * TILE_SIZE;
    const mapH = this._mapData.height * TILE_SIZE;

    // Center player in viewport
    const centerX = px * TILE_SIZE + TILE_SIZE / 2;
    const centerY = py * TILE_SIZE + TILE_SIZE / 2;

    let tx = this._viewportW / 2 - centerX;
    let ty = this._viewportH / 2 - centerY;

    // Clamp so we don't show beyond map edges
    tx = Math.min(0, Math.max(this._viewportW - mapW, tx));
    ty = Math.min(0, Math.max(this._viewportH - mapH, ty));

    // If map is smaller than viewport, center it
    if (mapW < this._viewportW) tx = (this._viewportW - mapW) / 2;
    if (mapH < this._viewportH) ty = (this._viewportH - mapH) / 2;

    this._camera.style.transform = `translate(${tx}px, ${ty}px)`;
  },

  _placeEntities(map, worldData) {
    if (!map.entities) return;

    // NPCs
    if (map.entities.npcs && worldData.npcs) {
      for (const [npcId, pos] of Object.entries(map.entities.npcs)) {
        const npc = worldData.npcs.npcs[npcId];
        if (!npc) continue;

        // Check visibility
        if (npc.visibleIf && !StateManager.hasFlag(npc.visibleIf)) continue;
        if (npc.hiddenIf && StateManager.hasFlag(npc.hiddenIf)) continue;

        // Mark tile as non-walkable (NPCs block movement)
        this.walkGrid[pos.y][pos.x] = false;
        this.entityGrid[pos.y][pos.x] = { type: 'npc', data: npc, worldData };

        const el = document.createElement('div');
        el.className = 'tile-entity npc';
        el.dataset.x = pos.x;
        el.dataset.y = pos.y;
        el.style.left = (pos.x * TILE_SIZE) + 'px';
        el.style.top = (pos.y * TILE_SIZE) + 'px';
        el.style.width = TILE_SIZE + 'px';
        el.style.height = TILE_SIZE + 'px';
        el.style.display = 'flex';
        el.style.justifyContent = 'center';
        const spriteContent = npc.spriteSVG
          ? `<div class="entity-sprite entity-sprite-svg">${npc.spriteSVG}</div>`
          : `<div class="entity-sprite">${npc.sprite || '🧑'}</div>`;
        el.innerHTML = `
          ${spriteContent}
          <span class="entity-label">${npc.name}</span>
        `;

        el.addEventListener('click', () => {
          events.emit('npc:tileclick', { npc, worldData, x: pos.x, y: pos.y });
        });

        this._camera.appendChild(el);
      }
    }

    // Items
    if (map.entities.items && worldData.items) {
      for (const [itemId, pos] of Object.entries(map.entities.items)) {
        if (StateManager.hasItem(itemId)) continue;
        if (StateManager.hasFlag(`picked-up-${itemId}`)) continue;

        const item = worldData.items.items[itemId];
        if (!item) continue;

        // Items are walkable (auto-pickup)
        this.entityGrid[pos.y][pos.x] = { type: 'item', data: item };

        const el = document.createElement('div');
        el.className = 'tile-entity item';
        el.dataset.x = pos.x;
        el.dataset.y = pos.y;
        el.dataset.itemId = itemId;
        el.style.left = (pos.x * TILE_SIZE) + 'px';
        el.style.top = (pos.y * TILE_SIZE) + 'px';
        el.style.width = TILE_SIZE + 'px';
        el.style.height = TILE_SIZE + 'px';
        el.style.display = 'flex';
        el.style.justifyContent = 'center';
        el.innerHTML = `
          <div class="entity-sprite">${item.sprite || '✨'}</div>
          <span class="entity-label">${item.name}</span>
        `;

        el.addEventListener('click', () => {
          events.emit('item:tileclick', { item, x: pos.x, y: pos.y });
        });

        this._camera.appendChild(el);
      }
    }
  },

  _placeExits(map) {
    if (!map.exits) return;

    for (const exit of map.exits) {
      const isLocked = exit.locked && exit.requiredFlag && !StateManager.hasFlag(exit.requiredFlag);

      // Mark exit tiles
      for (const [tx, ty] of exit.tiles) {
        this.entityGrid[ty][tx] = { type: 'exit', data: exit, locked: isLocked };

        // Exit tiles remain walkable (player walks onto them to trigger)
      }

      // Place a label at the first tile
      const [lx, ly] = exit.tiles[0];
      const label = document.createElement('div');
      label.className = `exit-label${isLocked ? ' locked' : ''}`;
      label.style.left = (lx * TILE_SIZE) + 'px';
      label.style.top = (ly * TILE_SIZE - 20) + 'px';
      label.innerHTML = isLocked
        ? `<span class="lock-icon">🔒</span> ${exit.label}`
        : exit.label;

      if (!isLocked) {
        label.addEventListener('click', () => {
          events.emit('exit:tileclick', { exit });
        });
      } else {
        label.addEventListener('click', () => {
          events.emit('notification:show', { text: '🔒 Dieser Weg ist verschlossen.' });
        });
      }

      this._camera.appendChild(label);
    }
  },

  _updateInteractHint(px, py, facing) {
    if (!this._interactHint) return;

    const deltas = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    const [dx, dy] = deltas[facing];
    const fx = px + dx;
    const fy = py + dy;

    // Check if there's an interactable NPC at the facing tile
    if (fy >= 0 && fy < this.entityGrid.length && fx >= 0 && fx < this.entityGrid[0].length) {
      const entity = this.entityGrid[fy][fx];
      if (entity && entity.type === 'npc') {
        this._interactHint.textContent = `E — ${entity.data.name}`;
        this._interactHint.style.left = (fx * TILE_SIZE + TILE_SIZE / 2) + 'px';
        this._interactHint.style.top = (fy * TILE_SIZE - 8) + 'px';
        this._interactHint.style.transform = 'translate(-50%, -100%)';
        this._interactHint.classList.add('visible');
        return;
      }
    }

    this._interactHint.classList.remove('visible');
  },

  /**
   * Remove an item entity from the map after pickup.
   */
  removeItemEntity(itemId) {
    const el = this._camera?.querySelector(`.tile-entity.item[data-item-id="${itemId}"]`);
    if (el) {
      const x = parseInt(el.dataset.x);
      const y = parseInt(el.dataset.y);
      if (this.entityGrid[y] && this.entityGrid[y][x]?.type === 'item') {
        this.entityGrid[y][x] = null;
      }
      el.remove();
    }
  },

  /**
   * Hide the tile map (when switching to a non-tile room).
   */
  hide() {
    if (this._wrapper) this._wrapper.style.display = 'none';
  },

  /**
   * Clean up all elements from camera (for re-render).
   */
  clear() {
    if (this._camera) {
      // Remove everything except grid and player
      const toRemove = this._camera.querySelectorAll('.tile-entity, .exit-label, .interact-hint');
      toRemove.forEach(el => el.remove());
      this._grid.innerHTML = '';
    }
    // Re-add interact hint
    if (this._camera && this._interactHint) {
      this._interactHint.classList.remove('visible');
      this._camera.appendChild(this._interactHint);
    }
  },

  _isWallTile(tileId) {
    if (!tileId) return false;
    return tileId.startsWith('wall') || tileId === 'column' || tileId === 'railing'
      || tileId === 'shelf' || tileId === 'crate' || tileId === 'old-piano'
      || tileId === 'bar-counter' || tileId === 'booth-seat' || tileId === 'workbench'
      || tileId === 'screen-wall' || tileId === 'server-rack' || tileId === 'crate-metal'
      || tileId === 'rubble-pile' || tileId === 'rust-beam' || tileId === 'vehicle-wreck'
      || tileId === 'tower-base' || tileId === 'tower-antenna' || tileId === 'console-panel';
  },

  _createDefaultPlayerSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <!-- Cape/Cloak -->
      <path d="M10 16 L8 36 L20 34 L32 36 L30 16 Z" fill="#4a1520" opacity="0.9"/>
      <path d="M10 16 L8 36 L20 34 L32 36 L30 16 Z" fill="none" stroke="#6a2530" stroke-width="0.5"/>
      <!-- Body -->
      <rect x="14" y="14" width="12" height="18" fill="#2a2040" rx="3"/>
      <!-- Head -->
      <circle cx="20" cy="11" r="6" fill="#e8c8a0"/>
      <!-- Hair -->
      <path d="M14 9 Q14 5 20 4 Q26 5 26 9 L26 8 Q26 4 20 3 Q14 4 14 8 Z" fill="#3a2010"/>
      <!-- Eyes -->
      <circle cx="18" cy="10.5" r="1" fill="#222"/>
      <circle cx="22" cy="10.5" r="1" fill="#222"/>
      <!-- Cape clasp (gold) -->
      <circle cx="20" cy="15" r="1.5" fill="#d4af37"/>
      <!-- Feet -->
      <rect x="14" y="32" width="5" height="4" fill="#2a1a10" rx="1"/>
      <rect x="21" y="32" width="5" height="4" fill="#2a1a10" rx="1"/>
    </svg>`;
  },
};
