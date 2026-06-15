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
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';
import { useLanguage } from '@/components/shared/LanguageContext';
import { useState, useEffect, useMemo } from 'react';

const quickStartItems = [
  {
    title: 'paramparaTitle',
    text: 'paramparaDesc',
    icon: <History className="h-5 w-5 text-primary" />,
  },
  {
    title: 'archiveTitle',
    text: 'archiveDesc',
    icon: <BookOpen className="h-5 w-5 text-primary" />,
  },
  {
    title: 'scholarlyTitle',
    text: 'scholarlyDesc',
    icon: <Library className="h-5 w-5 text-primary" />,
  },
];

const siteHighlights = [
  {
    title: 'historicalAuthenticity',
    text: 'historicalDesc',
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'musicalHeritage',
    text: 'musicalHeritageDesc',
    icon: <Music className="h-6 w-6" />,
  },
  {
    title: 'universalAccess',
    text: 'universalAccessDesc',
    icon: <Globe className="h-6 w-6" />,
  },
];

function GlassSectionHeader({
  eyebrow,
  title,
  description,
  variant = 'center',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  variant?: 'center' | 'left';
}) {
  const { t } = useLanguage();
  return (
    <div className={`mx-auto max-w-5xl rounded-[3.5rem] border border-slate-100/50 bg-white/95 px-6 py-8 shadow-xl backdrop-blur-xl sm:px-10 sm:py-10 ${variant === 'center' ? 'text-center' : 'text-left'}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-bold tracking-[0.3em] text-primary shadow-sm mb-6 uppercase">
        <Sparkles className="h-3 w-3 text-primary" />
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
  const [stats, setStats] = useState({ compositions: null, composers: null, ragas: null, ankitas: null });
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
      {/* Universal Page Background Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <img 
            src="/assets/hero-bg.png" 
            alt="Page Background" 
            className="w-full h-full object-cover opacity-[0.4]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcfaf7]/10 to-[#fcfaf7]/80" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30" />
      </div>

      <div className="relative z-10">
          <Hero />
      </div>

      <Section id="about" spacing="lg" className="relative z-10 mt-16">
        <Container className="relative">
          <RevealOnScroll>
            <GlassSectionHeader
              eyebrow="missionEyebrow"
              title="missionTitle"
              description="missionDesc"
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
              <div className="h-full rounded-[2.5rem] border border-slate-100/50 bg-white/90 p-8 sm:p-10 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                        <Feather className="h-6 w-6" />
                    </div>
                    <Typography variant="h3" className="font-bold">{t('livingTradition')}</Typography>
                </div>
                <Typography variant="lead" className="mt-8 max-w-2xl text-slate-600 leading-relaxed">
                  {t('livingTraditionDesc')}
                </Typography>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { text: 'foundations', icon: <Sparkles className="h-4 w-4 text-primary" /> },
                    { text: 'verifiedKeertanas', icon: <Quote className="h-4 w-4 text-primary" /> },
                    { text: 'discoverStories', icon: <Heart className="h-4 w-4 text-primary" /> },
                    { text: 'studyStructures', icon: <Music className="h-4 w-4 text-primary" /> },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-4 rounded-3xl border border-slate-100/50 bg-white/80 p-6 text-sm leading-relaxed text-slate-700 shadow-sm transition hover:bg-white">
                      <div className="mt-0.5">{item.icon}</div>
                      {t(item.text)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:content-start">
                {shuffledItems.map((item) => (
                  <div key={item.title} className="group h-full rounded-[2rem] border border-slate-100/50 bg-white/90 p-8 shadow-xl backdrop-blur-xl transition hover:border-primary/20">
                    <div className="mb-6 inline-flex rounded-2xl bg-slate-50 p-4 shadow-sm ring-1 ring-slate-100 transition group-hover:bg-primary/5">
                        {item.icon}
                    </div>
                    <Typography variant="h4" className="font-bold">{t(item.title)}</Typography>
                    <Typography variant="p" className="mt-4 text-sm leading-relaxed text-slate-600">
                      {t(item.text)}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {['Vyasa Kuta', 'Dasa Kuta', 'Udupi Krishna', 'Vittala Keertana', 'Haridasa Namavali'].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-3 text-[11px] font-bold text-slate-600 shadow-sm transition hover:border-primary/30 hover:text-primary">
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
                <div><div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter">{stats?.composers !== null ? stats.composers.toLocaleString() : '...'}</div><div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{t('statsHaridasas')}</div></div>
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
            />

            <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-20">
              <div className="flex gap-8 snap-x snap-mandatory">
                {siteHighlights.map((item) => (
                  <motion.div 
                    key={item.title} 
                    whileHover={{ scale: 1.02 }}
                    className="group rounded-[2rem] border border-slate-100/50 bg-white/90 p-8 shadow-xl backdrop-blur-xl transition hover:border-primary/20 w-[18rem] sm:w-[22rem] snap-start shrink-0"
                  >
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-primary shadow-sm ring-1 ring-slate-100 transition group-hover:bg-primary group-hover:text-white">
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
            />

            <div className="mt-12">
              <HaridasaruDirectory />
            </div>

            <div className="mt-12 flex justify-center">
              <Button size="lg" variant="outline" className="h-14 rounded-full px-12 border-slate-200 bg-white/80 hover:border-primary/40 hover:bg-white transition-all duration-300 font-bold text-[11px] tracking-widest" asChild>
                <Link href="/haridasaru" className="flex items-center gap-2">
                    {t('exploreAllHaridasaru')}
                    <ArrowRight className="h-4 w-4" />
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

            <div className="mt-12 rounded-[2.5rem] border border-slate-100/50 bg-white/90 p-8 sm:p-12 shadow-xl backdrop-blur-xl">
              <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
                <div className="space-y-6">
                  <Typography variant="h3" className="text-3xl font-bold tracking-tight">{t('modernSeeker')}</Typography>
                  <Typography variant="p" className="text-lg leading-relaxed text-slate-600">
                    {t('modernSeekerDesc')}
                  </Typography>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button size="lg" className="rounded-full px-8 h-14 font-bold tracking-widest text-[11px] shadow-sm" asChild>
                        <Link href="/library">{t('browseArchive')}</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 h-14 font-bold tracking-widest text-[11px] border-slate-200 bg-white/80" asChild>
                        <Link href="/about">{t('learnHistory')}</Link>
                    </Button>
                  </div>
                </div>
                <div className="rounded-[2.5rem] border border-slate-100/50 bg-white/90 p-8 sm:p-10 shadow-xl backdrop-blur-xl">
                  <Typography variant="h4" className="text-xl font-bold mb-6">{t('insideArchive')}</Typography>
                  <ul className="space-y-5">
                    {[
                        'biographiesCount',
                        'authenticLyrics',
                        'philosophicalMeanings',
                        'categorization',
                        'academicDevotional'
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-slate-600 font-medium leading-relaxed">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {t(item)}
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
