// NPC.js - Non-Player Character (Pure HTML5 DOM)

import { TILE_SIZE } from '../utils/Constants.js';
import { SvgFactory } from '../utils/SvgFactory.js';

export class NPC {
    constructor(game, data) {
        this.game = game;
        this.id = data.id;
        this.name = data.name || 'Unbekannt';
        this.x = data.x * TILE_SIZE;
        this.y = data.y * TILE_SIZE;
        this.dialogId = data.dialogId || data.id;
        this.behavior = data.behavior || 'static';
        this.facing = data.facing || 'down';

        this.element = this.createElement();
        this.updatePosition();
    }

    createElement() {
        const el = document.createElement('div');
        el.className = 'entity npc';
        el.id = `npc-${this.id}`;
        el.title = this.name;
        
        // Sprite container
        const sprite = document.createElement('div');
        sprite.className = 'sprite';
        sprite.innerHTML = SvgFactory.getNPC(this.id, this.facing, '#ff8844');
        sprite.style.width = '100%';
        sprite.style.height = '100%';
        el.appendChild(sprite);

        // Add name label
        const label = document.createElement('div');
        label.className = 'entity-label';
        label.textContent = this.name;
        label.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            color: white;
            white-space: nowrap;
            background: rgba(0,0,0,0.7);
            padding: 2px 6px;
            border-radius: 3px;
        `;
        el.appendChild(label);

        return el;
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    interact() {
        console.log('Interacting with NPC:', this.name);
        this.game.showDialog(this.dialogId, this.name);
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
