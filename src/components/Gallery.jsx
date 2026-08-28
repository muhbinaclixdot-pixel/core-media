// src/components/Gallery.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, Maximize2,
  Sparkles, Filter
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['ALL', 'Sound', 'LED Wall', 'Lighting', 'Rigging', 'SFX', 'Live Event', 'Corporate', 'Streaming'];

  const filteredItems = selectedCategory === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="relative py-28 bg-[#030a21] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/40 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow">
              SECTION 09 // VISUAL ARCHIVE
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
              LIVE IN<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                HIGH RESOLUTION.
              </span>
            </h2>
          </div>

          <p className="text-white/85 text-sm max-w-md">
            A visual glimpse into our real setups across concert grounds, convention centers, and university festival arenas.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-cursor="spec"
              className={`px-4 py-2 rounded-full font-mono-tech text-xs uppercase font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-blue-950 shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white'
                  : 'bg-[#06123b]/90 text-white/70 hover:text-white border border-sky-400/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clean Balanced Production Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="h-[300px] sm:h-[320px]"
            >
              <TiltCard maxTilt={8} glare={true} className="h-full rounded-3xl">
                <div
                  onClick={() => openLightbox(idx)}
                  data-cursor="view"
                  className="relative rounded-3xl overflow-hidden border border-sky-400/30 bg-[#06123b] group cursor-pointer hover:border-white transition-all duration-500 shadow-xl h-full flex flex-col justify-between p-6"
                >
                  {/* Photo Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030a21] via-[#030a21]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                  {/* Top Bar with Category Badge and Expand Icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="shrink-0 whitespace-nowrap inline-flex items-center px-3 py-1 rounded-full bg-[#030a21]/90 border border-sky-400/35 backdrop-blur-md font-mono-tech text-[10px] uppercase font-bold text-sky-300 shadow leading-none">
                      {item.category}
                    </span>

                    <div className="p-2.5 rounded-full bg-blue-600/90 backdrop-blur-md text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title and Detail at Bottom */}
                  <div className="relative z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-display font-black text-base sm:text-lg text-white uppercase leading-snug drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-mono-tech text-xs font-bold">
                  {filteredItems[lightboxIndex].category}
                </span>
                <span className="text-sm font-mono-tech text-slate-300 hidden sm:inline-block">
                  {filteredItems[lightboxIndex].title}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Center Image */}
            <div className="relative flex-1 flex items-center justify-center py-4">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-2xl border border-white/10 shadow-2xl"
              />

              {/* Lightbox Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-6 p-3.5 rounded-full bg-[#06123b]/80 border border-white/20 text-white hover:bg-blue-600 transition-colors focus:outline-none cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-6 p-3.5 rounded-full bg-[#06123b]/80 border border-white/20 text-white hover:bg-blue-600 transition-colors focus:outline-none cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center font-mono-tech text-xs text-sky-300 uppercase tracking-widest z-10 font-bold">
              IMAGE {lightboxIndex + 1} OF {filteredItems.length} // CORE MEDIA LIVE CAPTURE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
