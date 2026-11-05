import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProject } from '../context/ProjectContext';
import { api } from '../services/api';
import { THEMES_DATA } from '../data/themesData';
import { SAMPLE_ROOMS } from '../data/sampleRooms';
import { triggerFestiveFireworks } from '../components/common/FireworksEffect';
import { soundEngine } from '../utils/audioEffects';
import { generateFestiveTransformation } from '../utils/aiFestiveCompositor';
import { DiyaFlame } from '../components/common/DiyaFlame';
import toast from 'react-hot-toast';
import {
  Bot,
  Sparkles,
  Sliders,
  Send,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
  Brush,
  RefreshCw,
  Flame,
  Wand2,
  Key,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';

export const AITransformationPage = () => {
  const navigate = useNavigate();
  const {
    activeRoomImage,
    activeRoomType,
    activeTheme,
    selectRoom,
    applyTheme,
    setComparisonResult,
    setActivePresetDecorations,
  } = useProject();

  const [theme, setTheme] = useState(activeTheme || 'Traditional Diwali');
  const [intensity, setIntensity] = useState(80);
  const [prompt, setPrompt] = useState(
    'Add warm golden fairy lights, traditional clay diyas, marigold flowers and a sacred mandala rangoli.'
  );

  // Gemini API Key management
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempKey, setTempKey] = useState(geminiApiKey);

  // AI Provider status
  const [aiStatus, setAiStatus] = useState({
    isConfigured: false,
    activeProviders: [],
    message: '',
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const festiveLoadingMessages = [
    'Connecting with Google Gemini & festive synthesis...',
    'Analyzing room architecture & ambient light coordinates...',
    'Summoning warm golden fairy light curtains...',
    'Arranging auspicious fresh marigold flower swags...',
    'Lighting sacred terracotta clay diyas with warm flame glow...',
    'Creating intricate symmetrical mandala rangoli on floor...',
    'Blending photorealistic festive shadows and golden highlights...',
    'Perfecting festive ambiance and finalizing ultra-HD result...',
  ];

  // Fetch backend AI provider status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.getAIStatus();
        if (res.success) {
          setAiStatus({
            isConfigured: res.isConfigured || !!geminiApiKey,
            activeProviders: res.activeProviders || [],
            message: res.message,
          });
        }
      } catch (err) {
        console.warn('AI status check error:', err);
      }
    };
    fetchStatus();
  }, [geminiApiKey]);

  // Cycle festive loading messages
  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % festiveLoadingMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleSaveGeminiKey = (e) => {
    e.preventDefault();
    const cleanKey = tempKey.trim();
    localStorage.setItem('gemini_api_key', cleanKey);
    setGeminiApiKey(cleanKey);
    setShowKeyInput(false);
    if (cleanKey) {
      toast.success('Google Gemini API Key saved! ⚡✨');
    } else {
      toast('Gemini API Key removed. Using photorealistic synthesis.');
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(15);
    soundEngine.playSparklerSound(2.5, 0.4);

    // Progress animation tick
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 92) return 92;
        return prev + Math.floor(Math.random() * 12) + 5;
      });
    }, 350);

    try {
      let finalTransformedImage = null;
      let usedGemini = false;

      // 1. Try Google Gemini API if key is present
      if (geminiApiKey) {
        try {
          const res = await api.transformRoomAI({
            imagePath: activeRoomImage,
            theme,
            intensity,
            prompt,
            geminiApiKey,
          });
          if (res.success && res.result?.transformedImage && !res.result.isSimulated) {
            finalTransformedImage = res.result.transformedImage;
            usedGemini = res.result.provider || 'Google Gemini';
          } else if (!res.success) {
            console.warn('Gemini transformation error:', res.message);
            toast.error(res.message || 'Google Gemini could not generate an image with this key. Using optical synthesis.', {
              duration: 5000,
            });
          }
        } catch (geminiErr) {
          console.warn('Google Gemini API call failed:', geminiErr);
          toast.error(geminiErr.message || 'Google Gemini API request failed. Using optical synthesis.', {
            duration: 5000,
          });
        }
      }

      // 2. If not generated via Gemini, check if this is one of our sample rooms with a photorealistic decorated counterpart
      if (!finalTransformedImage) {
        const matchingSample = SAMPLE_ROOMS.find((r) => r.image === activeRoomImage);
        if (matchingSample && matchingSample.decoratedImage) {
          finalTransformedImage = matchingSample.decoratedImage;
        }
      }

      // 3. Fallback: synthesize with our upgraded Photorealistic Optical Compositor
      if (!finalTransformedImage) {
        const synthesisResult = await generateFestiveTransformation({
          imageSrc: activeRoomImage,
          theme,
          intensity,
          prompt,
        });
        finalTransformedImage = synthesisResult.transformedImage;
      }

      clearInterval(progressInterval);
      setGenerationProgress(100);

      setTimeout(() => {
        setIsGenerating(false);

        // Store comparison result in context
        setComparisonResult({
          originalImage: activeRoomImage,
          transformedImage: finalTransformedImage,
          theme,
          title: `Diwali ${theme} Transformation`,
          decorationsCount: 6,
        });

        // Set preset decorations for the studio so user can customize
        const matchingTheme = THEMES_DATA.find((t) => t.title === theme);
        if (matchingTheme && matchingTheme.presetDecorations) {
          setActivePresetDecorations(matchingTheme.presetDecorations);
        }

        soundEngine.playRocketSound(0.7);
        triggerFestiveFireworks('rocket');

        if (usedGemini) {
          toast.success(`Generated with ${usedGemini}! ⚡✨`);
        } else {
          toast.success('Photorealistic Diwali Transformation Ready! ✨');
        }
        navigate('/comparison');
      }, 700);
    } catch (err) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      console.error('Generation error:', err);
      toast.error('Could not complete transformation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-darkPurple-900/80 border border-gold/30 text-xs font-semibold text-gold-warm mb-3 shadow-glow-gold">
          <Bot className="w-3.5 h-3.5 text-gold" />
          <span>Generative Festive Interior Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Let AI Decorate <span className="text-gold-gradient">Your Dream Home.</span>
        </h1>
        <p className="text-sm sm:text-base text-festive-cream/80 mt-2 leading-relaxed">
          Powered by Google Gemini and photorealistic Indian interior styling. Watch your room turn into an illuminated festive sanctuary.
        </p>
      </div>

      {/* Google Gemini API Status & Configuration Card */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="p-4 rounded-2xl glass-panel-elevated border border-gold/35 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-gold to-festive-orange text-midnight-950 flex items-center justify-center font-bold shadow-sm">
                ⚡
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center space-x-2">
                  <span>Google Gemini (Imagen 3) Engine</span>
                  {geminiApiKey ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-mono">
                      Active Key
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-gold/15 text-gold-warm border border-gold/30">
                      Photorealistic Mode
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-festive-cream/70 mt-0.5">
                  {geminiApiKey
                    ? 'Using your custom Google Gemini API Key for generation.'
                    : 'Using photorealistic architectural Indian room synthesis. Add your Gemini API key for live Imagen 3 generations.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold glass-card border border-gold/30 text-gold-warm hover:text-white hover:bg-gold/15 transition-all flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{geminiApiKey ? 'Change Key' : 'Configure Gemini Key'}</span>
            </button>
          </div>

          {/* Gemini API Key Input Drawer */}
          <AnimatePresence>
            {showKeyInput && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSaveGeminiKey}
                className="pt-3 border-t border-gold/15 space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label className="text-festive-cream/80 font-medium">
                      Enter Google Gemini API Key:
                    </label>
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-warm underline text-[11px] flex items-center space-x-1"
                    >
                      <span>Get a free key from Google AI Studio</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={tempKey}
                      onChange={(e) => setTempKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-midnight-950 border border-gold/30 text-white font-mono placeholder-festive-cream/30 focus:outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-sm"
                    >
                      Save Key
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Room Preview & Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl glass-panel-elevated p-5 border border-gold/30 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gold-warm uppercase tracking-wider">
                Current Space
              </label>
              <button
                onClick={() => navigate('/upload')}
                className="text-xs text-gold hover:text-gold-warm underline"
              >
                Change Photo
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden border border-gold/30 shadow-lg">
              <img
                src={activeRoomImage}
                alt="Selected Room"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-transparent to-transparent flex items-end p-4">
                <div>
                  <span className="text-xs font-bold text-white">{activeRoomType}</span>
                  <p className="text-[11px] text-gold-warm">Ready for AI Festive Illumination</p>
                </div>
              </div>
            </div>

            {/* Quick Switch Sample Rooms */}
            <div className="pt-2">
              <span className="text-[11px] text-festive-cream/60 block mb-2 font-medium">
                Or pick an architectural preset:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_ROOMS.slice(0, 3).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => selectRoom(r.image, r.category, r.name)}
                    className={`rounded-lg overflow-hidden border transition-all ${
                      activeRoomImage === r.image ? 'border-gold ring-1 ring-gold shadow-glow-gold' : 'border-gold/20'
                    }`}
                  >
                    <img src={r.image} alt={r.name} className="h-14 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Configuration Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl glass-panel-elevated p-6 sm:p-8 border border-gold/30 shadow-2xl space-y-6">
            {/* 1. Theme Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gold-warm uppercase tracking-wider">
                1. Select Diwali Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {THEMES_DATA.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTheme(t.title);
                      applyTheme(t.title);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      theme === t.title
                        ? 'bg-gradient-to-br from-gold/20 to-festive-orange/20 border-gold text-white shadow-md'
                        : 'glass-card border-gold/20 text-festive-cream/80 hover:bg-gold/10'
                    }`}
                  >
                    <p className="text-xs font-bold">{t.title}</p>
                    <p className="text-[10px] text-festive-cream/60 mt-0.5 line-clamp-1">
                      {t.tagline}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Decoration Intensity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gold-warm uppercase tracking-wider">
                  2. Festive Intensity
                </span>
                <span className="font-mono text-gold font-bold">{intensity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-midnight-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-festive-cream/50">
                <span>Subtle Warmth (20%)</span>
                <span>Balanced Elegance (60%)</span>
                <span>Grand Celebration (100%)</span>
              </div>
            </div>

            {/* 3. Custom Prompt Instructions */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gold-warm uppercase tracking-wider">
                3. Additional Styling Instructions
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Add cascading fairy lights on curtains, traditional diyas near the entrance, marigold flowers and warm candlelight."
                className="w-full px-4 py-3 text-sm rounded-xl bg-midnight-900 border border-gold/30 text-white placeholder-festive-cream/40 focus:outline-none focus:border-gold"
              />
              <p className="text-[11px] text-festive-cream/60">
                Tip: Mention specific elements (brass samais, marigold swags, kandils) or lighting desires.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full sm:flex-1 py-4 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-gold via-gold-warm to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <Wand2 className="w-4 h-4" />
                <span>Generate AI Transformation</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/studio')}
                className="w-full sm:w-auto py-4 px-6 rounded-xl font-semibold text-xs glass-card border border-gold/30 text-festive-cream hover:text-white flex items-center justify-center space-x-1.5"
              >
                <Brush className="w-3.5 h-3.5 text-gold" />
                <span>Use Manual Studio</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Fullscreen Generation Screen */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950/90 backdrop-blur-xl p-4"
          >
            {/* Ambient Radial Lights */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-festive-orange/20 blur-[130px] animate-pulse pointer-events-none" />

            <div className="relative z-10 max-w-md w-full text-center space-y-6">
              {/* Flickering Diya Flame */}
              <div className="flex justify-center">
                <DiyaFlame size="xl" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Decorating Your <span className="text-gold-gradient">{activeRoomType}</span>
                </h3>
                <p className="text-xs text-gold-warm mt-2 font-medium h-6 transition-all duration-500">
                  {festiveLoadingMessages[loadingMessageIndex]}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full h-2 bg-midnight-800 rounded-full overflow-hidden border border-gold/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold via-festive-orange to-gold-warm"
                    style={{ width: `${generationProgress}%` }}
                    transition={{ ease: 'easeInOut' }}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono text-festive-cream/60">
                  <span>Theme: {theme}</span>
                  <span>{generationProgress}%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-midnight-900/60 border border-gold/15 text-[11px] text-festive-cream/70">
                ✨ Synthesizing authentic golden illumination and festive atmosphere...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
