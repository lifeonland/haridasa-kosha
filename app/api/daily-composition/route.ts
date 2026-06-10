import { NextResponse } from 'next/server';
import { getDailyComposition } from '@/lib/dailyEngagement';

export async function GET() {
  try {
    const daily = await getDailyComposition();
    return NextResponse.json(daily);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
