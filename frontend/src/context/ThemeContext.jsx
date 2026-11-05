import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ThemeContext = createContext();

export const THEME_PRESETS = {
  royalCrimson: {
    id: 'royalCrimson',
    name: 'Royal Velvet Crimson & 24K Gold',
    icon: '👑',
    bgClass: 'theme-royal-crimson',
    primaryColor: '#FFD700',
    accentColor: '#FF1E56',
    description: 'Imperial palace celebration with deep velvet crimson, 24K gold and radiant ruby glows.',
  },
  celestialMidnight: {
    id: 'celestialMidnight',
    name: 'Celestial Midnight & Starlight',
    icon: '🌌',
    bgClass: 'theme-celestial-midnight',
    primaryColor: '#F4C76A',
    accentColor: '#E87532',
    description: 'Deep starlit midnight indigo with warm golden lanterns and celestial sparkles.',
  },
  templeEmerald: {
    id: 'templeEmerald',
    name: 'Auspicious Emerald & Sandalwood',
    icon: '🌿',
    bgClass: 'theme-temple-emerald',
    primaryColor: '#F5B041',
    accentColor: '#2ECC71',
    description: 'Sacred temple ambiance with royal emerald jade, sandalwood warmth and golden marigolds.',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('diwali_app_theme') || 'royalCrimson';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-royal-crimson', 'theme-celestial-midnight', 'theme-temple-emerald');

    const active = THEME_PRESETS[currentTheme] || THEME_PRESETS.royalCrimson;
    root.classList.add(active.bgClass);
    localStorage.setItem('diwali_app_theme', currentTheme);
  }, [currentTheme]);

  const switchTheme = (themeKey) => {
    if (THEME_PRESETS[themeKey]) {
      setCurrentTheme(themeKey);
      toast(`Switched to ${THEME_PRESETS[themeKey].name} ✨`, {
        icon: THEME_PRESETS[themeKey].icon,
      });
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeConfig: THEME_PRESETS[currentTheme] || THEME_PRESETS.royalCrimson,
        switchTheme,
        presets: THEME_PRESETS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
