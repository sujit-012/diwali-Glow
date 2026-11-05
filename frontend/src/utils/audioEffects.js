/**
 * Authentic Diwali Firecrackers & Festive Sound Synthesizer using Web Audio API
 * Generates 100% offline, zero-latency, realistic firecracker sound effects:
 * - Single Patakha / Pop
 * - Handheld Phuljhadi / Sparkler crackle
 * - Sky Rocket whistle & explosion
 * - Ladi (Indian firecracker chain string)
 * - Anar (Fountain firecracker)
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('diwali_sound_enabled') === 'false';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('diwali_sound_enabled', (!this.isMuted).toString());
    if (!this.isMuted) {
      this.playCrackerPop(0.3);
    }
    return !this.isMuted;
  }

  getIsMuted() {
    return this.isMuted;
  }

  /**
   * Helper to create filtered white noise buffer
   */
  createNoiseBuffer(duration = 0.5) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * 1. Single Diwali Firecracker (Patakha / Bomb Pop)
   */
  playCrackerPop(volume = 0.6) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Noise burst (snap/shred of gunpowder)
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(0.25);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.frequency.exponentialRampToValueAtTime(300, t + 0.15);
    filter.Q.setValueAtTime(2.5, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 1.2, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.25);

    // 2. Low Sub-thud (reverberant boom)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.35);

    oscGain.gain.setValueAtTime(volume * 0.9, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  /**
   * 2. Handheld Sparkler / Phuljhadi (Fizzy crackling sizzle)
   */
  playSparklerSound(duration = 1.2, volume = 0.4) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(duration);

    // High pass filter for sharp sizzle
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2800, t);

    // Tremolo / crackle modulator
    const tremolo = this.ctx.createOscillator();
    tremolo.type = 'square';
    tremolo.frequency.setValueAtTime(35, t);

    const tremoloGain = this.ctx.createGain();
    tremoloGain.gain.setValueAtTime(volume * 0.5, t);

    const mainGain = this.ctx.createGain();
    mainGain.gain.setValueAtTime(volume * 0.4, t);
    mainGain.gain.linearRampToValueAtTime(volume * 0.5, t + duration * 0.3);
    mainGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + duration);
  }

  /**
   * 3. Sky Rocket (Ascending whistle -> Aerial explosion)
   */
  playRocketSound(volume = 0.55) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Ascending whoosh whistle
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(2200, t + 0.65);

    oscGain.gain.setValueAtTime(volume * 0.2, t);
    oscGain.gain.linearRampToValueAtTime(volume * 0.6, t + 0.5);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.75);

    // Aerial explosion after rocket reaches peak
    setTimeout(() => {
      this.playCrackerPop(volume * 1.1);
      // Secondary crackle sparkles
      setTimeout(() => this.playSparklerSound(0.6, volume * 0.6), 80);
    }, 620);
  }

  /**
   * 4. Traditional Indian Ladi / Firecracker String (Rapid succession pops)
   */
  playLadiString(count = 10, volume = 0.5) {
    if (this.isMuted) return;
    this.init();

    let delay = 0;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        // Vary pitch and volume slightly for realistic firecracker chain
        const jitterVol = volume * (0.6 + Math.random() * 0.6);
        this.playCrackerPop(jitterVol);
      }, delay);
      delay += Math.floor(Math.random() * 65) + 45; // 45-110ms spacing
    }

    // Grand final loud bomb at the end of the ladi!
    setTimeout(() => {
      this.playCrackerPop(volume * 1.3);
    }, delay + 80);
  }

  /**
   * 5. Anar / Flowerpot (Sizzling fountain whoosh)
   */
  playAnarSound(volume = 0.5) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const duration = 2.0;

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(duration);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.linearRampToValueAtTime(3200, t + 1.2);
    filter.frequency.linearRampToValueAtTime(1200, t + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(volume * 0.7, t + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + duration);
  }
}

export const soundEngine = new SoundEngine();
