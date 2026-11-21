'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Calendar, Users, Clock, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

const SEATING_ZONES = [
  {
    id: 'Skyline VIP Lounge',
    name: 'Skyline VIP Lounge',
    description: 'High altitude glass lounge with panoramic metropolitan skyline view and private sommelier service.',
    badge: 'Exclusive',
    minGuests: 2,
  },
  {
    id: 'Romantic Twilight Corner',
    name: 'Romantic Twilight Corner',
    description: 'Dim ambient candlelight, bespoke rose arrangements, and soothing jazz acoustics.',
    badge: 'Couples',
    minGuests: 2,
  },
  {
    id: 'Chef Omakase Counter',
    name: 'Chef Omakase Counter',
    description: 'Front-row live view of master chefs wok-tossing and fire-searing right before your eyes.',
    badge: 'Live Kitchen',
    minGuests: 1,
  },
  {
    id: 'Executive Grand Banquet',
    name: 'Executive Grand Banquet',
    description: 'Ultra-luxurious banquet table designed for corporate VIP dinners and grand family gatherings.',
    badge: 'Banquet',
    minGuests: 4,
  },
];

export default function ReservationSection() {
  const { playBeep } = useCart();
  const [selectedZone, setSelectedZone] = useState('Skyline VIP Lounge');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-11-23');
  const [timeSlot, setTimeSlot] = useState('8:00 PM');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !timeSlot) {
      alert('Please fill out all required reservation fields.');
      return;
    }

    setSubmitting(true);
    playBeep('click');

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          phone,
          email,
          guests,
          date,
          timeSlot,
          seatingZone: selectedZone,
          specialRequest: notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        playBeep('success');
        setConfirmedReservation(data.data);
      } else {
        alert(data.message || 'Failed to reserve table');
      }
    } catch {
      alert('Network error submitting reservation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="relative py-24 bg-[#06080d] cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TABLE SANCTUARY & PRIVATE DINING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Reserve Your <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Savoria Experience</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Select your preferred dining atmosphere at our flagship Metropolitan Sanctuary.
          </p>
        </div>

        {confirmedReservation ? (
          <div className="max-w-xl mx-auto glass-panel-glow rounded-3xl p-8 text-center space-y-5 border border-emerald-500/40 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Table Secured, {confirmedReservation.customerName}!
              </h3>
              <p className="text-gray-400 text-xs mt-2">
                We have registered your table at Savoria Grand Sanctuary. A confirmation has been logged for {confirmedReservation.phone}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-gray-800 text-left font-mono text-xs space-y-2 text-gray-300">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Booking Code:</span>
                <span className="text-amber-400 font-bold">{confirmedReservation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Zone:</span>
                <span className="text-white">{confirmedReservation.seatingZone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date & Slot:</span>
                <span className="text-white">{confirmedReservation.date} at {confirmedReservation.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guest Count:</span>
                <span className="text-white">{confirmedReservation.guests} Persons</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-mono transition-colors"
            >
              Book Another Table
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Visual Zone Selector */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Choose Ambiance Architecture:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SEATING_ZONES.map((zone) => {
                  const isSelected = selectedZone === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => {
                        playBeep('click');
                        setSelectedZone(zone.id);
                      }}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'glass-panel-glow border-amber-400/80 text-white shadow-xl shadow-amber-500/10'
                          : 'glass-panel border-gray-800/80 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {zone.badge}
                        </span>
                        {isSelected && <span className="text-amber-400 text-xs">● Active</span>}
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1">{zone.name}</h5>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{zone.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <p className="text-xs text-gray-300">
                  Complimentary valet parking available at our main entrance. Dress code: Smart Casual / Elegant.
                </p>
              </div>
            </div>

            {/* Right Column: Reservation Form */}
            <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samira Rahman"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0c101c] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0c101c] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Party Size *</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#0c101c] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                        <option key={num} value={num} className="bg-[#0c101c]">
                          {num} Guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#0c101c] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Dining Time Slot *</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {['6:30 PM', '7:15 PM', '8:00 PM', '8:45 PM', '9:30 PM', '10:15 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          playBeep('click');
                          setTimeSlot(slot);
                        }}
                        className={`py-2 text-xs rounded-xl font-mono border transition-all ${
                          timeSlot === slot
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-[#090d16] border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Special Occasion / Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Birthday celebration, anniversary, booth preference"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#0c101c] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mt-4"
                >
                  {submitting ? 'Confirming Availability...' : 'Confirm Table Reservation →'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
