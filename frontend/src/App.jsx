import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { ThemeProvider } from './context/ThemeContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ParticleBackground } from './components/common/ParticleBackground';
import { CinematicLoader } from './components/common/CinematicLoader';
import { AuthModal } from './components/auth/AuthModal';
import { FestiveCursor } from './components/common/FestiveCursor';
import { CrackersLauncher } from './components/common/CrackersLauncher';

import { HomePage } from './pages/HomePage';
import { ExploreThemesPage } from './pages/ExploreThemesPage';
import { UploadRoomPage } from './pages/UploadRoomPage';
import { DecorationStudioPage } from './pages/DecorationStudioPage';
import { AITransformationPage } from './pages/AITransformationPage';
import { BeforeAfterPage } from './pages/BeforeAfterPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout controller to conditionally render footer (e.g. omit on full-canvas studio)
const AppLayout = () => {
  const location = useLocation();
  const isStudio = location.pathname === '/studio';

  return (
    <div className="flex flex-col min-h-screen text-festive-cream relative">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/themes" element={<ExploreThemesPage />} />
          <Route path="/upload" element={<UploadRoomPage />} />
          <Route path="/studio" element={<DecorationStudioPage />} />
          <Route path="/ai-transform" element={<AITransformationPage />} />
          <Route path="/comparison" element={<BeforeAfterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isStudio && <Footer />}
      <AuthModal />
      <CrackersLauncher />
    </div>
  );
};

export function App() {
  const [loadingComplete, setLoadingComplete] = useState(() => {
    return sessionStorage.getItem('diwali_glow_loaded') === 'true';
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem('diwali_glow_loaded', 'true');
    setLoadingComplete(true);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <ProjectProvider>
          {/* Custom Diwali Sparkler Cursor Animation */}
          <FestiveCursor />

          {/* Golden Floating Embers & Particle Lights */}
          <ParticleBackground />

          {/* Cinematic Diya Ignition Intro Screen */}
          {!loadingComplete && <CinematicLoader onComplete={handleLoaderComplete} />}

          <Router>
            <AppLayout />
          </Router>

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1f0724',
                color: '#FFF6E5',
                border: '1px solid rgba(255, 215, 0, 0.4)',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 215, 0, 0.2)',
                fontSize: '13px',
                fontFamily: 'Poppins, sans-serif',
              },
              iconTheme: {
                primary: '#FFD700',
                secondary: '#120516',
              },
            }}
          />
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
