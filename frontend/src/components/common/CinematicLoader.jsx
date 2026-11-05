import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CinematicLoader = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: Diya spark, 1: Flame ignites, 2: Logo reveal, 3: Exit

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 600);
    const timer2 = setTimeout(() => setStage(2), 1600);
    const timer3 = setTimeout(() => {
      setStage(3);
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950 overflow-hidden"
        >
          {/* Ambient radial glow expanding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: stage >= 1 ? [0.4, 0.8, 0.6] : 0,
              scale: stage >= 1 ? [0.8, 1.3, 1.1] : 0.5,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-festive-orange/30 via-gold/15 to-transparent blur-3xl pointer-events-none"
          />

          {/* Diya SVG with Animated Flame */}
          <div className="relative flex flex-col items-center">
            {/* Flickering Flame Aura */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                stage >= 1
                  ? {
                      scale: [1, 1.15, 0.95, 1.08, 1],
                      opacity: [0.7, 1, 0.85, 0.95, 0.7],
                      rotate: [-2, 3, -1, 2, -2],
                    }
                  : {}
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-24 h-32 relative flex items-center justify-center mb-[-24px] z-10"
            >
              <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_0_25px_rgba(244,199,106,0.9)]">
                <defs>
                  <radialGradient id="loaderFlameGrad" cx="50%" cy="60%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#FFF4DC" />
                    <stop offset="60%" stopColor="#F4C76A" />
                    <stop offset="90%" stopColor="#E87532" />
                    <stop offset="100%" stopColor="#D9A441" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Flame Teardrop */}
                <path
                  d="M 50 10 C 65 35, 75 70, 50 95 C 25 70, 35 35, 50 10 Z"
                  fill="url(#loaderFlameGrad)"
                />
                <ellipse cx="50" cy="70" rx="12" ry="20" fill="#FFFFFF" opacity="0.9" />
              </svg>
            </motion.div>

            {/* Diya Clay Base */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-44 h-20 relative z-0"
            >
              <svg viewBox="0 0 200 80" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                <path
                  d="M 20 25 C 20 70, 180 70, 180 25 C 180 15, 140 10, 100 10 C 60 10, 20 15, 20 25 Z"
                  fill="url(#clayBaseGrad)"
                />
                <ellipse cx="100" cy="22" rx="72" ry="14" fill="#A75523" stroke="#F4C76A" strokeWidth="2" />
                <ellipse cx="100" cy="24" rx="55" ry="9" fill="#3D1807" />
                <defs>
                  <linearGradient id="clayBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F4C76A" />
                    <stop offset="40%" stopColor="#A75523" />
                    <stop offset="100%" stopColor="#3B1705" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* Logo & Tagline Reveal */}
          <div className="mt-8 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-wide">
                <span className="text-white">Diwali</span>
                <span className="text-gold-gradient">Glow</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={stage >= 2 ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-2 text-sm md:text-base font-light tracking-widest text-festive-cream/80 uppercase"
              >
                Bring the Magic of Diwali Into Your Home
              </motion.p>
            </motion.div>

            {/* Glowing progress line */}
            <div className="w-48 h-[2px] bg-darkPurple-800 mx-auto mt-6 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.6, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-gold via-festive-orange to-gold-warm"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
