import { events } from './events.js';
import { StateManager } from './state.js';

export const QuestSystem = {
  init() {
    // When an item is picked up, check if any active quest stage requires it
    events.on('item:pickup', ({ item }) => {
      this._checkFetchStages(item.id);
    });

    // When entering a room, check reach-room stages
    events.on('room:enter', ({ roomId, worldId }) => {
      this._checkReachRoomStages(roomId, worldId);
    });

    // When a quest completes, show notification
    events.on('quest:complete', ({ quest }) => {
      events.emit('notification:show', { text: `Quest abgeschlossen: ${quest.name}` });
    });

    events.on('quest:start', ({ quest }) => {
      events.emit('notification:show', { text: `Neue Quest: ${quest.name}` });
    });

    events.on('quest:advance', ({ quest }) => {
      const stage = quest.stages[quest.currentStage];
      if (stage && stage.description) {
        events.emit('notification:show', { text: `Quest aktualisiert: ${stage.description}` });
      }
    });
  },

  _checkFetchStages(itemId) {
    const state = StateManager.get();
    for (const quest of Object.values(state.quests.active)) {
      const stage = quest.stages[quest.currentStage];
      if (stage && stage.type === 'fetch' && stage.targetItem === itemId) {
        StateManager.advanceQuest(quest.id);
      }
    }
  },

  _checkReachRoomStages(roomId, worldId) {
    const state = StateManager.get();
    for (const quest of Object.values(state.quests.active)) {
      const stage = quest.stages[quest.currentStage];
      if (stage && stage.type === 'reach-room' && stage.targetRoom === roomId) {
        StateManager.advanceQuest(quest.id);
      }
    }
  },

  /**
   * Check if the current quest stage is a dialogue/turn-in stage for a given NPC.
   * If so, advance the quest and return the item to turn in.
   */
  checkDialogueStage(npcId) {
    const state = StateManager.get();
    for (const quest of Object.values(state.quests.active)) {
      const stage = quest.stages[quest.currentStage];
      if (stage && stage.type === 'dialogue' && stage.targetNpc === npcId) {
        if (stage.turnInItem) {
          if (StateManager.hasItem(stage.turnInItem)) {
            const removed = StateManager.removeItem(stage.turnInItem);
            if (removed) {
              events.emit('notification:show', { text: `${removed.name} übergeben!` });
            }
            StateManager.advanceQuest(quest.id);
            return true;
          }
        } else {
          StateManager.advanceQuest(quest.id);
          return true;
        }
      }
    }
    return false;
  },
};
