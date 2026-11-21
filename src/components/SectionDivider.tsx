'use client';

import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface SectionDividerProps {
  fromProtocol: string;
  toProtocol: string;
  title: string;
}

export default function SectionDivider({ fromProtocol, toProtocol, title }: SectionDividerProps) {
  return (
    <div className="relative w-full py-10 bg-[#04060a] overflow-hidden select-none border-y border-white/5">
      {/* Central Horizontal Neon Scanning Beam */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-amber-500/5 blur-lg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Protocol Tag */}
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-gray-500 uppercase">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>PHASE // {fromProtocol} ➔ {toProtocol}</span>
        </div>

        {/* Center Futuristic Gateway Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-amber-500/30 text-[11px] font-mono text-amber-300 shadow-xl shadow-amber-500/5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span className="tracking-wider uppercase">{title}</span>
        </div>

        {/* Right Coordinates / Frequency */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-gray-500 tracking-wider">
          <span className="text-cyan-400/80">FREQ: 432 Hz</span>
          <span>•</span>
          <span>TELEMETRY LOCKED</span>
        </div>
      </div>
    </div>
  );
}
