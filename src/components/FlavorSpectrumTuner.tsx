'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Sliders, Sparkles, Flame, Eye, Plus, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

const PAIRING_MATCHES = [
  {
    name: 'Szechuan Firecracker Chicken',
    cuisine: 'Wok & Fire',
    price: 580,
    heat: 90,
    umami: 65,
    sweet: 30,
    desc: 'Intense Sichuan numbing heat wok-flamed with crispy shallots and dried chilies.',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
    itemData: {
      id: 'ct-1',
      name: 'Szechuan Firecracker Chicken',
      description: 'Crispy chicken wok-tossed with fiery Szechuan peppercorns, dried red chilies, scallions, and toasted sesame.',
      price: 580,
      category: 'chinese-thai' as const,
      image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 3,
      prepTime: '15-20 min',
      rating: 4.9,
      reviewsCount: 142,
      dietary: 'halal' as const,
    },
  },
  {
    name: 'Truffle Wild Mushroom Tagliatelle',
    cuisine: 'Stone Hearth & Pasta',
    price: 680,
    heat: 15,
    umami: 95,
    sweet: 20,
    desc: 'Decadent handmade ribbons drenched in 24-month parmesan and pure white truffle cream.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    itemData: {
      id: 'pp-1',
      name: 'Truffle Wild Mushroom Tagliatelle',
      description: 'Fresh handmade pasta ribbons in a decadent white truffle cream sauce, wild porcini mushrooms, and shaved 24-month aged parmesan.',
      price: 680,
      category: 'pizza-pasta' as const,
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 0,
      prepTime: '18 min',
      rating: 4.9,
      reviewsCount: 165,
      dietary: 'veg' as const,
    },
  },
  {
    name: 'Kashmiri Saffron Murgh Makhani',
    cuisine: 'Royal Awadhi Heritage',
    price: 650,
    heat: 50,
    umami: 85,
    sweet: 45,
    desc: 'Velvety San Marzano butter reduction infused with pure saffron and tandoor-charred chicken.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    itemData: {
      id: 'in-1',
      name: 'Kashmiri Saffron Murgh Makhani',
      description: 'Tandoor-charred chicken simmered in a velvety reduction of San Marzano tomatoes, pure Kashmiri saffron, butter, and artisanal cream.',
      price: 650,
      category: 'indian' as const,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 1,
      prepTime: '20-25 min',
      rating: 5.0,
      reviewsCount: 260,
      dietary: 'halal' as const,
    },
  },
  {
    name: 'Electric Neon Blue Mojito',
    cuisine: 'Molecular Mixology',
    price: 290,
    heat: 0,
    umami: 20,
    sweet: 90,
    desc: 'Refreshing Persian lime, muddled garden mint, blue curacao sparkle, and silver luster.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    itemData: {
      id: 'bv-1',
      name: 'Electric Neon Blue Mojito',
      description: 'Futuristic blue curacao syrup, crushed garden spearmint, muddled Persian limes, fizzy soda, and edible silver sparkles.',
      price: 290,
      category: 'beverages' as const,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 0,
      prepTime: '5-7 min',
      rating: 4.9,
      reviewsCount: 310,
      dietary: 'veg' as const,
    },
  },
];

export default function FlavorSpectrumTuner() {
  const { playBeep, addToCart } = useCart();
  const [heatVal, setHeatVal] = useState(70);
  const [umamiVal, setUmamiVal] = useState(80);
  const [sweetVal, setSweetVal] = useState(30);

  // Simple closest euclidean distance to find ideal matched dish
  const bestMatch = PAIRING_MATCHES.reduce((prev, curr) => {
    const prevDist = Math.hypot(prev.heat - heatVal, prev.umami - umamiVal, prev.sweet - sweetVal);
    const currDist = Math.hypot(curr.heat - heatVal, curr.umami - umamiVal, curr.sweet - sweetVal);
    return currDist < prevDist ? curr : prev;
  });

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => {
    setter(val);
    playBeep('click');
  };

  const handleQuickAdd = () => {
    playBeep('add');
    addToCart(bestMatch.itemData, 1, bestMatch.itemData.spiceLevel, [], '');
  };

  return (
    <section className="relative py-28 bg-[#030509] border-t border-gray-800/80 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Sliders className="w-3.5 h-3.5" />
                <span>INTERACTIVE SENSORY RESONANCE ENGINE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Tune Your <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">Palate</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                Adjust your sensory frequencies below. Our culinary neural pairing system dynamically recalibrates to compute your ideal dish.
              </p>
            </div>

            {/* Draggable Sliders */}
            <div className="space-y-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/5">
              {/* Slider 1: Heat */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-red-500" />
                    Chili & Peppercorn Fire
                  </span>
                  <span className="text-red-400 font-bold">{heatVal}% Heat</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={heatVal}
                  onChange={(e) => handleSliderChange(setHeatVal, Number(e.target.value))}
                  className="w-full accent-red-500 bg-gray-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Umami */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Truffle & Roasted Umami
                  </span>
                  <span className="text-amber-400 font-bold">{umamiVal}% Depth</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={umamiVal}
                  onChange={(e) => handleSliderChange(setUmamiVal, Number(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Sweetness / Citrus */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    Citrus Zest & Botanical Sweet
                  </span>
                  <span className="text-cyan-400 font-bold">{sweetVal}% Balance</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sweetVal}
                  onChange={(e) => handleSliderChange(setSweetVal, Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-gray-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Computed Dish Output Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-amber-500/40 relative overflow-hidden transition-all duration-500">
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Sensory Resonance Match
                </span>
                <span className="text-amber-300 font-bold">99.8% Match</span>
              </div>

              {/* Image Preview */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-5 shadow-2xl">
                <img
                  src={bestMatch.image}
                  alt={bestMatch.name}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                  {bestMatch.cuisine}
                </span>
                <span className="absolute bottom-3 right-3 text-sm font-mono font-bold text-white">
                  ${bestMatch.price}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <h3 className="text-2xl font-extrabold text-white">{bestMatch.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{bestMatch.desc}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleQuickAdd}
                  className="flex-1 py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-full transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Order Matched Creation</span>
                </button>
                <Link
                  href="/menu"
                  className="px-4 py-3.5 rounded-full glass-panel hover:bg-white/10 border border-gray-700 text-gray-300 hover:text-white transition-all text-xs font-mono flex items-center justify-center"
                  title="View in Menu"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
