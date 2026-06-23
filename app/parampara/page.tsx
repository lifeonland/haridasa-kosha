'use client';

import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/shared/LanguageContext';

export default function ParamparaPage() {
  const { t } = useLanguage();
  const haridasas = [
    { name: t('madhwacharyaru'), slug: 'madhwacharya', timeline: t('1238–1317'), gradient: 'from-amber-600 to-red-600', imageUrl: 'https://i.pinimg.com/736x/de/a6/6e/dea66e53fb4c928547dc05c38ccedeac.jpg' },
    { name: t('narahariTirtharu'), slug: 'narahari-tirtha', timeline: t('thirteenthCentury'), gradient: 'from-orange-400 to-amber-600', imageUrl: '/assets/webp/narahari.webp' },
    { name: t('sripadarajaru'), slug: 'sripadaraja', timeline: t('fourteenthCentury'), gradient: 'from-amber-500 to-yellow-600', imageUrl: '/assets/webp/sripadaraja.webp' },
    { name: t('vyasatirthaName'), slug: 'vyasatirtha', timeline: t('fifteenthCentury'), gradient: 'from-yellow-500 to-amber-700', imageUrl: '/assets/webp/vyasarajaru.webp' },
    { name: t('purandaraDasaru'), slug: 'purandara-dasa', timeline: t('1484–1564'), gradient: 'from-red-500 to-orange-700', imageUrl: '/assets/webp/purandaradasaru.webp' },
    { name: t('kanakaDasaru'), slug: 'kanaka-dasa', timeline: t('1509–1609'), gradient: 'from-orange-500 to-red-700', imageUrl: '/assets/webp/kanakadasaru.webp' },
    { name: t('vijayaDasaru'), slug: 'vijaya-dasa', timeline: t('1682–1755'), gradient: 'from-emerald-500 to-teal-700', imageUrl: '/assets/webp/vijayadasaru.webp' },
    { name: t('jagannathaDasaru'), slug: 'jagannatha-dasa', timeline: t('1728–1809'), gradient: 'from-blue-500 to-indigo-700', imageUrl: 'https://anandsp1.wordpress.com/wp-content/uploads/2018/09/jagannatha-dasaru.jpg?w=315&h=435' },
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
              <motion.div whileHover={{ scale: 1.2 }} className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full border-4 border-white bg-gradient-to-br ${h.gradient} shadow-md z-10`} />
              
              {/* Content Box */}
              <Link href={`/haridasaru/${h.slug}`} className="ml-12 md:ml-0 w-full md:w-5/12">
                <motion.div 
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-md shadow-slate-200/30 border border-slate-100 transition-colors hover:border-primary/30"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100/50">
                    <Image 
                      src={h.imageUrl} 
                      alt={h.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 64px, 80px"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <Typography variant="h3" className="text-lg md:text-xl font-bold text-slate-900 mb-1 truncate">{h.name}</Typography>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-wide">{h.timeline}</div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
