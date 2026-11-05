import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../utils/audioEffects';
import { triggerFestiveFireworks } from './FireworksEffect';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Zap,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const CrackersLauncher = () => {
  const [isMuted, setIsMuted] = useState(soundEngine.getIsMuted());
  const [isOpen, setIsOpen] = useState(false);

  const toggleSound = () => {
    const active = soundEngine.toggleMute();
    setIsMuted(!active);
    if (active) {
      toast.success('Festive cracker sounds enabled! 🎆');
    } else {
      toast('Sound muted', { icon: '🔇' });
    }
  };

  const fireCracker = (type) => {
    if (type === 'rocket') {
      soundEngine.playRocketSound(0.7);
      triggerFestiveFireworks('rocket');
      toast('🚀 Sky Rocket Fired!', { duration: 1500 });
    } else if (type === 'ladi') {
      soundEngine.playLadiString(14, 0.6);
      // Continuous mini bursts for ladi
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 25,
            spread: 120,
            origin: { x: 0.4 + Math.random() * 0.2, y: 0.8 },
            colors: ['#FFD700', '#FF2A6D', '#FF7A00'],
          });
        }, i * 180);
      }
      toast('💥 10,000 Wala Ladi String Bursting!', { duration: 2000 });
    } else if (type === 'sparkler') {
      soundEngine.playSparklerSound(2.2, 0.6);
      confetti({
        particleCount: 40,
        spread: 90,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#FFF4DC', '#FFD700', '#F4C76A'],
      });
      toast('🎇 Phuljhadi / Golden Sparkler Lit!', { duration: 1800 });
    } else if (type === 'anar') {
      soundEngine.playAnarSound(0.7);
      // Upward fountain spray
      const end = Date.now() + 1800;
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          particleCount: 20,
          angle: 90,
          spread: 45,
          startVelocity: 45,
          origin: { x: 0.5, y: 0.95 },
          colors: ['#FFD700', '#FF7A00', '#FFF', '#FF2A6D'],
        });
      }, 100);
      toast('🌋 Royal Anar Fountain Sparkling!', { duration: 2000 });
    } else if (type === 'bomb') {
      soundEngine.playCrackerPop(0.85);
      confetti({
        particleCount: 70,
        spread: 180,
        startVelocity: 40,
        origin: { x: 0.5, y: 0.7 },
        colors: ['#FF2A6D', '#FFD700', '#E5094C'],
      });
      toast('🧨 Classic Diwali Patakha Exploded!', { duration: 1500 });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2 select-none">
      {/* Expanded Firecrackers Dock */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="p-3 rounded-2xl glass-panel-elevated border border-gold/40 shadow-2xl backdrop-blur-2xl space-y-2 mb-2 w-56"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gold/20">
              <span className="text-xs font-serif font-bold text-white flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Burst Crackers</span>
              </span>
              <button
                onClick={toggleSound}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isMuted
                    ? 'bg-red-950/40 border-red-500/30 text-red-400'
                    : 'bg-gold/15 border-gold/40 text-gold-warm'
                }`}
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <button
                onClick={() => fireCracker('rocket')}
                className="w-full py-1.5 px-3 rounded-xl text-xs font-semibold glass-card border border-gold/20 hover:border-gold hover:bg-gold/10 text-white flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
              >
                <span className="text-base">🚀</span>
                <span>Sky Rocket</span>
              </button>
              <button
                onClick={() => fireCracker('ladi')}
                className="w-full py-1.5 px-3 rounded-xl text-xs font-semibold glass-card border border-gold/20 hover:border-gold hover:bg-gold/10 text-white flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
              >
                <span className="text-base">💥</span>
                <span>10,000 Ladi String</span>
              </button>
              <button
                onClick={() => fireCracker('anar')}
                className="w-full py-1.5 px-3 rounded-xl text-xs font-semibold glass-card border border-gold/20 hover:border-gold hover:bg-gold/10 text-white flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
              >
                <span className="text-base">🌋</span>
                <span>Anar Fountain</span>
              </button>
              <button
                onClick={() => fireCracker('sparkler')}
                className="w-full py-1.5 px-3 rounded-xl text-xs font-semibold glass-card border border-gold/20 hover:border-gold hover:bg-gold/10 text-white flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
              >
                <span className="text-base">🎇</span>
                <span>Phuljhadi Sparkler</span>
              </button>
              <button
                onClick={() => fireCracker('bomb')}
                className="w-full py-1.5 px-3 rounded-xl text-xs font-semibold glass-card border border-gold/20 hover:border-gold hover:bg-gold/10 text-white flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
              >
                <span className="text-base">🧨</span>
                <span>Dhamaka Patakha</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <div className="flex items-center space-x-2">
        {/* Quick sound mute/unmute toggle */}
        <button
          onClick={toggleSound}
          className="p-3 rounded-full glass-panel-elevated border border-gold/30 text-gold hover:text-white shadow-xl hover:scale-105 transition-transform"
          title={isMuted ? 'Sound Off - Click to Unmute' : 'Sound On - Click to Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 animate-pulse text-gold-warm" />}
        </button>

        {/* Master Crackers Hub Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="py-2.5 px-4 rounded-full bg-gradient-to-r from-gold via-festive-orange to-festive-crimson text-midnight-950 font-bold text-xs shadow-glow-gold hover:shadow-glow-gold-lg flex items-center space-x-2 border border-white/30"
        >
          <span className="text-base animate-bounce">🎇</span>
          <span className="hidden sm:inline">Diwali Crackers</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </motion.button>
      </div>
    </div>
  );
};
