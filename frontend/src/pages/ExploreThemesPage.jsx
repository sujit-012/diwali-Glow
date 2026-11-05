import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { THEMES_DATA } from '../data/themesData';
import { useProject } from '../context/ProjectContext';
import { triggerFestiveFireworks } from '../components/common/FireworksEffect';
import { DiyaFlame } from '../components/common/DiyaFlame';
import {
  Palette,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  X,
  Flame,
  Layers,
  Heart,
} from 'lucide-react';

export const ExploreThemesPage = () => {
  const navigate = useNavigate();
  const { applyTheme, selectRoom } = useProject();
  const [selectedThemeModal, setSelectedThemeModal] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleApplyTheme = (theme) => {
    applyTheme(theme.title, theme.presetDecorations);
    selectRoom(theme.coverImage, 'Living Room', theme.title);
    triggerFestiveFireworks();
    navigate('/studio');
  };

  const handleApplyToUpload = (theme) => {
    applyTheme(theme.title, theme.presetDecorations);
    navigate('/upload');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-darkPurple-900/80 border border-gold/30 text-xs font-semibold text-gold-warm mb-3 shadow-glow-gold">
          <Palette className="w-3.5 h-3.5 text-gold" />
          <span>Curated Festive Design Concepts</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Explore Diwali <span className="text-gold-gradient">Decoration Themes</span>
        </h1>
        <p className="text-sm sm:text-base text-festive-cream/80 mt-3 leading-relaxed">
          From sacred heritage terracotta diyas to opulent royal palace illumination, find the
          perfect aesthetic tailored to your room's architecture.
        </p>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {THEMES_DATA.map((theme, index) => (
          <motion.div
            key={theme.id}
            id={theme.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-2xl glass-card border border-gold/25 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
          >
            {/* Top Cover Image with Gradient Overlay */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={theme.coverImage}
                alt={theme.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />

              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-midnight-950/80 backdrop-blur-md text-gold-warm border border-gold/30">
                  {theme.popularity}% Match
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-xs font-semibold text-gold-warm tracking-wider uppercase">
                  {theme.tagline}
                </p>
                <h3 className="text-2xl font-serif font-bold text-white">{theme.title}</h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-xs text-festive-cream/80 leading-relaxed">{theme.description}</p>

              {/* Elements List */}
              <div className="space-y-2 pt-2 border-t border-gold/15">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-warm">
                  Key Festive Elements:
                </p>
                <ul className="space-y-1.5">
                  {theme.features.map((feat, i) => (
                    <li
                      key={i}
                      className="text-xs text-festive-cream/75 flex items-center space-x-2"
                    >
                      <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-4 border-t border-gold/15 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedThemeModal(theme)}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold glass-card border border-gold/30 text-festive-cream hover:text-white hover:bg-gold/10 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-gold" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => handleApplyTheme(theme)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg transition-all flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply Theme</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Theme Modal */}
      <AnimatePresence>
        {selectedThemeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-2xl glass-panel-elevated p-6 border border-gold/40 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedThemeModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-festive-cream/60 hover:text-white hover:bg-gold/10 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video rounded-xl overflow-hidden mb-5">
                <img
                  src={selectedThemeModal.coverImage}
                  alt={selectedThemeModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {selectedThemeModal.title}
                  </h3>
                  <p className="text-xs text-gold-warm">{selectedThemeModal.tagline}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-festive-cream/80 leading-relaxed">
                  {selectedThemeModal.description}
                </p>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-midnight-900/60 border border-gold/15 text-xs">
                  <div>
                    <span className="text-festive-cream/50 block">Ideal Spaces:</span>
                    <span className="font-semibold text-white">
                      {selectedThemeModal.idealFor}
                    </span>
                  </div>
                  <div>
                    <span className="text-festive-cream/50 block">Theme Atmosphere:</span>
                    <span className="font-semibold text-gold-warm">
                      Warm Volumetric Candlelight
                    </span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => handleApplyToUpload(selectedThemeModal)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold glass-card text-festive-cream hover:text-white"
                  >
                    Apply to My Room Photo
                  </button>
                  <button
                    onClick={() => handleApplyTheme(selectedThemeModal)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg"
                  >
                    Open in Decoration Studio
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
