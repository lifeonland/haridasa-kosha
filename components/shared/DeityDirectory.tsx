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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {deities.map((deity) => (
        <Link 
          key={deity.name} 
          href={`/library?deity=${deity.name.toLowerCase()}`} 
          className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] block"
        >
          <Image 
            src={deity.image} 
            alt={t(deity.name)} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-slate-950/40 transition-opacity duration-500 group-hover:bg-slate-950/60" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
            <Typography variant="h3" className="text-white s font-bold tracking-tight">{t(deity.name)}</Typography>
            <div className="flex items-center gap-2 text-white/80 mt-2 text-xs font-bold transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <Search className="h-3 w-3" />
                {t('exploreProfile')}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
