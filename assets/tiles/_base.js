/**
 * Base SVG tile set. Each export is a 48x48 SVG string.
 * Tiles: floor, wall variants, door variants.
 */

const S = 48; // tile size

export const tiles = {
  // === FLOORS ===
  'floor': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#2a2218"/>
    <rect x="1" y="1" width="46" height="46" fill="#332b1f" rx="1"/>
    <line x1="0" y1="24" x2="48" y2="24" stroke="#2a2218" stroke-width="0.5" opacity="0.3"/>
    <line x1="24" y1="0" x2="24" y2="48" stroke="#2a2218" stroke-width="0.5" opacity="0.3"/>
  </svg>`,

  'floor-dark': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1610"/>
    <rect x="1" y="1" width="46" height="46" fill="#221c14" rx="1"/>
  </svg>`,

  // === WALLS ===
  'wall': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="2" y="2" width="44" height="44" fill="#241a0e" rx="2"/>
    <rect x="4" y="4" width="40" height="18" fill="#2a1e10" rx="1"/>
    <rect x="4" y="26" width="40" height="18" fill="#2a1e10" rx="1"/>
    <line x1="24" y1="4" x2="24" y2="22" stroke="#1a1008" stroke-width="1"/>
    <line x1="12" y1="26" x2="12" y2="44" stroke="#1a1008" stroke-width="1"/>
    <line x1="36" y1="26" x2="36" y2="44" stroke="#1a1008" stroke-width="1"/>
  </svg>`,

  'wall-top': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="2" y="2" width="44" height="44" fill="#241a0e" rx="2"/>
    <rect x="0" y="40" width="48" height="8" fill="#3a2a14"/>
    <line x1="0" y1="40" x2="48" y2="40" stroke="#4a3a1e" stroke-width="1"/>
  </svg>`,

  'wall-bottom': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="2" y="2" width="44" height="44" fill="#241a0e" rx="2"/>
    <rect x="0" y="0" width="48" height="8" fill="#3a2a14"/>
    <line x1="0" y1="8" x2="48" y2="8" stroke="#4a3a1e" stroke-width="1"/>
  </svg>`,

  'wall-left': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="2" y="2" width="44" height="44" fill="#241a0e" rx="2"/>
    <rect x="40" y="0" width="8" height="48" fill="#3a2a14"/>
    <line x1="40" y1="0" x2="40" y2="48" stroke="#4a3a1e" stroke-width="1"/>
  </svg>`,

  'wall-right': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="2" y="2" width="44" height="44" fill="#241a0e" rx="2"/>
    <rect x="0" y="0" width="8" height="48" fill="#3a2a14"/>
    <line x1="8" y1="0" x2="8" y2="48" stroke="#4a3a1e" stroke-width="1"/>
  </svg>`,

  'wall-corner-tl': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="2" y="2" width="44" height="44" fill="#241a0e" rx="2"/>
    <rect x="40" y="0" width="8" height="48" fill="#3a2a14"/>
    <rect x="0" y="40" width="48" height="8" fill="#3a2a14"/>
    <rect x="40" y="40" width="8" height="8" fill="#4a3a1e"/>
  </svg>`,

  'wall-corner-tr': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="2" y="2" width="44" height="44" fill="#241a0e" rx="2"/>
    <rect x="0" y="0" width="8" height="48" fill="#3a2a14"/>
    <rect x="0" y="40" width="48" height="8" fill="#3a2a14"/>
    <rect x="0" y="40" width="8" height="8" fill="#4a3a1e"/>
  </svg>`,

  'wall-corner-bl': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="2" y="2" width="44" height="44" fill="#241a0e" rx="2"/>
    <rect x="40" y="0" width="8" height="48" fill="#3a2a14"/>
    <rect x="0" y="0" width="48" height="8" fill="#3a2a14"/>
    <rect x="40" y="0" width="8" height="8" fill="#4a3a1e"/>
  </svg>`,

  'wall-corner-br': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="2" y="2" width="44" height="44" fill="#241a0e" rx="2"/>
    <rect x="0" y="0" width="8" height="48" fill="#3a2a14"/>
    <rect x="0" y="0" width="48" height="8" fill="#3a2a14"/>
    <rect x="0" y="0" width="8" height="8" fill="#4a3a1e"/>
  </svg>`,

  // === DOORS ===
  'door': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="8" y="4" width="32" height="44" fill="#3a2510" rx="3"/>
    <rect x="10" y="6" width="28" height="40" fill="#4a3518" rx="2"/>
    <circle cx="33" cy="28" r="2.5" fill="#d4af37"/>
    <line x1="24" y1="6" x2="24" y2="46" stroke="#3a2510" stroke-width="1"/>
    <rect x="12" y="8" width="10" height="16" fill="#3a2510" rx="1" opacity="0.5"/>
    <rect x="26" y="8" width="10" height="16" fill="#3a2510" rx="1" opacity="0.5"/>
  </svg>`,

  'door-locked': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="8" y="4" width="32" height="44" fill="#2a1a08" rx="3"/>
    <rect x="10" y="6" width="28" height="40" fill="#352210" rx="2"/>
    <circle cx="33" cy="28" r="2.5" fill="#8b7355" opacity="0.6"/>
    <line x1="24" y1="6" x2="24" y2="46" stroke="#2a1a08" stroke-width="1"/>
    <rect x="19" y="20" width="10" height="8" fill="none" stroke="#8b7355" stroke-width="1.5" rx="2"/>
    <rect x="21" y="28" width="6" height="6" fill="#8b7355" rx="1"/>
  </svg>`,
};
