// InteractiveObject.js - Interactive Objects (Pure HTML5 DOM)

import { TILE_SIZE, ENTITY_TYPES } from '../utils/Constants.js';
import { SvgFactory } from '../utils/SvgFactory.js';

export class InteractiveObject {
    // World order for progression locking
    static WORLD_ORDER = [
        'bluttribut', 'dystopia', 'kristall-der-traeume',
        'malleus-maleficarum', 'goldfieber', 'traum-von-freiheit', 'sagenhaft',
        'nexus', 'hoellische-herausforderung', 'anno-1146'
    ];

    static WORLD_NAMES = {
        'hub': 'Theater',
        'bluttribut': 'Bluttribut',
        'dystopia': 'Dystopia',
        'kristall-der-traeume': 'Kristall der Träume',
        'malleus-maleficarum': 'Malleus Maleficarum',
        'goldfieber': 'Goldfieber',
        'traum-von-freiheit': 'Traum von Freiheit',
        'sagenhaft': 'Sagenhaft',
        'nexus': 'Nexus',
        'hoellische-herausforderung': 'Höllische Herausforderung',
        'anno-1146': 'Anno 1146'
    };

    constructor(game, data) {
        this.game = game;
        this.id = data.id;
        this.type = data.type || ENTITY_TYPES.CHEST;
        this.x = data.x * TILE_SIZE;
        this.y = data.y * TILE_SIZE;
        this.contents = data.contents || {};
        this.message = data.message || '';
        this.toWorld = data.toWorld || null;
        this.toMap = data.toMap || null;
        this.locked = data.locked || false;
        this.keyItem = data.keyItem || null;
        this.opened = false;
        this.label = data.label || null;

        // Check if already opened via flags
        if (this.game.flagManager.hasFlag(`object:${this.id}:opened`)) {
            this.opened = true;
        }

        this.element = this.createElement();
        this.updatePosition();
    }

    createElement() {
        const el = document.createElement('div');
        el.className = `entity object ${this.type}`;
        el.id = `obj-${this.id}`;

        if (this.opened && this.type === 'chest') {
            el.style.opacity = '0.5';
        }

        // Add SVG based on type
        this.updateVisuals(el);

        return el;
    }

    updateVisuals(el) {
        switch (this.type) {
            case ENTITY_TYPES.CHEST:
                el.innerHTML = SvgFactory.getChest(this.opened);
                break;
            case ENTITY_TYPES.SIGN:
                el.innerHTML = SvgFactory.getSign();
                break;
            case ENTITY_TYPES.DOOR:
                el.innerHTML = SvgFactory.getDoor(this.locked);
                break;
            case ENTITY_TYPES.PORTAL:
                // Determine portal state
                const portalState = this.getPortalState();
                const portalColors = {
                    locked: '#555555',      // Gray for locked
                    available: '#9944ff',   // Purple for next available
                    completed: '#ffd700'    // Gold for completed
                };

                el.innerHTML = SvgFactory.getPortal(portalColors[portalState]);

                // Add CSS class for state-specific styling
                el.classList.remove('portal-locked', 'portal-available', 'portal-completed');
                el.classList.add(`portal-${portalState}`);

                // Add label below portal (only for available and completed)
                if (this.toWorld && portalState !== 'locked') {
                    const label = document.createElement('div');
                    label.className = 'portal-label';
                    label.textContent = this.label || this.getWorldDisplayName();
                    el.appendChild(label);
                }
                break;
            case ENTITY_TYPES.ITEM:
                el.innerHTML = SvgFactory.getItem();
                break;
            default:
                break;
        }
    }

    getPortalState() {
        if (!this.toWorld || this.toWorld === 'hub') {
            return 'available'; // Hub portal is always available
        }

        const worldIndex = InteractiveObject.WORLD_ORDER.indexOf(this.toWorld);
        if (worldIndex === -1) return 'available';

        // Check if this world is completed
        if (this.game.flagManager.hasFlag(`world:${this.toWorld}:complete`)) {
            return 'completed';
        }

        // First world is always available
        if (worldIndex === 0) {
            return 'available';
        }

        // Check if previous world is completed
        const prevWorld = InteractiveObject.WORLD_ORDER[worldIndex - 1];
        if (this.game.flagManager.hasFlag(`world:${prevWorld}:complete`)) {
            return 'available';
        }

        return 'locked';
    }

    getWorldDisplayName() {
        return InteractiveObject.WORLD_NAMES[this.toWorld] || this.toWorld;
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    interact() {
        console.log('Interacting with object:', this.id, this.type);

        switch (this.type) {
            case ENTITY_TYPES.CHEST:
                this.openChest();
                break;
            case ENTITY_TYPES.SIGN:
                this.readSign();
                break;
            case ENTITY_TYPES.DOOR:
                this.useDoor();
                break;
            case ENTITY_TYPES.PORTAL:
                this.usePortal();
                break;
            case ENTITY_TYPES.ITEM:
                this.pickupItem();
                break;
            default:
                console.log('Unknown object type:', this.type);
        }
    }

    processContents() {
        if (!this.contents) return;

        // Flags
        if (this.contents.flags) {
            Object.entries(this.contents.flags).forEach(([flag, value]) => {
                this.game.flagManager.setFlag(flag, value);
            });
        }

        // Start Quest
        if (this.contents.startQuest) {
            this.game.questManager.startQuest(this.contents.startQuest);
        }

        // Complete Quest
        if (this.contents.completeQuest) {
            this.game.questManager.completeQuest(this.contents.completeQuest);
        }
    }

    openChest() {
        if (this.opened) {
            this.showMessage('Diese Truhe ist leer.');
            return;
        }

        // Check for required key
        if (this.keyItem && !this.game.inventoryManager.hasItem(this.keyItem)) {
            this.showMessage('Diese Truhe ist verschlossen.');
            return;
        }

        this.opened = true;
        this.game.flagManager.setFlag(`object:${this.id}:opened`, true);
        this.element.style.opacity = '0.5';

        // Update visual to open chest
        this.element.innerHTML = SvgFactory.getChest(true);

        // Give contents
        if (this.contents.items) {
            this.contents.items.forEach(itemId => {
                this.game.inventoryManager.addItem(itemId);
            });

            const itemNames = this.contents.items.join(', ');
            this.showMessage(`Du hast gefunden: ${itemNames}!`);
        } else {
            this.showMessage('Die Truhe war leer.');
        }

        this.processContents();

        this.game.saveGame();
    }

    readSign() {
        this.showMessage(this.message || 'Ein altes Schild mit verblasstem Text.');
        this.processContents();
    }

    useDoor() {
        if (this.locked) {
            if (this.keyItem && this.game.inventoryManager.hasItem(this.keyItem)) {
                this.locked = false;
                this.game.flagManager.setFlag(`object:${this.id}:unlocked`, true);
                this.element.innerHTML = SvgFactory.getDoor(false);
                this.showMessage('Du hast die Tür aufgeschlossen!');
                this.processContents();
            } else {
                this.showMessage('Diese Tür ist verschlossen.');
                return;
            }
        }

        if (this.toMap) {
            this.game.loadMap(this.game.currentWorld, this.toMap);
        }
    }

    usePortal() {
        // Check if this portal requires previous world to be completed
        if (this.toWorld && this.toWorld !== 'hub') {
            const worldIndex = InteractiveObject.WORLD_ORDER.indexOf(this.toWorld);

            // First world is always unlocked
            if (worldIndex > 0) {
                const prevWorld = InteractiveObject.WORLD_ORDER[worldIndex - 1];
                const prevWorldComplete = this.game.flagManager.hasFlag(`world:${prevWorld}:complete`);

                if (!prevWorldComplete) {
                    const prevName = InteractiveObject.WORLD_NAMES[prevWorld] || prevWorld;
                    this.showMessage(`Dieses Portal ist noch versiegelt. Beende zuerst "${prevName}".`);
                    return;
                }
            }
        }

        // Original lock check for specific portal flags
        if (this.locked) {
            const flagName = `portal:${this.id}:unlocked`;
            const introComplete = this.game.flagManager.hasFlag('intro_complete');
            
            // Special case: portal_blut unlocks with intro_complete OR specific flag
            if (this.id === 'portal_blut' && introComplete) {
                this.locked = false;
            } else if (!this.game.flagManager.hasFlag(flagName)) {
                this.showMessage('Dieses Portal ist von mysteriöser Energie versiegelt...');
                return;
            }
        }

        if (this.toWorld) {
            this.game.loadMap(this.toWorld, null);
        }
    }

    pickupItem() {
        if (this.contents.items) {
            this.contents.items.forEach(itemId => {
                this.game.inventoryManager.addItem(itemId);
            });
        }

        // Remove from game
        this.destroy();
        this.game.objects = this.game.objects.filter(obj => obj !== this);
        this.game.saveGame();
    }

    showMessage(text) {
        // Use simple dialog for messages
        this.game.dialogSpeaker.textContent = '';
        this.game.dialogText.textContent = text;
        this.game.dialogChoices.innerHTML = '';
        this.game.dialogContinue.classList.remove('hidden');
        this.game.dialogOverlay.classList.remove('hidden');
        this.game.currentDialog = { text };
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
