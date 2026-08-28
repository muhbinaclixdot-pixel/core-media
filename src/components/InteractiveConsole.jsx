// src/components/InteractiveConsole.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sliders, Volume2, Sparkles, Tv, ArrowRight, Zap
} from 'lucide-react';

export default function InteractiveConsole({ onOpenBooking }) {
  const [activePreset, setActivePreset] = useState('concert');
  const [soundLevel, setSoundLevel] = useState(95);
  const [beamIntensity, setBeamIntensity] = useState(90);
  const [ledResolution, setLedResolution] = useState('P2.6 4K Ultra');

  const presets = [
    {
      id: 'concert',
      name: 'LIVE CONCERT RIG',
      subtitle: 'Touring Line Arrays & Sharp Beams',
      tag: '120 dB SPL • ARENA POWER',
      sound: 95,
      beam: 100,
      led: 'P2.6 4K Ultra',
      description: 'Massive acoustic headroom and razor-sharp moving beams engineered for open stadiums and festivals.',
    },
    {
      id: 'corporate',
      name: 'CORPORATE SUMMIT',
      subtitle: 'Speech Intelligibility & 4K Displays',
      tag: 'CRYSTAL SPEECH • 4K HDR',
      sound: 65,
      beam: 55,
      led: 'P1.9 Micro',
      description: 'Precision column array audio calibrated for zero echo and crystal-clear keynote presentations.',
    },
    {
      id: 'campus',
      name: 'CAMPUS & FESTIVAL',
      subtitle: 'High Impact Bass & Stage FX',
      tag: 'DYNAMIC SFX • HIGH IMPACT',
      sound: 90,
      beam: 95,
      led: 'P2.9 Curved',
      description: 'High-throw subwoofer arrays and dynamic atmospheric lighting designed for energetic live crowds.',
    },
    {
      id: 'broadcast',
      name: 'STUDIO & BROADCAST',
      subtitle: 'Broadcast 4K Feeds & Studio Lighting',
      tag: '60 FPS SDI • ZERO LATENCY',
      sound: 70,
      beam: 60,
      led: 'P2.6 4K Ultra',
      description: 'Multi-camera SDI switching and calibrated high-CRI soft studio illumination with zero latency.',
    },
  ];

  const current = presets.find((p) => p.id === activePreset) || presets[0];

  const handleApplyPreset = (preset) => {
    setActivePreset(preset.id);
    setSoundLevel(preset.sound);
    setBeamIntensity(preset.beam);
    setLedResolution(preset.led);
  };

  return (
    <section id="interactive-console" className="relative py-24 bg-[#02071a] overflow-hidden border-t border-sky-400/20">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/35 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow">
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span>STAGE CONFIGURATOR</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
            CONFIGURE YOUR<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]">
              PRODUCTION SETUP.
            </span>
          </h2>

          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Choose a preset or fine-tune sound pressure, beam intensity, and LED resolution.
          </p>
        </div>

        {/* Preset Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {presets.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/25 border-sky-400 shadow-[0_0_25px_rgba(0,102,255,0.35)]'
                    : 'bg-[#06123b]/60 border-white/10 hover:border-sky-400/40 hover:bg-[#06123b]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono-tech text-[10px] uppercase font-bold text-sky-300">
                    PRESET 0{presets.indexOf(preset) + 1}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-sky-400" />}
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white uppercase">
                  {preset.name}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Clean, Spacious 2-Column Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#06123b]/80 border border-sky-400/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* Left Column: Clean Live Visual Stage Canvas */}
          <div className="lg:col-span-6 relative rounded-2xl bg-[#030a21] border border-sky-400/25 p-8 flex flex-col justify-between min-h-[360px] overflow-hidden">
            {/* Dynamic Stage Beam Visualizer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
              <div
                className="absolute w-[180%] h-44 bg-gradient-to-r from-transparent via-blue-500/25 to-transparent blur-3xl transition-all duration-700"
                style={{
                  opacity: beamIntensity / 100,
                  transform: `rotate(${activePreset === 'concert' ? '-12deg' : '0deg'})`,
                }}
              />
              <div
                className="absolute w-[180%] h-36 bg-gradient-to-r from-transparent via-sky-300/20 to-transparent blur-2xl transition-all duration-700"
                style={{
                  opacity: beamIntensity / 100,
                  transform: `rotate(${activePreset === 'concert' ? '12deg' : '-5deg'})`,
                }}
              />
            </div>

            {/* Top Tag */}
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-[#06123b] border border-sky-400/30 font-mono-tech text-[10px] font-bold text-sky-300 uppercase">
                {current.tag}
              </span>
            </div>

            {/* Center Presentation Title & Description */}
            <div className="relative z-10 my-6">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {current.name}
              </h3>
              <p className="text-white/80 text-xs sm:text-sm mt-3 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Bottom Equalizer Wave Visual */}
            <div className="relative z-10 flex items-center gap-1.5 pt-2">
              {[...Array(16)].map((_, i) => (
                <span
                  key={i}
                  className="flex-1 bg-sky-400/80 rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.min(32, Math.max(6, (soundLevel / 100) * (i % 4 === 0 ? 28 : i % 2 === 0 ? 18 : 10)))}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Clean Sliders & Action Button */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* 1. Acoustic Decibels */}
            <div className="p-4 rounded-2xl bg-[#030a21]/90 border border-sky-400/25">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-white">
                  <Volume2 className="w-4 h-4 text-sky-400" />
                  <span>Acoustic Sound Output</span>
                </label>
                <span className="font-mono-tech text-xs font-bold text-sky-300">
                  {soundLevel} dB SPL
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="130"
                value={soundLevel}
                onChange={(e) => setSoundLevel(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-blue-950 rounded-lg appearance-none"
              />
            </div>

            {/* 2. Stage Beam Intensity */}
            <div className="p-4 rounded-2xl bg-[#030a21]/90 border border-sky-400/25">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-white">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Lighting Beam Intensity</span>
                </label>
                <span className="font-mono-tech text-xs font-bold text-sky-300">
                  {beamIntensity}% Lux
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={beamIntensity}
                onChange={(e) => setBeamIntensity(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-blue-950 rounded-lg appearance-none"
              />
            </div>

            {/* 3. LED Resolution */}
            <div className="p-4 rounded-2xl bg-[#030a21]/90 border border-sky-400/25">
              <label className="flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-white mb-2.5">
                <Tv className="w-4 h-4 text-sky-400" />
                <span>LED Panel Pitch</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['P1.9 Micro', 'P2.6 4K Ultra', 'P2.9 Curved'].map((res) => (
                  <button
                    key={res}
                    onClick={() => setLedResolution(res)}
                    className={`py-2 px-2 rounded-xl font-mono-tech text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      ledResolution.includes(res.split(' ')[0])
                        ? 'bg-white text-blue-950 shadow-md font-black'
                        : 'bg-[#06123b] text-white/70 hover:text-white border border-white/10'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onOpenBooking && onOpenBooking(current.name)}
              className="w-full py-3.5 rounded-full bg-white hover:bg-sky-50 text-blue-950 font-mono-tech text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>SPEC THIS PRODUCTION</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
