'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Smartphone, Check, Sparkles, Star, Download, Gift } from 'lucide-react';

export default function AppPromoSection() {
  const { playBeep } = useCart();
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    playBeep('click');
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText('SAVORIAVIP');
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <section className="relative py-24 bg-[#07090e] border-b border-gray-800/80 overflow-hidden">
      {/* Dark luxury slate texture overlay inspired by ref 2 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#07090e] to-[#040609] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Enclosing slate framed card inspired by ref 2 */}
        <div className="relative rounded-3xl bg-[#090d16] border border-gray-800/90 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Reference 2 Layout & Buttons */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Orange Dash Line + Subtitle matching Ref 2 */}
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-[3px] bg-amber-500 rounded-full" />
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                  MOBILE APPLICATION
                </span>
              </div>

              {/* Bold Serif Luxury Heading matching Ref 2 */}
              <h2 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white leading-tight">
                Download <br />
                <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  our application
                </span>
              </h2>

              {/* Description Paragraph */}
              <p className="text-gray-300 text-sm sm:text-base max-w-lg leading-relaxed font-light">
                Unlock 1-touch biometric ordering, live satellite courier telemetry radar, and exclusive secret menu tastings delivered exclusively to your mobile device.
              </p>

              {/* Interactive VIP Promo Code Pill */}
              <div className="inline-flex items-center gap-3 p-2.5 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <Gift className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-gray-300">
                  Use code <strong className="font-mono text-amber-300">SAVORIAVIP</strong> for 15% off first app order
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-[11px] font-mono bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors ml-2"
                >
                  {copiedCode ? 'COPIED!' : 'COPY'}
                </button>
              </div>

              {/* Store Buttons matching Reference 2 */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {/* App Store Button */}
                <button
                  onClick={() => playBeep('click')}
                  className="px-6 py-3.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 flex items-center gap-2.5 group"
                >
                  <span className="text-base"></span>
                  <span>APPSTORE</span>
                </button>

                {/* Play Market Button */}
                <button
                  onClick={() => playBeep('click')}
                  className="px-6 py-3.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 flex items-center gap-2.5 group"
                >
                  <span className="font-black text-sm">G</span>
                  <span>PLAYMARKET</span>
                </button>
              </div>

              {/* Feature Bullet Points */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800/80 text-xs font-mono text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Instant Apple/Google Pay</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Sub-Meter Satellite Radar</span>
                </div>
              </div>
            </div>

            {/* Right Column: Reference 2 Kraft Paper & Gourmet Food Presentation */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-sm sm:max-w-md">
                
                {/* Kraft / Parchment paper base layer matching Ref 2 */}
                <div className="relative rounded-2xl bg-[#c4a482]/20 border border-[#c4a482]/30 p-6 shadow-2xl backdrop-blur-sm rotate-1 group hover:rotate-0 transition-transform duration-500">
                  
                  {/* Food Picture (Gourmet Brioche Burgers on parchment) matching Ref 2 */}
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-gray-900/60 relative">
                    <img
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                      alt="Savoria Handcrafted Wagyu Gourmet Brioche Burgers"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Circular Discount Tag (-50% badge matching Ref 2) */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#f59e0b] text-black font-black flex items-center justify-center text-sm shadow-xl shadow-amber-500/30 animate-pulse border-2 border-white/20">
                    -50%
                  </div>

                  {/* Chef Hat Seal & Brand Logo matching Ref 2 bottom left */}
                  <div className="mt-4 pt-3 border-t border-[#c4a482]/30 flex items-center justify-between text-xs font-mono text-[#e6d5c3]">
                    <div className="flex items-center gap-2">
                      <span className="text-base">👨‍🍳</span>
                      <div>
                        <span className="font-bold block tracking-wider uppercase text-[10px]">Haute Craft</span>
                        <span className="text-[9px] opacity-80">Michelin Inspired Savoria</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold">LIMITED TIME</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
