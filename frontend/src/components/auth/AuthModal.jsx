import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { DiyaFlame } from '../common/DiyaFlame';
import { X, Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState(authModalMode || 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Sync internal mode with context
  React.useEffect(() => {
    if (authModalMode) setMode(authModalMode);
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (mode === 'login') {
      await login(email, password);
    } else {
      await register(name, email, password);
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-md">
        {/* Modal Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md rounded-2xl glass-panel-elevated p-6 sm:p-8 z-10 border border-gold/30 shadow-2xl overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-festive-orange/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-gold/20 blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-1.5 rounded-full text-festive-cream/60 hover:text-white hover:bg-gold/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <DiyaFlame size="md" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              {mode === 'login' ? 'Welcome to ' : 'Join '}
              <span className="text-gold-gradient">DiwaliGlow</span>
            </h3>
            <p className="text-xs text-festive-cream/70 mt-1">
              {mode === 'login'
                ? 'Sign in to access your festive rooms and saved designs.'
                : 'Create an account to save and transform your rooms.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-midnight-950/60 border border-gold/20 mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-md'
                  : 'text-festive-cream/70 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-md'
                  : 'text-festive-cream/70 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-festive-cream/80 mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-midnight-900/90 border border-gold/25 text-white placeholder-festive-cream/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-festive-cream/80 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-midnight-900/90 border border-gold/25 text-white placeholder-festive-cream/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-festive-cream/80 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-midnight-900/90 border border-gold/25 text-white placeholder-festive-cream/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-gold via-gold-warm to-festive-orange text-midnight-950 font-bold text-sm shadow-glow-gold hover:shadow-glow-gold-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>{submitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Guest Action */}
          <div className="mt-5 pt-4 border-t border-gold/15 text-center">
            <button
              onClick={closeAuthModal}
              className="text-xs text-gold hover:text-gold-warm transition-colors underline underline-offset-4"
            >
              Continue as Guest to Decorate Immediately
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
