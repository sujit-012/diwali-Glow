import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BeforeAfterSlider } from '../components/comparison/BeforeAfterSlider';
import { triggerFestiveFireworks } from '../components/common/FireworksEffect';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import toast from 'react-hot-toast';
import {
  Download,
  Share2,
  Save,
  Brush,
  Sparkles,
  Check,
  Flame,
  ArrowLeft,
  Copy,
} from 'lucide-react';

export const BeforeAfterPage = () => {
  const navigate = useNavigate();
  const { beforeAfterData, activeTheme, activeRoomType } = useProject();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `diwaliglow-transformation-${Date.now()}.jpg`;
    link.href = beforeAfterData.transformedImage;
    link.click();
    triggerFestiveFireworks();
    toast.success('Decorated room downloaded in High Definition! 🎆');
  };

  const handleSaveToDesigns = async () => {
    if (!isAuthenticated) {
      toast('Please sign in to save your design to your account', { icon: '🪔' });
      openAuthModal('login');
      return;
    }

    try {
      const res = await api.createProject({
        projectName: beforeAfterData.title || `Diwali ${activeRoomType}`,
        roomType: activeRoomType || 'Living Room',
        originalImage: beforeAfterData.originalImage,
        selectedTheme: beforeAfterData.theme || activeTheme,
        previewImage: beforeAfterData.transformedImage,
        decorationsCount: beforeAfterData.decorationsCount || 4,
      });

      if (res.success) {
        setIsSaved(true);
        triggerFestiveFireworks();
        toast.success('Saved to My Designs gallery! ✨');
      } else {
        toast.error(res.message || 'Could not save project');
      }
    } catch (err) {
      toast.error('Network error saving design');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'My Diwali Home Transformation on DiwaliGlow',
          text: `Check out how I illuminated my ${activeRoomType} for Diwali!`,
          url: window.location.href,
        })
        .then(() => toast.success('Shared successfully!'))
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      toast.success('Shareable link copied to clipboard! 📋');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/studio')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-festive-cream/80 hover:text-white glass-card px-3.5 py-2 rounded-xl border border-gold/25 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-gold" />
          <span>Back to Decoration Studio</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-gold-warm font-semibold bg-darkPurple-900/80 px-3 py-1 rounded-full border border-gold/30">
            {beforeAfterData.theme || activeTheme}
          </span>
        </div>
      </div>

      {/* Main Showcase */}
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Festive Transformation <span className="text-gold-gradient">Comparison</span>
          </h1>
          <p className="text-xs sm:text-sm text-festive-cream/75 mt-2">
            Drag the handle horizontally to reveal the golden magic of Diwali lights and decorations.
          </p>
        </div>

        {/* Draggable Slider Component */}
        <div className="relative rounded-2xl p-2 bg-gradient-to-tr from-gold/30 via-darkPurple-800 to-festive-orange/30 shadow-2xl max-w-5xl mx-auto">
          <BeforeAfterSlider
            beforeImage={beforeAfterData.originalImage}
            afterImage={beforeAfterData.transformedImage}
            beforeLabel="Before • Natural Space"
            afterLabel="After • Diwali Illuminated"
            initialPosition={50}
          />
        </div>

        {/* Action Toolbar */}
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl glass-panel-elevated border border-gold/30 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-serif font-bold text-white">
                {beforeAfterData.title || 'Diwali Room Transformation'}
              </p>
              <p className="text-xs text-festive-cream/60">
                Resolution: Ultra HD 4K • Styled with authentic Indian festive elements
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Customize in Studio */}
            <button
              onClick={() => {
                navigate('/studio');
              }}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-darkPurple-900 border border-gold/40 text-gold-warm hover:bg-gold/20 hover:text-white transition-all flex items-center space-x-1.5"
              title="Open and edit decorations on canvas"
            >
              <Brush className="w-4 h-4 text-gold" />
              <span>Customize in Studio</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold glass-card border border-gold/30 text-festive-cream hover:text-white flex items-center space-x-1.5"
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-gold" />}
              <span>{copiedLink ? 'Link Copied' : 'Share Design'}</span>
            </button>

            {/* Save to My Designs */}
            <button
              onClick={handleSaveToDesigns}
              disabled={isSaved}
              className={`py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center space-x-1.5 transition-all ${
                isSaved
                  ? 'bg-green-950/40 border-green-500/40 text-green-300'
                  : 'glass-card border-gold/40 text-gold-warm hover:bg-gold/10'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{isSaved ? 'Saved to Projects' : 'Save to My Designs'}</span>
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="py-2.5 px-5 rounded-xl text-xs font-bold bg-gradient-to-r from-gold via-gold-warm to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg transition-all flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Final Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
