'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Heart, 
  History, 
  Library,
  Feather,
  Quote,
  Music,
  Globe,
  Zap
} from 'lucide-react';

import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import DeityDirectory from '@/components/shared/DeityDirectory';
import HaridasaruDirectory from '@/components/shared/HaridasaruDirectory';
import Hero from '@/components/ui/Hero';
import FeatureBentoGrid from '@/components/home/FeatureBentoGrid';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';
import { useLanguage } from '@/components/shared/LanguageContext';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

import { 
  FcClock, 
  FcReadingEbook, 
  FcLibrary, 
  FcConferenceCall, 
  FcMusic, 
  FcGlobe,
  FcIdea,
  FcVoicePresentation,
  FcLike,
  FcKey,
  FcPortraitMode
} from 'react-icons/fc';

const quickStartItems = [
  {
    title: 'paramparaTitle',
    text: 'paramparaDesc',
    icon: <FcClock className="h-6 w-6" />,
  },
  {
    title: 'archiveTitle',
    text: 'archiveDesc',
    icon: <FcReadingEbook className="h-6 w-6" />,
  },
  {
    title: 'scholarlyTitle',
    text: 'scholarlyDesc',
    icon: <FcLibrary className="h-6 w-6" />,
  },
];

const siteHighlights = [
  {
    title: 'historicalAuthenticity',
    text: 'historicalDesc',
    icon: <FcConferenceCall className="h-7 w-7" />,
  },
  {
    title: 'musicalHeritage',
    text: 'musicalHeritageDesc',
    icon: <FcMusic className="h-7 w-7" />,
  },
  {
    title: 'universalAccess',
    text: 'universalAccessDesc',
    icon: <FcGlobe className="h-7 w-7" />,
  },
];

function GlassSectionHeader({
  eyebrow,
  title,
  description,
  variant = 'center',
  icon = <FcIdea className="h-4 w-4" />,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  variant?: 'center' | 'left';
  icon?: React.ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <div className={`mx-auto max-w-5xl rounded-[3.5rem] border border-slate-100/50 bg-white/95 px-6 py-8 shadow-xl backdrop-blur-xl sm:px-10 sm:py-10 ${variant === 'center' ? 'text-center' : 'text-left'}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-bold tracking-[0.3em] text-primary shadow-sm mb-6 uppercase">
        {icon}
        {t(eyebrow)}
      </span>
      <Typography variant="h2" className="mt-6 font-bold tracking-tight text-3xl md:text-4xl">
        {t(title)}
      </Typography>
      {description ? (
        <Typography variant="lead" className={`mt-5 max-w-3xl text-slate-600 ${variant === 'center' ? 'mx-auto' : ''}`}>
          {t(description)}
        </Typography>
      ) : null}
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<{
      compositions: number | null,
      composers: number | null,
      ragas: number | null,
      ankitas: number | null
  }>({ compositions: null, composers: null, ragas: null, ankitas: null });
  const [shuffledItems, setShuffledItems] = useState(quickStartItems);

  useEffect(() => {
    fetch('/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(() => {});
    
    // Shuffle logic on mount
    const shuffled = [...quickStartItems].sort(() => 0.5 - Math.random());
    setShuffledItems(shuffled);
  }, []);

  return (
    <main className="min-h-screen bg-[#fcfaf7] selection:bg-primary/20 selection:text-primary relative pb-24">
...
      {/* Universal Page Background Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <Image 
            src="/assets/webp/hero-bg.webp" 
            alt="Page Background" 
            fill
            sizes="100vw"
            className="object-cover opacity-[0.4]" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcfaf7]/10 to-[#fcfaf7]/80" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30" />
      </div>

      <div className="relative z-10">
          <Hero stats={stats} />
      </div>

      <div className="relative z-20 -mt-8 mb-16">
          <FeatureBentoGrid />
      </div>

      <Section id="about" spacing="lg" className="relative z-10 mt-4">
        <Container className="relative">
          <RevealOnScroll>
            <GlassSectionHeader
              eyebrow="missionEyebrow"
              title="missionTitle"
              description="missionDesc"
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
              <div className="h-full rounded-[2.5rem] border border-slate-100/50 bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 p-4">
                        <FcIdea className="h-6 w-6" />
                    </div>
                    <Typography variant="h3" className="font-bold">{t('livingTradition')}</Typography>
                </div>
                <Typography variant="lead" className="mt-6 max-w-2xl text-slate-600 leading-relaxed text-base">
                  {t('livingTraditionDesc')}
                </Typography>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { text: 'foundations', icon: <FcLibrary className="h-4 w-4" /> },
                    { text: 'verifiedKeertanas', icon: <FcVoicePresentation className="h-4 w-4" /> },
                    { text: 'discoverStories', icon: <FcLike className="h-4 w-4" /> },
                    { text: 'studyStructures', icon: <FcMusic className="h-4 w-4" /> },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-4 rounded-3xl border border-slate-100/50 bg-white/80 p-5 text-sm leading-relaxed text-slate-700 shadow-sm transition hover:bg-white">
                      <div className="mt-0.5">{item.icon}</div>
                      {t(item.text)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2 lg:content-start">
                {shuffledItems.map((item, i) => (
                  <div key={item.title} className="group rounded-3xl border border-slate-100/50 bg-white/90 p-5 shadow-lg backdrop-blur-xl transition flex flex-col items-center text-center">
                    <div className="mb-3 inline-flex rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition group-hover:scale-110">
                        {item.icon}
                    </div>
                    <Typography variant="h4" className="font-bold text-base">{t(item.title)}</Typography>
                    <Typography variant="p" className="mt-2 text-xs leading-relaxed text-slate-600">
                      {t(item.text)}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {['Vyasa Kuta', 'Dasa Kuta', 'Udupi Krishna', 'Vittala Keertana', 'Haridasa Namavali'].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-3 text-[11px] font-bold text-slate-600 shadow-sm transition hover:text-primary">
                  {t(item)}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Dynamic Statistics Bar */}
      <section className="bg-white/90 backdrop-blur-xl border-y border-slate-100/50 py-10 relative z-10">
            <Container className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                <div><div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter">{stats?.compositions !== null ? stats.compositions.toLocaleString() + '+' : '...'}</div><div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{t('statsCompositions')}</div></div>
                <div><div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter">{stats?.composers !== null ? stats.composers.toLocaleString() + '+' : '...'}</div><div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{t('statsHaridasas')}</div></div>
                <div><div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter">{stats?.ragas !== null ? stats.ragas.toLocaleString() + '+' : '...'}</div><div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{t('statsRagas')}</div></div>
                <div><div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter">{stats?.ankitas !== null ? stats.ankitas.toLocaleString() + '+' : '...'}</div><div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{t('statsAnkitas')}</div></div>
            </Container>
      </section>

      <Section spacing="lg" className="relative z-10 border-t border-slate-100/50">
        <Container>
          <RevealOnScroll>
            <GlassSectionHeader
              eyebrow="keyFeatures"
              title="structuredPath"
              description="pathDesc"
              icon={<FcKey className="h-4 w-4" />}
            />
            
            <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-20">
              <div className="flex gap-8 snap-x snap-mandatory">
                {siteHighlights.map((item) => (
                  <motion.div 
                    key={item.title} 
                    whileHover={{ scale: 1.02 }}
                    className="group rounded-[2rem] border border-slate-100/50 bg-white/90 p-8 shadow-xl backdrop-blur-xl transition w-[18rem] sm:w-[22rem] snap-start shrink-0 flex flex-col items-center text-center"
                  >
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <Typography variant="h4" className="text-xl font-bold">{t(item.title)}</Typography>
                    <Typography variant="p" className="mt-4 text-sm leading-relaxed text-slate-600">
                      {t(item.text)}
                    </Typography>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>


      <Section spacing="lg" className="relative z-10 border-t border-slate-100/50">
        <Container>
          <RevealOnScroll>
            <GlassSectionHeader
              eyebrow="haridasaruTitle"
              title="saintsSoil"
              description="saintsSoilDesc"
              icon={<FcPortraitMode className="h-4 w-4" />}
            />

            <div className="mt-12">
              <HaridasaruDirectory />
            </div>

            <div className="mt-12 flex justify-center">
              <Button size="lg" variant="outline" className="h-14 rounded-full px-12 border-slate-200 bg-white/80 hover:bg-white transition-all duration-300 font-bold text-[11px] tracking-widest" asChild>
                <Link href="/haridasaru">
                  {t('viewDirectory')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="lg" className="relative z-10 border-t border-slate-100/50 mt-[-8rem]">
        <Container>
          <RevealOnScroll>
            <GlassSectionHeader
              eyebrow="devotionalContext"
              title="exploreByDeity"
              description="deityDesc"
              icon={<FcLike className="h-4 w-4" />}
            />

            <div className="mt-12 rounded-[2.5rem] border border-slate-100/50 bg-white/90 p-8 sm:p-12 shadow-xl backdrop-blur-xl">
              <DeityDirectory />
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="lg" className="relative z-10 border-t border-slate-100/50">
        <Container>
          <RevealOnScroll>
            <GlassSectionHeader
              eyebrow="startingPoint"
              title="journeyKeertana"
              description="journeyDesc"
            />

            <div className="mt-12 rounded-[2.5rem] border border-slate-100/50 bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
                <div className="space-y-6 flex flex-col justify-center">
                  <Typography variant="h3" className="text-3xl font-bold tracking-tight">{t('modernSeeker')}</Typography>
                  <Typography variant="p" className="text-base leading-relaxed text-slate-600">
                    {t('modernSeekerDesc')}
                  </Typography>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button size="lg" className="rounded-full px-8 h-12 font-bold tracking-widest text-[11px] shadow-sm bg-orange-600 hover:bg-orange-700 text-white transition-colors" asChild>
                        <Link href="/library">{t('browseArchive')}</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 h-12 font-bold tracking-widest text-[11px] border-slate-200 bg-white/80 transition hover:bg-white" asChild>
                        <Link href="/about">{t('learnHistory')}</Link>
                    </Button>
                  </div>
                </div>
                <div className="rounded-[2.5rem] border border-slate-100/50 bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
                  <Typography variant="h4" className="text-lg font-bold mb-6 flex items-center gap-2">
                    <FcLibrary className="h-5 w-5" />
                    {t('insideArchive')}
                  </Typography>
                  <ul className="space-y-4">
                    {[
                        { text: 'biographiesCount', icon: <FcPortraitMode className="h-4 w-4 shrink-0 mt-0.5" /> },
                        { text: 'authenticLyrics', icon: <FcVoicePresentation className="h-4 w-4 shrink-0 mt-0.5" /> },
                        { text: 'philosophicalMeanings', icon: <FcIdea className="h-4 w-4 shrink-0 mt-0.5" /> },
                        { text: 'categorization', icon: <FcLibrary className="h-4 w-4 shrink-0 mt-0.5" /> },
                        { text: 'academicDevotional', icon: <FcReadingEbook className="h-4 w-4 shrink-0 mt-0.5" /> }
                    ].map((item) => (
                        <li key={item.text} className="flex items-start gap-3 text-sm text-slate-600 font-medium leading-relaxed">
                            {item.icon}
                            {t(item.text)}
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>
    </main>
  );
}
