'use client';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Send, Bot, Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AskAiPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Array<{id: string, role: 'user' | 'ai', content: string}>>([
    { id: 'welcome', role: 'ai', content: t('aiMeaningfulWelcome') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <main className="min-h-screen bg-[#fcfaf7] py-16 px-6">
      <div className="max-w-3xl mx-auto flex flex-col h-[85vh]">
            <div className="text-center space-y-4 mb-8">
                <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                    <Sparkles className="h-3 w-3" />
                    {t('navAskAI')}
                </div>
                <Typography variant="h1" className="text-3xl md:text-4xl font-bold tracking-tight">{t('navAskAI')}</Typography>
            </div>

            {/* Chat Container */}
            <div className="flex-1 bg-white border border-slate-100 rounded-[2rem] p-4 md:p-8 shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden relative">
                {/* Decorative background overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
                
                <div className="flex-1 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-200 relative z-10">
                {messages.map((m) => (
                    <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}>
                        {m.role === 'ai' && (
                            <div className="h-10 w-10 shrink-0 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-sm">
                                <Bot className="h-5 w-5" />
                            </div>
                        )}
                        <div className={`p-4 md:p-5 rounded-[1.5rem] max-w-[90%] md:max-w-[80%] text-sm leading-relaxed ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-secondary text-secondary-foreground rounded-tl-none shadow-sm'}`}>
                            <div className="prose prose-sm prose-slate max-w-none">
                              <ReactMarkdown>
                                {m.content}
                              </ReactMarkdown>
                            </div>
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                            <Bot className="h-5 w-5 animate-pulse" />
                        </div>
                        <div className="p-5 rounded-[1.5rem] bg-secondary text-secondary-foreground text-sm shadow-sm">{t('thinking')}</div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="flex gap-2 bg-slate-50 p-2 rounded-[2rem] border border-slate-100 mt-6 relative z-10 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 p-4 bg-transparent border-none outline-none text-sm placeholder:text-slate-400"
                    placeholder="Ask about Purandara Dasa..."
                />
                <Button onClick={() => handleSend()} className="rounded-[1.5rem] px-6 h-12 shadow-sm">
                    <Send className="h-4 w-4" />
                </Button>
                </div>
            </div>
      </div>
    </main>
  );
}
