// src/components/ProductionSystem.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, Tv, Sparkles, Layers, Radio, Zap,
  Activity, ArrowDown, CheckCircle2, Shield
} from 'lucide-react';
import { SYSTEM_NODES } from '../data/content';

const iconMap = {
  Volume2,
  Tv,
  Sparkles,
  Layers,
  Radio,
  Zap,
};

export default function ProductionSystem({ onOpenBooking }) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const activeNode = SYSTEM_NODES[selectedNodeIndex];
  const ActiveIcon = iconMap[activeNode.icon] || Zap;

  return (
    <section id="system" className="relative py-28 bg-[#020617] overflow-hidden">
      {/* Central Beam Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-sky-400 font-mono-tech text-xs font-semibold uppercase tracking-widest mb-4">
            SECTION 04 // LIVE ARCHITECTURE
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
            THE CORE MEDIA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
              INTEGRATED SYSTEM
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-4">
            How 6 independent technical disciplines unify into one seamless, synchronized live production engine.
          </p>
        </div>

        {/* Central Production Flow: Desktop Pipeline / Mobile Nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Pipeline Nodes List */}
          <div className="lg:col-span-7 flex flex-col gap-3 relative">
            
            {/* Glowing Pipeline Connector Line */}
            <div className="absolute left-[29px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-600 via-sky-400 to-blue-600 hidden sm:block opacity-40" />

            {SYSTEM_NODES.map((node, idx) => {
              const Icon = iconMap[node.icon] || Zap;
              const isSelected = selectedNodeIndex === idx;

              return (
                <div
                  key={node.step}
                  onClick={() => setSelectedNodeIndex(idx)}
                  className={`group relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0a1844] border-sky-400/60 shadow-[0_0_30px_rgba(0,102,255,0.3)] translate-x-1'
                      : 'bg-[#060d24]/60 border-white/5 hover:border-blue-500/30 hover:bg-[#060d24]'
                  }`}
                >
                  {/* Step Icon with Glowing Ring */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center font-mono-tech text-xs font-bold shrink-0 transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-[0_0_15px_#0066ff]'
                        : 'bg-[#030712] border border-blue-500/30 text-sky-400 group-hover:border-sky-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] uppercase tracking-widest text-sky-400 font-bold">
                        NODE {node.step} // {node.title}
                      </span>
                      <span className="text-[10px] font-mono-tech text-slate-400 hidden sm:inline-block">
                        {node.specs}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white uppercase mt-0.5">
                      {node.name}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right / Live Telemetry Visualizer Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-sky-400/30 bg-[#060d24] p-6 sm:p-8 flex flex-col justify-between min-h-[460px] shadow-2xl overflow-hidden">
              
              {/* Subtle Tech Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#0066ff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Card Top */}
              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                  <span className="font-mono-tech text-xs font-bold text-slate-200 tracking-wider uppercase">
                    SYSTEM MATRIX STATUS
                  </span>
                </div>
                <span className="text-xs font-mono-tech text-sky-400 font-bold">
                  STAGE CUE 0{selectedNodeIndex + 1}/06
                </span>
              </div>

              {/* Center Visualization Graphic */}
              <div className="relative z-10 my-8 flex flex-col items-center text-center">
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-400 p-[3px] shadow-[0_0_40px_rgba(0,102,255,0.6)] mb-6">
                  <div className="w-full h-full bg-[#030712] rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                    <ActiveIcon className="w-10 h-10 text-sky-400 animate-pulse" />
                  </div>
                </div>

                <div className="font-mono-tech text-xs uppercase tracking-widest text-sky-400 font-semibold mb-1">
                  DISCIPLINE {activeNode.step}
                </div>
                <h4 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                  {activeNode.name}
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xs mt-2 leading-relaxed">
                  {activeNode.description}
                </p>

                {/* Telemetry specs pill */}
                <div className="mt-4 px-4 py-2 rounded-xl bg-blue-950/60 border border-sky-400/30 text-sky-300 font-mono-tech text-xs font-semibold">
                  {activeNode.specs}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono-tech">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>100% Redundant Power</span>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                >
                  ENGINEER SHOW →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
