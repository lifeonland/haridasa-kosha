'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DailyWisdomCard } from './DailyWisdomCard';
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguage } from '@/components/shared/LanguageContext';

export default function DailyWisdom() {
  const [wisdom, setWisdom] = useState<any>(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetch('/api/daily-wisdom')
      .then(res => res.json())
      .then(data => setWisdom(data));
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  if (!wisdom) return <section className="py-20 text-center"><Typography>Loading daily wisdom...</Typography></section>;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
            <Typography variant="h2" className="s font-bold mb-4">{t('navDailyWisdom')}</Typography>
            <Typography variant="lead" className="text-muted-foreground">{t('heroSub')}</Typography>
        </div>

        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Featured */}
          <DailyWisdomCard title={t('dwDasarapada')} className="lg:col-span-2 lg:row-span-2">
            <div className="space-y-4">
                <Typography variant="h3" className="s">{wisdom.composition.composition.title}</Typography>
                <Typography variant="p">{wisdom.composition.composition.firstLine}</Typography>
                <Typography variant="muted">{JSON.parse(wisdom.composition.commentary).simple}</Typography>
                <div className="flex gap-2 pt-4">
                    <Button size="sm">{t('dwReadMeaning')}</Button>
                    <Button size="sm" variant="outline">{t('dwListen')}</Button>
                </div>
            </div>
          </DailyWisdomCard>

          {/* Card 2: Thought */}
          <DailyWisdomCard title={t('dwThought')}>
              <Typography variant="large" className="italic mb-4 text-royal-indigo">"{wisdom.thought.text}"</Typography>
              <Typography variant="muted">{wisdom.thought.reflection}</Typography>
          </DailyWisdomCard>

           {/* Card 3: Haridasa */}
           <DailyWisdomCard title={t('dwHaridasa')}>
              <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-temple-gold/20 rounded-full flex items-center justify-center">🙏</div>
                  <Typography variant="large">{wisdom.haridasa.name}</Typography>
              </div>
              <Typography variant="muted">{wisdom.haridasa.bio}</Typography>
          </DailyWisdomCard>

           {/* Card 4: Raga */}
           <DailyWisdomCard title={t('dwRaga')}>
              <Typography variant="large" className="text-temple-gold">{wisdom.raga.name}</Typography>
              <Typography variant="muted" className="mt-2">{wisdom.raga.desc}</Typography>
          </DailyWisdomCard>
        </motion.div>

        <div className="text-center mt-16">
            <Typography variant="large" className="mb-8">{t('dwJourney')}</Typography>
            <div className="flex justify-center gap-4">
                <Button size="lg">{t('exploreBtn')}</Button>
                <Button size="lg" variant="outline">{t('dwAskAI')}</Button>
            </div>
        </div>
      </div>
    </section>
  );
}
