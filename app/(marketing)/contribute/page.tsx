'use client';

import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, FileText, Languages, Code } from 'lucide-react';

export default function ContributePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#fcfaf7] py-12 px-6">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      <Section spacing="lg" className="relative z-10">
        <Container>
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <Typography variant="h1" className="text-5xl font-bold tracking-tighter mb-8">
                {t('contributeTitle')}
              </Typography>
              <Typography variant="lead" className="text-xl text-slate-600 leading-relaxed">
                {t('contributeSubtitle')}
              </Typography>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {[
              { title: t('proofreading'), desc: t('proofreadingDesc'), icon: <CheckCircle2 className="h-8 w-8 text-emerald-600" /> },
              { title: t('transcription'), desc: t('transcriptionDesc'), icon: <FileText className="h-8 w-8 text-blue-600" /> },
              { title: t('translation'), desc: t('translationDesc'), icon: <Languages className="h-8 w-8 text-amber-600" /> },
              { title: t('technicalSupport'), desc: t('technicalSupportDesc'), icon: <Code className="h-8 w-8 text-indigo-600" /> }
            ].map((item, idx) => (
              <RevealOnScroll key={item.title} delay={idx * 0.1}>
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start gap-8 hover:shadow-lg transition-all duration-300">
                  <div className="h-16 w-16 shrink-0 rounded-3xl bg-slate-50 flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <Typography variant="h4" className="text-lg font-bold mb-3">{item.title}</Typography>
                    <Typography variant="p" className="text-sm text-slate-600 leading-relaxed">{item.desc}</Typography>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="rounded-full px-12 h-14 font-bold tracking-widest text-xs" asChild>
                <a href="mailto:srivatsa.m.s.91@gmail.com?subject=Contribute%20to%20The%20Haridasa%20Kosha">
                    {t('getStartedBtn')}
                </a>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
