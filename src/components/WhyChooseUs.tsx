'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Utensils, Award, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

const CORE_REASONS = [
  {
    id: 'menu-every-taste',
    number: '01',
    badge: 'GASTRONOMIC SPECTRUM',
    title: 'Menu for Every Taste',
    tagline: '50+ Master Signature Dishes',
    desc: 'From blistering 900°C Szechuan woks and Neapolitan wood-fired hearths to slow-dum Awadhi cauldrons and 24K molecular desserts. A universe of flavors crafted for every palate.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    icon: Utensils,
    color: '#f59e0b',
    accentClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    metrics: [
      '5 Diverse Culinary Sanctums',
      'Halal, Vegetarian & Fine Meat Selections',
    ],
  },
  {
    id: 'master-chefs',
    number: '02',
    badge: 'CULINARY COUNCIL',
    title: 'Michelin-Trained Master Craftsmen',
    tagline: 'Ancestral Flame & Wok Hei',
    desc: 'Four international culinary directors commanding authentic 900°C cast-iron wok heat, 450°C Neapolitan volcanic ovens, and overnight royal Awadhi clay-pot dum braises.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    icon: Award,
    color: '#d97706',
    accentClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    metrics: [
      '4 Master Chefs Across 3 Continents',
      '48-Hour Fermented Living Mother Dough',
    ],
  },
  {
    id: 'single-origin',
    number: '03',
    badge: 'ZERO COMPROMISE',
    title: '100% Single-Origin Botanical Terroir',
    tagline: 'Zero Artificial Preservatives',
    desc: 'Mount Vesuvius San Marzano DOP, genuine grade-A Iranian saffron stigmas, Belgian Valrhona chocolate, and pasture-raised meats. Absolute purity in every bite.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    icon: ShieldCheck,
    color: '#10b981',
    accentClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    metrics: [
      'Zero Artificial Enhancers or Added MSG',
      '100% Farm-to-Flame Traceable Purity',
    ],
  },
];

export default function WhyChooseUs() {
  const { playBeep } = useCart();

  return (
    <section className="relative py-20 bg-[#04060a] border-b border-gray-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with amber accent dash */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-gray-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[3px] bg-amber-500 rounded-full" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                THE SAVORIA STANDARD
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
              Why Discerning Gourmets <br />
              <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                Choose Savoria
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
            From diverse international cuisine to ancestral fire and pure ingredients, every element is designed for culinary transcendence.
          </p>
        </div>

        {/* 3 Compact, Highly Aesthetic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CORE_REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.id}
                onMouseEnter={() => playBeep('click')}
                className="rounded-2xl bg-[#090d16] border border-gray-800/90 hover:border-amber-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/15 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group relative"
              >
                {/* Compact Image Header */}
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/30 to-black/30" />

                  {/* Number Badge Top Left */}
                  <span className="absolute top-3 left-3 text-[11px] font-mono font-black text-amber-300 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    {reason.number}
                  </span>

                  {/* Category Pill Top Right */}
                  <span className={`absolute top-3 right-3 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-md ${reason.accentClass}`}>
                    {reason.badge}
                  </span>

                  {/* Icon floating on image lower edge */}
                  <div
                    className="absolute bottom-2.5 left-4 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-lg backdrop-blur-md border border-white/20"
                    style={{ backgroundColor: `${reason.color}dd` }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Compact Card Content Body */}
                <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase tracking-wider">
                      {reason.tagline}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                      {reason.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3">
                      {reason.desc}
                    </p>
                  </div>

                  {/* Checkmark Highlights */}
                  <div className="pt-3 border-t border-gray-800/80 space-y-1.5 text-xs font-mono text-gray-300">
                    {reason.metrics.map((m, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-[11px] text-gray-300 truncate">{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Slim Bottom Status Line */}
                  <div className="pt-2.5 border-t border-gray-800/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span className="text-gray-400">SPECIFICATION</span>
                    <span className="text-amber-400 flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3" />
                      Savoria Standard
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Trust Badges Strip */}
        <div className="mt-12 p-5 rounded-2xl bg-[#070b14] border border-gray-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-400 block">50,000+</span>
            <span className="text-[11px] text-gray-400 font-mono mt-0.5 block">Feasts Delivered</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono text-cyan-400 block">99.8%</span>
            <span className="text-[11px] text-gray-400 font-mono mt-0.5 block">On-Time Thermal Arrival</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400 block">4.98 / 5.0</span>
            <span className="text-[11px] text-gray-400 font-mono mt-0.5 block">Guest Critic Rating</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono text-white block">24 / 7</span>
            <span className="text-[11px] text-gray-400 font-mono mt-0.5 block">Private Concierge Support</span>
          </div>
        </div>

      </div>
    </section>
  );
}
