import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DiyaFlame } from '../components/common/DiyaFlame';
import { BeforeAfterSlider } from '../components/comparison/BeforeAfterSlider';
import { triggerFestiveFireworks } from '../components/common/FireworksEffect';
import { soundEngine } from '../utils/audioEffects';
import { THEMES_DATA } from '../data/themesData';
import { SAMPLE_ROOMS } from '../data/sampleRooms';
import { useProject } from '../context/ProjectContext';
import {
  Sparkles,
  Upload,
  Palette,
  Brush,
  Download,
  CheckCircle2,
  ArrowRight,
  Flame,
  Star,
  ShieldCheck,
  Zap,
  Users,
  Eye,
} from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const { selectRoom, applyTheme } = useProject();

  const handleStartDecorating = () => {
    soundEngine.playRocketSound(0.7);
    triggerFestiveFireworks('rocket');
    navigate('/upload');
  };

  const handleApplyThemeDirect = (theme) => {
    soundEngine.playCrackerPop(0.5);
    applyTheme(theme.title, theme.presetDecorations);
    selectRoom(theme.coverImage, 'Living Room', theme.title);
    navigate('/studio');
  };

  const steps = [
    {
      num: '01',
      title: 'Upload Your Room',
      desc: 'Snap a picture of your living room, balcony, entrance, or pooja mandir.',
      icon: Upload,
    },
    {
      num: '02',
      title: 'Choose Your Theme',
      desc: 'Select from Traditional, Royal Heritage, Modern Minimalist, Eco-Friendly, or Luxury.',
      icon: Palette,
    },
    {
      num: '03',
      title: 'Customize Decorations',
      desc: 'Place glowing diyas, fairy light cascades, vibrant rangolis, and fragrant marigolds.',
      icon: Brush,
    },
    {
      num: '04',
      title: 'Download & Celebrate',
      desc: 'Export high-definition festive room photographs to show your family or share on social media.',
      icon: Download,
    },
  ];

  const features = [
    {
      title: 'Authentic Indian Elements',
      desc: 'Over 50+ meticulously crafted traditional elements including clay diyas, akash kandils, and fresh marigold swags.',
      icon: Flame,
    },
    {
      title: 'Real-Time Interactive Studio',
      desc: 'Full drag-and-drop canvas with rotation, scale, glow filters, layer controls and undo/redo capabilities.',
      icon: Sparkles,
    },
    {
      title: 'Instant Before & After Compare',
      desc: 'Inspect every detail with our split comparison slider to visualize the true magic of festive lighting.',
      icon: Eye,
    },
    {
      title: 'AI Festive Vision Engine',
      desc: 'Intelligent atmospheric suggestions that illuminate rooms with warm golden volumetric light and authenticity.',
      icon: Zap,
    },
  ];

  const testimonials = [
    {
      name: 'Priyanka & Rahul Sengupta',
      location: 'Bangalore',
      quote:
        'DiwaliGlow allowed us to visualize our entire apartment’s fairy lights and torans before buying anything from the market. Our balcony looked identical to the design!',
      rating: 5,
      role: 'Homeowners',
    },
    {
      name: 'Aditi Deshmukh',
      location: 'Mumbai',
      quote:
        'The interactive studio is simply magical. Placing authentic brass samai lamps and hanging marigold garlands was effortless on my tablet. Incredible startup product!',
      rating: 5,
      role: 'Interior Designer',
    },
    {
      name: 'Vikram Joshi',
      location: 'New Delhi',
      quote:
        'Being away from home this Diwali, decorating my parents’ ancestral house photo and sending it to them brought tears of joy. Truly captures the soul of Diwali.',
      rating: 5,
      role: 'Architect',
    },
  ];

  return (
    <div className="relative overflow-hidden pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        {/* Glow circles behind hero */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-festive-orange/20 via-gold/10 to-transparent blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Festive Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-darkPurple-900/80 border border-gold/30 text-xs font-semibold text-gold-warm shadow-glow-gold">
              <DiyaFlame size="sm" />
              <span>Diwali 2025 Home Transformation Studio</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.15] tracking-tight">
              Your Home. Your Vision.{' '}
              <span className="block text-gold-gradient mt-1">A Magical Diwali.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-festive-cream/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Transform your everyday spaces into extraordinary festive experiences with creative
              Diwali decorations and AI-powered design inspiration. Upload your room and illuminate
              it in seconds.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleStartDecorating}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-gold via-gold-warm to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group"
              >
                <span>Transform My Home</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playLadiString(12, 0.65);
                  triggerFestiveFireworks('ladi');
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-festive-crimson via-rose-600 to-festive-orange text-white shadow-glow-crimson hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 border border-white/25"
                title="Burst Diwali Crackers with Authentic Sound Effect"
              >
                <span className="text-base animate-bounce">🎆</span>
                <span>Burst Crackers!</span>
              </button>

              <Link
                to="/themes"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-sm glass-card border border-gold/30 text-festive-cream hover:text-white hover:border-gold hover:bg-gold/10 transition-all flex items-center justify-center space-x-2"
              >
                <Palette className="w-4 h-4 text-gold" />
                <span>Explore Themes</span>
              </Link>
            </div>

            {/* Feature Highlights beneath CTA */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-gold/15 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-gold-warm">50+</p>
                <p className="text-[11px] text-festive-cream/60">Festive Elements</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-gold-warm">100%</p>
                <p className="text-[11px] text-festive-cream/60">Interactive Canvas</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-gold-warm">Ultra HD</p>
                <p className="text-[11px] text-festive-cream/60">Export Quality</p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual: Interactive Before & After Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl p-2 bg-gradient-to-tr from-gold/30 via-darkPurple-800 to-festive-orange/30 shadow-2xl">
              <BeforeAfterSlider
                beforeImage="/assets/rooms/living_room.jpg"
                afterImage="/assets/rooms/living_room.jpg"
                beforeLabel="Original Room"
                afterLabel="Diwali Glow Preview"
                initialPosition={50}
              />
            </div>

            {/* Decorative Floating Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 hidden sm:flex items-center space-x-3 px-4 py-2.5 rounded-2xl glass-panel-elevated border border-gold/40 shadow-xl"
            >
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Authentic Lighting</p>
                <p className="text-[10px] text-gold-warm">Volumetric Golden Radiance</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-gold-warm tracking-widest uppercase">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
            How DiwaliGlow <span className="text-gold-gradient">Works</span>
          </h2>
          <p className="text-sm text-festive-cream/70 mt-3">
            In just a few moments, see your rooms transformed into a warm, joyful festival sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl glass-card border border-gold/20 hover:border-gold/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-gold/20 to-festive-orange/20 text-gold flex items-center justify-center border border-gold/30 group-hover:scale-110 transition-transform">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-serif font-black text-gold/20 group-hover:text-gold/40 transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-gold-warm transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-festive-cream/70 mt-2 leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/10 flex items-center text-xs text-gold-warm font-medium">
                <span>Step {step.num}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR DECORATION THEMES */}
      <section className="py-20 bg-darkPurple-950/60 border-y border-gold/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold text-gold-warm tracking-widest uppercase">
                Curated Aesthetics
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                Popular Decoration <span className="text-gold-gradient">Themes</span>
              </h2>
            </div>
            <Link
              to="/themes"
              className="mt-4 md:mt-0 text-sm font-semibold text-gold-warm hover:text-white flex items-center space-x-1 group"
            >
              <span>View All 5 Themes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THEMES_DATA.slice(0, 3).map((theme) => (
              <div
                key={theme.id}
                className="rounded-2xl glass-card border border-gold/25 overflow-hidden group hover:border-gold/60 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={theme.coverImage}
                    alt={theme.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-midnight-900/80 backdrop-blur-md text-gold-warm border border-gold/25">
                      {theme.idealFor.split(',')[0]}
                    </span>
                    <span className="text-xs text-festive-cream/80">★ {theme.popularity}% Match</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-warm transition-colors">
                      {theme.title}
                    </h3>
                    <p className="text-xs text-festive-cream/70 mt-2 line-clamp-2">
                      {theme.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gold/15 flex items-center justify-between">
                    <Link
                      to={`/themes#${theme.id}`}
                      className="text-xs text-festive-cream/80 hover:text-white flex items-center space-x-1"
                    >
                      <span>Explore</span>
                    </Link>
                    <button
                      onClick={() => handleApplyThemeDirect(theme)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-gold to-festive-orange text-midnight-950 hover:shadow-glow-gold transition-all"
                    >
                      Apply Theme
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEFORE-AND-AFTER SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-gold-warm tracking-widest uppercase">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
            Before & After <span className="text-gold-gradient">Showcase</span>
          </h2>
          <p className="text-sm text-festive-cream/70 mt-2">
            Experience how regular Indian homes turn into breathtaking festive havens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <BeforeAfterSlider
              beforeImage="/assets/rooms/entrance.jpg"
              afterImage="/assets/rooms/entrance.jpg"
              beforeLabel="Day Foyer"
              afterLabel="Diwali Lakshmi Entrance"
            />
          </div>
          <div>
            <BeforeAfterSlider
              beforeImage="/assets/rooms/balcony.jpg"
              afterImage="/assets/rooms/balcony.jpg"
              beforeLabel="Standard Balcony"
              afterLabel="Skyline Diya & Kandil"
            />
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE DIWALIGLOW */}
      <section className="py-20 bg-midnight-950/80 border-t border-gold/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-gold-warm tracking-widest uppercase">
              Designed For Celebration
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Why Homeowners Choose <span className="text-gold-gradient">DiwaliGlow</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="p-6 rounded-2xl glass-panel border border-gold/20 hover:border-gold/40 transition-all flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 border border-gold/30">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-serif font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-festive-cream/70 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. USER TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-gold-warm tracking-widest uppercase">
            Community Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
            Loved By <span className="text-gold-gradient">Indian Families</span> Everywhere
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card border border-gold/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 mb-3">
                  {Array.from({ length: testi.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xs text-festive-cream/80 italic leading-relaxed">
                  "{testi.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{testi.name}</p>
                  <p className="text-[11px] text-festive-cream/50">
                    {testi.role} • {testi.location}
                  </p>
                </div>
                <DiyaFlame size="sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="rounded-3xl glass-panel-elevated p-8 sm:p-14 border border-gold/40 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-festive-orange/20 via-gold/10 to-transparent blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <DiyaFlame size="lg" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Ready to Illuminate Your Home <span className="text-gold-gradient">This Diwali?</span>
            </h2>

            <p className="text-sm sm:text-base text-festive-cream/80 max-w-xl mx-auto">
              Start decorating for free. Upload your room photograph or explore our preloaded Indian
              spaces in the interactive studio.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleStartDecorating}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-gold via-gold-warm to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Launch Decoration Studio
              </button>
              <Link
                to="/ai-transform"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm glass-card border border-gold/30 text-white hover:border-gold transition-colors"
              >
                Try AI Decorator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
