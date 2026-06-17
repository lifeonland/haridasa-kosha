'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Quote, Sun, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/shared/Calendar';

export default function DailyWisdomPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    fetch(`/api/daily-wisdom?date=${selectedDate.toISOString()}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error("Error fetching daily wisdom:", err));
  }, [selectedDate]);

  return (
    <main className="min-h-screen bg-[#fcfaf7] py-12 px-6">
      <Section spacing="sm" className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div>
                    <Typography variant="h1" className="text-3xl font-bold">{t('dailyWisdom')}</Typography>
                    <Typography variant="small" className="text-primary font-bold">{selectedDate.toDateString()}</Typography>
                </div>
                <Button variant="outline" className="rounded-full gap-2" onClick={() => setShowCalendar(!showCalendar)}>
                    <CalendarIcon className="h-4 w-4" /> {t('search')}
                </Button>
            </div>
            
            {!data ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100">
                    <Typography>{t('loading')}</Typography>
                </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <Quote className="h-8 w-8 text-primary mb-6"/>
                    <Typography variant="h3" className="text-3xl font-bold mb-6 leading-tight">"{data.quote.text}"</Typography>
                    <Typography variant="p" className="text-sm font-bold text-slate-500 mb-8">{data.quote.source}</Typography>
                    <Button asChild className="rounded-full px-8 h-12 font-bold">
                        <Link href={`/library/${data.composition.id}`}>{t('readFullComposition')}</Link>
                    </Button>
                </div>
                {/* Add Reflection & Practice Cards here */}
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
              </motion.div>
          </div>

          {/* Sidebar */}
          {showCalendar && (
            <div className="lg:block">
              <Calendar currentDate={selectedDate} onDateChange={(date) => { setSelectedDate(date); setShowCalendar(false); }} />
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}
