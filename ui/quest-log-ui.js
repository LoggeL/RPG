import { events } from '../engine/events.js';
import { StateManager } from '../engine/state.js';

const panel = document.getElementById('quest-log-panel');
let isOpen = false;

export function initQuestLogUI() {
  events.on('questlog:toggle', () => {
    if (isOpen) close(); else open();
  });

  events.on('questlog:close', () => {
    if (isOpen) close();
  });

  // Close other panels
  events.on('inventory:toggle', () => {
    if (isOpen) close();
  });

  // Re-render on quest updates
  events.on('quest:start', () => { if (isOpen) renderContent(); });
  events.on('quest:advance', () => { if (isOpen) renderContent(); });
  events.on('quest:complete', () => { if (isOpen) renderContent(); });
}

function open() {
  // Close inventory if open
  const invPanel = document.getElementById('inventory-panel');
  if (!invPanel.classList.contains('hidden')) {
    events.emit('inventory:toggle');
  }

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
    <div class="quest-log-header">
      <h3>Quest-Tagebuch</h3>
      <button class="quest-log-close">&times;</button>
    </div>
    <div class="quest-log-content"></div>
  `;

  panel.querySelector('.quest-log-close').addEventListener('click', close);
  renderContent();
}

function renderContent() {
  const container = panel.querySelector('.quest-log-content');
  if (!container) return;

  const state = StateManager.get();
  const active = Object.values(state.quests.active);
  const completed = Object.values(state.quests.completed);

  if (active.length === 0 && completed.length === 0) {
    container.innerHTML = '<div class="quest-log-empty">Noch keine Quests.</div>';
    return;
  }

  let html = '';

  if (active.length > 0) {
    html += `<div class="quest-log-section">
      <div class="quest-log-section-title">Aktiv</div>
      ${active.map(q => renderQuest(q, false)).join('')}
    </div>`;
  }

  if (completed.length > 0) {
    html += `<div class="quest-log-section">
      <div class="quest-log-section-title">Abgeschlossen</div>
      ${completed.map(q => renderQuest(q, true)).join('')}
    </div>`;
  }

  container.innerHTML = html;
}

function renderQuest(quest, isCompleted) {
  const nameClass = isCompleted ? 'completed' : (quest.isMasterQuest ? 'master' : '');
  const stage = !isCompleted && quest.stages[quest.currentStage];
  const stageText = stage ? stage.description : '';

  return `
    <div class="quest-entry">
      <div class="quest-entry-name ${nameClass}">${quest.isMasterQuest ? '⭐ ' : ''}${quest.name}</div>
      <div class="quest-entry-desc">${quest.description || ''}</div>
      ${stageText ? `<div class="quest-entry-stage">→ ${stageText}</div>` : ''}
    </div>
  `;
}
