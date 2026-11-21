import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { OrderStatus } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = db.getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: `Order with ID ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error retrieving order', error: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses: OrderStatus[] = [
      'confirmed',
      'cooking',
      'quality_check',
      'on_the_way',
      'delivered',
      'cancelled',
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid order status specified' },
        { status: 400 }
      );
    }

    const updated = db.updateOrderStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: `Order ${id} could not be found to update` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Order status changed to ${status}`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error updating order', error: String(error) },
      { status: 500 }
    );
  }
}
