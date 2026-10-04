import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sliders, Moon, Sun, Bell, Droplet, Compass, Layers } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';

export default function ComponentGallery() {
  const { activeMood, triggerChime } = useAtmosphere();
  
  // Interactive component states
  const [sliderVal, setSliderVal] = useState(65);
  const [toggleActive, setToggleActive] = useState(true);
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });
  const [pebbleActive, setPebbleActive] = useState(null);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltAngle({ x: y * -18, y: x * 18 });
  };

  const handleCardMouseLeave = () => {
    setTiltAngle({ x: 0, y: 0 });
  };

  const handlePebbleClick = (note, index) => {
    triggerChime(note);
    setPebbleActive(index);
    setTimeout(() => setPebbleActive(null), 600);
  };

  return (
    <section id="artifacts" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span 
          className="text-xs font-semibold tracking-widest uppercase inline-block"
          style={{ color: activeMood.primaryColor }}
        >
          Design System & Primitives
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white/90">
          The Craft of Subtle Artifacts
        </h2>
        <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
          Interactive primitives designed to feel tactile, gentle, and quiet under your fingertips.
        </p>
      </div>

      {/* Grid of UI Artifacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Artifact 1: The Frosted Monolith (3D Tilt Card) */}
        <div 
          className="perspective-1000 col-span-1 md:col-span-2 lg:col-span-1"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <motion.div
            style={{
              transform: `perspective(1000px) rotateX(${tiltAngle.x}deg) rotateY(${tiltAngle.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="h-full p-8 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
          >
            <div 
              className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none group-hover:opacity-70 transition-opacity duration-700"
              style={{ backgroundColor: activeMood.primaryColor }}
            />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] tracking-widest uppercase text-white/40">
                  Primitive #01 • Glass
                </span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeMood.primaryColor }} />
              </div>
              <h3 className="font-serif text-2xl text-white/90 font-light mb-2">
                The Frosted Monolith
              </h3>
              <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
                Layered depth with backdrop blur and dynamic 3D perspective tilt that tracks the light of your cursor.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
              <span>Backdrop-blur-2xl</span>
              <span className="italic font-serif">Move cursor across card</span>
            </div>
          </motion.div>
        </div>

        {/* Artifact 2: The Living Intensity Slider */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between relative shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-widest uppercase text-white/40">
                Primitive #02 • Control
              </span>
              <Sliders className="w-4 h-4 text-white/40" />
            </div>
            <h3 className="font-serif text-2xl text-white/90 font-light mb-2">
              The Living Glow Slider
            </h3>
            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Adjusts the bioluminescent diffusion radius of this element in real time.
            </p>

            {/* Interactive Glow Display Box */}
            <div 
              className="h-28 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden mb-6 transition-all duration-300"
              style={{
                boxShadow: `0 0 ${sliderVal * 0.8}px ${activeMood.primaryColor}${Math.round((sliderVal / 100) * 80).toString(16).padStart(2, '0')}`,
                background: `radial-gradient(circle, ${activeMood.glowColor} 0%, rgba(15,23,28,0.7) 80%)`
              }}
            >
              <span className="font-serif text-2xl text-white/80 font-light tracking-widest">
                {sliderVal}%
              </span>
            </div>

            {/* Custom Range Input */}
            <div className="space-y-2">
              <input
                type="range"
                min="10"
                max="100"
                value={sliderVal}
                onChange={(e) => {
                  setSliderVal(Number(e.target.value));
                  if (Number(e.target.value) % 15 === 0) triggerChime();
                }}
                className="w-full accent-amber-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: activeMood.primaryColor }}
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>Whisper</span>
                <span>Radiance</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/40 flex justify-between">
            <span>Fluid CSS Bloom</span>
            <span className="italic font-serif">Tactile feedback</span>
          </div>
        </div>

        {/* Artifact 3: Tactile Chime Pebbles */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between relative shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-widest uppercase text-white/40">
                Primitive #03 • Acoustics
              </span>
              <Bell className="w-4 h-4 text-white/40" />
            </div>
            <h3 className="font-serif text-2xl text-white/90 font-light mb-2">
              Harmonic Singing Stones
            </h3>
            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Touch the stones to release gentle pentatonic frequencies synthesized in real-time.
            </p>

            {/* 4 Chime Stones */}
            <div className="grid grid-cols-4 gap-2.5 my-4">
              {[
                { label: 'Dawn', freq: 432, desc: 'Ground' },
                { label: 'Mist', freq: 528, desc: 'Clarity' },
                { label: 'Zenith', freq: 639, desc: 'Harmonic' },
                { label: 'Dusk', freq: 741, desc: 'Calm' }
              ].map((stone, idx) => (
                <button
                  key={stone.label}
                  onClick={() => handlePebbleClick(stone.freq, idx)}
                  className={`p-3 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                    pebbleActive === idx
                      ? 'scale-110 border-white bg-white/20 shadow-lg'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}
                  style={{
                    borderColor: pebbleActive === idx ? activeMood.primaryColor : undefined
                  }}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/60">
                    {stone.label}
                  </span>
                  <span className="text-xs text-white font-medium">
                    {stone.freq}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/40 flex justify-between">
            <span>Web Audio API</span>
            <span className="italic font-serif">Organic resonance</span>
          </div>
        </div>

      </div>

      {/* Row 2: The Whisper Button & Poetic Day/Night Ambient Switch */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* The Whisper Button Showcase */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-left">
            <span className="text-[10px] tracking-widest uppercase text-white/40 block">
              Interaction • Button
            </span>
            <h4 className="font-serif text-2xl text-white/90 font-light">
              The Whisper Button
            </h4>
            <p className="text-white/60 text-xs sm:text-sm font-light max-w-sm">
              Non-invasive call-to-action that glows softly on approach and answers with acoustic chime.
            </p>
          </div>

          <button
            onClick={() => triggerChime()}
            className="relative px-7 py-3.5 rounded-full glass-pill border border-white/20 text-white text-xs uppercase tracking-widest font-medium group hover:border-white/40 transition-all duration-500 overflow-hidden shrink-0 shadow-lg hover:scale-105 active:scale-95"
          >
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
              style={{ backgroundColor: activeMood.glowColor }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: activeMood.primaryColor }} />
              Press Gently
            </span>
          </button>
        </div>

        {/* The Poetic Switch */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-left">
            <span className="text-[10px] tracking-widest uppercase text-white/40 block">
              Interaction • Switch
            </span>
            <h4 className="font-serif text-2xl text-white/90 font-light">
              The Poetic Switch
            </h4>
            <p className="text-white/60 text-xs sm:text-sm font-light max-w-sm">
              State change modeled like dusk fading into starlight, with ease-in-out spring dynamics.
            </p>
          </div>

          <button
            onClick={() => {
              setToggleActive(!toggleActive);
              triggerChime(toggleActive ? 432 : 528);
            }}
            className={`w-18 h-9 p-1 rounded-full border transition-all duration-500 flex items-center ${
              toggleActive 
                ? 'bg-white/20 border-white/30 justify-end' 
                : 'bg-white/5 border-white/10 justify-start'
            }`}
            style={{
              borderColor: toggleActive ? activeMood.primaryColor : undefined
            }}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              {toggleActive ? (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-700" />
              )}
            </motion.div>
          </button>
        </div>

      </div>

    </section>
  );
}
