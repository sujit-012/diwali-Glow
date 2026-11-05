import React from 'react';
import { motion } from 'framer-motion';

export const DiyaFlame = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizes[size] || sizes.md} ${className}`}>
      {/* Ambient flame halo */}
      <motion.div
        animate={{
          scale: [1, 1.25, 0.95, 1.15, 1],
          opacity: [0.6, 0.9, 0.7, 0.85, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full bg-festive-orange/30 blur-md pointer-events-none"
      />

      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(244,199,106,0.8)]">
        <defs>
          <radialGradient id="dfFlame" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF4DC" />
            <stop offset="40%" stopColor="#F4C76A" />
            <stop offset="80%" stopColor="#E87532" />
            <stop offset="100%" stopColor="#D9A441" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Diya Clay Base */}
        <path
          d="M 18 64 C 18 84, 82 84, 82 64 C 82 58, 68 54, 50 54 C 32 54, 18 58, 18 64 Z"
          fill="#A75523"
        />
        <ellipse cx="50" cy="62" rx="30" ry="7" fill="#F4C76A" opacity="0.3" stroke="#D9A441" strokeWidth="1" />

        {/* Animated Flame */}
        <motion.path
          d="M 50 22 C 58 35, 60 50, 50 56 C 40 50, 42 35, 50 22 Z"
          fill="url(#dfFlame)"
          animate={{
            d: [
              'M 50 22 C 58 35, 60 50, 50 56 C 40 50, 42 35, 50 22 Z',
              'M 50 18 C 61 33, 58 48, 50 56 C 42 48, 39 33, 50 18 Z',
              'M 50 24 C 56 36, 61 51, 50 56 C 39 51, 44 36, 50 24 Z',
              'M 50 22 C 58 35, 60 50, 50 56 C 40 50, 42 35, 50 22 Z',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <circle cx="50" cy="48" r="3" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
