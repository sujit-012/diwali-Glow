import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const decDir = path.join(__dirname, 'public', 'assets', 'decorations');

// 9. Pillar Candle Trio
const candlePillar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 200" width="180" height="200">
  <defs>
    <radialGradient id="cp_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFDF5"/>
      <stop offset="35%" stop-color="#F4C76A"/>
      <stop offset="70%" stop-color="#E87532" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#D9A441" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wax_body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ECE3D4"/>
      <stop offset="40%" stop-color="#FFF8ED"/>
      <stop offset="80%" stop-color="#E6DCB8"/>
      <stop offset="100%" stop-color="#C2B294"/>
    </linearGradient>
    <linearGradient id="flame_col" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#E87532"/>
      <stop offset="60%" stop-color="#F4C76A"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
  </defs>

  <!-- Ground Shadow -->
  <ellipse cx="90" cy="188" rx="80" ry="10" fill="#0A080F" opacity="0.6"/>

  <!-- Left Candle (Medium) -->
  <rect x="25" y="90" width="40" height="95" rx="5" fill="url(#wax_body)"/>
  <ellipse cx="45" cy="90" rx="20" ry="6" fill="#FBF3DE" stroke="#D9A441" stroke-width="1"/>
  <!-- Wick -->
  <line x1="45" y1="90" x2="45" y2="82" stroke="#332211" stroke-width="2"/>
  <!-- Flame & Glow -->
  <circle cx="45" cy="70" r="22" fill="url(#cp_glow)"/>
  <path d="M 45 56 C 50 66, 51 74, 45 80 C 39 74, 40 66, 45 56 Z" fill="url(#flame_col)"/>

  <!-- Center Candle (Tall) -->
  <rect x="70" y="55" width="45" height="130" rx="5" fill="url(#wax_body)"/>
  <ellipse cx="92.5" cy="55" rx="22.5" ry="7" fill="#FBF3DE" stroke="#D9A441" stroke-width="1"/>
  <line x1="92.5" y1="55" x2="92.5" y2="45" stroke="#332211" stroke-width="2"/>
  <circle cx="92.5" cy="35" r="28" fill="url(#cp_glow)"/>
  <path d="M 92.5 16 C 99 30, 100 40, 92.5 46 C 85 40, 86 30, 92.5 16 Z" fill="url(#flame_col)"/>

  <!-- Right Candle (Small) -->
  <rect x="120" y="115" width="38" height="70" rx="5" fill="url(#wax_body)"/>
  <ellipse cx="139" cy="115" rx="19" ry="5.5" fill="#FBF3DE" stroke="#D9A441" stroke-width="1"/>
  <line x1="139" y1="115" x2="139" y2="107" stroke="#332211" stroke-width="2"/>
  <circle cx="139" cy="95" r="20" fill="url(#cp_glow)"/>
  <path d="M 139 82 C 144 91, 145 99, 139 104 C 133 99, 134 91, 139 82 Z" fill="url(#flame_col)"/>
</svg>`;

// 10. Vertical Marigold Garland (Hanging)
const verticalGarland = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 320" width="70" height="320">
  <defs>
    <radialGradient id="vg_orange" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFDD55"/>
      <stop offset="50%" stop-color="#E87532"/>
      <stop offset="90%" stop-color="#A53907"/>
    </radialGradient>
    <radialGradient id="vg_yellow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F4C76A"/>
      <stop offset="90%" stop-color="#C58814"/>
    </radialGradient>
  </defs>

  <!-- Hanging string line -->
  <line x1="35" y1="0" x2="35" y2="305" stroke="#7A5222" stroke-width="1.5"/>

  <!-- Stacked Blossom Circles -->
  ${Array.from({ length: 9 }).map((_, i) => {
    const y = 25 + i * 32;
    const isOrange = i % 2 === 0;
    const grad = isOrange ? 'url(#vg_orange)' : 'url(#vg_yellow)';
    const innerGrad = isOrange ? 'url(#vg_yellow)' : 'url(#vg_orange)';
    return `<g transform="translate(35, ${y})">
      <circle cx="0" cy="0" r="17" fill="${grad}"/>
      <circle cx="0" cy="0" r="10" fill="${innerGrad}"/>
      <circle cx="0" cy="0" r="4" fill="#FFFFFF" opacity="0.6"/>
    </g>`;
  }).join('\n')}

  <!-- Auspicious Brass Bell / Ghungroo at bottom -->
  <g transform="translate(35, 305)">
    <path d="M -10 0 C -10 10, 10 10, 10 0 Z" fill="#D9A441" stroke="#F4C76A" stroke-width="1"/>
    <circle cx="0" cy="12" r="3" fill="#F4C76A"/>
  </g>
</svg>`;

// 11. Scalloped Fairy Light Swag
const fairySwag = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 100" width="340" height="100">
  <defs>
    <radialGradient id="fs_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="35%" stop-color="#FFF4DC"/>
      <stop offset="65%" stop-color="#F4C76A"/>
      <stop offset="100%" stop-color="#D9A441" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Left Swag Curve -->
  <path d="M 0 15 Q 85 85 170 15" fill="none" stroke="#685635" stroke-width="2"/>
  <!-- Right Swag Curve -->
  <path d="M 170 15 Q 255 85 340 15" fill="none" stroke="#685635" stroke-width="2"/>

  <!-- Left Swag Bulbs -->
  ${[
    [25, 26], [50, 42], [85, 54], [120, 42], [145, 26]
  ].map(([x, y]) => `
    <g transform="translate(${x}, ${y})">
      <circle cx="0" cy="0" r="14" fill="url(#fs_glow)"/>
      <circle cx="0" cy="0" r="3.5" fill="#FFFFFF"/>
    </g>
  `).join('\n')}

  <!-- Apex Connectors -->
  <g transform="translate(0, 15)"><circle cx="0" cy="0" r="14" fill="url(#fs_glow)"/><circle cx="0" cy="0" r="3.5" fill="#FFFFFF"/></g>
  <g transform="translate(170, 15)"><circle cx="0" cy="0" r="16" fill="url(#fs_glow)"/><circle cx="0" cy="0" r="4" fill="#FFFFFF"/></g>
  <g transform="translate(340, 15)"><circle cx="0" cy="0" r="14" fill="url(#fs_glow)"/><circle cx="0" cy="0" r="3.5" fill="#FFFFFF"/></g>

  <!-- Right Swag Bulbs -->
  ${[
    [195, 26], [220, 42], [255, 54], [290, 42], [315, 26]
  ].map(([x, y]) => `
    <g transform="translate(${x}, ${y})">
      <circle cx="0" cy="0" r="14" fill="url(#fs_glow)"/>
      <circle cx="0" cy="0" r="3.5" fill="#FFFFFF"/>
    </g>
  `).join('\n')}
</svg>`;

// 12. Ornate Filigree Brass Hanging Lantern
const brassLantern = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 280" width="160" height="280">
  <defs>
    <linearGradient id="bl_brass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6F460D"/>
      <stop offset="35%" stop-color="#D9A441"/>
      <stop offset="65%" stop-color="#F4C76A"/>
      <stop offset="100%" stop-color="#553408"/>
    </linearGradient>
    <radialGradient id="bl_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="30%" stop-color="#FFF2BD"/>
      <stop offset="60%" stop-color="#F4C76A"/>
      <stop offset="85%" stop-color="#E87532" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#9C5221" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Hanging chain -->
  <line x1="80" y1="0" x2="80" y2="45" stroke="#D9A441" stroke-width="2.5" stroke-dasharray="4 2"/>
  <circle cx="80" cy="45" r="5" fill="#F4C76A"/>

  <!-- Lantern Dome -->
  <path d="M 45 80 C 45 50, 115 50, 115 80 Z" fill="url(#bl_brass)"/>
  <circle cx="80" cy="50" r="6" fill="#F4C76A"/>

  <!-- Glass Core Glow -->
  <circle cx="80" cy="140" r="55" fill="url(#bl_glow)" opacity="0.8"/>

  <!-- Hexagonal Glass Panels & Metal Cage -->
  <rect x="42" y="80" width="76" height="110" rx="6" fill="rgba(244, 199, 106, 0.2)" stroke="url(#bl_brass)" stroke-width="3"/>
  <line x1="68" y1="80" x2="68" y2="190" stroke="url(#bl_brass)" stroke-width="2"/>
  <line x1="92" y1="80" x2="92" y2="190" stroke="url(#bl_brass)" stroke-width="2"/>

  <!-- Filigree Diamond Patterns inside glass -->
  <polygon points="80,105 92,135 80,165 68,135" fill="none" stroke="#FFF4DC" stroke-width="1.5" opacity="0.7"/>

  <!-- Candle inside -->
  <rect x="74" y="145" width="12" height="35" rx="2" fill="#FFF8EB"/>
  <path d="M 80 128 C 84 135, 84 142, 80 145 C 76 142, 76 135, 80 128 Z" fill="#E87532"/>
  <circle cx="80" cy="138" r="3" fill="#FFFFFF"/>

  <!-- Bottom Finial Base -->
  <path d="M 45 190 L 115 190 L 95 215 L 65 215 Z" fill="url(#bl_brass)"/>
  <circle cx="80" cy="225" r="6" fill="#F4C76A"/>
  <polygon points="80,225 76,245 84,245" fill="url(#bl_brass)"/>
</svg>`;

// 13. Auspicious Decorated Pooja Thali
const poojaThali = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
  <defs>
    <radialGradient id="th_brass" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF0BE"/>
      <stop offset="50%" stop-color="#D9A441"/>
      <stop offset="85%" stop-color="#B07B22"/>
      <stop offset="100%" stop-color="#6F480E"/>
    </radialGradient>
    <radialGradient id="th_flame" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#F4C76A"/>
      <stop offset="80%" stop-color="#E87532"/>
      <stop offset="100%" stop-color="#D9A441" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(110, 110)">
    <!-- Shadow -->
    <circle cx="0" cy="5" r="100" fill="#0A080F" opacity="0.6"/>

    <!-- Brass Thali Base -->
    <circle cx="0" cy="0" r="100" fill="url(#th_brass)" stroke="#F4C76A" stroke-width="4"/>
    <circle cx="0" cy="0" r="88" fill="#D9A441" stroke="#805B17" stroke-width="1.5"/>

    <!-- Decorative Carved Rim Motif -->
    <circle cx="0" cy="0" r="85" fill="none" stroke="#6F480E" stroke-width="1.5" stroke-dasharray="6 3"/>

    <!-- Kumkum (Vermillion Red) Bowl -->
    <circle cx="-42" cy="-35" r="18" fill="#9C1B30" stroke="#F4C76A" stroke-width="2"/>
    <circle cx="-42" cy="-35" r="13" fill="#D32F2F"/>
    <circle cx="-42" cy="-35" r="5" fill="#FF8A80" opacity="0.6"/>

    <!-- Haldi (Turmeric Yellow) Bowl -->
    <circle cx="42" cy="-35" r="18" fill="#D9A441" stroke="#F4C76A" stroke-width="2"/>
    <circle cx="42" cy="-35" r="13" fill="#F4C76A"/>
    <circle cx="42" cy="-35" r="5" fill="#FFF9C4" opacity="0.6"/>

    <!-- Fresh Marigold Petals around base -->
    <circle cx="-50" cy="25" r="10" fill="#E87532"/>
    <circle cx="-35" cy="45" r="9" fill="#F4C76A"/>
    <circle cx="50" cy="25" r="10" fill="#E87532"/>
    <circle cx="35" cy="45" r="9" fill="#F4C76A"/>

    <!-- Center Clay Diya with Radiant Flame -->
    <ellipse cx="0" cy="30" rx="30" ry="16" fill="#A75523" stroke="#F4C76A" stroke-width="1.5"/>
    <circle cx="0" cy="5" r="28" fill="url(#th_flame)"/>
    <path d="M 0 -12 C 7 3, 7 15, 0 20 C -7 15, -7 3, 0 -12 Z" fill="#E87532"/>
    <path d="M 0 -6 C 4 4, 4 12, 0 16 C -4 12, -4 4, 0 -6 Z" fill="#FFF4DC"/>
  </g>
</svg>`;

const moreItems = [
  { name: 'candle_pillar.svg', content: candlePillar },
  { name: 'vertical_garland.svg', content: verticalGarland },
  { name: 'fairy_swag.svg', content: fairySwag },
  { name: 'brass_lantern.svg', content: brassLantern },
  { name: 'pooja_thali.svg', content: poojaThali },
];

moreItems.forEach(({ name, content }) => {
  fs.writeFileSync(path.join(decDir, name), content.trim(), 'utf8');
  console.log(`✅ Generated decoration asset: ${name}`);
});
