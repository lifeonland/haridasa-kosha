import { prisma } from '@/lib/prisma';
import CompositionsPageContent from './CompositionsPageContent';
import type { Metadata } from 'next';

import { COMPOSITIONS_PER_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Compositions | Haridasa Kosha',
  description: 'Browse all Haridasa compositions',
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CompositionsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(String(searchParams.page || '1'));
  const search = String(searchParams.search || '');
  const composer = String(searchParams.composer || '');
  const deity = String(searchParams.deity || '');
  const ankita = String(searchParams.ankita || '');
  const raga = String(searchParams.raga || '');
  const tala = String(searchParams.tala || '');
  const tag = String(searchParams.tag || '');

  const skip = (currentPage - 1) * COMPOSITIONS_PER_PAGE;

  // Build search filter
  const searchFilter: any = {};

  if (search) {
    searchFilter.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { firstLine: { contains: search, mode: 'insensitive' } },
      { lyrics: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (composer) searchFilter.composerId = composer;
  if (deity) searchFilter.deityId = deity;
  if (ankita) searchFilter.ankitaId = ankita;
  if (raga) searchFilter.ragaId = raga;
  if (tala) searchFilter.talaId = tala;
  if (tag) {
    searchFilter.tags = {
      some: { id: tag }
    };
  }

  // Fetch data in parallel
  const [
    totalCompositions,
    compositions,
    allComposers,
    allDeities,
    allAnkitas,
    allRagas,
    allTalas,
    allTags,
    composerCount,
    ragaCount,
    ankitaCount
  ] = await Promise.all([
    prisma.composition.count({ where: searchFilter }),
    prisma.composition.findMany({
      where: searchFilter,
      include: {
        composer: { select: { name: true } },
        deity: { select: { name: true } },
        raga: { select: { name: true } },
        tala: { select: { name: true } },
      },
      skip,
      take: COMPOSITIONS_PER_PAGE,
      orderBy: { title: 'asc' },
    }),
    prisma.composer.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.deity.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.ankita.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.raga.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.tala.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.composer.count(),
    prisma.raga.count(),
    prisma.ankita.count()
  ]);

  console.log("DEBUG: totalCompositions:", totalCompositions);
  console.log("DEBUG: compositions.length:", compositions.length);
  
  const uniqueByName = (items: Array<{ id: string; name: string }>) => 
    Array.from(new Map(items.map(item => [item.name.toLowerCase().trim(), item])).values());

  const totalPages = Math.ceil(totalCompositions / COMPOSITIONS_PER_PAGE);

  return (
    <CompositionsPageContent 
        compositions={compositions}
        totalCompositions={totalCompositions}
        totalPages={totalPages}
        currentPage={currentPage}
        search={search}
        composer={composer}
        deity={deity}
        ankita={ankita}
        raga={raga}
        tala={tala}
        tag={tag}
        composers={uniqueByName(allComposers)}
        deities={uniqueByName(allDeities)}
        ankitas={uniqueByName(allAnkitas)}
        ragas={uniqueByName(allRagas)}
        talas={uniqueByName(allTalas)}
        tags={uniqueByName(allTags)}
        composerCount={composerCount}
        ragaCount={ragaCount}
        ankitaCount={ankitaCount}
    />
  );
}
