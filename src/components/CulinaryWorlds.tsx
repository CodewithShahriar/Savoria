'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Flame, Compass, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const WORLDS = [
  {
    id: 'chinese-thai',
    name: 'The Wok & Fire Sanctum',
    subtitle: 'Ancestral Szechuan Heat & Bangkok Street Wok Hei',
    description: 'Blistering 900°C cast-iron woks sealing in wild peppercorns, hand-pulled noodles, and fresh sea king prawns in seconds.',
    technique: 'Wok Hei Flash-Sear (900°C)',
    origin: 'Chengdu & Bangkok',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80',
    color: '#ef4444',
    accentText: 'text-red-400',
    stats: { heat: 'High Flame', prep: 'Wok-Tossed', rating: '4.9★' },
  },
  {
    id: 'indian',
    name: 'The Royal Awadhi Cauldron',
    subtitle: 'Slow Clay-Pot Dum & Kashmiri Saffron Infusion',
    description: 'Sealed dough-rimmed clay pots slow-steamed overnight on charcoal embers. Velvety tomato reductions infused with pure saffron.',
    technique: '24-Hour Charcoal Dum Steaming',
    origin: 'Lucknow & Kashmir',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80',
    color: '#f59e0b',
    accentText: 'text-amber-400',
    stats: { heat: 'Slow Dum', prep: 'Clay Braised', rating: '5.0★' },
  },
  {
    id: 'pizza-pasta',
    name: 'The Artisan Stone Hearth',
    subtitle: '48-Hour Cold Fermentation & San Marzano Terroir',
    description: 'Living mother dough matured in humidity-controlled chambers, hand-stretched and fire-blistered in under 90 seconds.',
    technique: 'Wood-Fired Volcanic Stone (450°C)',
    origin: 'Naples & Bologna',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    color: '#06b6d4',
    accentText: 'text-cyan-400',
    stats: { heat: 'Volcanic Stone', prep: 'Hand Stretched', rating: '4.9★' },
  },
  {
    id: 'beverages',
    name: 'The Alchemist Mixology Lab',
    subtitle: 'Botanical Cold Extracts & Nitro Velvet Coffee',
    description: 'Single-origin beans cold-steeped for 18 hours, infused with pure nitrogen gas. Custom botanical tonics with smoked rosemary and silver luster.',
    technique: 'Cryogenic Nitro & Molecular Emulsion',
    origin: 'Bespoke Laboratory',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    color: '#38bdf8',
    accentText: 'text-sky-400',
    stats: { heat: 'Cryogenic Cold', prep: 'Nitro Shaken', rating: '4.95★' },
  },
  {
    id: 'desserts',
    name: 'The 24K Chocolate Vault',
    subtitle: 'Single-Origin Belgian Cacao & Spun Saffron Pastry',
    description: 'Decadent 72% dark chocolate spheres melting under warm lava ganache, adorned with genuine 24-karat edible gold leaves.',
    technique: 'Tempered Cryo-Shells & Spun Sugar',
    origin: 'Brussels & Isfahan',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    color: '#eab308',
    accentText: 'text-yellow-400',
    stats: { heat: 'Molten Core', prep: '24K Gold Leaf', rating: '5.0★' },
  },
];

export default function CulinaryWorlds() {
  const [selectedWorld, setSelectedWorld] = useState(0);
  const { playBeep } = useCart();
  const current = WORLDS[selectedWorld];

  return (
    <section className="relative py-28 bg-[#04060a] border-t border-gray-800/80 overflow-hidden">
      {/* Background glow matching active culinary world */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: current.color }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 border-b border-gray-800/80 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase block">
              Multi-Universe Gastronomy
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Five Culinary <span className="text-amber-400">Sanctums</span>
            </h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
            Every dish at Savoria belongs to an uncompromising culinary philosophy, led by dedicated master craftsmen.
          </p>
        </div>

        {/* Sanctum Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {WORLDS.map((w, idx) => (
            <button
              key={w.id}
              onClick={() => {
                playBeep('click');
                setSelectedWorld(idx);
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-mono transition-all duration-300 whitespace-nowrap flex items-center gap-2.5 border ${
                selectedWorld === idx
                  ? 'bg-white text-black font-bold shadow-xl shadow-white/10 scale-105 border-white'
                  : 'glass-panel text-gray-400 hover:text-white border-gray-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: w.color }} />
              <span>{w.name}</span>
            </button>
          ))}
        </div>

        {/* Active Sanctum Interactive Showcase Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className={`text-xs font-mono tracking-widest uppercase ${current.accentText}`}>
                  {current.origin} • {current.technique}
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {current.name}
                </h3>
                <h4 className="text-base text-gray-300 font-light italic">
                  "{current.subtitle}"
                </h4>
              </div>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
                {current.description}
              </p>

              {/* Technique Specs */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-black/40 border border-gray-800/80 font-mono text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px]">CRAFT HEAT</span>
                  <span className="text-white font-bold">{current.stats.heat}</span>
                </div>
                <div className="border-l border-gray-800 pl-4">
                  <span className="text-gray-500 block text-[10px]">TECHNIQUE</span>
                  <span className="text-amber-400 font-bold">{current.stats.prep}</span>
                </div>
                <div className="border-l border-gray-800 pl-4">
                  <span className="text-gray-500 block text-[10px]">CRITIC SCORE</span>
                  <span className="text-emerald-400 font-bold">{current.stats.rating}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#menu"
                  onClick={() => playBeep('click')}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
                >
                  <span>Explore {current.name} Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-white">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20">
                    Live Kitchen Sanctum
                  </span>
                  <span className="text-amber-300 font-bold">SAVORIA MASTER CRAFT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
