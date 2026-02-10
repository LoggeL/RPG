import { events } from '../engine/events.js';

const worldNameEl = document.getElementById('hud-world-name');
const roomNameEl = document.getElementById('hud-room-name');

export function initHUD() {
  events.on('room:enter', ({ roomId, worldId }) => {
    // Update will be called from main after room data is available
  });

  document.getElementById('btn-menu').addEventListener('click', () => {
    events.emit('menu:toggle');
  });

  document.getElementById('btn-quests').addEventListener('click', () => {
    events.emit('questlog:toggle');
  });

  document.getElementById('btn-inventory').addEventListener('click', () => {
    events.emit('inventory:toggle');
  });
}

export function updateHUD(worldName, roomName) {
  worldNameEl.textContent = worldName;
  roomNameEl.textContent = roomName;
}
