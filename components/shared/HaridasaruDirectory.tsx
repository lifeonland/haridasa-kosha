'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Typography } from "@/components/ui/typography";
import { useLanguage } from './LanguageContext';

const composerOverrides: Record<string, { displayName: string; id: string; imageUrl?: string; biography?: string; timeline?: string }> = {
  'Achyuta Dasa': {
    displayName: 'narahariTirtharu',
    id: 'narahari-tirtha',
    imageUrl: '/assets/webp/narahari.webp',
    biography: 'narahariTirthaDesc',
    timeline: '1243–1333',
  },
  'Achyuta Dasaru': {
    displayName: 'narahariTirtharu',
    id: 'narahari-tirtha',
    imageUrl: '/assets/webp/narahari.webp',
    biography: 'narahariTirthaDesc',
    timeline: '1243–1333',
  },
  'Gopala Dasa': {
    displayName: 'sripadarajaru',
    id: 'sripadaraja',
    imageUrl: '/assets/webp/sripadaraja.webp',
    biography: 'sripadarajaDesc',
    timeline: '1404–1502',
  },
  'Gopala Dasaru': {
    displayName: 'sripadarajaru',
    id: 'sripadaraja',
    imageUrl: '/assets/webp/sripadaraja.webp',
    biography: 'sripadarajaDesc',
    timeline: '1404–1502',
  },
  'Govinda Dasa': {
    displayName: 'vyasatirthaName',
    id: 'vyasatirtha',
    imageUrl: '/assets/webp/vyasarajaru.webp',
    biography: 'vyasatirthaDesc',
    timeline: '1460–1539',
  },
  'Govinda Dasaru': {
    displayName: 'vyasatirthaName',
    id: 'vyasatirtha',
    imageUrl: '/assets/webp/vyasarajaru.webp',
    biography: 'vyasatirthaDesc',
    timeline: '1460–1539',
  },
  'Purandara Dasaru': {
    displayName: 'purandaraDasaru',
    id: 'purandara-dasa',
    imageUrl: '/assets/webp/purandaradasaru.webp',
    biography: 'purandaraDasaDesc',
    timeline: '1484–1564',
  },
  'purandara-dasa': {
    displayName: 'purandaraDasaru',
    id: 'purandara-dasa',
    imageUrl: '/assets/webp/purandaradasaru.webp',
    biography: 'purandaraDasaDesc',
    timeline: '1484–1564',
  },
  'Kanaka Dasa': {
    displayName: 'kanakaDasaru',
    id: 'kanaka-dasa',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Kanakadasa_art.jpg',
    biography: 'kanakaDasaDesc',
    timeline: '1509–1609',
  },
  'kanaka-dasa': {
    displayName: 'kanakaDasaru',
    id: 'kanaka-dasa',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Kanakadasa_art.jpg',
    biography: 'kanakaDasaDesc',
    timeline: '1509–1609',
  },
  'Helavanakatte Giriyamma': {
    displayName: 'kanakaDasaru',
    id: 'kanaka-dasa',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Kanakadasa_art.jpg',
    biography: 'kanakaDasaDesc',
    timeline: '1509–1609',
  },
};

function getComposerDisplay(dasaru: any) {
  const override = composerOverrides[dasaru.name] || composerOverrides[dasaru.id];
  return override
    ? {
        ...dasaru,
        id: override.id,
        name: override.displayName,
        imageUrl: override.imageUrl ?? dasaru.imageUrl,
        biography: override.biography ?? dasaru.biography,
        timeline: override.timeline ?? dasaru.timeline,
      }
    : dasaru;
}

export default function HaridasaruDirectory() {
  const [haridasaru, setHaridasaru] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetch('/api/haridasaru?limit=6')
      .then(res => res.json())
      .then(res => {
        setHaridasaru(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Typography variant="muted" className="py-12 text-center">{t('loading')}</Typography>;
  if (haridasaru.length === 0) return null;

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-5 snap-x snap-mandatory">
      {haridasaru.map((dasaru) => {
        const displayDasaru = getComposerDisplay(dasaru);

        return (
          <Link key={dasaru.id} href={`/haridasaru/${displayDasaru.id}`} className="group block snap-start">
            <article className="w-[18rem] sm:w-[20rem] overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-2xl">
              <div className="h-1 w-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-80" />

              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1.2rem] border border-white/80 bg-gradient-to-br from-primary/15 via-white to-secondary/40 p-1 shadow-inner">
                  {displayDasaru.imageUrl ? (
                    <img
                      src={displayDasaru.imageUrl}
                      alt={t(displayDasaru.name)}
                      className="h-full w-full rounded-[1rem] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-[1rem] bg-secondary/60 text-primary/80">🙏</div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <Typography variant="h3" className="truncate s font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {t(displayDasaru.name)}
                  </Typography>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-primary">
                      {t('haridasa')}
                    </span>
                    <Typography variant="muted" className="text-[11px] tracking-[0.18em] text-muted-foreground/80">
                      {t(dasaru.timeline) || t('historical')}
                    </Typography>
                  </div>
                </div>
              </div>

              <Typography variant="p" className="mt-4 line-clamp-3 s leading-6 text-foreground/70">
                {t(displayDasaru.biography) || t('defaultBio')}
              </Typography>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-4 s text-muted-foreground">
                <span>{t('exploreProfile')}</span>
                <span className="font-semibold text-primary transition-transform duration-300 group-hover:translate-x-0.5">{t('open')} →</span>
              </div>
            </article>
          </Link>
        );
      })}
      </div>
    </div>
  );
}
