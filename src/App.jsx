// src/App.jsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Services from './components/Services';
import EventShowcase from './components/EventShowcase';
import EventTypes from './components/EventTypes';
import About from './components/About';
import Gallery from './components/Gallery';
import WhyCoreMedia from './components/WhyCoreMedia';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  // Lenis 60fps Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleOpenBooking = (serviceName = '') => {
    setSelectedServiceForBooking(serviceName);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030a21] text-slate-100 selection:bg-blue-600 selection:text-white relative">

      {/* Top 60fps Electric Blue Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-white origin-left z-[9990] shadow-[0_0_12px_#38bdf8]"
        style={{ scaleX }}
      />

      {/* Cinematic Brand Preloader Sequence */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* Floating Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Single-Page Production Experience */}
      <main className="w-full">
        {/* Fullscreen Hero */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenVideo={() => {
            const galleryEl = document.getElementById('gallery');
            if (galleryEl) galleryEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 01: The Experience (Interactive Acoustic / Lighting / LED / Rigging Simulator) */}
        <Experience onOpenBooking={(pillar) => handleOpenBooking(pillar)} />

        {/* Section 02: Services Showcase Control Console */}
        <Services
          onSelectService={() => {}}
          onOpenBooking={(serviceTitle) => handleOpenBooking(serviceTitle)}
        />

        {/* Section 03: Interactive Event Showcase Slider */}
        <EventShowcase onOpenBooking={(projectTitle) => handleOpenBooking(projectTitle)} />

        {/* Section 07: Event Types */}
        <EventTypes onOpenBooking={(eventTitle) => handleOpenBooking(eventTitle)} />

        {/* Section 08: About Core Media */}
        <About onOpenBooking={() => handleOpenBooking()} />

        {/* Section 09: Visual Gallery with Lightbox */}
        <Gallery />

        {/* Section 11: Why Core Media 3D Tilt Blocks */}
        <WhyCoreMedia onOpenBooking={(pillar) => handleOpenBooking(pillar)} />

        {/* Section 13: Contact & Booking Form */}
        <Contact prefilledService={selectedServiceForBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Quick Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultService={selectedServiceForBooking}
      />
    </div>
  );
}
