// SvgFactory.js - Generates SVG graphics for game entities
import { resourceManager } from '../systems/ResourceManager.js';

export const SvgFactory = {
    // Replaces the placeholder string/logic with loaded content

    getPlayer(color = '#4488ff', direction = 'down') {
        let svg = resourceManager.getSvg('player');

        // Handle Direction: set display="block" for the active direction group
        // We regex replace display="none" on the specific group
        // Default is all hidden.

        const dirId = direction; // 'down', 'up', 'left', 'right'

        // This regex finds <g id="direction" display="none"> and replaces it with display="block"
        // Note: This assumes strict formatting in the SVG file
        const regex = new RegExp(`(<g id="${dirId}" display=")none(")`);
        svg = svg.replace(regex, '$1block$2');

        // Handle Color: replace var(--char-color) fallback or inject style
        // Since we used var(--char-color, #4488ff), we can wrap the SVG in a div with that style
        // BUT SvgFactory returns the SVG string to be put in innerHTML.
        // So we can inject a style tag or just replace the color variable.

        // Simple string replacement for the variable fallback
        // Or better: inject a style attribute into the root svg tag?
        // Let's replace the variable usage with the actual color for 'Pure DOM' simplicity
        // replacing "var(--char-color, #4488ff)" with color

        svg = svg.replaceAll(/var\(--char-color,[^)]+\)/g, color);

        return svg;
    },

    getNPC(id, direction = 'down', color = '#ff8844') {
        // Try to get specific character SVG
        let svg = resourceManager.getSvg(`npc_${id}`);
        
        // Fallback to generic npc if specific one doesn't exist
        if (!svg) {
            svg = resourceManager.getSvg('npc');
            // Only apply color variable replacement for generic NPC
            svg = svg.replaceAll(/var\(--char-color,[^)]+\)/g, color);
        }

        const dirId = direction;
        const regex = new RegExp(`(<g id="${dirId}" display=")none(")`);
        svg = svg.replace(regex, '$1block$2');
        
        return svg;
    },

    getWall() {
        return resourceManager.getSvg('wall');
    },

    getChest(opened = false) {
        let svg = resourceManager.getSvg('chest');
        const stateId = opened ? 'open' : 'closed';
        const regex = new RegExp(`(<g id="${stateId}" display=")none(")`);
        svg = svg.replace(regex, '$1block$2');
        return svg;
    },

    getPortal(color = '#9944ff') {
        let svg = resourceManager.getSvg('portal');
        // Replace the portal color variable with the actual color
        svg = svg.replaceAll(/var\(--portal-color,[^)]+\)/g, color);
        // Also replace any hardcoded purple if present
        svg = svg.replaceAll(/#9944ff/gi, color);
        svg = svg.replaceAll(/#6622cc/gi, color);
        return svg;
    },

    getDoor(locked = false) {
        let svg = resourceManager.getSvg('door');
        const lockColor = locked ? '#800000' : '#006400';
        svg = svg.replaceAll(/var\(--lock-color,[^)]+\)/g, lockColor);
        return svg;
    },

    getSign() {
        return resourceManager.getSvg('sign');
    },

    getItem(type = 'potion') {
        // Currently only one item svg
        return resourceManager.getSvg('item_potion');
    }
};
