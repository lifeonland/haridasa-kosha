'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Music, Sparkles, ArrowRight, Zap, Search, Bookmark } from 'lucide-react';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Typography } from '../ui/typography';
import { Button } from '../ui/button';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-2">
      <div className="relative z-10 mx-auto min-h-[80svh] flex items-center max-w-7xl px-6 py-6 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
            
            {/* Left Content Column */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-8"
            >
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-950 leading-[1.1] lg:-ml-1">
                        {t('heroTitle').split(t('haridasa')).map((part, i, arr) => (
                        <span key={i}>
                            {part}
                            {i < arr.length - 1 && (
                            <span className="relative inline-block text-primary">
                                {t('haridasa')}
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute -bottom-2 left-0 h-1.5 bg-primary/20 rounded-full"
                                />
                            </span>
                            )}
                        </span>
                        ))}
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-800 leading-relaxed max-w-2xl font-semibold">
                        {t('heroDesc')}
                    </p>
                </div>

                <div className="flex flex-wrap gap-5 pt-2">
                    <Button asChild className="group relative overflow-hidden rounded-full px-8 h-12 font-bold tracking-widest text-[11px] shadow-lg hover:shadow-orange-500/40 transition-all duration-500 bg-orange-600 hover:bg-orange-700 text-white">
                        <Link href="/library" className="flex items-center gap-3">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <Music className="h-3 w-3" />
                            {t('exploreCompositions')}
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Link href="/about" className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-orange-700 hover:text-orange-950 transition-all duration-300 py-4 hover:translate-x-1">
                        {t('learnHistory')}
                        <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>

                {/* Desktop Mini Stats */}
                <div className="hidden md:flex gap-12 pt-10 border-t border-slate-300/50">
                    <div>
                        <div className="text-2xl font-bold tracking-tight text-slate-950">12K+</div>
                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">{t('statsCompositions')}</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold tracking-tight text-slate-950">150+</div>
                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">{t('statsHaridasas')}</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold tracking-tight text-slate-950">800</div>
                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">Years</div>
                    </div>
                </div>
            </motion.div>

            {/* Right Interactive Discovery Column */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative z-50"
            >
                <div className="bg-white/60 backdrop-blur-2xl rounded-[3rem] p-6 border border-white/80 shadow-2xl relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <Typography variant="h4" className="font-bold text-lg tracking-tight text-slate-950">Discovery Hub</Typography>
                        </div>
                        <Bookmark className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="space-y-4">
                        <Typography variant="small" className="text-slate-600 font-bold tracking-[0.2em] uppercase text-[9px]">Ask the AI Assistant</Typography>
                        <div className="grid gap-3">
                            {[
                                { q: "Who was Purandara Dasa?", icon: "🙏" },
                                { q: "Meaning of Jagadoddharana", icon: "✨" },
                                { q: "Compositions on Vittala", icon: "🎻" },
                                { q: "What is Dvaita philosophy?", icon: "📖" },
                            ].map((p, i) => (
                                <Link
                                    key={p.q}
                                    href={`/ask-ai?q=${encodeURIComponent(p.q)}`}
                                    className="relative z-20 flex items-center justify-between p-3 rounded-[1.25rem] bg-white border border-white/80 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{p.icon}</span>
                                        <span className="text-[13px] font-bold text-slate-900 leading-none">{p.q}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/50">
                         <Link href="/ask-ai" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-slate-900 text-white text-[11px] font-bold tracking-widest uppercase hover:bg-slate-800 transition-colors shadow-xl">
                            <Search className="w-3 h-3" />
                            Enter Custom Query
                         </Link>
                    </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] -z-10 animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-[80px] -z-10 animate-pulse delay-700" />
            </motion.div>

        </div>
      </div>
    </section>
  );
}
