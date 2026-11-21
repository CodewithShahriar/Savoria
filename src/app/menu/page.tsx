'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import SmoothScroll from '@/components/SmoothScroll';
import CyberCursor from '@/components/CyberCursor';
import Navbar from '@/components/Navbar';
import MenuSection from '@/components/MenuSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';

export default function MenuPage() {
  return (
    <CartProvider>
      <SmoothScroll />
      <CyberCursor />
      <div className="min-h-screen bg-[#05070d] text-gray-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <main className="flex-1 pt-6">
          <MenuSection />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
