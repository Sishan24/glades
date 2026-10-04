import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Feather, Compass, Sun, Moon, TreePine, CloudFog } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';

export default function Navigation() {
  const { atmosphere, activeMood, ATMOSPHERES, changeAtmosphere, isSoundPlaying, toggleSound } = useAtmosphere();
  const [showAtmosphereMenu, setShowAtmosphereMenu] = useState(false);

  const getAtmosphereIcon = (id) => {
    switch (id) {
      case 'golden-hour': return <Sun className="w-3.5 h-3.5" />;
      case 'forest-stillness': return <TreePine className="w-3.5 h-3.5" />;
      case 'twilight-mist': return <CloudFog className="w-3.5 h-3.5" />;
      case 'midnight-bloom': return <Moon className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-40 px-4 md:px-8 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-5 py-3 rounded-full glass-pill border border-white/10 shadow-2xl backdrop-blur-2xl max-w-4xl w-full">
        
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
            <span 
              className="w-2 h-2 rounded-full transition-colors duration-700 animate-pulse"
              style={{ backgroundColor: activeMood.primaryColor }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-widest text-lg font-light text-white/90 group-hover:text-white transition-colors">
              GLADES
            </span>
          </div>
        </a>

        {/* Center Chapter Nav links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase text-white/60 font-light">
          <a href="#philosophy" className="hover:text-white/95 transition-colors duration-200">
            Philosophy
          </a>
          <a href="#clearing" className="hover:text-white/95 transition-colors duration-200">
            The Clearing
          </a>
          <a href="#artifacts" className="hover:text-white/95 transition-colors duration-200">
            Artifacts
          </a>
          <a href="#whispers" className="hover:text-white/95 transition-colors duration-200">
            Whispers
          </a>
        </nav>

        {/* Action Controls: Atmosphere Switcher & Ambient Audio */}
        <div className="flex items-center gap-2 relative">
          
          {/* Atmosphere Picker Button */}
          <div className="relative">
            <button
              onClick={() => setShowAtmosphereMenu(!showAtmosphereMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all duration-300"
              title="Change Atmosphere"
            >
              <span style={{ color: activeMood.primaryColor }}>
                {getAtmosphereIcon(atmosphere)}
              </span>
              <span className="hidden sm:inline font-sans">{activeMood.name}</span>
            </button>

            {/* Atmosphere Dropdown Menu */}
            <AnimatePresence>
              {showAtmosphereMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-56 p-2 rounded-2xl glass-panel border border-white/15 shadow-2xl backdrop-blur-2xl z-50 flex flex-col gap-1"
                >
                  <div className="px-3 py-2 text-[10px] tracking-widest uppercase text-white/40 font-medium">
                    Shift Light & Mood
                  </div>
                  {Object.values(ATMOSPHERES).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        changeAtmosphere(item.id);
                        setShowAtmosphereMenu(false);
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs text-left transition-all ${
                        atmosphere === item.id
                          ? 'bg-white/15 text-white font-medium shadow-inner'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span style={{ color: item.primaryColor }}>
                          {getAtmosphereIcon(item.id)}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.primaryColor }}
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Soundscapes Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-300 border ${
              isSoundPlaying
                ? 'bg-white/15 text-white border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                : 'bg-white/5 hover:bg-white/10 text-white/60 border-white/10'
            }`}
            title={isSoundPlaying ? 'Pause Ambient Sound' : 'Play Ambient Sound (Procedural Web Audio)'}
          >
            {isSoundPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white" />
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-white/80 animate-pulse" />
                  <span className="w-0.5 h-2 bg-white/60 animate-pulse delay-75" />
                  <span className="w-0.5 h-3.5 bg-white/90 animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sound</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
