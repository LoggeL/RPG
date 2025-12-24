// ResourceManager.js - Handles loading of static assets
export class ResourceManager {
    constructor() {
        this.svgs = {};
    }

    async loadAll() {
        const assets = [
            'characters/player.svg',
            'characters/npc.svg',
            'characters/npc_sebastian.svg',
            'characters/npc_margot.svg',
            'characters/npc_theo.svg',
            'tiles/wall.svg',
            'objects/chest.svg',
            'objects/door.svg',
            'objects/portal.svg',
            'objects/sign.svg',
            'objects/item_potion.svg'
        ];

        const promises = assets.map(path => this.loadSvg(path));
        await Promise.all(promises);
        console.log('All SVGs loaded');
    }

    async loadSvg(path) {
        try {
            // Adjust path to root assets folder
            const fullPath = `assets/svg/${path}`;
            const response = await fetch(fullPath);
            if (!response.ok) throw new Error(`Failed to load ${fullPath}`);
            const text = await response.text();
            
            // Store by key (e.g., 'characters/player.svg' -> 'player')
            // Simplified key extraction
            const filename = path.split('/').pop().replace('.svg', '');
            this.svgs[filename] = text;
        } catch (error) {
            console.error('Asset load error:', error);
            // Fallback placeholder
            this.svgs[path.split('/').pop().replace('.svg', '')] = '<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="magenta"/></svg>';
        }
    }

    getSvg(name) {
        return this.svgs[name] || '';
    }
}

export const resourceManager = new ResourceManager();
