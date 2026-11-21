'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, UtensilsCrossed, ShieldCheck } from 'lucide-react';

const HERO_DISHES = [
  {
    id: 'hero-1',
    name: 'Charred Szechuan Skewers & Garden Greens',
    tagline: 'Flame-seared skewers with crushed Sichuan peppercorns, scallions, and crisp mountain herbs.',
    cuisine: 'Asian Wok & Fire',
    price: 28,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85',
    accent: '#f59e0b',
    prepTime: '15 min',
    chef: 'Chef Chen Wei',
  },
  {
    id: 'hero-2',
    name: 'Kashmiri Saffron Murgh & Royal Dum Cauldron',
    tagline: '24-hour slow clay-pot braise infused with pure saffron stigmas, churned cultured cream and warm spices.',
    cuisine: 'Royal Awadhi Heritage',
    price: 34,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    accent: '#d97706',
    prepTime: '20 min',
    chef: 'Chef Priya Nair',
  },
  {
    id: 'hero-3',
    name: 'Wood-Fired Neapolitan Truffle & Burrata Skillet',
    tagline: '48-hour fermented mother dough, volcanic hearth-blistered crust, San Marzano DOP, and fresh pugliese burrata.',
    cuisine: 'Artisan Stone Hearth',
    price: 29,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
    accent: '#06b6d4',
    prepTime: '12 min',
    chef: 'Chef Marco Bellini',
  },
];

export default function Hero() {
  const { playBeep } = useCart();
  const [activeDishIdx, setActiveDishIdx] = useState(0);

  // Auto-rotate the 3 hero dishes every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDishIdx((prev) => (prev + 1) % HERO_DISHES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const activeDish = HERO_DISHES[activeDishIdx];

  const handlePrev = () => {
    playBeep('click');
    setActiveDishIdx((prev) => (prev === 0 ? HERO_DISHES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playBeep('click');
    setActiveDishIdx((prev) => (prev + 1) % HERO_DISHES.length);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#07090e] border-b border-gray-800/80">
      {/* Dark luxury slate texture overlay inspired by ref 1 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-900/60 via-[#07090e] to-[#040609] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      
      {/* Ambient glow matching active dish */}
      <div
        className="absolute top-1/4 right-10 w-[550px] h-[550px] rounded-full blur-[170px] opacity-25 pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: activeDish.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Reference 1 Editorial Typography Style */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Orange Accent Subtitle Dash matching reference */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[3px] bg-amber-500 rounded-full" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                FINE DINING • REFINED GASTRONOMY
              </span>
            </div>

            {/* Bold Serif Luxury Heading inspired by Reference 1 */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-[1.08] drop-shadow-2xl">
              Beyond Ordinary <br />
              <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Dining Experience
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-gray-300 text-sm sm:text-base max-w-lg leading-relaxed font-light">
              Where ancestral wok flame meets hand-stretched Neapolitan stone hearths and molecular mixology. Savoria is a multisensory sanctuary crafted for those who demand the extraordinary.
            </p>

            {/* CTA Buttons matching reference 1 primary gold + secondary text/ghost */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/menu"
                onClick={() => playBeep('click')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/25 flex items-center gap-2.5 group"
              >
                <span>ONLINE MENU</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </Link>

              <Link
                href="/about"
                onClick={() => playBeep('click')}
                className="px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all border border-gray-700/80 hover:border-amber-400/50 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ABOUT US</span>
              </Link>
            </div>

            {/* Pagination 3-Dot Indicators matching Reference 1 (bottom left) */}
            <div className="flex items-center gap-2 pt-6">
              {HERO_DISHES.map((dish, idx) => (
                <button
                  key={dish.id}
                  onClick={() => {
                    playBeep('click');
                    setActiveDishIdx(idx);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    activeDishIdx === idx
                      ? 'w-7 h-2.5 bg-amber-400 shadow-[0_0_10px_#f59e0b]'
                      : 'w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400'
                  }`}
                  title={`View Dish ${idx + 1}: ${dish.name}`}
                  aria-label={`Select dish ${idx + 1}`}
                />
              ))}
              <span className="text-[10px] font-mono text-gray-400 ml-2">
                0{activeDishIdx + 1} / 0{HERO_DISHES.length}
              </span>
            </div>
          </div>

          {/* Right Column: Large Gourmet Sizzling Plate / Cast Iron Skillet matching Ref 1 */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              
              {/* Outer decorative dark skillet rim border */}
              <div className="absolute inset-0 rounded-full border-[10px] border-[#141824] shadow-2xl shadow-black pointer-events-none" />
              <div className="absolute inset-3 rounded-full border border-amber-500/20 pointer-events-none" />

              {/* Main Food Imagery with smooth crossfade */}
              <div className="relative w-[92%] aspect-square rounded-full overflow-hidden shadow-2xl border-4 border-[#1e2333] group">
                <img
                  key={activeDish.image}
                  src={activeDish.image}
                  alt={activeDish.name}
                  className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-110 animate-in fade-in zoom-in-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Overlaid Gourmet Details on the Skillet */}
                <div className="absolute bottom-6 left-6 right-6 text-center space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-black/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    {activeDish.cuisine} • {activeDish.chef}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white drop-shadow-md">
                    {activeDish.name}
                  </h3>
                  <p className="text-[11px] text-gray-300 font-light line-clamp-1 max-w-xs mx-auto">
                    {activeDish.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Navigation Arrow Buttons matching Reference 1 (bottom right of skillet) */}
              <div className="absolute -bottom-4 right-6 sm:right-10 flex items-center gap-2 bg-[#0c101a] p-1.5 rounded-full border border-gray-700 shadow-xl z-20">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-black/70 hover:bg-amber-500 text-gray-300 hover:text-black flex items-center justify-center transition-all"
                  aria-label="Previous Dish"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-black/70 hover:bg-amber-500 text-gray-300 hover:text-black flex items-center justify-center transition-all"
                  aria-label="Next Dish"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Live Freshness / Thermal Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-panel border border-amber-500/40 text-[10px] font-mono text-gray-200 shadow-xl backdrop-blur-xl flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>PREP: {activeDish.prepTime}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
