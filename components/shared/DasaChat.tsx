'use client';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export default function DasaChat() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: 'Namaskara! I am your AI assistant. How can I help you explore Haridasa literature today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const examples = [
    "Explain this Dasarapada",
    "Meaning of a line",
    "Similar compositions",
    "Which raga is this?",
    "Explain Madhwa philosophy"
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent, text?: string) => {
    if (e) e.preventDefault();
    const messageToSend = text || input;
    if (!messageToSend.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend }),
      });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I am unable to connect to the knowledge base.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[700px] rounded-3xl overflow-hidden border-border shadow-2xl p-0">
      <CardHeader className="p-8 border-b border-border bg-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-royal rounded-xl flex items-center justify-center text-white s shadow-lg shadow-royal/20">🕉️</div>
          <div>
            <Typography variant="h3" className="tracking-tight lg:s">Ask Dasa AI</Typography>
            <Typography variant="small" className="text-muted-foreground font-bold">Haridasa Knowledge Base</Typography>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden flex flex-col p-8 bg-background/30">
        <div ref={scrollRef} className="flex-grow overflow-y-auto mb-8 space-y-6 pr-4 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-2xl s leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-royal text-white rounded-tr-none shadow-md shadow-royal/10' 
                  : 'bg-white text-foreground rounded-tl-none border border-border shadow-sm'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-border text-muted-foreground s font-bold italic animate-pulse shadow-sm">
                Dasa is thinking...
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <Typography variant="small" className="text-muted-foreground  tracking-widest font-bold mb-3 px-1">Try asking:</Typography>
          <div className="flex flex-wrap gap-2">
            {examples.map(ex => (
              <button key={ex} onClick={() => handleSubmit(undefined, ex)} className="text-xs font-bold px-4 py-2 bg-white hover:bg-royal hover:text-white rounded-full text-muted-foreground transition-all duration-300 border border-border shadow-sm">
                {ex}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)}
            className="flex-grow border border-border bg-white px-6 py-4 rounded-2xl s font-medium focus:border-royal focus:ring-4 focus:ring-royal/5 outline-none transition-all placeholder:text-muted-foreground/50 shadow-sm"
            placeholder="Ask a question..." 
            disabled={isLoading}
          />
          <Button variant="royal" className="h-14 px-10 rounded-2xl" disabled={isLoading}>
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
