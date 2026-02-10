import { events } from './events.js';
import { StateManager } from './state.js';

const PREFIX = 'theater-rpg-save-';
const AUTO_SAVE_KEY = `${PREFIX}auto`;
const MAX_SLOTS = 3;

export const SaveSystem = {
  init() {
    // Auto-save on room enter
    events.on('room:enter', () => {
      this.autoSave();
    });
  },

  autoSave() {
    const data = StateManager.serialize();
    data.timestamp = Date.now();
    try {
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Auto-save failed:', e);
    }
  },

  loadAutoSave() {
    try {
      const raw = localStorage.getItem(AUTO_SAVE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      StateManager.deserialize(data);
      return true;
    } catch (e) {
      console.warn('Auto-save load failed:', e);
      return false;
    }
  },

  saveToSlot(slot) {
    if (slot < 0 || slot >= MAX_SLOTS) return;
    const data = StateManager.serialize();
    data.timestamp = Date.now();
    try {
      localStorage.setItem(`${PREFIX}slot-${slot}`, JSON.stringify(data));
      events.emit('notification:show', { text: `Gespeichert in Slot ${slot + 1}.` });
    } catch (e) {
      console.warn(`Save to slot ${slot} failed:`, e);
    }
  },

  loadFromSlot(slot) {
    if (slot < 0 || slot >= MAX_SLOTS) return false;
    try {
      const raw = localStorage.getItem(`${PREFIX}slot-${slot}`);
      if (!raw) return false;
      const data = JSON.parse(raw);
      StateManager.deserialize(data);
      return true;
    } catch (e) {
      console.warn(`Load from slot ${slot} failed:`, e);
      return false;
    }
  },

  getSlotInfo(slot) {
    try {
      const raw = localStorage.getItem(`${PREFIX}slot-${slot}`);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return {
        world: data.currentWorld,
        room: data.currentRoom,
        timestamp: data.timestamp,
      };
    } catch {
      return null;
    }
  },

  deleteSlot(slot) {
    localStorage.removeItem(`${PREFIX}slot-${slot}`);
  },

  deleteAutoSave() {
    localStorage.removeItem(AUTO_SAVE_KEY);
  },
};
