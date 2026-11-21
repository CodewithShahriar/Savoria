'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import SmoothScroll from '@/components/SmoothScroll';
import CyberCursor from '@/components/CyberCursor';
import { CartProvider } from '@/context/CartContext';
import { Sparkles, ArrowRight, Award, Flame, Compass, Heart, ShieldCheck, Star, Users, CheckCircle2 } from 'lucide-react';

const CHEF_COUNCIL = [
  {
    name: 'Chef Marco Bellini',
    role: 'Executive Director of Hearth & Mediterranean Terroir',
    origin: 'Naples, Italy',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=700&q=80',
    bio: 'Third-generation Neapolitan pizzaiolo and recipient of international acclaim. Marco guards Savoria’s 100-year-old living mother dough and 450°C volcanic stone oven technique.',
    quote: 'True pizza is an ethereal balance of living yeast, volcanic heat, and sacred Italian patience.',
  },
  {
    name: 'Chef Alexander Vance',
    role: 'Master of Hardwood Charcoal & Prime Dry-Aged Steaks',
    origin: 'Austin, Texas',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=700&q=80',
    bio: 'Master of prime beef cuts and 45-day dry-aging chambers. Alexander commands our custom white oak and hickory charcoal grills at 800°C for exceptional caramelization.',
    quote: 'True fire sear creates an exquisite crust while locking pure marbling and natural juices within.',
  },
  {
    name: 'Chef Genevieve Laurent',
    role: 'Executive Director of Ocean Catch & French Coastal Haute Cuisine',
    origin: 'Brittany, France',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=700&q=80',
    bio: 'Trained at three Michelin-starred Parisian institutions. Genevieve curates our wild Atlantic catch, butter-poached Maine lobster tails, and delicate veloutés.',
    quote: 'The ocean demands reverence; we cook shellfish with delicate browned butter and precision timing.',
  },
  {
    name: 'Elena Vance',
    role: 'Chief Molecular Mixologist & Cryogenic Pastry Master',
    origin: 'Zurich, Switzerland',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    bio: 'Former chemical engineer turned sensory artisan. Elena designs Savoria’s nitro cold-steeped coffees, blue spearmint tonics, and 24-karat gold-dusted Belgian chocolate spheres.',
    quote: 'Taste is multisensory; temperature, sound, and visual beauty combine to trigger memory.',
  },
];

const CORE_PILLARS = [
  {
    number: '01',
    title: 'Zero Artificial Preservatives',
    desc: 'Every sauce, stock, and reduction is brewed fresh each morning using whole bones, single-origin botanical spices, and cold-pressed extra virgin oils. No MSG, no artificial colors.',
  },
  {
    number: '02',
    title: 'Precision Temperature Locking',
    desc: 'Dishes are sealed inside aerospace-grade thermal chambers within 10 seconds of leaving the flames, maintaining serving temperatures from kitchen to your dining table.',
  },
  {
    number: '03',
    title: 'Direct Sourcing Terroir',
    desc: 'San Marzano tomatoes from the volcanic slopes of Mount Vesuvius, authentic grade-A Iranian saffron, Belgian Valrhona chocolate, and pasture-raised meats.',
  },
  {
    number: '04',
    title: 'Living Mother Dough Fermentation',
    desc: 'Our pizza dough ferments for 48 hours in humidity-controlled vaults, resulting in an exceptionally light, digestible crumb with crisp blistered cornicione.',
  },
];

export default function AboutPage() {
  return (
    <CartProvider>
      <SmoothScroll />
      <CyberCursor />
      <div className="min-h-screen bg-[#05070d] text-gray-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />

        <main className="flex-1">
          {/* Header Hero Section */}
          <section className="relative py-24 sm:py-32 overflow-hidden border-b border-gray-800/80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#05070d] to-[#040609]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE SAVORIA MANIFESTO</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
                Crafted For Those Who Refuse Ordinary Dining.
              </h1>

              <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
                We set out to reinvent the culinary ritual — uniting 800°C hardwood charcoal steak searing, wild oceanic seafood catches, and volcanic stone hearths with modern culinary telemetry.
              </p>
            </div>

            {/* Ambient Background Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />
          </section>

          {/* The Genesis Story */}
          <section className="py-24 border-b border-gray-800/80 bg-[#07090e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-[3px] bg-amber-500 rounded-full" />
                    <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                      OUR ORIGIN STORY
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
                    A Union of Ancient Fire & Modern Alchemy
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                    Founded in 2024, Savoria was born from a fundamental observation: luxury gastronomy was confined within static velvet rooms, while home dining was plagued by compromised quality, soggy textures, and lukewarm deliveries.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    We brought together four world-renowned culinary masterminds and challenged them to engineer a dining ecosystem where every dish — whether savored in our dining salon or delivered by high-speed white-glove runners — preserves its crispness, volatile aromatics, and thermal soul.
                  </p>
                  <div className="pt-2 flex items-center gap-6 text-xs font-mono text-gray-300">
                    <div>
                      <span className="text-2xl font-bold font-mono text-amber-400 block">50+</span>
                      <span>Signature Dishes</span>
                    </div>
                    <div className="w-px h-10 bg-gray-800" />
                    <div>
                      <span className="text-2xl font-bold font-mono text-cyan-400 block">30 Min</span>
                      <span>Thermo-Lock Dispatch</span>
                    </div>
                    <div className="w-px h-10 bg-gray-800" />
                    <div>
                      <span className="text-2xl font-bold font-mono text-emerald-400 block">4.95★</span>
                      <span>Guest Satisfaction</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                      alt="Savoria Kitchen Culinary Mastery"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Master Chef Council Section */}
          <section className="py-24 border-b border-gray-800/80 bg-[#05070d]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase block">
                  The Curators of Flavor
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
                  Executive Chef Council
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                  Four master artisans representing distinct culinary traditions, bound by a shared obsession with perfection.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {CHEF_COUNCIL.map((chef) => (
                  <div
                    key={chef.name}
                    className="p-6 rounded-3xl bg-[#090d16] border border-gray-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group space-y-4"
                  >
                    <div>
                      <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-800 relative">
                        <img
                          src={chef.image}
                          alt={chef.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <span className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/80 px-2 py-0.5 rounded text-amber-300 border border-amber-500/30">
                          {chef.origin}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-serif text-white">{chef.name}</h3>
                      <p className="text-xs text-amber-400 font-mono mt-0.5">{chef.role}</p>
                      <p className="text-xs text-gray-400 leading-relaxed font-light mt-3">
                        {chef.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-800/80">
                      <p className="text-[11px] italic text-gray-400 font-serif">
                        &ldquo;{chef.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Four Core Pillars */}
          <section className="py-24 border-b border-gray-800/80 bg-[#07090e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-8">
                <div>
                  <span className="text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase block">
                    Our Quality Promise
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-serif font-black text-white mt-2">
                    The Four Pillars of Savoria
                  </h2>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
                  We adhere to strict culinary discipline. Every dish that exits our kitchen must satisfy these non-negotiable principles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CORE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="p-6 rounded-3xl bg-[#0b0f1a] border border-gray-800/80 hover:border-cyan-500/30 transition-all space-y-3"
                  >
                    <span className="text-3xl font-black font-mono text-cyan-400 block">
                      {pillar.number}
                    </span>
                    <h4 className="text-base font-bold text-white">{pillar.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom Call to Action */}
          <section className="py-24 bg-gradient-to-b from-[#05070d] to-[#040609] text-center">
            <div className="max-w-3xl mx-auto px-4 space-y-6">
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
                Experience The Extraordinary
              </h2>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                Immerse yourself in our 50-dish archive or connect directly with our private concierge team.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/menu"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2 group"
                >
                  <span>EXPLORE FULL MENU ARCHIVE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all border border-gray-700 hover:border-amber-400/50"
                >
                  CONTACT CONCIERGE
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
