import { findPath, findPathAdjacent } from './pathfinding.js';

/**
 * Player movement and collision logic.
 * Operates on tile coordinates. Does not touch the DOM.
 */
export const Player = {
  /** @type {{x:number, y:number}} */
  position: { x: 0, y: 0 },

  /** @type {{x:number,y:number}[]|null} current path being followed */
  _path: null,

  /** @type {number|null} */
  _pathTimer: null,

  /** @type {'down'|'up'|'left'|'right'} */
  facing: 'down',

  /** ms per tile step when following a path */
  stepInterval: 150,

  /** @type {Function|null} called on each step with {x,y} */
  onMove: null,

  /** @type {Function|null} called when stepping on an exit/item tile */
  onTileEnter: null,

  /**
   * Set position without triggering movement callbacks.
   */
  setPosition(x, y) {
    this.position = { x, y };
  },

  /**
   * Try to move one tile in a direction.
   * @param {'up'|'down'|'left'|'right'} dir
   * @param {boolean[][]} walkGrid
   * @param {object} entityGrid - entityGrid[y][x] = entity info or null
   * @returns {boolean} whether the move succeeded
   */
  moveStep(dir, walkGrid, entityGrid) {
    const deltas = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    const [dx, dy] = deltas[dir];
    this.facing = dir;

    const nx = this.position.x + dx;
    const ny = this.position.y + dy;

    if (!this._canWalk(nx, ny, walkGrid)) return false;

    this.position = { x: nx, y: ny };
    if (this.onMove) this.onMove({ x: nx, y: ny });
    if (this.onTileEnter) this.onTileEnter({ x: nx, y: ny });
    return true;
  },

  /**
   * Start following a BFS path to target tile.
   * @param {{x:number,y:number}} target
   * @param {boolean[][]} walkGrid
   * @param {object} [options]
   * @param {boolean} [options.adjacent] - path to adjacent tile instead (for NPC interaction)
   */
  startPath(target, walkGrid, options = {}) {
    this.cancelPath();

    const path = options.adjacent
      ? findPathAdjacent(walkGrid, this.position, target)
      : findPath(walkGrid, this.position, target);

    if (!path || path.length === 0) return false;

    this._path = path;
    this._pathIndex = 0;
    this._followPath();
    return true;
  },

  _followPath() {
    if (!this._path || this._pathIndex >= this._path.length) {
      this._path = null;
      return;
    }

    const next = this._path[this._pathIndex];

    // Determine facing direction
    const dx = next.x - this.position.x;
    const dy = next.y - this.position.y;
    if (dx > 0) this.facing = 'right';
    else if (dx < 0) this.facing = 'left';
    else if (dy > 0) this.facing = 'down';
    else if (dy < 0) this.facing = 'up';

    this.position = { x: next.x, y: next.y };
    this._pathIndex++;

    if (this.onMove) this.onMove({ x: next.x, y: next.y });
    if (this.onTileEnter) this.onTileEnter({ x: next.x, y: next.y });

    // If onTileEnter cancelled the path (e.g. exit triggered), stop
    if (!this._path) return;

    if (this._pathIndex < this._path.length) {
      this._pathTimer = setTimeout(() => this._followPath(), this.stepInterval);
    } else {
      this._path = null;
    }
  },

  cancelPath() {
    if (this._pathTimer) {
      clearTimeout(this._pathTimer);
      this._pathTimer = null;
    }
    this._path = null;
  },

  isFollowingPath() {
    return this._path !== null;
  },

  _canWalk(x, y, walkGrid) {
    if (y < 0 || y >= walkGrid.length) return false;
    if (x < 0 || x >= walkGrid[0].length) return false;
    return walkGrid[y][x];
  },

  /**
   * Get the tile the player is facing (for interact).
   */
  getFacingTile() {
    const deltas = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    const [dx, dy] = deltas[this.facing];
    return { x: this.position.x + dx, y: this.position.y + dy };
  },
};
