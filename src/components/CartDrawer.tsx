'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldAlert } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    vat,
    deliveryFee,
    discount,
    appliedPromo,
    applyPromo,
    total,
    setIsCheckoutOpen,
    playBeep,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleOpenCheckout = () => {
    playBeep('click');
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Slide-in Drawer Container */}
      <div className="w-full max-w-md bg-[#090d16] border-l border-amber-500/20 h-full flex flex-col justify-between shadow-2xl relative z-10">
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">Cyber Order Tray</h3>
              <span className="text-[11px] font-mono text-cyan-400">
                {cart.length} unique creation{cart.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-gray-300 font-medium">Your order tray is currently empty</p>
              <p className="text-gray-500 text-xs max-w-xs">
                Explore our curated menu of prime dry-aged steaks, Atlantic seafood, and wood-fired artisan dishes.
              </p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-2xl bg-[#0e1320] border border-gray-800/80 hover:border-amber-500/30 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-800"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {item.menuItem.name}
                      </h4>
                      <div className="text-[11px] text-gray-400 flex items-center gap-2 mt-1">
                        {item.spiceLevel > 0 && (
                          <span className="text-red-400 font-mono">
                            🌶️ Spice Lvl {item.spiceLevel}
                          </span>
                        )}
                        <span className="font-mono text-amber-300">${item.menuItem.price} each</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-gray-500 hover:text-red-400 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add-ons list if any */}
                  {item.selectedAddons.length > 0 && (
                    <div className="text-[11px] bg-black/40 p-2 rounded-lg text-gray-400 space-y-0.5 font-mono">
                      {item.selectedAddons.map((a) => (
                        <div key={a.id} className="flex justify-between">
                          <span>+ {a.name}</span>
                          <span className="text-amber-400">+${a.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quantity Stepper & Item Total */}
                  <div className="flex items-center justify-between pt-1 border-t border-gray-800/60">
                    <div className="flex items-center gap-2 bg-[#090d16] px-2.5 py-1 rounded-lg border border-gray-800">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="text-gray-400 hover:text-white font-mono text-sm px-1"
                      >
                        -
                      </button>
                      <span className="text-white font-mono font-bold text-xs w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="text-gray-400 hover:text-white font-mono text-sm px-1"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-mono font-bold text-amber-300 text-sm">
                      ${item.itemTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-[11px] font-mono text-gray-500 hover:text-red-400 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear Tray
                </button>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-800 bg-[#070a12] space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="VIP Code: SAVORIAVIP"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    className="w-full bg-[#0d121e] border border-gray-800 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 outline-none uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-amber-300 font-mono text-xs rounded-xl transition-colors border border-gray-700"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p
                  className={`text-[11px] font-mono ${
                    promoMessage.error ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-400 font-mono">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant VAT (5%)</span>
                <span className="text-white">${vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Courier Delivery</span>
                <span className="text-white">${deliveryFee}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>VIP Discount ({appliedPromo})</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-800 flex justify-between text-sm font-bold text-white">
                <span className="tracking-wide">Grand Total</span>
                <span className="text-amber-400 font-mono text-base">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={handleOpenCheckout}
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Cyber Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
