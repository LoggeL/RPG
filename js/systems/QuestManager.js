// QuestManager - Quest tracking (Pure HTML5 DOM version)

export class QuestManager {
    constructor(game) {
        this.game = game;
        this.activeQuests = new Set();
        this.completedQuests = new Set();
        this.questData = {};
    }

    loadQuests(data) {
        this.questData = data || {};
    }

    startQuest(questId) {
        if (this.activeQuests.has(questId) || this.completedQuests.has(questId)) {
            return false;
        }

        this.activeQuests.add(questId);
        this.game.flagManager.setFlag(`quest:${questId}:active`, true);
        console.log('Quest started:', questId);
        return true;
    }

    completeQuest(questId) {
        if (!this.activeQuests.has(questId)) {
            return false;
        }

        this.activeQuests.delete(questId);
        this.completedQuests.add(questId);
        this.game.flagManager.setFlag(`quest:${questId}:completed`, true);
        console.log('Quest completed:', questId);
        return true;
    }

    isQuestActive(questId) {
        return this.activeQuests.has(questId);
    }

    isQuestCompleted(questId) {
        return this.completedQuests.has(questId);
    }

    getActiveQuests() {
        return Array.from(this.activeQuests).map(id => ({
            id,
            ...(this.questData[id] || { title: id })
        }));
    }

    serialize() {
        return {
            active: Array.from(this.activeQuests),
            completed: Array.from(this.completedQuests)
        };
    }

    deserialize(data) {
        this.activeQuests = new Set(data?.active || []);
        this.completedQuests = new Set(data?.completed || []);
    }
}
