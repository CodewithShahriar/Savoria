import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Order, OrderStatus } from '@/types';

export async function GET() {
  try {
    const orders = db.getOrders();
    return NextResponse.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, discount = 0 } = body;

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { success: false, message: 'Customer name, phone, and address are required' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart items cannot be empty' },
        { status: 400 }
      );
    }

    // Calculate subtotal
    const subtotal = items.reduce((acc: number, item: any) => acc + (item.itemTotal || item.menuItem.price * item.quantity), 0);
    const deliveryFee = 5; // Standard express courier delivery ($5)
    const vat = Math.round(subtotal * 0.05); // 5% VAT
    const total = Math.max(0, subtotal + deliveryFee + vat - discount);

    // Random order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `SAV-${randomNum}`;

    const now = new Date();
    const nowTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let transactionId = undefined;
    if (paymentMethod === 'apple_pay') {
      transactionId = `APAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    } else if (paymentMethod === 'google_pay') {
      transactionId = `GPAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    } else if (paymentMethod === 'card') {
      transactionId = `CARD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }

    const newOrder: Order = {
      id: orderId,
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || '',
        address: customer.address,
        zone: customer.zone || 'Downtown Skyline District',
        notes: customer.notes || '',
      },
      items,
      subtotal,
      deliveryFee,
      vat,
      discount,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      transactionId,
      status: 'confirmed',
      createdAt: now.toISOString(),
      estimatedDeliveryMinutes: 30,
      rider: {
        name: 'Julian Hayes',
        phone: '+1 (555) 019-2834',
        bikeNumber: 'Cyber Transit NY-4921',
        rating: 4.98,
      },
      statusTimeline: [
        {
          status: 'confirmed',
          title: 'Order Confirmed',
          description: `Order ${orderId} received & payment secured. Transmitted to kitchen queue.`,
          time: nowTimeStr,
          completed: true,
        },
        {
          status: 'cooking',
          title: 'Kitchen Master Crafting',
          description: 'Head chef is actively preparing and seasoning your dishes.',
          time: undefined,
          completed: false,
        },
        {
          status: 'quality_check',
          title: 'Quality & Thermal Sealed',
          description: 'Multi-point inspection passed & hermetically sealed in thermo packaging.',
          time: undefined,
          completed: false,
        },
        {
          status: 'on_the_way',
          title: 'Cyber Rider En Route',
          description: 'Assigned courier Julian Hayes has picked up your package.',
          time: undefined,
          completed: false,
        },
        {
          status: 'delivered',
          title: 'Delivered & Bon Appétit',
          description: 'Enjoy your gourmet Savoria feast!',
          time: undefined,
          completed: false,
        },
      ],
    };

    const saved = db.createOrder(newOrder);

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      data: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create order', error: String(error) },
      { status: 500 }
    );
  }
}
