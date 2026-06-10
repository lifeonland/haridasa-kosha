import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [compositions, composers, ragas, ankitas] = await Promise.all([
      prisma.composition.count(),
      prisma.composer.count(),
      prisma.raga.count(),
      prisma.ankita.count(),
    ]);

    return NextResponse.json({
      compositions,
      composers,
      ragas,
      ankitas
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
