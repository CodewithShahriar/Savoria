'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Sparkles, Award, Flame, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutSection() {
  const { playBeep } = useCart();

  return (
    <section className="relative py-24 bg-[#05070d] border-b border-gray-800/80 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Master Chef Photo */}
              <div className="rounded-3xl overflow-hidden border border-gray-700/80 shadow-2xl relative aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80"
                  alt="Savoria Master Chef Crafting Haute Cuisine"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                      Executive Culinary Council
                    </span>
                    <h4 className="text-lg font-bold font-serif text-white">Chef Marco Bellini & Chen Wei</h4>
                  </div>
                  <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/40">
                    Est. 2024
                  </span>
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#0c101a] border border-amber-500/40 p-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">3 Michelin Inception</span>
                  <span className="text-[10px] text-gray-400 font-mono">Global Haute Cuisine Excellence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Button */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[3px] bg-amber-500 rounded-full" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                ABOUT OUR SANCTUARY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Where Ancestral Fire Meets <br />
              <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                Cryogenic Precision
              </span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              Savoria was born out of a rebellion against ordinary dining. We united master chefs across three continents to bridge the gap between ancient culinary heritage — from 900°C cast-iron Szechuan wok heat and 24-hour slow clay-pot Awadhi dum, to 48-hour fermented Neapolitan sourdough — with satellite-precision thermal delivery.
            </p>

            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-4 rounded-2xl bg-[#0a0e18] border border-gray-800 space-y-1">
                <span className="text-2xl font-black font-mono text-amber-400">100%</span>
                <span className="text-xs text-gray-300 block font-medium">Single-Origin Ingredients</span>
                <span className="text-[10px] text-gray-500">Zero artificial preservatives</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0a0e18] border border-gray-800 space-y-1">
                <span className="text-2xl font-black font-mono text-cyan-400">900°C</span>
                <span className="text-xs text-gray-300 block font-medium">Ancestral Wok Hei</span>
                <span className="text-[10px] text-gray-500">Sealed in under 12 seconds</span>
              </div>
            </div>

            {/* Button that links to dedicated About Page */}
            <div className="pt-2">
              <Link
                href="/about"
                onClick={() => playBeep('click')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/20 group"
              >
                <span>EXPLORE OUR STORY & CHEFS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
