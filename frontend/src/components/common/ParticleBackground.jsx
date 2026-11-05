import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    // Golden sparks, ruby embers, and floating festive light sparks
    const particleCount = prefersReducedMotion ? 18 : 55;
    const particles = [];
    const festiveColors = ['#FFD700', '#FFB800', '#FF1E56', '#FF7A00', '#FFF6E5'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + 0.8,
        color: festiveColors[i % festiveColors.length],
        vx: (Math.random() - 0.5) * 0.45,
        vy: -Math.random() * 0.55 - 0.15, // Floating gently upward
        alpha: Math.random() * 0.75 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.twinkleDir * p.twinkleSpeed;

          if (p.alpha > 0.9) {
            p.alpha = 0.9;
            p.twinkleDir = -1;
          } else if (p.alpha < 0.2) {
            p.alpha = 0.2;
            p.twinkleDir = 1;
          }

          // Wrap edges
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Draw glowing particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.radius * 7;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep festive ambient gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-festive-crimson/15 blur-[150px]" />
      <div className="absolute top-[18%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-gold/15 blur-[130px]" />
      <div className="absolute bottom-[-10%] left-[25%] w-[42vw] h-[42vw] rounded-full bg-festive-orange/12 blur-[150px]" />

      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
