// Procedural Web Audio API Soundscape Generator for Glades
// Generates warm organic drones, gentle canopy breeze, and ethereal chimes.

class AmbientSoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.droneGain = null;
    this.noiseGain = null;
    this.isPlaying = false;
    this.volume = 0.45;
    this.oscillators = [];
    this.lfo = null;
    this.lfoGain = null;
    this.filter = null;
    this.noiseNode = null;
    this.currentMood = 'golden-hour';
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.noiseGain.connect(this.masterGain);
  }

  // Generate pink/brown noise for gentle forest breeze
  createNoiseBuffer() {
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration for softer, warm wind
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    return buffer;
  }

  setupBreeze() {
    const buffer = this.createNoiseBuffer();
    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    // Gentle bandpass filter sweeping for wind sound
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    // Wind LFO
    const windLFO = this.ctx.createOscillator();
    const windLFOGain = this.ctx.createGain();
    windLFO.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    windLFOGain.gain.setValueAtTime(140, this.ctx.currentTime);

    windLFO.connect(windFilter.frequency);
    windLFO.start();

    this.noiseNode.connect(windFilter);
    windFilter.connect(this.noiseGain);
    this.noiseNode.start();
  }

  // Frequencies for atmospheres
  getChordsForMood(mood) {
    switch (mood) {
      case 'forest-stillness':
        // Deep emerald peaceful pentatonic (D minor 9 / nature)
        return [73.42, 110.0, 146.83, 220.0, 293.66, 349.23]; // D2, A2, D3, A3, D4, F4
      case 'twilight-mist':
        // Melancholic ethereal twilight (A minor 11)
        return [55.0, 110.0, 164.81, 220.0, 261.63, 392.0]; // A1, A2, E3, A3, C4, G4
      case 'midnight-bloom':
        // Bioluminescent deep space ambient (F# major 9)
        return [46.25, 92.5, 138.59, 185.0, 277.18, 369.99]; // F#1, F#2, C#3, F#3, C#4, F#4
      case 'golden-hour':
      default:
        // Warm golden sunlight (C major 9 / Lydian warmth)
        return [65.41, 130.81, 196.0, 261.63, 329.63, 392.0]; // C2, C3, G3, C4, E4, G4
    }
  }

  setupDrone(mood) {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.oscillators = [];

    const freqs = this.getChordsForMood(mood);

    // Master filter for the drone
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(420, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    // Slow breath LFO on filter
    this.lfo = this.ctx.createOscillator();
    this.lfoGain = this.ctx.createGain();
    this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
    this.lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);
    this.lfo.connect(this.filter.frequency);
    this.lfo.start();

    this.filter.connect(this.droneGain);

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Alternate between warm triangle and pure sine
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      
      // Slight detune for analog shimmer
      const detune = (idx - freqs.length / 2) * 3.5;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.detune.setValueAtTime(detune, this.ctx.currentTime);

      const amp = 0.14 / Math.sqrt(idx + 1);
      oscGain.gain.setValueAtTime(amp, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.filter);
      osc.start();

      this.oscillators.push(osc);
    });
  }

  async start() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;

    this.setupDrone(this.currentMood);
    this.setupBreeze();

    // Fade in smoothly over 2.5 seconds
    const now = this.ctx.currentTime;
    this.droneGain.gain.cancelScheduledValues(now);
    this.droneGain.gain.setValueAtTime(0, now);
    this.droneGain.gain.linearRampToValueAtTime(0.6, now + 2.5);

    this.noiseGain.gain.cancelScheduledValues(now);
    this.noiseGain.gain.setValueAtTime(0, now);
    this.noiseGain.gain.linearRampToValueAtTime(0.18, now + 2.5);

    this.isPlaying = true;
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    // Fade out smoothly
    this.droneGain.gain.cancelScheduledValues(now);
    this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
    this.droneGain.gain.linearRampToValueAtTime(0, now + 1.2);

    this.noiseGain.gain.cancelScheduledValues(now);
    this.noiseGain.gain.setValueAtTime(this.noiseGain.gain.value, now);
    this.noiseGain.gain.linearRampToValueAtTime(0, now + 1.2);

    setTimeout(() => {
      this.isPlaying = false;
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      this.oscillators = [];
      if (this.noiseNode) {
        try {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        } catch (e) {}
      }
    }, 1300);
  }

  setMood(mood) {
    this.currentMood = mood;
    if (this.isPlaying && this.ctx) {
      const now = this.ctx.currentTime;
      // Crossfade to new harmonic pad
      this.droneGain.gain.linearRampToValueAtTime(0.1, now + 0.8);
      setTimeout(() => {
        this.setupDrone(mood);
        if (this.droneGain) {
          const t = this.ctx.currentTime;
          this.droneGain.gain.linearRampToValueAtTime(0.6, t + 1.5);
        }
      }, 850);
    }
  }

  setVolume(val) {
    this.volume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.1);
    }
  }

  // Play a soft meditative bell chime
  playChime(note = 528) {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, now);

    // Envelope: quick attack, long gentle decay
    chimeGain.gain.setValueAtTime(0, now);
    chimeGain.gain.linearRampToValueAtTime(0.25 * this.volume, now + 0.05);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 3.3);
  }
}

export const ambientSound = new AmbientSoundEngine();
