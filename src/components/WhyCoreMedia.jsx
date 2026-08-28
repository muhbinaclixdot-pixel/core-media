// src/components/WhyCoreMedia.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, Tv, Sparkles, Layers, CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { WHY_CORE_MEDIA } from '../data/content';
import Magnetic from './Magnetic';

const iconMap = {
  sound: Volume2,
  visuals: Tv,
  lighting: Sparkles,
  production: Layers,
};

function WhyCard({ item, index, onOpenBooking }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const Icon = iconMap[item.id] || Sparkles;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="spec"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative rounded-3xl border border-sky-400/30 bg-[#06123b] p-5 sm:p-6 flex flex-col justify-between group cursor-pointer hover:border-white hover:shadow-[0_15px_40px_rgba(0,102,255,0.4)] min-h-[360px] overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15), transparent 70%)`,
        }}
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-blue-600 border border-white/20 text-white group-hover:bg-white group-hover:text-blue-900 transition-colors duration-300 shadow-lg">
            <Icon className="w-5 h-5" />
          </div>

          <span className="shrink-0 whitespace-nowrap inline-flex items-center justify-center font-mono-tech text-[9px] uppercase tracking-wider text-sky-300 font-black px-3 py-1 rounded-full bg-blue-900/90 border border-sky-400/30 leading-none">
            {item.tag}
          </span>
        </div>

        <h3 className="text-base sm:text-lg lg:text-[1.1rem] xl:text-xl font-display font-black text-white uppercase mb-2.5 leading-snug tracking-tight break-normal">
          {item.title}
        </h3>

        <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-4">
          {item.desc}
        </p>
      </div>

      <div>
        <div className="space-y-2 pt-4 border-t border-white/10 mb-6">
          {item.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-white/90 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{spec}</span>
            </div>
          ))}
        </div>

        <Magnetic strength={0.2} className="w-full">
          <button
            onClick={() => onOpenBooking && onOpenBooking(item.title)}
            data-cursor="book"
            className="w-full py-2.5 rounded-xl bg-white hover:bg-sky-50 text-blue-950 font-mono-tech text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow cursor-pointer"
          >
            <span>CHOOSE PILLAR</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </Magnetic>
      </div>
    </motion.div>
  );
}

export default function WhyCoreMedia({ onOpenBooking }) {
  return (
    <section id="why" className="relative py-28 bg-[#030a21] overflow-hidden">
      <div className="absolute top-1/2 left-10 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/40 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow">
            SECTION 11 // CORE ADVANTAGE
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
            WHY PRODUCERS TRUST<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
              CORE MEDIA.
            </span>
          </h2>

          <p className="text-white/90 text-sm sm:text-base mt-4">
            Four engineering cornerstones that ensure every event is technically flawless, visually magnetic, and unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CORE_MEDIA.map((item, idx) => (
            <WhyCard
              key={item.id}
              item={item}
              index={idx}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
