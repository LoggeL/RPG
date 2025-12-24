// InventoryManager - Item management (Pure HTML5 DOM version)

export class InventoryManager {
    constructor(game, itemData) {
        this.game = game;
        this.items = []; // { id, quantity }
        this.itemData = itemData || {};
    }

    addItem(itemId, quantity = 1) {
        const existing = this.items.find(i => i.id === itemId);

        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({ id: itemId, quantity });
        }

        console.log(`Added ${quantity}x ${itemId}`);
        return true;
    }

    removeItem(itemId, quantity = 1) {
        const existing = this.items.find(i => i.id === itemId);

        if (!existing || existing.quantity < quantity) {
            return false;
        }

        existing.quantity -= quantity;

        if (existing.quantity <= 0) {
            this.items = this.items.filter(i => i.id !== itemId);
        }

        return true;
    }

    hasItem(itemId, quantity = 1) {
        const existing = this.items.find(i => i.id === itemId);
        return existing && existing.quantity >= quantity;
    }

    getItems() {
        return this.items.map(item => ({
            ...item,
            ...(this.itemData[item.id] || { name: item.id })
        }));
    }

    serialize() {
        return [...this.items];
    }

    deserialize(data) {
        this.items = data || [];
    }
}
