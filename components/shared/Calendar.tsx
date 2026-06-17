import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function Calendar({ currentDate, onDateChange }: CalendarProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const changeMonth = (offset: number) => {
    onDateChange(new Date(year, month + offset, 1));
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => changeMonth(-1)}><ChevronLeft /></Button>
        <h3 className="font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <Button variant="ghost" size="icon" onClick={() => changeMonth(1)}><ChevronRight /></Button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {blanks.map(b => <div key={b} />)}
        {days.map(day => {
          const date = new Date(year, month, day);
          const isSelected = date.toDateString() === currentDate.toDateString();
          return (
            <button
              key={day}
              onClick={() => onDateChange(date)}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-slate-100'}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
