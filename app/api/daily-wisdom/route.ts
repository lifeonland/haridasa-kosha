import { NextResponse } from 'next/server';
import { getDailyWisdom } from '@/lib/dailyWisdom';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const wisdom = await getDailyWisdom();
    return NextResponse.json(wisdom);
  } catch (error) {
    console.error("Daily Wisdom API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
