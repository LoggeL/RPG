import { events } from './events.js';

const state = {
  currentWorld: null,
  currentRoom: null,
  playerPosition: null, // {x, y} tile coords, or null for non-tile rooms
  inventory: [],
  flags: new Set(),
  quests: { active: {}, completed: {} },
  worldsCompleted: [],
};

export const StateManager = {
  get() { return state; },

  getCurrentWorld() { return state.currentWorld; },
  getCurrentRoom() { return state.currentRoom; },
  getInventory() { return [...state.inventory]; },
  getFlags() { return new Set(state.flags); },

  getPlayerPosition() { return state.playerPosition; },
  setPlayerPosition(pos) { state.playerPosition = pos ? { x: pos.x, y: pos.y } : null; },

  setCurrentWorld(worldId) {
    state.currentWorld = worldId;
  },

  setCurrentRoom(roomId) {
    const prev = state.currentRoom;
    state.currentRoom = roomId;
    if (prev) events.emit('room:exit', { roomId: prev });
    events.emit('room:enter', { roomId, worldId: state.currentWorld });
  },

  addItem(item) {
    state.inventory.push(item);
    events.emit('item:pickup', { item });
  },

  removeItem(itemId) {
    const idx = state.inventory.findIndex(i => i.id === itemId);
    if (idx !== -1) {
      const [item] = state.inventory.splice(idx, 1);
      events.emit('item:remove', { item });
      return item;
    }
    return null;
  },

  hasItem(itemId) {
    return state.inventory.some(i => i.id === itemId);
  },

  setFlag(flag) {
    if (!state.flags.has(flag)) {
      state.flags.add(flag);
      events.emit('flag:set', { flag });
    }
  },

  hasFlag(flag) {
    return state.flags.has(flag);
  },

  startQuest(questData) {
    state.quests.active[questData.id] = {
      ...questData,
      currentStage: 0,
    };
    events.emit('quest:start', { quest: questData });
  },

  getActiveQuest(questId) {
    return state.quests.active[questId] || null;
  },

  advanceQuest(questId) {
    const quest = state.quests.active[questId];
    if (!quest) return;
    quest.currentStage++;
    if (quest.currentStage >= quest.stages.length) {
      this.completeQuest(questId);
    } else {
      events.emit('quest:advance', { quest });
    }
  },

  completeQuest(questId) {
    const quest = state.quests.active[questId];
    if (!quest) return;
    delete state.quests.active[questId];
    state.quests.completed[questId] = quest;
    if (quest.rewards) {
      if (quest.rewards.flags) quest.rewards.flags.forEach(f => this.setFlag(f));
    }
    events.emit('quest:complete', { quest });
  },

  isQuestActive(questId) {
    return questId in state.quests.active;
  },

  isQuestComplete(questId) {
    return questId in state.quests.completed;
  },

  completeWorld(worldId) {
    if (!state.worldsCompleted.includes(worldId)) {
      state.worldsCompleted.push(worldId);
    }
  },

  /** Serialize state for saving */
  serialize() {
    return {
      currentWorld: state.currentWorld,
      currentRoom: state.currentRoom,
      playerPosition: state.playerPosition,
      inventory: state.inventory,
      flags: [...state.flags],
      quests: {
        active: state.quests.active,
        completed: state.quests.completed,
      },
      worldsCompleted: state.worldsCompleted,
    };
  },

  /** Restore state from save data */
  deserialize(data) {
    state.currentWorld = data.currentWorld;
    state.currentRoom = data.currentRoom;
    state.playerPosition = data.playerPosition || null;
    state.inventory = data.inventory || [];
    state.flags = new Set(data.flags || []);
    state.quests = data.quests || { active: {}, completed: {} };
    state.worldsCompleted = data.worldsCompleted || [];
  },
};
