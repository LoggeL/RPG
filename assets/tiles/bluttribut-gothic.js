/**
 * Bluttribut Gothic theme tiles — 18th-century village & vampire castle.
 * Palette: Burgundy (#6a1020), Night-blue (#0a1428), Candlelight-orange (#d4923a), Earth (#3a2a1a)
 */

const S = 48;

export const tiles = {
  'cobblestone': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#2a2218"/>
    <rect x="2" y="2" width="20" height="12" fill="#3a3020" rx="2"/>
    <rect x="24" y="2" width="22" height="10" fill="#342c1e" rx="2"/>
    <rect x="1" y="16" width="14" height="14" fill="#342c1e" rx="2"/>
    <rect x="17" y="15" width="18" height="12" fill="#3a3020" rx="2"/>
    <rect x="37" y="14" width="10" height="14" fill="#302818" rx="2"/>
    <rect x="2" y="32" width="22" height="14" fill="#302818" rx="2"/>
    <rect x="26" y="29" width="20" height="11" fill="#3a3020" rx="2"/>
    <rect x="30" y="42" width="16" height="5" fill="#342c1e" rx="1"/>
    <line x1="0" y1="15" x2="48" y2="15" stroke="#221a10" stroke-width="0.5" opacity="0.4"/>
    <line x1="0" y1="30" x2="48" y2="30" stroke="#221a10" stroke-width="0.5" opacity="0.4"/>
  </svg>`,

  'wooden-floor': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#3a2a1a"/>
    <rect x="0" y="0" width="48" height="11" fill="#42301e"/>
    <rect x="0" y="12" width="48" height="11" fill="#3a2a1a"/>
    <rect x="0" y="24" width="48" height="11" fill="#42301e"/>
    <rect x="0" y="36" width="48" height="12" fill="#3a2a1a"/>
    <line x1="16" y1="0" x2="16" y2="11" stroke="#2a1a0e" stroke-width="0.5" opacity="0.4"/>
    <line x1="32" y1="12" x2="32" y2="23" stroke="#2a1a0e" stroke-width="0.5" opacity="0.4"/>
    <line x1="20" y1="24" x2="20" y2="35" stroke="#2a1a0e" stroke-width="0.5" opacity="0.4"/>
    <line x1="36" y1="36" x2="36" y2="48" stroke="#2a1a0e" stroke-width="0.5" opacity="0.4"/>
    <line x1="0" y1="11" x2="48" y2="11" stroke="#2a1a0e" stroke-width="0.8" opacity="0.3"/>
    <line x1="0" y1="23" x2="48" y2="23" stroke="#2a1a0e" stroke-width="0.8" opacity="0.3"/>
    <line x1="0" y1="35" x2="48" y2="35" stroke="#2a1a0e" stroke-width="0.8" opacity="0.3"/>
  </svg>`,

  'stone-floor': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1828"/>
    <rect x="1" y="1" width="22" height="22" fill="#1e1c2c" rx="1"/>
    <rect x="25" y="1" width="22" height="22" fill="#1c1a28" rx="1"/>
    <rect x="1" y="25" width="22" height="22" fill="#1c1a28" rx="1"/>
    <rect x="25" y="25" width="22" height="22" fill="#1e1c2c" rx="1"/>
    <line x1="24" y1="0" x2="24" y2="48" stroke="#14121e" stroke-width="1" opacity="0.5"/>
    <line x1="0" y1="24" x2="48" y2="24" stroke="#14121e" stroke-width="1" opacity="0.5"/>
    <circle cx="12" cy="12" r="1" fill="#222038" opacity="0.4"/>
    <circle cx="36" cy="36" r="1" fill="#222038" opacity="0.4"/>
  </svg>`,

  'carpet-burgundy': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#4a0e18"/>
    <rect x="2" y="2" width="44" height="44" fill="#5a1420"/>
    <rect x="4" y="4" width="40" height="40" fill="#6a1828"/>
    <line x1="4" y1="14" x2="44" y2="14" stroke="#7a2030" stroke-width="0.5" opacity="0.3"/>
    <line x1="4" y1="24" x2="44" y2="24" stroke="#7a2030" stroke-width="0.5" opacity="0.3"/>
    <line x1="4" y1="34" x2="44" y2="34" stroke="#7a2030" stroke-width="0.5" opacity="0.3"/>
    <line x1="14" y1="4" x2="14" y2="44" stroke="#7a2030" stroke-width="0.5" opacity="0.3"/>
    <line x1="24" y1="4" x2="24" y2="44" stroke="#7a2030" stroke-width="0.5" opacity="0.3"/>
    <line x1="34" y1="4" x2="34" y2="44" stroke="#7a2030" stroke-width="0.5" opacity="0.3"/>
    <rect x="10" y="10" width="8" height="8" fill="#7a2030" opacity="0.2" rx="1"/>
    <rect x="30" y="30" width="8" height="8" fill="#7a2030" opacity="0.2" rx="1"/>
  </svg>`,

  'wall-timber': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#e8d8b8"/>
    <rect x="0" y="0" width="48" height="48" fill="#dcc8a0"/>
    <line x1="0" y1="24" x2="48" y2="24" stroke="#4a3018" stroke-width="4"/>
    <line x1="24" y1="0" x2="24" y2="24" stroke="#4a3018" stroke-width="4"/>
    <line x1="0" y1="0" x2="24" y2="24" stroke="#4a3018" stroke-width="3"/>
    <line x1="48" y1="24" x2="24" y2="48" stroke="#4a3018" stroke-width="3"/>
    <line x1="0" y1="48" x2="48" y2="48" stroke="#4a3018" stroke-width="2"/>
    <line x1="0" y1="0" x2="48" y2="0" stroke="#4a3018" stroke-width="2"/>
    <rect x="2" y="2" width="20" height="20" fill="#dcc8a0" opacity="0.3"/>
    <rect x="26" y="26" width="20" height="20" fill="#d4c098" opacity="0.3"/>
  </svg>`,

  'wall-stone-castle': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a1428"/>
    <rect x="1" y="1" width="22" height="14" fill="#141e38" rx="1"/>
    <rect x="25" y="1" width="22" height="14" fill="#121a32" rx="1"/>
    <rect x="1" y="17" width="14" height="14" fill="#121a32" rx="1"/>
    <rect x="17" y="17" width="14" height="14" fill="#141e38" rx="1"/>
    <rect x="33" y="17" width="14" height="14" fill="#121a32" rx="1"/>
    <rect x="1" y="33" width="22" height="14" fill="#141e38" rx="1"/>
    <rect x="25" y="33" width="22" height="14" fill="#121a32" rx="1"/>
    <line x1="0" y1="16" x2="48" y2="16" stroke="#0a1020" stroke-width="1"/>
    <line x1="0" y1="32" x2="48" y2="32" stroke="#0a1020" stroke-width="1"/>
    <line x1="24" y1="0" x2="24" y2="16" stroke="#0a1020" stroke-width="1"/>
    <line x1="16" y1="16" x2="16" y2="32" stroke="#0a1020" stroke-width="1"/>
    <line x1="32" y1="16" x2="32" y2="32" stroke="#0a1020" stroke-width="1"/>
    <line x1="24" y1="32" x2="24" y2="48" stroke="#0a1020" stroke-width="1"/>
  </svg>`,

  'wall-village': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#2a2218"/>
    <rect x="1" y="1" width="46" height="20" fill="#3a3020" rx="1"/>
    <rect x="1" y="23" width="46" height="24" fill="#342c1e" rx="1"/>
    <line x1="0" y1="22" x2="48" y2="22" stroke="#1a1408" stroke-width="1.5"/>
    <line x1="24" y1="0" x2="24" y2="22" stroke="#1a1408" stroke-width="0.8" opacity="0.5"/>
    <line x1="16" y1="22" x2="16" y2="48" stroke="#1a1408" stroke-width="0.8" opacity="0.5"/>
    <line x1="36" y1="22" x2="36" y2="48" stroke="#1a1408" stroke-width="0.8" opacity="0.5"/>
    <rect x="4" y="4" width="6" height="4" fill="#d4923a" opacity="0.08" rx="1"/>
  </svg>`,

  'door-wood-village': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#2a2218"/>
    <rect x="8" y="2" width="32" height="44" fill="#4a3018" rx="3"/>
    <rect x="10" y="4" width="28" height="40" fill="#5a3820" rx="2"/>
    <line x1="24" y1="4" x2="24" y2="44" stroke="#4a3018" stroke-width="1.5"/>
    <rect x="10" y="4" width="14" height="19" fill="#5a3820" stroke="#4a3018" stroke-width="0.5" rx="1"/>
    <rect x="24" y="4" width="14" height="19" fill="#5a3820" stroke="#4a3018" stroke-width="0.5" rx="1"/>
    <rect x="10" y="25" width="14" height="19" fill="#5a3820" stroke="#4a3018" stroke-width="0.5" rx="1"/>
    <rect x="24" y="25" width="14" height="19" fill="#5a3820" stroke="#4a3018" stroke-width="0.5" rx="1"/>
    <circle cx="22" cy="26" r="2" fill="#d4923a" opacity="0.8"/>
    <rect x="8" y="0" width="32" height="3" fill="#3a2818" rx="1"/>
  </svg>`,

  'door-castle': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a1428"/>
    <rect x="6" y="2" width="36" height="44" fill="#1a1428" rx="2"/>
    <path d="M10 18 Q24 2 38 18 L38 46 L10 46 Z" fill="#2a1e38"/>
    <line x1="24" y1="6" x2="24" y2="46" stroke="#1a1428" stroke-width="1.5"/>
    <circle cx="21" cy="28" r="2.5" fill="#d4923a" opacity="0.7"/>
    <circle cx="27" cy="28" r="2.5" fill="#d4923a" opacity="0.7"/>
    <rect x="6" y="44" width="36" height="4" fill="#141028" rx="1"/>
    <line x1="6" y1="2" x2="6" y2="46" stroke="#d4923a" stroke-width="0.5" opacity="0.2"/>
    <line x1="42" y1="2" x2="42" y2="46" stroke="#d4923a" stroke-width="0.5" opacity="0.2"/>
  </svg>`,

  'door-castle-locked': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a1428"/>
    <rect x="6" y="2" width="36" height="44" fill="#141028" rx="2"/>
    <path d="M10 18 Q24 2 38 18 L38 46 L10 46 Z" fill="#1a1228"/>
    <line x1="24" y1="6" x2="24" y2="46" stroke="#0e0c1e" stroke-width="1.5"/>
    <rect x="18" y="24" width="12" height="10" fill="none" stroke="#6a1020" stroke-width="1.5" rx="2" opacity="0.7"/>
    <rect x="20" y="34" width="8" height="5" fill="#6a1020" rx="1" opacity="0.5"/>
    <line x1="6" y1="2" x2="6" y2="46" stroke="#6a1020" stroke-width="0.5" opacity="0.3"/>
    <line x1="42" y1="2" x2="42" y2="46" stroke="#6a1020" stroke-width="0.5" opacity="0.3"/>
  </svg>`,

  'bench-wood': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="4" y="22" width="40" height="6" fill="#5a3820" rx="1"/>
    <rect x="4" y="20" width="40" height="3" fill="#6a4428" rx="1"/>
    <rect x="6" y="28" width="4" height="14" fill="#4a3018" rx="1"/>
    <rect x="38" y="28" width="4" height="14" fill="#4a3018" rx="1"/>
    <rect x="4" y="8" width="4" height="14" fill="#4a3018" rx="1"/>
    <rect x="40" y="8" width="4" height="14" fill="#4a3018" rx="1"/>
    <rect x="4" y="8" width="40" height="4" fill="#5a3820" rx="1"/>
  </svg>`,

  'market-stand': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="4" y="24" width="40" height="20" fill="#4a3018" rx="2"/>
    <rect x="6" y="26" width="36" height="16" fill="#5a3820" rx="1"/>
    <polygon points="0,20 24,4 48,20" fill="#6a1020" opacity="0.85"/>
    <polygon points="2,20 24,6 46,20" fill="#7a1828" opacity="0.7"/>
    <line x1="24" y1="4" x2="24" y2="24" stroke="#4a3018" stroke-width="2"/>
    <rect x="10" y="28" width="8" height="6" fill="#d4923a" opacity="0.3" rx="1"/>
    <rect x="22" y="28" width="8" height="6" fill="#8a6a2a" opacity="0.3" rx="1"/>
    <circle cx="36" cy="32" r="3" fill="#6a8a2a" opacity="0.3"/>
  </svg>`,

  'table-wood': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="4" y="16" width="40" height="20" fill="#5a3820" rx="2"/>
    <rect x="2" y="14" width="44" height="4" fill="#6a4428" rx="1"/>
    <rect x="6" y="36" width="4" height="10" fill="#4a3018" rx="1"/>
    <rect x="38" y="36" width="4" height="10" fill="#4a3018" rx="1"/>
    <rect x="16" y="18" width="6" height="4" fill="#d4923a" opacity="0.15" rx="1"/>
    <circle cx="32" cy="22" r="3" fill="#6a1020" opacity="0.2"/>
  </svg>`,

  'stove': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="6" y="8" width="36" height="36" fill="#2a2a2a" rx="3"/>
    <rect x="8" y="10" width="32" height="14" fill="#1a1a1a" rx="2"/>
    <rect x="12" y="14" width="10" height="8" fill="#d4923a" opacity="0.3" rx="1"/>
    <rect x="26" y="14" width="10" height="8" fill="#d4923a" opacity="0.2" rx="1"/>
    <rect x="8" y="28" width="32" height="14" fill="#1a1a1a" rx="2"/>
    <rect x="10" y="30" width="28" height="4" fill="#d4923a" opacity="0.1" rx="1"/>
    <rect x="16" y="4" width="4" height="6" fill="#3a3a3a" rx="1"/>
    <circle cx="18" cy="3" r="3" fill="#555" opacity="0.3"/>
  </svg>`,

  'wardrobe': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="6" y="4" width="36" height="40" fill="#4a3018" rx="2"/>
    <rect x="8" y="6" width="15" height="36" fill="#5a3820" rx="1"/>
    <rect x="25" y="6" width="15" height="36" fill="#5a3820" rx="1"/>
    <line x1="24" y1="6" x2="24" y2="42" stroke="#3a2010" stroke-width="2"/>
    <circle cx="21" cy="24" r="1.5" fill="#d4923a" opacity="0.6"/>
    <circle cx="27" cy="24" r="1.5" fill="#d4923a" opacity="0.6"/>
    <rect x="4" y="2" width="40" height="4" fill="#3a2010" rx="1"/>
    <rect x="8" y="44" width="6" height="3" fill="#3a2010" rx="1"/>
    <rect x="34" y="44" width="6" height="3" fill="#3a2010" rx="1"/>
  </svg>`,

  'bed-canopy': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="4" y="20" width="40" height="24" fill="#3a2010" rx="2"/>
    <rect x="6" y="22" width="36" height="20" fill="#6a1828" rx="1"/>
    <rect x="8" y="24" width="32" height="16" fill="#7a2030" opacity="0.6" rx="1"/>
    <rect x="4" y="4" width="4" height="18" fill="#3a2010" rx="1"/>
    <rect x="40" y="4" width="4" height="18" fill="#3a2010" rx="1"/>
    <rect x="4" y="2" width="40" height="4" fill="#3a2010" rx="1"/>
    <path d="M8 6 Q24 14 40 6" fill="#6a1020" opacity="0.5"/>
    <rect x="10" y="28" width="14" height="10" fill="#e8d8b8" opacity="0.4" rx="2"/>
  </svg>`,

  'bookshelf': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="4" y="2" width="40" height="44" fill="#3a2010" rx="2"/>
    <rect x="6" y="4" width="36" height="12" fill="#2a1808" rx="1"/>
    <rect x="6" y="18" width="36" height="12" fill="#2a1808" rx="1"/>
    <rect x="6" y="32" width="36" height="12" fill="#2a1808" rx="1"/>
    <rect x="8" y="6" width="4" height="8" fill="#6a1020" rx="0.5"/>
    <rect x="13" y="5" width="5" height="9" fill="#0a1428" rx="0.5"/>
    <rect x="19" y="6" width="4" height="8" fill="#4a6a20" rx="0.5"/>
    <rect x="24" y="5" width="6" height="9" fill="#d4923a" opacity="0.5" rx="0.5"/>
    <rect x="31" y="6" width="4" height="8" fill="#6a1020" rx="0.5"/>
    <rect x="36" y="5" width="4" height="9" fill="#0a1428" rx="0.5"/>
    <rect x="8" y="20" width="6" height="8" fill="#4a3018" rx="0.5"/>
    <rect x="15" y="19" width="4" height="9" fill="#6a1020" rx="0.5"/>
    <rect x="20" y="20" width="5" height="8" fill="#0a1428" rx="0.5"/>
    <rect x="26" y="19" width="6" height="9" fill="#d4923a" opacity="0.4" rx="0.5"/>
    <rect x="33" y="20" width="6" height="8" fill="#4a6a20" rx="0.5"/>
    <rect x="8" y="34" width="5" height="8" fill="#0a1428" rx="0.5"/>
    <rect x="14" y="33" width="4" height="9" fill="#d4923a" opacity="0.5" rx="0.5"/>
    <rect x="19" y="34" width="6" height="8" fill="#6a1020" rx="0.5"/>
    <rect x="26" y="33" width="5" height="9" fill="#4a3018" rx="0.5"/>
    <rect x="32" y="34" width="4" height="8" fill="#4a6a20" rx="0.5"/>
    <rect x="37" y="33" width="4" height="9" fill="#0a1428" rx="0.5"/>
  </svg>`,

  'desk-wood': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="2" y="16" width="44" height="8" fill="#5a3820" rx="2"/>
    <rect x="4" y="14" width="40" height="4" fill="#6a4428" rx="1"/>
    <rect x="4" y="24" width="14" height="20" fill="#4a3018" rx="1"/>
    <rect x="30" y="24" width="14" height="20" fill="#4a3018" rx="1"/>
    <rect x="6" y="28" width="10" height="4" fill="#3a2010" rx="0.5"/>
    <rect x="32" y="28" width="10" height="4" fill="#3a2010" rx="0.5"/>
    <rect x="20" y="8" width="10" height="8" fill="#e8d8b8" opacity="0.3" rx="1"/>
    <rect x="34" y="10" width="6" height="4" fill="#0a1428" opacity="0.3" rx="0.5"/>
  </svg>`,

  'staircase': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="4" y="36" width="40" height="8" fill="#3a2818" rx="1"/>
    <rect x="4" y="28" width="32" height="8" fill="#42301e" rx="1"/>
    <rect x="4" y="20" width="24" height="8" fill="#3a2818" rx="1"/>
    <rect x="4" y="12" width="16" height="8" fill="#42301e" rx="1"/>
    <rect x="4" y="4" width="8" height="8" fill="#3a2818" rx="1"/>
    <line x1="4" y1="4" x2="4" y2="44" stroke="#2a1a0e" stroke-width="2"/>
    <line x1="44" y1="36" x2="44" y2="44" stroke="#2a1a0e" stroke-width="1"/>
    <rect x="2" y="2" width="4" height="44" fill="#4a3018" rx="1"/>
  </svg>`,

  'painting-frame': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="6" y="4" width="36" height="32" fill="#3a2010" rx="2"/>
    <rect x="8" y="6" width="32" height="28" fill="#d4923a" opacity="0.15" rx="1"/>
    <rect x="10" y="8" width="28" height="24" fill="#0a1428" opacity="0.4" rx="1"/>
    <circle cx="20" cy="16" r="4" fill="#e8c8a0" opacity="0.3"/>
    <rect x="14" y="22" width="20" height="8" fill="#6a1020" opacity="0.2" rx="1"/>
    <rect x="6" y="4" width="36" height="32" fill="none" stroke="#d4923a" stroke-width="1.5" opacity="0.4" rx="2"/>
  </svg>`,

  'candelabra': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="22" y="18" width="4" height="24" fill="#d4923a" opacity="0.6" rx="1"/>
    <rect x="16" y="38" width="16" height="4" fill="#d4923a" opacity="0.5" rx="2"/>
    <rect x="10" y="16" width="4" height="10" fill="#d4923a" opacity="0.5" rx="1"/>
    <rect x="34" y="16" width="4" height="10" fill="#d4923a" opacity="0.5" rx="1"/>
    <path d="M12 26 Q12 18 24 18" fill="none" stroke="#d4923a" stroke-width="1.5" opacity="0.5"/>
    <path d="M36 26 Q36 18 24 18" fill="none" stroke="#d4923a" stroke-width="1.5" opacity="0.5"/>
    <ellipse cx="12" cy="14" rx="3" ry="4" fill="#d4923a" opacity="0.6"/>
    <ellipse cx="12" cy="12" rx="2" ry="3" fill="#ffcc44" opacity="0.4"/>
    <ellipse cx="24" cy="16" rx="3" ry="4" fill="#d4923a" opacity="0.6"/>
    <ellipse cx="24" cy="14" rx="2" ry="3" fill="#ffcc44" opacity="0.4"/>
    <ellipse cx="36" cy="14" rx="3" ry="4" fill="#d4923a" opacity="0.6"/>
    <ellipse cx="36" cy="12" rx="2" ry="3" fill="#ffcc44" opacity="0.4"/>
  </svg>`,

  'curtain-velvet': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <rect x="0" y="0" width="48" height="4" fill="#d4923a" opacity="0.4"/>
    <path d="M0 4 Q8 20 4 48 L0 48 Z" fill="#6a1020" opacity="0.8"/>
    <path d="M0 4 Q12 24 8 48 L4 48 Q8 20 0 4 Z" fill="#7a1828" opacity="0.6"/>
    <path d="M48 4 Q40 20 44 48 L48 48 Z" fill="#6a1020" opacity="0.8"/>
    <path d="M48 4 Q36 24 40 48 L44 48 Q40 20 48 4 Z" fill="#7a1828" opacity="0.6"/>
    <circle cx="12" cy="6" r="2" fill="#d4923a" opacity="0.5"/>
    <circle cx="36" cy="6" r="2" fill="#d4923a" opacity="0.5"/>
  </svg>`,

  'garlic-chain': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <path d="M4 8 Q24 16 44 8" fill="none" stroke="#6a5a3a" stroke-width="1.5"/>
    <ellipse cx="12" cy="12" rx="4" ry="5" fill="#e8e0d0" opacity="0.8"/>
    <line x1="12" y1="7" x2="12" y2="9" stroke="#6a8a2a" stroke-width="1"/>
    <ellipse cx="24" cy="14" rx="4" ry="5" fill="#e8e0d0" opacity="0.8"/>
    <line x1="24" y1="9" x2="24" y2="11" stroke="#6a8a2a" stroke-width="1"/>
    <ellipse cx="36" cy="12" rx="4" ry="5" fill="#e8e0d0" opacity="0.8"/>
    <line x1="36" y1="7" x2="36" y2="9" stroke="#6a8a2a" stroke-width="1"/>
  </svg>`,

  'flower-garland': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="none"/>
    <path d="M2 10 Q24 22 46 10" fill="none" stroke="#4a6a20" stroke-width="2" opacity="0.6"/>
    <circle cx="10" cy="12" r="3" fill="#d44060" opacity="0.7"/>
    <circle cx="20" cy="16" r="3" fill="#e8a040" opacity="0.7"/>
    <circle cx="30" cy="16" r="3" fill="#d44060" opacity="0.7"/>
    <circle cx="40" cy="12" r="3" fill="#e8a040" opacity="0.7"/>
    <circle cx="15" cy="15" r="2" fill="#e8e040" opacity="0.5"/>
    <circle cx="35" cy="15" r="2" fill="#e8e040" opacity="0.5"/>
  </svg>`,
};
