import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search') || '';

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { biography: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [composers, total] = await Promise.all([
      prisma.composer.findMany({
        where,
        include: { _count: { select: { compositions: true } } },
        take: limit,
        skip: offset,
        orderBy: { name: 'asc' },
      }),
      prisma.composer.count({ where }),
    ]);

    return NextResponse.json({
      data: composers,
      pagination: {
        limit,
        offset,
        total,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch composers' },
      { status: 500 }
    );
  }
}
