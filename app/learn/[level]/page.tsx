"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/shared/LanguageContext';
import { LEARNING_PATHS } from '../data';
import { BookOpen, Award, CheckCircle, ChevronRight, Clock, ShieldCheck, GraduationCap, ArrowDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LearningPathPage() {
  const { lang } = useLanguage();
  const { level } = useParams();
  const router = useRouter();
  
  const pathLevel = typeof level === 'string' ? level.toLowerCase() : '';
  const pathData = LEARNING_PATHS[pathLevel];

  if (!pathData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold">Learning Path Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Elegant Header Banner */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-16 shadow-sm relative overflow-hidden">
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="mb-10">
            <Link href="/learn" className="text-slate-500 font-semibold hover:text-primary transition-colors flex items-center gap-2 text-sm bg-slate-100/50 inline-flex px-4 py-2 rounded-full border border-slate-200">
              ← {lang === 'KN' ? 'ಎಲ್ಲಾ ಮಾರ್ಗಗಳಿಗೆ ಹಿಂತಿರುಗಿ' : 'Back to Learning Paths'}
            </Link>
          </div>
          
          <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
                <Award size={14} /> {lang === 'KN' ? 'ಕಲಿಕಾ ಮಾರ್ಗ' : 'Learning Path'}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {pathData.title[lang as 'EN'|'KN']}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                {pathData.description[lang as 'EN'|'KN']}
              </p>
              
              <div className="flex flex-wrap gap-3 pt-6">
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-bold text-xs border border-slate-200">
                  <Clock size={14} className="text-orange-500"/> {pathData.duration}
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-bold text-xs border border-slate-200">
                  <BookOpen size={14} className="text-orange-500"/> {pathData.modules.length} {lang === 'KN' ? 'ಮಾಡ್ಯೂಲ್ ಗಳು' : 'Modules'}
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl font-bold text-xs border border-emerald-200">
                  <ShieldCheck size={14}/> {lang === 'KN' ? 'ಪಠ್ಯಕ್ರಮ' : 'Syllabus'}
                </span>
              </div>
              
              <div className="pt-6">
                <a href="#modules-section" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-semibold transition-colors group">
                  {lang === 'KN' ? 'ಮಾಡ್ಯೂಲ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View Modules'} 
                  <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-5/12 relative aspect-square max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-900/10 border-[8px] border-slate-50 rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image 
                src={pathData.imageUrl}
                alt={pathData.title.EN}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div id="modules-section" className="container mx-auto px-4 max-w-4xl mt-16 scroll-mt-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
          {lang === 'KN' ? 'ಈ ಮಾರ್ಗದಲ್ಲಿರುವ ಮಾಡ್ಯೂಲ್‌ಗಳು' : 'Modules in this learning path'}
        </h2>
        
        <div className="space-y-6">
          {pathData.modules.map((module, index) => (
            <Link href={`/learn/${pathData.id}/${module.id}`} key={module.id} className="block group">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 hover:shadow-md hover:border-orange-200 transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                {/* Module Number Badge */}
                <div className="bg-slate-50 border border-slate-100 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                  <span className="text-base font-bold text-slate-400 group-hover:text-orange-500 transition-colors">
                    {index + 1}
                  </span>
                </div>
                
                <div className="flex-grow">
                  <div className="flex gap-2 text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Clock size={12} /> {module.estimatedMinutes} min</span>
                    <span className="text-slate-200">•</span>
                    <span>Module</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-orange-600 transition-colors">
                    {module.title[lang as 'EN'|'KN']}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {module.description[lang as 'EN'|'KN']}
                  </p>
                </div>
                
                <div className="flex-shrink-0 pt-2 sm:pt-0 self-start sm:self-center">
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:scale-110">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
