import { events } from '../engine/events.js';
import { DialogueSystem } from '../engine/dialogue-system.js';

const overlay = document.getElementById('dialogue-overlay');
let typewriterTimer = null;
let fullText = '';
let isTyping = false;

export function initDialogueUI() {
  // NPC click -> start dialogue
  events.on('npc:click', ({ npc, worldData }) => {
    if (DialogueSystem.isActive()) return;
    DialogueSystem.startDialogue(npc, worldData);
  });

  events.on('dialogue:start', () => {
    overlay.classList.remove('hidden');
  });

  events.on('dialogue:end', () => {
    overlay.classList.add('hidden');
    overlay.innerHTML = '';
    stopTypewriter();
  });

  events.on('dialogue:text', ({ speaker, text, hasNext }) => {
    renderTextNode(speaker, text, hasNext);
  });

  events.on('dialogue:choice', ({ node }) => {
    renderChoiceNode(node);
  });
}

function renderTextNode(speaker, text, hasNext) {
  stopTypewriter();

  overlay.innerHTML = `
    <div class="dialogue-box">
      <div class="dialogue-speaker">${speaker}</div>
      <div class="dialogue-text"><span class="dialogue-text-content"></span><span class="cursor"></span></div>
      <div class="dialogue-continue" style="visibility:hidden">
        ${hasNext ? 'Klicke zum Fortfahren...' : 'Klicke zum Beenden...'}
      </div>
    </div>
  `;

  const textContent = overlay.querySelector('.dialogue-text-content');
  const continueHint = overlay.querySelector('.dialogue-continue');
  const cursor = overlay.querySelector('.cursor');
  const box = overlay.querySelector('.dialogue-box');

  fullText = text;
  isTyping = true;
  let charIndex = 0;

  typewriterTimer = setInterval(() => {
    if (charIndex < fullText.length) {
      textContent.textContent += fullText[charIndex];
      charIndex++;
    } else {
      stopTypewriter();
      isTyping = false;
      cursor.remove();
      continueHint.style.visibility = 'visible';
    }
  }, 30);

  // Click to skip typewriter or advance
  const clickHandler = () => {
    box.removeEventListener('click', clickHandler);
    if (isTyping) {
      // Skip to full text
      stopTypewriter();
      isTyping = false;
      textContent.textContent = fullText;
      cursor.remove();
      continueHint.style.visibility = 'visible';

      // Re-add handler for advancing
      box.addEventListener('click', () => {
        DialogueSystem.advance();
      }, { once: true });
    } else {
      DialogueSystem.advance();
    }
  };

  box.addEventListener('click', clickHandler);
}

function renderChoiceNode(node) {
  stopTypewriter();

  let choicesHTML = node.choices.map((c, i) =>
    `<button class="dialogue-choice-btn" data-index="${i}">${c.text}</button>`
  ).join('');

  overlay.innerHTML = `
    <div class="dialogue-box">
      <div class="dialogue-choices">${choicesHTML}</div>
    </div>
  `;

  overlay.querySelectorAll('.dialogue-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      DialogueSystem.selectChoice(parseInt(btn.dataset.index));
    });
  });
}

function stopTypewriter() {
  if (typewriterTimer) {
    clearInterval(typewriterTimer);
    typewriterTimer = null;
  }
}
