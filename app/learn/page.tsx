"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/shared/LanguageContext';
import { BookOpen, Award, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { LEARNING_PATHS } from './data';

export default function LearnDashboardPage() {
  const { lang } = useLanguage();
  const paths = Object.values(LEARNING_PATHS);

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/images/quiz_bg.png" 
          alt="Background" 
          fill 
          className="object-cover opacity-30 hue-rotate-30" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white/80 to-slate-50/90" />
      </div>
      
      <div className="container mx-auto px-4 pt-6 pb-24 relative z-10 flex-grow flex flex-col">
        {/* Navigation Breadcrumb */}
        <div className="w-full max-w-5xl mx-auto mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-primary/10 shadow-sm hover:shadow-md">
            {lang === 'KN' ? '← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' : '← Back to Home'}
          </Link>
        </div>

        <div className="w-full max-w-5xl mx-auto flex-grow">
          {/* Header */}
          <div className="text-center mb-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'KN' ? 'ಹರಿದಾಸ ಸಾಹಿತ್ಯ ಕಲಿಕಾ ಮಾರ್ಗಗಳು' : 'Haridasa Sahitya Learning Paths'}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              {lang === 'KN' 
                ? 'ನಿಮ್ಮ ಜ್ಞಾನವನ್ನು ಹೆಚ್ಚಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ನಮ್ಮ ರಚನಾತ್ಮಕ ಮಾಡ್ಯೂಲ್‌ಗಳೊಂದಿಗೆ ಹರಿದಾಸ ಸಾಹಿತ್ಯದ ಆಳವನ್ನು ಅನ್ವೇಷಿಸಿ.'
                : 'Explore the depths of Haridasa literature through our structured modules designed to elevate your knowledge from beginner to master.'}
            </p>
          </div>

          {/* Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paths.map((path, idx) => (
              <Link href={`/learn/${path.id}`} key={path.id} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white hover:bg-orange-50/30 rounded-3xl border border-slate-200 hover:border-orange-200 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-orange-900/10 hover:-translate-y-1 transition-all duration-500 h-full"
                >
                  <div className={`h-40 relative p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 ${
                    path.id === 'prathama' ? 'bg-gradient-to-br from-amber-100 to-orange-200 group-hover:from-amber-200 group-hover:to-orange-300' :
                    path.id === 'madhyama' ? 'bg-gradient-to-br from-orange-100 to-red-200 group-hover:from-orange-200 group-hover:to-red-300' :
                    'bg-gradient-to-br from-indigo-100 to-purple-200 group-hover:from-indigo-200 group-hover:to-purple-300'
                  }`}>
                    
                    {/* Decorative subtle patterns */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                    
                    <div className="relative z-10 flex justify-center items-start">
                      <span className="bg-white/50 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-300/50 uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Award size={14} className="text-slate-700" /> Learning Path
                      </span>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">{path.title[lang as 'EN'|'KN']}</h2>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow text-center">
                    <p className="text-slate-600 mb-6 flex-grow">
                      {path.description[lang as 'EN'|'KN']}
                    </p>
                    
                    <div className="flex items-center justify-center gap-6 text-sm font-semibold text-slate-500 mb-8 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-orange-500" />
                        {path.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-orange-500" />
                        {path.modules.length} {lang === 'KN' ? 'ಮಾಡ್ಯೂಲ್ ಗಳು' : 'Modules'}
                      </div>
                    </div>
                    
                    <div className="w-full">
                      <div className="w-full py-3 px-4 rounded-xl bg-slate-50 text-orange-600 font-bold border border-orange-600/20 transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-orange-600 group-hover:text-white shadow-sm">
                        {lang === 'KN' ? 'ಮಾರ್ಗವನ್ನು ಅನ್ವೇಷಿಸಿ' : 'Explore Path'} <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
