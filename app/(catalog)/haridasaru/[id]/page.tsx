import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ComposerDetailPageContent from './CompositionDetailPageContent';

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const composer = await prisma.composer.findUnique({
    where: { id: params.id },
  });

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
  const composer = await prisma.composer.findUnique({
    where: { id: params.id },
    include: {
      ankita: true,
      compositions: {
        include: {
          deity: true,
          raga: true,
          tala: true,
        },
        orderBy: { title: 'asc' },
      },
    },
  });

  if (!composer) {
    notFound();
  }

  return (
    <ComposerDetailPageContent composer={composer} />
  );
}
