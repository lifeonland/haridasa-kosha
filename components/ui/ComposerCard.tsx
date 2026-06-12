'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Composer } from '@prisma/client';
import { Typography } from '@/components/ui/typography';
import { useLanguage } from '@/components/shared/LanguageContext';

interface ComposerCardProps {
  composer: Composer & { _count?: { compositions: number } };
}

export default function ComposerCard({ composer }: ComposerCardProps) {
  const { t } = useLanguage();

  return (
    <Link href={`/haridasaru/${composer.id}`} className="group block h-full">
      <div className="flex flex-col h-full gap-4 p-4 rounded-3xl border border-border/50 bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/50 relative">
          {composer.imageUrl ? (
            <Image
              src={composer.imageUrl}
              alt={t(composer.name)}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">🙏</div>
          )}
        </div>

        <div className="flex flex-col flex-grow gap-2 px-1">
          <Typography variant="small" className="text-primary tracking-wider uppercase text-[10px] font-bold">
            {t('archivalEntry')}
          </Typography>
          <Typography variant="h3" className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
            {t(composer.name)}
          </Typography>

          <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
            <Typography variant="muted" className="text-[10px] font-bold tracking-widest">
              {composer._count?.compositions || 0} {t('Compositions')}
            </Typography>
            <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              {t('open')} &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
