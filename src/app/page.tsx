'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import SmoothScroll from '@/components/SmoothScroll';
import CyberCursor from '@/components/CyberCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InteractiveTicker from '@/components/InteractiveTicker';
import AboutSection from '@/components/AboutSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import SectionDivider from '@/components/SectionDivider';
import CulinaryWorlds from '@/components/CulinaryWorlds';
import FlavorSpectrumTuner from '@/components/FlavorSpectrumTuner';
import ChefShowcase from '@/components/ChefShowcase';
import AppPromoSection from '@/components/AppPromoSection';
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
          {/* Section 01: Hero (Matching Ref 1 Dark Slate Layout + 3 Rotating Dishes) */}
          <Hero />

          {/* High-speed luxury typography ribbon */}
          <InteractiveTicker />

          {/* Section 02: About Us Spotlight (Linking to /about) */}
          <AboutSection />

          {/* Section 03: Why People Choose Us */}
          <WhyChooseUs />

          {/* Section Divider: Transition into Culinary Sanctums */}
          <SectionDivider
            fromProtocol="02 // PHILOSOPHY"
            toProtocol="03 // FIVE SANCTUMS"
            title="Culinary Sanctums Protocol"
          />

          {/* Section 04: Culinary Worlds Experience */}
          <CulinaryWorlds />

          {/* Section Divider: Transition into Sensory Tuning */}
          <SectionDivider
            fromProtocol="03 // SANCTUMS"
            toProtocol="04 // SENSORY ENGINE"
            title="Sensory Resonance Tuning"
          />

          {/* Section 05: Flavor Spectrum Tuner */}
          <FlavorSpectrumTuner />

          {/* Section Divider: Haute Tasting Highlights */}
          <SectionDivider
            fromProtocol="04 // SENSORY"
            toProtocol="05 // CHEF SPOTLIGHT"
            title="Haute Tasting Highlights"
          />

          {/* Section 06: Chef's 4-Course Showcase with Link to /menu */}
          <ChefShowcase />

          {/* Section 07: Mobile Application & VIP Promo Banner (Matching Ref 2) */}
          <AppPromoSection />

          {/* Section Divider: Live Operational Telemetry */}
          <SectionDivider
            fromProtocol="05 // MOBILE CONCIERGE"
            toProtocol="06 // TELEMETRY"
            title="Live Operational Station"
          />

          {/* Section 08: Kitchen Sensors & Telemetry */}
          <KitchenTelemetry />

          {/* Critic Accolades & Testimonials */}
          <TestimonialsSection />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
