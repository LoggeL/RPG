// FlagManager - Central state store (Pure HTML5 DOM version)

export class FlagManager {
    constructor(game) {
        this.game = game;
        this.flags = new Map();
    }

    setFlag(flagName, value = true) {
        this.flags.set(flagName, value);
    }

    hasFlag(flagName) {
        return this.flags.get(flagName) === true;
    }

    getFlag(flagName) {
        return this.flags.get(flagName);
    }

    removeFlag(flagName) {
        this.flags.delete(flagName);
    }

    getAllFlags() {
        const obj = {};
        this.flags.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    }

    loadFlags(obj) {
        this.flags.clear();
        if (obj) {
            Object.entries(obj).forEach(([key, value]) => {
                this.flags.set(key, value);
            });
        }
    }
}
