import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('diwali_glow_token') || null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await api.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            // Invalid/expired token
            logout(false);
          }
        } catch (err) {
          console.warn('Backend authentication check failed:', err.message);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.login(email, password);
      if (res.success && res.token) {
        localStorage.setItem('diwali_glow_token', res.token);
        setToken(res.token);
        setUser(res.user);
        toast.success(`Welcome back, ${res.user.name}! ✨`);
        setIsAuthModalOpen(false);
        return true;
      } else {
        toast.error(res.message || 'Login failed');
        return false;
      }
    } catch (err) {
      toast.error('Network error during login');
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.register(name, email, password);
      if (res.success && res.token) {
        localStorage.setItem('diwali_glow_token', res.token);
        setToken(res.token);
        setUser(res.user);
        toast.success(`Welcome to DiwaliGlow, ${res.user.name}! 🪔`);
        setIsAuthModalOpen(false);
        return true;
      } else {
        toast.error(res.message || 'Registration failed');
        return false;
      }
    } catch (err) {
      toast.error('Network error during registration');
      return false;
    }
  };

  const logout = (notify = true) => {
    localStorage.removeItem('diwali_glow_token');
    setToken(null);
    setUser(null);
    if (notify) toast.success('Logged out successfully');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
