import React from 'react';
import { motion } from 'framer-motion';
import { Github, Heart, Star, GitFork, ArrowUp, Sparkles, Feather } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';

export default function Footer() {
  const { activeMood, triggerChime } = useAtmosphere();

  const scrollToTop = () => {
    triggerChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto z-10 text-center border-t border-white/10">
      
      {/* Poetic Closing Quote */}
      <div className="max-w-2xl mx-auto space-y-4 mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Feather className="w-4 h-4 text-white/40" />
        </div>
        <blockquote className="font-serif italic text-2xl sm:text-3xl text-white/90 font-light">
          “Built not to impress, but to be remembered.”
        </blockquote>
        <p className="text-white/40 text-xs tracking-widest uppercase font-mono">
          Code × Design × Emotion
        </p>
      </div>

      {/* Author & Repository Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-10 border-y border-white/5 my-8 text-left">
        
        {/* Author Column */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium block">
            Crafted By
          </span>
          <p className="text-sm text-white/90 font-medium">
            Sishan <span className="font-light text-white/50">— Frontend Developer</span>
          </p>
          <p className="text-xs text-white/50 font-light">
            Exploring the space between technology and feeling.
          </p>
        </div>

        {/* Tech Stack Column */}
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium block">
            Architecture
          </span>
          <p className="text-xs text-white/70 font-light">
            React • Vite • Tailwind CSS • Framer Motion • Web Audio API
          </p>
        </div>

        {/* Links Column */}
        <div className="flex items-center justify-start md:justify-end gap-3">
          <a
            href="https://github.com/Sishan24/glades"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel-subtle border border-white/10 text-xs text-white/80 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://github.com/Sishan24/glades"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full glass-panel-subtle border border-white/10 text-xs text-white/80 hover:text-white hover:border-white/30 transition-all duration-300"
            title="Star on GitHub"
          >
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">Star</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full glass-panel-subtle border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all duration-300"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Copyright / Trademark note */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 font-light mt-8">
        <div>
          © {new Date().getFullYear()} Glades. An exploration of quiet software.
        </div>
        <div className="flex items-center gap-1">
          <span>Designed with stillness</span>
          <Heart className="w-3 h-3 text-red-400/60 inline ml-1" />
        </div>
      </div>

    </footer>
  );
}
