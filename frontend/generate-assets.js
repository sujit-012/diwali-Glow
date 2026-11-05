import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const decDir = path.join(__dirname, 'public', 'assets', 'decorations');

if (!fs.existsSync(decDir)) {
  fs.mkdirSync(decDir, { recursive: true });
}

// 1. Clay Diya
const clayDiya = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="200" height="160">
  <defs>
    <radialGradient id="cd_flame_glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#FFF5DB" stop-opacity="1"/>
      <stop offset="30%" stop-color="#F4C76A" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#E87532" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#D9A441" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cd_clay" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D9A441"/>
      <stop offset="35%" stop-color="#A75523"/>
      <stop offset="70%" stop-color="#6F3210"/>
      <stop offset="100%" stop-color="#3B1705"/>
    </linearGradient>
    <linearGradient id="cd_flame_body" x1="50%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" stop-color="#E87532"/>
      <stop offset="40%" stop-color="#F4C76A"/>
      <stop offset="85%" stop-color="#FFF4DC"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
    <filter id="cd_blur">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Big Ambient Light Aura -->
  <circle cx="100" cy="55" r="50" fill="url(#cd_flame_glow)" filter="url(#cd_blur)" opacity="0.85"/>

  <!-- Clay Diya Base Plate -->
  <ellipse cx="100" cy="135" rx="70" ry="12" fill="#201108" opacity="0.6"/>

  <!-- Diya Body Bowl -->
  <path d="M 30 115 C 30 155, 170 155, 170 115 C 170 102, 140 92, 100 92 C 60 92, 30 102, 30 115 Z" fill="url(#cd_clay)"/>
  
  <!-- Diya Rim -->
  <ellipse cx="100" cy="112" rx="68" ry="16" fill="#A75523" stroke="#F4C76A" stroke-width="2.5"/>
  <ellipse cx="100" cy="114" rx="55" ry="10" fill="#4B200A"/>
  
  <!-- Traditional Engraved Rim Dots -->
  <circle cx="50" cy="115" r="2.5" fill="#F4C76A"/>
  <circle cx="70" cy="120" r="2.5" fill="#F4C76A"/>
  <circle cx="100" cy="122" r="2.5" fill="#F4C76A"/>
  <circle cx="130" cy="120" r="2.5" fill="#F4C76A"/>
  <circle cx="150" cy="115" r="2.5" fill="#F4C76A"/>

  <!-- Cotton Wick Spout -->
  <ellipse cx="100" cy="100" rx="14" ry="7" fill="#E87532"/>
  <path d="M 96 103 Q 100 85 102 78" stroke="#331A0D" stroke-width="4" stroke-linecap="round"/>

  <!-- Radiant Flame -->
  <path d="M 100 20 C 118 48, 122 75, 100 90 C 78 75, 82 48, 100 20 Z" fill="url(#cd_flame_body)" filter="url(#cd_blur)"/>
  <path d="M 100 35 C 110 54, 112 70, 100 80 C 88 70, 90 54, 100 35 Z" fill="#FFF8E7"/>
  <ellipse cx="100" cy="65" rx="4" ry="10" fill="#FFFFFF"/>
</svg>`;

// 2. Brass Samai Lamp (Tall Royal Indian Stand Lamp)
const brassSamai = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 320" width="200" height="320">
  <defs>
    <radialGradient id="bs_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF4DC"/>
      <stop offset="35%" stop-color="#F4C76A"/>
      <stop offset="70%" stop-color="#E87532" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#D9A441" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bs_brass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#805B17"/>
      <stop offset="25%" stop-color="#D9A441"/>
      <stop offset="50%" stop-color="#F4C76A"/>
      <stop offset="75%" stop-color="#D9A441"/>
      <stop offset="100%" stop-color="#5E3F0A"/>
    </linearGradient>
    <linearGradient id="bs_flame" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#E87532"/>
      <stop offset="60%" stop-color="#F4C76A"/>
      <stop offset="100%" stop-color="#FFF4DC"/>
    </linearGradient>
  </defs>

  <!-- Ground Shadow -->
  <ellipse cx="100" cy="305" rx="55" ry="10" fill="#0A080F" opacity="0.6"/>

  <!-- Ornate Brass Base -->
  <path d="M 55 300 Q 100 288 145 300 L 138 285 Q 100 280 62 285 Z" fill="url(#bs_brass)"/>
  <ellipse cx="100" cy="285" rx="38" ry="8" fill="url(#bs_brass)"/>
  <path d="M 70 285 Q 100 255 78 235 L 122 235 Q 100 255 130 285 Z" fill="url(#bs_brass)"/>

  <!-- Central Pillar Stem -->
  <rect x="94" y="115" width="12" height="120" rx="3" fill="url(#bs_brass)"/>
  <!-- Decorative Beads on Stem -->
  <ellipse cx="100" cy="210" rx="20" ry="7" fill="url(#bs_brass)"/>
  <ellipse cx="100" cy="165" rx="16" ry="6" fill="url(#bs_brass)"/>

  <!-- Main Oil Cup (Thali) -->
  <path d="M 40 115 C 40 145, 160 145, 160 115 Q 100 118 40 115 Z" fill="url(#bs_brass)"/>
  <ellipse cx="100" cy="115" rx="60" ry="12" fill="#5E3F0A" stroke="#F4C76A" stroke-width="2"/>

  <!-- Peacock / Annam Crest on Top -->
  <path d="M 96 115 L 96 65 Q 90 50 100 35 Q 110 50 104 65 L 104 115 Z" fill="url(#bs_brass)"/>
  <circle cx="100" cy="32" r="7" fill="#F4C76A"/>

  <!-- 5 Flames around the cup -->
  <!-- Left Flame -->
  <circle cx="48" cy="105" r="18" fill="url(#bs_glow)" opacity="0.7"/>
  <path d="M 48 90 C 53 98, 54 106, 48 112 C 42 106, 43 98, 48 90 Z" fill="url(#bs_flame)"/>

  <!-- Mid-Left Flame -->
  <circle cx="72" cy="108" r="18" fill="url(#bs_glow)" opacity="0.7"/>
  <path d="M 72 93 C 77 101, 78 109, 72 115 C 66 109, 67 101, 72 93 Z" fill="url(#bs_flame)"/>

  <!-- Center Flame -->
  <circle cx="100" cy="110" r="22" fill="url(#bs_glow)" opacity="0.8"/>
  <path d="M 100 92 C 106 101, 107 111, 100 118 C 93 111, 94 101, 100 92 Z" fill="url(#bs_flame)"/>

  <!-- Mid-Right Flame -->
  <circle cx="128" cy="108" r="18" fill="url(#bs_glow)" opacity="0.7"/>
  <path d="M 128 93 C 133 101, 134 109, 128 115 C 122 109, 123 101, 128 93 Z" fill="url(#bs_flame)"/>

  <!-- Right Flame -->
  <circle cx="152" cy="105" r="18" fill="url(#bs_glow)" opacity="0.7"/>
  <path d="M 152 90 C 157 98, 158 106, 152 112 C 146 106, 147 98, 152 90 Z" fill="url(#bs_flame)"/>
</svg>`;

// 3. Fairy Lights Curtain (Curtain of warm glowing golden micro lights)
const fairyLightsCurtain = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="300" height="240">
  <defs>
    <radialGradient id="fl_bulb_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="#FFF4DC"/>
      <stop offset="55%" stop-color="#F4C76A"/>
      <stop offset="85%" stop-color="#D9A441" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#D9A441" stop-opacity="0"/>
    </radialGradient>
    <filter id="fl_spark">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Horizontal top wire -->
  <path d="M 0 10 Q 75 16 150 10 Q 225 16 300 10" stroke="#7A6843" stroke-width="2" fill="none" opacity="0.8"/>

  <!-- Vertical Strand 1 -->
  <path d="M 25 12 Q 22 70 28 130 Q 24 190 26 230" stroke="#7A6843" stroke-width="1.2" fill="none" opacity="0.6"/>
  <!-- Vertical Strand 2 -->
  <path d="M 75 14 Q 78 65 72 125 Q 77 185 74 235" stroke="#7A6843" stroke-width="1.2" fill="none" opacity="0.6"/>
  <!-- Vertical Strand 3 -->
  <path d="M 125 11 Q 120 75 127 135 Q 122 195 126 230" stroke="#7A6843" stroke-width="1.2" fill="none" opacity="0.6"/>
  <!-- Vertical Strand 4 -->
  <path d="M 175 12 Q 179 68 173 128 Q 178 188 174 235" stroke="#7A6843" stroke-width="1.2" fill="none" opacity="0.6"/>
  <!-- Vertical Strand 5 -->
  <path d="M 225 14 Q 221 72 228 132 Q 223 192 226 230" stroke="#7A6843" stroke-width="1.2" fill="none" opacity="0.6"/>
  <!-- Vertical Strand 6 -->
  <path d="M 275 11 Q 279 65 273 125 Q 278 185 274 235" stroke="#7A6843" stroke-width="1.2" fill="none" opacity="0.6"/>

  <!-- Glowing LED bulbs on Strand 1 -->
  <circle cx="24" cy="45" r="12" fill="url(#fl_bulb_glow)"/>
  <circle cx="24" cy="45" r="3" fill="#FFFFFF"/>
  <circle cx="26" cy="100" r="14" fill="url(#fl_bulb_glow)"/>
  <circle cx="26" cy="100" r="3.5" fill="#FFFFFF"/>
  <circle cx="27" cy="160" r="12" fill="url(#fl_bulb_glow)"/>
  <circle cx="27" cy="160" r="3" fill="#FFFFFF"/>
  <circle cx="26" cy="215" r="15" fill="url(#fl_bulb_glow)"/>
  <circle cx="26" cy="215" r="4" fill="#FFFFFF"/>

  <!-- Strand 2 -->
  <circle cx="76" cy="35" r="14" fill="url(#fl_bulb_glow)"/>
  <circle cx="76" cy="35" r="3.5" fill="#FFFFFF"/>
  <circle cx="73" cy="85" r="12" fill="url(#fl_bulb_glow)"/>
  <circle cx="73" cy="85" r="3" fill="#FFFFFF"/>
  <circle cx="74" cy="145" r="15" fill="url(#fl_bulb_glow)"/>
  <circle cx="74" cy="145" r="4" fill="#FFFFFF"/>
  <circle cx="75" cy="205" r="13" fill="url(#fl_bulb_glow)"/>
  <circle cx="75" cy="205" r="3" fill="#FFFFFF"/>

  <!-- Strand 3 -->
  <circle cx="123" cy="50" r="15" fill="url(#fl_bulb_glow)"/>
  <circle cx="123" cy="50" r="4" fill="#FFFFFF"/>
  <circle cx="126" cy="110" r="13" fill="url(#fl_bulb_glow)"/>
  <circle cx="126" cy="110" r="3" fill="#FFFFFF"/>
  <circle cx="124" cy="170" r="15" fill="url(#fl_bulb_glow)"/>
  <circle cx="124" cy="170" r="4" fill="#FFFFFF"/>
  <circle cx="126" cy="225" r="12" fill="url(#fl_bulb_glow)"/>
  <circle cx="126" cy="225" r="3" fill="#FFFFFF"/>

  <!-- Strand 4 -->
  <circle cx="177" cy="40" r="13" fill="url(#fl_bulb_glow)"/>
  <circle cx="177" cy="40" r="3" fill="#FFFFFF"/>
  <circle cx="174" cy="95" r="15" fill="url(#fl_bulb_glow)"/>
  <circle cx="174" cy="95" r="4" fill="#FFFFFF"/>
  <circle cx="176" cy="155" r="13" fill="url(#fl_bulb_glow)"/>
  <circle cx="176" cy="155" r="3" fill="#FFFFFF"/>
  <circle cx="174" cy="215" r="14" fill="url(#fl_bulb_glow)"/>
  <circle cx="174" cy="215" r="3.5" fill="#FFFFFF"/>

  <!-- Strand 5 -->
  <circle cx="223" cy="55" r="14" fill="url(#fl_bulb_glow)"/>
  <circle cx="223" cy="55" r="3.5" fill="#FFFFFF"/>
  <circle cx="227" cy="115" r="15" fill="url(#fl_bulb_glow)"/>
  <circle cx="227" cy="115" r="4" fill="#FFFFFF"/>
  <circle cx="224" cy="175" r="12" fill="url(#fl_bulb_glow)"/>
  <circle cx="224" cy="175" r="3" fill="#FFFFFF"/>
  <circle cx="226" cy="225" r="14" fill="url(#fl_bulb_glow)"/>
  <circle cx="226" cy="225" r="3.5" fill="#FFFFFF"/>

  <!-- Strand 6 -->
  <circle cx="277" cy="40" r="13" fill="url(#fl_bulb_glow)"/>
  <circle cx="277" cy="40" r="3" fill="#FFFFFF"/>
  <circle cx="274" cy="95" r="14" fill="url(#fl_bulb_glow)"/>
  <circle cx="274" cy="95" r="3.5" fill="#FFFFFF"/>
  <circle cx="276" cy="155" r="15" fill="url(#fl_bulb_glow)"/>
  <circle cx="276" cy="155" r="4" fill="#FFFFFF"/>
  <circle cx="274" cy="215" r="13" fill="url(#fl_bulb_glow)"/>
  <circle cx="274" cy="215" r="3" fill="#FFFFFF"/>
</svg>`;

// 4. Marigold Garland Draped (Festive yellow and saffron marigold swag)
const marigoldSwag = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
  <defs>
    <radialGradient id="mg_orange" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFD452"/>
      <stop offset="50%" stop-color="#E87532"/>
      <stop offset="90%" stop-color="#B2440C"/>
      <stop offset="100%" stop-color="#6F2302"/>
    </radialGradient>
    <radialGradient id="mg_yellow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="45%" stop-color="#F4C76A"/>
      <stop offset="85%" stop-color="#D9A441"/>
      <stop offset="100%" stop-color="#9C6B16"/>
    </radialGradient>
  </defs>

  <!-- Hanging loops of marigold flowers -->
  <!-- Left to Right Swag -->
  <g id="blossoms">
    <!-- Flower 1 -->
    <circle cx="20" cy="25" r="14" fill="url(#mg_orange)"/>
    <circle cx="20" cy="25" r="8" fill="url(#mg_yellow)"/>
    <!-- Flower 2 -->
    <circle cx="42" cy="40" r="15" fill="url(#mg_yellow)"/>
    <circle cx="42" cy="40" r="9" fill="url(#mg_orange)"/>
    <!-- Flower 3 -->
    <circle cx="68" cy="55" r="16" fill="url(#mg_orange)"/>
    <circle cx="68" cy="55" r="9" fill="url(#mg_yellow)"/>
    <!-- Flower 4 -->
    <circle cx="98" cy="68" r="16" fill="url(#mg_yellow)"/>
    <circle cx="98" cy="68" r="10" fill="url(#mg_orange)"/>
    <!-- Flower 5 -->
    <circle cx="130" cy="78" r="17" fill="url(#mg_orange)"/>
    <circle cx="130" cy="78" r="10" fill="url(#mg_yellow)"/>
    <!-- Center Apex Flower 6 -->
    <circle cx="160" cy="82" r="18" fill="url(#mg_yellow)"/>
    <circle cx="160" cy="82" r="11" fill="url(#mg_orange)"/>
    <!-- Flower 7 -->
    <circle cx="190" cy="78" r="17" fill="url(#mg_orange)"/>
    <circle cx="190" cy="78" r="10" fill="url(#mg_yellow)"/>
    <!-- Flower 8 -->
    <circle cx="222" cy="68" r="16" fill="url(#mg_yellow)"/>
    <circle cx="222" cy="68" r="10" fill="url(#mg_orange)"/>
    <!-- Flower 9 -->
    <circle cx="252" cy="55" r="16" fill="url(#mg_orange)"/>
    <circle cx="252" cy="55" r="9" fill="url(#mg_yellow)"/>
    <!-- Flower 10 -->
    <circle cx="278" cy="40" r="15" fill="url(#mg_yellow)"/>
    <circle cx="278" cy="40" r="9" fill="url(#mg_orange)"/>
    <!-- Flower 11 -->
    <circle cx="300" cy="25" r="14" fill="url(#mg_orange)"/>
    <circle cx="300" cy="25" r="8" fill="url(#mg_yellow)"/>
  </g>

  <!-- Mango Leaf accents in green -->
  <path d="M 15 25 Q 18 5 28 8 Q 22 25 15 25 Z" fill="#2E6B34"/>
  <path d="M 158 82 Q 160 108 152 105 Q 155 85 158 82 Z" fill="#2E6B34"/>
  <path d="M 162 82 Q 160 108 168 105 Q 165 85 162 82 Z" fill="#2E6B34"/>
  <path d="M 305 25 Q 302 5 292 8 Q 298 25 305 25 Z" fill="#2E6B34"/>
</svg>`;

// 5. Traditional Akash Kandil (Diwali Sky Lantern)
const akashKandil = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 300" width="180" height="300">
  <defs>
    <radialGradient id="kandil_glow" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FFF8E7"/>
      <stop offset="35%" stop-color="#F4C76A"/>
      <stop offset="70%" stop-color="#E87532"/>
      <stop offset="100%" stop-color="#9C1B30" stop-opacity="0.8"/>
    </radialGradient>
    <linearGradient id="kandil_ribbon" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F4C76A"/>
      <stop offset="50%" stop-color="#E87532"/>
      <stop offset="100%" stop-color="#9C1B30"/>
    </linearGradient>
  </defs>

  <!-- Hanging Cord -->
  <line x1="90" y1="0" x2="90" y2="40" stroke="#D9A441" stroke-width="2.5"/>
  <circle cx="90" cy="40" r="4" fill="#F4C76A"/>

  <!-- Central Diamond Hex Prism Body -->
  <g transform="translate(90, 110)">
    <!-- Ambient Internal Illumination -->
    <circle cx="0" cy="0" r="55" fill="url(#kandil_glow)" opacity="0.6"/>

    <!-- Central Diamond Faces -->
    <polygon points="0,-60 55,0 0,60 -55,0" fill="#9C1B30" stroke="#F4C76A" stroke-width="2"/>
    <polygon points="0,-45 42,0 0,45 -42,0" fill="url(#kandil_glow)" stroke="#FFF4DC" stroke-width="1.5"/>

    <!-- Triangular Facets / Prisms -->
    <polygon points="0,-60 25,-85 55,0" fill="#D9A441" stroke="#F4C76A" stroke-width="1.2"/>
    <polygon points="0,-60 -25,-85 -55,0" fill="#E87532" stroke="#F4C76A" stroke-width="1.2"/>
    <polygon points="0,60 25,85 55,0" fill="#E87532" stroke="#F4C76A" stroke-width="1.2"/>
    <polygon points="0,60 -25,85 -55,0" fill="#D9A441" stroke="#F4C76A" stroke-width="1.2"/>

    <!-- Auspicious Star Cutouts in Center -->
    <circle cx="0" cy="0" r="16" fill="#FFF4DC"/>
    <polygon points="0,-12 4,-4 12,0 4,4 0,12 -4,4 -12,0 -4,-4" fill="#9C1B30"/>
  </g>

  <!-- Hanging Streamers / Frills (Zalar) -->
  <!-- Streamer 1 -->
  <path d="M 50 170 Q 45 220 48 280" stroke="url(#kandil_ribbon)" stroke-width="5" stroke-linecap="round"/>
  <!-- Streamer 2 -->
  <path d="M 68 185 Q 64 235 66 295" stroke="url(#kandil_ribbon)" stroke-width="6" stroke-linecap="round"/>
  <!-- Streamer 3 (Center Long) -->
  <path d="M 90 195 Q 90 245 90 300" stroke="url(#kandil_ribbon)" stroke-width="7" stroke-linecap="round"/>
  <!-- Streamer 4 -->
  <path d="M 112 185 Q 116 235 114 295" stroke="url(#kandil_ribbon)" stroke-width="6" stroke-linecap="round"/>
  <!-- Streamer 5 -->
  <path d="M 130 170 Q 135 220 132 280" stroke="url(#kandil_ribbon)" stroke-width="5" stroke-linecap="round"/>
</svg>`;

// 6. Sacred Mandala Rangoli (Ornate, Floor Symmetry)
const mandalaRangoli = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" width="260" height="260">
  <defs>
    <radialGradient id="rn_center" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF4DC"/>
      <stop offset="30%" stop-color="#F4C76A"/>
      <stop offset="70%" stop-color="#E87532"/>
      <stop offset="100%" stop-color="#9C1B30"/>
    </radialGradient>
    <filter id="rn_glow">
      <feGaussianBlur stdDeviation="4" result="glow"/>
      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <g transform="translate(130, 130)">
    <!-- Base Outer Circular Shadow & Rim -->
    <circle cx="0" cy="0" r="120" fill="#21162E" opacity="0.6"/>
    <circle cx="0" cy="0" r="118" fill="none" stroke="#D9A441" stroke-width="3" stroke-dasharray="8 4"/>
    <circle cx="0" cy="0" r="110" fill="#9C1B30" opacity="0.85"/>

    <!-- 12 Outer Petals -->
    ${Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 360) / 12;
      return `<g transform="rotate(${angle})">
        <path d="M 0 -110 Q 22 -85 0 -60 Q -22 -85 0 -110 Z" fill="#E87532" stroke="#F4C76A" stroke-width="1.5"/>
        <circle cx="0" cy="-90" r="4" fill="#FFF4DC"/>
      </g>`;
    }).join('\n')}

    <!-- Middle Floral Ring -->
    <circle cx="0" cy="0" r="65" fill="#101321" stroke="#F4C76A" stroke-width="2"/>

    <!-- 8 Inner Lotus Petals -->
    ${Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 360) / 8;
      return `<g transform="rotate(${angle})">
        <path d="M 0 -62 C 16 -45 14 -25 0 0 C -14 -25 -16 -45 0 -62 Z" fill="#F4C76A" stroke="#E87532" stroke-width="1.5"/>
        <circle cx="0" cy="-40" r="3" fill="#9C1B30"/>
      </g>`;
    }).join('\n')}

    <!-- Glowing Sacred Center -->
    <circle cx="0" cy="0" r="28" fill="url(#rn_center)" stroke="#FFF4DC" stroke-width="2"/>
    <circle cx="0" cy="0" r="12" fill="#FFF4DC"/>
    <circle cx="0" cy="0" r="5" fill="#E87532"/>
  </g>
</svg>`;

// 7. Mango Leaves & Marigold Toran (Auspicious Entrance Doorway Border)
const toranLeaves = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 100" width="340" height="100">
  <defs>
    <linearGradient id="leaf_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4E9E3C"/>
      <stop offset="60%" stop-color="#2D6A24"/>
      <stop offset="100%" stop-color="#184212"/>
    </linearGradient>
    <radialGradient id="tr_marigold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF275"/>
      <stop offset="50%" stop-color="#FF9F1C"/>
      <stop offset="100%" stop-color="#B23A00"/>
    </radialGradient>
  </defs>

  <!-- Auspicious Kalawa Red/Yellow Band on top -->
  <rect x="0" y="8" width="340" height="6" fill="#9C1B30" rx="3"/>
  <rect x="0" y="10" width="340" height="2" fill="#F4C76A"/>

  <!-- Repeating Mango Leaves pointing downwards -->
  ${[20, 60, 100, 140, 180, 220, 260, 300].map((x) => `
    <g transform="translate(${x}, 14)">
      <!-- Mango Leaf Shape -->
      <path d="M 0 0 C 14 25, 12 55, 0 85 C -12 55, -14 25, 0 0 Z" fill="url(#leaf_grad)" stroke="#184212" stroke-width="1"/>
      <line x1="0" y1="0" x2="0" y2="75" stroke="#68B854" stroke-width="1" opacity="0.6"/>
      <!-- Flower Blossom at attachment -->
      <circle cx="0" cy="2" r="11" fill="url(#tr_marigold)"/>
      <circle cx="0" cy="2" r="5" fill="#FFF4DC"/>
    </g>
  `).join('\n')}

  <!-- Small dangling golden bead pendants between leaves -->
  ${[40, 80, 120, 160, 200, 240, 280, 320].map((x) => `
    <g transform="translate(${x}, 14)">
      <line x1="0" y1="0" x2="0" y2="35" stroke="#D9A441" stroke-width="1.5"/>
      <circle cx="0" cy="38" r="5" fill="#F4C76A" stroke="#B07B22" stroke-width="1"/>
    </g>
  `).join('\n')}
</svg>`;

// 8. Brass Urli Bowl with Floating Candles & Flower Petals
const urliBowl = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" width="240" height="180">
  <defs>
    <linearGradient id="urli_brass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#5E3F0A"/>
      <stop offset="30%" stop-color="#D9A441"/>
      <stop offset="60%" stop-color="#F4C76A"/>
      <stop offset="100%" stop-color="#805B17"/>
    </linearGradient>
    <radialGradient id="urli_water" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2D1E3D"/>
      <stop offset="70%" stop-color="#140D1F"/>
      <stop offset="100%" stop-color="#0A0610"/>
    </radialGradient>
    <radialGradient id="candle_glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#FFF8E7"/>
      <stop offset="40%" stop-color="#F4C76A"/>
      <stop offset="80%" stop-color="#E87532" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#D9A441" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Shadow -->
  <ellipse cx="120" cy="165" rx="85" ry="12" fill="#0A080F" opacity="0.6"/>

  <!-- Urli Outer Bowl -->
  <path d="M 20 115 C 20 170, 220 170, 220 115 C 220 95, 175 80, 120 80 C 65 80, 20 95, 20 115 Z" fill="url(#urli_brass)"/>
  
  <!-- Carved Handles -->
  <path d="M 12 110 C 2 95, 2 130, 20 120" stroke="#F4C76A" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 228 110 C 238 95, 238 130, 220 120" stroke="#F4C76A" stroke-width="4" fill="none" stroke-linecap="round"/>

  <!-- Water Surface -->
  <ellipse cx="120" cy="110" rx="92" ry="24" fill="url(#urli_water)" stroke="#F4C76A" stroke-width="2.5"/>

  <!-- Floating Marigold Petals in Water -->
  <circle cx="65" cy="115" r="9" fill="#E87532"/>
  <circle cx="65" cy="115" r="5" fill="#F4C76A"/>

  <circle cx="175" cy="115" r="9" fill="#E87532"/>
  <circle cx="175" cy="115" r="5" fill="#F4C76A"/>

  <circle cx="120" cy="126" r="8" fill="#F4C76A"/>
  <circle cx="95" cy="102" r="7" fill="#E87532"/>
  <circle cx="145" cy="102" r="7" fill="#E87532"/>

  <!-- Center Floating Tea Candle -->
  <circle cx="120" cy="98" r="28" fill="url(#candle_glow)" opacity="0.8"/>
  <ellipse cx="120" cy="105" rx="14" ry="6" fill="#FCE7A6" stroke="#D9A441" stroke-width="1.5"/>
  <!-- Candle Flame -->
  <path d="M 120 72 C 126 84, 127 94, 120 99 C 113 94, 114 84, 120 72 Z" fill="#E87532"/>
  <path d="M 120 78 C 124 86, 124 93, 120 96 C 116 93, 116 86, 120 78 Z" fill="#FFF4DC"/>
</svg>`;

// Write all files
const items = [
  { name: 'clay_diya.svg', content: clayDiya },
  { name: 'brass_samai.svg', content: brassSamai },
  { name: 'fairy_lights_curtain.svg', content: fairyLightsCurtain },
  { name: 'marigold_swag.svg', content: marigoldSwag },
  { name: 'akash_kandil.svg', content: akashKandil },
  { name: 'mandala_rangoli.svg', content: mandalaRangoli },
  { name: 'toran_leaves.svg', content: toranLeaves },
  { name: 'urli_bowl.svg', content: urliBowl },
];

items.forEach(({ name, content }) => {
  fs.writeFileSync(path.join(decDir, name), content.trim(), 'utf8');
  console.log(`✅ Generated decoration asset: ${name}`);
});
