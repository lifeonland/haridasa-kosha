import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const raga = await prisma.raga.upsert({
        where: { name: 'Mohana' },
        update: {},
        create: { name: 'Mohana' },
    });

    const tala = await prisma.tala.upsert({
        where: { name: 'Adi' },
        update: {},
        create: { name: 'Adi' },
    });

    const tag = await prisma.tag.upsert({
        where: { name: 'Bhakti' },
        update: {},
        create: { name: 'Bhakti' },
    });

    const composition = await prisma.composition.findFirst({
        where: { composer: { name: { contains: 'Kanaka' } } }
    });

    if (composition) {
        await prisma.composition.update({
            where: { id: composition.id },
            data: {
                ragaId: raga.id,
                talaId: tala.id,
                tags: {
                    connect: [{ id: tag.id }]
                }
            }
        });
        return NextResponse.json({ message: `Updated composition ${composition.title}` });
    }
    return NextResponse.json({ message: "No Kanaka Dasa composition found." });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
