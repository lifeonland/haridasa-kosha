'use client';

import CompositionCard from './CompositionCard';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Typography } from './typography';
import { Button } from './button';
import { useLanguage } from '@/components/shared/LanguageContext';

interface Composition {
  id: string;
  title: string;
  firstLine: string;
  composer: { name: string };
  deity: { name: string };
  featured: boolean;
  tags?: { name: string }[];
}

interface FeaturedCompositionsProps {
  compositions: Composition[];
}

export default function FeaturedCompositions({ compositions }: FeaturedCompositionsProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-bold  tracking-[0.24em] text-primary shadow-sm mb-6">
              <Sparkles className="h-3 w-3" />
              {t('featuredEyebrow')}
            </span>
            <Typography variant="h2" className="s sm:s lg:s font-bold tracking-tight text-slate-950 mb-4">
              {t('featuredTitle')}
            </Typography>
            <Typography variant="p" className="text-slate-600 s">
              {t('featuredDesc')}
            </Typography>
          </div>
          <Button variant="outline" className="hidden md:flex rounded-full px-10 border-primary/20 font-bold tracking-widest text-xs hover:bg-primary hover:text-white transition-all duration-500" asChild>
            <Link href="/library" className="flex items-center gap-2">
              {t('viewEntireCollection')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {compositions.map((comp) => (
            <div key={comp.id} className="transition-transform duration-500 hover:-translate-y-2 h-full">
                <CompositionCard
                id={comp.id}
                title={comp.title}
                firstLine={comp.firstLine}
                composerName={comp.composer.name}
                deityName={comp.deity.name}
                featured={comp.featured}
                tags={comp.tags}
                />
            </div>
          ))}
        </div>

        <div className="md:hidden text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full px-10 border-primary/20 font-bold tracking-widest text-xs" asChild>
                <Link href="/library" className="flex items-center gap-2">
                    {t('viewEntireCollection')}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
