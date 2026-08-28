// src/components/BookingModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Phone, CheckCircle, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND } from '../data/content';

export default function BookingModal({ isOpen, onClose, defaultService = "" }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService || 'Concerts & Live Music');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (defaultService) setService(defaultService);
  }, [defaultService]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#0066FF', '#38BDF8', '#FFFFFF'],
        });
      } catch (err) {}
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-[92vw] sm:w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[#060d24] border border-sky-400/40 p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,102,255,0.4)] z-10"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase mb-2">
                  EVENT RESERVED!
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-xs">
                  We have received your dates. Our technical supervisor will call you on {phone} right away.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-mono-tech text-xs font-bold uppercase tracking-wider"
                >
                  CLOSE WINDOW
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-sky-400 font-mono-tech text-xs uppercase tracking-widest font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DIRECT EVENT RESERVATION</span>
                </div>

                <h3 className="text-2xl font-display font-black text-white uppercase leading-tight">
                  BOOK CORE MEDIA
                </h3>
                <p className="text-slate-400 text-xs pb-2 border-b border-white/10">
                  Fill in your basic event details to secure your date with our technical crew.
                </p>

                <div>
                  <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-slate-300 mb-1 font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Varma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 focus:border-sky-400 text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-slate-300 mb-1 font-semibold">
                    Phone Number (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 95390 79625"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 focus:border-sky-400 text-white text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-slate-300 mb-1 font-semibold">
                      Service Requirement
                    </label>
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      placeholder="e.g. Sound & LED Wall"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 focus:border-sky-400 text-white text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-slate-300 mb-1 font-semibold">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 focus:border-sky-400 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-slate-300 mb-1 font-semibold">
                    Additional Notes (Venue / Crowd Size)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Location, estimated crowd, timing..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030712] border border-white/10 focus:border-sky-400 text-white text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-mono-tech text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(0,102,255,0.6)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {submitting ? (
                    <span>CONFIRMING DATES...</span>
                  ) : (
                    <>
                      <span>CONFIRM EVENT BOOKING</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
