'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import SmoothScroll from '@/components/SmoothScroll';
import CyberCursor from '@/components/CyberCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';

function ContactContent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bespoke Culinary Event');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIP CONCIERGE & CULINARY LIAISON</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Connect With <span className="text-amber-400">Savoria</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base font-light">
          For private gastronomy inquiries, executive dining experiences, and direct delivery support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-white uppercase font-mono tracking-wider">
              Sanctuary Concierge
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 block font-mono text-[10px]">ADDRESS</span>
                  <p className="text-white font-medium">88 Grand Boulevard, Avenue 4, Metropolitan District</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 block font-mono text-[10px]">VIP HOTLINE</span>
                  <p className="text-white font-mono font-medium">+1 (800) SAVORIA</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 block font-mono text-[10px]">DIRECT LIAISON</span>
                  <p className="text-white font-mono font-medium">concierge@savoria-dining.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-amber-400 uppercase tracking-widest block">
              Hours of Service
            </span>
            <div className="flex justify-between text-gray-300 border-b border-gray-800 pb-2">
              <span>Haute Dining</span>
              <span>12:00 PM – 11:30 PM</span>
            </div>
            <div className="flex justify-between text-cyan-400">
              <span>Cyber Dispatch</span>
              <span>11:30 AM – 12:00 AM</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Message Form */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 border border-white/10">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Transmitted</h3>
              <p className="text-gray-400 text-xs max-w-sm mx-auto">
                Thank you, {name}. Our Head Concierge will review your dispatch and respond promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-gray-800 text-white text-xs font-mono hover:bg-gray-700 transition-colors"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">Transmit Concierge Inquiry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Hayes"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#090d16] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#090d16] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Inquiry Classification</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#090d16] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                >
                  <option value="Bespoke Culinary Event">Bespoke Culinary Event</option>
                  <option value="Executive Tasting Session">Executive Tasting Session</option>
                  <option value="Cyber Delivery Telemetry Support">Cyber Delivery Telemetry Support</option>
                  <option value="Media & Press Inquiry">Media & Press Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Detailed Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details regarding your request or schedule..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#090d16] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit To Concierge Desk</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <CartProvider>
      <SmoothScroll />
      <CyberCursor />
      <div className="min-h-screen bg-[#05070d] text-gray-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <main className="flex-1 pt-6">
          <ContactContent />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
