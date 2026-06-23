import { prisma } from '@/lib/prisma';
import ComposersPageContent from './ComposersPageContent';
import type { Metadata } from 'next';
import { HISTORICAL_COMPOSER_ORDER } from '@/lib/utils';

import { COMPOSERS_PER_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Parampara | The Haridasa Kosha',
  description: 'The lineage of divine wisdom, from Sri Madhvacharya to the modern era.',
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ComposersPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(String(searchParams.page || '1'));
  const search = String(searchParams.search || '');
  const showAll = searchParams.showAll === 'true';

  const searchFilter = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { biography: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : {};

  console.time('PrismaQueries');
  const [totalComposers, compositionsCount, ragaCount, ankitaCount] = await Promise.all([
      prisma.composer.count({ where: searchFilter }),
      prisma.composition.count(),
      prisma.raga.count(),
      prisma.ankita.count()
  ]);
  console.timeEnd('PrismaQueries');

  console.time('ComposerFetch');
  // Fetch paginated composers
  const composers = await prisma.composer.findMany({
    where: searchFilter,
    include: { _count: { select: { compositions: true } }, ankita: true },
    take: COMPOSERS_PER_PAGE,
    skip: (currentPage - 1) * COMPOSERS_PER_PAGE,
  });
  console.timeEnd('ComposerFetch');

  // Sort the paginated result using master historical order
  composers.sort((a, b) => {
    const indexA = HISTORICAL_COMPOSER_ORDER.indexOf(a.id);
    const indexB = HISTORICAL_COMPOSER_ORDER.indexOf(b.id);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  const stats = {
      composers: totalComposers,
      compositions: compositionsCount,
      ragas: ragaCount,
      ankitas: ankitaCount
  };

  return (
    <ComposersPageContent 
        composers={composers} 
        totalComposers={totalComposers} 
        totalPages={Math.ceil(totalComposers / COMPOSERS_PER_PAGE)}
        stats={stats}
        currentPage={currentPage}
    />
  );
}
