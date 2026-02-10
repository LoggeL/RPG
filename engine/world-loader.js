/** Cache of loaded world data by worldId */
const worldCache = new Map();

/** Cache of loaded tile themes */
const themeCache = new Map();

/** Theme module paths */
const themePaths = {
  'theater-lobby': '../assets/tiles/theater-lobby.js',
  'theater-backstage': '../assets/tiles/theater-backstage.js',
  'nexus-undertown': '../assets/tiles/nexus-undertown.js',
  'nexus-wasteland': '../assets/tiles/nexus-wasteland.js',
};

/**
 * Load a tile theme by name. Returns the tiles object.
 * @param {string} themeId
 * @returns {Promise<object>}
 */
export async function loadTheme(themeId) {
  if (themeCache.has(themeId)) return themeCache.get(themeId);

  const path = themePaths[themeId];
  if (!path) {
    console.warn(`Unknown tile theme: ${themeId}`);
    themeCache.set(themeId, {});
    return {};
  }

  const mod = await import(path);
  const tiles = mod.tiles || {};
  themeCache.set(themeId, tiles);
  return tiles;
}

/**
 * Load all JSON files for a given world.
 * @param {string} worldId
 * @returns {Promise<{world, npcs, dialogues, quests, items}>}
 */
export async function loadWorld(worldId) {
  if (worldCache.has(worldId)) {
    return worldCache.get(worldId);
  }

  const basePath = `./worlds/${worldId}`;
  const [world, npcs, dialogues, quests, items] = await Promise.all([
    fetchJSON(`${basePath}/world.json`),
    fetchJSON(`${basePath}/npcs.json`),
    fetchJSON(`${basePath}/dialogues.json`),
    fetchJSON(`${basePath}/quests.json`),
    fetchJSON(`${basePath}/items.json`),
  ]);

  const data = { world, npcs, dialogues, quests, items };
  worldCache.set(worldId, data);
  return data;
}

/**
 * Parse a room reference like "placeholder:entrance" into { worldId, roomId }.
 * Plain references like "main-hall" return the current world.
 */
export function parseRoomRef(ref, currentWorldId) {
  if (ref.includes(':')) {
    const [worldId, roomId] = ref.split(':');
    return { worldId, roomId };
  }
  return { worldId: currentWorldId, roomId: ref };
}

async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}
