'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface HorizontalDateSliderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function HorizontalDateSlider({ selectedDate, onDateChange }: HorizontalDateSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  
  // Generate a window of dates (e.g., 14 days back, 14 days forward)
  const dates = Array.from({ length: 29 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 14 + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const selectedDateZero = new Date(selectedDate);
  selectedDateZero.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (selectedRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = selectedRef.current;
      
      const scrollLeft = element.offsetLeft - (container.offsetWidth / 2) + (element.offsetWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [selectedDate]);

  return (
    <div className="relative w-full mt-2 mb-2">
      <div 
        ref={containerRef}
        className="flex overflow-x-auto hide-scrollbar gap-2 px-[50%] snap-x snap-mandatory py-2 relative"
        style={{ scrollBehavior: 'smooth' }}
      >
        {dates.map((date) => {
          const isSelected = date.getTime() === selectedDateZero.getTime();
          const isToday = date.getTime() === new Date(new Date().setHours(0, 0, 0, 0)).getTime();
          
          return (
            <button
              key={date.toISOString()}
              ref={isSelected ? selectedRef : null}
              onClick={() => onDateChange(date)}
              className={`flex flex-col items-center justify-center min-w-[50px] h-[58px] rounded-xl snap-center transition-all duration-300 flex-shrink-0 relative ${
                isSelected 
                  ? 'bg-slate-900 text-white shadow-xl scale-110 z-10' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100 scale-95'
              }`}
            >
              {isToday && !isSelected && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white" />
              )}
              <span className={`text-[9px] font-bold uppercase tracking-widest ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                {format(date, 'MMM')}
              </span>
              <span className={`text-xl font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                {format(date, 'd')}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Fade edges */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
