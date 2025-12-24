// Theater Nexus RPG - Main Entry Point (Pure HTML5 DOM)

import { Game } from './Game.js';

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();

    // Make game accessible for debugging
    window.game = game;
});
