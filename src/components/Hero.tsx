'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const HERO_DISHES = [
  {
    id: 'hero-1',
    name: 'Charred Szechuan Skewers & Garden Greens',
    cuisine: 'Asian Wok & Fire',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=85',
    accent: '#f59e0b',
  },
  {
    id: 'hero-2',
    name: 'Kashmiri Saffron Murgh & Royal Dum Braise',
    cuisine: 'Royal Awadhi Heritage',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85',
    accent: '#d97706',
  },
  {
    id: 'hero-3',
    name: 'Wood-Fired Neapolitan Truffle & Burrata Hearth',
    cuisine: 'Artisan Stone Hearth',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=85',
    accent: '#06b6d4',
  },
];

export default function Hero() {
  const { playBeep } = useCart();
  const [activeDishIdx, setActiveDishIdx] = useState(0);

  // Auto-rotate the 3 hero dishes every 4.2 seconds
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
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#07090e] border-b border-gray-800/80">
      {/* Dark luxury slate texture overlay inspired by ref 1 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-900/60 via-[#07090e] to-[#040609] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      
      {/* Dynamic ambient color glow behind the plate */}
      <div
        className="absolute top-1/4 right-8 w-[600px] h-[600px] rounded-full blur-[180px] opacity-25 pointer-events-none transition-all duration-1000"
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

            {/* Dynamic Current Dish Subtitle on the left */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-gray-800 text-xs font-mono text-gray-300 transition-all duration-500">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-gray-400">Featured Creation:</span>
              <span className="text-amber-300 font-bold">{activeDish.name}</span>
            </div>

            {/* CTA Buttons matching reference 1 primary gold + secondary text/ghost */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
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
            <div className="flex items-center gap-2.5 pt-4">
              {HERO_DISHES.map((dish, idx) => (
                <button
                  key={dish.id}
                  onClick={() => {
                    playBeep('click');
                    setActiveDishIdx(idx);
                  }}
                  className={`transition-all duration-500 rounded-full ${
                    activeDishIdx === idx
                      ? 'w-8 h-2.5 bg-amber-400 shadow-[0_0_12px_#f59e0b]'
                      : 'w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400'
                  }`}
                  title={`View Creation ${idx + 1}: ${dish.name}`}
                  aria-label={`Select dish ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] font-mono text-gray-400 ml-2">
                0{activeDishIdx + 1} / 0{HERO_DISHES.length}
              </span>
            </div>
          </div>

          {/* Right Column: Full Food Picture inside Round Box matching Reference 1 */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              
              {/* Outer decorative dark skillet / cast iron rim matching ref 1 */}
              <div className="absolute inset-0 rounded-full border-[12px] border-[#131622] shadow-2xl shadow-black pointer-events-none z-10" />
              <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none z-10" />

              {/* Round Box with 100% Full Food Background & Buttery Smooth Crossfade */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl bg-black">
                {HERO_DISHES.map((dish, idx) => (
                  <img
                    key={dish.id}
                    src={dish.image}
                    alt={dish.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                      activeDishIdx === idx
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  />
                ))}
              </div>

              {/* Bottom Navigation Arrow Buttons matching Reference 1 (bottom right of skillet) */}
              <div className="absolute -bottom-4 right-6 sm:right-10 flex items-center gap-2 bg-[#0c101a] p-1.5 rounded-full border border-gray-700 shadow-2xl z-20">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-black/80 hover:bg-amber-500 text-gray-300 hover:text-black flex items-center justify-center transition-all"
                  aria-label="Previous Dish"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-black/80 hover:bg-amber-500 text-gray-300 hover:text-black flex items-center justify-center transition-all"
                  aria-label="Next Dish"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
