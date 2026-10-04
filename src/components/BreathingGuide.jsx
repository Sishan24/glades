import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';

const PHASES = [
  { label: 'Inhale', instruction: 'Draw in the quiet air...', duration: 4, scale: 1.35, opacity: 0.85 },
  { label: 'Hold', instruction: 'Rest in the fullness of stillness...', duration: 4, scale: 1.35, opacity: 0.75 },
  { label: 'Exhale', instruction: 'Release all tension and speed...', duration: 4, scale: 0.85, opacity: 0.4 },
  { label: 'Pause', instruction: 'Rest in the empty clearing...', duration: 4, scale: 0.85, opacity: 0.3 }
];

export default function BreathingGuide() {
  const { activeMood, triggerChime } = useAtmosphere();
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(PHASES[0].duration);
  const [breathCyclesCompleted, setBreathCyclesCompleted] = useState(0);

  const currentPhase = PHASES[phaseIndex];

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Next phase
            setPhaseIndex((curr) => {
              const next = (curr + 1) % PHASES.length;
              if (next === 0) {
                setBreathCyclesCompleted((c) => c + 1);
              }
              // Soft chime on Inhale and Exhale transitions
              if (next === 0 || next === 2) {
                triggerChime();
              }
              return next;
            });
            return PHASES[(phaseIndex + 1) % PHASES.length].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, phaseIndex, triggerChime]);

  const toggleBreathing = () => {
    if (!isActive) {
      triggerChime();
    }
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setCountdown(PHASES[0].duration);
  };

  return (
    <section id="clearing" className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto z-10 text-center">
      
      {/* Section Subhead */}
      <div className="max-w-2xl mx-auto mb-16 space-y-4">
        <span 
          className="text-xs font-semibold tracking-widest uppercase inline-block"
          style={{ color: activeMood.primaryColor }}
        >
          Interactive Sanctuary
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white/90">
          Breathe With The Interface
        </h2>
        <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
          “Every component is designed to breathe, rather than demand attention.” 
          Synchronize your cadence with the pulsing light of the glade.
        </p>
      </div>

      {/* Main Breathing Orb Container */}
      <div className="relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] my-6">
        
        {/* Multi-layered Animated Breathing Aura */}
        <div className="relative flex items-center justify-center">
          
          {/* Outermost Diffused Halo */}
          <motion.div
            animate={{
              scale: isActive ? currentPhase.scale * 1.25 : 1,
              opacity: isActive ? currentPhase.opacity * 0.5 : 0.25,
            }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: activeMood.primaryColor }}
          />

          {/* Secondary Glass Ring */}
          <motion.div
            animate={{
              scale: isActive ? currentPhase.scale * 1.1 : 1,
              rotate: isActive ? 180 : 0,
            }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            className="w-56 sm:w-72 h-56 sm:h-72 rounded-full border border-white/20 glass-panel-subtle flex items-center justify-center p-4 backdrop-blur-md shadow-2xl"
          >
            {/* Core Glowing Orb */}
            <motion.div
              animate={{
                scale: isActive ? currentPhase.scale : 1,
                backgroundColor: activeMood.glowColor,
                borderColor: activeMood.primaryColor,
              }}
              transition={{ duration: 4, ease: 'easeInOut' }}
              className="w-40 sm:w-52 h-40 sm:h-52 rounded-full border border-white/30 flex flex-col items-center justify-center p-6 text-center shadow-inner relative overflow-hidden"
            >
              {/* Internal subtle particle spark */}
              <div 
                className="absolute inset-0 opacity-40 blur-xl"
                style={{ backgroundColor: activeMood.primaryColor }}
              />

              <div className="relative z-10 space-y-1">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 block font-medium">
                  {isActive ? currentPhase.label : 'Pace'}
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-white font-light block">
                  {isActive ? countdown : 'Begin'}
                </span>
                <span className="text-[11px] text-white/60 font-light block max-w-[120px] line-clamp-1">
                  {isActive ? currentPhase.instruction : 'Click play to center'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Control Action Bar */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={toggleBreathing}
          className="flex items-center gap-2.5 px-6 py-3 rounded-full glass-panel border border-white/20 text-white font-medium text-xs tracking-wider uppercase hover:border-white/40 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4 text-white/80" />
              <span>Pause Cycle</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-white/80 fill-white/80" />
              <span>Start 4-4-4-4 Cycle</span>
            </>
          )}
        </button>

        <button
          onClick={resetBreathing}
          className="p-3 rounded-full glass-panel-subtle border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-300"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {breathCyclesCompleted > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-xs text-white/50 font-light flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: activeMood.primaryColor }} />
          <span>{breathCyclesCompleted} full breath cycle{breathCyclesCompleted > 1 ? 's' : ''} completed in stillness.</span>
        </motion.div>
      )}

    </section>
  );
}
