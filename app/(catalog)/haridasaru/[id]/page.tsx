import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cache } from 'react';
import ComposerDetailPageContent from './CompositionDetailPageContent';

type Params = Promise<{ id: string }>;

const getComposer = cache(async (id: string) => {
  return prisma.composer.findUnique({
    where: { id },
    include: {
      ankita: true,
      compositions: {
        include: {
          deity: true,
          raga: true,
          tala: true,
          translations: true,
        },
        orderBy: { title: 'asc' },
      },
    },
  });
});

export async function generateStaticParams() {
  const composers = await prisma.composer.findMany({
    select: { id: true },
  });
  return composers.map((comp) => ({
    id: comp.id,
  }));
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const composer = await getComposer(params.id);

  if (!composer) {
    return {
      title: 'Composer Not Found | The Haridasa Kosha',
    };
  }

  return {
    title: `${composer.name} | The Haridasa Kosha`,
    description: composer.biography || '',
  };
}

export default async function ComposerDetailPage(props: {
  params: Params;
}) {
  const params = await props.params;
  const composer = await getComposer(params.id);

  if (!composer) {
    notFound();
  }

  return (
    <ComposerDetailPageContent composer={composer} />
  );
}
