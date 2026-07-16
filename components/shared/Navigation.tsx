'use client';
import { useLanguage } from '@/components/shared/LanguageContext';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { Search } from 'lucide-react';

export function Navigation() {
  const { t } = useLanguage();
  return (
    <nav className="hidden items-center justify-center gap-4 text-xs font-semibold text-foreground md:flex lg:gap-6 lg:text-sm">
      <Link href="/library" className="hover:text-primary transition-colors">{t('navLibrary')}</Link>
      <Link href="/haridasaru" className="hover:text-primary transition-colors">{t('navComposers')}</Link>
      <Link href="/graph" className="hover:text-primary transition-colors">{t('navConnections')}</Link>
      <Link href="/parampara" className="hover:text-primary transition-colors">{t('navParampara')}</Link>
      <Link href="/daily-wisdom" className="hover:text-primary transition-colors">{t('navDailyWisdom')}</Link>
      <Link href="/ask-ai" className="hover:text-primary transition-colors">{t('navAskAI')}</Link>
      <Link href="/about" className="hover:text-primary transition-colors">{t('navAbout')}</Link>
      <Link href="/ask-ai" className="text-primary hover:text-primary/80 transition-colors">
        <Search className="h-4 w-4" />
      </Link>
    </nav>
  );
}

