// src/components/CtaSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { BRAND } from '../data/content';
import Magnetic from './Magnetic';

export default function CtaSection({ onOpenBooking }) {
  return (
    <section id="cta-banner" className="relative py-28 bg-[#02071a] overflow-hidden">
      {/* Dramatic Blue & White Light Rays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-blue-600/35 via-sky-400/25 to-transparent blur-[160px] animate-pulse-glow" />
        <div className="absolute w-[120%] h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent rotate-[-12deg] blur-[1px]" />
        <div className="absolute w-[120%] h-[2px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent rotate-[12deg] blur-[1px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06123b] border border-sky-400/50 text-white font-mono-tech text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,102,255,0.4)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>LET'S BUILD THE EXPERIENCE TOGETHER</span>
        </motion.div>

        {/* Big Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[1.05] mb-6"
        >
          READY TO MAKE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_45px_rgba(0,102,255,0.9)]">
            YOUR EVENT UNFORGETTABLE?
          </span>
        </motion.h2>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/90 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Tell us about your date, venue, and vision. We will deliver an end-to-end technical production blueprint within 24 hours.
        </motion.p>

        {/* Buttons Row with Magnetic Hover */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary Crisp White CTA */}
          <Magnetic strength={0.3} className="w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              data-cursor="book"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-blue-950 font-mono-tech text-sm font-black tracking-wider uppercase shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:shadow-[0_0_55px_rgba(56,189,248,0.9)] hover:bg-sky-50 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-blue-600/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span>PLAN YOUR EVENT</span>
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </Magnetic>

          {/* Secondary CTA: Call Core Media */}
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <a
              href={`tel:${BRAND.phonePrimaryRaw}`}
              data-cursor="spec"
              className="w-full sm:w-auto block px-7 py-4 rounded-full bg-[#06123b] hover:bg-blue-600 text-white font-mono-tech text-sm font-bold tracking-wider uppercase border border-sky-400/60 hover:border-white backdrop-blur-md transition-all duration-300 text-center shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>CALL CORE MEDIA</span>
              </div>
            </a>
          </Magnetic>

          {/* WhatsApp Direct Chat */}
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="spec"
              className="w-full sm:w-auto block px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono-tech text-sm font-bold tracking-wider uppercase border border-white/20 transition-all text-center shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WHATSAPP CHAT</span>
              </div>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
