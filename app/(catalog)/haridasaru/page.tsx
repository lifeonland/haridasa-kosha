import { prisma } from '@/lib/prisma';
import ComposersPageContent from './ComposersPageContent';
import type { Metadata } from 'next';
import { HISTORICAL_COMPOSER_ORDER } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

import { COMPOSERS_PER_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Parampara | The Haridasa Kosha',
  description: 'The lineage of divine wisdom, from Sri Madhvacharya to the modern era.',
};

const getGlobalStats = unstable_cache(
  async () => {
    const [compositionsCount, ragaCount, ankitaCount] = await Promise.all([
      prisma.composition.count(),
      prisma.raga.count(),
      prisma.ankita.count(),
    ]);
    return { compositionsCount, ragaCount, ankitaCount };
  },
  ['global-archive-stats-v1'],
  { revalidate: 3600, tags: ['metadata'] }
);

export default async function ComposersPage() {
  console.time('PrismaQueries');
  const [totalComposers, globalStats] = await Promise.all([
      prisma.composer.count(),
      getGlobalStats()
  ]);
  const { compositionsCount, ragaCount, ankitaCount } = globalStats;
  console.timeEnd('PrismaQueries');

  console.time('ComposerFetch');
  // Fetch all composers for static generation
  const composers = await prisma.composer.findMany({
    include: { _count: { select: { compositions: true } }, ankita: true },
    take: 100, // all of them
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
        currentPage={1}
    />
  );
}
