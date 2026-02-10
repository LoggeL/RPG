import { events } from '../engine/events.js';
import { StateManager } from '../engine/state.js';

const panel = document.getElementById('inventory-panel');
let isOpen = false;

export function initInventoryUI() {
  events.on('inventory:toggle', () => {
    if (isOpen) close(); else open();
  });

  // Close other panels when opening
  events.on('questlog:toggle', () => {
    if (isOpen) close();
  });

  // Re-render when items change
  events.on('item:pickup', () => { if (isOpen) renderItems(); });
  events.on('item:remove', () => { if (isOpen) renderItems(); });
}

function open() {
  // Close quest log if open
  events.emit('questlog:close');

  isOpen = true;
  panel.classList.remove('hidden');
  renderPanel();
}

function close() {
  isOpen = false;
  panel.classList.add('hidden');
  panel.innerHTML = '';
}

function renderPanel() {
  panel.innerHTML = `
    <div class="inventory-header">
      <h3>Inventar</h3>
      <button class="inventory-close">&times;</button>
    </div>
    <div class="inventory-items"></div>
  `;

  panel.querySelector('.inventory-close').addEventListener('click', close);
  renderItems();
}

function renderItems() {
  const container = panel.querySelector('.inventory-items');
  if (!container) return;

  const items = StateManager.getInventory();

  if (items.length === 0) {
    container.innerHTML = '<div class="inventory-empty">Dein Inventar ist leer.</div>';
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="inventory-item" title="${item.description || ''}">
      <span class="inventory-item-sprite">${item.sprite || '✨'}</span>
      <div class="inventory-item-info">
        <div class="inventory-item-name">${item.name}</div>
        <div class="inventory-item-type ${item.type === 'master-item' ? 'master-item' : ''}">${typeLabel(item.type)}</div>
      </div>
    </div>
  `).join('');
}

function typeLabel(type) {
  const labels = {
    'master-item': 'Magisches Requisit',
    'key': 'Schlüssel',
    'lore': 'Wissen',
    'consumable': 'Verbrauchbar',
  };
  return labels[type] || 'Gegenstand';
}
