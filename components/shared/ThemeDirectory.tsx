'use client';
import Link from 'next/link';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Typography } from "@/components/ui/typography";

export default function ThemeDirectory() {
  const { t } = useLanguage();
  
  const themes = [
    { name: 'Bhakti', icon: '🪔', count: 450 },
    { name: 'Jnana', icon: '✋', count: 320 },
    { name: 'Vairagya', icon: '🍃', count: 280 },
    { name: 'Guru Mahima', icon: '👣', count: 150 },
    { name: 'Nama Mahima', icon: '🔔', count: 210 },
    { name: 'Madhwa Siddhanta', icon: '☸️', count: 120 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      {themes.map((theme) => (
        <Link 
          key={theme.name} 
          href={`/library?theme=${theme.name.toLowerCase().replace(' ', '-')}`}
          className="group block"
        >
          <div className="space-y-4 py-6">
            <div className="flex justify-between items-start">
              <Typography variant="h3" className="s group-hover:text-primary transition-colors duration-500">
                {theme.icon} {t(theme.name)}
              </Typography>
              <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">VIEW &rarr;</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-primary/20 group-hover:w-full transition-all duration-700"></div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
