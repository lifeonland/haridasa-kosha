'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Send, Bot, User, Sparkles, Mic, Zap, BookOpen, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const promptExamples = [
  "Who was Purandara Dasa?",
  "Explain Jagadoddharana",
  "Meaning of Bhagyada Lakshmi Baramma",
  "What is Dvaita philosophy?",
  "Tell me about Kanaka Dasa"
];

export default function AskAiPage() {
  const { t } = useLanguage();
  const [dailyWisdom, setDailyWisdom] = useState<any>(null);
  const [messages, setMessages] = useState<Array<{id: string, role: 'user' | 'ai', content: string}>>([
    { id: 'welcome', role: 'ai', content: t('aiMeaningfulWelcome') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/daily-wisdom')
      .then(res => res.json())
      .then(data => setDailyWisdom(data))
      .catch(err => console.error("Error fetching daily wisdom:", err));

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % promptExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (messageText: string = input) => {
    if (!messageText.trim() || isLoading) return;
    
    const userMessage = messageText.trim();
    setInput('');
    const newUserMessage = { id: Date.now().toString(), role: 'user' as const, content: userMessage };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, newUserMessage] }),
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: t('aiErrorMessage') }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfaf7] py-12 px-6">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
             style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 relative z-10">
        {/* Main Chat Area */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            <div className="bg-blue-100 text-slate-900 text-center py-3 px-4 rounded-2xl text-xs font-bold tracking-widest mb-4">
              {t('askAiPrototypeWarning')}
            </div>
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-xs font-bold  tracking-widest">
                    <Sparkles className="h-3 w-3 text-primary" />
                    {t('navAskAI')}
                </div>
                <Typography variant="h1" className="text-4xl font-bold">{t('navAskAI')}</Typography>
            </div>

            {/* Chat Container */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm min-h-[50vh] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                {messages.map((m) => (
                    <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}>
                        {m.role === 'ai' && (
                            <div className="h-10 w-10 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
                                <Bot className="h-5 w-5" />
                            </div>
                        )}
                        <div className={`p-5 rounded-[1.5rem] max-w-[85%] text-sm leading-relaxed ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm'}`}>
                            {m.content}
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                            <Bot className="h-5 w-5 animate-pulse" />
                        </div>
                        <div className="p-5 rounded-[1.5rem] bg-white border border-slate-100 text-slate-400 text-sm shadow-sm">{t('thinking')}</div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="flex gap-2 bg-slate-50 p-2 rounded-[2rem] border border-slate-100 mt-6">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 p-4 bg-transparent border-none outline-none text-sm placeholder:text-slate-400"
                    placeholder={promptExamples[placeholderIndex]}
                />
                <Button onClick={() => handleSend()} className="rounded-[1.5rem] px-6 h-12">
                    <Send className="h-4 w-4" />
                </Button>
                </div>
            </div>
        </div>
        
        {/* Sidebar Widgets */}
        <aside className="col-span-4 hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <Typography variant="h4" className="font-bold text-sm mb-4">Quick Start</Typography>
                <div className="space-y-2">
                    {promptExamples.map(p => (
                        <button key={p} onClick={() => handleSend(p)} className="block w-full text-left text-xs p-3 rounded-xl bg-slate-50 hover:bg-primary/5 text-slate-700 transition">
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden group">
                 <Typography variant="h4" className="font-bold text-sm mb-4">{t('dailyWisdom')}</Typography>
                 {dailyWisdom ? (
                    <Link href={dailyWisdom?.composition?.id ? `/library/${dailyWisdom.composition.id}` : "#"} className="block space-y-3">
                        <div className="h-32 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/30 group-hover:bg-primary/10 transition-colors">
                            <Sparkles className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500"/>
                        </div>
                        <Typography variant="h5" className="font-bold text-sm group-hover:text-primary transition-colors">{t(dailyWisdom?.composition?.title || 'Unknown')}</Typography>
                        <Typography variant="p" className="text-[10px] text-slate-500 tracking-widest uppercase">{t(dailyWisdom?.composition?.composer?.name || 'Unknown')}</Typography>
                        <Typography variant="p" className="text-xs text-slate-600 line-clamp-2 italic leading-relaxed">
                            "{dailyWisdom?.quote?.text || ''}"
                        </Typography>
                    </Link>
                 ) : (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-32 rounded-2xl bg-slate-50" />
                        <div className="h-4 bg-slate-50 rounded w-3/4" />
                        <div className="h-3 bg-slate-50 rounded w-1/2" />
                    </div>
                 )}
            </div>
        </aside>

      </div>
    </main>
  );
}
