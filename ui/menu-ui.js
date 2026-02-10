import { events } from '../engine/events.js';
import { SaveSystem } from '../engine/save-system.js';
import { StateManager } from '../engine/state.js';
import { loadWorld } from '../engine/world-loader.js';
import { RoomRenderer } from '../engine/room-renderer.js';
import { curtainTransition } from './transition-ui.js';
import { Player } from '../engine/player.js';

const overlay = document.getElementById('menu-overlay');
let isOpen = false;
let currentView = 'main'; // 'main' | 'save' | 'load'

export function initMenuUI() {
  events.on('menu:toggle', () => {
    if (isOpen) closeMenu(); else openMenu();
  });

  // ESC key to close menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isOpen) closeMenu();
    }
  });
}

function openMenu() {
  isOpen = true;
  currentView = 'main';
  overlay.classList.remove('hidden');
  renderMain();
}

function closeMenu() {
  isOpen = false;
  overlay.classList.add('hidden');
  overlay.innerHTML = '';
}

function renderMain() {
  overlay.innerHTML = `
    <div class="menu-panel">
      <div class="menu-title">Theater RPG</div>
      <div class="menu-buttons">
        <button class="menu-btn" id="menu-resume">Weiterspielen</button>
        <button class="menu-btn" id="menu-save">Speichern</button>
        <button class="menu-btn" id="menu-load">Laden</button>
        <button class="menu-btn danger" id="menu-new">Neues Spiel</button>
      </div>
    </div>
  `;

  overlay.querySelector('#menu-resume').addEventListener('click', closeMenu);
  overlay.querySelector('#menu-save').addEventListener('click', () => renderSlots('save'));
  overlay.querySelector('#menu-load').addEventListener('click', () => renderSlots('load'));
  overlay.querySelector('#menu-new').addEventListener('click', confirmNewGame);
}

function renderSlots(mode) {
  currentView = mode;
  const title = mode === 'save' ? 'Speichern' : 'Laden';

  let slotsHTML = '';
  for (let i = 0; i < 3; i++) {
    const info = SaveSystem.getSlotInfo(i);
    if (info) {
      const date = new Date(info.timestamp).toLocaleString('de-DE');
      slotsHTML += `
        <button class="save-slot" data-slot="${i}">
          <div class="save-slot-info">
            <div class="save-slot-name">Slot ${i + 1} — ${info.world}/${info.room}</div>
            <div class="save-slot-date">${date}</div>
          </div>
        </button>
      `;
    } else {
      slotsHTML += `
        <button class="save-slot" data-slot="${i}" ${mode === 'load' ? 'disabled' : ''}>
          <span class="save-slot-empty">Slot ${i + 1} — Leer</span>
        </button>
      `;
    }
  }

  overlay.innerHTML = `
    <div class="menu-panel">
      <div class="menu-title">${title}</div>
      <div class="save-slots">${slotsHTML}</div>
      <div class="menu-buttons">
        <button class="menu-btn" id="menu-back">Zurück</button>
      </div>
    </div>
  `;

  overlay.querySelector('#menu-back').addEventListener('click', renderMain);

  overlay.querySelectorAll('.save-slot:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = parseInt(btn.dataset.slot);
      if (mode === 'save') {
        SaveSystem.saveToSlot(slot);
        renderSlots('save'); // Refresh
      } else {
        loadFromSlot(slot);
      }
    });
  });
}

async function loadFromSlot(slot) {
  const success = SaveSystem.loadFromSlot(slot);
  if (!success) {
    events.emit('notification:show', { text: 'Laden fehlgeschlagen.' });
    return;
  }

  closeMenu();

  await curtainTransition(async () => {
    const state = StateManager.get();
    const data = await loadWorld(state.currentWorld);
    RoomRenderer.setWorldData(data);

    const room = data.world.rooms[state.currentRoom];
    if (room && room.map) {
      // Tile mode: use renderCurrentRoom from main.js
      const { renderCurrentRoom } = await import('../engine/main.js');
      // Restore player position if saved
      if (state.playerPosition) {
        Player.setPosition(state.playerPosition.x, state.playerPosition.y);
      }
      renderCurrentRoom();
    } else {
      RoomRenderer.render(state.currentRoom);
    }

    const { updateHUD } = await import('./hud.js');
    updateHUD(data.world.name, room ? room.name : state.currentRoom);
  });

  events.emit('notification:show', { text: 'Spielstand geladen.' });
}

function confirmNewGame() {
  overlay.innerHTML = `
    <div class="menu-panel">
      <div class="menu-title">Neues Spiel?</div>
      <p style="color: var(--color-text-dim); margin-bottom: 1rem; font-family: var(--font-dialogue);">
        Der aktuelle Fortschritt geht verloren, wenn nicht gespeichert.
      </p>
      <div class="menu-buttons">
        <button class="menu-btn danger" id="menu-confirm-new">Ja, neu starten</button>
        <button class="menu-btn" id="menu-cancel-new">Abbrechen</button>
      </div>
    </div>
  `;

  overlay.querySelector('#menu-confirm-new').addEventListener('click', async () => {
    SaveSystem.deleteAutoSave();
    closeMenu();

    await curtainTransition(async () => {
      // Reset state
      StateManager.deserialize({
        currentWorld: 'lobby',
        currentRoom: 'main-hall',
        playerPosition: null,
        inventory: [],
        flags: [],
        quests: { active: {}, completed: {} },
        worldsCompleted: [],
      });

      const data = await loadWorld('lobby');
      RoomRenderer.setWorldData(data);

      const room = data.world.rooms['main-hall'];
      if (room && room.map) {
        const { renderCurrentRoom } = await import('../engine/main.js');
        renderCurrentRoom();
      } else {
        RoomRenderer.render('main-hall');
      }

      const { updateHUD } = await import('./hud.js');
      updateHUD(data.world.name, 'Haupthalle');
    });

    events.emit('notification:show', { text: 'Neues Spiel gestartet.' });
  });

  overlay.querySelector('#menu-cancel-new').addEventListener('click', renderMain);
}
