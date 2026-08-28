// src/components/Footer.jsx
import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { InstagramIcon } from './Icons';
import CoreLogo from './CoreLogo';
import { BRAND } from '../data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'SERVICES', href: '#services' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'EVENTS', href: '#showcase' },
    { label: 'THE SYSTEM', href: '#system' },
    { label: 'TRANSFORMATION', href: '#story' },
    { label: 'ABOUT', href: '#about' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#02071a] border-t border-sky-400/25 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <CoreLogo size="normal" showTagline={true} />

            <p className="text-white/85 text-xs sm:text-sm max-w-sm mt-4 leading-relaxed">
              Complete professional Audio, Visual & Lighting production company based in {BRAND.location}. Powering live concerts, corporate summits, campus fests, and arena experiences across South India.
            </p>

            {/* Location Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06123b] border border-sky-400/40 text-xs font-mono-tech text-white font-bold shadow-md">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>HEADQUARTERS: {BRAND.location}, KERALA</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-4">
            <h4 className="font-mono-tech text-xs uppercase tracking-widest text-white font-black mb-4">
              QUICK NAVIGATION
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech text-white/80">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-sky-300 transition-colors py-1 flex items-center gap-1 group font-medium"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-sky-400 transition-opacity">→</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Contacts */}
          <div className="lg:col-span-3">
            <h4 className="font-mono-tech text-xs uppercase tracking-widest text-white font-black mb-4">
              OFFICIAL CONTACT
            </h4>
            <div className="space-y-3 text-xs font-mono-tech text-white">
              <div>
                <span className="text-sky-300 block text-[10px] uppercase font-bold">Primary Hotline</span>
                <a href={`tel:${BRAND.phonePrimaryRaw}`} className="text-white hover:text-sky-300 font-black transition-colors text-sm">
                  {BRAND.phonePrimary}
                </a>
              </div>

              <div>
                <span className="text-sky-300 block text-[10px] uppercase font-bold">Secondary Hotline</span>
                <a href={`tel:${BRAND.phoneSecondaryRaw}`} className="text-white hover:text-sky-300 font-bold transition-colors">
                  {BRAND.phoneSecondary}
                </a>
              </div>

              <div>
                <span className="text-sky-300 block text-[10px] uppercase font-bold">Instagram</span>
                <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="text-white hover:text-sky-300 hover:underline flex items-center gap-1.5 mt-0.5 font-bold">
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  <span>{BRAND.instagram}</span>
                </a>
              </div>

              <div>
                <span className="text-sky-300 block text-[10px] uppercase font-bold">Official Web Portal</span>
                <a href={`http://${BRAND.website}`} className="text-white hover:text-sky-300 font-bold">
                  {BRAND.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-white/80">
          <div className="flex flex-wrap items-center gap-1.5">
            <span>© {new Date().getFullYear()} {BRAND.name}. ALL RIGHTS RESERVED.</span>
            <span>//</span>
            <span>
              POWERED BY{' '}
              <a
                href="https://clixdot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 hover:text-white underline decoration-sky-400/50 underline-offset-2 font-bold transition-colors cursor-pointer"
              >
                CLIXDOT
              </a>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-white font-bold">
              AUDIO <span className="text-sky-400">•</span> VISUAL <span className="text-sky-400">•</span> LIGHTING
            </span>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#06123b] border border-sky-400/40 hover:border-white text-white hover:bg-white hover:text-blue-950 transition-all shadow"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
