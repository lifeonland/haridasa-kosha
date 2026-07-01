'use client';

import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerButtonProps {
  url: string;
}

export default function AudioPlayerButton({ url }: AudioPlayerButtonProps) {
  const [isMounted, setIsMounted] = useState(false);

  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(url);

  if (!isMounted) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowPlayer(!showPlayer)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-md group"
      >
        {showPlayer ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
        <span className="text-[10px] font-bold tracking-widest uppercase">
          {showPlayer ? 'Close Player' : 'Listen'}
        </span>
      </button>

      <AnimatePresence>
        {showPlayer && videoId && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-4 left-0 z-50 bg-white p-3 rounded-2xl shadow-2xl border border-slate-100 max-w-[calc(100vw-32px)]"
          >
            <div className="rounded-xl overflow-hidden bg-black/5 flex items-center justify-center w-full max-w-[280px] aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-3 font-medium whitespace-nowrap">
              If audio doesn't start, click play.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
