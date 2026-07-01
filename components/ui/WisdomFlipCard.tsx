'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Music, BookOpen, Star } from 'lucide-react';

interface WisdomFlipCardProps {
  title?: string;
  quote: string;
  source: string;
  meaning?: string;
  transliteration?: string;
  raga?: string;
  tala?: string;
  deity?: string;
  ankita?: string;
}

export function WisdomFlipCard({ title, quote, source, meaning, transliteration, raga, tala, deity, ankita }: WisdomFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Deterministically calculate a hue rotation based on the quote string
  // This ensures every composition gets its own unique, consistent color theme!
  const hueRotate = quote.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
  }, 0) % 360;

  return (
    <div className="relative w-full h-[400px] md:h-[450px] perspective-1000 group">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        {/* Front of Card */}
        <div 
           className="absolute inset-0 backface-hidden rounded-[2.5rem] shadow-2xl border border-white/80 overflow-hidden"
           style={{ backgroundColor: `hsl(${hueRotate}, 50%, 95%)` }}
        >
          <div className="w-full h-full p-8 md:p-12 flex flex-col justify-between items-center text-center relative z-10">
            <div className="z-10 w-full flex justify-between items-start opacity-70">
              <Quote className="h-8 w-8 text-primary" />
              {(raga || tala) && (
                <div className="flex gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-500 bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/40 shadow-sm items-center">
                    <Music className="w-3 h-3 mr-1 text-primary" />
                    <span>{raga || 'Ragamalika'}</span>
                    <span className="opacity-50 mx-1">•</span>
                    <span>{tala || 'Adi'}</span>
                </div>
              )}
            </div>
            
            <div className="z-10 w-full flex-grow flex flex-col items-center justify-center py-4">
              {title && title !== quote && (
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-primary/80 mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
                  {title}
                </h3>
              )}
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900 font-kannada">
                <span className="text-primary/30 mr-1">"</span>
                {quote}
                <span className="text-primary/30 ml-1">"</span>
              </h2>
            </div>
            
            <div className="z-10 mt-auto w-full flex flex-col items-center gap-3">
              <div className="flex flex-col items-center">
                  <p className="text-sm font-bold tracking-widest uppercase text-primary/90">
                    {source}
                  </p>
                  {deity && (
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium mt-1">
                          Dedicated to {deity}
                      </p>
                  )}
              </div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold bg-slate-100/80 px-4 py-1.5 rounded-full mt-2 inline-flex items-center gap-2">
                 <BookOpen className="w-3 h-3" />
                 Click to reveal meaning
              </p>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div 
            className="w-full h-full p-8 md:p-12 rounded-[2.5rem] shadow-2xl border flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ 
              backgroundColor: `hsl(${hueRotate}, 40%, 12%)`,
              borderColor: `hsl(${hueRotate}, 30%, 25%)`
            }}
          >
            <div className="z-10 w-full max-w-lg flex flex-col h-full justify-center pb-8">
              
              <div className="flex flex-col items-center justify-center flex-grow">
                <Quote className="w-8 h-8 text-primary/40 mb-6" />
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-4">
                  Spiritual Meaning
                </h4>
                <div className="relative w-full">
                    <p className="text-lg md:text-xl text-white font-medium leading-relaxed line-clamp-6 px-4">
                      {meaning || "The profound message within this composition invites us to reflect deeply on our devotion."}
                    </p>
                </div>
              </div>

              {ankita && (
                 <div className="mt-auto pt-6 flex justify-center border-t border-slate-800">
                   <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                       Signature: <span className="text-amber-500/90">{ankita}</span>
                   </p>
                 </div>
              )}
            </div>

            <p className="absolute bottom-6 text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md">
                Click to flip back
            </p>
          </div>
        </div>
      </motion.div>
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
