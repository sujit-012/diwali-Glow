import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../../utils/audioEffects';

export const FestiveCursor = () => {
  const canvasRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const colors = ['#FFD700', '#FFA500', '#FF4500', '#FFF4DC', '#FF2A6D', '#F4C76A'];

    let mouseX = -100;
    let mouseY = -100;
    let lastMouseX = -100;
    let lastMouseY = -100;
    let animationId;

    // Track mouse move
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering clickable element
      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') ||
          target.closest('a'))
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }

      // Emit trailing sparkler sparks on movement
      const dist = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY);
      if (dist > 3) {
        const count = Math.min(Math.floor(dist / 4), 4);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 6,
            y: mouseY + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 2 + (mouseX - lastMouseX) * 0.1,
            vy: Math.random() * 1.5 + 0.5, // Drifts downward like sparkler embers
            radius: Math.random() * 2.2 + 0.8,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.035 + 0.025,
            isStar: Math.random() > 0.6,
          });
        }
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    };

    // Burst mini firecracker sparks on click
    const handleClick = (e) => {
      soundEngine.playCrackerPop(0.35);

      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 4.5 + 2.0;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.8 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          isStar: true,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gravity
        p.vx *= 0.96; // Air resistance
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        if (p.isStar) {
          // Draw tiny diamond sparkle glint
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.radius * 1.5);
          ctx.lineTo(p.x + p.radius * 0.5, p.y);
          ctx.lineTo(p.x, p.y + p.radius * 1.5);
          ctx.lineTo(p.x - p.radius * 0.5, p.y);
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw round glowing ember
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Fullscreen Canvas for Sparkler Trail & Click Bursts */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] w-full h-full"
      />

      {/* Custom Diya Flame Cursor Head */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out will-change-transform"
      >
        <div
          className={`relative transition-all duration-200 flex items-center justify-center ${
            isPointer ? 'scale-150' : 'scale-100'
          }`}
        >
          {/* Luminous Outer Halo */}
          <div className="absolute w-8 h-8 rounded-full bg-festive-orange/40 blur-sm animate-pulse" />
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-gold to-festive-orange border border-white shadow-[0_0_10px_#FFD700]" />
          {/* Tiny Diya Spark Core */}
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]" />
        </div>
      </div>
    </>
  );
};
