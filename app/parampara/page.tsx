'use client';

import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/shared/LanguageContext';

export default function ParamparaPage() {
  const { t } = useLanguage();
  const haridasas = [
    { name: t('narahariTirtha'), slug: 'narahari-tirtha', timeline: t('thirteenthCentury'), desc: t('narahariTirthaDesc'), gradient: 'from-orange-400 to-amber-600' },
    { name: t('sripadaraja'), slug: 'sripadaraja', timeline: t('fourteenthCentury'), desc: t('sripadarajaDesc'), gradient: 'from-amber-500 to-yellow-600' },
    { name: t('vyasatirtha'), slug: 'vyasatirtha', timeline: t('fifteenthCentury'), desc: t('vyasatirthaDesc'), gradient: 'from-yellow-500 to-amber-700' },
    { name: t('purandaraDasa'), slug: 'purandara-dasa', timeline: '1484–1564', desc: t('purandaraDasaDesc'), gradient: 'from-red-500 to-orange-700' },
    { name: t('kanakaDasa'), slug: 'kanaka-dasa', timeline: '1509–1609', desc: t('kanakaDasaDesc'), gradient: 'from-orange-500 to-red-700' },
    { name: t('vijayaDasa'), slug: 'vijaya-dasa', timeline: '1682–1755', desc: t('vijayaDasaDesc'), gradient: 'from-emerald-500 to-teal-700' },
    { name: t('jagannathaDasa'), slug: 'jagannatha-dasa', timeline: '1728–1809', desc: t('jagannathaDasaDesc'), gradient: 'from-blue-500 to-indigo-700' },
  ];

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
          
          {haridasas.map((h, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`relative mb-12 flex items-center justify-between ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <motion.div whileHover={{ scale: 1.2 }} className={`absolute left-0 md:left-1/2 -ml-[13px] md:-ml-[13px] mt-1 h-7 w-7 rounded-full border-4 border-white bg-gradient-to-br ${h.gradient} shadow-md`} />
              
              {/* Content Box */}
              <Link href={`/haridasaru/${h.slug}`} className="ml-12 md:ml-0 w-full md:w-5/12">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-3xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100 transition-colors hover:border-primary/30"
                >
                  <Typography variant="h3" className="text-xl font-bold text-slate-900 mb-1">{h.name}</Typography>
                  <div className="inline-block px-3 py-1 mb-3 rounded-full bg-slate-100 text-xs font-bold text-slate-600 uppercase tracking-widest">{h.timeline}</div>
                  <Typography className="text-slate-600 leading-relaxed">{h.desc}</Typography>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
