'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CartProvider, useCart } from '@/context/CartContext';
import SmoothScroll from '@/components/SmoothScroll';
import CyberCursor from '@/components/CyberCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import {
  Calendar,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Compass,
  Wine,
  Flame,
  ArrowRight
} from 'lucide-react';

const SEATING_ZONES = [
  {
    id: 'Skyline VIP Lounge' as const,
    name: 'Skyline VIP Lounge',
    tag: 'METROPOLITAN PANORAMA',
    desc: '40th-floor floor-to-ceiling glass vista overlooking the city lights with private sommelier service.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    capacity: '1 - 6 Guests',
  },
  {
    id: 'Romantic Twilight Corner' as const,
    name: 'Romantic Twilight Corner',
    tag: 'INTIMATE & MOODY',
    desc: 'Secluded corner booth bathed in amber candlelight and soft acoustic jazz for couples.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    capacity: '2 Guests Exclusive',
  },
  {
    id: 'Chef Omakase Counter' as const,
    name: 'Chef Omakase Counter',
    tag: 'THE FIRE SANCTUM',
    desc: 'Front-row view of our 800°C hardwood embers and master knife craft with course-by-course pairings.',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
    capacity: '1 - 4 Guests',
  },
  {
    id: 'Executive Grand Banquet' as const,
    name: 'Executive Grand Banquet',
    tag: 'CELEBRATIONS & BUSINESS',
    desc: 'A dedicated private acoustic-isolated chamber designed for celebrations, families, and board dinners.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    capacity: '4 - 10 Guests',
  },
];

const TIME_SLOTS = [
  { time: '12:30 PM', period: 'Lunch Tasting' },
  { time: '01:15 PM', period: 'Lunch Tasting' },
  { time: '02:00 PM', period: 'Lunch Tasting' },
  { time: '06:00 PM', period: 'Twilight Dinner' },
  { time: '07:15 PM', period: 'Prime Evening' },
  { time: '08:30 PM', period: 'Prime Evening' },
  { time: '09:45 PM', period: 'Late Gastronomy' },
];

function ReservationContent() {
  const { playBeep } = useCart();
  const [selectedZone, setSelectedZone] = useState<typeof SEATING_ZONES[0]['id']>('Skyline VIP Lounge');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('07:15 PM');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !date || !timeSlot) {
      alert('Please fill out all required reservation fields.');
      return;
    }

    try {
      setSubmitting(true);
      playBeep('click');

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          guests,
          date,
          timeSlot,
          seatingZone: selectedZone,
          specialRequest,
        }),
      });

      const json = await res.json();
      if (json.success) {
        playBeep('success');
        setConfirmedReservation(json.data);
      } else {
        alert(json.message || 'Failed to place reservation.');
      }
    } catch (err) {
      console.error('Reservation error', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>HAUTE TABLE ALLOCATION PROTOCOL</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-black text-white tracking-tight leading-tight">
          Reserve Your <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Dining Sanctuary
          </span>
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
          Secure private table allocation at Savoria. Every reservation includes complimentary welcoming botanical mocktails, bespoke tableside service, and curated courses.
        </p>
      </div>

      {confirmedReservation ? (
        /* Confirmation State */
        <div className="max-w-2xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/40 text-center space-y-6 animate-fade-in shadow-2xl shadow-amber-500/10">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mx-auto text-amber-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              RESERVATION ALLOCATED & CONFIRMED
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              We Look Forward To Welcoming You
            </h2>
            <p className="text-xs font-mono text-gray-400">
              Confirmation ID: <strong className="text-amber-300">{confirmedReservation.id}</strong>
            </p>
          </div>

          {/* Details Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left font-mono text-xs">
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Guest Name:</span>
              <span className="text-white font-bold">{confirmedReservation.customerName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Party Size:</span>
              <span className="text-amber-300">{confirmedReservation.guests} Guests</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Date & Time:</span>
              <span className="text-white">{confirmedReservation.date} • {confirmedReservation.timeSlot}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Seating Atmosphere:</span>
              <span className="text-cyan-400 font-bold">{confirmedReservation.seatingZone}</span>
            </div>
            {confirmedReservation.specialRequest && (
              <div className="py-2 border-b border-gray-800 space-y-1">
                <span className="text-gray-400 block">Special Requests:</span>
                <span className="text-gray-300">{confirmedReservation.specialRequest}</span>
              </div>
            )}
            <div className="pt-2 text-[11px] text-gray-400 leading-relaxed font-sans font-light">
              ✨ <strong>Dress Advisory:</strong> Elegant casual to formal. Tables are held for 15 minutes past scheduled allocation.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/menu"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider font-mono transition-all"
            >
              Browse Tasting Menu
            </Link>
            <button
              onClick={() => setConfirmedReservation(null)}
              className="px-6 py-3 rounded-xl glass-panel text-gray-300 hover:text-white border border-gray-800 text-xs font-mono"
            >
              Book Another Table
            </button>
          </div>
        </div>
      ) : (
        /* Reservation Form */
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Step 1: Select Seating Sanctuary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono">
                Select Seating Sanctuary
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {SEATING_ZONES.map((zone) => {
                const isSelected = selectedZone === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => {
                      playBeep('click');
                      setSelectedZone(zone.id);
                    }}
                    className={`glass-panel rounded-2xl p-4 border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/15 scale-[1.02]'
                        : 'border-white/5 hover:border-gray-700'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="relative h-36 rounded-xl overflow-hidden bg-black/60 border border-white/5">
                        <img
                          src={zone.image}
                          alt={zone.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-mono text-amber-300 border border-amber-500/30">
                          {zone.tag}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {zone.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 font-light mt-1 leading-relaxed">
                          {zone.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-800/60 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-gray-500">{zone.capacity}</span>
                      <span className={isSelected ? 'text-amber-400 font-bold' : 'text-gray-600'}>
                        {isSelected ? '✓ Selected' : 'Choose'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Date, Time & Guests Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono">
                Date, Time & Party Size
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 glass-panel p-6 rounded-3xl border border-white/5">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" /> Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#090d16] border border-gray-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white font-mono outline-none"
                  required
                />
              </div>

              {/* Time Slot Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" /> Preferred Seating
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#090d16] border border-gray-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white font-mono outline-none"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.time} value={slot.time}>
                      {slot.time} ({slot.period})
                    </option>
                  ))}
                </select>
              </div>

              {/* Guests Count */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" /> Number of Guests
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 4, 6, 8].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        playBeep('click');
                        setGuests(g);
                      }}
                      className={`flex-1 py-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                        guests === g
                          ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                          : 'bg-[#090d16] border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Guest Details & Bespoke Requests */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono">
                Guest Credentials & Requests
              </h2>
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Lord Julian Vance"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-[#090d16] border border-gray-800 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 font-mono outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 555-892-4100"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-[#090d16] border border-gray-800 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 font-mono outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. guest@savoria.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#090d16] border border-gray-800 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 font-mono outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-400">
                  Special Occasion or Bespoke Culinary Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Anniversary celebration, preferred quiet table, wine pairing preference, or allergy notes..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full bg-[#090d16] border border-gray-800 focus:border-amber-400 rounded-xl p-4 text-xs text-white placeholder-gray-600 font-mono outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Instant reservation confirmation with zero pre-booking fees</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest font-mono transition-all duration-300 shadow-xl shadow-amber-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>ALLOCATING TABLE...</span>
                    </>
                  ) : (
                    <>
                      <span>CONFIRM TABLE ALLOCATION</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ReservationPage() {
  return (
    <CartProvider>
      <SmoothScroll />
      <CyberCursor />
      <div className="min-h-screen bg-[#04060a] text-gray-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <main className="flex-1">
          <ReservationContent />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
