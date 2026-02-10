/**
 * Theater Backstage / Placeholder world theme tiles.
 * Tiles: dusty-floor, old-piano, sheet-music, shelf, crate, rope, poster, cobweb
 */

const S = 48;

export const tiles = {
  'dusty-floor': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1610"/>
    <rect x="1" y="1" width="46" height="46" fill="#221c14"/>
    <circle cx="10" cy="15" r="1" fill="#2a2418" opacity="0.6"/>
    <circle cx="35" cy="8" r="1.5" fill="#2a2418" opacity="0.5"/>
    <circle cx="20" cy="38" r="1" fill="#2a2418" opacity="0.4"/>
    <circle cx="40" cy="30" r="0.8" fill="#2a2418" opacity="0.5"/>
  </svg>`,

  'old-piano': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#221c14"/>
    <rect x="6" y="8" width="36" height="32" fill="#1a1008" rx="2"/>
    <rect x="8" y="10" width="32" height="14" fill="#2a1e10" rx="1"/>
    <rect x="10" y="12" width="4" height="10" fill="#e8e0d0"/>
    <rect x="15" y="12" width="4" height="10" fill="#e8e0d0"/>
    <rect x="20" y="12" width="4" height="10" fill="#e8e0d0"/>
    <rect x="25" y="12" width="4" height="10" fill="#e8e0d0"/>
    <rect x="30" y="12" width="4" height="10" fill="#e8e0d0"/>
    <rect x="35" y="12" width="3" height="10" fill="#e8e0d0"/>
    <rect x="12" y="12" width="3" height="6" fill="#1a1008"/>
    <rect x="17" y="12" width="3" height="6" fill="#1a1008"/>
    <rect x="27" y="12" width="3" height="6" fill="#1a1008"/>
    <rect x="32" y="12" width="3" height="6" fill="#1a1008"/>
    <rect x="8" y="36" width="4" height="6" fill="#2a1e10"/>
    <rect x="36" y="36" width="4" height="6" fill="#2a1e10"/>
  </svg>`,

  'sheet-music': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#221c14"/>
    <rect x="12" y="14" width="24" height="28" fill="#e8dcc0" rx="1" transform="rotate(-5 24 28)"/>
    <line x1="14" y1="20" x2="34" y2="19" stroke="#444" stroke-width="0.5"/>
    <line x1="14" y1="24" x2="34" y2="23" stroke="#444" stroke-width="0.5"/>
    <line x1="14" y1="28" x2="34" y2="27" stroke="#444" stroke-width="0.5"/>
    <line x1="14" y1="32" x2="34" y2="31" stroke="#444" stroke-width="0.5"/>
    <circle cx="18" cy="20" r="1.5" fill="#333"/>
    <circle cx="26" cy="24" r="1.5" fill="#333"/>
    <circle cx="22" cy="28" r="1.5" fill="#333"/>
    <circle cx="30" cy="32" r="1.5" fill="#333"/>
  </svg>`,

  'shelf': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#221c14"/>
    <rect x="4" y="4" width="40" height="40" fill="#2a1e10" rx="1"/>
    <rect x="4" y="4" width="40" height="3" fill="#3a2a14"/>
    <rect x="4" y="18" width="40" height="3" fill="#3a2a14"/>
    <rect x="4" y="32" width="40" height="3" fill="#3a2a14"/>
    <rect x="8" y="8" width="6" height="10" fill="#4a6080" rx="1"/>
    <rect x="16" y="9" width="5" height="9" fill="#6a4030" rx="1"/>
    <rect x="23" y="7" width="7" height="11" fill="#3a5040" rx="1"/>
    <rect x="8" y="22" width="8" height="10" fill="#705030" rx="1"/>
    <rect x="20" y="23" width="6" height="9" fill="#4a3060" rx="1"/>
    <rect x="30" y="21" width="7" height="11" fill="#6a5020" rx="1"/>
  </svg>`,

  'crate': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#221c14"/>
    <rect x="8" y="12" width="32" height="28" fill="#5a4020" rx="2"/>
    <rect x="10" y="14" width="28" height="24" fill="#6a5030" rx="1"/>
    <line x1="8" y1="26" x2="40" y2="26" stroke="#5a4020" stroke-width="2"/>
    <line x1="24" y1="12" x2="24" y2="40" stroke="#5a4020" stroke-width="2"/>
    <rect x="20" y="22" width="8" height="8" fill="#4a3018" rx="1"/>
  </svg>`,

  'rope': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#221c14"/>
    <path d="M24 0 Q20 12 24 24 Q28 36 24 48" fill="none" stroke="#8b7355" stroke-width="3"/>
    <path d="M24 0 Q20 12 24 24 Q28 36 24 48" fill="none" stroke="#9a8465" stroke-width="1.5"/>
  </svg>`,

  'poster': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#241a0e"/>
    <rect x="8" y="6" width="32" height="36" fill="#e8dcc0" rx="1"/>
    <rect x="10" y="8" width="28" height="20" fill="#6a4040"/>
    <circle cx="24" cy="18" r="6" fill="#8a5050"/>
    <rect x="12" y="30" width="24" height="2" fill="#555" rx="1"/>
    <rect x="16" y="34" width="16" height="1.5" fill="#777" rx="1"/>
    <rect x="14" y="37" width="20" height="1.5" fill="#777" rx="1"/>
  </svg>`,

  'cobweb': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#221c14"/>
    <path d="M0 0 Q24 8 48 0" fill="none" stroke="#aaa" stroke-width="0.4" opacity="0.3"/>
    <path d="M0 0 Q8 24 0 48" fill="none" stroke="#aaa" stroke-width="0.4" opacity="0.3"/>
    <path d="M0 0 L24 24" fill="none" stroke="#aaa" stroke-width="0.3" opacity="0.25"/>
    <path d="M0 0 L12 4 L24 12 L36 24" fill="none" stroke="#aaa" stroke-width="0.3" opacity="0.2"/>
  </svg>`,

  'carpet-blue': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0f1a2a"/>
    <rect x="1" y="1" width="46" height="46" fill="#152030"/>
    <path d="M4 4h40v40H4z" fill="none" stroke="#1a2a40" stroke-width="0.5" opacity="0.5"/>
    <line x1="12" y1="0" x2="12" y2="48" stroke="#0f1a2a" stroke-width="0.3" opacity="0.3"/>
    <line x1="24" y1="0" x2="24" y2="48" stroke="#0f1a2a" stroke-width="0.3" opacity="0.3"/>
    <line x1="36" y1="0" x2="36" y2="48" stroke="#0f1a2a" stroke-width="0.3" opacity="0.3"/>
  </svg>`,

  'wall-blue': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0e18"/>
    <rect x="2" y="2" width="44" height="44" fill="#101828" rx="2"/>
    <rect x="4" y="4" width="40" height="18" fill="#142030" rx="1"/>
    <rect x="4" y="26" width="40" height="18" fill="#142030" rx="1"/>
    <line x1="24" y1="4" x2="24" y2="22" stroke="#0a0e18" stroke-width="1"/>
    <line x1="12" y1="26" x2="12" y2="44" stroke="#0a0e18" stroke-width="1"/>
    <line x1="36" y1="26" x2="36" y2="44" stroke="#0a0e18" stroke-width="1"/>
  </svg>`,

  'door-blue': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0e18"/>
    <rect x="8" y="4" width="32" height="44" fill="#1a2540" rx="3"/>
    <rect x="10" y="6" width="28" height="40" fill="#253550" rx="2"/>
    <circle cx="33" cy="28" r="2.5" fill="#6a9fd8"/>
    <line x1="24" y1="6" x2="24" y2="46" stroke="#1a2540" stroke-width="1"/>
    <rect x="12" y="8" width="10" height="16" fill="#1a2540" rx="1" opacity="0.5"/>
    <rect x="26" y="8" width="10" height="16" fill="#1a2540" rx="1" opacity="0.5"/>
  </svg>`,

  'floor-stone': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1a1e"/>
    <rect x="1" y="1" width="22" height="22" fill="#222228" rx="1"/>
    <rect x="25" y="1" width="22" height="22" fill="#1e1e24" rx="1"/>
    <rect x="1" y="25" width="22" height="22" fill="#1e1e24" rx="1"/>
    <rect x="25" y="25" width="22" height="22" fill="#222228" rx="1"/>
  </svg>`,

  'curtain-prop': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#221c14"/>
    <rect x="8" y="4" width="12" height="36" fill="#5a1828" rx="1"/>
    <rect x="10" y="4" width="3" height="36" fill="#6a2030" opacity="0.5"/>
    <rect x="28" y="8" width="14" height="28" fill="#4a4030" rx="2"/>
    <rect x="30" y="10" width="10" height="10" fill="#5a5040" rx="1"/>
    <circle cx="35" cy="30" r="3" fill="#d4af37" opacity="0.4"/>
  </svg>`,
};
