'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Quote, Sun } from 'lucide-react';

export default function DailyWisdomPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/daily-wisdom')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error("Error fetching daily wisdom:", err));
  }, []);

  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="min-h-screen bg-[#fcfaf7] py-12 px-6">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
             style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      <Section spacing="sm" className="relative z-10 max-w-4xl mx-auto">
        <Container>
          <div className="text-center mb-12">
            <Typography variant="h1" className="text-4xl font-bold mb-4">{t('dailyWisdom')}</Typography>
            <Typography variant="lead" className="text-slate-600 mb-2">{t('dailyWisdomDesc')}</Typography>
            <Typography variant="small" className="text-primary font-bold tracking-widest">{today}</Typography>
          </div>
          
          {!data ? (
            <div className="text-center py-20">
                <Typography>{t('loading')}</Typography>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Hero Wisdom Card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-primary mb-6">
                    <Quote className="h-6 w-6"/>
                    <Typography variant="h4" className="font-bold  tracking-widest text-sm">{t('wisdomQuote')}</Typography>
                </div>
                <Typography variant="h3" className="text-3xl font-bold mb-6 leading-tight">"{data.quote.text}"</Typography>
                <Typography variant="p" className="text-sm font-bold text-slate-500 mb-8">{data.quote.source}</Typography>
                <Button asChild className="rounded-full px-8 h-12 font-bold">
                    <Link href={`/library/${data.composition.id}`}>
                        {t('readFullComposition')}
                    </Link>
                </Button>
              </motion.div>

              {/* Reflection & Practice */}
              <div className="grid md:grid-cols-2 gap-8">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-primary text-primary-foreground p-8 rounded-[2.5rem] shadow-sm">
                    <Typography variant="h4" className="font-bold mb-6">{t('reflectionTitle')}</Typography>
                    <Typography variant="p" className="mb-4 opacity-90">{data.reflection.question}</Typography>
                    <div className="p-4 bg-white/10 rounded-2xl text-sm font-bold">{data.reflection.action}</div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <Typography variant="h4" className="font-bold mb-6">{t('practiceOfTheDay')}</Typography>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><Sun className="h-6 w-6"/></div>
                        <div>
                            <Typography variant="h4" className="font-bold text-sm">{data.practice.title}</Typography>
                            <Typography variant="p" className="text-xs text-slate-500">{data.practice.desc}</Typography>
                        </div>
                    </div>
                  </motion.div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
