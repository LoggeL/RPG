/**
 * Theater Lobby theme tiles. Extends _base.
 * Tiles: carpet, carpet-border, chandelier, velvet-seat, column, curtain, stage
 */

const S = 48;

export const tiles = {
  // === CARPET ===
  'carpet': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#4a1520"/>
    <rect x="1" y="1" width="46" height="46" fill="#5a1a28"/>
    <path d="M4 4h40v40H4z" fill="none" stroke="#6a2030" stroke-width="0.5" opacity="0.5"/>
    <line x1="12" y1="0" x2="12" y2="48" stroke="#4a1520" stroke-width="0.3" opacity="0.3"/>
    <line x1="24" y1="0" x2="24" y2="48" stroke="#4a1520" stroke-width="0.3" opacity="0.3"/>
    <line x1="36" y1="0" x2="36" y2="48" stroke="#4a1520" stroke-width="0.3" opacity="0.3"/>
  </svg>`,

  'carpet-ornate': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#5a1a28"/>
    <rect x="4" y="4" width="40" height="40" fill="#6a2030" rx="2"/>
    <path d="M12 12 L24 8 L36 12 L40 24 L36 36 L24 40 L12 36 L8 24 Z" fill="none" stroke="#d4af37" stroke-width="0.8" opacity="0.4"/>
    <circle cx="24" cy="24" r="4" fill="none" stroke="#d4af37" stroke-width="0.5" opacity="0.3"/>
  </svg>`,

  // === FURNITURE ===
  'chandelier': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#332b1f"/>
    <circle cx="24" cy="24" r="14" fill="#3a3020" opacity="0.5"/>
    <circle cx="24" cy="24" r="8" fill="#d4af37" opacity="0.15"/>
    <circle cx="24" cy="24" r="3" fill="#d4af37" opacity="0.4"/>
    <line x1="24" y1="8" x2="24" y2="16" stroke="#d4af37" stroke-width="1" opacity="0.6"/>
    <line x1="12" y1="20" x2="18" y2="22" stroke="#d4af37" stroke-width="0.8" opacity="0.4"/>
    <line x1="36" y1="20" x2="30" y2="22" stroke="#d4af37" stroke-width="0.8" opacity="0.4"/>
    <line x1="16" y1="32" x2="20" y2="28" stroke="#d4af37" stroke-width="0.8" opacity="0.4"/>
    <line x1="32" y1="32" x2="28" y2="28" stroke="#d4af37" stroke-width="0.8" opacity="0.4"/>
    <circle cx="12" cy="20" r="2" fill="#ffdd66" opacity="0.6"/>
    <circle cx="36" cy="20" r="2" fill="#ffdd66" opacity="0.6"/>
    <circle cx="16" cy="32" r="2" fill="#ffdd66" opacity="0.6"/>
    <circle cx="32" cy="32" r="2" fill="#ffdd66" opacity="0.6"/>
  </svg>`,

  'velvet-seat': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#332b1f"/>
    <rect x="10" y="20" width="28" height="22" fill="#6a1828" rx="3"/>
    <rect x="12" y="22" width="24" height="12" fill="#7a2030" rx="2"/>
    <rect x="8" y="14" width="32" height="8" fill="#5a1220" rx="3"/>
    <rect x="10" y="16" width="28" height="4" fill="#6a1828" rx="1"/>
    <line x1="14" y1="42" x2="14" y2="46" stroke="#8b7355" stroke-width="2"/>
    <line x1="34" y1="42" x2="34" y2="46" stroke="#8b7355" stroke-width="2"/>
  </svg>`,

  'column': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#332b1f"/>
    <rect x="14" y="6" width="20" height="36" fill="#8b7a60" rx="2"/>
    <rect x="16" y="8" width="16" height="32" fill="#9a8a70"/>
    <rect x="12" y="2" width="24" height="6" fill="#7a6a50" rx="1"/>
    <rect x="12" y="40" width="24" height="6" fill="#7a6a50" rx="1"/>
    <line x1="20" y1="8" x2="20" y2="40" stroke="#8b7a60" stroke-width="0.5" opacity="0.5"/>
    <line x1="28" y1="8" x2="28" y2="40" stroke="#8b7a60" stroke-width="0.5" opacity="0.5"/>
  </svg>`,

  'curtain-left': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="24" y="0" width="24" height="48" fill="#6a1020"/>
    <rect x="28" y="0" width="4" height="48" fill="#7a1828" opacity="0.6"/>
    <rect x="38" y="0" width="4" height="48" fill="#7a1828" opacity="0.6"/>
    <path d="M24 0 Q20 24 24 48" fill="none" stroke="#8a2030" stroke-width="2"/>
    <rect x="24" y="0" width="24" height="4" fill="#d4af37" opacity="0.3"/>
  </svg>`,

  'curtain-right': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="0" y="0" width="24" height="48" fill="#6a1020"/>
    <rect x="6" y="0" width="4" height="48" fill="#7a1828" opacity="0.6"/>
    <rect x="16" y="0" width="4" height="48" fill="#7a1828" opacity="0.6"/>
    <path d="M24 0 Q28 24 24 48" fill="none" stroke="#8a2030" stroke-width="2"/>
    <rect x="0" y="0" width="24" height="4" fill="#d4af37" opacity="0.3"/>
  </svg>`,

  'stage': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#3a2a14"/>
    <rect x="0" y="0" width="48" height="44" fill="#4a3518"/>
    <line x1="0" y1="12" x2="48" y2="12" stroke="#3a2a14" stroke-width="0.5" opacity="0.4"/>
    <line x1="0" y1="24" x2="48" y2="24" stroke="#3a2a14" stroke-width="0.5" opacity="0.4"/>
    <line x1="0" y1="36" x2="48" y2="36" stroke="#3a2a14" stroke-width="0.5" opacity="0.4"/>
    <rect x="0" y="44" width="48" height="4" fill="#2a1a0a"/>
  </svg>`,

  'railing': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#332b1f"/>
    <rect x="0" y="18" width="48" height="4" fill="#d4af37" opacity="0.7" rx="1"/>
    <rect x="0" y="26" width="48" height="4" fill="#d4af37" opacity="0.5" rx="1"/>
    <rect x="6" y="14" width="3" height="20" fill="#8b7355" rx="1"/>
    <rect x="21" y="14" width="3" height="20" fill="#8b7355" rx="1"/>
    <rect x="39" y="14" width="3" height="20" fill="#8b7355" rx="1"/>
  </svg>`,

  'door-portal': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1008"/>
    <rect x="8" y="4" width="32" height="44" fill="#0a0c14" rx="3"/>
    <rect x="10" y="6" width="28" height="40" fill="#0e1018" rx="2"/>
    <rect x="8" y="4" width="32" height="44" fill="none" stroke="#00e5ff" stroke-width="1.5" rx="3" opacity="0.7"/>
    <rect x="6" y="2" width="36" height="46" fill="none" stroke="#ff00aa" stroke-width="0.5" rx="4" opacity="0.4"/>
    <circle cx="24" cy="26" r="8" fill="#00e5ff" opacity="0.06"/>
    <circle cx="24" cy="26" r="4" fill="#00e5ff" opacity="0.1"/>
    <circle cx="24" cy="26" r="1.5" fill="#00e5ff" opacity="0.3"/>
    <line x1="12" y1="12" x2="36" y2="12" stroke="#00e5ff" stroke-width="0.3" opacity="0.3"/>
    <line x1="12" y1="40" x2="36" y2="40" stroke="#00e5ff" stroke-width="0.3" opacity="0.3"/>
  </svg>`,
};
