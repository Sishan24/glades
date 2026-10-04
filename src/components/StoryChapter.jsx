import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Compass, Layers, Eye, Droplet, Sparkles } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';

const CHAPTERS = [
  {
    number: '01',
    subtitle: 'A Departure from Noise',
    title: 'Quiet Design & Negative Space',
    quote: 'The modern web demands your attention in seconds. Glades offers you a place to catch your breath.',
    body: 'We spend our lives surrounded by notifications, urgent banners, and micro-conversions. Quiet design rejects this agitation. By giving interface components room to breathe, we create visual sanctuary — space where clarity and calm become the primary functional features.',
    icon: Feather,
    highlights: ['Generous white space', 'Low cognitive friction', 'Unforced typography', 'Organic pauses']
  },
  {
    number: '02',
    subtitle: 'Kinetic Stillness',
    title: 'Subtle Motion & Weightless Physics',
    quote: 'Motion should feel like leaves falling onto a lake, not a machine calculating trajectories.',
    body: 'Animations in Glades are inspired by organic fluid dynamics: the way dawn mist curls around branches, or light refracts across rippling stream beds. Springs are tuned with gentle damping — subtle enough that you do not notice them as code, but as texture.',
    icon: Droplet,
    highlights: ['Natural deceleration curves', 'Zero sudden flashes', 'Spring physics', 'Hover luminescence']
  },
  {
    number: '03',
    subtitle: 'Places, Not Pages',
    title: 'Atmospheric Architecture',
    quote: 'What if websites felt like sacred clearings in the woods rather than endless filing cabinets?',
    body: 'When lighting responds to time and mood, and ambient soundscapes react to your presence, the browser screen stops feeling flat. It gains depth, resonance, and emotional gravity. Glades treats digital interfaces as habitats for human consciousness.',
    icon: Compass,
    highlights: ['Realtime atmospheric shifts', 'Diffused ray lighting', 'Glass depth layering', 'Sensory resonance']
  }
];

export default function StoryChapter() {
  const { activeMood, triggerChime } = useAtmosphere();

  return (
    <section id="philosophy" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto z-10">
      
      {/* Chapter Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-widest uppercase mb-3 inline-block"
          style={{ color: activeMood.primaryColor }}
        >
          Narrative Chapter
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white/90"
        >
          The Anatomy of Stillness
        </motion.h2>
        <p className="text-white/50 text-sm sm:text-base mt-4 max-w-xl mx-auto font-light leading-relaxed">
          Exploring the philosophy behind crafting calm, emotional software in an era of relentless stimulation.
        </p>
      </div>

      {/* Chapters list */}
      <div className="space-y-16 md:space-y-24">
        {CHAPTERS.map((chap, idx) => {
          const Icon = chap.icon;
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={chap.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-14 items-center`}
            >
              {/* Narrative Content */}
              <div className="flex-1 space-y-6 text-left">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-4xl text-white/20 font-light">
                    {chap.number}
                  </span>
                  <div className="h-[1px] w-12 bg-white/10" />
                  <span className="text-xs uppercase tracking-widest text-white/50">
                    {chap.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white/90 font-light leading-snug">
                  {chap.title}
                </h3>

                <blockquote 
                  className="pl-4 border-l-2 text-sm sm:text-base italic text-white/70 font-serif leading-relaxed"
                  style={{ borderColor: activeMood.primaryColor }}
                >
                  “{chap.quote}”
                </blockquote>

                <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
                  {chap.body}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {chap.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Visual Card */}
              <div className="flex-1 w-full">
                <div 
                  onClick={() => triggerChime()}
                  className="group relative p-8 sm:p-12 rounded-3xl glass-panel border border-white/10 overflow-hidden cursor-pointer hover:border-white/25 transition-all duration-700"
                >
                  {/* Subtle hover gradient background */}
                  <div 
                    className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10"
                    style={{ backgroundColor: activeMood.glowColor }}
                  />

                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6" style={{ color: activeMood.primaryColor }} />
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-white/40">
                      Touch To Ring
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-white/40" />
                      <span className="text-xs uppercase tracking-widest text-white/60">
                        Design Principle #{chap.number}
                      </span>
                    </div>
                    <div className="h-20 sm:h-28 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="font-serif italic text-base sm:text-lg text-white/80">
                          “Built to linger, not just to function.”
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
