import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2, Tv, Sparkles, Layers, Radio, Compass,
  Building2, Music, PartyPopper, Flame, ArrowRight,
  CheckCircle2, ChevronRight
} from 'lucide-react';
import { SERVICES, BRAND } from '../data/content';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';

const iconMap = {
  Volume2,
  Tv,
  Sparkles,
  Layers,
  Radio,
  Compass,
  Building2,
  Music,
  PartyPopper,
  Flame,
};

export default function Services({ onSelectService, onOpenBooking }) {
  const [activeServiceId, setActiveServiceId] = useState("01");
  const [viewMode, setViewMode] = useState("interactive");
  const serviceRefs = useRef({});

  // Auto-activate service as user scrolls down the page past each item
  useEffect(() => {
    if (viewMode !== 'interactive') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-service-id');
            if (id) {
              setActiveServiceId(id);
              const found = SERVICES.find((s) => s.id === id);
              if (found && onSelectService) onSelectService(found);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.15,
      }
    );

    Object.values(serviceRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewMode, onSelectService]);

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];
  const ActiveIcon = iconMap[activeService.icon] || Sparkles;

  return (
    <section id="services" className="relative py-28 bg-[#030a21]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/35 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
              SECTION 02 // PRODUCTION CAPABILITIES
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              ENGINEERED<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                FOR IMPACT.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* View Mode Switcher */}
            <div className="bg-[#06123b] p-1 rounded-full border border-sky-400/30 flex items-center justify-center shadow-lg w-full sm:w-auto">
              <button
                onClick={() => setViewMode('interactive')}
                data-cursor="spec"
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 rounded-full font-mono-tech text-[10px] sm:text-xs uppercase font-bold transition-all text-center ${
                  viewMode === 'interactive'
                    ? 'bg-white text-blue-950 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                CONTROL CONSOLE
              </button>
              <button
                onClick={() => setViewMode('grid')}
                data-cursor="spec"
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 rounded-full font-mono-tech text-[10px] sm:text-xs uppercase font-bold transition-all text-center ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-950 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                FULL GRID (10)
              </button>
            </div>
          </div>
        </div>

        {/* MODE A: Interactive Control Panel Showcase */}
        {viewMode === 'interactive' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Service Channels (Natural Full Page Scroll) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              {SERVICES.map((service) => {
                const isCurrent = service.id === activeServiceId;
                const Icon = iconMap[service.icon] || Sparkles;

                return (
                  <div
                    key={service.id}
                    ref={(el) => (serviceRefs.current[service.id] = el)}
                    data-service-id={service.id}
                    onMouseEnter={() => {
                      setActiveServiceId(service.id);
                      if (onSelectService) onSelectService(service);
                    }}
                    onClick={() => {
                      setActiveServiceId(service.id);
                      if (onSelectService) onSelectService(service);
                    }}
                    data-cursor="spec"
                    className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#081b54] to-[#0d2a84] border-sky-400 shadow-[0_10px_35px_rgba(0,102,255,0.4)]'
                        : 'bg-[#06123b]/70 border-white/10 hover:border-sky-400/40 hover:bg-[#06123b]'
                    }`}
                  >
                    {/* Blue Sweep Line on Active */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                        isCurrent ? 'bg-white shadow-[0_0_15px_#ffffff]' : 'bg-transparent group-hover:bg-sky-400/60'
                      }`}
                    />

                    <div className="flex items-center justify-between gap-4">
                      {/* Number & Title */}
                      <div className="flex items-center gap-4">
                        <span
                          className={`font-mono-tech text-base sm:text-lg font-black transition-colors ${
                            isCurrent ? 'text-sky-300' : 'text-white/70 group-hover:text-white'
                          }`}
                        >
                          {service.id}
                        </span>

                        <div className="w-[1px] h-6 bg-white/15" />

                        <div className="flex flex-col">
                          <h3
                            className={`font-display font-black text-base sm:text-lg uppercase transition-transform duration-300 ${
                              isCurrent
                                ? 'text-white translate-x-1'
                                : 'text-white/90 group-hover:text-white group-hover:translate-x-1'
                            }`}
                          >
                            {service.title}
                          </h3>
                          <span className="text-[11px] font-mono-tech text-sky-200/90 uppercase tracking-wider font-semibold">
                            {service.category}
                          </span>
                        </div>
                      </div>

                      {/* Right Indicator */}
                      <div className="flex items-center gap-3">

                        <div
                          className={`p-2 rounded-xl transition-all ${
                            isCurrent
                              ? 'bg-white text-blue-900 shadow-md'
                              : 'bg-white/10 text-white group-hover:bg-white/20'
                          }`}
                        >
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isCurrent ? 'translate-x-0.5 text-blue-900' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Dynamic Active Preview Console with 3D Tilt (Pinned Sticky on scroll) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start z-20">
              <TiltCard maxTilt={8} glare={true} className="rounded-3xl">
                <div className="relative rounded-3xl overflow-hidden border border-sky-400/40 bg-[#06123b] shadow-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[520px]">
                  
                  {/* Background Dynamic Visual Asset */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 z-0"
                    >
                      <img
                        src={activeService.image}
                        alt={activeService.title}
                        className="w-full h-full object-cover opacity-35"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06123b] via-[#06123b]/85 to-[#06123b]/60" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Console Top Header */}
                  <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/15 gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/50 shrink-0">
                        <ActiveIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono-tech text-sky-300 font-bold uppercase tracking-widest truncate block">
                          CHANNEL {activeService.id} // ACTIVE
                        </span>
                        <h4 className="text-sm font-display font-bold text-white uppercase truncate">
                          {activeService.category}
                        </h4>
                      </div>
                    </div>

                    <span className="shrink-0 whitespace-nowrap inline-flex items-center justify-center text-center px-3.5 py-1 rounded-full bg-blue-900/90 border border-sky-400/40 text-[10px] font-mono-tech text-white font-bold uppercase tracking-wider shadow leading-none">
                      {activeService.badge}
                    </span>
                  </div>

                  {/* Console Middle Description */}
                  <div className="relative z-10 my-6">
                    <h3 className="text-2xl font-display font-black text-white uppercase mb-3 leading-snug">
                      {activeService.title}
                    </h3>

                    <p className="text-white/90 text-sm leading-relaxed mb-6">
                      {activeService.fullDesc}
                    </p>

                    {/* Specifications Checklist */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[10px] font-mono-tech uppercase tracking-widest text-sky-300 font-black">
                        ENGINEERING SPECIFICATIONS:
                      </span>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {activeService.specs.map((spec, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-white/95 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Console Bottom Action Bar with Magnetic Button */}
                  <div className="relative z-10 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center gap-3">
                    <Magnetic strength={0.2} className="w-full sm:flex-1">
                      <button
                        onClick={() => {
                          if (onOpenBooking) onOpenBooking(activeService.title);
                        }}
                        data-cursor="book"
                        className="w-full py-3.5 px-5 rounded-xl bg-white text-blue-950 font-mono-tech text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] hover:bg-sky-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>BOOK THIS SERVICE</span>
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                      </button>
                    </Magnetic>

                    <Magnetic strength={0.2} className="w-full sm:w-auto">
                      <a
                        href={`tel:${BRAND.phonePrimaryRaw}`}
                        data-cursor="spec"
                        className="w-full sm:w-auto block py-3.5 px-4 rounded-xl bg-[#030a21]/90 border border-sky-400/40 hover:border-white text-white font-mono-tech text-xs uppercase font-bold text-center transition-colors shadow-md cursor-pointer"
                      >
                        CALL TECH TEAM
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        ) : (
          /* MODE B: 10 Cards Grid View with TiltCard */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <TiltCard key={service.id} maxTilt={10} glare={true} className="rounded-3xl h-full">
                  <div
                    data-cursor="card"
                    className="rounded-3xl border border-sky-400/30 bg-[#06123b] overflow-hidden flex flex-col justify-between group hover:border-white transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,102,255,0.35)] h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06123b] via-[#06123b]/40 to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-white text-blue-950 font-mono-tech text-xs font-black shadow">
                          {service.id}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[10px] font-mono-tech uppercase text-sky-300 font-bold tracking-wider">
                          {service.category}
                        </span>
                        <h3 className="text-lg font-display font-black text-white uppercase">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1">
                      <p className="text-white/85 text-xs leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>

                      <div className="space-y-1.5 mb-6">
                        {service.specs.slice(0, 3).map((spec, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-white/90">
                            <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => onOpenBooking && onOpenBooking(service.title)}
                        data-cursor="book"
                        className="w-full py-2.5 rounded-xl bg-white hover:bg-sky-50 text-blue-950 font-mono-tech text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <span>INQUIRE NOW</span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
