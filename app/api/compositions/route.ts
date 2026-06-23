import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search') || '';
    const composerId = searchParams.get('composer') || '';
    const deityId = searchParams.get('deity') || '';
    const ankitaId = searchParams.get('ankita') || '';
    const ragaId = searchParams.get('raga') || '';
    const talaId = searchParams.get('tala') || '';
    const tagId = searchParams.get('tag') || '';

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' as const } },
        { firstLine: { contains: search, mode: 'insensitive' as const } },
        { lyrics: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    if (composerId) where.composerId = composerId;
    if (deityId) where.deityId = deityId;
    if (ankitaId) where.ankitaId = ankitaId;
    if (ragaId) where.ragaId = ragaId;
    if (talaId) where.talaId = talaId;
    if (tagId) {
      where.tags = {
        some: { id: tagId }
      };
    }

    const [compositions, total] = await Promise.all([
      prisma.composition.findMany({
        where,
        include: {
          composer: { select: { id: true, name: true } },
          deity: { select: { id: true, name: true } },
          ankita: { select: { id: true, name: true } },
          raga: { select: { id: true, name: true } },
          tala: { select: { id: true, name: true } },
          tags: { select: { id: true, name: true } },
          audioFiles: true,
          translations: true,
        },
        take: limit,
        skip: offset,
        orderBy: { title: 'asc' },
      }),
      prisma.composition.count({ where }),
    ]);

    return NextResponse.json({
      data: compositions,
      pagination: {
        limit,
        offset,
        total,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch compositions' },
      { status: 500 }
    );
  }
}
