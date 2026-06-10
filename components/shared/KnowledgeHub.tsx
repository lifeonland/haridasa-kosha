'use client';
import Link from 'next/link';

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

export default function KnowledgeHub() {
  const categories = [
    { title: 'Saints', icon: '🙏' },
    { title: 'Philosophy', icon: '📜' },
    { title: 'Ragas', icon: '🎶' },
    { title: 'Talas', icon: '🥁' },
    { title: 'Glossary', icon: '📖' },
    { title: 'Stories', icon: '✨' },
    { title: 'History', icon: '🏛️' },
    { title: 'Literature', icon: '🖋️' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
      {categories.map((cat) => (
        <Link 
          key={cat.title} 
          href={`/learn/${cat.title.toLowerCase()}`}
          className="group block py-10 border-b border-border/60 first:pt-0"
        >
          <div className="flex items-start gap-8">
            <div className="s opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">{cat.icon}</div>
            <div className="space-y-3">
              <Typography variant="h3" className="s group-hover:text-primary transition-colors duration-500">{cat.title}</Typography>
              <Typography variant="p" className="s text-muted-foreground mt-0 leading-relaxed max-w-sm">
                Deep scholarly resources and historical context pertaining to {cat.title.toLowerCase()} within the Haridasa tradition.
              </Typography>
              <div className="pt-2">
                <span className="text-[10px] font-bold  tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">Access Archive</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
