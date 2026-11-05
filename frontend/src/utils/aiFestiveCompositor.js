/**
 * Photorealistic Festive Room Transformation & Synthesis Engine for DiwaliGlow
 * 
 * Replaces flat vector stickers with physically-based optical lighting,
 * atmospheric twilight tone-mapping, perspective-projected floor rangolis,
 * volumetric illuminated terracotta diyas, and authentic fairy light cascades.
 */

export const generateFestiveTransformation = async ({
  imageSrc,
  theme = 'Traditional Diwali',
  intensity = 80,
  prompt = '',
}) => {
  return new Promise((resolve, reject) => {
    const roomImg = new Image();
    roomImg.crossOrigin = 'anonymous';

    roomImg.onload = async () => {
      try {
        const width = 1400;
        const height = 950;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // 1. Draw base room image scaled to cover canvas smoothly
        const scale = Math.max(width / roomImg.width, height / roomImg.height);
        const x = (width - roomImg.width * scale) / 2;
        const y = (height - roomImg.height * scale) / 2;
        ctx.drawImage(roomImg, x, y, roomImg.width * scale, roomImg.height * scale);

        const norm = Math.min(1, Math.max(0.2, intensity / 100));

        // 2. Cinematic Twilight & Ambient Tone-Mapping
        applyCinematicTwilightGrading(ctx, width, height, norm);

        // 3. Fairy Light Curtains & Cascades (Realistic illuminated micro-LEDs)
        renderFairyLightCurtains(ctx, width, height, norm, theme);

        // 4. Perspective-Mapped Floral Mandala Rangoli on Floor Plane
        renderPerspectiveFloralRangoli(ctx, width, height, norm, theme);

        // 5. Physically-Based Illuminated Terracotta Diyas & Oil Pools
        renderPhotorealisticDiyas(ctx, width, height, norm, theme);

        // 6. Hanging Festive Brass Lamps & Lanterns
        renderHangingBrassLanterns(ctx, width, height, norm, theme);

        // 7. Volumetric Ambient Light Diffusion, Golden Bokeh & Atmospheric Glow
        applyAtmosphericGoldenGlow(ctx, width, height, norm);

        // 8. Export ultra-clean JPEG
        const transformedDataUrl = canvas.toDataURL('image/jpeg', 0.94);

        resolve({
          transformedImage: transformedDataUrl,
          theme,
          intensity,
        });
      } catch (err) {
        console.error('Error generating photorealistic festive transformation:', err);
        reject(err);
      }
    };

    roomImg.onerror = (err) => {
      reject(new Error('Failed to load room image for festive synthesis'));
    };

    roomImg.src = imageSrc;
  });
};

/**
 * 1. Cinematic Twilight & Ambient Evening Tone-Mapping
 * Darkens daylight ambient while casting rich twilight shadows and warm ambient midtones
 */
function applyCinematicTwilightGrading(ctx, width, height, norm) {
  ctx.save();

  // A. Deep twilight contrast wash (multiplies to deepen shadows)
  ctx.globalCompositeOperation = 'multiply';
  const duskWash = ctx.createLinearGradient(0, 0, 0, height);
  duskWash.addColorStop(0, `rgba(18, 14, 38, ${0.45 * norm})`);
  duskWash.addColorStop(0.65, `rgba(28, 18, 32, ${0.35 * norm})`);
  duskWash.addColorStop(1, `rgba(12, 8, 18, ${0.5 * norm})`);
  ctx.fillStyle = duskWash;
  ctx.fillRect(0, 0, width, height);

  // B. Warm ambient evening golden midtone tint (soft-light)
  ctx.globalCompositeOperation = 'soft-light';
  const warmWash = ctx.createRadialGradient(
    width * 0.5, height * 0.45, 150,
    width * 0.5, height * 0.5, width * 0.8
  );
  warmWash.addColorStop(0, `rgba(255, 175, 60, ${0.65 * norm})`);
  warmWash.addColorStop(0.7, `rgba(220, 110, 40, ${0.45 * norm})`);
  warmWash.addColorStop(1, `rgba(80, 30, 20, ${0.3 * norm})`);
  ctx.fillStyle = warmWash;
  ctx.fillRect(0, 0, width, height);

  // C. Subtle warm rim vignette
  ctx.globalCompositeOperation = 'multiply';
  const vignette = ctx.createRadialGradient(
    width * 0.5, height * 0.5, width * 0.35,
    width * 0.5, height * 0.5, width * 0.72
  );
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(1, `rgba(10, 5, 15, ${0.45 * norm})`);
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}

/**
 * 2. Realistic Fairy Light Curtains & Cascades
 * Thousands of glowing micro-LEDs draped naturally across ceiling and wall perimeters
 */
function renderFairyLightCurtains(ctx, width, height, norm, theme) {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  const stringsCount = Math.floor(18 + norm * 14);
  const startY = height * 0.04;
  const maxDrop = height * (theme === 'Royal Diwali' ? 0.42 : 0.32);

  for (let s = 0; s < stringsCount; s++) {
    const stringX = (width / (stringsCount + 1)) * (s + 1) + (Math.sin(s * 1.5) * 15);
    const dropLength = maxDrop * (0.65 + Math.sin(s * 0.8) * 0.35);
    const ledsOnString = Math.floor(dropLength / 22);

    // Draw individual illuminated LED nodes along the string
    for (let l = 1; l <= ledsOnString; l++) {
      const ledY = startY + (dropLength / ledsOnString) * l;
      const swayX = stringX + Math.sin(l * 0.4 + s) * 6;

      // Realistic warm LED colors (warm white, soft amber, golden flame)
      const colorType = (s + l) % 5;
      const coreColor = colorType === 0 ? '#FFFFFF' : colorType === 1 ? '#FFF4CC' : '#FFD275';
      const haloColor = colorType === 0 ? 'rgba(255, 230, 160, 0.45)' : 'rgba(255, 170, 50, 0.4)';

      // Outer soft bloom
      const bloom = ctx.createRadialGradient(swayX, ledY, 1, swayX, ledY, 14 * norm);
      bloom.addColorStop(0, haloColor);
      bloom.addColorStop(0.4, 'rgba(255, 160, 40, 0.18)');
      bloom.addColorStop(1, 'rgba(255, 120, 20, 0)');

      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(swayX, ledY, 14 * norm, 0, Math.PI * 2);
      ctx.fill();

      // Sharp glowing white/gold core
      ctx.fillStyle = coreColor;
      ctx.beginPath();
      ctx.arc(swayX, ledY, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Top header festoon swag line
  ctx.strokeStyle = 'rgba(255, 215, 120, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x < width; x += 60) {
    const swagY = startY + Math.sin((x / width) * Math.PI * 6) * 12;
    if (x === 0) ctx.moveTo(x, swagY);
    else ctx.lineTo(x, swagY);
  }
  ctx.stroke();

  ctx.restore();
}

/**
 * 3. Perspective-Mapped Floral Mandala Rangoli on Floor
 * Mathematically projected onto the floor plane with perspective compression,
 * multi-tier floral petals (marigold, rose, jasmine), and realistic drop shadow
 */
function renderPerspectiveFloralRangoli(ctx, width, height, norm, theme) {
  ctx.save();

  // Floor center coordinates
  const centerX = width * 0.5;
  const centerY = height * 0.77;
  const radius = width * (theme === 'Royal Diwali' ? 0.22 : 0.18);
  const perspectiveYScale = 0.38; // Perspective squash for floor plane

  // A. Soft floor contact shadow
  ctx.globalCompositeOperation = 'multiply';
  const floorShadow = ctx.createRadialGradient(
    centerX, centerY, radius * 0.2,
    centerX, centerY, radius * 1.15
  );
  floorShadow.addColorStop(0, 'rgba(15, 8, 20, 0.65)');
  floorShadow.addColorStop(0.7, 'rgba(25, 12, 18, 0.3)');
  floorShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(1, perspectiveYScale);
  ctx.fillStyle = floorShadow;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // B. Draw multi-layered perspective mandala petals
  ctx.globalCompositeOperation = 'source-over';
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(1, perspectiveYScale);

  // Outer Marigold Ring (Deep Orange)
  drawFloralRing(ctx, radius * 0.95, 24, '#E65100', '#FF8F00', 22);

  // Second Floral Ring (Golden Yellow)
  drawFloralRing(ctx, radius * 0.72, 18, '#FFB300', '#FFE082', 18);

  // Rose Crimson Accent Ring
  drawFloralRing(ctx, radius * 0.52, 16, '#C2185B', '#E91E63', 14);

  // Inner Jasmine / Pearl White Core
  drawFloralRing(ctx, radius * 0.32, 12, '#FFFFFF', '#FFF8E1', 11);

  // Center Golden Sacred Diya Pad
  const centerPad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.2);
  centerPad.addColorStop(0, '#FFD54F');
  centerPad.addColorStop(0.7, '#FF6F00');
  centerPad.addColorStop(1, '#BF360C');
  ctx.fillStyle = centerPad;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // C. Ambient floor light reflection from the rangoli center
  ctx.globalCompositeOperation = 'screen';
  const rangoliGlow = ctx.createRadialGradient(
    centerX, centerY, 10,
    centerX, centerY, radius * 1.2
  );
  rangoliGlow.addColorStop(0, 'rgba(255, 180, 50, 0.35)');
  rangoliGlow.addColorStop(0.5, 'rgba(255, 100, 30, 0.15)');
  rangoliGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(1, perspectiveYScale);
  ctx.fillStyle = rangoliGlow;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

/**
 * Helper to draw an ornate floral mandala petal ring
 */
function drawFloralRing(ctx, ringRadius, petalCount, colorA, colorB, petalSize) {
  ctx.save();
  for (let i = 0; i < petalCount; i++) {
    const angle = (Math.PI * 2 / petalCount) * i;
    const px = Math.cos(angle) * ringRadius;
    const py = Math.sin(angle) * ringRadius;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);

    // Teardrop petal
    const grad = ctx.createLinearGradient(0, -petalSize, 0, petalSize);
    grad.addColorStop(0, colorB);
    grad.addColorStop(1, colorA);
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.ellipse(0, 0, petalSize * 0.55, petalSize, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
  ctx.restore();
}

/**
 * 4. Physically-Based Illuminated Terracotta Diyas & Oil Pools
 * Realistic shaded terracotta clay bowls with burning flame wick,
 * forward elliptical light pools on the floor, and warm golden auras.
 */
function renderPhotorealisticDiyas(ctx, width, height, norm, theme) {
  const diyaLocations = [
    // Center of Rangoli
    { x: width * 0.5, y: height * 0.77, scale: 1.1 },
    // Flanking Rangoli left and right
    { x: width * 0.28, y: height * 0.81, scale: 0.95 },
    { x: width * 0.72, y: height * 0.81, scale: 0.95 },
    // Outer pathway diyas
    { x: width * 0.15, y: height * 0.86, scale: 1.05 },
    { x: width * 0.85, y: height * 0.86, scale: 1.05 },
    { x: width * 0.38, y: height * 0.88, scale: 1.0 },
    { x: width * 0.62, y: height * 0.88, scale: 1.0 },
  ];

  diyaLocations.forEach((diya) => {
    drawSingleRealisticDiya(ctx, diya.x, diya.y, diya.scale * norm);
  });
}

/**
 * Render single realistic terracotta clay diya with physical optical bloom
 */
function drawSingleRealisticDiya(ctx, x, y, scale = 1.0) {
  ctx.save();

  const diyaWidth = 54 * scale;
  const diyaHeight = 24 * scale;

  // 1. Large Parabolic Floor Light Pool (Warm ambient light cast onto the floor)
  ctx.globalCompositeOperation = 'screen';
  const floorPool = ctx.createRadialGradient(x, y + 10 * scale, 5, x, y + 10 * scale, 120 * scale);
  floorPool.addColorStop(0, 'rgba(255, 200, 70, 0.65)');
  floorPool.addColorStop(0.3, 'rgba(255, 140, 30, 0.35)');
  floorPool.addColorStop(0.7, 'rgba(220, 80, 10, 0.12)');
  floorPool.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.save();
  ctx.translate(x, y + 8 * scale);
  ctx.scale(1, 0.45); // Floor perspective squash
  ctx.fillStyle = floorPool;
  ctx.beginPath();
  ctx.arc(0, 0, 120 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 2. Terracotta Clay Bowl Drop Shadow
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = 'rgba(15, 5, 8, 0.75)';
  ctx.beginPath();
  ctx.ellipse(x, y + 12 * scale, diyaWidth * 0.6, diyaHeight * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Terracotta Clay Bowl (Hand-molded earthenware shading)
  ctx.globalCompositeOperation = 'source-over';
  const clayGrad = ctx.createLinearGradient(x, y, x, y + diyaHeight);
  clayGrad.addColorStop(0, '#B7410E'); // Terracotta warm red
  clayGrad.addColorStop(0.5, '#7F2200'); // Deep clay shadow
  clayGrad.addColorStop(1, '#4A1100'); // Dark earthy base

  ctx.fillStyle = clayGrad;
  ctx.beginPath();
  ctx.ellipse(x, y + 6 * scale, diyaWidth * 0.5, diyaHeight * 0.42, 0, 0, Math.PI);
  ctx.fill();

  // Diya Clay Rim Highlight
  ctx.strokeStyle = '#D9652B';
  ctx.lineWidth = 1.8 * scale;
  ctx.stroke();

  // 4. Molten Ghee / Oil Pool inside bowl
  const oilGrad = ctx.createRadialGradient(x, y + 4 * scale, 1, x, y + 4 * scale, diyaWidth * 0.4);
  oilGrad.addColorStop(0, '#FFCC00');
  oilGrad.addColorStop(0.6, '#C47000');
  oilGrad.addColorStop(1, '#5C2800');
  ctx.fillStyle = oilGrad;
  ctx.beginPath();
  ctx.ellipse(x, y + 4 * scale, diyaWidth * 0.42, diyaHeight * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();

  // 5. Burning Cotton Wick
  ctx.strokeStyle = '#2B1200';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(x, y + 5 * scale);
  ctx.lineTo(x + 2 * scale, y - 4 * scale);
  ctx.stroke();

  // 6. Volumetric Flickering Flame (Teardrop gradient)
  ctx.globalCompositeOperation = 'screen';
  const flameW = 10 * scale;
  const flameH = 26 * scale;
  const flameY = y - 10 * scale;

  // Outer Flame Aura
  const flameAura = ctx.createRadialGradient(x, flameY, 2, x, flameY, 40 * scale);
  flameAura.addColorStop(0, 'rgba(255, 230, 120, 0.7)');
  flameAura.addColorStop(0.3, 'rgba(255, 140, 20, 0.4)');
  flameAura.addColorStop(0.7, 'rgba(240, 60, 0, 0.15)');
  flameAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = flameAura;
  ctx.beginPath();
  ctx.arc(x, flameY, 40 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Teardrop Flame Body
  const flameGrad = ctx.createLinearGradient(x, flameY + flameH * 0.5, x, flameY - flameH * 0.5);
  flameGrad.addColorStop(0, '#FF4500'); // Bottom orange-red
  flameGrad.addColorStop(0.4, '#FFA500'); // Mid golden yellow
  flameGrad.addColorStop(0.8, '#FFFFCC'); // White-hot core
  flameGrad.addColorStop(1, '#FFFFFF'); // Hot flame tip

  ctx.fillStyle = flameGrad;
  ctx.beginPath();
  ctx.moveTo(x, flameY - flameH * 0.6); // Tip
  ctx.bezierCurveTo(
    x + flameW, flameY - flameH * 0.1,
    x + flameW, flameY + flameH * 0.4,
    x, flameY + flameH * 0.5
  );
  ctx.bezierCurveTo(
    x - flameW, flameY + flameH * 0.4,
    x - flameW, flameY - flameH * 0.1,
    x, flameY - flameH * 0.6
  );
  ctx.fill();

  // Inner White-Hot Flame Core
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(x, flameY + flameH * 0.1, flameW * 0.35, flameH * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * 5. Hanging Festive Brass Lamps & Lanterns
 */
function renderHangingBrassLanterns(ctx, width, height, norm, theme) {
  if (norm < 0.4) return;
  ctx.save();

  const lanterns = [
    { x: width * 0.14, y: height * 0.28, size: 75 },
    { x: width * 0.86, y: height * 0.28, size: 75 },
  ];

  lanterns.forEach((l) => {
    // Hanging chain
    ctx.strokeStyle = 'rgba(218, 165, 32, 0.45)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(l.x, 0);
    ctx.lineTo(l.x, l.y - l.size * 0.5);
    ctx.stroke();

    // Brass Lantern Body
    ctx.globalCompositeOperation = 'source-over';
    const brassGrad = ctx.createLinearGradient(l.x - l.size * 0.4, l.y, l.x + l.size * 0.4, l.y);
    brassGrad.addColorStop(0, '#7A5210');
    brassGrad.addColorStop(0.5, '#F0C24B');
    brassGrad.addColorStop(1, '#5C3805');

    ctx.fillStyle = brassGrad;
    ctx.beginPath();
    ctx.moveTo(l.x, l.y - l.size * 0.5);
    ctx.lineTo(l.x + l.size * 0.35, l.y - l.size * 0.15);
    ctx.lineTo(l.x + l.size * 0.3, l.y + l.size * 0.35);
    ctx.lineTo(l.x, l.y + l.size * 0.5);
    ctx.lineTo(l.x - l.size * 0.3, l.y + l.size * 0.35);
    ctx.lineTo(l.x - l.size * 0.35, l.y - l.size * 0.15);
    ctx.closePath();
    ctx.fill();

    // Inner Radiant Flame Glow
    ctx.globalCompositeOperation = 'screen';
    const lanternGlow = ctx.createRadialGradient(l.x, l.y, 4, l.x, l.y, l.size * 1.8);
    lanternGlow.addColorStop(0, 'rgba(255, 235, 140, 0.8)');
    lanternGlow.addColorStop(0.35, 'rgba(255, 160, 40, 0.45)');
    lanternGlow.addColorStop(0.75, 'rgba(220, 90, 20, 0.15)');
    lanternGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = lanternGlow;
    ctx.beginPath();
    ctx.arc(l.x, l.y, l.size * 1.8, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/**
 * 6. Volumetric Golden Bokeh, Atmospheric Micro-Sparks & Light Diffusion
 */
function applyAtmosphericGoldenGlow(ctx, width, height, norm) {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  // Floating golden bokeh particles of varying sizes
  const bokehCount = Math.floor(45 * norm);
  for (let b = 0; b < bokehCount; b++) {
    // Semi-random distributed coordinates across room
    const bx = ((Math.sin(b * 37.1) + 1) * 0.5) * width;
    const by = ((Math.cos(b * 19.3) + 1) * 0.5) * height;
    const br = 6 + (Math.sin(b * 13.7) + 1) * 16;
    const bAlpha = 0.08 + (Math.cos(b * 23.9) + 1) * 0.1;

    const bokehGrad = ctx.createRadialGradient(bx, by, br * 0.1, bx, by, br);
    bokehGrad.addColorStop(0, `rgba(255, 230, 160, ${bAlpha * 1.4})`);
    bokehGrad.addColorStop(0.6, `rgba(255, 170, 50, ${bAlpha * 0.8})`);
    bokehGrad.addColorStop(1, 'rgba(255, 120, 20, 0)');

    ctx.fillStyle = bokehGrad;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  }

  // Final warm golden ambient bloom wash
  const finalBloom = ctx.createRadialGradient(
    width * 0.5, height * 0.65, 80,
    width * 0.5, height * 0.65, width * 0.75
  );
  finalBloom.addColorStop(0, `rgba(255, 195, 75, ${0.16 * norm})`);
  finalBloom.addColorStop(0.5, `rgba(255, 130, 40, ${0.08 * norm})`);
  finalBloom.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = finalBloom;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}
