import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const query = searchParams.get('query');
    const dietary = searchParams.get('dietary');

    let menu = db.getMenu();

    if (category && category !== 'all') {
      menu = menu.filter((item) => item.category === category);
    }

    if (dietary && dietary !== 'all') {
      menu = menu.filter((item) => item.dietary === dietary);
    }

    if (query) {
      const q = query.toLowerCase();
      menu = menu.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.bengaliName && item.bengaliName.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ success: true, count: menu.length, data: menu });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve menu items', error: String(error) },
      { status: 500 }
    );
  }
}
