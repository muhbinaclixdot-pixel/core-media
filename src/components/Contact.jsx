// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Globe,
  Send, CheckCircle, MessageSquare, AlertCircle
} from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import confetti from 'canvas-confetti';
import { BRAND, SERVICES } from '../data/content';

export default function Contact({ prefilledService = "" }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: prefilledService || 'Concerts & Live Music',
    eventDate: '',
    location: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const eventTypesList = [
    'Concerts & Live Music',
    'Corporate Events',
    'College & Festival Events',
    'Product Launches',
    'Outdoor Festivals',
    'Private & VIP Celebrations',
    'Live Streaming Only',
    'LED Wall Rental',
    'Professional Sound Systems',
    'Complete 360° Event Production',
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.phone.trim() || formData.phone.length < 8) newErrors.phone = 'Please enter a valid phone number';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0066FF', '#38BDF8', '#FFFFFF', '#0EA5E9'],
        });
      } catch (err) {}
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#030a21] overflow-hidden border-t border-sky-400/20">
      {/* Background Lighting Elements */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06123b] border border-sky-400/35 text-sky-300 font-mono-tech text-xs font-bold uppercase tracking-widest mb-4 shadow">
            SECTION 13 // GET IN TOUCH
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05]">
            LET'S CREATE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 drop-shadow-[0_0_35px_rgba(56,189,248,0.6)]">
              SOMETHING LOUD.
            </span>
          </h2>

          <p className="text-white/90 text-sm sm:text-base mt-4">
            Direct hotline to our production supervisors. Contact us for custom quotes, technical riders, and equipment availability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info Hub */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Contact Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#06123b] border border-sky-400/40 shadow-2xl flex flex-col justify-between">
              
              <div className="flex items-center gap-2 text-sky-300 font-mono-tech text-xs uppercase tracking-widest font-black mb-6">
                <span>OFFICIAL PRODUCTION DETAILS</span>
              </div>

              <div className="space-y-6">
                {/* Phone Numbers */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-600 border border-white/20 text-white shrink-0 shadow-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-sky-300 font-bold">
                      DIRECT HOTLINES
                    </span>
                    <div className="flex flex-col mt-0.5">
                      <a href={`tel:${BRAND.phonePrimaryRaw}`} className="text-lg sm:text-xl font-display font-black text-white hover:text-sky-300 transition-colors">
                        {BRAND.phonePrimary}
                      </a>
                      <a href={`tel:${BRAND.phoneSecondaryRaw}`} className="text-base font-display font-bold text-sky-100 hover:text-sky-300 transition-colors">
                        {BRAND.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-600 border border-white/20 text-white shrink-0 shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-sky-300 font-bold">
                      BASE LOCATION
                    </span>
                    <h3 className="text-lg font-display font-black text-white uppercase mt-0.5">
                      {BRAND.location}
                    </h3>
                    <p className="text-xs text-sky-100/80">
                      Kerala, India — Serving Statewide & South India
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-600 border border-white/20 text-white shrink-0 shadow-lg">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-sky-300 font-bold">
                      INSTAGRAM
                    </span>
                    <a
                      href={BRAND.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-display font-black text-white hover:text-sky-300 hover:underline block mt-0.5"
                    >
                      {BRAND.instagram}
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-600 border border-white/20 text-white shrink-0 shadow-lg">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-sky-300 font-bold">
                      WEBSITE
                    </span>
                    <a href={`http://${BRAND.website}`} className="text-base font-display font-black text-white hover:text-sky-300 mt-0.5 block">
                      {BRAND.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Action Grid Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${BRAND.phonePrimaryRaw}`}
                className="py-4 px-4 rounded-2xl bg-white text-blue-950 hover:bg-sky-50 font-mono-tech text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>QUICK CALL</span>
              </a>

              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono-tech text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right: Modern Event Booking Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#06123b] border border-sky-400/35 shadow-2xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                      <CheckCircle className="w-10 h-10" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase mb-2">
                      INQUIRY TRANSMITTED!
                    </h3>

                    <p className="text-white/90 text-sm max-w-md mb-8">
                      Thank you for contacting Core Media. Our production supervisor will review your requirements and reach out via call/WhatsApp shortly.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            eventType: 'Concerts & Live Music',
                            eventDate: '',
                            location: '',
                            message: '',
                          });
                        }}
                        className="px-6 py-3 rounded-full bg-white text-blue-950 font-mono-tech text-xs font-black uppercase tracking-wider shadow"
                      >
                        SUBMIT ANOTHER INQUIRY
                      </button>

                      <a
                        href={BRAND.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-full bg-emerald-600 text-white font-mono-tech text-xs font-bold uppercase tracking-wider shadow"
                      >
                        CHAT ON WHATSAPP
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-6">
                      <h3 className="text-xl font-display font-black text-white uppercase">
                        EVENT PRODUCTION INQUIRY
                      </h3>
                      <span className="text-[10px] font-mono-tech text-sky-300 uppercase tracking-widest font-black">
                        FAST 24H RESPONSE
                      </span>
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-tech uppercase tracking-wider text-white mb-1.5 font-bold">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-[#030a21] border border-sky-400/30 focus:border-white text-white placeholder-slate-400 font-sans text-sm focus:outline-none transition-colors"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech uppercase tracking-wider text-white mb-1.5 font-bold">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 95390 79625"
                          className="w-full px-4 py-3 rounded-xl bg-[#030a21] border border-sky-400/30 focus:border-white text-white placeholder-slate-400 font-sans text-sm focus:outline-none transition-colors"
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Email & Event Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-tech uppercase tracking-wider text-white mb-1.5 font-bold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#030a21] border border-sky-400/30 focus:border-white text-white placeholder-slate-400 font-sans text-sm focus:outline-none transition-colors"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech uppercase tracking-wider text-white mb-1.5 font-bold">
                          Event Type / Requirement *
                        </label>
                        <select
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#030a21] border border-sky-400/30 focus:border-white text-white font-sans text-sm focus:outline-none transition-colors"
                        >
                          {eventTypesList.map((type) => (
                            <option key={type} value={type} className="bg-[#030a21] text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-tech uppercase tracking-wider text-white mb-1.5 font-bold">
                          Event Date (Approx)
                        </label>
                        <input
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#030a21] border border-sky-400/30 focus:border-white text-white font-sans text-sm focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech uppercase tracking-wider text-white mb-1.5 font-bold">
                          Venue Location / City
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Kidangayam, Calicut, Kochi"
                          className="w-full px-4 py-3 rounded-xl bg-[#030a21] border border-sky-400/30 focus:border-white text-white placeholder-slate-400 font-sans text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-mono-tech uppercase tracking-wider text-white mb-1.5 font-bold">
                        Technical Requirements / Message
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about expected crowd size, stage dimensions, sound specs, or LED wall requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-[#030a21] border border-sky-400/30 focus:border-white text-white placeholder-slate-400 font-sans text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-white text-blue-950 hover:bg-sky-50 font-mono-tech text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:shadow-[0_0_45px_rgba(56,189,248,0.8)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                          <span>DISPATCHING PRODUCTION INQUIRY...</span>
                        </div>
                      ) : (
                        <>
                          <span>SEND EVENT ENQUIRY</span>
                          <Send className="w-4 h-4 text-blue-600" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
