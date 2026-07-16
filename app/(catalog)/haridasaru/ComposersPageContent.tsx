'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Search, LayoutGrid, List, Sparkles, ArrowRight, User, X } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import { getComposerTranslationKey, getBioTranslationKey } from '@/lib/utils';

export default function ComposersPageContent({ composers, stats, totalComposers, totalPages, currentPage }: any) {
  const { t } = useLanguage();
  console.log("DEBUG: totalComposers:", totalComposers); console.log("DEBUG: totalPages:", totalPages); console.log("DEBUG: currentPage:", currentPage);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

    const getName = (c: any) => {
        return t(getComposerTranslationKey(c.id));
    };

    const getBio = (c: any) => {
        return t(getBioTranslationKey(c.id));
    };

  // Note: Filtering is now limited to the current page due to server-side pagination.
  const filteredComposers = composers.filter((c: any) => 
    getName(c).toLowerCase().includes(searchQuery.toLowerCase()) ||
    getBio(c).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#fcfaf7] py-12 px-6">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. Header & Stats Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-8">
            <div className="text-left space-y-2">
                <Typography variant="h1" className="text-4xl font-bold tracking-tighter">{t('composersPageTitle')}</Typography>
                <Typography variant="lead" className="text-slate-600 max-w-xl">{t('composersPageDesc')}</Typography>
            </div>
            
            {/* Archive Stats */}
            <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 md:gap-8 items-center text-sm"
            >
                <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">{stats.composers.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('statsHaridasas')}</span>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">{stats.compositions.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('statsCompositions')}</span>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">800+</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('yearsOfHistory')}</span>
                </div>
            </motion.div>
        </div>

        {/* 2. Search & Toolbar */}
        <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-white border border-slate-200 shadow-sm outline-none text-xs focus:ring-1 focus:ring-primary/20 transition-all" 
              placeholder={t('searchComposers')} 
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 hover:text-slate-600">
                <X className="h-3.5 w-3.5" />
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
                        <Link 
                            key={c.id} 
                            href={`/haridasaru/${c.id}`}
                            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group flex flex-col h-full"
                        >
                            <div className="w-16 h-16 mb-4 rounded-2xl bg-slate-100 overflow-hidden shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-inner">
                                {c.imageUrl ? (
                                    <Image src={c.imageUrl} alt={t(c.name)} width={64} height={64} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl opacity-50">🙏</div>
                                )}
                            </div>
                            <Typography variant="h4" className="font-bold mb-1 capitalize">{getName(c)}</Typography>
                            <Typography variant="p" className="text-xs text-slate-500 mb-4">{t(c.ankita?.name || '')} • {t(c.timeline || '')}</Typography>
                            <Typography variant="p" className="text-sm text-slate-600 line-clamp-3 mb-6">{getBio(c)}</Typography>
                            <div className="flex items-center justify-between mt-auto border-t border-slate-100 pt-4">
                                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded-full tracking-widest uppercase">
                                  {c._count?.compositions || 0} {t('Compositions')}
                                </span>
                                <div className="text-sm font-bold text-primary flex items-center gap-1 transition-all duration-300 group-hover:gap-2">
                                    {t('viewProfile')} <ArrowRight className="w-4 h-4"/>
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            ) : (
                <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse min-w-[600px]">
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
                                    <td className="px-6 py-4 font-bold capitalize">{getName(c)}</td>
                                    <td className="px-6 py-4 text-slate-600">{t(c.ankita?.name || '')}</td>
                                    <td className="px-6 py-4 text-slate-600">{t(c.timeline || '')}</td>
                                    <td className="px-6 py-4 text-right"><Link href={`/haridasaru/${c.id}`} className="text-primary font-bold">{t('viewProfile')}</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </AnimatePresence>

...
        {/* 5. Pagination Controls */}
        {totalPages > 1 && (
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl="/haridasaru"
            />
        )}
      </div>
    </main>
  );
}
