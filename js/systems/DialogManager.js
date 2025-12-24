// DialogManager - Dialog resolution (Pure HTML5 DOM version)

export class DialogManager {
    constructor(game) {
        this.game = game;
        this.dialogs = {};
    }

    loadDialogs(data) {
        this.dialogs = data || {};
    }

    getDialog(dialogId) {
        const dialog = this.dialogs[dialogId];

        if (!dialog) {
            // Return default dialog if not found
            return {
                text: "...",
                choices: []
            };
        }

        // Check for conditional dialogs
        if (dialog.conditional) {
            for (const cond of dialog.conditional) {
                if (this.checkConditions(cond.conditions)) {
                    return this.filterChoices(cond);
                }
            }
        }

        // Return default dialog
        if (dialog.default) {
            return this.filterChoices(dialog.default);
        }

        return dialog;
    }

    filterChoices(dialog) {
        if (!dialog.choices) return dialog;

        const filtered = {
            ...dialog,
            choices: dialog.choices.filter(choice => {
                if (!choice.conditions) return true;
                return this.checkConditions(choice.conditions);
            })
        };

        return filtered;
    }

    checkConditions(conditions) {
        if (!conditions) return true;

        const fm = this.game.flagManager;
        const im = this.game.inventoryManager;
        const qm = this.game.questManager;

        if (conditions.hasFlag) {
            const flags = Array.isArray(conditions.hasFlag) ? conditions.hasFlag : [conditions.hasFlag];
            for (const f of flags) {
                if (!fm.hasFlag(f)) return false;
            }
        }

        if (conditions.notFlag) {
            const flags = Array.isArray(conditions.notFlag) ? conditions.notFlag : [conditions.notFlag];
            for (const f of flags) {
                if (fm.hasFlag(f)) return false;
            }
        }

        if (conditions.hasItem) {
            if (!im.hasItem(conditions.hasItem)) return false;
        }

        if (conditions.questActive) {
            if (!qm.isQuestActive(conditions.questActive)) return false;
        }

        if (conditions.questCompleted) {
            if (!qm.isQuestCompleted(conditions.questCompleted)) return false;
        }

        return true;
    }

    executeActions(actions) {
        if (!actions) return;

        const fm = this.game.flagManager;
        const im = this.game.inventoryManager;
        const qm = this.game.questManager;

        if (actions.setFlag) {
            for (const [flag, value] of Object.entries(actions.setFlag)) {
                fm.setFlag(flag, value);
            }
        }

        if (actions.giveItem) {
            const items = Array.isArray(actions.giveItem) ? actions.giveItem : [actions.giveItem];
            items.forEach(item => im.addItem(item));
        }

        if (actions.removeItem) {
            const items = Array.isArray(actions.removeItem) ? actions.removeItem : [actions.removeItem];
            items.forEach(item => im.removeItem(item));
        }

        if (actions.startQuest) {
            qm.startQuest(actions.startQuest);
        }

        if (actions.completeQuest) {
            qm.completeQuest(actions.completeQuest);
        }
    }
}
