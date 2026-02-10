/**
 * Input handler: keyboard (WASD/arrows), click-to-move, interact (E/Space/Enter).
 */
export const Input = {
  /** @type {boolean} when true, all input is ignored (dialogue, menu, transition) */
  locked: false,

  /** @type {Function|null} (dir: 'up'|'down'|'left'|'right') => void */
  onDirectionKey: null,

  /** @type {Function|null} () => void */
  onInteract: null,

  /** @type {Function|null} (tileX: number, tileY: number) => void */
  onTileClick: null,

  /** @type {number|null} repeat timer for held keys */
  _repeatTimer: null,

  /** @type {string|null} currently held direction key */
  _heldKey: null,

  _keyRepeatDelay: 200,
  _keyRepeatInterval: 150,

  _boundKeyDown: null,
  _boundKeyUp: null,
  _boundClick: null,

  init(mapContainer) {
    this._boundKeyDown = (e) => this._handleKeyDown(e);
    this._boundKeyUp = (e) => this._handleKeyUp(e);
    this._boundClick = (e) => this._handleClick(e, mapContainer);

    document.addEventListener('keydown', this._boundKeyDown);
    document.addEventListener('keyup', this._boundKeyUp);
    if (mapContainer) {
      mapContainer.addEventListener('click', this._boundClick);
    }
  },

  destroy() {
    if (this._boundKeyDown) document.removeEventListener('keydown', this._boundKeyDown);
    if (this._boundKeyUp) document.removeEventListener('keyup', this._boundKeyUp);
    this._clearRepeat();
    this._boundKeyDown = null;
    this._boundKeyUp = null;
    this._boundClick = null;
  },

  lock() { this.locked = true; this._clearRepeat(); },
  unlock() { this.locked = false; },

  _handleKeyDown(e) {
    if (this.locked) return;

    const dir = this._keyToDir(e.key);
    if (dir) {
      e.preventDefault();
      // Only fire on initial press or if a different key
      if (this._heldKey !== e.key) {
        this._clearRepeat();
        this._heldKey = e.key;
        if (this.onDirectionKey) this.onDirectionKey(dir);
        // Start repeat after delay
        this._repeatTimer = setTimeout(() => {
          this._repeatTimer = setInterval(() => {
            if (this.locked) { this._clearRepeat(); return; }
            const d = this._keyToDir(this._heldKey);
            if (d && this.onDirectionKey) this.onDirectionKey(d);
          }, this._keyRepeatInterval);
        }, this._keyRepeatDelay);
      }
      return;
    }

    if (e.key === 'e' || e.key === 'E' || e.key === ' ' || e.key === 'Enter') {
      // Don't hijack Enter/Space when a UI button is focused
      if ((e.key === ' ' || e.key === 'Enter') && e.target.tagName === 'BUTTON') return;
      e.preventDefault();
      if (this.onInteract) this.onInteract();
    }
  },

  _handleKeyUp(e) {
    if (e.key === this._heldKey) {
      this._clearRepeat();
    }
  },

  _handleClick(e, mapContainer) {
    if (this.locked) return;
    if (!mapContainer) return;

    // Find the clicked tile element
    const tileEl = e.target.closest('.tile, .tile-entity');
    if (!tileEl) return;

    const tx = parseInt(tileEl.dataset.x);
    const ty = parseInt(tileEl.dataset.y);
    if (!isNaN(tx) && !isNaN(ty) && this.onTileClick) {
      this.onTileClick(tx, ty);
    }
  },

  _keyToDir(key) {
    switch (key) {
      case 'ArrowUp': case 'w': case 'W': return 'up';
      case 'ArrowDown': case 's': case 'S': return 'down';
      case 'ArrowLeft': case 'a': case 'A': return 'left';
      case 'ArrowRight': case 'd': case 'D': return 'right';
      default: return null;
    }
  },

  _clearRepeat() {
    if (this._repeatTimer) {
      clearTimeout(this._repeatTimer);
      clearInterval(this._repeatTimer);
      this._repeatTimer = null;
    }
    this._heldKey = null;
  },
};
