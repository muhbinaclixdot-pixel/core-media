// src/components/ScrollStory.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { SCROLL_STORY_STEPS } from '../data/content';
import Magnetic from './Magnetic';
import TiltCard from './TiltCard';

export default function ScrollStory({ onOpenBooking }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = SCROLL_STORY_STEPS[activeStepIndex];

  return (
    <section id="story" className="relative py-28 bg-[#030a21] overflow-hidden">
      {/* Background Stage Lights */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/35 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
              SECTION 05 // THE VENUE TRANSFORMATION
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
              FROM SILENCE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                TO SPECTACLE.
              </span>
            </h2>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.3}>
              <button
                onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : SCROLL_STORY_STEPS.length - 1))}
                data-cursor="spec"
                className="p-3.5 rounded-full bg-[#06123b] border border-sky-400/30 text-white hover:bg-white hover:text-blue-950 transition-all shadow-md cursor-pointer"
                aria-label="Previous Transformation Step"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </Magnetic>
            <span className="font-mono-tech text-xs text-sky-300 font-bold tracking-widest px-2">
              0{activeStepIndex + 1} / 0{SCROLL_STORY_STEPS.length}
            </span>
            <Magnetic strength={0.3}>
              <button
                onClick={() => setActiveStepIndex((prev) => (prev < SCROLL_STORY_STEPS.length - 1 ? prev + 1 : 0))}
                data-cursor="spec"
                className="p-3.5 rounded-full bg-[#06123b] border border-sky-400/30 text-white hover:bg-white hover:text-blue-950 transition-all shadow-md cursor-pointer"
                aria-label="Next Transformation Step"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* 5 Step Indicator Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
          {SCROLL_STORY_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                data-cursor="spec"
                className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border-sky-400 shadow-[0_0_20px_rgba(0,102,255,0.4)]'
                    : 'bg-[#06123b]/60 border-white/5 text-white/70 hover:text-white hover:bg-[#06123b]'
                }`}
              >
                <div className="font-mono-tech text-[10px] uppercase font-bold tracking-widest mb-1 text-sky-300">
                  STAGE {step.step}
                </div>
                <div className="font-display font-bold text-xs uppercase truncate text-white">
                  {step.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Layered Cinematic Visual Showcase with 3D Tilt */}
        <TiltCard maxTilt={5} glare={true} className="rounded-3xl">
          <div className="relative rounded-3xl overflow-hidden border border-sky-400/30 bg-[#06123b] min-h-[480px] sm:min-h-[540px] flex flex-col justify-end p-6 sm:p-12 shadow-2xl">
            
            {/* Animated Background Media Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.step}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 z-0"
              >
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030a21] via-[#030a21]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030a21]/90 via-[#030a21]/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Top Tag & Metric Badge */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-[#030a21]/80 border border-sky-400/40 backdrop-blur-md font-mono-tech text-xs font-bold text-sky-300 shadow">
                {currentStep.metric}
              </span>

              <span className="px-3.5 py-1.5 rounded-full bg-[#030a21]/80 border border-white/10 backdrop-blur-md font-mono-tech text-xs text-white/80 hidden sm:inline-block">
                PHASE 0{activeStepIndex + 1} OF 05
              </span>
            </div>

            {/* Bottom Story Content */}
            <div className="relative z-10 max-w-2xl">
              <div className="font-mono-tech text-xs uppercase tracking-widest text-sky-300 font-bold mb-2">
                // TRANSFORMATION PROCESS // {currentStep.tag}
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase mb-2 leading-tight">
                {currentStep.title}
              </h3>

              <p className="text-sky-200 text-sm sm:text-base font-medium mb-3">
                {currentStep.subtitle}
              </p>

              <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-6">
                {currentStep.description}
              </p>

              <Magnetic strength={0.3}>
                <button
                  onClick={onOpenBooking}
                  data-cursor="book"
                  className="px-6 py-3 rounded-full bg-white text-blue-950 hover:bg-sky-50 font-mono-tech text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <span>PLAN THIS PRODUCTION</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </button>
              </Magnetic>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
