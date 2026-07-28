'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizSetup } from '@/components/quiz/QuizSetup';
import { QuizActive } from '@/components/quiz/QuizActive';
import { QuizResult } from '@/components/quiz/QuizResult';
import { AgeGroup, Difficulty, Question, QuizState } from '@/components/quiz/types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '@/components/shared/LanguageContext';
import Image from 'next/image';

export default function QuizPage() {
  const { lang } = useLanguage();
  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [quizSettings, setQuizSettings] = useState<{ ageGroup: AgeGroup, difficulty: Difficulty } | null>(null);

  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleStart = async (ageGroup: AgeGroup, difficulty: Difficulty, numQuestions: number = 10) => {
    setQuizState('loading');
    setQuizSettings({ ageGroup, difficulty });
    
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ageGroup, difficulty, lang, numQuestions }),
      });
      
      const data = await res.json();
      
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setQuizState('active');
      } else {
        throw new Error('Failed to load questions');
      }
    } catch (error) {
      console.error(error);
      alert('There was an error generating the quiz. Please try again.');
      setQuizState('setup');
    }
  };

  const handleComplete = (finalScore: number, finalQuestions: Question[], answers: number[]) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setQuizState('result');
  };

  const handleRestart = () => {
    setQuizState('setup');
    setQuestions([]);
    setUserAnswers([]);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 pt-4 pb-8 relative z-10 flex-grow flex flex-col">
        {/* Navigation Breadcrumb */}
        <div className="w-full mb-4 flex justify-start">
          <Link href="/" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-bold text-xs transition-colors bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/20 shadow-sm hover:shadow-md">
            {lang === 'KN' ? '← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' : '← Back to Home'}
          </Link>
        </div>

        <div className="w-full max-w-5xl mx-auto flex-grow flex flex-col mt-4 md:mt-8">
          <AnimatePresence mode="wait">
          {quizState === 'setup' && (
            <QuizSetup key="setup" onStart={handleStart} />
          )}

          {quizState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="relative flex items-center justify-center w-12 h-12 mt-4">
                {/* Glowing backdrop */}
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse scale-150"></div>
                {/* Outer subtle ring */}
                <div className="absolute inset-0 border-[3px] border-slate-200/50 rounded-full"></div>
                {/* Inner fast spinning ring */}
                <div className="absolute inset-0 border-[3px] border-transparent border-t-primary border-r-primary rounded-full animate-[spin_1s_linear_infinite]"></div>
                {/* Inner slow spinning ring (reverse) */}
                <div className="absolute inset-1.5 border-[3px] border-transparent border-b-orange-400 border-l-orange-400 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mt-10 tracking-tight">{lang === 'KN' ? 'ನಿಮ್ಮ ರಸಪ್ರಶ್ನೆಯನ್ನು ರಚಿಸಲಾಗುತ್ತಿದೆ...' : 'Generating Your Quiz...'}</h3>
              <p className="text-slate-500 mt-2">{lang === 'KN' ? 'ದಾಸ ಸಾಹಿತ್ಯದಿಂದ ಜ್ಞಾನವನ್ನು ಕರೆಯಲಾಗುತ್ತಿದೆ...' : 'Summoning wisdom from the Dasa Sahitya...'}</p>
            </motion.div>
          )}

          {quizState === 'active' && questions.length > 0 && (
            <QuizActive 
              key="active" 
              questions={questions} 
              onComplete={handleComplete} 
            />
          )}

          {quizState === 'result' && (
            <QuizResult 
              key="result" 
              score={score} 
              total={questions.length} 
              questions={questions}
              userAnswers={userAnswers}
              settings={quizSettings}
              onRestart={handleRestart} 
            />
          )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
