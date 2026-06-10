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
    const composition = await prisma.composition.findUnique({
      where: { id: params.id },
      include: {
        composer: true,
        deity: true,
        ankita: true,
        audioFiles: true,
        translations: true,
      },
    });

    if (!composition) {
      return NextResponse.json(
        { error: 'Composition not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(composition);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch composition' },
      { status: 500 }
    );
  }
}
