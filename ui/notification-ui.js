import { events } from '../engine/events.js';

const area = document.getElementById('notification-area');

export function initNotifications() {
  events.on('notification:show', ({ text }) => {
    showNotification(text);
  });
}

export function showNotification(text) {
  const el = document.createElement('div');
  el.className = 'notification';
  el.textContent = text;
  area.appendChild(el);

  // Remove after animation
  setTimeout(() => {
    el.remove();
  }, 3200);
}
