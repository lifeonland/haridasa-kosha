'use client';

import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerButtonProps {
  url: string;
}

export default function AudioPlayerButton({ url }: AudioPlayerButtonProps) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

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
            className="absolute top-full mt-4 right-0 md:left-0 md:right-auto z-50 bg-white p-3 rounded-2xl shadow-2xl border border-slate-100"
          >
            <div className="rounded-xl overflow-hidden bg-black/5 flex items-center justify-center w-[280px] h-[157px]">
              <iframe 
                width="280" 
                height="157" 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-3 font-medium">
              If audio does not start automatically, click play above.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
