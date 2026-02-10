/**
 * BFS pathfinding on a 2D boolean walkability grid.
 * @param {boolean[][]} grid - grid[y][x] = true means walkable
 * @param {{x:number,y:number}} start
 * @param {{x:number,y:number}} goal
 * @returns {{x:number,y:number}[]|null} path from start (exclusive) to goal (inclusive), or null
 */
export function findPath(grid, start, goal) {
  const height = grid.length;
  const width = grid[0].length;

  if (start.x === goal.x && start.y === goal.y) return [];
  if (!inBounds(goal.x, goal.y, width, height)) return null;
  if (!grid[goal.y][goal.x]) return null;

  const key = (x, y) => y * width + x;
  const visited = new Set();
  visited.add(key(start.x, start.y));

  const queue = [{ x: start.x, y: start.y, path: [] }];
  const dirs = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  while (queue.length > 0) {
    const { x, y, path } = queue.shift();

    for (const { dx, dy } of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (!inBounds(nx, ny, width, height)) continue;
      if (!grid[ny][nx]) continue;

      const k = key(nx, ny);
      if (visited.has(k)) continue;
      visited.add(k);

      const newPath = [...path, { x: nx, y: ny }];

      if (nx === goal.x && ny === goal.y) return newPath;

      queue.push({ x: nx, y: ny, path: newPath });
    }
  }

  return null; // no path found
}

/**
 * Find a path to any tile adjacent to the goal (for interacting with non-walkable entities).
 * @returns {{x:number,y:number}[]|null}
 */
export function findPathAdjacent(grid, start, goal) {
  const height = grid.length;
  const width = grid[0].length;
  const dirs = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  // Try each adjacent tile as a target
  let bestPath = null;
  for (const { dx, dy } of dirs) {
    const ax = goal.x + dx;
    const ay = goal.y + dy;
    if (!inBounds(ax, ay, width, height)) continue;
    if (!grid[ay][ax]) continue;

    const path = findPath(grid, start, { x: ax, y: ay });
    if (path && (bestPath === null || path.length < bestPath.length)) {
      bestPath = path;
    }
  }
  return bestPath;
}

function inBounds(x, y, w, h) {
  return x >= 0 && y >= 0 && x < w && y < h;
}
