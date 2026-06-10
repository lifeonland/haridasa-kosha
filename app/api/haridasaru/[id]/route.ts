import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  props: { params: Params }
) {
  try {
    const params = await props.params;
    const composer = await prisma.composer.findUnique({
      where: { id: params.id },
      include: {
        compositions: {
          include: { deity: true, ankita: true },
        },
        ankita: true,
        _count: { select: { compositions: true } },
      },
    });

    if (!composer) {
      return NextResponse.json(
        { error: 'Composer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(composer);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch composer' },
      { status: 500 }
    );
  }
}
