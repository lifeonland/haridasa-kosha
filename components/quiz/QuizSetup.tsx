import React from 'react';
import { motion } from 'framer-motion';
import { AgeGroup, Difficulty, NumQuestions } from './types';
import { Zap, Sparkles, Hash } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/components/shared/LanguageContext';

interface QuizSetupProps {
  onStart: (ageGroup: AgeGroup, difficulty: Difficulty, numQuestions: NumQuestions) => void;
}

export function QuizSetup({ onStart }: QuizSetupProps) {
  const { t, lang } = useLanguage();
  // Keep ageGroup in state for backend compatibility, but default to Adult with no UI
  const [ageGroup] = React.useState<AgeGroup>('Adult'); 
  const [difficulty, setDifficulty] = React.useState<Difficulty>('Medium');
  const [numQuestions, setNumQuestions] = React.useState<NumQuestions>(10);

  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Very Hard'];

  const diffToKey = {
    'Easy': 'easy',
    'Medium': 'medium',
    'Hard': 'hard',
    'Very Hard': 'veryHard'
  };

  const difficultyIdx = difficulties.indexOf(difficulty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl"
    >
      {/* Left Side - Hero / Illustration */}
      <div className="text-left space-y-4 lg:pr-4 flex flex-col justify-center">
        <motion.div 
          animate={{ y: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl mb-2"
        >
          <Image 
            src="/images/quiz_hero_new.png" 
            alt="Haridasa Hero" 
            fill 
            className="object-cover transition-transform duration-[10000ms] group-hover:scale-110 ease-out"
          />
          {/* Magical shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-emerald-500/10 mix-blend-overlay pointer-events-none" />
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
          {t('quizTitle')}
        </h2>
        <p className="text-base text-slate-600 leading-relaxed font-medium">
          {t('quizDesc')}
        </p>
      </div>

      {/* Right Side - Configuration */}
      <div className="bg-slate-50/50 p-6 md:p-8 rounded-2xl shadow-sm flex flex-col justify-center space-y-8">
        
        {/* Difficulty Slider */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider">
              <Zap size={16} className="text-primary" /> {lang === 'KN' ? 'ಮಟ್ಟ' : 'LEVEL'}
            </label>
            <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-xs">
              {t(diffToKey[difficulty as keyof typeof diffToKey])}
            </span>
          </div>
          
          <div className="px-2">
            <input 
              type="range" 
              min="0" 
              max="3" 
              step="1" 
              value={difficultyIdx}
              onChange={(e) => setDifficulty(difficulties[parseInt(e.target.value)])}
              style={{ 
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${difficultyIdx * (100/3)}%, #e5e5ea ${difficultyIdx * (100/3)}%, #e5e5ea 100%)` 
              }}
              className="w-full h-[4px] rounded-full appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 
                [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.16),_0_0_1px_rgba(0,0,0,0.1)] 
                active:[&::-webkit-slider-thumb]:scale-95 [&::-webkit-slider-thumb]:transition-transform
                focus:outline-none"
            />
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-400 mt-3">
            <span className={difficulty === 'Easy' ? 'text-primary font-bold' : ''}>{t('easy')}</span>
            <span className={difficulty === 'Medium' ? 'text-primary font-bold' : ''}>{t('medium')}</span>
            <span className={difficulty === 'Hard' ? 'text-primary font-bold' : ''}>{t('hard')}</span>
            <span className={difficulty === 'Very Hard' ? 'text-primary font-bold' : ''}>{t('veryHard')}</span>
          </div>
        </div>

        {/* Number of Questions Slider */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider">
              <Hash size={16} className="text-primary" /> {t('numQuestionsLabel') || 'Number of Questions'}
            </label>
            <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-xs">
              {numQuestions}
            </span>
          </div>
          
          <div className="px-2">
            <input 
              type="range" 
              min="5" 
              max="15" 
              step="5" 
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value) as NumQuestions)}
              style={{ 
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${((numQuestions - 5) / 10) * 100}%, #e5e5ea ${((numQuestions - 5) / 10) * 100}%, #e5e5ea 100%)` 
              }}
              className="w-full h-[4px] rounded-full appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 
                [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.16),_0_0_1px_rgba(0,0,0,0.1)] 
                active:[&::-webkit-slider-thumb]:scale-95 [&::-webkit-slider-thumb]:transition-transform
                focus:outline-none"
            />
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-400 mt-3">
            <span className={numQuestions === 5 ? 'text-primary font-bold' : ''}>5</span>
            <span className={numQuestions === 10 ? 'text-primary font-bold' : ''}>10</span>
            <span className={numQuestions === 15 ? 'text-primary font-bold' : ''}>15</span>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => onStart(ageGroup, difficulty, numQuestions)}
            className="w-full sm:w-auto px-10 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {t('generateQuiz')} <Sparkles size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
