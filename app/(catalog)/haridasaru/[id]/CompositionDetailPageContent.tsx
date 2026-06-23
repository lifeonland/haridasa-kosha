'use client';
import { useState } from 'react';
import { Typography } from '@/components/ui/typography';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Calendar, MapPin, LayoutGrid, List } from 'lucide-react';
import CompositionCard from '@/components/ui/CompositionCard';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getComposerTranslationKey, getBioTranslationKey } from '@/lib/utils';

export default function ComposerDetailPageContent({ composer }: any) {
  const { t, lang } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  if (!composer) return null;

  return (
    <main className="min-h-screen bg-[#fcfaf7] py-12 px-6">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      <Section spacing="sm" className="relative z-10">
        <Container>
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-20">
                <div className="w-full lg:w-1/3 flex flex-col items-center gap-6">
                    <div className="w-full max-w-[280px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg shrink-0 relative">
                        {composer.imageUrl ? (
                            <Image 
                              src={composer.imageUrl} 
                              alt={t(getComposerTranslationKey(composer.id))} 
                              fill 
                              className="object-cover" 
                              priority 
                              sizes="280px"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-6xl opacity-20">🙏</div>
                        )}
                    </div>

                    {/* Charama Sloka for Madhwacharya / Narahari / Sripadaraja / Vyasatirtha / Vadiraja / Purandara / Kanaka / Vijaya / Gopala / Mohana / Subbanna / Raghavendra / Satyabodha / Bhimavva / Jagannatha / Pranesha / Prasanna Venkata / Mahipati */}
                    {(composer.id === 'madhwacharya' || 
                      composer.id === 'narahari-tirtha' || 
                      composer.id === 'sripadaraja' || 
                      composer.id === 'vyasatirtha' || 
                      composer.id === 'vadiraja-tirtha' ||
                      composer.id === 'purandara-dasa' ||
                      composer.id === 'kanaka-dasa' ||
                      composer.id === 'vijaya-dasa' ||
                      composer.id === 'gopala-dasa' ||
                      composer.id === 'mohana-dasa' ||
                      composer.id === 'subbanna-dasa' ||
                      composer.id === 'raghavendra-dasa' ||
                      composer.id === 'satyabodha-dasa' ||
                      composer.id === 'harapanahalli-bhimavva' ||
                      composer.id === 'jagannatha-dasaru' ||
                      composer.id === 'pranesha-dasaru' ||
                      composer.id === 'prasanna-venkata-dasa' ||
                      composer.id === 'mahipati-dasa') && (
                        <div className="w-full max-w-[280px] text-center p-3 rounded-2xl bg-amber-50/50 border border-amber-100/30 shadow-sm flex-shrink-0">
                            <div className="text-amber-800 font-medium italic leading-relaxed font-serif tracking-tighter"
                                 style={{ fontSize: 'clamp(11.5px, 1.2vw, 13.5px)' }}>
                                {(() => {
                                    const sloka = 
                                        composer.id === 'madhwacharya' ? t('madhwacharyaSloka') :
                                        composer.id === 'narahari-tirtha' ? t('narahariTirthaSloka') :
                                        composer.id === 'sripadaraja' ? t('sripadarajaSloka') :
                                        composer.id === 'vyasatirtha' ? t('vyasatirthaSloka') :
                                        composer.id === 'vadiraja-tirtha' ? t('vadirajaTirthaSloka') :
                                        composer.id === 'purandara-dasa' ? t('purandaraDasaSloka') :
                                        composer.id === 'kanaka-dasa' ? t('kanakaDasaSloka') :
                                        composer.id === 'vijaya-dasa' ? t('vijayaDasaSloka') :
                                        composer.id === 'gopala-dasa' ? t('gopalaDasaSloka') :
                                        composer.id === 'mohana-dasa' ? t('mohanaDasaSloka') :
                                        composer.id === 'subbanna-dasa' ? t('subbannaDasaSloka') :
                                        composer.id === 'raghavendra-dasa' ? t('raghavendraDasaSloka') :
                                        composer.id === 'satyabodha-dasa' ? t('satyabodhaDasaSloka') :
                                        composer.id === 'harapanahalli-bhimavva' ? t('harapanahalliBhimavvaSloka') :
                                        composer.id === 'jagannatha-dasaru' ? t('jagannathaDasaSloka') :
                                        composer.id === 'pranesha-dasaru' ? t('praneshaDasaSloka') :
                                        composer.id === 'prasanna-venkata-dasa' ? t('prasannaVenkataDasaSloka') :
                                        composer.id === 'mahipati-dasa' ? t('mahipatiDasaSloka') : '';
                                    
                                    return sloka.split('\n').map((line, idx) => (
                                        <span key={idx} className="block text-center whitespace-nowrap">{line.trim()}</span>
                                    ));
                                })()}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-10 min-w-0">
                    <div>
                        <Typography variant="h1" className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 capitalize">
                            {t(getComposerTranslationKey(composer.id))}
                        </Typography>
                        <div className="flex items-center gap-4 text-sm font-bold text-slate-500 tracking-widest">
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {composer.ankita?.name ? t(composer.ankita.name) : '-'}</span>
                            <span className="flex items-center gap-2"><Calendar className="h-4 w-4"/> {t(composer.timeline || '')}</span>
                            <span className="flex items-center gap-2">({composer.compositions?.length ?? 0} {t('statsCompositions')})</span>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <Typography variant="h3" className="font-bold mb-4">{t('about')}</Typography>
                        <Typography variant="p" className="text-base text-slate-600 leading-relaxed">
                            {t(getBioTranslationKey(composer.id))}
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Compositions Section */}
            <div className="border-t border-slate-100 pt-16">
                <div className="flex justify-between items-center mb-10">
                    <Typography variant="h2" className="text-3xl font-bold">{t('Compositions')}</Typography>
                    <div className="flex gap-2 bg-white p-1 rounded-full border border-slate-200">
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-slate-100' : ''}`}><LayoutGrid className="w-4 h-4"/></button>
                        <button onClick={() => setViewMode('table')} className={`p-2 rounded-full ${viewMode === 'table' ? 'bg-slate-100' : ''}`}><List className="w-4 h-4"/></button>
                    </div>
                </div>
                
                {(!composer.compositions || composer.compositions.length === 0) ? (
                    <div className="text-center py-12 bg-white border border-slate-100 rounded-[2rem]">
                        <Typography variant="p" className="text-slate-500">No compositions available</Typography>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {viewMode === 'grid' ? (
                            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {composer.compositions?.map((comp: any) => (
                                    <CompositionCard
                                        key={comp.id}
                                        id={comp.id}
                                        title={comp.title}
                                        firstLine={comp.firstLine}
                                        composerName={composer.name}
                                        deityName={comp.deity?.name || 'Unknown'}
                                        raga={comp.raga?.name || 'TBD'}
                                        tala={comp.tala?.name || 'TBD'}
                                        hasLyrics={comp.lyrics && comp.lyrics.length > 0}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-widest">
                                        <tr>
                                            <th className="px-6 py-4">{t('tblName')}</th>
                                            <th className="px-6 py-4">English</th>
                                            <th className="px-6 py-4">{t('ragaLabel')}</th>
                                            <th className="px-6 py-4">{t('talaLabel')}</th>
                                            <th className="px-6 py-4 text-right">{t('view')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {composer.compositions?.map((comp: any) => (
                                            <tr key={comp.id} className="hover:bg-slate-50/50">
                                                <td className="px-6 py-4 font-bold">{t(comp.title)}</td>
                                                <td className="px-6 py-4 text-slate-600">
                                                  {comp.translations?.[0] ? t('yes') : t('no')}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{comp.raga?.name ? t(comp.raga.name) : '-'}</td>
                                                <td className="px-6 py-4 text-slate-600">{comp.tala?.name ? t(comp.tala.name) : '-'}</td>
                                                <td className="px-6 py-4 text-right"><Link href={`/library/${comp.id}`} className="text-primary font-bold">{t('read')}</Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </Container>
      </Section>
    </main>
  );
}
