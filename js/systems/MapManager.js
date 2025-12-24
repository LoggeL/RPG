// MapManager - Map rendering (Pure HTML5 DOM version)

import { TILE_SIZE } from '../utils/Constants.js';
import { SvgFactory } from '../utils/SvgFactory.js';

export class MapManager {
    constructor(game) {
        this.game = game;
        this.currentMap = null;
        this.collision = null;
    }

    renderMap(mapData, container) {
        this.currentMap = mapData;
        this.collision = mapData.collision || [];

        // Clear container
        container.innerHTML = '';

        // Set container size
        const width = mapData.width * TILE_SIZE;
        const height = mapData.height * TILE_SIZE;
        container.style.width = `${width}px`;
        container.style.height = `${height}px`;

        // Render tile layers
        if (mapData.layers) {
            mapData.layers.forEach((layer, layerIndex) => {
                this.renderLayer(layer, mapData.width, mapData.height, container, layerIndex);
            });
        }

        // Render collision layer as walls (visual representation)
        if (mapData.collision) {
            this.renderCollisionWalls(mapData.collision, mapData.width, mapData.height, container);
        }
    }

    renderLayer(layer, width, height, container, layerIndex) {
        for (let y = 0; y < height; y++) {
            const row = layer[y];
            if (!row) continue;

            for (let x = 0; x < width; x++) {
                const tileId = row[x];
                if (!tileId || tileId === '.') continue;

                const tile = document.createElement('div');
                tile.className = `tile tile-${tileId}`;
                tile.style.left = `${x * TILE_SIZE}px`;
                tile.style.top = `${y * TILE_SIZE}px`;
                tile.style.zIndex = layerIndex;

                container.appendChild(tile);
            }
        }
    }

    renderCollisionWalls(collision, width, height, container) {
        for (let y = 0; y < height; y++) {
            const row = collision[y];
            if (!row) continue;

            for (let x = 0; x < width; x++) {
                if (row[x] === 1) {
                    const wall = document.createElement('div');
                    wall.className = 'tile tile-wall';
                    wall.style.left = `${x * TILE_SIZE}px`;
                    wall.style.top = `${y * TILE_SIZE}px`;
                    wall.style.zIndex = 5;
                    
                    // Add SVG
                    wall.innerHTML = SvgFactory.getWall();

                    container.appendChild(wall);
                }
            }
        }
    }

    getCollision() {
        return this.collision;
    }

    getMapBounds() {
        if (!this.currentMap) return { width: 0, height: 0 };

        return {
            width: this.currentMap.width * TILE_SIZE,
            height: this.currentMap.height * TILE_SIZE
        };
    }
}
