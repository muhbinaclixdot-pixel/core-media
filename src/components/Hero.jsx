import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, ArrowRight, Play, Sparkles, Zap, Radio, Volume2, 
  Flame, Sun, Activity, Power, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND } from '../data/content';
import stageHeroImg from '../assets/stage-hero.png';
import Magnetic from './Magnetic';

export default function Hero({ onOpenBooking, onOpenVideo }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  
  // Track scroll position for pinned video, dynamic blur, zoom and content scroll-up
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 950], [1.02, 1.32]);
  const blurValue = useTransform(scrollY, [0, 350, 850], [0, 8, 22]);
  const videoBlur = useTransform(blurValue, (v) => `blur(${v}px)`);
  const overlayOpacity = useTransform(scrollY, [0, 350, 850], [0.15, 0.45, 0.72]);
  const videoLayerOpacity = useTransform(scrollY, [0, 1300, 1900], [1, 1, 0]);
  const beamsOpacity = useTransform(scrollY, [0, 400, 800], [1, 0.5, 0.1]);
  const heroContentOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  const heroContentY = useTransform(scrollY, [0, 480], [0, -75]);

  // Stage Program Startup States
  const [stageActive, setStageActive] = useState(true);
  const [isStrobing, setIsStrobing] = useState(false);
  const [lightPreset, setLightPreset] = useState('beams'); // 'beams', 'lasers', 'strobe', 'cyan'
  const [timecode, setTimecode] = useState('00:01:24:12');

  // Mouse coordinate motion values for smooth 60fps GPU parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax layers
  const videoTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [18, -18]);
  const videoTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  
  const textTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const textTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  // Dynamic Spotlight Beams
  const beamAngleLeft = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 15]);
  const beamAngleRight = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 35]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const el = heroRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => {
      if (el) el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Hero video autoplay blocked or pending interaction:", err);
      });
    }
  }, []);

  // Running SMPTE Timecode
  useEffect(() => {
    let frame = 12;
    let sec = 24;
    let min = 1;
    const interval = setInterval(() => {
      frame += 1;
      if (frame >= 30) {
        frame = 0;
        sec += 1;
        if (sec >= 60) {
          sec = 0;
          min += 1;
        }
      }
      setTimecode(`00:0${min}:${sec < 10 ? '0' + sec : sec}:${frame < 10 ? '0' + frame : frame}`);
    }, 1000 / 30);

    return () => clearInterval(interval);
  }, []);

  // Concert Stage Ignition Function
  const triggerStageIgnition = () => {
    initAudio();
    playSubDrop();
    setTimeout(() => playBeamLaser(), 200);

    // Trigger visual strobe flash
    setIsStrobing(true);
    setTimeout(() => setIsStrobing(false), 500);

    // Fire Stage Confetti & Pyro Sparks
    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#0066FF', '#38BDF8', '#FFFFFF', '#00f0ff'],
      });
    } catch (e) {}

    setStageActive(true);
  };

  // Staggered letters for "CORE" and "MEDIA"
  const coreLetters = ["C", "O", "R", "E"];
  const mediaLetters = ["M", "E", "D", "I", "A"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -60 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 120
      }
    }
  };

  return (
    <>
      {/* 1. Pinned Concert Stage Video Background with Dynamic Scroll Blur */}
      <motion.div
        style={{
          opacity: videoLayerOpacity,
        }}
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{
            x: videoTranslateX,
            y: videoTranslateY,
            scale: videoScale,
            filter: videoBlur,
          }}
          className="w-full h-full relative"
        >
          <video
            ref={videoRef}
            src="/hero-concert-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={stageHeroImg}
            className="w-full h-full object-cover object-center scale-105"
          />
        </motion.div>

        {/* Dynamic Volumetric DMX Moving Spotlights sweeping from stage truss */}
        <motion.div style={{ opacity: beamsOpacity }} className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Spotlight 1 (Left Wing) */}
          <motion.div
            style={{ rotate: beamAngleLeft }}
            className="absolute -top-20 left-[15%] w-[180px] sm:w-[260px] h-[130vh] origin-top bg-gradient-to-b from-sky-400/45 via-blue-500/15 to-transparent blur-[35px] mix-blend-screen pointer-events-none"
          />

          {/* Spotlight 2 (Right Wing) */}
          <motion.div
            style={{ rotate: beamAngleRight }}
            className="absolute -top-20 right-[15%] w-[180px] sm:w-[260px] h-[130vh] origin-top bg-gradient-to-b from-sky-300/40 via-blue-600/15 to-transparent blur-[35px] mix-blend-screen pointer-events-none"
          />

          {/* Spotlight 3 (Center Arena Laser Cone) */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[120vh] origin-top bg-gradient-to-b from-white/30 via-sky-400/10 to-transparent blur-[45px] mix-blend-screen animate-pulse-glow" />
        </motion.div>

        {/* Strobe Lightning Flash when stage fires */}
        <AnimatePresence>
          {isStrobing && (
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: [0.9, 0, 0.8, 0, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none z-30"
            />
          )}
        </AnimatePresence>

        {/* Dynamic Dark Ambient Overlay on scroll */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#030a21] pointer-events-none"
        />

        {/* Soft Contrast Overlays for Text Clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030a21] via-transparent to-[#030a21]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030a21]/70 via-transparent to-[#030a21]/40 pointer-events-none" />
      </motion.div>

      {/* 2. Hero Content Section (Scrolls naturally upwards) */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen w-full flex flex-col justify-between px-4 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-8 sm:pb-10 bg-transparent select-none z-10"
      >
        <motion.div
          style={{
            opacity: heroContentOpacity,
            y: heroContentY,
          }}
          className="w-full flex-1 flex flex-col justify-between"
        >
          {/* Top Spacer */}
          <div className="h-4 sm:h-8" />

          {/* Main Giant Layr-Style Brutalist Typography with Staggered Character Reveal */}
          <motion.div
            style={{ x: textTranslateX, y: textTranslateY }}
            className="relative z-10 flex flex-col justify-center my-auto"
          >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start leading-[0.88] tracking-tighter"
        >
          {/* "CORE." Line */}
          <div className="flex items-baseline font-display font-black text-[13vw] sm:text-[9.5vw] lg:text-[8vw] text-white uppercase select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            <div className="flex items-center">
              {coreLetters.map((letter, idx) => (
                <motion.span
                  key={idx}
                  variants={letterVariants}
                  className="inline-block transition-colors hover:text-sky-300 duration-300"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            {/* Glowing Electric Blue Dot */}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 400 }}
              className="inline-block w-[1.5vw] h-[1.5vw] min-w-[10px] min-h-[10px] bg-[#0066FF] rounded-sm ml-[0.8vw] drop-shadow-[0_0_25px_rgba(0,102,255,1)] animate-pulse"
            />
          </div>

          {/* "MEDIA" Line */}
          <div className="flex font-display font-black text-[13vw] sm:text-[9.5vw] lg:text-[8vw] text-white uppercase select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] -mt-[1.2vw]">
            {mediaLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                variants={letterVariants}
                className="inline-block transition-colors hover:text-sky-300 duration-300"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>



        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto"
        >
          <Magnetic strength={0.3} className="w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto justify-center px-7 py-3.5 rounded-full bg-white text-blue-950 hover:bg-sky-50 font-mono-tech text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_35px_rgba(255,255,255,0.45)] hover:shadow-[0_0_50px_rgba(56,189,248,0.85)] transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>PLAN YOUR PRODUCTION</span>
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </Magnetic>

          {onOpenVideo && (
            <Magnetic strength={0.25} className="w-full sm:w-auto">
              <button
                onClick={onOpenVideo}
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-full bg-[#06123b]/90 hover:bg-[#08184a] text-white border border-sky-400/40 hover:border-sky-300 font-mono-tech text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg backdrop-blur-md group cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-sky-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-2.5 h-2.5 text-sky-300 fill-sky-300" />
                </div>
                <span>WATCH SHOWREEL</span>
              </button>
            </Magnetic>
          )}
        </motion.div>
      </motion.div>

      {/* 4. Bottom Minimal HUD Row with Real-Time Concert Telemetry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 pt-8 border-t border-white/15"
      >
        {/* Left: Magnetic Scroll Indicator */}
        <div className="flex items-center gap-2">
          <Magnetic strength={0.3}>
            <a
              href="#experience"
              className="flex items-center gap-2.5 font-mono-tech text-xs font-black uppercase tracking-widest text-white/90 hover:text-sky-300 transition-colors group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full border border-sky-400/50 flex items-center justify-center group-hover:border-white transition-colors bg-[#06123b]/80 shadow-md">
                <ArrowDown className="w-3.5 h-3.5 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </div>
              <span>EXPLORE RIGS</span>
            </a>
          </Magnetic>
        </div>

        {/* Center: Live Concert SPL & DMX Specs */}
        <div className="text-left sm:text-center">
          <span className="font-mono-tech font-bold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-white/90">
            124 dB CLEAN SPL • 60 FPS DMX • 3840Hz LED
          </span>
        </div>

        {/* Right: Tagline / Powered by Clixdot */}
        <div className="text-left sm:text-right">
          <p className="font-mono-tech text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/80 leading-relaxed max-w-sm sm:ml-auto">
            A PROFESSIONAL EVENT PRODUCTION CREW THAT POWERS UNFORGETTABLE LIVE EXPERIENCES. // POWERED BY{' '}
            <a
              href="https://clixdot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-white underline decoration-sky-400/50 underline-offset-2 transition-colors cursor-pointer"
            >
              CLIXDOT
            </a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  </section>
</>
  );
}
