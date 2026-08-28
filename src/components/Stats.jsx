// src/components/Stats.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../data/content';

function CounterItem({ stat, index }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.value) {
          setCount(stat.value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="p-6 sm:p-8 rounded-3xl bg-[#06123b]/80 border border-sky-400/30 hover:border-white transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/10 to-sky-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-baseline mb-2">
          <span className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tight drop-shadow-md">
            {count}
          </span>
          <span className="font-display font-black text-3xl sm:text-4xl text-sky-400 ml-1">
            {stat.suffix}
          </span>
        </div>

        <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wide">
          {stat.label}
        </h3>
      </div>

      <p className="text-white/80 text-xs mt-3 border-t border-white/10 pt-3">
        {stat.desc}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-24 bg-[#02071a] border-y border-sky-400/20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,102,255,0.25),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/40 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-3 shadow">
            SECTION 06 // PRODUCTION METRICS
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            PROVEN TRACK RECORD.<br />
            <span className="text-sky-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">UNCOMPROMISING STANDARD.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <CounterItem key={stat.label} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
