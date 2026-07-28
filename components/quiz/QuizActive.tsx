import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from './types';
import { CheckCircle2, XCircle, Sparkles, BrainCircuit, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/shared/LanguageContext';

interface QuizActiveProps {
  questions: Question[];
  onComplete: (score: number, questions: Question[], answers: number[]) => void;
}

export function QuizActive({ questions, onComplete }: QuizActiveProps) {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;
  const allAnswered = answeredCount === questions.length;

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (answers[qIndex] !== undefined) return; // already answered
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleFinish = () => {
    let score = 0;
    const answersArray: number[] = [];
    questions.forEach((q, idx) => {
      const ans = answers[idx] ?? -1;
      answersArray.push(ans);
      if (ans === q.correctIndex) {
        score += 1;
      }
    });
    onComplete(score, questions, answersArray);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col pb-20 relative">
      
      {/* Sticky Header with Progress and Navigation */}
      <div className="sticky top-20 z-50 bg-white/90 backdrop-blur-2xl rounded-3xl p-5 md:p-6 shadow-xl shadow-slate-200/50 border border-slate-100 mb-10 flex flex-col gap-4">
        <div>
          <div className="flex justify-between text-[11px] md:text-xs font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">
            <span>{answeredCount} / {questions.length} {t('quizCompleted') || 'Answered'}</span>
            <span className="text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 md:h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-400 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Question Numbers Navigation */}
        <div className="flex flex-wrap gap-2 pt-2">
          {questions.map((_, idx) => {
            const isAnswered = answers[idx] !== undefined;
            return (
              <button
                key={idx}
                onClick={() => {
                  document.getElementById(`question-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  isAnswered 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {questions.map((currentQuestion, qIdx) => {
          const isRevealed = answers[qIdx] !== undefined;
          const selectedAnswer = answers[qIdx];

          return (
            <motion.div 
              id={`question-${qIdx}`}
              key={qIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              {/* Question Card */}
              <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] p-6 md:p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                  <BrainCircuit size={160} />
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-primary/10 text-primary w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0 text-base shadow-inner">
                    {qIdx + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-800 leading-[1.4] tracking-tight pt-1">
                    {currentQuestion.question}
                  </h3>
                </div>
              </div>

              {/* Options Stack */}
              <div className="flex flex-col gap-3.5 relative z-20">
                {currentQuestion.options.map((option, idx) => {
                  let itemClass = "bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white border-white/50 hover:border-primary/30 shadow-md hover:shadow-xl hover:-translate-y-0.5";
                  let icon = null;

                  if (isRevealed) {
                    if (idx === currentQuestion.correctIndex) {
                      itemClass = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-4 ring-emerald-500/20 shadow-xl z-20";
                      icon = (
                        <div className="flex items-center gap-2 relative">
                          <Sparkles className="text-emerald-500 animate-pulse hidden md:block" size={20} />
                          <CheckCircle2 className="text-emerald-500" size={26} />
                          
                          {/* Tooltip Popup triggered by hovering the option button (which has 'group' class) */}
                          {currentQuestion.explanation && (
                            <div className="absolute bottom-full right-0 mb-4 w-[280px] md:w-80 p-4 bg-slate-800 text-white text-sm leading-relaxed rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none origin-bottom-right scale-95 group-hover:scale-100 text-left">
                              <span className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5"><Sparkles size={14}/> {t('aiInsight')}</span>
                              <span className="font-medium text-slate-200">{currentQuestion.explanation}</span>
                              {/* Triangle pointer */}
                              <div className="absolute top-full right-4 w-3 h-3 bg-slate-800 rotate-45 -translate-y-1.5 rounded-sm"></div>
                            </div>
                          )}
                        </div>
                      );
                    } else if (idx === selectedAnswer) {
                      itemClass = "bg-red-50 border-red-400 text-red-900 ring-4 ring-red-500/20 shadow-xl z-10";
                      icon = <XCircle className="text-red-500" size={26} />;
                    } else {
                      itemClass = "bg-white/50 text-slate-400 border-transparent opacity-50 scale-[0.99]";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(qIdx, idx)}
                      disabled={isRevealed}
                      className={`w-full text-left px-5 py-4 md:px-6 md:py-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group relative ${itemClass}`}
                    >
                      <span className="font-bold text-base leading-relaxed pr-4">{option}</span>
                      {icon && <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [-10, 0] }} transition={{ type: 'spring' }}>{icon}</motion.div>}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Finish Button */}
      <AnimatePresence>
        {allAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-20"
          >
            <button
              onClick={handleFinish}
              className="flex items-center gap-3 px-12 py-5 rounded-full bg-slate-900 text-white font-black text-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              {t('quizFinish')}
              <ArrowRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
