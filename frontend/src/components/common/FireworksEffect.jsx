import confetti from 'canvas-confetti';
import { soundEngine } from '../../utils/audioEffects';

/**
 * Triggers a Diwali festive celebration burst with gold, orange, crimson and sparkle stars
 * and plays authentic synchronized firecracker audio effects!
 */
export const triggerFestiveFireworks = (soundType = 'rocket') => {
  // Play sound effect
  if (soundType === 'ladi') {
    soundEngine.playLadiString(12, 0.55);
  } else if (soundType === 'sparkler') {
    soundEngine.playSparklerSound(1.8, 0.5);
  } else if (soundType === 'anar') {
    soundEngine.playAnarSound(0.6);
  } else {
    soundEngine.playRocketSound(0.65);
  }

  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 35,
    spread: 360,
    ticks: 70,
    zIndex: 9999,
    colors: ['#FFD700', '#FFB800', '#FF2A6D', '#FF7A00', '#FFF4DC', '#E5094C'],
  };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left firework rocket
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
    });
    // Right firework rocket
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
    });
  }, 220);
};

export const FireworksEffect = () => {
  return null;
};
