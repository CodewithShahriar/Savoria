'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, Mail, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05070c] border-t border-gray-800 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center font-bold text-black font-serif text-lg">
                S
              </div>
              <span className="text-xl font-black tracking-widest text-white">SAVORIA</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              An avant-garde culinary destination combining world-class gastronomy with cyber-precision delivery.
            </p>
            <div className="flex items-center gap-3 text-gray-400 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:text-amber-400 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:text-amber-400 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="hover:text-amber-400 transition-colors">
                  Complete Menu Archive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  VIP Concierge & Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-cyan-400 transition-colors font-mono">
                  Kitchen Display System (KDS)
                </Link>
              </li>
              <li>
                <Link href="/track/SAV-89241" className="hover:text-cyan-400 transition-colors font-mono">
                  Sample Live Order Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Service Hours
            </h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li className="flex items-center gap-2 text-gray-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Dining: 12:00 PM – 11:30 PM</span>
              </li>
              <li className="flex items-center gap-2 text-cyan-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Cyber Delivery: 11:30 AM – 12:00 AM</span>
              </li>
              <li className="text-gray-500">Open 7 days a week including holidays</li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Sanctuary HQ
            </h4>
            <div className="space-y-2">
              <p className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>88 Grand Boulevard, Avenue 4, Metropolitan District</span>
              </p>
              <p className="flex items-center gap-2 text-gray-300 font-mono">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+1 (800) SAVORIA</span>
              </p>
              <p className="flex items-center gap-2 text-gray-300 font-mono">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>concierge@savoria-dining.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-gray-600 text-[11px] font-mono">
          <p>© 2026 Savoria Culinary Arts Ltd. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 text-gray-500">
            Crafted with Next.js, Node.js & Cyber Telemetry.
          </p>
        </div>
      </div>
    </footer>
  );
}
