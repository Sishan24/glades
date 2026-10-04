import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Wind, Compass } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';

export default function Hero() {
  const { activeMood, triggerChime } = useAtmosphere();

  const handleEnterClick = () => {
    triggerChime();
    const elem = document.getElementById('philosophy');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-16 z-10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Floating pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-8 glass-panel-subtle text-xs tracking-widest uppercase"
          style={{ borderColor: activeMood.primaryColor + '40' }}
        >
          <span 
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: activeMood.primaryColor }}
          />
          <span className="text-white/80 font-medium">An Exploration in Slowness</span>
          <span className="text-white/30">•</span>
          <span className="text-white/60">{activeMood.name}</span>
        </motion.div>

        {/* Central Core Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] text-white/95">
            Not everything built <br />
            <span className="italic font-light opacity-90" style={{ color: activeMood.primaryColor }}>
              must be loud.
            </span>
          </h1>

          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white/70 font-light max-w-2xl mx-auto pt-2">
            “Some interfaces are meant to be felt.”
          </p>
        </motion.div>

        {/* Evocative Narrative Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-8 font-light leading-relaxed"
        >
          Glades is an intentional departure from utility-first interfaces. 
          Built at the convergence of <span className="text-white/90">code, design, and emotion</span> — 
          crafted not to rush you forward, but to linger.
        </motion.p>

        {/* Interactive Action: Breathe & Descend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass-panel border border-white/20 text-white font-medium text-sm tracking-wider uppercase overflow-hidden hover:border-white/40 transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95"
          >
            {/* Subtle glow hover layer */}
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
              style={{ backgroundColor: activeMood.glowColor }}
            />
            
            <Wind className="w-4 h-4 text-white/70 group-hover:rotate-45 transition-transform duration-500" />
            <span className="relative z-10">Step Into The Clearing</span>
          </button>
        </motion.div>

        {/* Atmospheric Traits Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 mt-20 pt-10 border-t border-white/10 text-left"
        >
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-white/40 font-medium block">Aesthetic</span>
            <p className="text-xs text-white/80 font-light">Quiet Design</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-white/40 font-medium block">Movement</span>
            <p className="text-xs text-white/80 font-light">Subtle Fluid Motion</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-white/40 font-medium block">Lighting</span>
            <p className="text-xs text-white/80 font-light">Diffused Organic Depth</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-white/40 font-medium block">Presence</span>
            <p className="text-xs text-white/80 font-light">Soundscapes & Linger</p>
          </div>
        </motion.div>

      </div>

      {/* Gentle Scroll Hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 flex flex-col items-center gap-2 text-white/40 text-[10px] tracking-widest uppercase cursor-pointer"
        onClick={handleEnterClick}
      >
        <span>Descend</span>
        <ArrowDown className="w-3.5 h-3.5 text-white/40" />
      </motion.div>
    </section>
  );
}
