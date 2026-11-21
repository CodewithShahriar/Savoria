'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Flame, Award, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const CORE_REASONS = [
  {
    id: 'thermo-transit',
    number: '01',
    badge: 'AEROSPACE LOGISTICS',
    title: '30-Min Thermo-Lock Transit',
    tagline: 'Piping Hot 68°C or Cryo-Chilled',
    desc: 'Sealed within 10 seconds of leaving the flames inside aerospace-insulated thermal capsules. Sizzling wok dishes retain crispness, pizza crusts never steam or go soggy, and cryo-desserts remain perfectly frozen.',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
    icon: Flame,
    color: '#f59e0b',
    accentClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    metrics: [
      '68°C Thermal Precision Seal',
      'Sub-Meter Satellite GPS Radar',
      'White-Glove High-Speed Runners',
    ],
  },
  {
    id: 'master-chefs',
    number: '02',
    badge: 'CULINARY COUNCIL',
    title: 'Michelin-Trained Master Craftsmen',
    tagline: 'Ancestral Flame & Wok Hei',
    desc: 'Every recipe is directed by four international master chefs bringing ferocious 900°C Szechuan wok heat, 450°C Neapolitan volcanic stone ovens, and 24-hour slow charcoal Awadhi clay-pot dum braising.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    icon: Award,
    color: '#d97706',
    accentClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    metrics: [
      '4 Master Chefs Across 3 Continents',
      '900°C Cast-Iron Wok Hei Flash-Sear',
      '48-Hour Fermented Living Mother Dough',
    ],
  },
  {
    id: 'single-origin',
    number: '03',
    badge: 'ZERO COMPROMISE',
    title: '100% Single-Origin Botanical Terroir',
    tagline: 'Zero Artificial Preservatives',
    desc: 'San Marzano DOP tomatoes harvested from Mount Vesuvius volcanic soil, genuine grade-A Iranian saffron stigmas, single-origin Belgian Valrhona cacao, and pasture-raised meats. Purity in every bite.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    icon: ShieldCheck,
    color: '#10b981',
    accentClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    metrics: [
      'No Added MSG or Artificial Flavors',
      'Certified Halal & Farm-to-Flame Traceable',
      'Daily Small-Batch Reductions & Stocks',
    ],
  },
];

export default function WhyChooseUs() {
  const { playBeep } = useCart();

  return (
    <section className="relative py-28 bg-[#04060a] border-b border-gray-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with amber accent dash */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-gray-800/80 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[3px] bg-amber-500 rounded-full" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                THE SAVORIA STANDARD
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
            We engineered an uncompromising dining ritual. From ancestral fire to satellite-tracked thermal dispatch, every element is designed for culinary transcendence.
          </p>
        </div>

        {/* 3 Striking Hero Feature Cards with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CORE_REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.id}
                onMouseEnter={() => playBeep('click')}
                className="rounded-3xl bg-[#090d16] border border-gray-800 hover:border-amber-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/15 hover:-translate-y-2 flex flex-col justify-between overflow-hidden group relative"
              >
                {/* Top Half: Cinematic High-Resolution Image Header */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/30 to-black/40" />

                  {/* Number Badge Top Left */}
                  <span className="absolute top-4 left-4 text-xs font-mono font-black text-amber-300 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                    {reason.number}
                  </span>

                  {/* Category Pill Top Right */}
                  <span className={`absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${reason.accentClass}`}>
                    {reason.badge}
                  </span>

                  {/* Icon floating on image lower edge */}
                  <div
                    className="absolute bottom-3 left-6 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-xl backdrop-blur-md border border-white/20"
                    style={{ backgroundColor: `${reason.color}cc` }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Half: Narrative & Highlights */}
                <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-amber-400 font-bold block uppercase tracking-wider">
                      {reason.tagline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      {reason.desc}
                    </p>
                  </div>

                  {/* Checkmark Metric Highlights */}
                  <div className="pt-4 border-t border-gray-800/80 space-y-2 text-xs font-mono text-gray-300">
                    {reason.metrics.map((m, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-[11px] text-gray-300">{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card Bottom Status */}
                  <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span className="text-gray-400">VERIFIED SPECIFICATION</span>
                    <span className="text-amber-400 flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3" />
                      Savoria Grade
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Strip at bottom */}
        <div className="mt-16 p-6 rounded-3xl bg-[#070b14] border border-gray-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
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
