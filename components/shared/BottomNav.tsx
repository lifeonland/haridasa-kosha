'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Library, Users, Search } from 'lucide-react';
import { useLanguage } from '@/components/shared/LanguageContext';

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', icon: Home, label: t('navHome') || 'Home' },
    { href: '/library', icon: Library, label: t('navLibrary') },
    { href: '/haridasaru', icon: Users, label: t('navComposers') },
    { href: '/ask-ai', icon: Search, label: t('navAskAI') },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full min-h-[44px] gap-1 transition-colors ${
                isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'stroke-2' : 'stroke-[1.5]'}`} />
              <span className="text-[9px] font-bold tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
