'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Order, OrderStatus } from '@/types';
import {
  Compass,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Phone,
  Bike,
  ShieldCheck,
  Flame,
  ChefHat,
  PackageCheck,
  Sparkles,
  RefreshCw,
  MapPin,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STATUS_STAGES: Array<{
  status: OrderStatus;
  title: string;
  icon: any;
  desc: string;
}> = [
  {
    status: 'confirmed',
    title: 'Order Verified',
    icon: CheckCircle2,
    desc: 'Order confirmed and registered in Savoria Central Cloud.',
  },
  {
    status: 'cooking',
    title: 'Master Chef Crafting',
    icon: ChefHat,
    desc: 'Wok-tossing, flame searing, and artisanal seasoning in progress.',
  },
  {
    status: 'quality_check',
    title: 'Thermal Sealed',
    icon: PackageCheck,
    desc: 'Quality inspection passed. Sealed in thermo-lock insulated cyber pack.',
  },
  {
    status: 'on_the_way',
    title: 'Rider In Transit',
    icon: Bike,
    desc: 'Express Cyber Rider is speeding with hot gourmet meal to your door.',
  },
  {
    status: 'delivered',
    title: 'Delivered',
    icon: Sparkles,
    desc: 'Order safely delivered. Enjoy your luxury feast!',
  },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = (params?.id as string)?.toUpperCase();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  // Fetch Order
  const fetchOrder = async () => {
    if (!orderId) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setOrder(json.data);
        setError(null);
      } else {
        setError(json.message || 'Order could not be located');
      }
    } catch {
      setError('Connection to Savoria Satellite lost');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // Auto polling every 8 seconds for live updates
    const interval = setInterval(fetchOrder, 8000);
    return () => clearInterval(interval);
  }, [orderId]);

  // Stage Simulation helper for evaluator/user
  const advanceToNextStatus = async () => {
    if (!order) return;
    const stageOrder: OrderStatus[] = ['confirmed', 'cooking', 'quality_check', 'on_the_way', 'delivered'];
    const currentIndex = stageOrder.indexOf(order.status);
    if (currentIndex >= stageOrder.length - 1) return;

    const nextStatus = stageOrder[currentIndex + 1];
    setUpdating(true);

    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setOrder(data.data);
        if (nextStatus === 'delivered') {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#06b6d4', '#10b981'],
          });
        }
      }
    } catch {
      alert('Error advancing status');
    } finally {
      setUpdating(false);
    }
  };

  const getStageIndex = (status: OrderStatus) => {
    const list: OrderStatus[] = ['confirmed', 'cooking', 'quality_check', 'on_the_way', 'delivered'];
    return list.indexOf(status);
  };

  const currentStageIndex = order ? getStageIndex(order.status) : 0;
  const progressPercent = Math.min(100, Math.round(((currentStageIndex + 1) / STATUS_STAGES.length) * 100));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-cyan-300">Connecting to Savoria Satellite GPS...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center p-4">
        <div className="glass-panel-glow max-w-md w-full p-8 rounded-3xl text-center space-y-4 border border-red-500/30">
          <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
            ✕
          </div>
          <h2 className="text-xl font-bold text-white">Order Not Found</h2>
          <p className="text-xs text-gray-400 font-mono">{error || `No record matching ${orderId}`}</p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-mono text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Savoria Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080d] cyber-grid text-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Restaurant</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrder}
              className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors"
              title="Refresh Telemetry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Quick Advance Button for demo testing */}
            {order.status !== 'delivered' && (
              <button
                onClick={advanceToNextStatus}
                disabled={updating}
                className="px-3.5 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-cyan-950"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Advance Stage (Demo)</span>
              </button>
            )}
          </div>
        </div>

        {/* Header Hero Banner */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Savoria Live Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Order <span className="text-amber-400 font-mono">{order.id}</span>
            </h1>
            <p className="text-xs text-gray-400 font-mono">
              Secured on {new Date(order.createdAt).toLocaleDateString()} at{' '}
              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* ETA Card */}
          <div className="z-10 bg-[#090d16] p-4 rounded-2xl border border-gray-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block font-mono uppercase">
                Estimated Delivery
              </span>
              <span className="text-xl font-bold font-mono text-white">
                {order.status === 'delivered' ? 'Completed 🍽️' : `~${order.estimatedDeliveryMinutes} Minutes`}
              </span>
            </div>
          </div>

          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Progress Pipeline Stepper */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/5 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-widest text-amber-400">
              Cyber Dispatch Pipeline
            </h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              {progressPercent}% Complete
            </span>
          </div>

          {/* Progress Bar Line */}
          <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400 transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Step Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {STATUS_STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isFuture = idx > currentStageIndex;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.status}
                  className={`p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-500/80 shadow-lg shadow-amber-500/10 scale-105'
                      : isPast
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-gray-300'
                      : 'bg-[#090d16]/60 border-gray-900 text-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isCurrent
                          ? 'bg-amber-500 text-black shadow-md shadow-amber-500/40 animate-bounce'
                          : isPast
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-gray-800 text-gray-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono">0{idx + 1}</span>
                  </div>

                  <div>
                    <h5
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-amber-300'
                          : isPast
                          ? 'text-white'
                          : 'text-gray-500'
                      }`}
                    >
                      {stage.title}
                    </h5>
                    <p className="text-[10px] text-gray-400 mt-1 leading-snug line-clamp-2">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Split Grid: Rider & Delivery Address vs Order Items */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Rider Profile & Destination */}
          <div className="md:col-span-5 space-y-6">
            {/* Rider Card */}
            {order.rider && (
              <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block">
                  Assigned Cyber Rider
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white text-xl font-bold">
                    🏍️
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{order.rider.name}</h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{order.rider.bikeNumber}</p>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-mono mt-1">
                      <span>★ {order.rider.rating} Rating</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${order.rider.phone}`}
                  className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Rider ({order.rider.phone})</span>
                </a>
              </div>
            )}

            {/* Live Cyber Satellite Radar Widget */}
            <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Satellite Cyber Radar
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Uplink: 99.4%
                </span>
              </div>

              {/* Radar Circle Scope */}
              <div className="relative w-full aspect-video sm:aspect-square max-h-56 mx-auto rounded-2xl bg-[#03060c] border border-cyan-500/20 flex items-center justify-center overflow-hidden">
                {/* Concentric rings */}
                <div className="absolute w-44 h-44 rounded-full border border-cyan-500/15" />
                <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20" />
                <div className="absolute w-12 h-12 rounded-full border border-cyan-500/25" />
                {/* Crosshairs */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/15" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/15" />

                {/* Rotating Sweeper Line */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none animate-spin"
                  style={{
                    animationDuration: '4s',
                    background: 'conic-gradient(from 0deg, rgba(6,182,212,0.2) 0deg, transparent 60deg, transparent 360deg)',
                  }}
                />

                {/* Point 1: Savoria Flagship */}
                <div className="absolute top-[42%] left-[45%] flex flex-col items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
                  <span className="text-[8px] font-mono text-amber-300 bg-black/80 px-1 rounded mt-0.5 whitespace-nowrap">
                    Savoria HQ
                  </span>
                </div>

                {/* Point 2: Rider in Transit */}
                <div className="absolute top-[55%] left-[58%] flex flex-col items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-ping" />
                  <span className="text-[8px] font-mono text-cyan-300 bg-black/80 px-1 rounded mt-0.5 whitespace-nowrap">
                    Rider Vector
                  </span>
                </div>

                {/* Point 3: Customer Target Zone */}
                <div className="absolute bottom-[20%] right-[24%] flex flex-col items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  <span className="text-[8px] font-mono text-emerald-300 bg-black/80 px-1 rounded mt-0.5 whitespace-nowrap">
                    Dropoff: {order.customer.zone.split(',')[0]}
                  </span>
                </div>
              </div>

              {/* Coordinates Readout */}
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1 border-t border-gray-800">
                <span>COORD: 40.7128° N, 74.0060° W</span>
                <span className="text-cyan-400">SPEED: 34 KM/H</span>
              </div>
            </div>

            {/* Destination Address */}
            <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Destination Telemetry
              </span>
              <div className="flex items-start gap-3 text-xs text-gray-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{order.customer.name}</p>
                  <p className="text-gray-400 font-mono mt-0.5">{order.customer.phone}</p>
                  <p className="text-gray-300 mt-1">{order.customer.address}</p>
                  <p className="text-cyan-400 font-mono mt-0.5">{order.customer.zone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Items & Receipt */}
          <div className="md:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white">
                Dish Manifest ({order.items.length} items)
              </h3>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                Payment: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
              </span>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-black/40 border border-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-800"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.menuItem.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono mt-0.5">
                        <span>Qty: {item.quantity}</span>
                        {item.spiceLevel > 0 && <span>🌶️ Lvl {item.spiceLevel}</span>}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    ${item.itemTotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Billing Breakdown */}
            <div className="space-y-2 pt-4 border-t border-gray-800 text-xs font-mono text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">${order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant VAT (5%)</span>
                <span className="text-white">${order.vat}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Courier Delivery</span>
                <span className="text-white">${order.deliveryFee}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Discount</span>
                  <span>-${order.discount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-800 flex justify-between text-base font-bold text-white">
                <span>Total Paid</span>
                <span className="text-amber-400">${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
