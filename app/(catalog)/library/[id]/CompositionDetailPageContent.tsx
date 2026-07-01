'use client';

import { CopyButton } from '@/components/ui/CopyButton';
import Link from 'next/link';
import { useLanguage } from '@/components/shared/LanguageContext';
import { getComposerTranslationKey } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Sparkles } from 'lucide-react';

export default function CompositionDetailPageContent({ composition }: any) {
  const { t, lang } = useLanguage();
  
  // Localized toggles that default to the user's preferred settings
  const [lyricsLang, setLyricsLang] = useState<'KN' | 'EN'>('KN');
  const [translationLang, setTranslationLang] = useState<'KN' | 'EN'>('EN');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 py-8 text-sm">
        <Link href="/library" className="text-primary hover:text-primary/80 transition-colors font-medium">
          {t('navLibrary')}
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">{composition.title}</span>
      </div>

      {/* Header */}
      <div className="mb-12 pb-8 border-b border-border/40">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tighter">
          {composition.title}
        </h1>

            {/* Metadata Tags */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'composerLabel', value: t(getComposerTranslationKey(composition.composer.id)), link: `/haridasaru/${composition.composer.id}`, color: "bg-slate-100 text-slate-700 border-slate-200" },
            { label: 'deityLabel', value: t(composition.deity.name), color: "bg-amber-50 text-amber-700 border-amber-100" },
            { label: 'ankitaLabel', value: t(composition.ankita.name), color: "bg-rose-50 text-rose-700 border-rose-100" },
            { label: 'ragaLabel', value: composition.raga ? t(composition.raga.name) : 'N/A', color: composition.raga?.name === 'Stotra' ? "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100" : "bg-indigo-50 text-indigo-700 border-indigo-100" },
            { label: 'talaLabel', value: composition.tala ? t(composition.tala.name) : 'N/A', color: composition.tala?.name === 'Chanted' ? "bg-cyan-50 text-cyan-700 border-cyan-100" : "bg-emerald-50 text-emerald-700 border-emerald-100" },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-2 px-5 py-2 rounded-full border ${item.color} text-xs font-bold shadow-sm backdrop-blur-sm`}>
              <span className="opacity-70 font-normal">{t(item.label)}:</span>
              {item.link ? (
                <Link href={item.link} className="hover:underline transition-all">
                  {item.value}
                </Link>
              ) : (
                <span>{item.value}</span>
              )}
            </div>
          ))}
          {/* Render Tags */}
          {composition.tags.map((tag: any) => (
            <div key={tag.id} className="flex items-center gap-2 px-5 py-2 rounded-full border bg-violet-50 text-violet-700 border-violet-100 text-xs font-bold shadow-sm backdrop-blur-sm">
                <span className="opacity-70 font-normal">{t('tag')}:</span>
                <span>{t(tag.name)}</span>
            </div>
          ))}
        </div>
      </div>

      {composition.id === 'vyasatirtha-29' && (
        <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm">
          <div className="flex gap-3">
            <div className="text-amber-500 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-amber-900 font-bold mb-1">
                ಗಮನಿಸಿ: ಈ ಕೀರ್ತನೆಯನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಪುರಂದರದಾಸರ ರಚನೆ ಎಂದು ಹಾಡಲಾಗುತ್ತದೆ, ಕೆಲವು ಕಡೆ ವ್ಯಾಸರಾಜರ ಅಂಕಿತದಲ್ಲೂ ಉಲ್ಲೇಖವಿದೆ.
              </p>
              <p className="text-sm text-amber-800">
                Note: This kirtana is generally sung as a composition of Purandara Dasa, but in some traditions, it is also referenced with Vyasaraja's ankita.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 py-2 px-4 bg-amber-50/50 border border-amber-100/50 rounded-lg flex items-center gap-2 shadow-sm max-w-fit">
        <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        <p className="text-[11px] text-amber-800/80 font-medium">
          <strong className="text-amber-900 font-semibold">AI Generated:</strong> Translations may contain inaccuracies and lack traditional scholarly depth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left Column: Lyrics & Transliteration */}
        <section className="space-y-8">
            <div className="flex items-center justify-between min-h-[3rem]">
              <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-4">
                {lyricsLang === 'KN' ? t('kannadaLyrics') : 'English Transliteration'}
                <div className="flex bg-slate-100 p-1 rounded-full text-xs font-normal">
                  <button onClick={() => setLyricsLang('KN')} className={`px-3 py-1 rounded-full transition-all ${lyricsLang === 'KN' ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>KN</button>
                  <button onClick={() => setLyricsLang('EN')} className={`px-3 py-1 rounded-full transition-all ${lyricsLang === 'EN' ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>EN</button>
                </div>
              </h2>
              <CopyButton text={lyricsLang === 'KN' ? composition.lyrics : composition.transliteration} />
            </div>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300 leading-relaxed">
              <p className={`text-lg text-slate-800 whitespace-pre-wrap ${lyricsLang === 'KN' ? 'font-kannada' : ''}`}>
                {lyricsLang === 'KN' ? composition.lyrics : composition.transliteration}
              </p>
            </div>
        </section>

        {/* Right Column: Translations */}
        {composition.translations.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center justify-between min-h-[3rem]">
                <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-4">
                  {t('translation')}
                  <div className="flex bg-slate-100 p-1 rounded-full text-xs font-normal">
                    <button onClick={() => setTranslationLang('EN')} className={`px-3 py-1 rounded-full transition-all ${translationLang === 'EN' ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>EN</button>
                    <button onClick={() => setTranslationLang('KN')} className={`px-3 py-1 rounded-full transition-all ${translationLang === 'KN' ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>KN</button>
                  </div>
                </h2>
              </div>
              <div className="space-y-8">
                {composition.translations.map((translation: any) => (
                  <div key={translation.id} className="border border-border/40 rounded-[2.5rem] p-8 md:p-12 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                    <AnimatePresence mode="wait">
                      {translationLang === 'EN' && (
                        <motion.div key="en" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                            <h3 className="text-xs font-bold text-primary tracking-[0.2em] mb-3 uppercase">
                                {t('englishTranslation')}
                            </h3>
                            <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
                                {translation.english}
                            </p>
                        </motion.div>
                      )}
                      {translationLang === 'KN' && (
                        <motion.div key="kn" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                            <div className="flex flex-col gap-4 mb-5">
                              <h3 className="text-xs font-bold text-primary tracking-[0.2em] uppercase">
                                  {t('kannadaMeaning')}
                              </h3>
                            </div>
                            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line font-kannada">
                                {translation.kannadaMeaning || 'ಅನುವಾದ ಲಭ್ಯವಿಲ್ಲ'}
                            </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
        )}
      </div>
    </div>
  );
}
