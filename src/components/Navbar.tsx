'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Compass, UtensilsCrossed, Calendar, Search, Sparkles, Menu, X, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AmbientSoundPlayer from './AmbientSoundPlayer';

export default function Navbar() {
  const { cartCount, setIsCartOpen, playBeep } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const router = useRouter();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingIdInput.trim()) return;
    playBeep('click');
    setTrackModalOpen(false);
    router.push(`/track/${trackingIdInput.trim()}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => playBeep('click')}
              className="flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-600/10 to-amber-950/30 p-1 shadow-lg shadow-amber-500/15 group-hover:shadow-amber-500/35 border border-amber-500/30 transition-all duration-300 flex items-center justify-center bg-[#090d16]/90 backdrop-blur-md">
                <img
                  src="/logo.png"
                  alt="Savoria Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent group-hover:brightness-110 transition-all">
                  SAVORIA
                </span>
                <span className="text-[9px] tracking-[0.25em] text-cyan-400 uppercase font-mono">
                  Cyber • Fine Dining
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link
                href="/menu"
                onClick={() => playBeep('click')}
                className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-500/70" />
                Menu Collection
              </Link>
              <Link
                href="/reservation"
                onClick={() => playBeep('click')}
                className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-amber-500/70" />
                Reservation
              </Link>
              <Link
                href="/about"
                onClick={() => playBeep('click')}
                className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500/70" />
                Our Story
              </Link>
              <Link
                href="/contact"
                onClick={() => playBeep('click')}
                className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-400/70" />
                Concierge & Contact
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <AmbientSoundPlayer />

              {/* Quick Tracker Button */}
              <button
                onClick={() => {
                  playBeep('click');
                  setTrackModalOpen(true);
                }}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-mono text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 rounded-lg transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Track Order
              </button>

              {/* Cart Button */}
              <button
                onClick={() => {
                  playBeep('click');
                  setIsCartOpen(true);
                }}
                className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-700/20 hover:from-amber-500/30 hover:to-amber-700/30 border border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/10 transition-all duration-300 group"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center animate-bounce shadow-md shadow-amber-500/50">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-dropdown border-b border-gray-800 px-4 pt-3 pb-6 space-y-4">
            <Link
              href="/menu"
              onClick={() => {
                setMobileMenuOpen(false);
                playBeep('click');
              }}
              className="block text-gray-200 hover:text-amber-400 font-medium py-2"
            >
              🍽️ Full Menu Collection
            </Link>
            <Link
              href="/reservation"
              onClick={() => {
                setMobileMenuOpen(false);
                playBeep('click');
              }}
              className="block text-gray-200 hover:text-amber-400 font-medium py-2"
            >
              📅 Table Reservation
            </Link>
            <Link
              href="/about"
              onClick={() => {
                setMobileMenuOpen(false);
                playBeep('click');
              }}
              className="block text-gray-200 hover:text-amber-400 font-medium py-2"
            >
              ✨ Our Story & Heritage
            </Link>
            <Link
              href="/contact"
              onClick={() => {
                setMobileMenuOpen(false);
                playBeep('click');
              }}
              className="block text-gray-200 hover:text-cyan-400 font-medium py-2"
            >
              🛎️ Concierge & Contact
            </Link>
          </div>
        )}
      </header>

      {/* Track Order Quick Modal */}
      {trackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel-glow rounded-2xl p-6 relative border border-cyan-500/30">
            <button
              onClick={() => setTrackModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Savoria Cyber GPS
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Track Live Order</h3>
            <p className="text-gray-400 text-xs mb-5">
              Enter your Savoria Order ID (e.g., <span className="text-amber-300 font-mono">SAV-89241</span>) to monitor real-time kitchen crafting & rider GPS.
            </p>
            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="SAV-XXXXX"
                  value={trackingIdInput}
                  onChange={(e) => setTrackingIdInput(e.target.value.toUpperCase())}
                  className="w-full bg-[#090d16] border border-gray-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-white font-mono placeholder-gray-500 outline-none text-sm tracking-wider"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTrackingIdInput('SAV-89241')}
                  className="text-[11px] font-mono text-gray-400 hover:text-amber-300 underline"
                >
                  Use sample ID (SAV-89241)
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-cyan-600/30"
              >
                Launch Satellite Tracker →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
