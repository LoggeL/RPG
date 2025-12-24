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

        this.debugOverlay = document.getElementById('debug-overlay');
        this.debugWorldData = document.getElementById('debug-world-data');
        this.debugWorldSelect = document.getElementById('debug-world-select');
        this.debugMapSelect = document.getElementById('debug-map-select');
        this.debugFlagsList = document.getElementById('debug-flags-list');
        this.debugNewFlagInput = document.getElementById('debug-new-flag');

        this.hudHint = document.getElementById('hud-hint');
        this.hudLocation = document.getElementById('hud-location');

        // Walkthrough debug elements
        this.debugWalkthroughContent = document.getElementById('debug-walkthrough-content');
        this.debugQuickActions = document.getElementById('debug-quick-actions');
    }

    setupEventListeners() {
        // Menu buttons
        document.getElementById('btn-new-game').addEventListener('click', () => this.startNewGame());
        document.getElementById('btn-continue').addEventListener('click', () => this.continueGame());
        document.getElementById('btn-start').addEventListener('click', () => this.beginJourney());
        document.getElementById('close-inventory').addEventListener('click', () => this.closeInventory());
        document.getElementById('close-debug').addEventListener('click', () => this.closeDebug());

        // Debug Controls
        document.querySelectorAll('.debug-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchDebugTab(e.target.dataset.tab));
        });

        document.getElementById('debug-teleport-btn').addEventListener('click', () => {
            const worldId = this.debugWorldSelect.value;
            const mapId = this.debugMapSelect.value;
            if (worldId && mapId) {
                this.loadMap(worldId, mapId);
                this.closeDebug();
            }
        });

        this.debugWorldSelect.addEventListener('change', () => this.updateDebugMapSelect());

        document.getElementById('debug-add-flag-btn').addEventListener('click', () => {
            const flagName = this.debugNewFlagInput.value.trim();
            if (flagName) {
                this.flagManager.setFlag(flagName, true);
                this.debugNewFlagInput.value = '';
                this.updateDebugFlags();
            }
        });

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
            'hoellische-herausforderung', 'anno-1146', 'verrat-im-kloster'
        ];

        // Map entry points for each world
        const entryMaps = {
            'hub': 'theater-main',
            'bluttribut': 'manor-exterior',
            'dystopia': 'slums',
            'kristall-der-traeume': 'dream-forest',
            'malleus-maleficarum': 'village-square',
            'goldfieber': 'mining-town',
            'traum-von-freiheit': 'prison-yard',
            'sagenhaft': 'legend-stage',
            'nexus': 'nexus-core',
            'hoellische-herausforderung': 'infernal-gates',
            'anno-1146': 'crusader-camp',
            'verrat-im-kloster': 'monastery-gates'
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

            // First pass: Load all world definitions
            const worldPromises = worldIds.map(async (worldId) => {
                const world = await this.loadJSON(`data/${worldId}/world.json`);
                const dialogs = await this.loadJSON(`data/${worldId}/dialogs.json`);
                const quests = await this.loadJSON(`data/${worldId}/quests.json`);

                return { worldId, world, dialogs, quests };
            });

            const loadedWorlds = await Promise.all(worldPromises);

            // Second pass: Load entry maps for each world
            // Note: Other maps are loaded dynamically as needed
            const mapPromises = [];

            for (const data of loadedWorlds) {
                const { worldId, world, dialogs, quests } = data;

                // Store world data
                const entryMap = entryMaps[worldId];

                this.gameData.worlds[worldId] = world || { name: worldId, entryMap };
                this.gameData.dialogs[worldId] = dialogs || {};
                this.gameData.quests[worldId] = quests || {};

                // Ensure entry map is loaded
                if (entryMap) {
                    mapPromises.push(async () => {
                        const map = await this.loadJSON(`data/${worldId}/maps/${entryMap}.json`);
                        if (map) {
                            this.gameData.maps[`${worldId}-${entryMap}`] = map;
                        } else {
                            console.warn(`Failed to load entry map: ${worldId}-${entryMap}`);
                        }
                    });
                }
            }

            // Execute all initial map loads
            await Promise.all(mapPromises.map(p => p()));

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

    async continueGame() {
        await this.loadGame();
        this.startGameLoop();
    }

    async beginJourney() {
        const nameInput = document.getElementById('player-name');
        this.playerData.name = nameInput.value.trim() || 'Spieler';

        this.showScreen('game');
        await this.loadMap(this.currentWorld, this.currentMap);
        this.startGameLoop();
        this.saveGame();
    }

    async loadMap(worldId, mapId) {
        // If mapId is null, use the world's entry map
        if (!mapId && this.gameData.worlds[worldId]) {
            mapId = this.gameData.worlds[worldId].entryMap || 'main';
        }

        const mapKey = `${worldId}-${mapId}`;

        // Dynamically load map if not present
        if (!this.gameData.maps[mapKey]) {
            console.log(`Map ${mapKey} not in memory, attempting to load...`);
            const mapData = await this.loadJSON(`data/${worldId}/maps/${mapId}.json`);
            if (mapData) {
                this.gameData.maps[mapKey] = mapData;
            } else {
                console.warn(`Failed to load map ${mapKey}, using default`);
            }
        }

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

        // Create NPCs (filter out removed NPCs)
        if (mapData.npcs) {
            mapData.npcs.forEach(npcData => {
                // Skip NPCs that have been permanently removed
                if (this.flagManager.hasFlag(`npc:${npcData.id}:removed`)) {
                    return;
                }
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
        if (!this.debugOverlay.classList.contains('hidden')) return;

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

        if (e.repeat) return;

        // Handle special keys
        if (this.isKeyPressed(KEYS.INTERACT)) {
            this.handleInteract();
        }

        if (this.isKeyPressed(KEYS.INVENTORY)) {
            this.toggleInventory();
        }

        if (this.isKeyPressed(KEYS.DEBUG)) {
            this.toggleDebug();
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

    toggleDebug() {
        if (this.debugOverlay.classList.contains('hidden')) {
            this.openDebug();
        } else {
            this.closeDebug();
        }
    }

    openDebug() {
        this.updateDebugUI();
        this.debugOverlay.classList.remove('hidden');
    }

    closeDebug() {
        this.debugOverlay.classList.add('hidden');
    }

    switchDebugTab(tabId) {
        document.querySelectorAll('.debug-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`.debug-tab[data-tab="${tabId}"]`).classList.add('active');

        document.querySelectorAll('.debug-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(`debug-tab-${tabId}`).classList.add('active');
    }

    updateDebugUI() {
        this.updateDebugInfo();
        this.updateDebugTeleport();
        this.updateDebugFlags();
        this.updateWalkthrough();
    }

    updateWalkthrough() {
        if (!this.debugWalkthroughContent) return;

        const walkthroughs = this.getWalkthroughData();
        const currentWalkthrough = walkthroughs[this.currentWorld];

        if (!currentWalkthrough) {
            this.debugWalkthroughContent.innerHTML = `
                <p style="color: var(--text-muted);">Kein Walkthrough für "${this.currentWorld}" verfügbar.</p>
            `;
            this.debugQuickActions.innerHTML = '';
            return;
        }

        // Determine current step based on flags and quests
        let currentStep = 0;
        for (let i = 0; i < currentWalkthrough.steps.length; i++) {
            const step = currentWalkthrough.steps[i];
            if (step.checkFlag && this.flagManager.hasFlag(step.checkFlag)) {
                currentStep = i + 1;
            }
            if (step.checkItem && this.inventoryManager.hasItem(step.checkItem)) {
                currentStep = Math.max(currentStep, i + 1);
            }
        }

        // Build walkthrough HTML
        let html = `<h4 style="margin-top:0; color: var(--accent);">${currentWalkthrough.title}</h4>`;
        html += `<ol class="walkthrough-steps">`;

        currentWalkthrough.steps.forEach((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            const stepClass = isCompleted ? 'completed' : (isCurrent ? 'current' : '');

            html += `<li class="walkthrough-step ${stepClass}">`;
            html += `<span class="step-indicator">${isCompleted ? '✓' : (idx + 1)}</span>`;
            html += `<span class="step-text">${step.text}</span>`;
            if (isCurrent && step.hint) {
                html += `<div class="step-hint">💡 ${step.hint}</div>`;
            }
            html += `</li>`;
        });

        html += `</ol>`;
        this.debugWalkthroughContent.innerHTML = html;

        // Build quick actions
        this.debugQuickActions.innerHTML = '';

        if (currentWalkthrough.quickActions) {
            const header = document.createElement('div');
            header.className = 'quick-actions-header';
            header.textContent = 'Schnellaktionen:';
            this.debugQuickActions.appendChild(header);

            currentWalkthrough.quickActions.forEach(action => {
                const btn = document.createElement('button');
                btn.className = 'menu-btn small-btn';
                btn.textContent = action.label;
                btn.addEventListener('click', () => {
                    if (action.giveItem) {
                        this.inventoryManager.addItem(action.giveItem, 1);
                        this.showNotification(`+1 ${action.giveItem}`);
                    }
                    if (action.setFlag) {
                        this.flagManager.setFlag(action.setFlag, true);
                    }
                    if (action.teleport) {
                        this.loadMap(this.currentWorld, action.teleport);
                        this.closeDebug();
                    }
                    this.updateWalkthrough();
                    this.updateDebugFlags();
                });
                this.debugQuickActions.appendChild(btn);
            });
        }
    }

    getWalkthroughData() {
        return {
            'bluttribut': {
                title: 'Bluttribut - Rettung von Emma',
                steps: [
                    {
                        text: 'Sprich mit Hans am Eingang',
                        hint: 'Hans steht südlich. Er gibt dir Knoblauch.',
                        checkItem: 'garlic'
                    },
                    {
                        text: 'Konfrontiere Johann am Tor',
                        hint: 'Zeige ihm den Knoblauch oder schüchtere ihn ein.',
                        checkItem: 'manor_key'
                    },
                    {
                        text: 'Betrete das Herrenhaus',
                        hint: 'Benutze den Schlüssel an der Tür im Norden.',
                        checkFlag: 'johann_distracted'
                    },
                    {
                        text: 'Finde Anastasia in der Bibliothek',
                        hint: 'Sie ist im linken Bereich des Herrenhauses.',
                        checkItem: 'vampire_book',
                        checkFlag: 'quest:bluttribut_main:stage:2'
                    },
                    {
                        text: 'Hole den Ritualdolch aus der Gruft',
                        hint: 'Die Truhe ist draußen im Außenbereich (links).',
                        checkItem: 'ritual_dagger',
                        checkFlag: 'quest:bluttribut_main:stage:3'
                    },
                    {
                        text: 'Stelle Graf Harras und rette Emma',
                        hint: 'Benutze den Dolch im Dialog mit dem Grafen.',
                        checkFlag: 'quest:bluttribut_main:completed'
                    }
                ],
                quickActions: [
                    { label: '+Knoblauch', giveItem: 'garlic' },
                    { label: '+Schlüssel', giveItem: 'manor_key' },
                    { label: '+Buch', giveItem: 'vampire_book' },
                    { label: '+Dolch', giveItem: 'ritual_dagger' },
                    { label: '→ Interior', teleport: 'manor-interior' },
                    { label: '→ Exterior', teleport: 'manor-exterior' }
                ]
            },
            'hub': {
                title: 'Theater-Hub',
                steps: [
                    { text: 'Sprich mit Sebastian für Einführung' },
                    { text: 'Besuche Margot für Requisiten' },
                    { text: 'Erkunde die Portale zu anderen Welten' }
                ],
                quickActions: []
            }
        };
    }

    updateDebugInfo() {
        const worldData = {
            currentWorld: this.currentWorld,
            currentMap: this.currentMap,
            playerPosition: {
                x: Math.round(this.player?.x || 0),
                y: Math.round(this.player?.y || 0)
            },
            loadedWorlds: Object.keys(this.gameData.worlds).length,
            activeQuests: this.questManager.getActiveQuests().map(q => q.id),
            inventoryCount: this.inventoryManager.getItems().length,
            entities: {
                npcs: this.npcs.length,
                objects: this.objects.length
            }
        };

        this.debugWorldData.textContent = JSON.stringify(worldData, null, 2);
    }

    updateDebugTeleport() {
        // Populate Worlds if empty
        if (this.debugWorldSelect.options.length === 0) {
            Object.keys(this.gameData.worlds).sort().forEach(worldId => {
                const option = document.createElement('option');
                option.value = worldId;
                option.textContent = this.gameData.worlds[worldId].name || worldId;
                this.debugWorldSelect.appendChild(option);
            });
        }

        // Set current world selection
        if (this.currentWorld) {
            this.debugWorldSelect.value = this.currentWorld;
        }

        this.updateDebugMapSelect();
    }

    updateDebugMapSelect() {
        const worldId = this.debugWorldSelect.value;
        this.debugMapSelect.innerHTML = '';

        const worldDef = this.gameData.worlds[worldId];

        // If the world has a 'maps' array in its definition, use that
        // This ensures we show ALL maps, even if they aren't loaded yet
        if (worldDef && worldDef.maps && Array.isArray(worldDef.maps) && worldDef.maps.length > 0) {
            worldDef.maps.forEach(mapId => {
                const mapKey = `${worldId}-${mapId}`;
                // Try to get loaded map name, otherwise capitalize mapId
                const loadedMap = this.gameData.maps[mapKey];
                const mapName = loadedMap ? (loadedMap.name || mapId) : mapId;

                const option = document.createElement('option');
                option.value = mapId;
                option.textContent = mapName + (loadedMap ? '' : ' (Not Loaded)');
                this.debugMapSelect.appendChild(option);
            });
        } else {
            // Fallback to searching loaded maps
            Object.keys(this.gameData.maps).forEach(mapKey => {
                if (mapKey.startsWith(`${worldId}-`)) {
                    const mapId = mapKey.replace(`${worldId}-`, '');
                    const mapName = this.gameData.maps[mapKey].name || mapId;

                    const option = document.createElement('option');
                    option.value = mapId;
                    option.textContent = mapName;
                    this.debugMapSelect.appendChild(option);
                }
            });
        }

        // Try to select current map if in current world
        if (this.currentWorld === worldId && this.currentMap) {
            this.debugMapSelect.value = this.currentMap;
        }
    }

    getFlagMetadata(flagKey) {
        // Search in world definitions
        for (const worldId in this.gameData.worlds) {
            const world = this.gameData.worlds[worldId];
            if (world.flags && world.flags[flagKey]) {
                return {
                    name: world.flags[flagKey].name,
                    world: world.name || worldId
                };
            }
        }

        // Check dynamic flags
        if (flagKey.startsWith('quest:')) {
            const parts = flagKey.split(':');
            const questId = parts[1];
            const type = parts[2];
            const name = type === 'active' ? 'Aktiv' : (type === 'completed' ? 'Abgeschlossen' : type);
            return {
                name: `Quest ${questId}: ${name}`,
                world: 'System'
            };
        }

        if (flagKey.startsWith('object:')) {
            const parts = flagKey.split(':');
            const objId = parts[1];
            const type = parts[2];
            const name = type === 'opened' ? 'Geöffnet' : (type === 'unlocked' ? 'Entriegelt' : type);
            return {
                name: `Objekt ${objId}: ${name}`,
                world: 'System'
            };
        }

        if (flagKey.startsWith('world:')) {
            const parts = flagKey.split(':');
            const worldId = parts[1];
            return {
                name: `Welt ${worldId} abgeschlossen`,
                world: 'System'
            };
        }

        if (flagKey.startsWith('portal:')) {
            const parts = flagKey.split(':');
            const portalId = parts[1];
            return {
                name: `Portal ${portalId} freigeschaltet`,
                world: 'Hub'
            };
        }

        return {
            name: flagKey,
            world: 'Andere'
        };
    }

    updateDebugFlags() {
        this.debugFlagsList.innerHTML = '';
        const flags = this.flagManager.getAllFlags();
        const flagKeys = Object.keys(flags).sort();

        if (flagKeys.length === 0) {
            this.debugFlagsList.innerHTML = '<p style="color: var(--text-muted);">Keine Flags gesetzt</p>';
            return;
        }

        // Group by world
        const groupedFlags = {};
        flagKeys.forEach(key => {
            const meta = this.getFlagMetadata(key);
            if (!groupedFlags[meta.world]) groupedFlags[meta.world] = [];
            groupedFlags[meta.world].push({ key, val: flags[key], name: meta.name });
        });

        Object.keys(groupedFlags).sort().forEach(world => {
            const worldHeader = document.createElement('div');
            worldHeader.className = 'debug-flag-group-header';
            worldHeader.textContent = world;
            this.debugFlagsList.appendChild(worldHeader);

            groupedFlags[world].forEach(flag => {
                const div = document.createElement('div');
                div.className = `debug-flag-item ${flag.val ? 'true' : 'false'}`;
                div.innerHTML = `
                    <span class="debug-flag-name">${flag.name}</span>
                    <span class="debug-flag-status"></span>
                `;

                div.title = flag.key; // Show internal key on hover

                div.addEventListener('click', () => {
                    this.flagManager.setFlag(flag.key, !flag.val);
                    this.updateDebugFlags();
                });

                this.debugFlagsList.appendChild(div);
            });
        });
    }

    handleEscape() {
        if (!this.dialogOverlay.classList.contains('hidden')) {
            this.closeDialog();
        } else if (!this.inventoryOverlay.classList.contains('hidden')) {
            this.closeInventory();
        } else if (!this.debugOverlay.classList.contains('hidden')) {
            this.closeDebug();
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

    async loadGame() {
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
            await this.loadMap(this.currentWorld, this.currentMap);

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
