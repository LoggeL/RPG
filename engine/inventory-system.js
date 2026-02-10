import { events } from './events.js';
import { StateManager } from './state.js';
import { RoomRenderer } from './room-renderer.js';

export const InventorySystem = {
  init() {
    // Handle item click -> pick up
    events.on('item:click', ({ item }) => {
      if (StateManager.hasItem(item.id)) return;
      if (StateManager.hasFlag(`picked-up-${item.id}`)) return;

      StateManager.addItem({ ...item });
      StateManager.setFlag(`picked-up-${item.id}`);
      // Some items set additional flags when picked up (e.g. keys)
      if (item.setFlagOnPickup) {
        StateManager.setFlag(item.setFlagOnPickup);
      }
      RoomRenderer.removeEntity(item.id);
      events.emit('notification:show', { text: `${item.name} aufgehoben.` });
    });
  },
};
