// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Shield, Award, Users, CheckCircle2,
  Volume2, Tv, Sparkles, ArrowRight, Zap, Phone
} from 'lucide-react';
import { BRAND } from '../data/content';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';

export default function About({ onOpenBooking }) {
  const highlights = [
    {
      icon: Zap,
      title: "Direct In-House Inventory",
      desc: "Complete ownership of tour-grade sound, 4K LED panels, moving head lights, and heavy rigging."
    },
    {
      icon: Shield,
      title: "Certified Safety & Rigging",
      desc: "Trained audio technicians, lighting directors, and ISO/TUV-certified rigging crew on-site."
    },
    {
      icon: MapPin,
      title: `Strategic Hub in ${BRAND.location}`,
      desc: "Centrally located warehouse for rapid AVL deployment across Kerala, South India, and beyond."
    },
    {
      icon: Award,
      title: "100% Redundant Infrastructure",
      desc: "Zero-fail architecture with hot-standby video processors, spare microphones, and backup distro."
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#030a21] overflow-hidden border-t border-sky-400/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066ff08_1px,transparent_1px),linear-gradient(to_bottom,#0066ff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/35 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow">
            <span>ABOUT CORE MEDIA // THE AVL SPECIALISTS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
            ONE TEAM.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]">
              EVERYTHING YOUR EVENT NEEDS.
            </span>
          </h2>

          <p className="text-white/85 text-base sm:text-lg mt-4 leading-relaxed">
            Core Media delivers complete Audio, Visual, Lighting, and Rigging solutions for events of every scale. We combine tour-grade hardware with creative engineering and flawless on-ground execution.
          </p>
        </div>

        {/* Dynamic 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: High-Impact Visual Card with 3D Tilt */}
          <div className="lg:col-span-5 flex flex-col">
            <TiltCard maxTilt={6} glare={true} className="rounded-3xl h-full">
              <div className="relative rounded-3xl overflow-hidden border border-sky-400/30 bg-[#06123b] shadow-2xl p-6 sm:p-8 flex flex-col justify-between h-full min-h-[460px] group">
                
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop"
                    alt="Core Media Live Stage Crew"
                    className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030a21] via-[#030a21]/50 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 flex justify-between items-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#030a21]/90 border border-sky-400/40 text-sky-300 font-mono-tech text-[10px] font-bold uppercase backdrop-blur-md">
                    ESTABLISHED IN KERALA
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

                {/* Bottom Location Box */}
                <div className="relative z-10 p-4 rounded-2xl bg-[#030a21]/90 border border-sky-400/30 backdrop-blur-xl">
                  <div className="flex items-center gap-2 font-mono-tech text-xs text-sky-300 font-bold uppercase tracking-wider mb-1">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    <span>HEADQUARTERS // {BRAND.location}</span>
                  </div>
                  <p className="text-white/85 text-xs leading-relaxed">
                    Full-service AVL production warehouse and certified technical crew ready for mobilization across South India.
                  </p>
                </div>

              </div>
            </TiltCard>
          </div>

          {/* Right: 4 Sleek Capability Pillars Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#06123b]/70 border border-sky-400/20 hover:border-sky-400/60 hover:bg-[#06123b] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 mb-4 shadow">
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="font-display font-bold text-lg text-white uppercase mb-2">
                        {item.title}
                      </h3>

                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic strength={0.25}>
                <button
                  onClick={onOpenBooking}
                  className="px-7 py-3.5 rounded-full bg-white text-blue-950 hover:bg-sky-50 font-mono-tech text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>WORK WITH CORE MEDIA</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href={`tel:${BRAND.phonePrimaryRaw}`}
                  className="px-6 py-3.5 rounded-full bg-[#06123b]/90 border border-sky-400/30 hover:border-white text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>CALL: {BRAND.phonePrimary}</span>
                </a>
              </Magnetic>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
