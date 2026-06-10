'use client';

import Link from 'next/link';
import { Composer } from '@prisma/client';
import { Typography } from '@/components/ui/typography';
import { useLanguage } from '@/components/shared/LanguageContext';

interface ComposerCardProps {
  composer: Composer & { _count?: { compositions: number } };
}

export default function ComposerCard({ composer }: ComposerCardProps) {
  const { t } = useLanguage();

  return (
    <Link href={`/haridasaru/${composer.id}`} className="group block">
      <div className="space-y-6">
        <div className="aspect-[4/5] bg-secondary/50 overflow-hidden relative border border-border/50 transition-all duration-700 group-hover:border-primary/30 rounded-2xl">
          {composer.imageUrl ? (
            <img
              src={composer.imageUrl}
              alt={t(composer.name)}
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center s opacity-20 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-40">
              🙏
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        <div className="space-y-3">
          <Typography variant="small" className="text-primary tracking-[0.2em]">{t('archivalEntry')} No. {composer.id.slice(0,4)}</Typography>
          <Typography variant="h3" className="text-2xl group-hover:text-primary transition-colors duration-500">
            {t(composer.name)}
          </Typography>

          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <Typography variant="muted" className="text-[10px] font-bold tracking-widest">
              {composer._count?.compositions || 0} {t('Compositions')}
            </Typography>
            <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
              {t('open')} &rarr;
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}
