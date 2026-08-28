// src/components/EventTypes.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EVENT_TYPES } from '../data/content';

export default function EventTypes({ onOpenBooking }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="event-types" className="relative py-28 bg-[#030712] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-sky-400 font-mono-tech text-xs font-semibold uppercase tracking-widest mb-4">
              SECTION 07 // EVENT CATEGORIES
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
              WHATEVER THE STAGE,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                WE MAKE IT MATTER.
              </span>
            </h2>
          </div>

          <p className="text-slate-400 text-sm max-w-md">
            Whether it’s a high-stakes corporate summit for 500 executives or a stadium music festival with 20,000 screaming fans, we engineer the technical foundation for success.
          </p>
        </div>

        {/* Dynamic Image Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_TYPES.map((type, idx) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredId(type.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-cursor="view"
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#060d24] group min-h-[360px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer hover:border-sky-400/60 transition-all duration-500 shadow-xl"
              onClick={() => onOpenBooking && onOpenBooking(type.title)}
            >
              {/* Panel Background Image */}
              <img
                src={type.image}
                alt={type.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-45 group-hover:opacity-75"
              />

              {/* Blue Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent group-hover:via-blue-950/40 transition-colors duration-500" />

              {/* Blue Light Ray */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content Box */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-sky-400 font-bold">
                    {type.subtitle}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-sky-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <h3 className="text-2xl font-display font-black text-white uppercase group-hover:translate-x-1 transition-transform duration-300">
                  {type.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                  {type.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono-tech text-sky-400 uppercase font-semibold">
                  <span>DISCUSS STAGE PRODUCTION</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
