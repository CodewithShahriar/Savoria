'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight, CreditCard, Banknote, Smartphone, Check, Sparkles } from 'lucide-react';
import { PaymentMethod } from '@/types';

const METROPOLITAN_ZONES = [
  'Downtown Skyline District',
  'Uptown Heights',
  'Embassy Quarter',
  'Riverside Promenade',
  'Financial Plaza',
  'Grand Central Avenue',
  'North Bay Enclave',
  'West End Sector',
  'Lakeview Panorama',
];

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, deliveryFee, vat, discount, total, clearCart, playBeep } = useCart();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zone, setZone] = useState('Downtown Skyline District');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('apple_pay');
  const [submitting, setSubmitting] = useState(false);

  // Digital Gateway Simulation States
  const [showGatewayModal, setShowGatewayModal] = useState(false);
  const [gatewayProcessing, setGatewayProcessing] = useState(false);
  const [gatewaySuccess, setGatewaySuccess] = useState(false);

  // Card input states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isCheckoutOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#06b6d4', '#10b981', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  const executeOrderPlacement = async () => {
    setSubmitting(true);
    try {
      const payload = {
        customer: {
          name,
          phone,
          email,
          zone,
          address,
          notes,
        },
        items: cart,
        paymentMethod,
        discount,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.data) {
        triggerConfetti();
        playBeep('success');
        clearCart();
        setIsCheckoutOpen(false);
        setShowGatewayModal(false);
        router.push(`/track/${data.data.id}`);
      } else {
        alert(data.message || 'Error creating order');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while placing order');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    if (paymentMethod === 'apple_pay' || paymentMethod === 'google_pay') {
      setShowGatewayModal(true);
      setGatewayProcessing(false);
      setGatewaySuccess(false);
    } else {
      executeOrderPlacement();
    }
  };

  const handleAuthorizeDigitalWallet = () => {
    playBeep('click');
    setGatewayProcessing(true);
    setTimeout(() => {
      setGatewayProcessing(false);
      setGatewaySuccess(true);
      playBeep('success');
      setTimeout(() => {
        executeOrderPlacement();
      }, 700);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl glass-panel-glow rounded-3xl p-6 sm:p-8 relative border border-amber-500/30 my-8">
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            256-Bit Encrypted Express Checkout
          </div>
          <h2 className="text-2xl font-bold text-white">Finalize Your Savoria Order</h2>
          <p className="text-gray-400 text-xs mt-1">
            Fill in delivery coordinates to launch instant kitchen dispatch and satellite tracking.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Customer Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              1. Delivery Coordinates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#090d16] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Contact Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#090d16] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Metropolitan District *</label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full bg-[#090d16] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                >
                  {METROPOLITAN_ZONES.map((z) => (
                    <option key={z} value={z} className="bg-[#0c101c] text-white">
                      {z}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="For digital itemized receipt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#090d16] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-300 block mb-1">Specific Address (Building, Suite, Street) *</label>
              <textarea
                required
                rows={2}
                placeholder="e.g. 742 Grand Central Promenade, Penthouse 18B"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#090d16] border border-gray-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              2. Secured Payment Protocol
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Apple Pay */}
              <div
                onClick={() => {
                  playBeep('click');
                  setPaymentMethod('apple_pay');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-white/15 border-white text-white shadow-lg shadow-white/10'
                    : 'bg-[#090d16] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                  Pay
                </div>
                <div>
                  <span className="text-xs font-bold block">Apple Pay</span>
                  <span className="text-[10px] text-gray-400 font-mono">1-Touch Biometric</span>
                </div>
              </div>

              {/* Google Pay */}
              <div
                onClick={() => {
                  playBeep('click');
                  setPaymentMethod('google_pay');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                  paymentMethod === 'google_pay'
                    ? 'bg-blue-600/15 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-[#090d16] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center font-bold text-xs">
                  <span className="text-blue-500">G</span>Pay
                </div>
                <div>
                  <span className="text-xs font-bold block">Google Pay</span>
                  <span className="text-[10px] text-gray-400 font-mono">Instant Checkout</span>
                </div>
              </div>

              {/* Credit / Debit Card */}
              <div
                onClick={() => {
                  playBeep('click');
                  setPaymentMethod('card');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-[#090d16] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <CreditCard className="w-8 h-8 text-amber-400" />
                <div>
                  <span className="text-xs font-bold block">Credit Card</span>
                  <span className="text-[10px] text-gray-400 font-mono">Visa / Master / Amex</span>
                </div>
              </div>

              {/* Direct Concierge Pay (COD) */}
              <div
                onClick={() => {
                  playBeep('click');
                  setPaymentMethod('cod');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                  paymentMethod === 'cod'
                    ? 'bg-emerald-600/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-[#090d16] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <Banknote className="w-8 h-8 text-emerald-400" />
                <div>
                  <span className="text-xs font-bold block">Concierge</span>
                  <span className="text-[10px] text-gray-400 font-mono">Pay On Delivery</span>
                </div>
              </div>
            </div>

            {/* Inline Card Entry Form when Card selected */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-[#070a12] border border-amber-500/20 space-y-3 animate-in fade-in duration-200">
                <span className="text-[11px] font-mono text-amber-300 uppercase block">Card Credentials (Test Simulator)</span>
                <div>
                  <input
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#0c111e] border border-gray-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder-gray-600 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-[#0c111e] border border-gray-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder-gray-600 outline-none text-center"
                  />
                  <input
                    type="password"
                    placeholder="CVC"
                    maxLength={4}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full bg-[#0c111e] border border-gray-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder-gray-600 outline-none text-center"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-black/40 border border-gray-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-400 block font-mono">Grand Total Payable</span>
              <span className="text-2xl font-bold font-mono text-amber-300">
                ${total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>Instant Satellite Telemetry Included</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Encrypting Order Telemetry...
              </span>
            ) : (
              <>
                <span>
                  {paymentMethod === 'apple_pay' && 'Authorize with Apple Pay'}
                  {paymentMethod === 'google_pay' && 'Authorize with Google Pay'}
                  {paymentMethod === 'card' && 'Confirm Payment & Launch Tracker'}
                  {paymentMethod === 'cod' && 'Confirm Concierge Order'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Modern Apple Pay / Google Pay Authorization Simulation Sheet */}
      {showGatewayModal && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#141721] text-white border border-gray-700/80 overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
            {/* Sheet Header */}
            <div className="p-5 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-sm shadow">
                  {paymentMethod === 'apple_pay' ? 'Pay' : 'GPay'}
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">
                    {paymentMethod === 'apple_pay' ? 'Apple Pay' : 'Google Pay'}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">SAVORIA FINE GASTRONOMY</span>
                </div>
              </div>
              <button
                onClick={() => setShowGatewayModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Transaction Amount */}
            <div className="p-6 text-center bg-black/40 border-b border-gray-800/80">
              <span className="text-[11px] font-mono text-gray-400 block uppercase tracking-wider">Total Charge</span>
              <span className="text-3xl font-extrabold font-mono text-white tracking-tight">${total.toLocaleString()}</span>
              <div className="mt-2 text-[11px] text-cyan-400 font-mono flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>Biometric Tokenization Active</span>
              </div>
            </div>

            {/* Card & Details */}
            <div className="p-6 space-y-4 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-gray-800/60 font-mono">
                <span className="text-gray-400">Card</span>
                <span className="text-white font-medium flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  Savoria Titanium Card (•••• 8921)
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800/60 font-mono">
                <span className="text-gray-400">Delivery Vector</span>
                <span className="text-white truncate max-w-[180px]">{address || zone}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800/60 font-mono">
                <span className="text-gray-400">Courier</span>
                <span className="text-emerald-400">Julian Hayes (High-Speed)</span>
              </div>

              {/* Biometric trigger button */}
              <div className="pt-2">
                {gatewaySuccess ? (
                  <div className="w-full py-4 rounded-2xl bg-emerald-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 animate-in zoom-in-90">
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>Authorized & Confirmed</span>
                  </div>
                ) : (
                  <button
                    onClick={handleAuthorizeDigitalWallet}
                    disabled={gatewayProcessing}
                    className="w-full py-4 rounded-2xl bg-white hover:bg-gray-100 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    {gatewayProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Scanning Biometrics...
                      </span>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>{paymentMethod === 'apple_pay' ? 'Double-Click or Touch ID to Pay' : '1-Click Pay with Google'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
