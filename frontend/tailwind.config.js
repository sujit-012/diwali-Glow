/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#0c030f',
          900: '#120516', // Royal Velvet Base
          800: '#1e0724',
          700: '#2e0b35',
        },
        darkPurple: {
          950: '#0f0212',
          900: '#1f0724',
          800: '#2e0b35',
          700: '#42114c',
        },
        gold: {
          DEFAULT: '#FFD700', // 24K Pure Gold
          warm: '#FFB800',    // Warm Amber Gold
          light: '#FFF099',
          dark: '#B8860B',
        },
        festive: {
          crimson: '#FF1E56', // Radiant Royal Crimson
          ruby: '#D3103E',
          orange: '#FF7A00',  // Saffron Firecracker
          cream: '#FFF6E5',   // Sandalwood Cream
          roseGold: '#FF6584',
          emerald: '#2ECC71',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(255, 215, 0, 0.45)',
        'glow-gold-lg': '0 0 50px rgba(255, 184, 0, 0.6)',
        'glow-orange': '0 0 25px rgba(255, 122, 0, 0.45)',
        'glow-crimson': '0 0 30px rgba(255, 30, 86, 0.5)',
        'glow-diya': '0 0 35px rgba(255, 122, 0, 0.7), 0 0 12px rgba(255, 215, 0, 0.9)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'festive-radial': 'radial-gradient(circle at 50% 20%, rgba(255, 215, 0, 0.18), transparent 70%)',
        'diya-gradient': 'linear-gradient(135deg, #FFB800 0%, #FFD700 50%, #FF1E56 100%)',
        'royal-gradient': 'linear-gradient(180deg, #120516 0%, #2e0b35 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #FFD700 0%, #FFF6E5 50%, #FFD700 100%)',
      },
      animation: {
        'flame-flicker': 'flame 1.5s ease-in-out infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scale(1) rotate(-1deg)', filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' },
          '50%': { transform: 'scale(1.08, 0.95) rotate(1.5deg)', filter: 'drop-shadow(0 0 16px rgba(255, 30, 86, 0.9))' },
          '100%': { transform: 'scale(0.96, 1.04) rotate(-0.5deg)', filter: 'drop-shadow(0 0 12px rgba(255, 184, 0, 0.85))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
