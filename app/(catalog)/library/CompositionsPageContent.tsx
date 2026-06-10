'use client';
import { useState } from 'react';
import { useLanguage } from '@/components/shared/LanguageContext';
import SearchBar from '@/components/ui/SearchBar';
import CompositionCard from '@/components/ui/CompositionCard';
import Pagination from '@/components/ui/Pagination';
import { Typography } from '@/components/ui/typography';
import { LayoutGrid, List, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Filters from '@/components/ui/Filters';
import { X } from 'lucide-react';

export default function CompositionsPageContent({ 
  compositions, 
  totalCompositions, 
  totalPages, 
  currentPage, 
  search,
  composers,
  deities,
  ankitas,
  ragas,
  talas,
  tags
}: any) {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfaf7] py-16 px-6">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      {/* Sidebar Filter Overlay */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-8 lg:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <Typography variant="h3" className="text-xl font-bold">{t('filters')}</Typography>
                <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-slate-100"><X className="w-5 h-5"/></button>
              </div>
              <Filters 
                composers={composers} 
                deities={deities} 
                ankitas={ankitas}
                ragas={ragas}
                talas={talas}
                tags={tags}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
            <Typography variant="h1" className="text-5xl font-bold tracking-tighter">{t('compositionsHeading')}</Typography>
            <Typography variant="lead" className="text-slate-600 max-w-2xl mx-auto">{t('compositionsSubtitle')}</Typography>
            
            {/* Archive Stats */}
            <div className="flex justify-center gap-12 pt-8 text-sm font-bold text-slate-500  tracking-widest border-t border-slate-100 mt-8 pt-8">
                <div>{totalCompositions.toLocaleString()}+ <span className="block text-slate-400 text-[10px]">{t('statsCompositions')}</span></div>
                <div>38 <span className="block text-slate-400 text-[10px]">{t('statsHaridasas')}</span></div>
                <div>200+ <span className="block text-slate-400 text-[10px]">{t('statsRagas')}</span></div>
                <div>100+ <span className="block text-slate-400 text-[10px]">{t('statsAnkitas')}</span></div>
            </div>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <SearchBar type="compositions" placeholder="Search compositions..." />
          <div className="mt-4 text-center text-xs font-bold text-slate-500  tracking-widest">
            {t('popularSearches')}: <span className="text-primary">Purandara Dasa, Vittala, Krishna, Narasimha, Bhairavi</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 bg-white text-xs font-bold hover:border-primary transition shadow-sm"
            >
              <Filter className="w-4 h-4 text-primary"/> {t('filters')}
            </button>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-full border border-slate-200">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-primary' : 'text-slate-400'}`}><LayoutGrid className="w-4 h-4"/></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-primary' : 'text-slate-400'}`}><List className="w-4 h-4"/></button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block col-span-3">
            <div className="sticky top-24 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <Filters 
                composers={composers} 
                deities={deities} 
                ankitas={ankitas}
                ragas={ragas}
                talas={talas}
                tags={tags}
              />
            </div>
          </aside>

          {/* Compositions List */}
          <div className="col-span-12 lg:col-span-9">
            {/* Grid/List View */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={viewMode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}
                >
                    {compositions.map((comp: any) => (
                    <CompositionCard
                        key={comp.id}
                        id={comp.id}
                        title={comp.title}
                        firstLine={comp.firstLine}
                        composerName={comp.composer.name}
                        deityName={comp.deity.name}
                        hasLyrics={comp.lyrics && comp.lyrics.trim() !== comp.title.trim() && comp.lyrics.length > comp.title.length + 5}
                    />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-16">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl="/library"
                />
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
