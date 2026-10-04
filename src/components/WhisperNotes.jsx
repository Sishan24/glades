import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Feather, Sparkles, Wind } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';

const DEFAULT_WHISPERS = [
  { id: 1, text: 'The interface is quietest when you stop looking for things to click.', author: 'A Traveler', time: 'Dawn' },
  { id: 2, text: 'Digital spaces do not have to exhaust us.', author: 'Sishan', time: 'Golden Hour' },
  { id: 3, text: 'May we build tools that make human beings feel more peaceful, not more frantic.', author: 'Lingerer', time: 'Twilight' },
  { id: 4, text: 'Even code can have the softness of falling snow.', author: 'Solitude', time: 'Midnight' }
];

export default function WhisperNotes() {
  const { activeMood, triggerChime } = useAtmosphere();
  const [whispers, setWhispers] = useState(DEFAULT_WHISPERS);
  const [inputText, setInputText] = useState('');
  const [inputAuthor, setInputAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsSubmitting(true);
    triggerChime(activeMood.chimeFreq);

    setTimeout(() => {
      const newWhisper = {
        id: Date.now(),
        text: inputText.trim(),
        author: inputAuthor.trim() || 'A Quiet Soul',
        time: activeMood.name
      };

      setWhispers([newWhisper, ...whispers]);
      setInputText('');
      setInputAuthor('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <section id="whispers" className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span 
          className="text-xs font-semibold tracking-widest uppercase inline-block"
          style={{ color: activeMood.primaryColor }}
        >
          Ephemeral Guestbook
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white/90">
          Whispers to the Wind
        </h2>
        <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
          Leave a thought in the digital clearing. It will linger here like morning dew before evaporating into the quiet.
        </p>
      </div>

      {/* Input Form */}
      <div className="max-w-xl mx-auto mb-16">
        <form 
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl relative space-y-4"
        >
          <div 
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
            style={{ backgroundColor: activeMood.primaryColor }}
          />

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-white/40 block">
              Your Quiet Reflection
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="What does stillness feel like to you right now?"
              maxLength={180}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none font-serif italic text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between pt-2">
            <input
              type="text"
              value={inputAuthor}
              onChange={(e) => setInputAuthor(e.target.value)}
              placeholder="Sign as (optional)"
              maxLength={24}
              className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 shadow-md"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Release to Canopy</span>
            </button>
          </div>
        </form>
      </div>

      {/* Floating Whispers Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AnimatePresence>
          {whispers.map((w) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-3xl glass-panel-subtle border border-white/10 relative overflow-hidden group hover:border-white/25 transition-all duration-500 flex flex-col justify-between"
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: activeMood.primaryColor }}
              />

              <p className="font-serif italic text-base sm:text-lg text-white/80 leading-relaxed mb-6">
                “{w.text}”
              </p>

              <div className="flex items-center justify-between text-xs text-white/40 pt-4 border-t border-white/5">
                <span className="font-sans font-light text-white/60">
                  {w.author}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono">
                  {w.time}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
