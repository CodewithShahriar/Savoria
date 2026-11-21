'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    quantity: number,
    spiceLevel: number,
    selectedAddons: Array<{ id: string; name: string; price: number }>,
    specialInstructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  vat: number;
  deliveryFee: number;
  discount: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  playBeep: (type?: 'click' | 'add' | 'success') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('savoria_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('savoria_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Cyber Synthesizer Sound Effects (Zero external file dependencies)
  const playBeep = (type: 'click' | 'add' | 'success' = 'click') => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'add') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(1040, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(660, now + 0.1);
        osc.frequency.setValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // Audio might be muted/blocked by user
    }
  };

  const addToCart = (
    item: MenuItem,
    quantity: number,
    spiceLevel: number,
    selectedAddons: Array<{ id: string; name: string; price: number }>,
    specialInstructions?: string
  ) => {
    playBeep('add');
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const itemTotal = (item.price + addonsTotal) * quantity;
    const cartItemId = `${item.id}-${spiceLevel}-${selectedAddons.map((a) => a.id).sort().join('_')}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((c) => c.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex].quantity = newQty;
        updated[existingIndex].itemTotal = (item.price + addonsTotal) * newQty;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            menuItem: item,
            quantity,
            spiceLevel,
            selectedAddons,
            specialInstructions,
            itemTotal,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    playBeep('click');
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    playBeep('click');
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
            return {
              ...item,
              quantity: newQty,
              itemTotal: (item.menuItem.price + addonsTotal) * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setDiscountPercent(0);
  };

  const applyPromo = (code: string) => {
    playBeep('click');
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SAVORIAVIP') {
      setAppliedPromo('SAVORIAVIP');
      setDiscountPercent(15);
      return { success: true, message: 'VIP Code Applied! 15% discount activated.' };
    } else if (cleanCode === 'FOODIE10') {
      setAppliedPromo('FOODIE10');
      setDiscountPercent(10);
      return { success: true, message: 'Foodie discount! 10% off your feast.' };
    } else if (cleanCode === 'CYBER20') {
      setAppliedPromo('CYBER20');
      setDiscountPercent(20);
      return { success: true, message: 'Celebration discount! 20% off total.' };
    }
    return { success: false, message: 'Invalid promo code. Try "SAVORIAVIP"' };
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.itemTotal, 0);
  const deliveryFee = cart.length > 0 ? 5 : 0;
  const vat = Math.round(subtotal * 0.05);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal + deliveryFee + vat - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        vat,
        deliveryFee,
        discount,
        appliedPromo,
        applyPromo,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        playBeep,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
