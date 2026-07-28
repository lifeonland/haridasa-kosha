'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from "@/components/ui/typography";
import { Search } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function DeityDirectory() {
  const { t } = useLanguage();

  const deities = [
    { name: 'vittala', image: '/assets/webp/vittala.webp' },
    { name: 'krishna', image: '/assets/webp/krishna.webp' },
    { name: 'rama', image: '/assets/webp/rama.webp' },
    { name: 'lakshmi', image: '/assets/webp/lakshmi.webp' },
    { name: 'narasimha', image: '/assets/webp/narasimha.webp' },
    { name: 'hanuman', image: '/assets/webp/hanuman.webp' },
    { name: 'srinivasa', image: '/assets/webp/srinivasa.webp' },
    { name: 'shiva', image: '/assets/webp/shiva.webp' }
  ];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Fade masks for edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex gap-6 w-max animate-marquee pause-on-hover">
        {[...deities, ...deities].map((deity, idx) => (
          <Link 
            key={`${deity.name}-${idx}`} 
            href={`/library?deity=${deity.name.toLowerCase()}`} 
            className="group relative overflow-hidden rounded-3xl w-72 h-80 block shrink-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Image 
              src={deity.image} 
              alt={t(deity.name)} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
            
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end items-center text-center transform transition-transform duration-500">
              <Typography variant="h3" className="text-white font-bold tracking-tight text-xl mb-1">{t(deity.name)}</Typography>
              <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <Search className="h-4 w-4" />
                  {t('exploreProfile')}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
