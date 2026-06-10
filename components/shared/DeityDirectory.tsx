'use client';
import Link from 'next/link';
import { Typography } from "@/components/ui/typography";
import { Search } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function DeityDirectory() {
  const { t } = useLanguage();

  const deities = [
    { name: 'vittala', image: '/assets/vittala.png' },
    { name: 'krishna', image: '/assets/krishna.png' },
    { name: 'rama', image: '/assets/rama.png' },
    { name: 'lakshmi', image: '/assets/lakshmi.png' },
    { name: 'narasimha', image: '/assets/narasimha.png' },
    { name: 'hanuman', image: '/assets/hanuman.png' },
    { name: 'srinivasa', image: '/assets/srinivasa.png' },
    { name: 'shiva', image: '/assets/shiva.png' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {deities.map((deity) => (
        <Link 
          key={deity.name} 
          href={`/library?deity=${deity.name.toLowerCase()}`} 
          className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] block"
        >
          <img 
            src={deity.image} 
            alt={t(deity.name)} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
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
