// Game.js - Main Game Controller (Pure HTML5 DOM)

import { TILE_SIZE, GAME_WIDTH, GAME_HEIGHT, KEYS, INTERACT_DISTANCE, SAVE_KEY } from './utils/Constants.js';
import { Player } from './entities/Player.js';
import { NPC } from './entities/NPC.js';
import { InteractiveObject } from './entities/InteractiveObject.js';
import { FlagManager } from './systems/FlagManager.js';
import { InventoryManager } from './systems/InventoryManager.js';
import { QuestManager } from './systems/QuestManager.js';
import { DialogManager } from './systems/DialogManager.js';
import { MapManager } from './systems/MapManager.js';
import { resourceManager } from './systems/ResourceManager.js';

export class Game {
    constructor() {
        this.currentScreen = 'menu';
        this.isRunning = false;
        this.keys = {};

        // DOM Elements
        this.screens = {};
        this.gameWorld = null;
        this.mapContainer = null;
        this.entitiesContainer = null;
        this.playerElement = null;

        // Game state
        this.player = null;
        this.npcs = [];
        this.objects = [];
        this.camera = { x: 0, y: 0 };

        // Managers
        this.flagManager = null;
        this.inventoryManager = null;
        this.questManager = null;
        this.dialogManager = null;
        this.mapManager = null;

        // Data
        this.gameData = {};
        this.playerData = {
            name: 'Spieler',
            variant: 'a'
        };
        this.currentWorld = 'hub';
        this.currentMap = 'theater-main';
    }

    async init() {
        this.cacheElements();
        
        // Load assets before game data
        await resourceManager.loadAll();

        this.setupEventListeners();
        await this.loadGameData();
        this.initManagers();
        this.checkSaveData();

        console.log('Theater Nexus RPG initialized');
    }

    cacheElements() {
        this.screens = {
            menu: document.getElementById('menu-screen'),
            character: document.getElementById('character-screen'),
            game: document.getElementById('game-screen')
        };

        this.gameWorld = document.getElementById('game-world');
        this.mapContainer = document.getElementById('map-container');
        this.entitiesContainer = document.getElementById('entities-container');
        this.playerElement = document.getElementById('player');

        this.dialogOverlay = document.getElementById('dialog-overlay');
        this.dialogBox = document.getElementById('dialog-box');
        this.dialogSpeaker = document.getElementById('dialog-speaker');
        this.dialogText = document.getElementById('dialog-text');
        this.dialogChoices = document.getElementById('dialog-choices');
        this.dialogContinue = document.getElementById('dialog-continue');

        this.inventoryOverlay = document.getElementById('inventory-overlay');
        this.inventoryItems = document.getElementById('inventory-items');
        this.questList = document.getElementById('quest-list');

        this.hudHint = document.getElementById('hud-hint');
        this.hudLocation = document.getElementById('hud-location');
    }

    setupEventListeners() {
        // Menu buttons
        document.getElementById('btn-new-game').addEventListener('click', () => this.startNewGame());
        document.getElementById('btn-continue').addEventListener('click', () => this.continueGame());
        document.getElementById('btn-start').addEventListener('click', () => this.beginJourney());
        document.getElementById('close-inventory').addEventListener('click', () => this.closeInventory());

        // Character variant selection
        document.querySelectorAll('.variant-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.playerData.variant = e.target.dataset.variant;
            });
        });

        // Keyboard input
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    async loadGameData() {
        // Define all worlds
        const worldIds = [
            'hub', 'bluttribut', 'dystopia',
            'kristall-der-traeume', 'malleus-maleficarum', 'goldfieber',
            'traum-von-freiheit', 'sagenhaft', 'nexus',
            'hoellische-herausforderung', 'anno-1146'
        ];

        // Map entry points for each world
        const entryMaps = {
            'hub': 'theater-main',
            'bluttribut': 'ritual-grounds',
            'dystopia': 'slums',
            'kristall-der-traeume': 'dream-forest',
            'malleus-maleficarum': 'village-square',
            'goldfieber': 'mining-town',
            'traum-von-freiheit': 'prison-yard',
            'sagenhaft': 'legend-stage',
            'nexus': 'nexus-core',
            'hoellische-herausforderung': 'infernal-gates',
            'anno-1146': 'crusader-camp'
        };

        try {
            // Load items first
            const items = await this.loadJSON('data/items.json');

            this.gameData = {
                items: items || {},
                worlds: {},
                maps: {},
                dialogs: {},
                quests: {}
            };

            // Load each world's data
            for (const worldId of worldIds) {
                const entryMap = entryMaps[worldId];

                const [world, map, dialogs, quests] = await Promise.all([
                    this.loadJSON(`data/${worldId}/world.json`),
                    this.loadJSON(`data/${worldId}/maps/${entryMap}.json`),
                    this.loadJSON(`data/${worldId}/dialogs.json`),
                    this.loadJSON(`data/${worldId}/quests.json`)
                ]);

                this.gameData.worlds[worldId] = world || { name: worldId, entryMap };
                this.gameData.maps[`${worldId}-${entryMap}`] = map || {};
                this.gameData.dialogs[worldId] = dialogs || {};
                this.gameData.quests[worldId] = quests || {};
            }

            console.log('All game data loaded:', Object.keys(this.gameData.worlds));
        } catch (error) {
            console.warn('Some game data failed to load, using defaults:', error);
            this.gameData = {
                items: {},
                worlds: { hub: { name: 'Theater-Hub', entryMap: 'theater-main' } },
                maps: { 'hub-theater-main': this.getDefaultMap() },
                dialogs: { hub: {} },
                quests: { hub: {} }
            };
        }
    }

    async loadJSON(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.warn(`Failed to load ${path}:`, error);
            return null;
        }
    }

    getDefaultMap() {
        return {
            name: 'Theater-Hauptsaal',
            width: 20,
            height: 15,
            playerSpawn: { x: 10, y: 10 },
            layers: [
                this.generateFloorLayer(20, 15)
            ],
            collision: this.generateCollisionLayer(20, 15),
            npcs: [
                { id: 'sebastian', name: 'Sebastian', x: 5, y: 5, dialogId: 'sebastian' },
                { id: 'margot', name: 'Margot', x: 15, y: 5, dialogId: 'margot' }
            ],
            objects: [
                { id: 'chest1', type: 'chest', x: 3, y: 3, contents: { items: ['potion'] } }
            ]
        };
    }

    generateFloorLayer(width, height) {
        const layer = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                row.push('wood');
            }
            layer.push(row);
        }
        return layer;
    }

    generateCollisionLayer(width, height) {
        const layer = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                // Walls on edges
                if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            layer.push(row);
        }
        return layer;
    }

    initManagers() {
        this.flagManager = new FlagManager(this);
        this.inventoryManager = new InventoryManager(this, this.gameData.items);
        this.questManager = new QuestManager(this);
        this.dialogManager = new DialogManager(this);
        this.mapManager = new MapManager(this);
    }

    checkSaveData() {
        const hasSave = localStorage.getItem(SAVE_KEY) !== null;
        document.getElementById('btn-continue').disabled = !hasSave;
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });

        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
            this.currentScreen = screenName;
        }
    }

    startNewGame() {
        this.showScreen('character');
    }

    continueGame() {
        this.loadGame();
        this.startGameLoop();
    }

    beginJourney() {
        const nameInput = document.getElementById('player-name');
        this.playerData.name = nameInput.value.trim() || 'Spieler';

        this.showScreen('game');
        this.loadMap(this.currentWorld, this.currentMap);
        this.startGameLoop();
        this.saveGame();
    }

    loadMap(worldId, mapId) {
        // If mapId is null, use the world's entry map
        if (!mapId && this.gameData.worlds[worldId]) {
            mapId = this.gameData.worlds[worldId].entryMap || 'main';
        }

        const mapKey = `${worldId}-${mapId}`;
        const mapData = this.gameData.maps[mapKey] || this.getDefaultMap();

        console.log(`Loading map: ${mapKey}`, mapData);

        this.currentWorld = worldId;
        this.currentMap = mapId;

        // Clear existing entities
        this.clearEntities();

        // Render map tiles
        this.mapManager.renderMap(mapData, this.mapContainer);

        // Create player
        const spawn = mapData.playerSpawn || { x: 2, y: 2 };
        this.player = new Player(this, spawn.x * TILE_SIZE, spawn.y * TILE_SIZE, this.playerElement);

        // Create NPCs
        if (mapData.npcs) {
            mapData.npcs.forEach(npcData => {
                const npc = new NPC(this, npcData);
                this.npcs.push(npc);
                this.entitiesContainer.appendChild(npc.element);
            });
        }

        // Create objects
        if (mapData.objects) {
            mapData.objects.forEach(objData => {
                const obj = new InteractiveObject(this, objData);
                this.objects.push(obj);
                this.entitiesContainer.appendChild(obj.element);
            });
        }

        // Update HUD
        this.hudLocation.textContent = mapData.name || 'Unbekannter Ort';

        // Set camera bounds
        this.mapBounds = {
            width: mapData.width * TILE_SIZE,
            height: mapData.height * TILE_SIZE
        };

        // Load dialogs for this world
        this.dialogManager.loadDialogs(this.gameData.dialogs[worldId] || {});
        this.questManager.loadQuests(this.gameData.quests[worldId] || {});

        // Auto-save on map change
        this.saveGame();
    }

    clearEntities() {
        this.npcs.forEach(npc => npc.destroy());
        this.objects.forEach(obj => obj.destroy());
        this.npcs = [];
        this.objects = [];
    }

    startGameLoop() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.gameLoop();
    }

    stopGameLoop() {
        this.isRunning = false;
    }

    gameLoop() {
        if (!this.isRunning) return;

        this.update();
        this.render();

        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        if (this.currentScreen !== 'game') return;
        if (!this.dialogOverlay.classList.contains('hidden')) return;
        if (!this.inventoryOverlay.classList.contains('hidden')) return;

        // Handle player movement
        if (this.player) {
            const dx = (this.isKeyPressed(KEYS.RIGHT) ? 1 : 0) - (this.isKeyPressed(KEYS.LEFT) ? 1 : 0);
            const dy = (this.isKeyPressed(KEYS.DOWN) ? 1 : 0) - (this.isKeyPressed(KEYS.UP) ? 1 : 0);

            this.player.move(dx, dy, this.mapManager.getCollision());
        }

        // Check for nearby interactables
        this.checkInteractions();
    }

    render() {
        if (!this.player) return;

        // Update camera to follow player
        this.updateCamera();

        // Apply camera transform
        const transform = `translate(${-this.camera.x}px, ${-this.camera.y}px)`;
        this.mapContainer.style.transform = transform;
        this.entitiesContainer.style.transform = transform;
        this.playerElement.style.transform = transform;
    }

    updateCamera() {
        const targetX = this.player.x - GAME_WIDTH / 2 + TILE_SIZE / 2;
        const targetY = this.player.y - GAME_HEIGHT / 2 + TILE_SIZE / 2;

        // Clamp to map bounds
        this.camera.x = Math.max(0, Math.min(targetX, this.mapBounds.width - GAME_WIDTH));
        this.camera.y = Math.max(0, Math.min(targetY, this.mapBounds.height - GAME_HEIGHT));

        // Smooth camera (lerp)
        this.camera.x = this.camera.x * 0.1 + (this.camera.x * 0.9);
        this.camera.y = this.camera.y * 0.1 + (this.camera.y * 0.9);
    }

    checkInteractions() {
        let nearestEntity = null;
        let nearestDist = INTERACT_DISTANCE;

        // Check NPCs
        for (const npc of this.npcs) {
            const dist = this.getDistance(this.player, npc);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestEntity = npc;
            }
        }

        // Check objects
        for (const obj of this.objects) {
            const dist = this.getDistance(this.player, obj);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestEntity = obj;
            }
        }

        // Show/hide interaction hint
        if (nearestEntity) {
            this.hudHint.classList.remove('hidden');
            this.nearestInteractable = nearestEntity;
        } else {
            this.hudHint.classList.add('hidden');
            this.nearestInteractable = null;
        }
    }

    getDistance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    handleKeyDown(e) {
        this.keys[e.code] = true;

        // Handle special keys
        if (this.isKeyPressed(KEYS.INTERACT)) {
            this.handleInteract();
        }

        if (this.isKeyPressed(KEYS.INVENTORY)) {
            this.toggleInventory();
        }

        if (this.isKeyPressed(KEYS.ESCAPE)) {
            this.handleEscape();
        }
    }

    handleKeyUp(e) {
        this.keys[e.code] = false;
    }

    isKeyPressed(keyArray) {
        return keyArray.some(key => this.keys[key]);
    }

    handleInteract() {
        // If dialog is open, advance it
        if (!this.dialogOverlay.classList.contains('hidden')) {
            this.advanceDialog();
            return;
        }

        // Interact with nearest entity
        if (this.nearestInteractable) {
            this.nearestInteractable.interact();
        }
    }

    showDialog(dialogId, speakerName) {
        const dialog = this.dialogManager.getDialog(dialogId);

        if (!dialog) {
            console.warn('Dialog not found:', dialogId);
            return;
        }

        this.currentDialog = dialog;
        this.dialogSpeaker.textContent = speakerName || 'Unbekannt';
        this.dialogText.textContent = dialog.text || '';

        // Clear and populate choices
        this.dialogChoices.innerHTML = '';

        if (dialog.choices && dialog.choices.length > 0) {
            this.dialogContinue.classList.add('hidden');
            dialog.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.className = 'dialog-choice';
                btn.textContent = choice.text;
                btn.addEventListener('click', () => this.selectDialogChoice(index));
                this.dialogChoices.appendChild(btn);
            });
        } else {
            this.dialogContinue.classList.remove('hidden');
        }

        this.dialogOverlay.classList.remove('hidden');
    }

    selectDialogChoice(index) {
        const choice = this.currentDialog.choices[index];

        if (choice.actions) {
            this.dialogManager.executeActions(choice.actions);
        }

        if (choice.next) {
            this.showDialog(choice.next, this.dialogSpeaker.textContent);
        } else {
            this.closeDialog();
        }
    }

    advanceDialog() {
        if (this.currentDialog && this.currentDialog.next) {
            this.showDialog(this.currentDialog.next, this.dialogSpeaker.textContent);
        } else {
            this.closeDialog();
        }
    }

    closeDialog() {
        this.dialogOverlay.classList.add('hidden');
        this.currentDialog = null;
    }

    toggleInventory() {
        if (this.inventoryOverlay.classList.contains('hidden')) {
            this.openInventory();
        } else {
            this.closeInventory();
        }
    }

    openInventory() {
        this.updateInventoryUI();
        this.updateQuestUI();
        this.inventoryOverlay.classList.remove('hidden');
    }

    closeInventory() {
        this.inventoryOverlay.classList.add('hidden');
    }

    updateInventoryUI() {
        this.inventoryItems.innerHTML = '';

        const items = this.inventoryManager.getItems();

        if (items.length === 0) {
            this.inventoryItems.innerHTML = '<p style="color: var(--text-muted);">Keine Gegenstände</p>';
            return;
        }

        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'inventory-item';
            div.innerHTML = `
                <span class="item-name">${item.name || item.id}</span>
                <span class="item-quantity">x${item.quantity}</span>
            `;
            this.inventoryItems.appendChild(div);
        });
    }

    updateQuestUI() {
        this.questList.innerHTML = '';

        const quests = this.questManager.getActiveQuests();

        if (quests.length === 0) {
            this.questList.innerHTML = '<p style="color: var(--text-muted);">Keine aktiven Quests</p>';
            return;
        }

        quests.forEach(quest => {
            const div = document.createElement('div');
            div.className = 'quest-item';
            div.innerHTML = `
                <div class="quest-title">${quest.title || quest.id}</div>
                <div class="quest-description">${quest.description || ''}</div>
            `;
            this.questList.appendChild(div);
        });
    }

    handleEscape() {
        if (!this.dialogOverlay.classList.contains('hidden')) {
            this.closeDialog();
        } else if (!this.inventoryOverlay.classList.contains('hidden')) {
            this.closeInventory();
        }
    }

    saveGame() {
        const saveData = {
            version: 1,
            timestamp: Date.now(),
            player: {
                name: this.playerData.name,
                variant: this.playerData.variant,
                x: this.player?.x || 0,
                y: this.player?.y || 0
            },
            world: this.currentWorld,
            map: this.currentMap,
            flags: this.flagManager.getAllFlags(),
            inventory: this.inventoryManager.serialize(),
            quests: this.questManager.serialize()
        };

        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        console.log('Game saved');
    }

    loadGame() {
        const json = localStorage.getItem(SAVE_KEY);
        if (!json) return;

        try {
            const saveData = JSON.parse(json);

            this.playerData.name = saveData.player?.name || 'Spieler';
            this.playerData.variant = saveData.player?.variant || 'a';
            this.currentWorld = saveData.world || 'hub';
            this.currentMap = saveData.map || 'theater-main';

            this.flagManager.loadFlags(saveData.flags || {});
            this.inventoryManager.deserialize(saveData.inventory || []);
            this.questManager.deserialize(saveData.quests || { active: [], completed: [] });

            this.showScreen('game');
            this.loadMap(this.currentWorld, this.currentMap);

            // Restore player position
            if (saveData.player?.x !== undefined && this.player) {
                this.player.setPosition(saveData.player.x, saveData.player.y);
            }

            console.log('Game loaded');
        } catch (error) {
            console.error('Failed to load game:', error);
        }
    }
}
