 import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cache } from 'react';
import CompositionDetailPageContent from './CompositionDetailPageContent';

type Params = Promise<{ id: string }>;

const getComposition = cache(async (id: string) => {
  return prisma.composition.findUnique({
    where: { id },
    include: {
      composer: true,
      deity: true,
      ankita: true,
      raga: true,
      tala: true,
      tags: true,
      audioFiles: true,
      translations: true,
    },
  });
});

export async function generateStaticParams() {
  // Only pre-render the top 20 compositions to keep Vercel build times fast.
  // The rest will be generated on-demand and cached (ISR).
  const compositions = await prisma.composition.findMany({
    select: { id: true },
    take: 20,
  });
  return compositions.map((comp) => ({
    id: comp.id,
  }));
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const composition = await getComposition(params.id);

  if (!composition) {
    return {
      title: 'Composition Not Found | Haridasa Kosha',
    };
  }

  return {
    title: `${composition.title} | Haridasa Kosha`,
    description: composition.firstLine,
  };
}

export default async function CompositionDetailPage(props: {
  params: Params;
}) {
  const params = await props.params;
  const composition = await getComposition(params.id);

  if (!composition) {
    notFound();
  }

  return (
    <CompositionDetailPageContent composition={composition} />
  );
}
