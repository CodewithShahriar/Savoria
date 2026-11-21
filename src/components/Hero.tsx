'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const HERO_DISHES = [
  {
    id: 'hero-1',
    name: 'Prime Dry-Aged Black Angus Ribeye',
    cuisine: 'Wood-Fired Prime Grillhouse',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 'hero-2',
    name: 'Butter-Poached Atlantic Maine Lobster & Scallops',
    cuisine: 'Coastal Oceanic & Raw Bar',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 'hero-3',
    name: 'Wood-Fired Neapolitan Truffle & Burrata Hearth',
    cuisine: 'Artisan Stone Hearth',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=85',
  },
];

export default function Hero() {
  const { playBeep } = useCart();
  const [activeDishIdx, setActiveDishIdx] = useState(0);

  // Auto-rotate the 3 hero background images every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDishIdx((prev) => (prev + 1) % HERO_DISHES.length);
    }, 4500);
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
    <section className="relative min-h-[92vh] sm:min-h-[94vh] flex items-center overflow-hidden bg-[#05070d] border-b border-gray-800/80">
      
      {/* FULL BACKGROUND: 3 Food images crossfading smoothly across the entire hero */}
      <div className="absolute inset-0 z-0">
        {HERO_DISHES.map((dish, idx) => (
          <img
            key={dish.id}
            src={dish.image}
            alt={dish.name}
            className={`absolute inset-0 w-full h-full object-cover object-center lg:object-right transition-all duration-1000 ease-in-out ${
              activeDishIdx === idx
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          />
        ))}

        {/* LEFT-SIDE DARK GRADIENT FADE: ensures text content on the left is 100% crisp & readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070d] via-[#05070d]/95 sm:via-[#05070d]/85 lg:via-[#05070d]/70 to-transparent z-10" />
        
        {/* Top and Bottom soft vignette fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/70 via-transparent to-[#05070d] z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 py-16 sm:py-24">
        <div className="max-w-2xl space-y-6 text-left">
          
          {/* Orange Accent Subtitle Dash matching reference 1 */}
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-[3px] bg-amber-500 rounded-full" />
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              FINE DINING • REFINED GASTRONOMY
            </span>
          </div>

          {/* Bold Serif Luxury Heading matching reference 1 typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-[1.08] drop-shadow-2xl">
            Beyond Ordinary <br />
            <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Dining Experience
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-gray-300 text-sm sm:text-base max-w-lg leading-relaxed font-light drop-shadow-md">
            Where prime hardwood charcoal flame meets hand-stretched Neapolitan stone hearths and molecular mixology. Savoria is a multisensory sanctuary crafted for those who demand the extraordinary.
          </p>

          {/* Live Dynamic Dish Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/60 border border-gray-700/80 backdrop-blur-md text-xs font-mono text-gray-200 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-gray-400">Featured Creation:</span>
            <span className="text-amber-300 font-bold">{activeDish.name}</span>
          </div>

          {/* CTA Buttons matching reference 1 */}
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
              className="px-7 py-4 rounded-xl bg-black/40 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all border border-gray-600/80 hover:border-amber-400/50 backdrop-blur-md flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ABOUT US</span>
            </Link>
          </div>

          {/* Pagination 3-Dot Indicators matching Reference 1 (bottom left) */}
          <div className="flex items-center gap-2.5 pt-6">
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
                    : 'w-2.5 h-2.5 bg-gray-500/80 hover:bg-gray-300'
                }`}
                title={`View ${dish.name}`}
                aria-label={`Select creation ${idx + 1}`}
              />
            ))}
            <span className="text-[11px] font-mono text-gray-400 ml-2">
              0{activeDishIdx + 1} / 0{HERO_DISHES.length}
            </span>
          </div>

        </div>
      </div>

      {/* Bottom Right Navigation Arrow Buttons matching Reference 1 */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-2.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-gray-700/80 shadow-2xl">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-amber-500 text-gray-300 hover:text-black flex items-center justify-center transition-all"
          aria-label="Previous Creation"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-amber-500 text-gray-300 hover:text-black flex items-center justify-center transition-all"
          aria-label="Next Creation"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

    </section>
  );
}
