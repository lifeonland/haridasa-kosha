import { prisma } from '@/lib/prisma';
import { HISTORICAL_COMPOSER_ORDER } from '@/lib/utils';
import ParamparaTimeline from './ParamparaTimeline';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parampara | The Haridasa Kosha',
  description: 'The lineage of divine wisdom, from Sri Madhvacharya to the modern era.',
};

export default async function ParamparaPage() {
  const composers = await prisma.composer.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      timeline: true,
    },
  });

  // Sort composers chronologically according to HISTORICAL_COMPOSER_ORDER
  composers.sort((a, b) => {
    const indexA = HISTORICAL_COMPOSER_ORDER.indexOf(a.id);
    const indexB = HISTORICAL_COMPOSER_ORDER.indexOf(b.id);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  return <ParamparaTimeline composers={composers} />;
}

