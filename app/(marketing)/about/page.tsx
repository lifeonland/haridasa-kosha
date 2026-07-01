'use client';

import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { History, BookOpen, Heart, Globe, Users, Feather, Sparkles, Music, Zap } from 'lucide-react';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NextImage from "next/image";

export default function AboutPage() {
  const { t, lang } = useLanguage();

  return (
    <main className="min-h-screen bg-[#fcfaf7] selection:bg-primary/20 selection:text-primary relative overflow-y-auto pb-32">
...
      {/* Universal Page Background Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <NextImage 
            src="/assets/webp/hero-bg.webp" 
            alt="Page Background" 
            fill
            sizes="100vw"
            className="object-cover opacity-[0.08]" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcfaf7]/40 to-[#fcfaf7]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
      </div>

      <Section spacing="lg" className="relative z-10 pt-20">
        <Container>
          {/* Hero Section */}
          <div className="mb-16 text-center max-w-3xl mx-auto space-y-6">
            <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-[10px] font-bold tracking-[0.3em] text-primary shadow-sm backdrop-blur-md uppercase"
            >
                <Zap className="h-3 w-3 text-primary" />
                {t('aboutEyebrow')}
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-950 leading-[1]">
                {t('aboutTitle')}
            </h1>
            <Typography variant="lead" className="text-md md:text-lg text-slate-600 leading-relaxed font-medium">
                {t('aboutLead')}
            </Typography>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
                { label: t('yearsOfHistory'), value: (800).toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US') + '+', icon: History, color: 'text-primary' },
                { label: t('haridasa'), value: (150).toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US') + '+', icon: Users, color: 'text-amber-500' },
                { label: t('compositions'), value: (12000).toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US') + '+', icon: BookOpen, color: 'text-primary' },
                { label: t('globalAccess'), value: t('global'), icon: Globe, color: 'text-emerald-500' },
            ].map((stat) => (
                <div key={stat.label} className="bg-white/80 backdrop-blur-md p-6 rounded-[1.5rem] border border-white/50 shadow-sm text-center flex flex-col items-center">
                    <stat.icon className={`w-6 h-6 mb-3 ${stat.color}`} />
                    <div className="text-xl font-bold tracking-tight">{stat.value}</div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
            ))}
          </div>

          {/* Join Our Mission CTA (Moved Up) */}
          <div className="mb-16">
            <div className="relative max-w-md mx-auto rounded-[2rem] bg-slate-950 p-8 text-white text-center shadow-2xl overflow-hidden">
              <Typography variant="h2" className="text-xl md:text-2xl font-bold mb-3 leading-tight tracking-tight">
                  {t('joinMissionTitle')}
              </Typography>
              <Typography variant="p" className="text-xs text-slate-300 mb-6">
                  {t('joinMissionDesc')}
              </Typography>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button size="sm" className="rounded-full px-6 h-10 font-bold tracking-widest text-[10px] bg-white text-black hover:bg-slate-100 transition duration-300" asChild>
                  <Link href="/contribute">{t('contributeBtn')}</Link>
                </Button>
                <Button size="sm" variant="outline" className="rounded-full px-6 h-10 font-bold tracking-widest text-[10px] border-white/30 bg-transparent hover:bg-white/10 transition duration-300" asChild>
                  <a href="mailto:srivatsa.m.s.91@gmail.com">
                    {t('contactBtn')}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Detailed Mission */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto text-center mb-10">
                <Typography variant="h2" className="text-2xl font-bold tracking-tight mb-4">{t('ourVision')}</Typography>
                <Typography variant="p" className="text-md text-slate-600">{t('visionDesc')}</Typography>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <Typography variant="h3" className="text-xl font-bold tracking-tight">{t('whyWeExist')}</Typography>
                        <Typography variant="p" className="text-sm text-slate-600 leading-relaxed">{t('whyWeExistDesc')}</Typography>
                    </div>
                    <ul className="space-y-4">
                        {[
                            { title: t('digitalArchiving'), desc: t('digitalArchivingDesc'), icon: Zap, color: 'text-primary' },
                            { title: t('digitalPreservation'), desc: t('digitalPreservationDesc'), icon: BookOpen, color: 'text-amber-500' },
                            { title: t('communityEngagement'), desc: t('communityEngagementDesc'), icon: Users, color: 'text-emerald-500' },
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-4 group">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 ${item.color} shadow-inner`}>
                                <item.icon className="w-4 h-4"/>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-0.5 text-sm">{item.title}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Typography variant="h2" className="text-2xl font-bold mb-4 tracking-tight">
                {t('methodologyTitle')}
            </Typography>
            <Typography variant="p" className="text-md text-slate-600 leading-relaxed">
                {t('methodologyDesc')}
            </Typography>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-16 pt-4">
            {[
              { title: 'archivalIntegrity', icon: Feather, desc: 'archivalIntegrityDesc', color: 'text-primary' },
              { title: 'scholarlyVetting', icon: BookOpen, desc: 'scholarlyVettingDesc', color: 'text-amber-500' },
              { title: 'digitalPreservation', icon: Globe, desc: 'digitalPreservationDesc', color: 'text-emerald-500' },
            ].map((item, idx) => (
                <div key={item.title} className="bg-white/80 backdrop-blur-md p-6 rounded-[1.5rem] border border-white/50 shadow-sm h-full text-center flex flex-col items-center">
                  <div className={`h-12 w-12 rounded-[1rem] bg-slate-50 flex items-center justify-center ${item.color} mb-4 shadow-inner`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <Typography variant="h4" className="text-sm font-bold mb-2 tracking-tight">{t(item.title)}</Typography>
                  <Typography variant="p" className="text-xs text-slate-600 leading-relaxed">{t(item.desc)}</Typography>
                </div>
            ))}
          </div>


        </Container>
      </Section>
    </main>
  );
}
