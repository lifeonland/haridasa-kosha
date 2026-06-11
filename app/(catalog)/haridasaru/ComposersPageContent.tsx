'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Search, LayoutGrid, List, Sparkles, ArrowRight, User, X } from 'lucide-react';

export default function ComposersPageContent({ composers: allComposers, stats, totalComposers }: any) {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComposers = allComposers.filter((c: any) => 
    t(c.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(c.biography || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Featured Haridasa (First in our custom order)
  const featured = allComposers[0];

  return (
    <main className="min-h-screen bg-[#fcfaf7] py-12 px-6">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. Hero Section */}
        <div className="text-center mb-16 space-y-6">
            <Typography variant="h1" className="text-5xl font-bold tracking-tighter">{t('composersPageTitle')}</Typography>
            <Typography variant="lead" className="text-slate-600 max-w-2xl mx-auto">{t('composersPageDesc')}</Typography>
            
            {/* Archive Stats */}
            <div className="flex justify-center gap-12 pt-8 text-sm font-bold text-slate-500 tracking-widest border-t border-slate-100 mt-8 pt-8">
                <div>{stats.composers.toLocaleString()}+ <span className="block text-slate-400 text-[10px] uppercase">{t('statsHaridasas')}</span></div>
                <div>{stats.compositions.toLocaleString()}+ <span className="block text-slate-400 text-[10px] uppercase">{t('statsCompositions')}</span></div>
                <div>8 <span className="block text-slate-400 text-[10px] uppercase">Centuries</span></div>
            </div>
        </div>

        {/* 2. Featured Haridasa */}
        {featured && !searchQuery && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 md:p-8 border border-slate-100 rounded-[2.5rem] shadow-sm mb-16 flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-slate-100 overflow-hidden shrink-0 shadow-inner">
                    <img src={featured.imageUrl || null} alt={t(featured.name)} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-3 text-center md:text-left">
                    <Typography variant="small" className="text-primary font-bold tracking-widest text-[10px]">FEATURED HARIDASA</Typography>
                    <Typography variant="h2" className="text-2xl font-bold tracking-tight">{t(featured.name)}</Typography>
                    <Typography variant="p" className="text-slate-500 text-sm italic">"{t(featured.biography?.slice(0, 100) || '')}..."</Typography>
                    <Button asChild className="rounded-full px-6 h-10 font-bold text-xs"><Link href={`/haridasaru/${featured.id}`}>{t('viewProfile')} →</Link></Button>
                </div>
            </motion.div>
        )}

        {/* 3. Search & Toolbar */}
        <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-11 py-4 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm outline-none text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
              placeholder={t('searchComposers')} 
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-full border border-slate-100">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-slate-100' : ''}`}><LayoutGrid className="w-4 h-4"/></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-full ${viewMode === 'table' ? 'bg-slate-100' : ''}`}><List className="w-4 h-4"/></button>
          </div>
        </div>

        {/* 4. Composer Grid */}
        <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredComposers.map((c: any) => (
                        <div key={c.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 group">
                            <div className="w-16 h-16 mb-4 rounded-2xl bg-slate-100 overflow-hidden shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-inner">
                                {c.imageUrl ? (
                                    <img src={c.imageUrl} alt={t(c.name)} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl opacity-50">🙏</div>
                                )}
                            </div>
                            <Typography variant="h4" className="font-bold mb-1">{t(c.name)}</Typography>
                            <Typography variant="p" className="text-xs text-slate-500 mb-4">{t(c.ankita?.name || '')} • {c.timeline}</Typography>
                            <Typography variant="p" className="text-sm text-slate-600 line-clamp-3 mb-6">{t(c.biography || '')}</Typography>
                            <Link href={`/haridasaru/${c.id}`} className="text-sm font-bold text-primary flex items-center gap-2 transition-all duration-300 group-hover:gap-4">
                                {t('viewProfile')} <ArrowRight className="w-4 h-4"/>
                            </Link>
                        </div>
                    ))}
                </motion.div>
            ) : (
                <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">{t('tblName')}</th>
                                <th className="px-6 py-4">{t('tblAnkita')}</th>
                                <th className="px-6 py-4">{t('tblPeriod')}</th>
                                <th className="px-6 py-4 text-right">{t('tblActions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredComposers.map((c: any) => (
                                <tr key={c.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-bold">{t(c.name)}</td>
                                    <td className="px-6 py-4 text-slate-600">{t(c.ankita?.name || '')}</td>
                                    <td className="px-6 py-4 text-slate-600">{c.timeline}</td>
                                    <td className="px-6 py-4 text-right"><Link href={`/haridasaru/${c.id}`} className="text-primary font-bold">{t('viewProfile')}</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </main>
  );
}
