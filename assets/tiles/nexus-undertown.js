/**
 * Nexus Undertown theme tiles — cyberpunk bar & workshop.
 * Palette: navy (#0a0c14), charcoal (#111420), neon cyan (#00e5ff), magenta (#ff00aa), rust (#5a4a3a)
 */

const S = 48;

export const tiles = {
  'floor-metal': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#111420"/>
    <rect x="1" y="1" width="46" height="46" fill="#161a28"/>
    <line x1="0" y1="24" x2="48" y2="24" stroke="#111420" stroke-width="0.5" opacity="0.4"/>
    <line x1="24" y1="0" x2="24" y2="48" stroke="#111420" stroke-width="0.5" opacity="0.4"/>
    <rect x="4" y="4" width="8" height="8" fill="#1a1e2c" rx="1" opacity="0.3"/>
    <rect x="36" y="36" width="8" height="8" fill="#1a1e2c" rx="1" opacity="0.3"/>
  </svg>`,

  'floor-neon': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0c14"/>
    <rect x="1" y="1" width="46" height="46" fill="#0e1018"/>
    <rect x="0" y="22" width="48" height="4" fill="#00e5ff" opacity="0.08"/>
    <line x1="0" y1="24" x2="48" y2="24" stroke="#00e5ff" stroke-width="0.5" opacity="0.2"/>
    <line x1="24" y1="0" x2="24" y2="48" stroke="#00e5ff" stroke-width="0.3" opacity="0.1"/>
  </svg>`,

  'floor-grime': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0c14"/>
    <rect x="1" y="1" width="46" height="46" fill="#0e1018"/>
    <circle cx="12" cy="30" r="4" fill="#1a1510" opacity="0.4"/>
    <circle cx="36" cy="14" r="6" fill="#1a1510" opacity="0.3"/>
    <circle cx="24" cy="40" r="3" fill="#1a1510" opacity="0.35"/>
  </svg>`,

  'wall-cyber': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0c14"/>
    <rect x="2" y="2" width="44" height="44" fill="#0e1018" rx="1"/>
    <rect x="4" y="4" width="40" height="18" fill="#111420" rx="1"/>
    <rect x="4" y="26" width="40" height="18" fill="#111420" rx="1"/>
    <line x1="24" y1="4" x2="24" y2="22" stroke="#0a0c14" stroke-width="1"/>
    <line x1="12" y1="26" x2="12" y2="44" stroke="#0a0c14" stroke-width="1"/>
    <line x1="36" y1="26" x2="36" y2="44" stroke="#0a0c14" stroke-width="1"/>
    <line x1="0" y1="46" x2="48" y2="46" stroke="#00e5ff" stroke-width="0.5" opacity="0.15"/>
  </svg>`,

  'wall-neon-sign': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0c14"/>
    <rect x="2" y="2" width="44" height="44" fill="#0e1018" rx="1"/>
    <rect x="8" y="10" width="32" height="16" fill="#111420" rx="2"/>
    <rect x="10" y="12" width="28" height="12" fill="none" stroke="#ff00aa" stroke-width="1.5" rx="1" opacity="0.7"/>
    <line x1="14" y1="18" x2="34" y2="18" stroke="#ff00aa" stroke-width="1" opacity="0.5"/>
    <circle cx="12" cy="14" r="1" fill="#ff00aa" opacity="0.8"/>
    <circle cx="36" cy="14" r="1" fill="#00e5ff" opacity="0.8"/>
    <rect x="10" y="10" width="28" height="2" fill="#ff00aa" opacity="0.06"/>
  </svg>`,

  'door-cyber': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0c14"/>
    <rect x="8" y="2" width="32" height="44" fill="#161a28" rx="2"/>
    <rect x="10" y="4" width="28" height="40" fill="#1a1e2c" rx="1"/>
    <line x1="24" y1="4" x2="24" y2="44" stroke="#111420" stroke-width="1"/>
    <rect x="30" y="22" width="4" height="4" fill="#00e5ff" rx="1" opacity="0.8"/>
    <line x1="8" y1="2" x2="8" y2="46" stroke="#00e5ff" stroke-width="0.5" opacity="0.3"/>
    <line x1="40" y1="2" x2="40" y2="46" stroke="#00e5ff" stroke-width="0.5" opacity="0.3"/>
  </svg>`,

  'door-cyber-locked': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0c14"/>
    <rect x="8" y="2" width="32" height="44" fill="#111420" rx="2"/>
    <rect x="10" y="4" width="28" height="40" fill="#161a28" rx="1"/>
    <line x1="24" y1="4" x2="24" y2="44" stroke="#0e1018" stroke-width="1"/>
    <rect x="19" y="18" width="10" height="8" fill="none" stroke="#ff00aa" stroke-width="1.5" rx="2" opacity="0.6"/>
    <rect x="21" y="26" width="6" height="6" fill="#ff00aa" rx="1" opacity="0.4"/>
    <line x1="8" y1="2" x2="8" y2="46" stroke="#ff00aa" stroke-width="0.5" opacity="0.2"/>
    <line x1="40" y1="2" x2="40" y2="46" stroke="#ff00aa" stroke-width="0.5" opacity="0.2"/>
  </svg>`,

  'bar-counter': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#111420"/>
    <rect x="0" y="8" width="48" height="32" fill="#1a1510" rx="2"/>
    <rect x="2" y="6" width="44" height="4" fill="#2a2218" rx="1"/>
    <rect x="2" y="6" width="44" height="2" fill="#3a3020" rx="1"/>
    <line x1="0" y1="8" x2="48" y2="8" stroke="#5a4a3a" stroke-width="0.5" opacity="0.6"/>
    <rect x="8" y="10" width="6" height="4" fill="#00e5ff" opacity="0.15" rx="1"/>
    <rect x="20" y="10" width="6" height="4" fill="#ff00aa" opacity="0.1" rx="1"/>
    <rect x="34" y="10" width="6" height="4" fill="#00e5ff" opacity="0.12" rx="1"/>
  </svg>`,

  'booth-seat': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#111420"/>
    <rect x="6" y="14" width="36" height="28" fill="#1a0a18" rx="3"/>
    <rect x="8" y="16" width="32" height="14" fill="#2a1028" rx="2"/>
    <rect x="4" y="8" width="40" height="8" fill="#1a0a18" rx="3"/>
    <rect x="6" y="10" width="36" height="4" fill="#2a1028" rx="1"/>
    <line x1="10" y1="42" x2="10" y2="46" stroke="#5a4a3a" stroke-width="2"/>
    <line x1="38" y1="42" x2="38" y2="46" stroke="#5a4a3a" stroke-width="2"/>
  </svg>`,

  'workbench': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#111420"/>
    <rect x="2" y="16" width="44" height="24" fill="#2a2218" rx="2"/>
    <rect x="4" y="14" width="40" height="4" fill="#3a3020" rx="1"/>
    <rect x="8" y="18" width="8" height="6" fill="#161a28" rx="1"/>
    <rect x="20" y="18" width="12" height="8" fill="#0e1018" rx="1"/>
    <rect x="22" y="20" width="8" height="4" fill="#00e5ff" opacity="0.15" rx="1"/>
    <line x1="6" y1="40" x2="6" y2="46" stroke="#5a4a3a" stroke-width="2"/>
    <line x1="42" y1="40" x2="42" y2="46" stroke="#5a4a3a" stroke-width="2"/>
  </svg>`,

  'cable-floor': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0e1018"/>
    <path d="M0 20 Q12 16 24 24 Q36 32 48 28" fill="none" stroke="#2a2a3a" stroke-width="3" opacity="0.6"/>
    <path d="M0 36 Q16 32 32 38 Q44 42 48 36" fill="none" stroke="#1a1a2a" stroke-width="2" opacity="0.5"/>
    <circle cx="24" cy="24" r="1" fill="#00e5ff" opacity="0.3"/>
  </svg>`,

  'screen-wall': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0c14"/>
    <rect x="2" y="2" width="44" height="44" fill="#0e1018" rx="1"/>
    <rect x="6" y="8" width="36" height="24" fill="#060810" rx="2"/>
    <rect x="8" y="10" width="32" height="20" fill="#0a1020" rx="1"/>
    <line x1="10" y1="14" x2="36" y2="14" stroke="#00e5ff" stroke-width="0.5" opacity="0.4"/>
    <line x1="10" y1="18" x2="30" y2="18" stroke="#00e5ff" stroke-width="0.5" opacity="0.3"/>
    <line x1="10" y1="22" x2="34" y2="22" stroke="#00e5ff" stroke-width="0.5" opacity="0.25"/>
    <line x1="10" y1="26" x2="24" y2="26" stroke="#ff00aa" stroke-width="0.5" opacity="0.3"/>
    <circle cx="38" cy="38" r="2" fill="#00e5ff" opacity="0.2"/>
  </svg>`,

  'server-rack': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0c14"/>
    <rect x="6" y="2" width="36" height="44" fill="#111420" rx="2"/>
    <rect x="8" y="4" width="32" height="8" fill="#161a28" rx="1"/>
    <rect x="8" y="14" width="32" height="8" fill="#161a28" rx="1"/>
    <rect x="8" y="24" width="32" height="8" fill="#161a28" rx="1"/>
    <rect x="8" y="34" width="32" height="8" fill="#161a28" rx="1"/>
    <circle cx="12" cy="8" r="1.5" fill="#00e5ff" opacity="0.6"/>
    <circle cx="12" cy="18" r="1.5" fill="#00e5ff" opacity="0.4"/>
    <circle cx="12" cy="28" r="1.5" fill="#ff00aa" opacity="0.5"/>
    <circle cx="12" cy="38" r="1.5" fill="#00e5ff" opacity="0.7"/>
    <line x1="18" y1="7" x2="36" y2="7" stroke="#1a1e2c" stroke-width="2" opacity="0.5"/>
    <line x1="18" y1="17" x2="36" y2="17" stroke="#1a1e2c" stroke-width="2" opacity="0.5"/>
    <line x1="18" y1="27" x2="36" y2="27" stroke="#1a1e2c" stroke-width="2" opacity="0.5"/>
    <line x1="18" y1="37" x2="36" y2="37" stroke="#1a1e2c" stroke-width="2" opacity="0.5"/>
  </svg>`,

  'crate-metal': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#111420"/>
    <rect x="6" y="10" width="36" height="32" fill="#1a1e2c" rx="2"/>
    <rect x="8" y="12" width="32" height="28" fill="#222838" rx="1"/>
    <line x1="6" y1="26" x2="42" y2="26" stroke="#1a1e2c" stroke-width="1"/>
    <line x1="24" y1="12" x2="24" y2="40" stroke="#1a1e2c" stroke-width="1"/>
    <rect x="10" y="8" width="28" height="4" fill="#2a3040" rx="1"/>
    <circle cx="16" cy="10" r="1" fill="#5a4a3a" opacity="0.5"/>
    <circle cx="32" cy="10" r="1" fill="#5a4a3a" opacity="0.5"/>
  </svg>`,
};
