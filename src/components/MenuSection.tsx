'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { Flame, Star, Clock, Plus, Check, Search, Sparkles, Filter, X, ChevronRight, Sliders, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Creations', icon: '✨', sectionId: '' },
  { id: 'starters', label: 'Starters & Tapas', icon: '🍤', sectionId: 'cat-starters', subtitle: 'Gourmet Appetizers & Crispy Delicacies' },
  { id: 'chinese-thai', label: 'Wok & Thai Fire', icon: '🥢', sectionId: 'cat-chinese-thai', subtitle: '900°C Szechuan Wok Hei & Bangkok Curries' },
  { id: 'indian', label: 'Royal Awadhi Dum', icon: '🍛', sectionId: 'cat-indian', subtitle: 'Claypot Saffron Infusion & Charcoal Tandoor' },
  { id: 'pizza-pasta', label: 'Artisan Hearth & Pasta', icon: '🍕', sectionId: 'cat-pizza-pasta', subtitle: '48H Cold Fermentation & Handcrafted Tagliatelle' },
  { id: 'beverages', label: 'Alchemist Mixology', icon: '🍸', sectionId: 'cat-beverages', subtitle: 'Cryogenic Nitro Cold Brews & Sparklers' },
  { id: 'desserts', label: '24K Decadent Sweets', icon: '🍰', sectionId: 'cat-desserts', subtitle: 'Single-Origin Belgian Lava & Spun Saffron Kunafa' },
];

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'halal' | 'veg'>('all');
  
  // Customization Modal State
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedSpice, setSelectedSpice] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<Array<{ id: string; name: string; price: number }>>([]);
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addToCart, playBeep } = useCart();

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const res = await fetch('/api/menu');
        const json = await res.json();
        if (json.success) {
          setMenuItems(json.data);
        }
      } catch (err) {
        console.error('Failed to load menu', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const scrollToCategory = (cat: typeof CATEGORIES[0]) => {
    playBeep('click');
    setSelectedCategory(cat.id);

    if (cat.sectionId) {
      const el = document.getElementById(cat.sectionId);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  };

  const openCustomizeModal = (item: MenuItem) => {
    playBeep('click');
    setCustomizingItem(item);
    setSelectedSpice(item.spiceLevel);
    setSelectedAddons([]);
    setInstructions('');
    setQuantity(1);
  };

  const quickAddToCart = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    playBeep('add');
    addToCart(item, 1, item.spiceLevel, [], '');
  };

  const toggleAddon = (addon: { id: string; name: string; price: number }) => {
    playBeep('click');
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddCustomizedItem = () => {
    if (!customizingItem) return;
    addToCart(customizingItem, quantity, selectedSpice, selectedAddons, instructions);
    setCustomizingItem(null);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDietary = dietaryFilter === 'all' || item.dietary === dietaryFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesCategory && matchesDietary && matchesQuery;
  });

  const groupedCategories = CATEGORIES.filter((c) => c.id !== 'all').map((cat) => ({
    ...cat,
    items: filteredItems.filter((i) => i.category === cat.id),
  })).filter((group) => group.items.length > 0);

  return (
    <section className="relative py-12 bg-[#04060a] min-h-screen">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE COMPLETE SAVORIA GASTRONOMY CATALOGUE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            Haute Cuisine <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Archive</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Discover 50 handcrafted culinary masterpieces across our 6 specialized culinary sanctums. Every dish is cooked to order with precision heat and thermal-locked telemetry.
          </p>
        </div>

        {/* Sticky Floating Category Jumper Bar */}
        <div className="sticky top-20 z-30 py-3 bg-[#04060a]/90 backdrop-blur-2xl border-b border-gray-800/80 mb-10 -mx-4 px-4 sm:-mx-8 sm:px-8 transition-all">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? menuItems.length 
                : menuItems.filter((m) => m.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono transition-all duration-300 whitespace-nowrap border ${
                    active
                      ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/25 border-amber-400 scale-105'
                      : 'glass-panel text-gray-400 hover:text-white border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    active ? 'bg-black/25 text-black' : 'bg-gray-800 text-amber-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Search & Dietary Filter Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 glass-panel p-4 rounded-2xl border border-white/5">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search across 50 dishes (e.g. biryani, dim sum, mojito, kunafa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#090d16] border border-gray-800 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-gray-500 flex items-center gap-1 font-mono">
              <Filter className="w-3.5 h-3.5" /> Dietary:
            </span>
            {(['all', 'halal', 'veg'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDietaryFilter(d)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase transition-all border ${
                  dietaryFilter === d
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Listings by Category */}
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400 font-mono text-xs">Querying complete 50-dish gastronomy database...</p>
          </div>
        ) : groupedCategories.length === 0 ? (
          <div className="py-20 text-center glass-panel rounded-3xl max-w-md mx-auto p-8 border border-gray-800">
            <p className="text-gray-300 font-medium mb-2">No matching creations found</p>
            <p className="text-gray-500 text-xs mb-4">Try clearing filters or search keywords.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="px-5 py-2.5 bg-amber-500 text-black font-bold rounded-full text-xs font-mono"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-20">
            {groupedCategories.map((catGroup) => (
              <div key={catGroup.id} id={catGroup.sectionId} className="space-y-6 scroll-mt-36">
                {/* Grand Category Section Header */}
                <div className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{catGroup.icon}</span>
                      <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                        {catGroup.label}
                      </h2>
                    </div>
                    <p className="text-xs text-gray-400 font-light font-mono pl-9">
                      {catGroup.subtitle}
                    </p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300 self-start sm:self-auto">
                    {catGroup.items.length} Signature Creations
                  </span>
                </div>

                {/* Exquisite High-Density 2-Column Luxury Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {catGroup.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openCustomizeModal(item)}
                      className="glass-panel hover:glass-panel-glow rounded-3xl p-5 border border-white/5 hover:border-amber-500/40 transition-all duration-300 flex flex-col sm:flex-row gap-5 cursor-pointer group relative overflow-hidden"
                    >
                      {/* Left: Gourmet Photo */}
                      <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden bg-black/60 shrink-0 border border-white/10 group-hover:border-amber-400/40 transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden" />
                        
                        {/* Top Badge */}
                        {item.isChefSpecial && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-mono font-bold shadow-md">
                            ★ CHEF'S PICK
                          </span>
                        )}
                        {item.dietary === 'veg' && (
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[9px] font-mono">
                            VEG
                          </span>
                        )}
                      </div>

                      {/* Right: Content & Action */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                              {item.name}
                            </h3>
                          </div>

                          <p className="text-gray-400 text-xs font-light leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Metadata row */}
                        <div className="flex items-center gap-3 text-xs font-mono text-gray-500 pt-1 border-t border-gray-800/60">
                          <span className="flex items-center gap-1 text-amber-300">
                            ★ {item.rating}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            {item.prepTime}
                          </span>
                          {item.spiceLevel > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-red-400">
                                {'🌶️'.repeat(item.spiceLevel)}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Price & Action row */}
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <span className="text-[10px] text-gray-500 font-mono uppercase block">Price</span>
                            <span className="text-lg font-mono font-extrabold text-amber-300">
                              ${item.price}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => quickAddToCart(e, item)}
                              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                              title="Instant 1-Click Order"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Add</span>
                            </button>
                            <button
                              onClick={() => openCustomizeModal(item)}
                              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-gray-700 text-xs font-mono transition-all flex items-center gap-1"
                              title="Customize Spice & Toppings"
                            >
                              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel-glow rounded-3xl p-6 sm:p-8 relative border border-amber-500/30 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCustomizingItem(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <img
                src={customizingItem.image}
                alt={customizingItem.name}
                className="w-16 h-16 rounded-2xl object-cover border border-amber-500/30"
              />
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Customizing Order
                </span>
                <h3 className="text-xl font-bold text-white">{customizingItem.name}</h3>
                <span className="text-sm font-mono text-amber-300">
                  Base Price: ${customizingItem.price}
                </span>
              </div>
            </div>

            {/* Spice Selector */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400" />
                Select Spice Tolerance:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { level: 1, label: 'Mild 🌶️' },
                  { level: 2, label: 'Balanced Hot 🌶️🌶️' },
                  { level: 3, label: 'Savoria Fiery 🔥' },
                ].map((s) => (
                  <button
                    key={s.level}
                    type="button"
                    onClick={() => {
                      playBeep('click');
                      setSelectedSpice(s.level);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-mono transition-all border ${
                      selectedSpice === s.level
                        ? 'bg-red-950/80 border-red-500 text-red-200 shadow-md shadow-red-500/20'
                        : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Matrix Gauge */}
            <div className="p-4 rounded-2xl bg-black/40 border border-gray-800/80 mb-6 space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">
                Reactive Flavor Telemetry Matrix:
              </span>
              <div className="space-y-2 text-[11px] font-mono">
                <div>
                  <div className="flex justify-between text-gray-400 mb-1">
                    <span>Heat Index (Scoville)</span>
                    <span className="text-red-400">{selectedSpice === 1 ? '3,500 SHU' : selectedSpice === 2 ? '15,000 SHU' : '50,000+ SHU'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-300"
                      style={{ width: `${selectedSpice === 1 ? '30%' : selectedSpice === 2 ? '65%' : '95%'}` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-400 mb-1">
                    <span>Umami & Savor Density</span>
                    <span className="text-amber-300">{85 + selectedAddons.length * 4}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 transition-all duration-300"
                      style={{ width: `${Math.min(100, 85 + selectedAddons.length * 4)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Addons Selection */}
            {customizingItem.addons && customizingItem.addons.length > 0 && (
              <div className="space-y-3 mb-6">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-300">
                  Gourmet Add-ons & Pairings:
                </label>
                <div className="space-y-2">
                  {customizingItem.addons.map((addon) => {
                    const isSelected = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/60 text-white'
                            : 'bg-gray-950/40 border-gray-800 text-gray-300 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isSelected ? 'bg-amber-500 border-amber-500 text-black' : 'border-gray-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-medium">{addon.name}</span>
                        </div>
                        <span className="text-xs font-mono text-amber-300">+${addon.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Kitchen Instructions */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-300">
                Kitchen Instructions (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g. Extra crispiness, sauce on side, cutlery needed"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full bg-[#090d16] border border-gray-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 outline-none"
              />
            </div>

            {/* Quantity and Final Total */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="flex items-center gap-3 bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-400 hover:text-white font-mono text-base px-1"
                >
                  -
                </button>
                <span className="text-white font-mono font-bold text-sm w-4 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-400 hover:text-white font-mono text-base px-1"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-gray-400 block font-mono">Calculated Total</span>
                <span className="text-xl font-bold font-mono text-amber-300">
                  $
                  {(
                    (customizingItem.price +
                      selectedAddons.reduce((sum, a) => sum + a.price, 0)) *
                    quantity
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddCustomizedItem}
              className="mt-6 w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl shadow-amber-500/20"
            >
              Add To Cyber Order Tray →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
