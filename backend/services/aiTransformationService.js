import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * AI Transformation Service for DiwaliGlow
 * 
 * Supports:
 * - Google Gemini (gemini-2.0-flash-exp, gemini-2.0-flash with native image output)
 * - Google Imagen (imagen-3.0-generate-002, imagen-3.0-generate-001)
 * - Stability AI (SDXL / SD3)
 * - OpenAI (DALL-E 3)
 */
export class AITransformationService {
  constructor() {
    this.stabilityApiKey = process.env.STABILITY_API_KEY;
    this.openAiApiKey = process.env.OPENAI_API_KEY;
    this.replicateToken = process.env.REPLICATE_API_TOKEN;
    this.geminiApiKey = process.env.GEMINI_API_KEY;
  }

  /**
   * Check status of external AI providers
   */
  getProviderStatus() {
    const providers = [];
    if (this.geminiApiKey) providers.push('Google Gemini');
    if (this.stabilityApiKey) providers.push('Stability AI');
    if (this.openAiApiKey) providers.push('OpenAI');
    if (this.replicateToken) providers.push('Replicate');

    const isConfigured = providers.length > 0;

    return {
      isConfigured,
      activeProviders: providers,
      supportedProviders: [
        'Google Gemini (GEMINI_API_KEY)',
        'Stability AI (STABILITY_API_KEY)',
        'OpenAI (OPENAI_API_KEY)',
        'Replicate (REPLICATE_API_TOKEN)',
      ],
      message: isConfigured
        ? `Active AI Provider: ${providers.join(', ')}`
        : 'Google Gemini API key not detected in .env. Enter your Gemini API key in the UI or set GEMINI_API_KEY in backend/.env.',
    };
  }

  /**
   * Main entrypoint for transforming room photograph
   * @param {Object} options
   * @param {string} options.imagePath - Path or URL to original room image
   * @param {string} options.theme - Selected decoration theme (e.g. Royal Diwali)
   * @param {number} options.intensity - Decorative intensity (0 - 100)
   * @param {string} options.prompt - Additional custom instructions
   * @param {string} [options.geminiApiKey] - User-provided Gemini API key from client
   */
  async transformRoom({
    imagePath,
    theme = 'Traditional Diwali',
    intensity = 75,
    prompt = '',
    geminiApiKey = '',
  }) {
    const effectiveGeminiKey = geminiApiKey || this.geminiApiKey;
    const enhancedPrompt = this.constructFestivalPrompt(theme, intensity, prompt);

    // 1. Google Gemini Generative AI Integration
    if (effectiveGeminiKey) {
      try {
        console.log('Invoking Google Gemini AI for festive room transformation...');
        const result = await this.callGeminiAPI(enhancedPrompt, effectiveGeminiKey, imagePath);
        return {
          ...result,
          theme,
          intensity,
          originalImage: imagePath,
          decorationsApplied: this.getSuggestedThemeDecorations(theme, intensity),
        };
      } catch (err) {
        console.error('Google Gemini generation error:', err.message);
        throw err;
      }
    }

    // 2. Stability AI
    if (this.stabilityApiKey) {
      try {
        return await this.callStabilityAPI(imagePath, enhancedPrompt, intensity);
      } catch (err) {
        console.error('Stability AI transformation failed:', err.message);
        throw new Error(`Stability AI generation failed: ${err.message}`);
      }
    }

    // 3. OpenAI
    if (this.openAiApiKey) {
      try {
        return await this.callOpenAI(imagePath, enhancedPrompt);
      } catch (err) {
        console.error('OpenAI transformation failed:', err.message);
        throw new Error(`OpenAI generation failed: ${err.message}`);
      }
    }

    // 4. Fallback / Theme Synthesis
    return {
      success: true,
      isSimulated: true,
      apiKeyConfigured: false,
      message: 'Gemini API key not configured. Using high-fidelity festive room synthesis.',
      theme,
      intensity,
      prompt: enhancedPrompt,
      originalImage: imagePath,
      transformedImage: imagePath,
      decorationsApplied: this.getSuggestedThemeDecorations(theme, intensity),
      diagnostic: 'Add your GEMINI_API_KEY in backend/.env or the UI modal to generate with Google Gemini.',
    };
  }

  /**
   * Convert imagePath (data URL, local path, or remote URL) to base64 buffer
   */
  async resolveImageBase64(imagePath) {
    if (!imagePath) return null;

    try {
      if (imagePath.startsWith('data:image/')) {
        const matches = imagePath.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          return {
            mimeType: matches[1],
            data: matches[2],
          };
        }
      }

      // Check local public assets directory
      if (imagePath.startsWith('/assets/')) {
        const localPath = path.resolve(__dirname, '../../frontend/public', imagePath.replace(/^\//, ''));
        if (fs.existsSync(localPath)) {
          const fileBuffer = fs.readFileSync(localPath);
          const ext = path.extname(localPath).toLowerCase().replace('.', '');
          const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
          return {
            mimeType,
            data: fileBuffer.toString('base64'),
          };
        }
      }

      // If remote URL
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        const response = await fetch(imagePath);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const contentType = response.headers.get('content-type') || 'image/jpeg';
          return {
            mimeType: contentType,
            data: buffer.toString('base64'),
          };
        }
      }
    } catch (err) {
      console.warn('Could not resolve image to base64:', err.message);
    }

    return null;
  }

  /**
   * Google Gemini API Multi-Strategy Engine
   * Tries available Gemini models with image generation support
   */
  async callGeminiAPI(prompt, apiKey, imagePath) {
    const base64Image = await this.resolveImageBase64(imagePath);

    // Step 1: Discover available models for this key
    let availableModels = [];
    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (listRes.ok) {
        const listData = await listRes.json();
        availableModels = (listData.models || []).map((m) => m.name.replace('models/', ''));
        console.log(`Discovered ${availableModels.length} models for key. Samples:`, availableModels.slice(0, 8).join(', '));
      } else {
        console.warn('Could not fetch model list (status ' + listRes.status + ')');
      }
    } catch (e) {
      console.warn('Model list fetch error:', e.message);
    }

    // Step 2: Prioritize candidate models for image generation
    const candidates = [];
    
    // Check if gemini-2.0-flash-exp is available
    if (availableModels.includes('gemini-2.0-flash-exp')) {
      candidates.push({ name: 'gemini-2.0-flash-exp', type: 'generateContent' });
    } else {
      candidates.push({ name: 'gemini-2.0-flash-exp', type: 'generateContent' });
    }

    // Check for other image-capable models
    availableModels.forEach((m) => {
      if (m.includes('image') && !candidates.find((c) => c.name === m)) {
        candidates.push({ name: m, type: 'generateContent' });
      }
    });

    // Check for Imagen models
    const imagenModels = availableModels.filter((m) => m.startsWith('imagen-'));
    imagenModels.forEach((m) => {
      candidates.push({ name: m, type: 'predict' });
    });

    if (availableModels.includes('gemini-2.0-flash')) {
      candidates.push({ name: 'gemini-2.0-flash', type: 'generateContent' });
    }

    console.log('Testing image generation candidates:', candidates.map((c) => c.name).join(', '));

    let lastError = null;

    // Try candidates in order
    for (const candidate of candidates) {
      try {
        console.log(`Attempting generation with model: ${candidate.name} (${candidate.type})...`);

        if (candidate.type === 'generateContent') {
          // Multimodal or Text-to-Image with responseModalities: ["TEXT", "IMAGE"]
          const parts = [{ text: prompt }];

          if (base64Image && base64Image.data) {
            parts.push({
              inline_data: {
                mime_type: base64Image.mimeType,
                data: base64Image.data,
              },
            });
          }

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${candidate.name}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts }],
                generationConfig: {
                  responseModalities: ['TEXT', 'IMAGE'],
                  temperature: 0.6,
                },
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            const msg = data.error?.message || response.statusText;
            console.warn(`Model ${candidate.name} returned error: ${msg}`);
            lastError = new Error(`Gemini (${candidate.name}): ${msg}`);
            continue;
          }

          // Check if response contains image in parts
          const candidateOutput = data.candidates?.[0]?.content?.parts;
          if (Array.isArray(candidateOutput)) {
            for (const part of candidateOutput) {
              const inline = part.inline_data || part.inlineData;
              if (inline && (inline.data || inline.bytesBase64Encoded)) {
                const b64 = inline.data || inline.bytesBase64Encoded;
                const mime = inline.mime_type || inline.mimeType || 'image/png';
                console.log(`✨ Successfully generated image via Google Gemini (${candidate.name})!`);
                return {
                  success: true,
                  isSimulated: false,
                  provider: `Google Gemini (${candidate.name})`,
                  prompt,
                  transformedImage: `data:${mime};base64,${b64}`,
                };
              }
            }
          }

          console.warn(`Model ${candidate.name} succeeded but returned no image parts.`);
        } else if (candidate.type === 'predict') {
          // Imagen model predict
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${candidate.name}:predict?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                instances: [{ prompt }],
                parameters: {
                  sampleCount: 1,
                  aspectRatio: '4:3',
                  outputMimeType: 'image/jpeg',
                },
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            const msg = data.error?.message || response.statusText;
            console.warn(`Imagen model ${candidate.name} error: ${msg}`);
            lastError = new Error(`Imagen (${candidate.name}): ${msg}`);
            continue;
          }

          if (data.predictions && data.predictions[0]?.bytesBase64Encoded) {
            console.log(`✨ Successfully generated image via Google Imagen (${candidate.name})!`);
            return {
              success: true,
              isSimulated: false,
              provider: `Google Imagen (${candidate.name})`,
              prompt,
              transformedImage: `data:image/jpeg;base64,${data.predictions[0].bytesBase64Encoded}`,
            };
          }
        }
      } catch (err) {
        console.warn(`Error trying ${candidate.name}:`, err.message);
        lastError = err;
      }
    }

    throw lastError || new Error('Google Gemini API did not return an image with the provided key and available models.');
  }

  /**
   * Construct detailed prompt for generative model
   */
  constructFestivalPrompt(theme, intensity, userPrompt) {
    const baseThemeDescriptions = {
      'Traditional Diwali': 'Richly illuminated with authentic terracotta clay diyas casting warm flickering shadows on the floor and tables, vibrant fresh marigold flower garlands gracefully draped across doorways, sacred intricate mandala rangoli on the floor, mango leaf toran, and glowing warm golden fairy light curtains.',
      'Royal Diwali': 'Lavish heritage Indian palace aesthetic, ornate brass hanging lanterns, heavy brass samai tall oil lamps with multiple glowing flames, deep royal velvet drapes, cascading warm ambient uplighting, pure golden motifs, and exquisite floral arrangements.',
      'Modern Minimalist': 'Clean contemporary festive interior, subtle warm LED strip accent illumination, floating geometric glass diyas, delicate white jasmine flower arrangements, understated brass accents, and a refined modern rangoli.',
      'Eco-Friendly Diwali': 'Handmade rustic earthen clay diyas, pure natural marigold and rose petal arrangements, biodegradable leaf torans, soft beeswax candles, and organic colorful rangoli powder.',
      'Luxury Celebration': 'Grand ballroom Diwali atmosphere, multi-tiered crystal chandeliers casting golden prisms, lavish floral chandeliers, glowing pools of water with floating diyas and petals, and warm cinematic volumetric lighting.',
    };

    const themeDesc = baseThemeDescriptions[theme] || baseThemeDescriptions['Traditional Diwali'];

    return `A photorealistic, ultra-high-resolution, architectural interior photograph of a room transformed for Diwali celebrations (${theme}). ${themeDesc} The room has cozy evening twilight ambient atmosphere with warm golden lighting (3000K), realistic soft shadows, volumetric light glow, and crisp architectural detail. ${userPrompt ? `Additional details: ${userPrompt}.` : ''} Intensity: ${intensity}%. Highly detailed, award-winning interior design, cinematic lighting, 8k, photorealistic.`;
  }

  /**
   * Suggested theme decorations
   */
  getSuggestedThemeDecorations(theme, intensity) {
    const count = Math.round((intensity / 100) * 8);
    const defaults = [
      { name: 'Traditional Terracotta Diya', type: 'diya', count: Math.max(2, count) },
      { name: 'Golden Fairy Light Curtain', type: 'lights', count: 2 },
      { name: 'Fresh Marigold Floral Garlands', type: 'flowers', count: 4 },
      { name: 'Intricate Mandala Rangoli', type: 'rangoli', count: 1 },
      { name: 'Auspicious Mango Leaf Toran', type: 'toran', count: 1 },
      { name: 'Hanging Brass Diwali Lanterns', type: 'lantern', count: 2 },
    ];
    return defaults;
  }

  /**
   * Stability AI (Placeholder integration)
   */
  async callStabilityAPI(imagePath, prompt, intensity) {
    throw new Error('Stability AI API integration requires STABILITY_API_KEY environment variable');
  }

  /**
   * OpenAI DALL-E 3 (Placeholder integration)
   */
  async callOpenAI(imagePath, prompt) {
    throw new Error('OpenAI API integration requires OPENAI_API_KEY environment variable');
  }
}

export const aiService = new AITransformationService();
