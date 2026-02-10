/**
 * Nexus Wasteland theme tiles — wasteland & relay tower.
 * Palette: dusty brown (#1a1218), toxic green (#76ff03), rust orange (#bf360c), grey (#424242), dark sky (#0a0a1a)
 */

const S = 48;

export const tiles = {
  'ground-waste': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="1" y="1" width="46" height="46" fill="#1e1620"/>
    <circle cx="10" cy="14" r="3" fill="#161014" opacity="0.4"/>
    <circle cx="36" cy="38" r="4" fill="#161014" opacity="0.3"/>
    <circle cx="28" cy="8" r="2" fill="#161014" opacity="0.35"/>
    <line x1="0" y1="24" x2="48" y2="24" stroke="#1a1218" stroke-width="0.3" opacity="0.3"/>
  </svg>`,

  'ground-rubble': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="1" y="1" width="46" height="46" fill="#1e1620"/>
    <rect x="6" y="28" width="8" height="6" fill="#424242" opacity="0.3" rx="1" transform="rotate(12 10 31)"/>
    <rect x="30" y="12" width="10" height="5" fill="#424242" opacity="0.25" rx="1" transform="rotate(-8 35 14)"/>
    <rect x="18" y="36" width="6" height="4" fill="#424242" opacity="0.2" rx="1"/>
    <circle cx="40" cy="40" r="2" fill="#bf360c" opacity="0.15"/>
  </svg>`,

  'ground-toxic': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="1" y="1" width="46" height="46" fill="#161418"/>
    <circle cx="24" cy="24" r="16" fill="#76ff03" opacity="0.04"/>
    <circle cx="24" cy="24" r="8" fill="#76ff03" opacity="0.06"/>
    <circle cx="20" cy="20" r="2" fill="#76ff03" opacity="0.1"/>
    <circle cx="30" cy="28" r="1.5" fill="#76ff03" opacity="0.08"/>
  </svg>`,

  'sky-dark': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0a1a"/>
    <circle cx="8" cy="10" r="0.5" fill="#ffffff" opacity="0.3"/>
    <circle cx="32" cy="6" r="0.5" fill="#ffffff" opacity="0.25"/>
    <circle cx="44" cy="18" r="0.5" fill="#ffffff" opacity="0.2"/>
    <circle cx="20" cy="38" r="0.5" fill="#ffffff" opacity="0.15"/>
  </svg>`,

  'wall-ruin': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="2" y="2" width="44" height="44" fill="#2a2228" rx="1"/>
    <rect x="4" y="4" width="40" height="18" fill="#322830" rx="1"/>
    <rect x="4" y="26" width="40" height="18" fill="#322830" rx="1"/>
    <line x1="24" y1="4" x2="24" y2="22" stroke="#1a1218" stroke-width="1"/>
    <line x1="12" y1="26" x2="12" y2="44" stroke="#1a1218" stroke-width="1"/>
    <line x1="36" y1="26" x2="36" y2="44" stroke="#1a1218" stroke-width="1"/>
    <path d="M32 2 L36 8 L40 2" fill="#0a0a1a" opacity="0.6"/>
    <line x1="0" y1="46" x2="48" y2="46" stroke="#bf360c" stroke-width="0.5" opacity="0.2"/>
  </svg>`,

  'wall-fence': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <line x1="4" y1="0" x2="4" y2="48" stroke="#424242" stroke-width="2"/>
    <line x1="16" y1="0" x2="16" y2="48" stroke="#424242" stroke-width="2"/>
    <line x1="28" y1="0" x2="28" y2="48" stroke="#424242" stroke-width="2"/>
    <line x1="40" y1="0" x2="40" y2="48" stroke="#424242" stroke-width="2"/>
    <line x1="0" y1="12" x2="48" y2="12" stroke="#424242" stroke-width="1.5"/>
    <line x1="0" y1="36" x2="48" y2="36" stroke="#424242" stroke-width="1.5"/>
    <line x1="0" y1="24" x2="48" y2="24" stroke="#bf360c" stroke-width="1" opacity="0.3"/>
  </svg>`,

  'rubble-pile': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <path d="M8 40 L16 20 L24 28 L32 16 L40 40 Z" fill="#424242" opacity="0.6"/>
    <path d="M12 40 L20 26 L28 32 L36 22 L40 40 Z" fill="#322830" opacity="0.7"/>
    <rect x="18" y="24" width="6" height="4" fill="#bf360c" opacity="0.3" rx="1" transform="rotate(15 21 26)"/>
    <rect x="30" y="28" width="4" height="3" fill="#424242" opacity="0.5" rx="1"/>
  </svg>`,

  'rust-beam': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="16" y="0" width="16" height="48" fill="#bf360c" opacity="0.4" rx="1"/>
    <rect x="18" y="0" width="12" height="48" fill="#8b4513" opacity="0.3"/>
    <line x1="20" y1="0" x2="20" y2="48" stroke="#bf360c" stroke-width="0.5" opacity="0.3"/>
    <line x1="28" y1="0" x2="28" y2="48" stroke="#bf360c" stroke-width="0.5" opacity="0.3"/>
    <rect x="14" y="12" width="20" height="3" fill="#5a3a1a" opacity="0.5"/>
    <rect x="14" y="34" width="20" height="3" fill="#5a3a1a" opacity="0.5"/>
  </svg>`,

  'vehicle-wreck': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="4" y="16" width="40" height="22" fill="#424242" opacity="0.5" rx="3"/>
    <rect x="8" y="12" width="32" height="8" fill="#424242" opacity="0.4" rx="2"/>
    <rect x="12" y="14" width="10" height="4" fill="#0a0a1a" opacity="0.6" rx="1"/>
    <rect x="26" y="14" width="10" height="4" fill="#0a0a1a" opacity="0.6" rx="1"/>
    <circle cx="10" cy="38" r="5" fill="#322830" opacity="0.5"/>
    <circle cx="38" cy="38" r="5" fill="#322830" opacity="0.5"/>
    <line x1="20" y1="20" x2="28" y2="28" stroke="#bf360c" stroke-width="0.5" opacity="0.4"/>
  </svg>`,

  'tower-base': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="8" y="4" width="32" height="40" fill="#2a2228" rx="2"/>
    <rect x="10" y="6" width="28" height="36" fill="#322830"/>
    <line x1="10" y1="16" x2="38" y2="16" stroke="#424242" stroke-width="1"/>
    <line x1="10" y1="28" x2="38" y2="28" stroke="#424242" stroke-width="1"/>
    <line x1="24" y1="6" x2="24" y2="42" stroke="#424242" stroke-width="1"/>
    <circle cx="17" cy="11" r="2" fill="#76ff03" opacity="0.3"/>
    <circle cx="31" cy="22" r="2" fill="#bf360c" opacity="0.3"/>
  </svg>`,

  'tower-antenna': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0a1a"/>
    <line x1="24" y1="0" x2="24" y2="48" stroke="#424242" stroke-width="3"/>
    <line x1="12" y1="12" x2="36" y2="12" stroke="#424242" stroke-width="2"/>
    <line x1="16" y1="24" x2="32" y2="24" stroke="#424242" stroke-width="1.5"/>
    <line x1="20" y1="36" x2="28" y2="36" stroke="#424242" stroke-width="1"/>
    <line x1="12" y1="12" x2="24" y2="24" stroke="#424242" stroke-width="0.5" opacity="0.5"/>
    <line x1="36" y1="12" x2="24" y2="24" stroke="#424242" stroke-width="0.5" opacity="0.5"/>
    <circle cx="24" cy="8" r="2" fill="#76ff03" opacity="0.5"/>
    <circle cx="24" cy="8" r="4" fill="#76ff03" opacity="0.1"/>
  </svg>`,

  'floor-grating': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0a0a1a"/>
    <rect x="1" y="1" width="46" height="46" fill="#1a1820"/>
    <line x1="0" y1="8" x2="48" y2="8" stroke="#424242" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="16" x2="48" y2="16" stroke="#424242" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="24" x2="48" y2="24" stroke="#424242" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="32" x2="48" y2="32" stroke="#424242" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="40" x2="48" y2="40" stroke="#424242" stroke-width="1" opacity="0.4"/>
    <line x1="8" y1="0" x2="8" y2="48" stroke="#424242" stroke-width="0.5" opacity="0.2"/>
    <line x1="24" y1="0" x2="24" y2="48" stroke="#424242" stroke-width="0.5" opacity="0.2"/>
    <line x1="40" y1="0" x2="40" y2="48" stroke="#424242" stroke-width="0.5" opacity="0.2"/>
  </svg>`,

  'console-panel': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="4" y="8" width="40" height="32" fill="#2a2228" rx="2"/>
    <rect x="6" y="10" width="36" height="18" fill="#0a0a1a" rx="1"/>
    <rect x="8" y="12" width="32" height="14" fill="#0a1018" rx="1"/>
    <line x1="10" y1="16" x2="36" y2="16" stroke="#76ff03" stroke-width="0.5" opacity="0.4"/>
    <line x1="10" y1="20" x2="28" y2="20" stroke="#76ff03" stroke-width="0.5" opacity="0.3"/>
    <circle cx="14" cy="34" r="2" fill="#76ff03" opacity="0.4"/>
    <circle cx="24" cy="34" r="2" fill="#bf360c" opacity="0.4"/>
    <circle cx="34" cy="34" r="2" fill="#424242" opacity="0.3"/>
  </svg>`,

  'server-rack': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="6" y="2" width="36" height="44" fill="#2a2228" rx="2"/>
    <rect x="8" y="4" width="32" height="8" fill="#322830" rx="1"/>
    <rect x="8" y="14" width="32" height="8" fill="#322830" rx="1"/>
    <rect x="8" y="24" width="32" height="8" fill="#322830" rx="1"/>
    <rect x="8" y="34" width="32" height="8" fill="#322830" rx="1"/>
    <circle cx="12" cy="8" r="1.5" fill="#76ff03" opacity="0.6"/>
    <circle cx="12" cy="18" r="1.5" fill="#76ff03" opacity="0.4"/>
    <circle cx="12" cy="28" r="1.5" fill="#bf360c" opacity="0.5"/>
    <circle cx="12" cy="38" r="1.5" fill="#76ff03" opacity="0.7"/>
    <line x1="18" y1="7" x2="36" y2="7" stroke="#2a2228" stroke-width="2" opacity="0.5"/>
    <line x1="18" y1="17" x2="36" y2="17" stroke="#2a2228" stroke-width="2" opacity="0.5"/>
    <line x1="18" y1="27" x2="36" y2="27" stroke="#2a2228" stroke-width="2" opacity="0.5"/>
    <line x1="18" y1="37" x2="36" y2="37" stroke="#2a2228" stroke-width="2" opacity="0.5"/>
  </svg>`,

  'door-blast': `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#1a1218"/>
    <rect x="8" y="2" width="32" height="44" fill="#2a2228" rx="2"/>
    <rect x="10" y="4" width="28" height="40" fill="#322830" rx="1"/>
    <line x1="24" y1="4" x2="24" y2="44" stroke="#2a2228" stroke-width="2"/>
    <rect x="20" y="20" width="8" height="8" fill="#424242" rx="4" opacity="0.4"/>
    <circle cx="24" cy="24" r="2" fill="#76ff03" opacity="0.3"/>
    <line x1="8" y1="2" x2="8" y2="46" stroke="#76ff03" stroke-width="0.5" opacity="0.2"/>
    <line x1="40" y1="2" x2="40" y2="46" stroke="#76ff03" stroke-width="0.5" opacity="0.2"/>
  </svg>`,
};
