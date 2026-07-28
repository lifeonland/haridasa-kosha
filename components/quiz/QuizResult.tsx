import React from 'react';
import { motion } from 'framer-motion';
import { Question } from './types';
import { Trophy, RefreshCcw, Medal, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/shared/LanguageContext';

interface QuizResultProps {
  score: number;
  total: number;
  questions: Question[];
  userAnswers: number[];
  settings?: { ageGroup: string; difficulty: string } | null;
  onRestart: () => void;
}

export function QuizResult({ score, total, questions, userAnswers, settings, onRestart }: QuizResultProps) {
  const { t } = useLanguage();
  const percentage = (score / total) * 100;
  
  let message = t('keepLearning');
  let subMessage = t('keepLearningSub');
  let color = "text-amber-500";
  let bgGradient = "from-amber-500/20 to-orange-500/5";
  
  if (percentage === 100) {
    message = t('perfectScore');
    subMessage = t('perfectScoreSub');
    color = "text-emerald-500";
    bgGradient = "from-emerald-500/20 to-teal-500/5";
  } else if (percentage >= 75) {
    message = t('excellentWork');
    subMessage = t('excellentWorkSub');
    color = "text-blue-500";
    bgGradient = "from-blue-500/20 to-indigo-500/5";
  } else if (percentage >= 50) {
    message = t('goodEffort');
    subMessage = t('goodEffortSub');
    color = "text-primary";
    bgGradient = "from-primary/20 to-orange-500/5";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-sm mx-auto w-full pb-20"
    >
      {/* Score Card */}
      <div className="relative">
        <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 text-center overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} pointer-events-none opacity-40`} />
          
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative z-10 flex justify-center mb-4"
          >
            <div className={`p-3 rounded-full bg-white shadow-md ${color}`}>
              {percentage === 100 ? <Trophy size={32} /> : <Medal size={32} />}
            </div>
          </motion.div>

          <div className="relative z-10">
            <h2 className="text-xl font-black text-slate-800 mb-1 tracking-tight">{message}</h2>
            <p className={`text-xs text-slate-500 font-medium ${settings ? 'mb-4' : 'mb-6'}`}>{subMessage}</p>

            {settings && (
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{settings.difficulty} Level</span>
              </div>
            )}

            <div className="flex flex-col justify-center items-center mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('quizScore')}</span>
              
              {/* Graphical Score Ring */}
              <div className="relative w-24 h-24 mt-2">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    className="text-slate-100 stroke-current drop-shadow-sm"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  {/* Animated Progress Circle */}
                  <motion.circle
                    className={`${color} stroke-current`}
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    initial={{ strokeDasharray: "251.2", strokeDashoffset: "251.2" }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * percentage) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                  />
                </svg>
                
                {/* Score Text in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex items-baseline gap-0.5 mt-1">
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: 'spring' }}
                      className={`text-2xl font-black tracking-tighter ${color}`}
                    >
                      {score}
                    </motion.span>
                    <span className="text-sm font-bold text-slate-300">/{total}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={onRestart}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-sm hover:-translate-y-0.5"
              >
                <RefreshCcw size={16} /> {t('quizRestart')}
              </button>
              
              <Link 
                href="/haridasaru"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white border-2 border-primary/20 text-primary font-bold text-sm hover:bg-primary/5 transition-all"
              >
                {t('exploreCompositionsBtn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
