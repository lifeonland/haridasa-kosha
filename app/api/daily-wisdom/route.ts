import { NextResponse, NextRequest } from 'next/server';
import { getDailyWisdom } from '@/lib/dailyWisdom';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');
    const date = dateParam ? new Date(dateParam) : undefined;
    
    const wisdom = await getDailyWisdom(date);
    return NextResponse.json(wisdom);
  } catch (error) {
    console.error("Daily Wisdom API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
