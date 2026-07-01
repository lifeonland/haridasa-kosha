'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/shared/LanguageContext';
import { ArrowRight, BookOpen, Music, Sparkles, Feather } from 'lucide-react';
import { WisdomFlipCard } from '@/components/ui/WisdomFlipCard';
import { HorizontalDateSlider } from '@/components/ui/HorizontalDateSlider';

export default function DailyWisdomPage() {
  const { t, lang } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/daily-wisdom?date=${selectedDate.toISOString()}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching daily wisdom:", err);
        setIsLoading(false);
      });
  }, [selectedDate]);

  // Auto-rotate by advancing the timeline every 15 seconds
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSelectedDate(prev => {
        const nextDate = new Date(prev);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate;
      });
    }, 15000); // 15 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <main className="min-h-[100svh] relative overflow-hidden bg-[#fcfaf7] pb-24">
      {/* Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-pulse delay-700" />
      
      {/* Header with neat calendar */}
      <div className="pt-20 pb-4 border-b border-slate-200/50 bg-white/40 backdrop-blur-3xl sticky top-0 z-40">
        <Container>
           <div className="text-center mb-2">
              <Typography variant="h1" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Wisdom Timeline
              </Typography>
              <Typography variant="p" className="text-sm text-slate-500 font-medium mt-1">
                {t('dailyWisdomDesc')}
              </Typography>
           </div>
           <HorizontalDateSlider selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </Container>
      </div>

      <Container className="pt-10 relative z-10">
        {!data || isLoading ? (
            <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        ) : data.error ? (
            <div className="flex justify-center items-center h-64 flex-col gap-4 text-center">
                <Typography variant="h3" className="text-slate-800 font-bold">Failed to load Wisdom</Typography>
                <Typography variant="p" className="text-slate-500">Please refresh the page.</Typography>
            </div>
        ) : (
          <div className="flex flex-col items-center gap-10 mt-10 relative z-10 max-w-6xl mx-auto">
            {/* Top: The Flip Card (Centered) */}
            <motion.div 
              key={`card-${data.composition.id}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl mx-auto"
            >
               <WisdomFlipCard 
                 title={data.composition.title}
                 quote={data.quote.text}
                 source={data.quote.source}
                 meaning={lang === 'KN' ? (data.translation?.kannada || data.commentary) : (data.translation?.english || data.commentary)}
                 transliteration={data.transliteration}
                 raga={data.heritage.raga}
                 tala={data.heritage.tala}
                 deity={data.essence.deity}
                 ankita={data.essence.ankita}
               />
            </motion.div>

            {/* Title & Heritage Strip */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center space-y-3"
            >
                <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  {data.composition.title}
                </Typography>
                
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    {data.heritage.raga && (
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-white/60 px-4 py-1.5 rounded-full border border-slate-100 flex items-center gap-2">
                            <Music className="w-3 h-3 text-primary" /> {data.heritage.raga}
                        </span>
                    )}
                    {data.essence.deity && (
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-white/60 px-4 py-1.5 rounded-full border border-slate-100">
                            Dedicated to {data.essence.deity}
                        </span>
                    )}
                </div>
            </motion.div>

            {/* Bottom: 3-Column Actionable Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid md:grid-cols-3 gap-4 w-full items-start"
            >
               {/* Left: Original Verse */}
               {data.essence.lyrics && (
                   <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm flex flex-col gap-2 hover:shadow-lg transition-shadow">
                       <div className="flex items-center gap-2 text-primary">
                           <BookOpen className="w-3 h-3" />
                           <span className="text-[9px] font-bold uppercase tracking-widest">Original Verse</span>
                       </div>
                       
                       <div className="flex flex-col items-center justify-center text-center gap-2 my-1">
                           {/* Kannada Script */}
                           <p className="text-base md:text-lg font-bold text-slate-800 font-kannada leading-relaxed whitespace-pre-line">
                               {data.essence.lyrics.split('\n').slice(0, 4).join('\n')}
                           </p>
                           
                           {/* Phonetic Pronunciation (Transliteration) */}
                           {data.transliteration && (
                               <div className="mt-1 pt-2 border-t border-slate-200/50 w-full">
                                   <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1 block">
                                       Phonetic Pronunciation
                                   </span>
                                   <p className="text-[10px] text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                                       {data.transliteration.split('\n').slice(0, 4).join('\n')}
                                   </p>
                               </div>
                           )}
                       </div>
                   </div>
               )}

               {/* Center: Musical Heritage & CTA */}
               <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                   <div className="flex items-center gap-2 text-slate-400 mb-1">
                       <Music className="w-3 h-3" />
                       <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Musical Heritage</span>
                   </div>
                   
                   <div className="flex flex-col items-center my-2">
                     <Typography variant="h3" className="text-lg font-bold text-slate-800">
                         {data.heritage.raga || "Ragamalika"}
                     </Typography>
                     <span className="text-[9px] font-bold text-amber-600 mt-1 uppercase tracking-widest block mb-2">
                         Tala: {data.heritage.tala || "Adi"}
                     </span>
                     
                     <p className="text-[10px] text-slate-600 leading-relaxed font-medium line-clamp-3">
                         This sacred composition is traditionally rendered in {data.heritage.raga || "Ragamalika"}, a melody specifically chosen by the Haridasas to evoke profound devotion (Bhakti) and spiritual awakening.
                     </p>
                   </div>

                   <Link href={`/library/${data.composition.id}`} className="w-full mt-1">
                       <Button size="sm" className="w-full rounded-xl bg-slate-900 text-white hover:bg-primary shadow-md transition-all duration-300 h-8">
                           <span className="font-bold tracking-wide text-[9px]">Read Full Composition</span>
                           <ArrowRight className="w-3 h-3 ml-2" />
                       </Button>
                   </Link>
               </div>

                {/* Right: Word-by-Word Meaning */}
                {data.translation && (
                    <div className="bg-primary/5 p-4 rounded-2xl flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <Sparkles className="w-3 h-3" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">
                                {data.translation.wordByWord && data.translation.wordByWord !== '-' ? "Word-by-Word Breakdown" : "Translation"}
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-2 my-1">
                            <p className="text-[10px] text-slate-700 font-medium leading-relaxed whitespace-pre-line text-center line-clamp-4">
                                {data.translation.wordByWord && data.translation.wordByWord !== '-' 
                                    ? data.translation.wordByWord.split('\n').slice(0, 4).join('\n')
                                    : (data.translation.english || data.commentary)}
                            </p>
                        </div>
                        {data.translation.wordByWord && data.translation.wordByWord !== '-' && (
                            <div className="mt-2 pt-2 border-t border-primary/10 text-center w-full">
                                 <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">
                                     Deepen Your Understanding
                                 </span>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
          </div>
        )}
      </Container>
    </main>
  );
}
