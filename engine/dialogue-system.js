import { events } from './events.js';
import { StateManager } from './state.js';
import { QuestSystem } from './quest-system.js';

let currentDialogue = null;
let currentNodeId = null;
let worldData = null;

export const DialogueSystem = {
  /**
   * Start a dialogue tree for an NPC.
   * Resolves the correct dialogue based on conditions.
   */
  startDialogue(npc, wData) {
    worldData = wData;

    // Check for quest turn-in before starting dialogue
    QuestSystem.checkDialogueStage(npc.id);

    // Resolve which dialogue to use based on conditions
    const dialogueId = this._resolveDialogue(npc);
    const dialogueTree = worldData.dialogues.dialogues[dialogueId];

    if (!dialogueTree) {
      console.error(`Dialogue not found: ${dialogueId}`);
      return;
    }

    currentDialogue = dialogueTree;
    currentNodeId = 'start';

    events.emit('dialogue:start', { npc });
    this._processNode();
  },

  /**
   * Advance to next node (for text nodes).
   */
  advance() {
    if (!currentDialogue || !currentNodeId) return;
    const node = currentDialogue.nodes[currentNodeId];
    if (!node) return;

    if (node.next === null || node.next === undefined) {
      this.endDialogue();
      return;
    }

    currentNodeId = node.next;
    this._processNode();
  },

  /**
   * Select a choice option.
   */
  selectChoice(choiceIndex) {
    if (!currentDialogue || !currentNodeId) return;
    const node = currentDialogue.nodes[currentNodeId];
    if (!node || node.type !== 'choice') return;

    // Re-filter to map visible index to actual choice
    const visibleChoices = this._filterChoices(node.choices);
    const choice = visibleChoices[choiceIndex];
    if (!choice) return;

    // Process choice side effects
    if (choice.setFlag) StateManager.setFlag(choice.setFlag);
    if (choice.giveItem && worldData.items) {
      const item = worldData.items.items[choice.giveItem];
      if (item) StateManager.addItem({ ...item });
    }
    if (choice.startQuest && worldData.quests) {
      const quest = worldData.quests.quests[choice.startQuest];
      if (quest && !StateManager.isQuestActive(quest.id) && !StateManager.isQuestComplete(quest.id)) {
        StateManager.startQuest(quest);
      }
    }

    if (choice.next === null || choice.next === undefined) {
      this.endDialogue();
      return;
    }

    currentNodeId = choice.next;
    this._processNode();
  },

  endDialogue() {
    currentDialogue = null;
    currentNodeId = null;
    worldData = null;
    events.emit('dialogue:end');
  },

  isActive() {
    return currentDialogue !== null;
  },

  _resolveDialogue(npc) {
    // Check conditions in order (last match wins, so most specific last)
    if (npc.dialogueConditions) {
      for (const cond of npc.dialogueConditions) {
        if (cond.flag && StateManager.hasFlag(cond.flag)) {
          return cond.dialogue;
        }
      }
    }
    return npc.dialogue;
  },

  _filterChoices(choices) {
    return choices.filter(c => {
      if (c.requiredFlag && !StateManager.hasFlag(c.requiredFlag)) return false;
      if (c.excludeFlag && StateManager.hasFlag(c.excludeFlag)) return false;
      return true;
    });
  },

  _processNode() {
    const node = currentDialogue.nodes[currentNodeId];
    if (!node) {
      this.endDialogue();
      return;
    }

    // Process side effects for text nodes
    if (node.setFlag) StateManager.setFlag(node.setFlag);
    if (node.giveItem && worldData.items) {
      const item = worldData.items.items[node.giveItem];
      if (item) StateManager.addItem({ ...item });
    }

    // Check for turn-in quest item
    if (node.turnInItem) {
      const removed = StateManager.removeItem(node.turnInItem);
      if (removed) {
        events.emit('notification:show', { text: `${removed.name} abgegeben.` });
      }
    }

    if (node.type === 'choice') {
      const filtered = this._filterChoices(node.choices);
      events.emit('dialogue:choice', { node: { ...node, choices: filtered } });
    } else {
      events.emit('dialogue:text', {
        speaker: node.speaker,
        text: node.text,
        hasNext: node.next !== null && node.next !== undefined,
      });
    }
  },
};
