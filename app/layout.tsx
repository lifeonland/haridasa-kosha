'use client';

import './globals.css';
import { LanguageProvider, useLanguage } from '@/components/shared/LanguageContext';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { Navigation } from '@/components/shared/Navigation';
import { MobileNavigation } from '@/components/shared/MobileNavigation';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import { Noto_Sans_Kannada } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const kannadaFont = Noto_Sans_Kannada({ subsets: ['kannada'], variable: '--font-kannada', display: 'swap' });

function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-amber-100 text-slate-900 text-center py-2 text-[10px] font-bold tracking-widest">
          {t('prototypeWarning')}
      </div>
      <div className="bg-white/60 backdrop-blur-3xl border-b border-white/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 sm:h-20 gap-3">
          <div className="flex items-center gap-2">
            <MobileNavigation />
            <Link href="/" className="s font-bold tracking-tighter text-primary sm:s lg:s">
              {t('brand')}
            </Link>
          </div>
          <div className="flex items-center gap-6">
              <Navigation />
              <div className="scale-75">
                <LanguageSwitcher />
              </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={kannadaFont.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased flex flex-col min-h-screen font-sans">
        <LanguageProvider>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
