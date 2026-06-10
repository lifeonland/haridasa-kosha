 import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CompositionDetailPageContent from './CompositionDetailPageContent';

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const composition = await prisma.composition.findUnique({
    where: { id: params.id },
  });

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
  const composition = await prisma.composition.findUnique({
    where: { id: params.id },
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

  if (!composition) {
    notFound();
  }

  return (
    <CompositionDetailPageContent composition={composition} />
  );
}
