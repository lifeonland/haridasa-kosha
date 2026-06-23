'use client';

import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/shared/LanguageContext';
import { getComposerTranslationKey } from '@/lib/utils';

interface ParamparaTimelineProps {
  composers: Array<{
    id: string;
    name: string;
    imageUrl: string | null;
    timeline: string | null;
  }>;
}

const gradients: Record<string, string> = {
  'madhwacharya': 'from-amber-600 to-red-600',
  'narahari-tirtha': 'from-orange-400 to-amber-600',
  'sripadaraja': 'from-amber-500 to-yellow-600',
  'vyasatirtha': 'from-yellow-500 to-amber-700',
  'vadiraja-tirtha': 'from-yellow-600 to-yellow-800',
  'purandara-dasa': 'from-red-500 to-orange-700',
  'kanaka-dasa': 'from-orange-500 to-red-700',
  'raghavendra-dasa': 'from-yellow-500 to-orange-600',
  'mahipati-dasa': 'from-amber-500 to-amber-700',
  'prasanna-venkata-dasa': 'from-indigo-500 to-blue-600',
  'vijaya-dasa': 'from-emerald-500 to-teal-700',
  'gopala-dasa': 'from-teal-500 to-emerald-700',
  'satyabodha-dasa': 'from-orange-500 to-amber-600',
  'jagannatha-dasaru': 'from-blue-500 to-indigo-700',
  'mohana-dasa': 'from-sky-500 to-blue-700',
  'pranesha-dasaru': 'from-cyan-500 to-blue-600',
  'subbanna-dasa': 'from-slate-500 to-slate-700',
  'helavanakatte-giriyamma': 'from-pink-500 to-rose-700',
  'srinivasa-dasa': 'from-slate-400 to-slate-600',
  'lakshmipati-dasa': 'from-slate-400 to-slate-600',
  'madhwapati-dasa': 'from-slate-400 to-slate-600',
  'venkatesha-dasa': 'from-slate-400 to-slate-600',
  'narahari-dasa': 'from-slate-400 to-slate-600',
  'govinda-dasa': 'from-red-500 to-pink-600',
  'ugabhoga-narayana-dasa': 'from-slate-400 to-slate-600',
  'venugopala-dasa': 'from-purple-500 to-violet-700',
  'vishnu-dasa': 'from-slate-400 to-slate-600',
  'krishnapriya-dasa': 'from-slate-400 to-slate-600',
  'harapanahalli-bhimavva': 'from-pink-500 to-rose-700',
};

const getGradient = (id: string) => gradients[id] || 'from-slate-400 to-slate-600';

export default function ParamparaTimeline({ composers }: ParamparaTimelineProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">{t('paramparaHeading')}</Typography>
            <Typography variant="lead" className="text-slate-600">{t('paramparaLead')}</Typography>
          </motion.div>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.2, ease: 'easeOut' }} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />
          
          {composers.map((c, i) => {
            const name = t(getComposerTranslationKey(c.id));
            const gradient = getGradient(c.id);
            const timeline = t(c.timeline || '');

            return (
              <motion.div 
                key={c.id} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`relative mb-12 flex items-center justify-between ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot */}
                <motion.div whileHover={{ scale: 1.2 }} className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full border-4 border-white bg-gradient-to-br ${gradient} shadow-md z-10`} />
                
                {/* Content Box */}
                <Link href={`/haridasaru/${c.id}`} className="ml-12 md:ml-0 w-full md:w-5/12">
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-md shadow-slate-200/30 border border-slate-100 transition-colors hover:border-primary/30"
                  >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100/50 flex items-center justify-center">
                      {c.imageUrl ? (
                        <Image 
                          src={c.imageUrl} 
                          alt={name}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      ) : (
                        <span className="text-2xl opacity-45">🙏</span>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <Typography variant="h3" className="text-lg md:text-xl font-bold text-slate-900 mb-1 truncate">{name}</Typography>
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-wide">{timeline}</div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
