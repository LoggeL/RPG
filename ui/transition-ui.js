const curtainLeft = document.getElementById('curtain-left');
const curtainRight = document.getElementById('curtain-right');

let transitioning = false;

// Create splash element once
const splash = document.createElement('div');
splash.id = 'world-splash';
splash.className = 'hidden';
document.getElementById('viewport').appendChild(splash);

/**
 * Play curtain close -> callback -> curtain open transition.
 * @param {Function} duringCallback - Called while curtains are closed
 * @returns {Promise}
 */
export function curtainTransition(duringCallback) {
  if (transitioning) return Promise.resolve();
  transitioning = true;

  return new Promise(resolve => {
    // Close curtains
    curtainLeft.classList.add('closed');
    curtainRight.classList.add('closed');

    setTimeout(async () => {
      // Execute callback while curtains are closed
      if (duringCallback) await duringCallback();

      // Brief pause with curtains closed
      setTimeout(() => {
        // Open curtains
        curtainLeft.classList.remove('closed');
        curtainRight.classList.remove('closed');

        setTimeout(() => {
          transitioning = false;
          resolve();
        }, 600);
      }, 200);
    }, 600);
  });
}

/**
 * Play curtain close -> show splash -> callback -> curtain open transition.
 * @param {object} worldInfo - { name, subtitle }
 * @param {Function} duringCallback
 * @returns {Promise}
 */
export function worldTransition(worldInfo, duringCallback) {
  if (transitioning) return Promise.resolve();
  transitioning = true;

  return new Promise(resolve => {
    // Close curtains
    curtainLeft.classList.add('closed');
    curtainRight.classList.add('closed');

    setTimeout(async () => {
      // Show splash
      splash.innerHTML = `
        <div class="splash-content">
          <div class="splash-title">${worldInfo.name}</div>
          ${worldInfo.subtitle ? `<div class="splash-subtitle">${worldInfo.subtitle}</div>` : ''}
        </div>
      `;
      splash.classList.remove('hidden');
      splash.classList.add('active');

      // Execute callback while splash is showing
      if (duringCallback) await duringCallback();

      // Hold splash for a moment
      setTimeout(() => {
        splash.classList.remove('active');
        splash.classList.add('fading');

        // Open curtains
        curtainLeft.classList.remove('closed');
        curtainRight.classList.remove('closed');

        setTimeout(() => {
          splash.classList.add('hidden');
          splash.classList.remove('fading');
          splash.innerHTML = '';
          transitioning = false;
          resolve();
        }, 800);
      }, 1200);
    }, 600);
  });
}
