'use client';
import { useState } from 'react';
import { useLanguage } from '@/components/shared/LanguageContext';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileNavigation() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Menu Toggle Button - Ensuring min 44px touch target */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-4 text-foreground flex items-center justify-center min-h-[44px] min-w-[44px]"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full w-full bg-background border-b border-border p-6 flex flex-col gap-6 text-lg font-bold shadow-2xl z-50"
          >
            {[
              { href: '/library', label: t('navLibrary') },
              { href: '/haridasaru', label: t('navComposers') },
              { href: '/parampara', label: t('navParampara') },
              { href: '/daily-wisdom', label: t('navDailyWisdom') },
              { href: '/ask-ai', label: t('navAskAI') },
              { href: '/about', label: t('navAbout') },
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="py-2 hover:text-primary transition-colors block border-b border-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
