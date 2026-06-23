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
  const { t, lang } = useLanguage();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const saved = isBookmarked(id);

  const getDisplayTitle = (title: string) => {
    if (lang === 'EN') {
        // Extract content inside parenthesis if exists, otherwise return title
        const match = title.match(/\(([^)]+)\)/);
        return match ? match[1] : title;
    }
    return t(title);
  };

  return (
    <motion.div
        whileHover={{ y: -4 }}
        className="group relative bg-white border border-slate-100 rounded-[1.25rem] p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
        <Link href={`/library/${id}`} className="block flex-grow">
            <div className="flex justify-between items-start mb-1.5">
              <Typography variant="h3" className="text-base font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {getDisplayTitle(title)}
              </Typography>
              {!hasLyrics && (
                <span className="shrink-0 ml-2 px-2 py-0.5 rounded-md bg-amber-50 text-[9px] font-bold text-amber-600 border border-amber-100 uppercase tracking-tighter">
                  Coming Soon
                </span>
              )}
            </div>
            
            <Typography variant="p" className="text-[10px] font-bold text-slate-500 mb-2">
                {t(composerName)} • {t(deityName)}
            </Typography>

            <Typography variant="p" className="text-[11px] italic text-slate-600 mb-3 font-serif line-clamp-2 leading-relaxed">
                "{firstLine}"
            </Typography>

            <div className="flex flex-wrap gap-1.5 mb-3">
                {raga !== "TBD" && (
                    <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">{t(raga)}</span>
                )}
                {tala !== "TBD" && (
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">{t(tala)}</span>
                )}
            </div>
        </Link>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleBookmark(id);
                }}
                className={`p-1.5 transition-colors ${saved ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
                aria-label={saved ? "Remove bookmark" : "Add bookmark"}
            >
                {saved ? <BookmarkCheck className="h-5 w-5 fill-current"/> : <Bookmark className="h-5 w-5"/>}
            </button>
            <Link href={`/library/${id}`} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors p-1.5">
                {t('read')} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
        </div>
    </motion.div>
  );
}
