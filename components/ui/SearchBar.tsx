'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  type?: 'compositions' | 'composers' | 'all';
}

export default function SearchBar({ 
  placeholder = 'Search compositions, composers...', 
  type = 'all' 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (type === 'all') {
      router.push(`/ask-ai?q=${encodeURIComponent(query)}`);
    } else {
      const targetPath = type === 'compositions' ? '/library' : `/${type}`;
      const params = new URLSearchParams(searchParams.toString());
      params.set('search', query);
      params.delete('page'); // Reset to first page
      router.push(`${targetPath}?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-5 py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all hover:border-slate-300"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </form>
  );
}
