// Player.js - Player Entity (Pure HTML5 DOM)

import { TILE_SIZE, PLAYER_SPEED } from '../utils/Constants.js';
import { SvgFactory } from '../utils/SvgFactory.js';

export class Player {
    constructor(game, x, y, element) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.element = element;
        this.width = TILE_SIZE;
        this.height = TILE_SIZE;
        this.facing = 'down';

        this.element.innerHTML = SvgFactory.getPlayer('#4488ff', this.facing);
        this.updatePosition();
    }

    move(dx, dy, collision) {
        if (dx === 0 && dy === 0) return;

        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            const factor = 1 / Math.sqrt(2);
            dx *= factor;
            dy *= factor;
        }

        const newX = this.x + dx * PLAYER_SPEED;
        const newY = this.y + dy * PLAYER_SPEED;

        // Check collision for X movement
        if (!this.checkCollision(newX, this.y, collision)) {
            this.x = newX;
        }

        // Check collision for Y movement
        if (!this.checkCollision(this.x, newY, collision)) {
            this.y = newY;
        }

        // Update facing direction
        let newFacing = this.facing;
        if (dx > 0) newFacing = 'right';
        else if (dx < 0) newFacing = 'left';
        else if (dy > 0) newFacing = 'down';
        else if (dy < 0) newFacing = 'up';

        if (newFacing !== this.facing) {
            this.facing = newFacing;
            this.element.innerHTML = SvgFactory.getPlayer('#4488ff', this.facing);
        }

        this.updatePosition();
    }

    checkCollision(x, y, collision) {
        if (!collision) return false;

        // Check all four corners of the player
        const padding = 4;
        const points = [
            { x: x + padding, y: y + padding },
            { x: x + this.width - padding, y: y + padding },
            { x: x + padding, y: y + this.height - padding },
            { x: x + this.width - padding, y: y + this.height - padding }
        ];

        const mapHeight = collision.length;
        const mapWidth = collision[0]?.length || 0;

        for (const point of points) {
            const tileX = Math.floor(point.x / TILE_SIZE);
            const tileY = Math.floor(point.y / TILE_SIZE);

            // Treat out-of-bounds as solid walls
            if (tileX < 0 || tileY < 0 || tileX >= mapWidth || tileY >= mapHeight) {
                return true;
            }

            if (collision[tileY] && collision[tileY][tileX] === 1) {
                return true;
            }
        }

        return false;
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.updatePosition();
    }

    destroy() {
        // Player element is persistent, just reset position
        this.x = 0;
        this.y = 0;
    }
}
