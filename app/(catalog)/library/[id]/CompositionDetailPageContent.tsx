'use client';

import { CopyButton } from '@/components/ui/CopyButton';
import Link from 'next/link';
import { useLanguage } from '@/components/shared/LanguageContext';

export default function CompositionDetailPageContent({ composition }: any) {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 py-8 text-sm">
        <Link href="/library" className="text-primary hover:text-primary/80 transition-colors font-medium">
          {t('navLibrary')}
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">{t(composition.title)}</span>
      </div>

      {/* Header */}
      <div className="mb-12 pb-8 border-b border-border/40">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tighter">
          {t(composition.title)}
        </h1>

        {/* Metadata Tags */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'composerLabel', value: t(composition.composer.name), link: `/haridasaru/${composition.composer.id}` },
            { label: 'deityLabel', value: t(composition.deity.name) },
            { label: 'ankitaLabel', value: t(composition.ankita.name) },
            { label: 'ragaLabel', value: composition.raga ? t(composition.raga.name) : 'N/A' },
            { label: 'talaLabel', value: composition.tala ? t(composition.tala.name) : 'N/A' },
            { label: 'tagLabel', value: composition.tags?.length > 0 ? composition.tags.map((tag: any) => t(tag.name)).join(', ') : 'N/A' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/50 text-foreground text-xs font-bold border border-border/50 backdrop-blur-sm">
              <span className="text-muted-foreground font-normal">{t(item.label)}:</span>
              {item.link ? (
                <Link href={item.link} className="text-primary hover:text-primary/80 transition-colors">
                  {item.value}
                </Link>
              ) : (
                <span>{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Column: Lyrics & Transliteration */}
        <div className="space-y-12">
          {/* Lyrics Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">
                {t('kannadaLyrics')}
              </h2>
              <CopyButton text={composition.lyrics} />
            </div>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm leading-relaxed">
              <p className="text-lg text-slate-800 whitespace-pre-wrap font-kannada">
                {composition.lyrics}
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Translations */}
        <div className="space-y-12">
          {composition.translations.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight">
                {t('Compositions')}
              </h2>
              <div className="space-y-8">
                {composition.translations.map((translation: any) => (
                  <div key={translation.id} className="border border-border/40 rounded-[2.5rem] p-8 md:p-12 bg-white shadow-sm transition-all duration-500 hover:shadow-xl">
                    <h3 className="text-sm font-bold text-primary tracking-[0.2em] mb-6">
                      {t('englishTranslation')}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line">{translation.english}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
