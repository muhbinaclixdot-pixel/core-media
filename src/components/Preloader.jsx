// src/components/Preloader.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoreLogo from './CoreLogo';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: Logo, 1: Audio Wave, 2: Fade Out

  useEffect(() => {
    // Stage 1: Reveal logo & "CORE"
    const t1 = setTimeout(() => setPhase(1), 700);
    // Stage 2: Audio wave pulse & "MEDIA"
    const t2 = setTimeout(() => setPhase(2), 1600);
    // Stage 3: Complete transition
    const t3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
        >
          {/* Subtle Stage Spotlight background */}
          <div className="absolute inset-0 stage-spotlight pointer-events-none opacity-60" />
          <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none animate-pulse-glow" />

          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066ff08_1px,transparent_1px),linear-gradient(to_bottom,#0066ff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <CoreLogo size="large" showTagline={false} />
            </motion.div>

            {/* Tagline reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-mono-tech text-xs tracking-[0.35em] text-slate-400 uppercase font-semibold text-center mt-2"
            >
              INITIALIZING LIVE PRODUCTION ENGINE
            </motion.div>
          </div>

          {/* Quick Skip Button */}
          <button
            onClick={() => onComplete && onComplete()}
            className="absolute bottom-8 right-8 text-xs font-mono-tech text-slate-400 hover:text-white uppercase tracking-widest transition-colors py-1 px-3 border border-slate-700/50 rounded-full hover:border-blue-500"
          >
            SKIP →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
