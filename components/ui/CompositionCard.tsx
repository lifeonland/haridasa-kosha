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
  lyrics?: string;
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
  lyrics,
}: CompositionCardProps) {
  const { t, lang } = useLanguage();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const saved = isBookmarked(id);

  const getKannadaLines = () => {
    if (!lyrics) return [];
    return lyrics.split('\n')
      .map(l => l.trim())
      .filter(l => 
        l && 
        !l.toLowerCase().includes('pallavi') && 
        !l.includes('ಪಲ್ಲವಿ') &&
        !l.match(/^\d*\.?\s*(ಧ್ರುವ|ಮಟ್ಟ|ರೂಪಕ|ಝಂಪೆ|ತ್ರಿಪುಟ|ಅಟ್ಟ|ಏಕ|ತಾಳ|ಉಗಾಭೋಗ|ಸುಳಾದಿ)/i) &&
        !l.match(/^(dhruva|matta|rupaka|jhampe|triputa|atta|eka|tala|ugabhoga|suladi)/i)
      );
  };

  const cleanKannadaLine = (line: string) => {
    return line
      .replace(/\|\|\s*ಪ\s*\|\|/g, '')
      .replace(/\(ಪ\.\)/g, '')
      .replace(/\(ಪ\)/g, '')
      .replace(/ಪ\./g, '')
      .replace(/\|\|\s*ಅ\.ಪ\s*\|\|/g, '')
      .replace(/\(ಅ\.ಪ\.\)/g, '')
      .replace(/\|/g, '')
      .trim();
  };

  const getDisplayTitle = (title: string) => {
    let display = title;
    if (lang === 'KN' && lyrics) {
      const kLines = getKannadaLines();
      if (kLines.length > 0) display = cleanKannadaLine(kLines[0]);
    } else if (lang === 'EN') {
        const match = title.match(/\(([^)]+)\)/);
        display = match ? match[1] : title;
    } else {
        display = t(title);
    }
    return display.replace(/\[Suladi\]\s*/gi, '');
  };

  const getDisplayFirstLine = () => {
    if (lang === 'KN' && lyrics) {
      const kLines = getKannadaLines();
      if (kLines.length > 0) return cleanKannadaLine(kLines[0]);
    }
    return firstLine;
  };

  const isSuladi = title.toLowerCase().includes('suladi');
  const isUgabhoga = title.toLowerCase().includes('ugabhoga');

  return (
    <motion.div
        whileHover={{ y: -4 }}
        className="group relative bg-white border border-slate-100 rounded-[1.25rem] p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
        {/* Background Image - Only for Hariye Idu Sariye */}
        {id === 'nt-002' && (
            <div 
                className="absolute inset-0 pointer-events-none opacity-60 bg-contain bg-right-bottom bg-no-repeat group-hover:opacity-80 transition-opacity duration-500 mix-blend-multiply"
                style={{ backgroundImage: "url('/assets/webp/sharanagathi-bhakti.webp')" }}
            />
        )}

        {/* Content wrapper */}
        <div className={`relative z-10 flex flex-col h-full`}>
            <Link href={`/library/${id}`} className="block flex-grow">
                <div className="flex justify-between items-start mb-1.5">
                  <Typography variant="h3" className="text-base font-bold group-hover:text-primary transition-colors line-clamp-2 inline-flex items-center gap-1.5">
                      {getDisplayTitle(title)}
                      {id === 'vyasatirtha-29' && (
                        <span title="Has special note" className="text-amber-500 bg-amber-50 rounded-full p-0.5 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                  </Typography>
                  {!hasLyrics && (
                    <span className="shrink-0 ml-2 px-2 py-0.5 rounded-md bg-amber-50 text-[9px] font-bold text-amber-600 border border-amber-100 uppercase tracking-tighter">
                      Coming Soon
                    </span>
                  )}
                </div>
                
                <Typography variant="p" className="text-[10px] font-bold text-slate-800 mb-2">
                    {t(composerName)} • {t(deityName)}
                </Typography>

                <Typography variant="p" className="text-[11px] italic text-slate-700 mb-3 font-serif line-clamp-2 leading-relaxed">
                    "{getDisplayFirstLine()}"
                </Typography>

                <div className="flex flex-wrap gap-1.5 mb-3">
                    {raga !== "TBD" && (
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${raga === 'Stotra' ? 'text-fuchsia-700 bg-fuchsia-50 border-fuchsia-100' : 'text-indigo-700 bg-indigo-50 border-indigo-100'}`}>{t(raga)}</span>
                    )}
                    {tala !== "TBD" && (
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${tala === 'Chanted' ? 'text-cyan-700 bg-cyan-50 border-cyan-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'}`}>{t(tala)}</span>
                    )}
                    {isSuladi && (
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = '/library?category=suladi'; }}
                          className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border text-pink-700 bg-pink-50 border-pink-100 hover:bg-pink-100 transition-colors"
                        >
                          Suladi
                        </button>
                    )}
                    {isUgabhoga && (
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = '/library?category=ugabhoga'; }}
                          className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border text-orange-700 bg-orange-50 border-orange-100 hover:bg-orange-100 transition-colors"
                        >
                          Ugabhoga
                        </button>
                    )}
                </div>
            </Link>

            <div className="flex items-center justify-start gap-2 pt-2 mt-auto relative z-10">
                <Link href={`/library/${id}`} className={`flex items-center gap-1 text-[11px] font-bold transition-colors ${id === 'nt-002' ? 'bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 text-primary shadow-sm' : 'text-primary hover:text-primary/80 py-1.5 pr-2'}`}>
                    {t('read')} <ArrowRight className="h-3 w-3" />
                </Link>
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleBookmark(id);
                    }}
                    className={`h-7 w-7 flex items-center justify-center transition-colors ${saved ? 'text-primary' : (id === 'nt-002' ? 'text-slate-800 hover:text-primary' : 'text-slate-500 hover:text-primary')} ${id === 'nt-002' ? 'bg-white/90 backdrop-blur-md rounded-full shadow-sm' : ''}`}
                    aria-label={saved ? "Remove bookmark" : "Add bookmark"}
                >
                    {saved ? <BookmarkCheck className="h-3.5 w-3.5 fill-current"/> : <Bookmark className="h-3.5 w-3.5"/>}
                </button>
            </div>
        </div>
    </motion.div>
  );
}
