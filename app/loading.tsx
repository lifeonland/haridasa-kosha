import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-10 h-10 mb-6">
        {/* Glowing backdrop */}
        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse scale-150"></div>
        {/* Outer subtle ring */}
        <div className="absolute inset-0 border-2 border-slate-200/50 rounded-full"></div>
        {/* Inner fast spinning ring */}
        <div className="absolute inset-0 border-2 border-transparent border-t-primary border-r-primary rounded-full animate-[spin_1s_linear_infinite]"></div>
        {/* Inner slow spinning ring (reverse) */}
        <div className="absolute inset-1.5 border-2 border-transparent border-b-orange-400 border-l-orange-400 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-sm font-black text-slate-700 tracking-[0.3em] uppercase animate-pulse">
          Loading
        </h3>
        <p className="text-xs text-slate-400 font-medium">Please wait a moment...</p>
      </div>
    </div>
  );
}
