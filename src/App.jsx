import React from 'react';
import { AtmosphereProvider } from './context/AtmosphereContext';
import CanvasBackground from './components/CanvasBackground';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StoryChapter from './components/StoryChapter';
import BreathingGuide from './components/BreathingGuide';
import ComponentGallery from './components/ComponentGallery';
import WhisperNotes from './components/WhisperNotes';
import Footer from './components/Footer';
import SoundscapesDock from './components/SoundscapesDock';

export default function App() {
  return (
    <AtmosphereProvider>
      <div className="relative min-h-screen bg-[#070b0e] text-[#f1f5f9] selection:bg-amber-500/20 selection:text-amber-200">
        
        {/* Dynamic Canvas Particles & Ambient Gradient */}
        <CanvasBackground />

        {/* Custom Physics Cursor */}
        <CustomCursor />

        {/* Top Floating Glass Navigation */}
        <Navigation />

        {/* Main Content Area */}
        <main className="relative z-10 flex flex-col">
          <Hero />
          <StoryChapter />
          <BreathingGuide />
          <ComponentGallery />
          <WhisperNotes />
        </main>

        {/* Footer & Epilogue */}
        <Footer />

        {/* Ambient Web Audio Player Dock */}
        <SoundscapesDock />

      </div>
    </AtmosphereProvider>
  );
}
