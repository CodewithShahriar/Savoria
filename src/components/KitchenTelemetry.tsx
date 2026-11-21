'use client';

import React from 'react';
import { Flame, ShieldCheck, Clock, Activity, Cpu } from 'lucide-react';

export default function KitchenTelemetry() {
  return (
    <section className="relative py-24 bg-[#030509] border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14 border-b border-gray-800/80 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase block">
              Operational Cyber Metrics
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Live Kitchen <span className="text-amber-400">Telemetry</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Telemetry Uplink Active</span>
          </div>
        </div>

        {/* 4 Sensor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sensor 1 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500">
              <span>STATION 01</span>
              <Flame className="w-4 h-4 text-red-500" />
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-mono font-extrabold text-white">820°C</span>
              <p className="text-xs text-red-400 font-mono">Hardwood Charcoal Sear Peak</p>
            </div>
            <p className="text-[11px] text-gray-400 font-light">
              Texas white oak embers searing prime cuts at ultra-high heat for instantaneous crust caramelization.
            </p>
          </div>

          {/* Sensor 2 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500">
              <span>STATION 02</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-mono font-extrabold text-white">62°C</span>
              <p className="text-xs text-amber-400 font-mono">Lobster Butter-Poach Tank</p>
            </div>
            <p className="text-[11px] text-gray-400 font-light">
              Precision thermal-controlled clarified Meyer lemon butter immersion for tender shellfish texture.
            </p>
          </div>

          {/* Sensor 3 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500">
              <span>STATION 03</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-mono font-extrabold text-white">455°C</span>
              <p className="text-xs text-cyan-400 font-mono">Stone Hearth Volcanic Oven</p>
            </div>
            <p className="text-[11px] text-gray-400 font-light">
              White oak wood blister baking artisanal fermented Neapolitan crusts in 90 seconds.
            </p>
          </div>

          {/* Sensor 4 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500">
              <span>DISPATCH TELEMETRY</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-mono font-extrabold text-white">100%</span>
              <p className="text-xs text-emerald-400 font-mono">Thermo-Lock Heat Retention</p>
            </div>
            <p className="text-[11px] text-gray-400 font-light">
              Hermetically sealed thermal packaging ensures your feast arrives piping hot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
