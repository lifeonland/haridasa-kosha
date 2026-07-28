"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/shared/LanguageContext';
import { LEARNING_PATHS } from '../../data';
import { BookOpen, CheckCircle2, Circle, ChevronLeft, ChevronRight, Loader2, Award, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface Unit {
  id: string;
  title: string;
  content: string;
}

function parseMarkdownToUnits(markdown: string, fallbackOverview: string): { title: string; units: Unit[] } {
  // Normalize line endings
  let normalized = markdown.replace(/\r\n/g, '\n');
  
  // Remove markdown horizontal rules as they cause visual clutter at the end of paginated units
  normalized = normalized.replace(/\n\s*[-_*]{3,}\s*(?=\n|$)/g, '\n');
  
  // Promote Practice/Self-Assessment from ### to ## so it becomes its own unit
  normalized = normalized.replace(/\n###\s*(Practice.*|Self-Assessment.*)(?=\n|$)/gi, '\n## $1');
  
  // Split by "## " at the start of a line
  const parts = normalized.split(/\n## /);
  
  let moduleTitle = "Learning Module";
  const units: Unit[] = [];
  
  parts.forEach((part, index) => {
    let text = part.trim();
    if (!text) return;

    if (index === 0) {
      // The first part might start with "# Title" or "## " if there was no title
      if (normalized.startsWith('## ')) {
        // It was a ## header from the very beginning
        text = '## ' + text; 
      } else {
        // Extract # Title
        const titleMatch = text.match(/^# (.*)/);
        if (titleMatch) {
          moduleTitle = titleMatch[1].replace(/\*\*/g, '');
        }
        // Remove the H1
        text = text.replace(/^# .*\n?/, '').trim();
        
        // Always create an Overview unit, use fallback if text is empty
        units.push({ id: `unit-${index}`, title: "Overview", content: text || fallbackOverview });
        return;
      }
    } else {
      // Re-attach the '## ' that was split out
      text = '## ' + text;
    }

    // Now text starts with "## Title\nContent"
    const newlineIdx = text.indexOf('\n');
    let title = "Section";
    let content = text;

    if (newlineIdx !== -1) {
      title = text.substring(3, newlineIdx).replace(/\*\*/g, '').trim();
      content = text.substring(newlineIdx + 1).trim();
    } else {
      title = text.substring(3).replace(/\*\*/g, '').trim();
      content = "";
    }

    // Prevent duplicate Overview or empty units from breaking the UI
    if (title.toLowerCase() === 'overview' && units.some(u => u.title === 'Overview')) {
      return; 
    }
    
    if (content) {
      units.push({ id: `unit-${index}`, title, content });
    }
  });

  // If no units were found (bad formatting), just put it all in one unit
  if (units.length === 0) {
    units.push({ id: 'unit-0', title: 'Lesson Content', content: markdown });
  }

  return { title: moduleTitle, units };
}

export default function ModuleReaderPage() {
  const { lang } = useLanguage();
  const { level, topic } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [moduleTitle, setModuleTitle] = useState("");
  const [units, setUnits] = useState<Unit[]>([]);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [completedUnits, setCompletedUnits] = useState<Set<number>>(new Set([0]));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathLevel = typeof level === 'string' ? level.toLowerCase() : '';
  const pathTopic = typeof topic === 'string' ? topic.toLowerCase() : '';
  const pathData = LEARNING_PATHS[pathLevel];
  const moduleData = pathData?.modules.find(m => m.id === pathTopic);

  useEffect(() => {
    async function fetchLesson() {
      if (!pathData || !moduleData) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/learn', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            level: pathData.title.EN, 
            topic: moduleData.title.EN, 
            lang 
          })
        });
        const data = await res.json();
        
        if (!data.content) {
          throw new Error(data.error || 'Failed to load lesson content');
        }

        const fallbackDesc = moduleData ? moduleData.description[lang as 'EN'|'KN'] : "Welcome to this learning module.";

        const parsed = parseMarkdownToUnits(data.content, fallbackDesc);
        setModuleTitle(parsed.title || moduleData.title[lang as 'EN'|'KN']);
        setUnits(parsed.units);
      } catch (error) {
        console.error("Error fetching lesson:", error);
        // Fallback UI or empty state instead of crashing
        setUnits([{ 
          title: "Error Loading Content", 
          content: "There was an error loading this lesson. Please try again later.", 
          type: "text", 
          readTime: 1 
        }]);
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [pathData, moduleData, level, topic, lang]);

  if (!pathData || !moduleData) {
    return <div className="min-h-screen flex items-center justify-center">Module Not Found</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-700">
          {lang === 'KN' ? 'ಪಾಠವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...' : 'Building your curriculum...'}
        </h2>
        <p className="text-slate-500 mt-2">
          {lang === 'KN' ? 'ವಿದ್ವಾಂಸರು ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುತ್ತಿದ್ದಾರೆ' : 'This may take up to 30 seconds for new modules.'}
        </p>
      </div>
    );
  }


  const activeUnit = units[activeUnitIdx];
  const isLastUnit = activeUnitIdx === units.length - 1;

  const handleNext = () => {
    if (isLastUnit) {
      router.push('/quiz');
    } else {
      const nextIdx = activeUnitIdx + 1;
      setActiveUnitIdx(nextIdx);
      setCompletedUnits(prev => new Set(prev).add(nextIdx));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (activeUnitIdx > 0) {
      setActiveUnitIdx(activeUnitIdx - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative">
      {/* Left Sidebar (Units / TOC) */}
      <div className="w-full md:w-80 lg:w-96 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex-shrink-0 flex flex-col h-auto md:h-[calc(100vh-4rem)] md:sticky md:top-16 z-20">
        <div className="p-4 md:p-6 border-b border-slate-200 flex justify-between items-center md:items-start md:flex-col">
          <div>
            <Link href={`/learn/${pathLevel}`} className="text-slate-500 hover:text-primary flex items-center gap-2 text-sm font-semibold mb-2 md:mb-4">
              <ArrowLeft size={16} /> <span className="hidden sm:inline">{lang === 'KN' ? 'ಮಾರ್ಗಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Back to Path'}</span><span className="sm:hidden">Back</span>
            </Link>
            <h2 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
              {moduleTitle}
            </h2>
            <div className="mt-1 md:mt-2 text-xs md:text-sm text-slate-500 font-medium">
              {activeUnitIdx + 1} / {units.length} {lang === 'KN' ? 'ಘಟಕಗಳು' : 'Units'}
            </div>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
          >
            {isSidebarOpen ? 'Hide Menu' : 'Table of Contents'}
          </button>
        </div>
        
        <div className={`flex-grow overflow-y-auto p-4 space-y-1 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
          {units.map((unit, idx) => {
            const isActive = idx === activeUnitIdx;
            const isCompleted = completedUnits.has(idx);
            
            return (
              <button
                key={unit.id}
                onClick={() => {
                  setActiveUnitIdx(idx);
                  setCompletedUnits(prev => new Set(prev).add(idx));
                  setIsSidebarOpen(false); // Close on mobile after selection
                }}
                className={`w-full text-left p-3 md:p-4 rounded-xl flex items-start gap-3 transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-bold' 
                    : 'hover:bg-slate-100 text-slate-700 font-medium'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted && !isActive ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : isActive ? (
                    <div className="w-[18px] h-[18px] rounded-full border-4 border-primary" />
                  ) : (
                    <Circle size={18} className="text-slate-300" />
                  )}
                </div>
                <span className="text-sm leading-snug">{unit.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        <div className="flex-grow p-6 md:p-12 lg:px-20 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUnitIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-700 prose-blockquote:shadow-sm"
            >
              <h1 className="text-4xl font-extrabold mb-8 pb-4 border-b border-slate-200">
                {activeUnit?.title}
              </h1>
              <ReactMarkdown>{activeUnit?.content || ''}</ReactMarkdown>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Footer Navigation */}
        <div className="bg-white border-t border-slate-200 p-6 md:px-12 flex items-center justify-between sticky bottom-0 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <button
            onClick={handlePrev}
            disabled={activeUnitIdx === 0}
            className={`flex items-center gap-2 font-bold py-3 px-6 rounded-xl transition-colors ${
              activeUnitIdx === 0 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft size={20} /> {lang === 'KN' ? 'ಹಿಂದಿನ' : 'Previous'}
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center gap-2 font-bold py-3 px-8 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
          >
            {isLastUnit 
              ? (lang === 'KN' ? 'ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಿ' : 'Knowledge Check') 
              : (lang === 'KN' ? 'ಮುಂದಿನ ಘಟಕ' : 'Continue')} 
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
