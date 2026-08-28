// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import CoreLogo from './CoreLogo';
import { BRAND } from '../data/content';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'experience', 'services', 'showcase', 'about', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero', id: 'hero' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'EVENTS', href: '#showcase', id: 'showcase' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#030a21]/95 backdrop-blur-xl border-b border-sky-400/20 shadow-[0_10px_35px_rgba(0,102,255,0.25)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* 1. Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <a
              href="#hero"
              onClick={(e) => handleScrollTo(e, '#hero')}
              className="flex items-center cursor-pointer focus:outline-none"
            >
              <CoreLogo size="normal" showText={false} />
            </a>
          </div>

          {/* 2. Center: Desktop Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#06123b]/90 px-3 py-1.5 rounded-full border border-sky-400/30 backdrop-blur-md shadow-lg shadow-blue-950/50">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-mono-tech font-bold tracking-wider transition-all duration-300 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'text-white'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 rounded-full -z-10 shadow-[0_0_20px_rgba(0,102,255,0.7)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* 3. Right: Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Call Button (Desktop XL) */}
            <a
              href={`tel:${BRAND.phonePrimaryRaw}`}
              className="hidden xl:flex items-center gap-2 h-10 px-4 rounded-full border border-sky-400/40 bg-[#06123b]/80 text-white font-mono-tech text-xs font-bold hover:bg-blue-600 hover:border-white transition-all shadow-md shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{BRAND.phonePrimary}</span>
            </a>

            {/* Primary CTA: BOOK AN EVENT */}
            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden h-10 px-5 rounded-full bg-white text-blue-950 font-mono-tech text-xs font-black tracking-wider uppercase shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] hover:bg-sky-50 transition-all duration-300 transform hover:scale-105 active:scale-95 hidden sm:flex items-center gap-2 shrink-0"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-blue-600/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-blue-950 font-black">BOOK AN EVENT</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#06123b] border border-sky-400/40 text-white focus:outline-none lg:hidden flex items-center justify-center h-10 w-10 shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#030a21]/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 lg:hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-3 relative z-10">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.3em] text-sky-400 mb-2 font-bold">
                // NAVIGATION
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`text-2xl font-display font-black py-2 border-b border-blue-500/20 flex items-center justify-between group ${
                    activeSection === link.id ? 'text-sky-300' : 'text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 text-sky-400 transition-all" />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 relative z-10 pt-6 border-t border-blue-500/25">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 rounded-xl bg-white text-blue-900 font-mono-tech font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>BOOK AN EVENT NOW</span>
              </button>

              <div className="flex items-center justify-between text-xs font-mono-tech text-white">
                <a href={`tel:${BRAND.phonePrimaryRaw}`} className="flex items-center gap-1.5 text-white font-bold">
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>{BRAND.phonePrimary}</span>
                </a>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-white font-bold"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  <span>{BRAND.instagram}</span>
                </a>
              </div>

              <div className="text-[10px] font-mono-tech text-center text-sky-300/80 uppercase tracking-widest font-bold">
                CORE MEDIA • KIDANGAYAM
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
