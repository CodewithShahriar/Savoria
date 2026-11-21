import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TableReservation } from '@/types';

export async function GET() {
  try {
    const reservations = db.getReservations();
    return NextResponse.json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reservations', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, email, guests, date, timeSlot, seatingZone, specialRequest } = body;

    if (!customerName || !phone || !date || !timeSlot || !seatingZone) {
      return NextResponse.json(
        { success: false, message: 'All required reservation fields must be provided' },
        { status: 400 }
      );
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const reservationId = `RES-${randomNum}`;

    const newReservation: TableReservation = {
      id: reservationId,
      customerName,
      phone,
      email: email || '',
      guests: Number(guests) || 2,
      date,
      timeSlot,
      seatingZone,
      specialRequest: specialRequest || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    const saved = db.createReservation(newReservation);

    return NextResponse.json({
      success: true,
      message: 'Table reserved successfully at Savoria',
      data: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Reservation failed', error: String(error) },
      { status: 500 }
    );
  }
}
