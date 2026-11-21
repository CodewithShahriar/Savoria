'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Sparkles, Star, Flame, Eye, Plus } from 'lucide-react';

const HERO_DISHES = [
  {
    id: 'ct-1',
    name: 'Szechuan Firecracker Chicken',
    tagline: 'Wok-tossed fiery peppercorns & crisp scallions',
    cuisine: 'Asian Wok & Fire',
    price: 26,
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1000&q=85',
    accent: '#f59e0b',
    tags: ['Szechuan Num Pepper', 'Cold-Smoked Sesame', 'Flambé High Heat'],
  },
  {
    id: 'in-1',
    name: 'Kashmiri Saffron Murgh Makhani',
    tagline: 'Velvety reduction with pure saffron & churned cream',
    cuisine: 'Royal Awadhi Heritage',
    price: 32,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=85',
    accent: '#d97706',
    tags: ['Iranian Saffron Stigmas', '24H Slow Dum Charcoal', 'Tandoor Charred'],
  },
  {
    id: 'pp-2',
    name: 'Quattro Formaggi Wood-Fired Pizza',
    tagline: '48H fermented Neapolitan crust with artisan cheeses',
    cuisine: 'Artisan Stone Hearth',
    price: 28,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85',
    accent: '#06b6d4',
    tags: ['Fior di Latte Mozzarella', 'Gorgonzola Dolce', 'San Marzano DOP'],
  },
  {
    id: 'bv-1',
    name: 'Electric Neon Blue Mojito',
    tagline: 'Crystal spearmint, Persian lime & silver sparkles',
    cuisine: 'Molecular Mixology',
    price: 14,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85',
    accent: '#38bdf8',
    tags: ['Crushed Crystal Ice', 'Edible Silver Shimmer', 'Hand-Muddled Mint'],
  },
];

export default function Hero() {
  const { playBeep, addToCart } = useCart();
  const [activeDishIdx, setActiveDishIdx] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Auto-change dish image every 3.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDishIdx((prev) => (prev + 1) % HERO_DISHES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const activeDish = HERO_DISHES[activeDishIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 18, y: y * 18 });
  };

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#05070d] pt-8 pb-16">
      {/* Morphing ambient color backdrop */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px] opacity-25 pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: activeDish.accent }}
      />
      <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber geometric grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Top Editorial Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800/80 pb-6 mb-10 text-[11px] font-mono tracking-widest text-gray-400 uppercase">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-300">Sanctuary Open • Dinner Service Active</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>Lat 40.7128° N • Long 74.0060° W</span>
            <span className="text-amber-400/80 font-bold">White-Glove Dispatch Active</span>
          </div>
        </div>

        {/* Hero Split Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Editorial Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CULINARY ARCHITECTURE 2026</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.92]">
              <span className="block">BEYOND</span>
              <span className="block bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl">
                ORDINARY
              </span>
              <span className="block text-gray-400 font-light text-4xl sm:text-6xl tracking-tight mt-1">
                DINING.
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-lg leading-relaxed font-light">
              Where ancestral wok flame meets hand-stretched Neapolitan stone hearths and molecular mixology. Savoria is a multisensory sanctuary crafted for those who demand the extraordinary.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/menu"
                onClick={() => playBeep('click')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/20 flex items-center gap-3 group"
              >
                <span>Explore Full Menu Archive</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                href="/contact"
                onClick={() => playBeep('click')}
                className="px-8 py-4 rounded-full glass-panel hover:bg-white/10 text-white font-medium text-xs uppercase tracking-wider transition-all border border-gray-700 hover:border-amber-400/50"
              >
                Connect With Concierge
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive 3D Turntable Masterpiece */}
          <div
            className="lg:col-span-6 flex justify-center relative"
            onMouseMove={handleMouseMove}
          >
            {/* Turntable Platter Outer Ring */}
            <div
              className="relative w-full max-w-lg aspect-square rounded-full p-4 flex items-center justify-center transition-all duration-300"
              style={{
                background: `radial-gradient(circle, ${activeDish.accent}15 0%, transparent 70%)`,
              }}
            >
              {/* Outer decorative dashed orbit ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-gray-700/60 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-white/10 pointer-events-none" />

              {/* Central Floating Dish Plate with 3D tilt */}
              <div
                className="relative w-4/5 aspect-square rounded-full overflow-hidden shadow-2xl shadow-black p-3 bg-gradient-to-br from-white/15 to-transparent border border-white/20 backdrop-blur-md group"
                style={{
                  transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src={activeDish.image}
                    alt={activeDish.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                  {/* Centered Dish Details on hover */}
                  <div className="absolute bottom-6 left-6 right-6 text-center space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">
                      {activeDish.cuisine}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                      {activeDish.name}
                    </h3>
                    <p className="text-[11px] text-gray-300 font-light line-clamp-1">
                      {activeDish.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide Navigation Dots */}
              <div className="absolute -bottom-6 flex items-center gap-2 z-20">
                {HERO_DISHES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveDishIdx(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeDishIdx === dotIdx
                        ? 'w-6 bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                        : 'w-1.5 bg-gray-700 hover:bg-gray-500'
                    }`}
                    title={`Dish ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Floating Orbiting Ingredient Badges */}
              {activeDish.tags.map((tag, i) => {
                const positions = [
                  '-top-2 left-6',
                  'top-1/3 -right-4',
                  '-bottom-3 left-12',
                ];
                return (
                  <div
                    key={tag}
                    className={`absolute ${positions[i]} px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/40 text-[10px] font-mono text-gray-200 shadow-xl backdrop-blur-xl flex items-center gap-1.5 pointer-events-none animate-float`}
                    style={{ animationDelay: `${i * 0.7}s` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{tag}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 40s linear infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
