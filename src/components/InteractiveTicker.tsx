'use client';

import React from 'react';

const TICKER_ITEMS = [
  'HAUTE GASTRONOMY',
  'WOOD-FIRED NEAPOLITAN',
  'ROYAL AWADHI DUM',
  'MOLECULAR MIXOLOGY',
  'SZECHUAN WOK HEI',
  '24K EDIBLE GOLD',
  'THERMAL SEALED TELEMETRY',
  'CHEF OMAKASE SESSIONS',
];

export default function InteractiveTicker() {
  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-amber-500/15 bg-black/60 backdrop-blur-md select-none">
      {/* Subtle glow overlays on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#06080d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#06080d] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling ribbon */}
      <div className="flex whitespace-nowrap animate-marquee">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="text-xs sm:text-sm font-mono tracking-[0.3em] font-semibold text-gray-400 hover:text-amber-300 transition-colors cursor-default">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 shadow-[0_0_8px_#f59e0b]" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
