import { prisma } from '@/lib/prisma';
import ComposersPageContent from './ComposersPageContent';
import type { Metadata } from 'next';

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

  const [totalComposers, compositionsCount, ragaCount, ankitaCount] = await Promise.all([
      prisma.composer.count({ where: searchFilter }),
      prisma.composition.count(),
      prisma.raga.count(),
      prisma.ankita.count()
  ]);

  // Define custom historical order
  const historicalOrder = [
    'madhwacharya', 'narahari-tirtha', 'sripadaraja', 'vyasatirtha', 'vadiraja-tirtha',
    'purandara-dasa', 'kanaka-dasa', 'vijaya-dasa', 'gopala-dasa',
    'jagannatha-dasa', 'pranesha-dasa', 'venugopala-dasa', 'mohana-dasa',
    'srinivasa-dasa', 'subbanna-dasa', 'lakshmipati-dasa', 'madhwapati-dasa',
    'raghavendra-dasa', 'satyabodha-dasa', 'venkatesha-dasa', 'narahari-dasa',
    'achyuta-dasa', 'govinda-dasa', 'harapanahalli-bhimavva', 'helavanakatte-giriyamma',
    'ugabhoga-narayana-dasa'
  ];

  // Fetch all composers
  const allComposers = await prisma.composer.findMany({
    where: searchFilter,
    include: { _count: { select: { compositions: true } }, ankita: true },
  });

  console.log("DEBUG: totalComposers (DB count):", totalComposers);
  console.log("DEBUG: allComposers.length (Fetched):", allComposers.length);

  // Custom sort: Use historical order, then alphabetical for any remaining
  const composers = allComposers.sort((a, b) => {
    const indexA = historicalOrder.indexOf(a.id);
    const indexB = historicalOrder.indexOf(b.id);

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
        stats={stats}
    />
  );
}
