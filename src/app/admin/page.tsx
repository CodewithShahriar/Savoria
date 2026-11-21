'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order, OrderStatus, TableReservation } from '@/types';
import {
  ChefHat,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Bike,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Users,
  Calendar,
  Layers,
} from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<TableReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, resRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/reservations'),
      ]);
      const ordersData = await ordersRes.json();
      const resData = await resRes.json();

      if (ordersData.success) setOrders(ordersData.data);
      if (resData.success) setReservations(resData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateOrderStatus = async (orderId: string, nextStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.data : o)));
      }
    } catch {
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-[#06080d] text-gray-100 cyber-grid py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation & Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <ChefHat className="w-4 h-4" />
                <span>SAVORIA CENTRAL DISPATCH • KDS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Kitchen Command Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white text-xs font-mono flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Queue</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
              <span>Gross Sales ($ USD)</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
              ${totalRevenue.toLocaleString()}
            </div>
            <span className="text-[11px] text-gray-500 font-mono">Real-time revenue counter</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
              <span>Active Orders in Kitchen</span>
              <ChefHat className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {activeOrdersCount}
            </div>
            <span className="text-[11px] text-cyan-400 font-mono">Live in-transit & wok queue</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
              <span>Table Reservations</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {reservations.length}
            </div>
            <span className="text-[11px] text-gray-500 font-mono">Confirmed bookings</span>
          </div>
        </div>

        {/* View Switcher & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                activeTab === 'orders'
                  ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20'
                  : 'glass-panel text-gray-400 hover:text-white'
              }`}
            >
              Live Orders Queue ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                activeTab === 'reservations'
                  ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20'
                  : 'glass-panel text-gray-400 hover:text-white'
              }`}
            >
              Table Reservations ({reservations.length})
            </button>
          </div>

          {activeTab === 'orders' && (
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['all', 'confirmed', 'cooking', 'quality_check', 'on_the_way', 'delivered'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase whitespace-nowrap transition-all ${
                    statusFilter === st
                      ? 'bg-gray-800 text-amber-300 border border-amber-500/40'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Orders Queue View */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {loading ? (
              <div className="py-20 text-center font-mono text-xs text-gray-400">
                Fetching active kitchen stream...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="glass-panel p-12 rounded-3xl text-center text-gray-500 font-mono text-xs">
                No orders currently in this status bracket.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="glass-panel rounded-3xl p-6 border border-white/5 space-y-4 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                        <Link
                          href={`/track/${order.id}`}
                          className="font-mono text-sm font-bold text-amber-400 hover:underline"
                        >
                          {order.id}
                        </Link>
                        <span
                          className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase border ${
                            order.status === 'delivered'
                              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                              : order.status === 'on_the_way'
                              ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                              : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                          }`}
                        >
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Customer Info */}
                      <div className="text-xs space-y-0.5">
                        <p className="font-bold text-white">{order.customer.name}</p>
                        <p className="font-mono text-gray-400">{order.customer.phone}</p>
                        <p className="text-gray-400 text-[11px] truncate">{order.customer.address}</p>
                        <p className="text-cyan-400 text-[11px] font-mono">{order.customer.zone}</p>
                      </div>

                      {/* Items Preview */}
                      <div className="bg-[#090d16] p-3 rounded-2xl border border-gray-900 space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-xs text-gray-300">
                            <span>
                              {item.quantity}x {item.menuItem.name}
                            </span>
                            <span className="font-mono text-gray-400">${item.itemTotal}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                        <span>Payment: {order.paymentMethod.toUpperCase()}</span>
                        <span className="text-amber-300 font-bold">${order.total}</span>
                      </div>
                    </div>

                    {/* Status Advance Controls */}
                    <div className="pt-3 border-t border-gray-800 space-y-2">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block">
                        Advance Stage:
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cooking')}
                            disabled={updatingId === order.id}
                            className="col-span-2 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl"
                          >
                            🍳 Start Cooking
                          </button>
                        )}
                        {order.status === 'cooking' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'quality_check')}
                            disabled={updatingId === order.id}
                            className="col-span-2 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 rounded-xl"
                          >
                            🛡️ Mark Quality Sealed
                          </button>
                        )}
                        {order.status === 'quality_check' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'on_the_way')}
                            disabled={updatingId === order.id}
                            className="col-span-2 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-xl"
                          >
                            🏍️ Dispatch Rider
                          </button>
                        )}
                        {order.status === 'on_the_way' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            disabled={updatingId === order.id}
                            className="col-span-2 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 rounded-xl"
                          >
                            ✅ Mark Delivered
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <span className="col-span-2 text-center text-emerald-400 font-mono py-1.5 text-xs">
                            ✓ Order Fulfilled
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reservations View */}
        {activeTab === 'reservations' && (
          <div className="glass-panel rounded-3xl p-6 border border-white/5 overflow-x-auto">
            {reservations.length === 0 ? (
              <p className="text-center py-12 text-gray-500 font-mono text-xs">
                No table bookings yet.
              </p>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Guest Name</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Party Size</th>
                    <th className="py-3 px-4">Zone</th>
                    <th className="py-3 px-4">Date & Slot</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-gray-300">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-white/5">
                      <td className="py-3.5 px-4 text-amber-400 font-bold">{res.id}</td>
                      <td className="py-3.5 px-4 font-sans text-white">{res.customerName}</td>
                      <td className="py-3.5 px-4 text-gray-400">{res.phone}</td>
                      <td className="py-3.5 px-4">{res.guests} Guests</td>
                      <td className="py-3.5 px-4 text-cyan-400">{res.seatingZone}</td>
                      <td className="py-3.5 px-4 text-white">
                        {res.date} • {res.timeSlot}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px]">
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
