'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      bgClass: 'bg-gradient-to-br from-amber-50 to-orange-100/80 border-orange-100 shadow-sm',
      textClass: 'text-amber-950',
      descClass: 'text-amber-800/90',
      countClass: 'bg-amber-100/80 text-amber-900 border-amber-200/50',
      iconClass: 'bg-amber-100/80 text-amber-700 border-amber-200/50',
      viewClass: 'border-amber-200/50',
      count: categoryCounts.dasarapada || 0,
      icon: Music,
      illustration: '/assets/webp/dasarapada-card-illustration.webp',
    },
    {
      id: 'mundige',
      titleKey: 'catMundige',
      descKey: 'catMundigeDesc',
      bgClass: 'bg-gradient-to-br from-purple-50 to-indigo-100/80 border-indigo-100 shadow-sm',
      textClass: 'text-purple-950',
      descClass: 'text-purple-800/90',
      countClass: 'bg-purple-100/80 text-purple-900 border-purple-200/50',
      iconClass: 'bg-purple-100/80 text-purple-700 border-purple-200/50',
      viewClass: 'border-indigo-200/50',
      count: categoryCounts.mundige || 0,
      icon: Key,
      illustration: '/assets/webp/mundige-card-illustration.webp',
    },
    {
      id: 'suladi',
      titleKey: 'catSuladi',
      descKey: 'catSuladiDesc',
      bgClass: 'bg-gradient-to-br from-emerald-50 to-teal-100/80 border-teal-100 shadow-sm',
      textClass: 'text-emerald-950',
      descClass: 'text-emerald-800/90',
      countClass: 'bg-emerald-100/80 text-emerald-900 border-emerald-200/50',
      iconClass: 'bg-emerald-100/80 text-emerald-700 border-emerald-200/50',
      viewClass: 'border-teal-200/50',
      count: categoryCounts.suladi || 0,
      icon: Scroll,
      illustration: '/assets/webp/suladi-card-illustration.webp',
    },
    {
      id: 'ugabhoga',
      titleKey: 'catUgabhoga',
      descKey: 'catUgabhogaDesc',
      bgClass: 'bg-gradient-to-br from-rose-50 to-red-100/80 border-red-100 shadow-sm',
      textClass: 'text-rose-950',
      descClass: 'text-rose-800/90',
      countClass: 'bg-rose-100/80 text-rose-900 border-rose-200/50',
      iconClass: 'bg-rose-100/80 text-rose-700 border-rose-200/50',
      viewClass: 'border-red-200/50',
      count: categoryCounts.ugabhoga || 0,
      icon: Wind,
      illustration: '/assets/webp/ugabhoga-card-illustration.webp',
    },
    {
      id: 'all',
      titleKey: 'catAll',
      descKey: 'catAllDesc',
      bgClass: 'bg-gradient-to-br from-slate-50 to-slate-200/80 border-slate-300 shadow-sm',
      textClass: 'text-slate-900',
      descClass: 'text-slate-700',
      countClass: 'bg-slate-200 text-slate-800 border-slate-300/50',
      iconClass: 'bg-slate-200 text-slate-700 border-slate-300/50',
      viewClass: 'border-slate-300/50',
      count: categoryCounts.all || 0,
      icon: BookOpen,
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
                  className="block"
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className={`group relative overflow-hidden rounded-[1.75rem] p-6 ${cat.bgClass} border flex flex-col justify-between min-h-[220px] h-full cursor-pointer transition-all duration-300`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-6 -mt-6" />
                    
                    {cat.illustration && (
                      <div className="absolute right-3 bottom-2 h-[82%] w-[45%] pointer-events-none select-none transition-all duration-500 group-hover:scale-105 mix-blend-multiply">
                        <Image 
                          src={cat.illustration} 
                          alt="" 
                          fill
                          className="object-contain object-right-bottom"
                          sizes="(max-width: 768px) 150px, 200px"
                        />
                      </div>
                    )}

                    <div className="relative z-10 flex justify-between items-start mb-4">
                      <div className={`p-2.5 rounded-xl border ${cat.iconClass}`}>
                        <cat.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${cat.countClass}`}>
                        {cat.count.toLocaleString(lang === 'KN' ? 'kn-IN' : 'en-US')} {t('compositions')}
                      </span>
                    </div>

                    <div className={`relative z-10 ${cat.illustration ? 'max-w-[62%]' : ''} mb-4`}>
                      <Typography variant="h2" className={`text-xl font-bold mb-2 ${cat.textClass}`}>
                        {t(cat.titleKey)}
                      </Typography>
                      
                      <Typography variant="p" className={`text-white/85 text-xs leading-relaxed font-medium font-sans ${cat.descClass}`}>
                        {t(cat.descKey)}
                      </Typography>
                    </div>
                    
                    <div className={`relative z-10 mt-auto pt-4 border-t ${cat.viewClass} flex items-center justify-between`}>
                      <span className={`inline-flex items-center gap-2 text-xs font-bold hover:underline transition-all ${cat.textClass}`}>
                        {t('viewCategory')}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${cat.textClass}`} />
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
                        className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "space-y-3"}
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
