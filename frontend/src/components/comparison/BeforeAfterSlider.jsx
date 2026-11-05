import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Maximize2, Minimize2, MoveHorizontal } from 'lucide-react';

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Space',
  afterLabel = 'Diwali Festive Glow',
  initialPosition = 50,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMouseMove]);

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullScreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl border border-gold/30 shadow-2xl bg-midnight-950 aspect-[4/3] md:aspect-[16/10] ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* 1. After Image (Background / Fully Decorated) */}
      <img
        src={afterImage}
        alt="Decorated Room"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* 2. Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Original Room"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            height: '100%',
          }}
        />
        {/* Subtle dark tint over original room to enhance contrast */}
        <div className="absolute inset-0 bg-midnight-950/20" />
      </div>

      {/* Floating Badges */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-midnight-950/80 backdrop-blur-md text-festive-cream/90 border border-gold/20 shadow-md">
          {beforeLabel}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-festive-orange to-gold text-midnight-950 border border-gold/40 shadow-glow-gold flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span>{afterLabel}</span>
        </span>
      </div>

      {/* Fullscreen Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFullScreen();
        }}
        className="absolute bottom-4 right-4 z-20 p-2 rounded-xl bg-midnight-950/80 backdrop-blur-md text-gold hover:text-white border border-gold/25 transition-colors"
        title="Toggle Fullscreen"
      >
        {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </button>

      {/* 3. Slider Divider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center -translate-x-1/2"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Luminous line */}
        <div className="w-[3px] h-full bg-gradient-to-b from-transparent via-gold-warm to-transparent shadow-[0_0_12px_rgba(244,199,106,0.9)]" />

        {/* Central interactive handle circle */}
        <div className="absolute w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-festive-orange border-2 border-white shadow-glow-gold flex items-center justify-center text-midnight-950 cursor-ew-resize pointer-events-auto transform active:scale-110 transition-transform">
          <MoveHorizontal className="w-5 h-5 font-bold" />
        </div>
      </div>
    </div>
  );
};
