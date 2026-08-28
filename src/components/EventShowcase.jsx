// src/components/EventShowcase.jsx
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Users, Calendar,
  ArrowUpRight, ChevronLeft, ChevronRight
} from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../data/content';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';

export default function EventShowcase({ onOpenBooking }) {
  const scrollContainerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = ['ALL', 'Concerts & Live Music', 'Corporate Events', 'College & Festival Events', 'Product Launches', 'Private & Gala Events'];

  const filteredProjects = activeFilter === 'ALL'
    ? SHOWCASE_PROJECTS
    : SHOWCASE_PROJECTS.filter((p) => p.category === activeFilter);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -480 : 480;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="showcase" className="relative py-28 bg-[#030a21] overflow-hidden">
      {/* Background Stage Beam Glow */}
      <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Slide Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/35 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
              SECTION 03 // LIVE PORTFOLIO
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
              SEE IT. HEAR IT.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                FEEL IT.
              </span>
            </h2>
          </div>

          {/* Slide Arrow Navigation Buttons */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.3}>
              <button
                onClick={() => handleScroll('left')}
                data-cursor="pointer"
                className="p-3.5 rounded-full bg-[#06123b] border border-sky-400/40 text-white hover:bg-white hover:text-blue-950 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] active:scale-90 flex items-center justify-center cursor-pointer"
                aria-label="Previous Projects"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={() => handleScroll('right')}
                data-cursor="pointer"
                className="p-3.5 rounded-full bg-[#06123b] border border-sky-400/40 text-white hover:bg-white hover:text-blue-950 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] active:scale-90 flex items-center justify-center cursor-pointer"
                aria-label="Next Projects"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              data-cursor="spec"
              className={`px-4 py-2 rounded-full font-mono-tech text-xs uppercase font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-white text-blue-950 shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white'
                  : 'bg-[#06123b]/90 text-white/80 hover:text-white border border-sky-400/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Slider with Touch / Drag Support */}
      <div className="w-full relative px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          data-cursor="drag"
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar py-4 scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="w-[85vw] max-w-[360px] sm:max-w-none sm:w-[420px] md:w-[460px] shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <TiltCard maxTilt={8} glare={true} className="rounded-3xl h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  data-cursor="view"
                  className="rounded-3xl overflow-hidden border border-sky-400/30 bg-[#06123b] group hover:border-white transition-all duration-500 flex flex-col justify-between shadow-2xl relative h-full"
                >
                  {/* Media Image */}
                  <div className="relative h-[260px] sm:h-[300px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-70"
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06123b] via-[#06123b]/30 to-transparent" />
                    
                    {/* Index Pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-[#030a21]/90 border border-sky-400/40 font-mono-tech text-xs font-black text-sky-300 shadow">
                        {project.id}
                      </span>
                    </div>

                    {/* Attendance */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-[#030a21]/90 border border-white/20 font-mono-tech text-[11px] text-white font-bold flex items-center gap-1.5 shadow">
                        <Users className="w-3 h-3 text-sky-400" />
                        {project.attendance}
                      </span>
                    </div>

                    {/* Category & Location Header */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center gap-2 text-sky-300 font-mono-tech text-xs uppercase tracking-wider font-bold mb-1">
                        <MapPin className="w-3.5 h-3.5 text-sky-400" />
                        <span>{project.location}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase leading-snug">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Card Details */}
                  <div className="p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#06123b] to-[#040c26]">
                    <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-blue-900/80 border border-sky-400/30 text-[10px] font-mono-tech uppercase font-bold text-white shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action CTA with Magnetic hover */}
                    <Magnetic strength={0.2} className="w-full">
                      <button
                        onClick={() => onOpenBooking && onOpenBooking(project.title)}
                        data-cursor="book"
                        className="w-full py-3 rounded-xl bg-white hover:bg-sky-50 text-blue-950 font-mono-tech text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn shadow-md cursor-pointer"
                      >
                        <span>REQUEST SIMILAR SETUP</span>
                        <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </Magnetic>
                  </div>
                </motion.div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
