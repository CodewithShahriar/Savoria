'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Flame, Star, Award } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const { playBeep } = useCart();
  const [rotatePos, setRotatePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotatePos({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setRotatePos({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden cyber-grid pt-10 pb-16">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-amber-500/30 text-xs font-mono text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>GULSHAN-2 • NOW SERVING FINE DINING & CYBER DELIVERY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="block text-white">THE FUTURE OF</span>
              <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent gold-glow">
                CULINARY LUXURY
              </span>
              <span className="block text-gray-300 text-3xl sm:text-5xl font-light mt-1">
                IN BANGLADESH
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Experience <strong className="text-amber-300 font-semibold">Savoria</strong>: A symphony of authentic Chinese, Thai, Royal Awadhi Indian, wood-fired Italian pizzas, and mixologist-crafted cocktails. Crafted with master artistry and delivered with real-time cyber telemetry.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu"
                onClick={() => playBeep('click')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-amber-500/25 flex items-center gap-3 group"
              >
                <span>Explore Savoria Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#reservation"
                onClick={() => playBeep('click')}
                className="px-8 py-4 rounded-xl glass-panel hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all border border-gray-700 hover:border-amber-400/50 flex items-center gap-2"
              >
                <span>Reserve VIP Table</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-xl sm:text-2xl font-mono">
                  <span>4.95</span>
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-xs text-gray-400 mt-0.5">Over 2,800+ Foodies</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-l border-gray-800 pl-4">
                <div className="flex items-center gap-1 text-cyan-400 font-bold text-xl sm:text-2xl font-mono">
                  <span>30</span>
                  <span className="text-sm font-normal text-gray-300">Min</span>
                </div>
                <span className="text-xs text-gray-400 mt-0.5">Dhaka Express ETA</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-l border-gray-800 pl-4">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-xl sm:text-2xl font-mono">
                  <span>100%</span>
                </div>
                <span className="text-xs text-gray-400 mt-0.5">Halal Gourmet</span>
              </div>
            </div>
          </div>

          {/* Right Visual 3D Showcase Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateY(${rotatePos.x}deg) rotateX(${rotatePos.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-md aspect-square rounded-3xl p-1 bg-gradient-to-br from-amber-400/40 via-cyan-500/20 to-transparent shadow-2xl shadow-black group cursor-pointer"
            >
              {/* Inner Card Container */}
              <div className="w-full h-full rounded-[22px] bg-[#0c101c]/90 backdrop-blur-xl p-6 flex flex-col justify-between border border-white/10 overflow-hidden relative">
                {/* Floating Badge */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[11px] font-mono text-amber-300">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>CHEF'S SIGNATURE 2026</span>
                  </div>
                  <div className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                    ৳650 BDT
                  </div>
                </div>

                {/* Main Food Photo */}
                <div className="relative my-auto w-full aspect-square max-h-56 rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-500/10 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80"
                    alt="Szechuan Firecracker Chicken"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">
                      Chinese Szechuan Masterpiece
                    </span>
                    <h4 className="text-white font-bold text-lg leading-tight">
                      Szechuan Firecracker Chicken
                    </h4>
                  </div>
                </div>

                {/* Card Footer Features */}
                <div className="pt-4 border-t border-gray-800 flex items-center justify-between z-10 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Prep: 15-20 min</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Thermo-Lock Sealed</span>
                  </div>
                </div>

                {/* Decorative neon line */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
