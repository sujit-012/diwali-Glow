import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import { soundEngine } from '../../utils/audioEffects';
import { DiyaFlame } from './DiyaFlame';
import {
  Sparkles,
  Palette,
  Upload,
  LayoutDashboard,
  Bot,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  Brush,
  Volume2,
  VolumeX,
  ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getIsMuted());

  const location = useLocation();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { currentTheme, themeConfig, switchTheme, presets } = useAppTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = soundEngine.toggleMute();
    setIsMuted(!active);
    if (active) {
      toast.success('Crackers sound enabled! 🎆');
    } else {
      toast('Crackers sound muted', { icon: '🔇' });
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore Themes', path: '/themes', icon: Palette },
    { label: 'Upload Room', path: '/upload', icon: Upload },
    { label: 'Decoration Studio', path: '/studio', icon: Brush },
    { label: 'AI Decorate', path: '/ai-transform', icon: Bot, badge: 'AI' },
    { label: 'My Designs', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-midnight-950/90 backdrop-blur-xl border-b border-gold/25 py-2.5 shadow-xl shadow-black/50'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <DiyaFlame size="md" />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-gold-warm transition-colors">
                Diwali<span className="text-gold-gradient">Glow</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-festive-cream/70 -mt-1 hidden sm:block">
                Festive Home Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-200 rounded-lg flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-gold-warm font-semibold'
                      : 'text-festive-cream/80 hover:text-white hover:bg-gold/10'
                  }`}
                >
                  {item.icon && <item.icon className="w-3.5 h-3.5 opacity-75 text-gold" />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-full bg-gradient-to-r from-festive-crimson to-festive-orange text-white uppercase tracking-wider shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-gold via-festive-crimson to-gold-warm rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Sound FX, Theme Switcher, Auth */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* Crackers Sound Effect Toggle Button */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all ${
                isMuted
                  ? 'glass-card border-red-500/30 text-red-400 hover:border-red-400'
                  : 'bg-darkPurple-900/80 border-gold/40 text-gold-warm hover:shadow-glow-gold hover:border-gold'
              }`}
              title={isMuted ? 'Crackers Sound Off (Click to Enable)' : 'Crackers Sound On (Click to Mute)'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <div className="flex items-center space-x-1">
                  <Volume2 className="w-4 h-4 animate-pulse text-gold" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                </div>
              )}
            </button>

            {/* Theme Presets Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl glass-card border border-gold/30 hover:border-gold text-xs font-semibold text-festive-cream transition-all"
                title="Switch Festive Theme"
              >
                <span>{themeConfig.icon}</span>
                <span className="hidden xl:inline text-[11px] text-gold-warm">Theme</span>
                <ChevronDown className="w-3 h-3 text-gold/70" />
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel-elevated p-2 z-50 shadow-2xl border border-gold/35"
                  >
                    <div className="px-3 py-1.5 border-b border-gold/15 mb-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-gold-warm">
                        Select Festive Theme
                      </p>
                    </div>
                    {Object.values(presets).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          switchTheme(p.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs flex items-start space-x-2.5 transition-all ${
                          currentTheme === p.id
                            ? 'bg-gold/20 border border-gold text-white font-bold'
                            : 'hover:bg-gold/10 text-festive-cream/80'
                        }`}
                      >
                        <span className="text-lg">{p.icon}</span>
                        <div>
                          <p className="font-semibold text-white">{p.name}</p>
                          <p className="text-[10px] text-festive-cream/60 mt-0.5 line-clamp-1">
                            {p.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Auth Profile / Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-darkPurple-900/90 border border-gold/40 hover:border-gold transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-gold to-festive-crimson text-midnight-950 font-black flex items-center justify-center text-xs">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-festive-cream max-w-[90px] truncate">
                    {user?.name}
                  </span>
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl glass-panel-elevated py-2 z-50 shadow-xl border border-gold/30"
                    >
                      <div className="px-4 py-2 border-b border-gold/15">
                        <p className="text-[10px] text-festive-cream/60">Signed in as</p>
                        <p className="text-xs font-semibold text-white truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs text-festive-cream/90 hover:text-gold hover:bg-gold/10"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>My Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-festive-cream hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-gold via-festive-orange to-festive-crimson text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg text-gold hover:bg-gold/10"
              title="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-festive-cream hover:text-gold hover:bg-gold/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-gold/25 px-4 pt-2 pb-6 space-y-3"
          >
            {/* Theme switcher on mobile */}
            <div className="p-2.5 rounded-xl bg-midnight-900 border border-gold/20 flex items-center justify-between">
              <span className="text-xs text-festive-cream/80">Theme:</span>
              <div className="flex space-x-1.5">
                {Object.values(presets).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => switchTheme(p.id)}
                    className={`px-2 py-1 rounded-lg text-xs flex items-center space-x-1 border ${
                      currentTheme === p.id
                        ? 'bg-gold/20 border-gold text-white font-bold'
                        : 'border-transparent text-festive-cream/60'
                    }`}
                  >
                    <span>{p.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
                  location.pathname === item.path
                    ? 'bg-gold/15 text-gold-warm font-semibold'
                    : 'text-festive-cream/80 hover:bg-gold/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon && <item.icon className="w-4 h-4 text-gold" />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-festive-crimson text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-3 border-t border-gold/15 flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <UserIcon className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium text-white">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-xs text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="w-full py-2.5 text-center text-xs font-medium rounded-lg border border-gold/30 text-white"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('register');
                    }}
                    className="w-full py-2.5 text-center text-xs font-bold rounded-lg bg-gradient-to-r from-gold to-festive-crimson text-midnight-950"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
