'use client';

import Link from 'next/link';
import { Typography } from '@/components/ui/typography';
import { useLanguage } from '@/components/shared/LanguageContext';
import { ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBookmarks } from '@/lib/useBookmarks';

interface CompositionCardProps {
  id: string;
  title: string;
  firstLine: string;
  composerName: string;
  deityName: string;
  raga?: string;
  tala?: string;
  hasLyrics?: boolean;
  featured?: boolean;
}

export default function CompositionCard({
  id,
  title,
  firstLine,
  composerName,
  deityName,
  raga = "TBD",
  tala = "TBD",
  hasLyrics = true,
  featured = false,
}: CompositionCardProps) {
  const { t } = useLanguage();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const saved = isBookmarked(id);

  return (
    <motion.div
        whileHover={{ y: -5 }}
        className="group relative bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
        <Link href={`/library/${id}`} className="block flex-grow">
            <div className="flex justify-between items-start mb-2">
              <Typography variant="h3" className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {t(title)}
              </Typography>
              {!hasLyrics && (
                <span className="shrink-0 ml-2 px-2 py-1 rounded-md bg-amber-50 text-[10px] font-bold text-amber-600 border border-amber-100 uppercase tracking-tighter">
                  Coming Soon
                </span>
              )}
            </div>
            
            <Typography variant="p" className="text-xs font-bold text-slate-500 mb-4">
                {t(composerName)} • {t(deityName)}
            </Typography>

            <Typography variant="p" className="text-sm italic text-slate-600 mb-6 font-serif line-clamp-2 leading-relaxed">
                "{firstLine}"
            </Typography>

            <div className="flex flex-wrap gap-2 mb-8">
                {raga !== "TBD" && (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">{t(raga)}</span>
                )}
                {tala !== "TBD" && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">{t(tala)}</span>
                )}
            </div>
        </Link>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleBookmark(id);
                }}
                className={`p-2 transition-colors ${saved ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
                aria-label={saved ? "Remove bookmark" : "Add bookmark"}
            >
                {saved ? <BookmarkCheck className="h-6 w-6 fill-current"/> : <Bookmark className="h-6 w-6"/>}
            </button>
            <Link href={`/library/${id}`} className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors p-2">
                {t('read')} <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
    </motion.div>
  );
}
