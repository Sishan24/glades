import React, { createContext, useContext, useState, useEffect } from 'react';
import { ambientSound } from '../audio/AmbientEngine';

const AtmosphereContext = createContext();

export const ATMOSPHERES = {
  'golden-hour': {
    id: 'golden-hour',
    name: 'Golden Hour',
    subtitle: 'Warm sunlight kissing dew and pine needles',
    primaryColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.22)',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    accentText: 'text-amber-400',
    borderGlow: 'border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)]',
    chimeFreq: 528, // Love / warmth frequency
    gradient: 'from-[#140e08] via-[#0b1013] to-[#070b0e]',
    ambientOrbs: [
      { color: 'rgba(245, 158, 11, 0.25)', size: '600px', top: '10%', left: '15%' },
      { color: 'rgba(217, 119, 6, 0.18)', size: '500px', top: '50%', right: '10%' },
      { color: 'rgba(251, 191, 36, 0.15)', size: '400px', bottom: '15%', left: '30%' }
    ],
    tagline: 'Luminous • Soft • Embracing'
  },
  'forest-stillness': {
    id: 'forest-stillness',
    name: 'Forest Stillness',
    subtitle: 'Deep canopy shadow, damp moss, slow ancient breath',
    primaryColor: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.2)',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    accentText: 'text-emerald-400',
    borderGlow: 'border-emerald-500/30 shadow-[0_0_40px_rgba(34,197,94,0.15)]',
    chimeFreq: 432, // Earth resonance
    gradient: 'from-[#071710] via-[#091214] to-[#070b0e]',
    ambientOrbs: [
      { color: 'rgba(34, 197, 94, 0.2)', size: '650px', top: '12%', right: '15%' },
      { color: 'rgba(22, 101, 52, 0.25)', size: '550px', top: '55%', left: '8%' },
      { color: 'rgba(74, 222, 128, 0.12)', size: '420px', bottom: '10%', right: '25%' }
    ],
    tagline: 'Quiet • Grounded • Ancient'
  },
  'twilight-mist': {
    id: 'twilight-mist',
    name: 'Twilight Mist',
    subtitle: 'Dusk settling over quiet lakes, soft purple haze',
    primaryColor: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.22)',
    badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    accentText: 'text-violet-400',
    borderGlow: 'border-violet-500/30 shadow-[0_0_40px_rgba(167,139,250,0.15)]',
    chimeFreq: 639, // Harmonic connection
    gradient: 'from-[#0e0c1f] via-[#0a0f1b] to-[#070b0e]',
    ambientOrbs: [
      { color: 'rgba(139, 92, 246, 0.22)', size: '600px', top: '8%', left: '20%' },
      { color: 'rgba(124, 58, 237, 0.18)', size: '520px', top: '60%', right: '12%' },
      { color: 'rgba(196, 181, 253, 0.14)', size: '450px', bottom: '8%', left: '25%' }
    ],
    tagline: 'Reflective • Dreamlike • Ethereal'
  },
  'midnight-bloom': {
    id: 'midnight-bloom',
    name: 'Midnight Bloom',
    subtitle: 'Bioluminescent currents in an obsidian sky',
    primaryColor: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.22)',
    badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    accentText: 'text-teal-400',
    borderGlow: 'border-teal-500/30 shadow-[0_0_40px_rgba(45,212,191,0.15)]',
    chimeFreq: 741, // Intuition / clarity
    gradient: 'from-[#041217] via-[#050e18] to-[#04070a]',
    ambientOrbs: [
      { color: 'rgba(45, 212, 191, 0.22)', size: '620px', top: '15%', right: '18%' },
      { color: 'rgba(13, 148, 136, 0.22)', size: '540px', top: '48%', left: '12%' },
      { color: 'rgba(94, 234, 212, 0.12)', size: '400px', bottom: '12%', right: '30%' }
    ],
    tagline: 'Silent • Deep • Bioluminescent'
  }
};

export const AtmosphereProvider = ({ children }) => {
  const [atmosphere, setAtmosphere] = useState('golden-hour');
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const activeMood = ATMOSPHERES[atmosphere] || ATMOSPHERES['golden-hour'];

  const changeAtmosphere = (id) => {
    if (!ATMOSPHERES[id]) return;
    setAtmosphere(id);
    ambientSound.setMood(id);
    ambientSound.playChime(ATMOSPHERES[id].chimeFreq);
  };

  const toggleSound = async () => {
    if (isSoundPlaying) {
      ambientSound.stop();
      setIsSoundPlaying(false);
    } else {
      await ambientSound.start();
      ambientSound.setMood(atmosphere);
      setIsSoundPlaying(true);
    }
  };

  const changeVolume = (newVol) => {
    setVolume(newVol);
    ambientSound.setVolume(newVol);
  };

  const triggerChime = (customFreq) => {
    ambientSound.playChime(customFreq || activeMood.chimeFreq);
  };

  return (
    <AtmosphereContext.Provider
      value={{
        atmosphere,
        activeMood,
        ATMOSPHERES,
        changeAtmosphere,
        isSoundPlaying,
        toggleSound,
        volume,
        changeVolume,
        triggerChime,
      }}
    >
      {children}
    </AtmosphereContext.Provider>
  );
};

export const useAtmosphere = () => {
  const context = useContext(AtmosphereContext);
  if (!context) {
    throw new Error('useAtmosphere must be used within an AtmosphereProvider');
  }
  return context;
};
