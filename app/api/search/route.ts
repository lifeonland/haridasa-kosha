import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';

    if (!q || q.length < 2) {
      return NextResponse.json({
        composers: [],
        compositions: [],
      });
    }

    const [composers, compositions] = await Promise.all([
      prisma.composer.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { biography: { contains: q, mode: 'insensitive' } },
          ],
        },
        take: 5,
        include: { _count: { select: { compositions: true } } },
      }),
      prisma.composition.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { firstLine: { contains: q, mode: 'insensitive' } },
            { lyrics: { contains: q, mode: 'insensitive' } },
            { raga: { name: { contains: q, mode: 'insensitive' } } },
            { tala: { name: { contains: q, mode: 'insensitive' } } },
          ],
        },
        take: 10,
        include: {
          composer: { select: { name: true } },
          deity: { select: { name: true } },
          raga: { select: { name: true } },
          tala: { select: { name: true } },
        },
      }),
    ]);

    return NextResponse.json({
      query: q,
      composers,
      compositions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
