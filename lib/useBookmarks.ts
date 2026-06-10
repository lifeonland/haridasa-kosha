'use client';

import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('dasaverse_bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse bookmarks', e);
      }
    }
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) 
        ? prev.filter((i) => i !== id) 
        : [...prev, id];
      localStorage.setItem('dasaverse_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return { bookmarks, toggleBookmark, isBookmarked };
}
