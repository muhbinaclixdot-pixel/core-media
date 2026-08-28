// src/components/VideoExperience.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

export default function VideoExperience({ onOpenBooking }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section id="video" className="relative py-28 bg-[#030a21] overflow-hidden">
      {/* Background radial stage beams */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/40 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow">
            SECTION 10 // CINEMATIC SHOWREEL
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
            TURNING TECHNICAL SETUPS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
              INTO LIVE EXPERIENCES.
            </span>
          </h2>

          <p className="text-white/85 text-sm sm:text-base mt-4">
            Watch how our acoustic line arrays, high-definition curved LED walls, and intelligent lighting fixtures merge in real time.
          </p>
        </div>

        {/* Video Frame Canvas with Animated Play Trigger */}
        <div className="relative rounded-3xl overflow-hidden border border-sky-400/30 bg-[#06123b] shadow-[0_20px_60px_rgba(0,102,255,0.25)] group">
          
          {/* Looping Ambient Event Visual */}
          <div className="relative h-[380px] sm:h-[500px] md:h-[580px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1600&auto=format&fit=crop"
              alt="Concert stage video background"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-65"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030a21] via-[#030a21]/40 to-transparent" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#030a21]/40 to-[#030a21]/80" />

            {/* Subtle Blue Waveform Graphics Border at Top/Bottom */}
            <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-mono-tech text-xs uppercase font-bold text-white tracking-wider">
                  4K 60FPS MASTER REEL
                </span>
              </div>

              <div className="hidden sm:flex items-end gap-1 h-6">
                {[40, 80, 50, 95, 30, 70, 100, 60, 45, 90, 75, 40, 65, 85].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1 bg-sky-400/80 rounded-full animate-wave-2"
                  />
                ))}
              </div>
            </div>

            {/* Central Animated Magnetic Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Magnetic strength={0.4}>
                <button
                  onClick={() => setVideoModalOpen(true)}
                  data-cursor="play"
                  className="relative group/play flex items-center justify-center focus:outline-none cursor-pointer"
                  aria-label="Play Showreel"
                >
                  {/* Outer pulsing sonar rings */}
                  <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-blue-600/30 animate-ping duration-1000" />
                  <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-sky-400/20 border border-sky-400/50 group-hover/play:scale-125 transition-transform duration-500" />
                  
                  {/* Main Play Circle */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-400 p-[2px] shadow-[0_0_35px_rgba(0,102,255,0.8)] group-hover/play:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#06123b] flex items-center justify-center">
                      <Play className="w-7 h-7 text-sky-400 fill-sky-400 ml-1 group-hover/play:scale-115 transition-transform" />
                    </div>
                  </div>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="w-full max-w-5xl flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="font-mono-tech text-xs uppercase font-bold text-white tracking-wider">
                  CORE MEDIA OFFICIAL SHOWREEL // 4K PRODUCTION
                </span>
              </div>

              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close Video"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Container (Responsive Aspect Ratio) */}
            <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-sky-400/40 bg-black shadow-2xl relative">
              <iframe
                className="w-full h-full object-cover"
                src="https://www.youtube-nocookie.com/embed/fJ9rUzIMcZQ?autoplay=1&mute=0&controls=1&rel=0"
                title="Core Media Event Production Reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
