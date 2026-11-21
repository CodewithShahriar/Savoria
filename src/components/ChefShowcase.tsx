'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Star, Plus, Flame, Clock, Sparkles } from 'lucide-react';
import { MenuItem } from '@/types';

const SHOWCASE_ITEMS: MenuItem[] = [
  {
    id: 'sg-1',
    name: 'Prime Dry-Aged Black Angus Ribeye',
    description: '45-day dry-aged prime beef seared over white oak hardwood embers, basted in rosemary-garlic marrow butter with charred asparagus.',
    price: 38,
    category: 'steaks-grills',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: true,
    prepTime: '20 min',
    rating: 5.0,
    reviewsCount: 284,
    dietary: 'halal',
  },
  {
    id: 'pp-1',
    name: 'Truffle Wild Mushroom Tagliatelle',
    description: 'Fresh handmade pasta ribbons in a decadent white truffle cream sauce, wild porcini mushrooms, and shaved 24-month aged parmesan.',
    price: 28,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: true,
    prepTime: '16 min',
    rating: 4.9,
    reviewsCount: 165,
    dietary: 'veg',
  },
  {
    id: 'sf-1',
    name: 'Butter-Poached Atlantic Maine Lobster Tail',
    description: 'Wild-harvested Maine lobster poached in browned Meyer lemon butter, served over saffron cauliflower purée with golden caviar pearls.',
    price: 42,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: true,
    prepTime: '18 min',
    rating: 4.98,
    reviewsCount: 312,
    dietary: 'halal',
  },
  {
    id: 'ds-1',
    name: '24K Savoria Cyber Molten Sphere',
    description: 'Belgian 72% dark chocolate sphere filled with warm liquid chocolate lava, Madagascar vanilla bean gelato, and edible 24K gold leaf.',
    price: 22,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: true,
    prepTime: '12 min',
    rating: 5.0,
    reviewsCount: 390,
    dietary: 'veg',
  },
];

export default function ChefShowcase() {
  const { playBeep, addToCart } = useCart();

  const handleQuickAdd = (item: MenuItem) => {
    playBeep('add');
    addToCart(item, 1, item.spiceLevel, [], '');
  };

  return (
    <section className="relative py-28 bg-[#05070d] border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 border-b border-gray-800/80 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase block">
              Curator's Spotlight
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Chef's 4-Course <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">Masterpieces</span>
            </h2>
          </div>

          <Link
            href="/menu"
            onClick={() => playBeep('click')}
            className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 tracking-wider uppercase group"
          >
            <span>View Full Menu Collection (50 Dishes)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOWCASE_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="glass-panel hover:glass-panel-glow rounded-3xl p-5 border border-white/5 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold bg-amber-400 text-black px-2 py-0.5 rounded-full">
                    COURSE 0{idx + 1}
                  </span>
                  <span className="absolute bottom-3 right-3 text-sm font-mono font-bold text-amber-300 bg-black/80 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
                    ${item.price}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 font-mono pt-1">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    {item.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {item.prepTime}
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-gray-800">
                <button
                  onClick={() => handleQuickAdd(item)}
                  className="w-full py-2.5 rounded-full bg-amber-500/15 hover:bg-amber-400 text-amber-300 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add To Tray</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Big Magnetic Banner to Full Menu */}
        <div className="mt-14 glass-panel rounded-3xl p-8 sm:p-12 border border-amber-500/20 text-center space-y-5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase block">
            Complete Gastronomy Archive
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Craving More? Explore Our Full Multi-Cuisine Menu
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            From Bangkok street-style Pad Thai to hand-crafted Quattro Formaggi pizzas, explore our complete archive of 18+ signature creations.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              onClick={() => playBeep('click')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 group"
            >
              <span>Launch Full Menu Page</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
