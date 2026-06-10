'use client';

import { Composer } from '@prisma/client';
import ComposerCard from './ComposerCard';
import Link from 'next/link';

interface FeaturedComposersProps {
  composers: (Composer & { _count?: { compositions: number } })[];
}

export default function FeaturedComposers({ composers }: FeaturedComposersProps) {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="s sm:s font-bold text-foreground mb-2">
              Featured Composers
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover the divine voices of Haridasa tradition, masters of devotional music
            </p>
          </div>
          <Link
            href="/haridasaru"
            className="hidden sm:inline-block px-4 py-2 font-semibold text-accent hover:text-primary transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {composers.map((composer) => (
            <ComposerCard key={composer.id} composer={composer} />
          ))}
        </div>

        <div className="sm:hidden text-center mt-8">
          <Link
            href="/haridasaru"
            className="inline-block px-6 py-2 font-semibold text-accent hover:text-primary transition-colors"
          >
            View All Composers →
          </Link>
        </div>
      </div>
    </section>
  );
}
