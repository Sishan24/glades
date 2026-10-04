import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Music, Sliders, ChevronUp, ChevronDown } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';

export default function SoundscapesDock() {
  const { isSoundPlaying, toggleSound, volume, changeVolume, activeMood, atmosphere, ATMOSPHERES, changeAtmosphere } = useAtmosphere();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Expanded Control Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 p-5 rounded-3xl glass-panel border border-white/15 shadow-2xl backdrop-blur-2xl w-72 sm:w-80 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" style={{ color: activeMood.primaryColor }} />
                <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
                  Procedural Soundscape
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono text-white/40">
                Web Audio
              </span>
            </div>

            <p className="text-[11px] text-white/50 font-light leading-relaxed">
              Warm continuous harmonic drone & soft canopy wind generated live mathematically inside your browser.
            </p>

            {/* Atmosphere Sound Presets */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                Atmosphere Tuning
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.values(ATMOSPHERES).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => changeAtmosphere(item.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] text-left transition-all ${
                      atmosphere === item.id
                        ? 'bg-white/15 text-white font-medium shadow-inner'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Slider */}
            <div className="space-y-1.5 pt-1 border-t border-white/10">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Soundscape Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: activeMood.primaryColor }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Toggle Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSound}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-pill border transition-all duration-500 shadow-2xl backdrop-blur-2xl hover:scale-105 active:scale-95 ${
            isSoundPlaying
              ? 'border-white/30 text-white bg-white/15 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
              : 'border-white/10 text-white/70 hover:text-white hover:border-white/20 bg-white/5'
          }`}
        >
          {isSoundPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-white" />
              {/* Dynamic Equalizer Bars */}
              <div className="flex items-center gap-0.5 h-3.5">
                <span className="w-0.5 h-full bg-white animate-pulse" />
                <span className="w-0.5 h-2 bg-white/70 animate-pulse delay-100" />
                <span className="w-0.5 h-3 bg-white/90 animate-pulse delay-200" />
                <span className="w-0.5 h-1.5 bg-white/60 animate-pulse delay-75" />
              </div>
              <span className="text-xs tracking-wider uppercase font-medium">Ambient On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-white/50" />
              <span className="text-xs tracking-wider uppercase font-medium">Ambient Off</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2.5 rounded-full glass-pill border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all shadow-xl"
          title="Sound Settings"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
}
