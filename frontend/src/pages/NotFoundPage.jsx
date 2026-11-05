import React from 'react';
import { Link } from 'react-router-dom';
import { DiyaFlame } from '../components/common/DiyaFlame';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <DiyaFlame size="xl" className="mb-6" />
      <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-2">404</h1>
      <h2 className="text-xl font-serif text-gold-warm mb-3">Page Lost in the Festive Sparkles</h2>
      <p className="text-xs text-festive-cream/70 max-w-sm mb-6">
        The page you are looking for might have moved or is basking in the glow of another festival
        hall.
      </p>
      <Link
        to="/"
        className="py-3 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-glow-gold flex items-center space-x-2"
      >
        <Home className="w-4 h-4" />
        <span>Return to DiwaliGlow Home</span>
      </Link>
    </div>
  );
};
