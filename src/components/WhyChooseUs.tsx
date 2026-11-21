'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Flame, Compass, ShieldCheck, Award, Zap, HeartHandshake, CheckCircle2 } from 'lucide-react';

const REASONS = [
  {
    icon: Flame,
    title: '30-Min Thermo-Lock Transit',
    desc: 'Custom aerodynamic insulated vessels preserve sizzling 68°C serving temperatures and crispy crust integrity all the way to your door.',
    badge: 'Thermal Preservation',
    color: '#f59e0b',
  },
  {
    icon: Award,
    title: 'Michelin-Trained Master Craftsmen',
    desc: 'Every recipe is engineered by four global culinary directors bringing authentic Szechuan wok heat, Neapolitan wood fires, and Awadhi royal dum.',
    badge: 'Haute Expertise',
    color: '#d97706',
  },
  {
    icon: ShieldCheck,
    title: '100% Single-Origin & Organic',
    desc: 'San Marzano DOP tomatoes, genuine Iranian saffron stigmas, Belgian Valrhona cacao, and organic pasture-raised proteins. No shortcuts.',
    badge: 'Pure Sourcing',
    color: '#10b981',
  },
  {
    icon: Compass,
    title: 'Live Satellite Telemetry',
    desc: 'Real-time GPS satellite radar updates every 2 seconds. Watch your courier navigate metropolitan sectors directly on your screen.',
    badge: 'Real-Time Radar',
    color: '#06b6d4',
  },
  {
    icon: Zap,
    title: '1-Touch Express Digital Checkout',
    desc: 'Seamless biometric authentication via Apple Pay, Google Pay, or tokenized cards with zero repetitive form-filling.',
    badge: 'Instant Protocol',
    color: '#38bdf8',
  },
  {
    icon: HeartHandshake,
    title: 'White-Glove Private Concierge',
    desc: 'Dedicated private hospitality team ready to accommodate bespoke dietary requirements, allergies, and custom spice level calibrations.',
    badge: 'VIP Care',
    color: '#eab308',
  },
];

export default function WhyChooseUs() {
  const { playBeep } = useCart();

  return (
    <section className="relative py-28 bg-[#04060a] border-b border-gray-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with amber accent dash */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-gray-800/80 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[3px] bg-amber-500 rounded-full" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                THE SAVORIA ADVANTAGE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
              Why Discerning Gourmets <br />
              <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                Choose Savoria
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
            We hold dining to an exacting standard. From the precision of our wok flames to our temperature-sealed courier fleet, every detail is engineered for perfection.
          </p>
        </div>

        {/* 6 Grid Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                onMouseEnter={() => playBeep('click')}
                className="p-8 rounded-3xl bg-[#080c16] border border-gray-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group space-y-6 relative overflow-hidden"
              >
                {/* Subtle card glow on hover */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                  style={{ backgroundColor: reason.color }}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${reason.color}15`, color: reason.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-black/60 text-gray-400 border border-gray-800 group-hover:border-amber-500/30 group-hover:text-amber-300 transition-colors">
                      {reason.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-200 transition-colors">
                    {reason.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {reason.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>METRIC 0{idx + 1}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-16 p-6 rounded-2xl bg-[#060912] border border-gray-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400 block">50,000+</span>
            <span className="text-xs text-gray-400 font-mono mt-1 block">Feasts Delivered</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 block">99.8%</span>
            <span className="text-xs text-gray-400 font-mono mt-1 block">On-Time Thermal Arrival</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 block">4.98 / 5.0</span>
            <span className="text-xs text-gray-400 font-mono mt-1 block">Guest Critic Rating</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black font-mono text-white block">24 / 7</span>
            <span className="text-xs text-gray-400 font-mono mt-1 block">Private Concierge Support</span>
          </div>
        </div>

      </div>
    </section>
  );
}
