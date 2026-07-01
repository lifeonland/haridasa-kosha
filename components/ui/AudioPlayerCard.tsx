'use client';

import { Play, Pause, Disc3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioPlayerCardProps {
  url: string;
  title: string;
  composer: string;
}

export default function AudioPlayerCard({ url, title, composer }: AudioPlayerCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(url);

  if (!isMounted || !videoId) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl bg-slate-900/5 backdrop-blur-sm border border-slate-200/50 shadow-sm max-w-2xl relative overflow-hidden group">
      
      {/* Decorative gradient blob */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* YouTube iframe acts as the "Album Art" and the actual player! */}
      <div className="w-full sm:w-48 h-28 rounded-2xl overflow-hidden shrink-0 shadow-md relative bg-black flex items-center justify-center">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&color=white`} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="absolute inset-0 object-cover scale-[1.3] opacity-90 group-hover:opacity-100 transition-opacity"
        ></iframe>
      </div>

      {/* Track Info */}
      <div className="flex flex-col w-full px-2 py-1">
        <div className="flex items-center gap-2 mb-1.5">
          <Disc3 className="w-3.5 h-3.5 text-primary animate-spin-slow opacity-70" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary/80">
            Now Playing
          </span>
        </div>
        
        <h3 className="font-bold text-lg md:text-xl text-slate-800 leading-tight mb-1 font-kannada">
          {title}
        </h3>
        
        <p className="text-sm text-slate-500 font-medium">
          {composer}
        </p>

      </div>
    </div>
  );
}
