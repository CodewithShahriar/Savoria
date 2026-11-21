'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import SmoothScroll from '@/components/SmoothScroll';
import CyberCursor from '@/components/CyberCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InteractiveTicker from '@/components/InteractiveTicker';
import SectionDivider from '@/components/SectionDivider';
import CulinaryWorlds from '@/components/CulinaryWorlds';
import FlavorSpectrumTuner from '@/components/FlavorSpectrumTuner';
import ChefShowcase from '@/components/ChefShowcase';
import KitchenTelemetry from '@/components/KitchenTelemetry';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';

export default function Home() {
  return (
    <CartProvider>
      <SmoothScroll />
      <CyberCursor />
      <div className="min-h-screen bg-[#04060a] text-gray-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <main className="flex-1">
          {/* Section 01: Hero */}
          <Hero />

          {/* High-speed luxury typography ribbon */}
          <InteractiveTicker />

          {/* Section Divider 01 -> 02 */}
          <SectionDivider
            fromProtocol="01 // ORBITAL ORIGIN"
            toProtocol="02 // FIVE SANCTUMS"
            title="Culinary Sanctums Protocol"
          />

          {/* Section 02: Culinary Worlds Experience */}
          <CulinaryWorlds />

          {/* Section Divider 02 -> 03 */}
          <SectionDivider
            fromProtocol="02 // SANCTUMS"
            toProtocol="03 // SENSORY ENGINE"
            title="Sensory Resonance Tuning"
          />

          {/* Section 03: Flavor Spectrum Tuner */}
          <FlavorSpectrumTuner />

          {/* Section Divider 03 -> 04 */}
          <SectionDivider
            fromProtocol="03 // SENSORY"
            toProtocol="04 // CHEF SPOTLIGHT"
            title="Haute Tasting Highlights"
          />

          {/* Section 04: Chef's 4-Course Showcase with Link to /menu */}
          <ChefShowcase />

          {/* Section Divider 04 -> 05 */}
          <SectionDivider
            fromProtocol="04 // SPOTLIGHT"
            toProtocol="05 // TELEMETRY"
            title="Live Operational Station"
          />

          {/* Section 05: Kitchen Sensors & Telemetry */}
          <KitchenTelemetry />

          {/* Critic Accolades */}
          <TestimonialsSection />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
