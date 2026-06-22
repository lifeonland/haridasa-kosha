'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/shared/LanguageContext';
import SearchBar from '@/components/ui/SearchBar';
import CompositionCard from '@/components/ui/CompositionCard';
import Pagination from '@/components/ui/Pagination';
import { Typography } from '@/components/ui/typography';
import { 
  LayoutGrid, 
  List, 
  Filter, 
  X, 
  Music, 
  Key, 
  Scroll, 
  Wind, 
  BookOpen, 
  ArrowLeft, 
  ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Filters from '@/components/ui/Filters';

export default function CompositionsPageContent({ 
  category,
  categoryCounts = { dasarapada: 0, suladi: 0, ugabhoga: 0, mundige: 0, all: 0 },
  composerCount, 
  ragaCount, 
  ankitaCount,  
  compositions = [], 
  totalCompositions = 0, 
  totalPages = 0, 
  currentPage = 1, 
  search,
  composer,
  deity,
  ankita,
  raga,
  tala,
  tag,
  composers,
  deities,
  ankitas,
  ragas,
  talas,
  tags
}: any) {
  const { t, lang } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const showList = !!(category || search || composer || deity || ankita || raga || tala || tag);

  const getCategoryHeader = () => {
    if (category === 'ugabhoga') return { title: t('catUgabhoga'), desc: t('catUgabhogaDesc') };
    if (category === 'suladi') return { title: t('catSuladi'), desc: t('catSuladiDesc') };
    if (category === 'mundige') return { title: t('catMundige'), desc: t('catMundigeDesc') };
    if (category === 'dasarapada') return { title: t('catDasarapada'), desc: t('catDasarapadaDesc') };
    return { title: t('catAll'), desc: t('catAllDesc') };
  };

  const activeCategory = getCategoryHeader();

  const categoriesList = [
    {
      id: 'dasarapada',
      titleKey: 'catDasarapada',
      descKey: 'catDasarapadaDesc',
      gradient: 'from-amber-500 to-orange-600',
      count: categoryCounts.dasarapada || 0,
      icon: Music,
    },
    {
      id: 'mundige',
      titleKey: 'catMundige',
      descKey: 'catMundigeDesc',
      gradient: 'from-purple-600 to-indigo-700',
      count: categoryCounts.mundige || 0,
      icon: Key,
    },
    {
      id: 'suladi',
      titleKey: 'catSuladi',
      descKey: 'catSuladiDesc',
      gradient: 'from-emerald-500 to-teal-700',
      count: categoryCounts.suladi || 0,
      icon: Scroll,
    },
    {
      id: 'ugabhoga',
      titleKey: 'catUgabhoga',
      descKey: 'catUgabhogaDesc',
      gradient: 'from-rose-500 to-red-600',
      count: categoryCounts.ugabhoga || 0,
      icon: Wind,
    },
    {
      id: 'all',
      titleKey: 'catAll',
      descKey: 'catAllDesc',
      gradient: 'from-slate-700 to-slate-900',
      count: categoryCounts.all || 0,
      icon: BookOpen,
      spanFull: true,
    }
  ];

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
        
        {!showList ? (
          /* LANDING STATE: Category Selection Grid */
          <div>
            {/* Hero Section */}
            <div className="text-center mb-16 space-y-6">
                <Typography variant="h1" className="text-5xl font-bold tracking-tighter">{t('compositionsHeading')}</Typography>
                <Typography variant="lead" className="text-slate-600 max-w-2xl mx-auto">{t('compositionsSubtitle')}</Typography>
                
                {/* Archive Stats */}
                <div className="flex justify-center gap-12 pt-8 text-sm font-bold text-slate-500 tracking-widest border-t border-slate-100 mt-8 pt-8">
                    <div>{(categoryCounts.all || 0).toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US')}+ <span className="block text-slate-400 text-[10px]">{t('statsCompositions')}</span></div>
                    <div>{composerCount.toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US')} <span className="block text-slate-400 text-[10px]">{t('statsHaridasas')}</span></div>
                    <div>{ragaCount.toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US')}+ <span className="block text-slate-400 text-[10px]">{t('statsRagas')}</span></div>
                    <div>{ankitaCount.toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US')}+ <span className="block text-slate-400 text-[10px]">{t('statsAnkitas')}</span></div>
                </div>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-16">
              <SearchBar type="compositions" placeholder="Search compositions..." />
              <div className="mt-4 text-center text-xs font-bold text-slate-500 tracking-widest">
                {t('popularSearches')}: <span className="text-primary">Purandara Dasa, Vittala, Krishna, Narasimha, Bhairavi</span>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesList.map((cat) => (
                <Link 
                  key={cat.id}
                  href={`/library?category=${cat.id}`}
                  className={`block ${cat.spanFull ? 'md:col-span-2 lg:col-span-3' : ''}`}
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className={`group relative overflow-hidden rounded-[1.75rem] p-6 bg-gradient-to-br ${cat.gradient} text-white shadow-md hover:shadow-xl flex flex-col justify-between min-h-[220px] border border-white/10 h-full cursor-pointer`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-6 -mt-6" />
                    
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                          <cat.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                          {cat.count.toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US')} {t('compositions')}
                        </span>
                      </div>
                      
                      <Typography variant="h2" className="text-xl font-bold mb-2 text-white">
                        {t(cat.titleKey)}
                      </Typography>
                      
                      <Typography variant="p" className="text-white/85 text-xs leading-relaxed max-w-2xl font-medium font-sans">
                        {t(cat.descKey)}
                      </Typography>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-white hover:underline transition-all">
                        {t('viewCategory')}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/80 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* FILTERED LIST VIEW STATE */
          <div>
            {/* Back Button */}
            <div className="mb-6">
              <Link 
                href="/library" 
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-slate-600 hover:text-primary transition-all bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4 text-primary" />
                {t('backToCategories')}
              </Link>
            </div>

            {/* Hero Category Header */}
            <div className="mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                {t('categorization')}
              </div>
              <Typography variant="h1" className="text-4xl font-bold tracking-tighter">{activeCategory.title}</Typography>
              <Typography variant="lead" className="text-slate-600 max-w-3xl leading-relaxed">{activeCategory.desc}</Typography>
              <div className="text-sm font-bold text-slate-500">
                {totalCompositions.toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US')} {t('compositions')}
              </div>
            </div>

            {/* Search */}
            <div className="max-w-2xl mb-12">
              <SearchBar type="compositions" placeholder="Search compositions in this category..." />
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
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
                {compositions.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                    <Typography variant="h3" className="text-lg font-bold text-slate-500 mb-2">No compositions found</Typography>
                    <Typography variant="p" className="text-slate-400 text-sm">Try clearing filters or search queries</Typography>
                  </div>
                ) : (
                  <>
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
                            raga={comp.raga?.name}
                            tala={comp.tala?.name}
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
