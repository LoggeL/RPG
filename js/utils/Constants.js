// Game constants and configuration (Pure HTML5 DOM version)

export const TILE_SIZE = 32;
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const PLAYER_SPEED = 4; // pixels per frame
export const INTERACT_DISTANCE = 48;

// Key bindings
export const KEYS = {
    UP: ['KeyW', 'ArrowUp'],
    DOWN: ['KeyS', 'ArrowDown'],
    LEFT: ['KeyA', 'ArrowLeft'],
    RIGHT: ['KeyD', 'ArrowRight'],
    INTERACT: ['KeyE', 'Space'],
    INVENTORY: ['KeyI'],
    DEBUG: ['KeyP'],
    ESCAPE: ['Escape']
};

// Event names
export const EVENTS = {
    FLAG_CHANGED: 'flagChanged',
    ITEM_ADDED: 'itemAdded',
    ITEM_REMOVED: 'itemRemoved',
    QUEST_STARTED: 'questStarted',
    QUEST_COMPLETED: 'questCompleted',
    DIALOG_START: 'dialogStart',
    DIALOG_END: 'dialogEnd',
    WORLD_TRANSITION: 'worldTransition',
    MAP_TRANSITION: 'mapTransition',
    SAVE_GAME: 'saveGame',
    LOAD_GAME: 'loadGame'
};

// Entity types
export const ENTITY_TYPES = {
    NPC: 'npc',
    CHEST: 'chest',
    DOOR: 'door',
    PORTAL: 'portal',
    SIGN: 'sign',
    ITEM: 'item'
};

// Storage key
export const SAVE_KEY = 'theaterNexusRPG';
