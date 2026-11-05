import React from 'react';
import { Link } from 'react-router-dom';
import { DiyaFlame } from './DiyaFlame';
import { Sparkles, Heart, Shield, Flame, Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export const Footer = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    toast.success('Thank you! Festive decor inspiration sent to your inbox. 🪔');
  };

  return (
    <footer className="relative bg-midnight-950 border-t border-gold/20 pt-16 pb-12 overflow-hidden">
      {/* Decorative Top Border Pattern */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-festive-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gold/15">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <DiyaFlame size="md" />
              <span className="text-2xl font-serif font-bold text-white">
                Diwali<span className="text-gold-gradient">Glow</span>
              </span>
            </Link>
            <p className="text-sm text-festive-cream/70 max-w-sm leading-relaxed">
              Transform your everyday spaces into extraordinary festive experiences. Digitally decorate with authentic Indian heritage elements and AI-powered interior vision.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gold-warm bg-darkPurple-900/60 border border-gold/20 px-3 py-2 rounded-lg w-fit">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Shubh Deepavali 2025 • Celebrating Lights & Tradition</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gold-warm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-festive-cream/75">
              <li>
                <Link to="/themes" className="hover:text-gold transition-colors">
                  Decoration Themes
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-gold transition-colors">
                  Upload Room Photo
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-gold transition-colors">
                  Interactive Studio
                </Link>
              </li>
              <li>
                <Link to="/ai-transform" className="hover:text-gold transition-colors">
                  AI Transformation
                </Link>
              </li>
              <li>
                <Link to="/comparison" className="hover:text-gold transition-colors">
                  Before & After Slider
                </Link>
              </li>
            </ul>
          </div>

          {/* Themes Category */}
          <div>
            <h4 className="text-sm font-semibold text-gold-warm tracking-wider uppercase mb-4">
              Festive Themes
            </h4>
            <ul className="space-y-2.5 text-sm text-festive-cream/75">
              <li>
                <Link to="/themes" className="hover:text-gold transition-colors">
                  Traditional Diwali
                </Link>
              </li>
              <li>
                <Link to="/themes" className="hover:text-gold transition-colors">
                  Royal Heritage
                </Link>
              </li>
              <li>
                <Link to="/themes" className="hover:text-gold transition-colors">
                  Modern Minimalist
                </Link>
              </li>
              <li>
                <Link to="/themes" className="hover:text-gold transition-colors">
                  Eco-Friendly Clay
                </Link>
              </li>
              <li>
                <Link to="/themes" className="hover:text-gold transition-colors">
                  Luxury Celebration
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Festive Blessings */}
          <div>
            <h4 className="text-sm font-semibold text-gold-warm tracking-wider uppercase mb-4">
              Festive Inspiration
            </h4>
            <p className="text-xs text-festive-cream/70 mb-3">
              Receive curated festive lighting tips, vastu guidelines & styling presets.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 pr-10 text-xs rounded-lg bg-midnight-900 border border-gold/30 text-white placeholder-festive-cream/40 focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-gold hover:text-gold-warm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-festive-cream/60 space-y-4 sm:space-y-0">
          <p>© 2025 DiwaliGlow. All rights reserved. Crafted with devotion for Diwali celebrations.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-festive-orange fill-festive-orange" />
              <span>in India</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-gold" />
              <span>Spread the Festive Light</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
