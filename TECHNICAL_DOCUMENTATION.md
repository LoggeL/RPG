# Theater Nexus RPG - Technical Documentation

## 1. Game Overview

**Theater Nexus RPG** is a top-down, 2D Role-Playing Game built with the Phaser 3 framework. The player assumes the role of an assistant to Sebastian, a Theater Director who has lost his creative spark (the "Essenz des Dramas"). The player travels through magical portals into different "Plays" (game worlds) to resolve conflicts and fix the stories from within.

### Core Loop
1.  **Explore**: Traverse the Hub world and various Play worlds.
2.  **Interact**: Talk to NPCs and interact with objects (chests, doors, items) to gather information and resources.
3.  **Solve**: Complete quests by making dialog choices, finding items, or unlocking areas.
4.  **Progress**: Earning the "Essenz" from a world unlocks new portals in the Hub.

---

## 2. Gameplay Mechanics

### Movement & Controls
-   **Input**: WASD or Arrow Keys for movement.
-   **Physics**: Arcade Physics (AABB collision).
-   **Camera**: Follows the player with a lerp (smoothing) effect and a deadzone.

### Interaction System
-   **Proximity Check**: The game calculates the distance between the player and nearby entities (NPCs, Interactive Objects).
-   **Trigger**: Pressing 'E' or 'Space' interacts with the nearest entity within `INTERACT_DISTANCE` (40px).
-   **Visual Feedback**: A HUD hint appears when an interaction is possible.

### Dialog System
-   **Structure**: Branching conversation trees defined in JSON.
-   **Conditions**: Dialog options or entire nodes can be conditional based on:
    -   **Flags**: `hasFlag`, `notFlag`, `checkFlags` (multiple).
    -   **Items**: `hasItem`.
    -   **Quests**: `questActive`, `questCompleted`.
-   **Actions**: Dialog choices can trigger game state changes:
    -   `setFlag`: Update game flags.
    -   `giveItem` / `removeItem`: Modify inventory.
    -   `startQuest` / `completeQuest`: Update quest state.
    -   `transitionToMap` / `transitionToWorld`: Teleport player.

### Inventory & Items
-   **Storage**: List of objects `{ itemId, quantity }`.
-   **Categories**: Items can be `consumable` (potions), `key` (opens doors/chests), `quest` (required for progress), or `equipment`.
-   **Usage**: Items can have `effects` defined in `items.json` (e.g., healing, setting flags) which are processed by the `InventoryManager`.

### Quest System
-   **States**: `Active` or `Completed`.
-   **Stages**: Quests can have multiple stages, tracked via specific flags (e.g., `quest:id:stage:0`).
-   **Rewards**: Completing quests awards items or sets specific flags.

### Saving & Loading
-   **Persistence**: Data is serialized to a JSON string and stored in the browser's `localStorage` under the key `theaterNexusRPG`.
-   **Auto-Save**: Triggers every 60 seconds and on major events (World Transition, Quest Completion).
-   **Saved Data**:
    -   Player Position & World/Map ID.
    -   All Flags.
    -   Inventory contents.
    -   Quest states (active/completed).
    -   Player metadata (name, variant).

---

## 3. Technical Architecture

### Technology Stack
-   **Engine**: [Phaser 3](https://phaser.io/) (v3.80.1)
-   **Language**: JavaScript (ES Modules)
-   **Styling**: CSS for the game container
-   **Assets**: SVG for scalable graphics

### Directory Structure
-   `js/`: Source code.
    -   `main.js`: Entry point, game config.
    -   `scenes/`: Phaser Scenes (View/Controller layer).
    -   `systems/`: Logic Managers (Model/Controller layer).
    -   `entities/`: Game Objects (Player, NPC).
    -   `ui/`: HUD and Interface elements.
    -   `utils/`: Helpers and Constants.
-   `data/`: Content definitions (JSON).
-   `assets/`: Media files.

### Key Systems (Managers)
The `GameScene` initializes several manager classes to handle specific domains. These are accessible via `this.scene.[managerName]` or passed down to entities.

1.  **FlagManager**: The central state store. Handles boolean flags (e.g., `chest:opened`, `boss:defeated`). Emits `EVENTS.FLAG_CHANGED`.
2.  **DialogManager**: Loads `dialogs.json` and resolves which dialog node to show based on flags/state.
3.  **QuestManager**: Manages quest lifecycles. Checks conditions for quest stages.
4.  **InventoryManager**: Manages item addition, removal, and usage logic.
5.  **MapManager**: Handles tilemap rendering. Reads custom JSON map formats to spawn tiles, collision layers, and entities.
6.  **WorldManager**: Manages the concept of "Worlds" (collections of maps) and transitions between them.

### Data-Driven Design
The game relies heavily on external JSON files in `data/` to define content without changing code.

-   **Worlds** (`world.json`): Defines world metadata and entry points.
-   **Maps** (`*.json`): Custom format defining dimensions, tile layers (arrays of strings), collision maps (0/1 arrays), and entity spawns.
-   **Dialogs** (`dialogs.json`): Keyed by NPC ID. Contains "default" and "conditional" dialog blocks.
-   **Quests** (`quests.json`): Definitions of quest titles, descriptions, and stages.
-   **Items** (`items.json`): Global item registry.

### Entity Component System (Lite)
While not a strict ECS, entities encapsulate logic and rendering:
-   **Player**: Handles input and movement.
-   **NPC**: Handles behavior (static/wander) and interactions. Uses a placeholder graphics system if sprites are missing.
-   **InteractiveObject**: A generic class that changes behavior based on `type` (chest, portal, etc.).

---

## 4. Content Details

### Worlds
1.  **Hub (The Director's Theater)**
    -   **Maps**: `theater-main`, `portal-chamber`.
    -   **Role**: Safe area, quest giving, access to other worlds via Portals.
    -   **Key NPCs**: Sebastian (Director), Margot (Props), Theo (Stagehand).

2.  **Stolen Crown (Verrat im Kloster)**
    -   **Theme**: Medieval/Monastery mystery.
    -   **Story**: Find the stolen royal seal and expose the traitor.
    -   **Maps**: `castle-gardens`, `castle-interior`, `dungeons`, `throne-room`.

### Entities
-   **NPCs**: defined in `maps/*.json` under `npcs` array. Properties: `id`, `name`, `sprite`, `dialogId`.
-   **Objects**: defined in `maps/*.json` under `objects` array.
    -   **Portal**: Teleports to another world (`toWorld`). Locked by flags.
    -   **Door**: Teleports to another map (`toMap`). Can be locked (`keyItem`).
    -   **Chest**: Gives items/flags. One-time use.
    -   **Sign**: Displays a message.

---

## 5. Asset Pipeline
-   **Format**: SVGs are used for all sprites and tiles.
-   **Loading**: `BootScene` loads all assets declared in its preload methods.
-   **Naming Convention**:
    -   Tiles: `tile-[name]` (e.g., `tile-wood-floor`).
    -   Sprites: `player-[variant]-[dir]`, `npc-[name]-[dir]`, `obj-[type]`.
    -   Icons: `icon-[name]`.
-   **Placeholders**: If an asset is missing, the Entity classes (`Player`, `NPC`, `InteractiveObject`) automatically generate a procedural graphics placeholder to prevent crashes and allow prototyping.
