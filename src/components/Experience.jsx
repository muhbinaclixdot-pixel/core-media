// src/components/Experience.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, Sparkles, Tv, Layers, ArrowRight
} from 'lucide-react';
import Magnetic from './Magnetic';

export default function Experience({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const lastWheelTime = useRef(0);

  const pillars = [
    {
      id: 'acoustic',
      number: '01',
      title: "ACOUSTIC MASTERY",
      subtitle: "50,000W+ Tour-Grade Audio",
      desc: "Precision time-aligned line arrays calibrated to venue geometry for crystal speech intelligibility and thumping concert sub-bass.",
      icon: Volume2,
      tagline: "Ultra-Low Distortion // Precision Array Calibration",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop",
      color: "from-blue-600 to-sky-400",
      specs: [
        "L-Acoustics / Tour Line Arrays",
        "Cardioid Subwoofer Dispersion",
        "Lake LM44 96kHz Digital DSP",
        "DiGiCo 32-Bit FOH Mixing Console"
      ]
    },
    {
      id: 'lighting',
      number: '02',
      title: "ATMOSPHERIC LIGHTING",
      subtitle: "DMX & Timecode Choreography",
      desc: "Synchronized beam fixtures, sharp spots, and lasers painting the arena with intense emotion and visual rhythm.",
      icon: Sparkles,
      tagline: "GrandMA3 Architecture // Millisecond Timecode Sync",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop",
      color: "from-sky-400 to-indigo-500",
      specs: [
        "380W Sharp Moving Head Beams (1.8°)",
        "Multi-Watt RGB Laser Projection",
        "MDG Dual Fog & Atmospheric Hazers",
        "GrandMA3 Art-Net / sACN Network"
      ]
    },
    {
      id: 'led',
      number: '03',
      title: "4K LED ARCHITECTURE",
      subtitle: "P2.6 & P3.9 High Refresh Walls",
      desc: "Curved and planar high-brightness visual screens that remain vivid even under direct sunlight and high-speed broadcast cameras.",
      icon: Tv,
      tagline: "Zero Scanlines // HDR 10-Bit Color Depth",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1600&auto=format&fit=crop",
      color: "from-blue-500 to-cyan-400",
      specs: [
        "P2.6mm Ultra Fine Pixel Pitch",
        "4,500 Nits High-Brightness Panels",
        "Brompton Tessera SX40 4K Processor",
        "Seamless Concave & Convex Curves"
      ]
    },
    {
      id: 'rigging',
      number: '04',
      title: "RIGGING & SAFETY",
      subtitle: "Certified Aluminum Infrastructure",
      desc: "Engineered box trusses, load-tested motors, and fail-safe power distribution systems for complete peace of mind.",
      icon: Layers,
      tagline: "TUV / ISO Certified // Realtime Load Monitoring",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1600&auto=format&fit=crop",
      color: "from-sky-500 to-blue-700",
      specs: [
        "EN-AW 6082-T6 Aluminum Heavy Truss",
        "CM Lodestar D8+ Electric Chain Hoists",
        "Isolated Cam-Lok 3-Phase Distro",
        "Engineered Wind-Resistant Rigging"
      ]
    },
  ];

  // Mouse Wheel Driven Slide Progression
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 380) return;

      if (e.deltaY > 25) {
        // Scrolling Down: Next Slide if available
        if (activeTab < pillars.length - 1) {
          e.preventDefault();
          setActiveTab((prev) => prev + 1);
          lastWheelTime.current = now;
        }
        // At last slide -> do not preventDefault, let user scroll down to next section naturally
      } else if (e.deltaY < -25) {
        // Scrolling Up: Previous Slide if available
        if (activeTab > 0) {
          e.preventDefault();
          setActiveTab((prev) => prev - 1);
          lastWheelTime.current = now;
        }
        // At first slide -> do not preventDefault, let user scroll up naturally
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [activeTab, pillars.length]);

  const handleSelectPillar = (idx) => {
    setActiveTab(idx);
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 sm:py-28 bg-transparent overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-sky-400/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066ff0a_1px,transparent_1px),linear-gradient(to_bottom,#0066ff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header with smooth entrance */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/35 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
              <span>SECTION 01 // THE PRODUCTION EXPERIENCE</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
              MORE THAN EQUIPMENT.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                WE BUILD EXPERIENCES.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <p className="text-white/85 text-xs sm:text-sm max-w-md leading-relaxed">
              From acoustic line arrays and DMX lighting to curved 4K LED walls and certified rigging, explore our four pillars of live event engineering.
            </p>

            {/* Navigation & Controls */}
            <div className="flex items-center gap-3 mt-1">
              {/* Numbered Step Tabs */}
              <div className="flex items-center gap-1.5 bg-[#06123b] p-1 rounded-full border border-sky-400/30">
                {pillars.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPillar(idx)}
                    className={`px-3 py-1 rounded-full font-mono-tech text-xs font-black transition-all ${
                      activeTab === idx
                        ? 'bg-blue-600 text-white shadow-[0_0_12px_#0066ff]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {p.number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Horizon Expandable Cards Deck with Staggered Bottom-to-Top Pop-up */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 min-h-[500px]">
          {pillars.map((pillar, idx) => {
            const isSelected = activeTab === idx;

            return (
              <motion.div
                key={pillar.id}
                onClick={() => handleSelectPillar(idx)}
                onMouseEnter={() => handleSelectPillar(idx)}
                layout
                initial={{ opacity: 0, y: 90, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.55, delay: idx * 0.1 },
                  y: { duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] },
                }}
                className={`relative rounded-3xl overflow-hidden border cursor-pointer transition-[border-color,box-shadow,background-color] duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'lg:flex-[2.8] border-sky-400 shadow-[0_15px_45px_rgba(0,102,255,0.4)] bg-[#06123b] min-h-[380px] sm:min-h-[440px] lg:min-h-[500px]'
                    : 'lg:flex-1 border-white/10 hover:border-sky-400/50 bg-[#06123b]/60 min-h-[120px] sm:min-h-[140px] lg:min-h-[500px]'
                } p-6 sm:p-8 group`}
              >
                {/* 100% High Visibility Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className={`w-full h-full object-cover object-center transition-all duration-700 ${
                      isSelected
                        ? 'opacity-95 scale-105'
                        : 'opacity-55 group-hover:opacity-75 group-hover:scale-105'
                    }`}
                  />
                  {/* Subtle Clean Bottom Gradient for Text Legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#030a21] via-[#030a21]/80 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#030a21]/80 via-[#030a21]/30 to-transparent pointer-events-none" />
                </div>

                {/* Top Card Header: Minimal & Clean */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono-tech font-black text-xs transition-colors duration-300 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_#0066ff]'
                      : 'bg-[#030a21]/80 text-sky-300 border border-white/10'
                  }`}>
                    {pillar.number}
                  </div>

                  {isSelected && (
                    <span className="px-3 py-1 rounded-full bg-blue-900/90 border border-sky-400/40 text-[10px] font-mono-tech text-sky-200 font-bold uppercase tracking-wider shadow">
                      SLIDE {pillar.number} OF 04
                    </span>
                  )}
                </div>

                {/* Bottom Card Content: Clean, Uncluttered & Modern */}
                <div className="relative z-10 mt-auto pt-4">
                  {/* Collapsed State Title */}
                  {!isSelected ? (
                    <div className="transition-all">
                      <span className="font-mono-tech text-[10px] uppercase tracking-widest text-sky-300 font-bold block mb-1">
                        {pillar.subtitle}
                      </span>
                      <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase">
                        {pillar.title}
                      </h3>
                    </div>
                  ) : (
                    /* Expanded State: Simple, Spacious View */
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <span className="font-mono-tech text-[10px] sm:text-[11px] text-sky-300 uppercase tracking-wider font-bold block mb-1">
                          {pillar.subtitle}
                        </span>
                        <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white uppercase tracking-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-white/85 text-xs sm:text-sm mt-2 leading-relaxed max-w-lg">
                          {pillar.desc}
                        </p>
                      </div>

                      {/* Action CTA Button */}
                      <div className="pt-1">
                        <Magnetic strength={0.2}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenBooking(pillar.title);
                            }}
                            className="px-6 py-3 rounded-full bg-white text-blue-950 hover:bg-sky-50 font-mono-tech text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.35)] cursor-pointer"
                          >
                            <span>SPEC THIS RIG</span>
                            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                          </button>
                        </Magnetic>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
