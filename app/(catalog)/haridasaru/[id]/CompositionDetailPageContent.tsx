'use client';
import { useState } from 'react';
import { Typography } from '@/components/ui/typography';
import { useLanguage } from '@/components/shared/LanguageContext';
import { Calendar, MapPin, LayoutGrid, List } from 'lucide-react';
import CompositionCard from '@/components/ui/CompositionCard';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getComposerTranslationKey, getBioTranslationKey } from '@/lib/utils';
import { Network } from 'lucide-react';

const COMPOSER_LOCATIONS: Record<string, {
  nameEN: string;
  nameKN: string;
  query: string;
  embedUrl: string;
}> = {
  'madhwacharya': {
    nameEN: 'Sri Krishna Temple, Udupi',
    nameKN: 'ಶ್ರೀ ಕೃಷ್ಣ ಮಠ, ಉಡುಪಿ',
    query: 'Sri Krishna Temple, Udupi, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Sri%20Krishna%20Temple,%20Udupi,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'narahari-tirtha': {
    nameEN: 'Shri Narahari Teertharu Vrindavana, Hampi',
    nameKN: 'ಶ್ರೀ ನರಹರಿ ತೀರ್ಥರ ಬೃಂದಾವನ, ಹಂಪಿ',
    query: 'Shri Narahari Teertharu Moola Brindavan, Hampi',
    embedUrl: 'https://maps.google.com/maps?q=Shri%20Narahari%20Teertharu%20Moola%20Brindavan,%20Hampi&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'sripadaraja': {
    nameEN: 'Sripadaraja Mutt, Mulbagal',
    nameKN: 'ಶ್ರೀಪಾದರಾಜ ಮಠ, ಮುಳಬಾಗಿಲು',
    query: 'Sripadaraja Mutt, Mulbagal, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Sripadaraja%20Mutt,%20Mulbagal,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'vyasatirtha': {
    nameEN: 'Nava Brindavana, Anegundi',
    nameKN: 'ನವ ಬೃಂದಾವನ, ಆನೆಗುಂದಿ',
    query: 'Navabrindavana, Anegundi, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Navabrindavana,%20Anegundi,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'vadiraja-tirtha': {
    nameEN: 'Sode Vadiraja Mutt, Sonda',
    nameKN: 'ಸೋದೆ ವಾದಿರಾಜ ಮಠ, ಸೋಂದಾ',
    query: 'Sode Vadiraja Mutt, Sonda, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Sode%20Vadiraja%20Mutt,%20Sonda,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'purandara-dasa': {
    nameEN: 'Purandara Mantapa, Hampi',
    nameKN: 'ಪುರಂದರ ಮಂಟಪ, ಹಂಪಿ',
    query: 'Purandara Mantapa, Hampi, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Purandara%20Mantapa,%20Hampi,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'kanaka-dasa': {
    nameEN: 'Kaginele Kanaka Guru Peetha',
    nameKN: 'ಕಾಗಿನೆಲೆ ಕನಕ ಗುರು ಪೀಠ',
    query: 'Kaginele Kanaka Guru Peetha, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Kaginele%20Kanaka%20Guru%20Peetha,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'vijaya-dasa': {
    nameEN: 'Sri Vijaya Dasara Gavi, Chippagiri',
    nameKN: 'ಶ್ರೀ ವಿಜಯ ದಾಸರ ಗವಿ, ಚಿಪ್ಪಗಿರಿ',
    query: 'Sri Vijaya Dasara Gavi, Chippagiri, Andhra Pradesh',
    embedUrl: 'https://maps.google.com/maps?q=Sri%20Vijaya%20Dasara%20Gavi,%20Chippagiri&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'gopala-dasa': {
    nameEN: 'Uttanur, Karnataka',
    nameKN: 'ಉತ್ತನೂರು, ಕರ್ನಾಟಕ',
    query: 'Uttanur, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Uttanur,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'jagannatha-dasaru': {
    nameEN: 'Sri Jagannatha Dasara Brindavana, Manvi',
    nameKN: 'ಶ್ರೀ ಜಗನ್ನಾಥ ದಾಸರ ಬೃಂದಾವನ, ಮಾನ್ವಿ',
    query: 'Sri Jagannatha Dasara Brindavana, Manvi, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Sri%20Jagannatha%20Dasara%20Brindavana,%20Manvi&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'raghavendra-dasa': {
    nameEN: 'Sri Raghavendra Swamy Mutt, Mantralayam',
    nameKN: 'ಶ್ರೀ ರಾಘವೇಂದ್ರ ಸ್ವಾಮಿ ಮಠ, ಮಂತ್ರಾಲಯ',
    query: 'Mantralayam Sri Raghavendra Swamy Mutt, Andhra Pradesh',
    embedUrl: 'https://maps.google.com/maps?q=Mantralayam%20Sri%20Raghavendra%20Swamy%20Mutt&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'harapanahalli-bhimavva': {
    nameEN: 'Harapanahalli, Karnataka',
    nameKN: 'ಹರಪನಹಳ್ಳಿ, ಕರ್ನಾಟಕ',
    query: 'Harapanahalli, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Harapanahalli,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'prasanna-venkata-dasa': {
    nameEN: 'Bagalkot, Karnataka',
    nameKN: 'ಬಾಗಲಕೋಟೆ, ಕರ್ನಾಟಕ',
    query: 'Bagalkot, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Bagalkot,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'mahipati-dasa': {
    nameEN: 'Mahipati Dasara Vrindavana, Kakhandaki',
    nameKN: 'ಮಹೀಪತಿ ದಾಸರ ಬೃಂದಾವನ, ಕಾಖಂಡಕಿ',
    query: 'Mahipati Dasara Vrindavana, Kakhandaki, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Mahipati%20Dasara%20Vrindavana,%20Kakhandaki&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'satyabodha-dasa': {
    nameEN: 'Sri Satyabodha Swamy Swarna Vrindavana, Savanur',
    nameKN: 'ಶ್ರೀ ಸತ್ಯಬೋಧ ಸ್ವಾಮಿ ಸ್ವರ್ಣ ಬೃಂದಾವನ, ಸವಣೂರು',
    query: 'Sri Satyabodha Swamy Vrindavana, Savanur, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Sri%20Satyabodha%20Swamy%20Vrindavana,%20Savanur,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'mohana-dasa': {
    nameEN: 'Manvi, Karnataka',
    nameKN: 'ಮಾನ್ವಿ, ಕರ್ನಾಟಕ',
    query: 'Manvi, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Manvi,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'pranesha-dasaru': {
    nameEN: 'Lingsugur, Karnataka',
    nameKN: 'ಲಿಂಗಸಗೂರು, ಕರ್ನಾಟಕ',
    query: 'Lingsugur, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Lingsugur,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'subbanna-dasa': {
    nameEN: 'Kallur, Raichur',
    nameKN: 'ಕಲ್ಲೂರು, ರಾಯಚೂರು',
    query: 'Kallur, Manvi, Raichur, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Kallur,%20Manvi,%20Raichur,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'helavanakatte-giriyamma': {
    nameEN: 'Helavanakatte (Malebennur), Karnataka',
    nameKN: 'ಹೆಳವನಕಟ್ಟೆ (ಮಲೆಬೆನ್ನೂರು), ಕರ್ನಾಟಕ',
    query: 'Malebennur, Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Malebennur,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  'srinivasa-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  },
  'lakshmipati-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  },
  'madhwapati-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  },
  'venkatesha-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  },
  'narahari-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  },
  'govinda-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  },
  'ugabhoga-narayana-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  },
  'venugopala-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  },
  'vishnu-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  },
  'krishnapriya-dasa': {
    nameEN: 'Karnataka',
    nameKN: 'ಕರ್ನಾಟಕ',
    query: 'Karnataka',
    embedUrl: 'https://maps.google.com/maps?q=Karnataka&t=&z=7&ie=UTF8&iwloc=&output=embed'
  }
};

export default function ComposerDetailPageContent({ composer }: any) {
  const { t, lang } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isMapHovered, setIsMapHovered] = useState(false);

  if (!composer) return null;

  const locationData = COMPOSER_LOCATIONS[composer.id];

  const handleMapClick = () => {
    if (locationData) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationData.query)}`, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfaf7] py-12 px-6">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      <Section spacing="sm" className="relative z-10">
        <Container>
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-20">
                <div className="w-full lg:w-1/3 flex flex-col items-center gap-6">
                    <div className="group w-full max-w-[280px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg shrink-0 relative cursor-default">
                        {composer.imageUrl ? (
                            <>
                                <Image 
                                  src={composer.imageUrl} 
                                  alt={t(getComposerTranslationKey(composer.id))} 
                                  fill 
                                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                                  priority 
                                  sizes="280px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 pointer-events-none">
                                    <span className="text-white/90 text-sm font-bold tracking-widest uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                                        {t(getComposerTranslationKey(composer.id))}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-6xl opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40">🙏</div>
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
                                        <span key={idx} className="block text-center break-words">{line.trim()}</span>
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
                            {locationData ? (
                                <div className="relative inline-block">
                                    <button 
                                        onClick={handleMapClick}
                                        onMouseEnter={() => setIsMapHovered(true)}
                                        onMouseLeave={() => setIsMapHovered(false)}
                                        className="flex items-center gap-2 text-slate-500 hover:text-amber-800 transition-colors cursor-pointer text-sm font-bold tracking-widest focus:outline-none"
                                    >
                                        <MapPin className="h-4 w-4 text-amber-600 animate-pulse"/> 
                                        <span className="underline decoration-dotted decoration-amber-500/50 hover:decoration-amber-800">
                                            {composer.ankita?.name ? t(composer.ankita.name) : '-'}
                                        </span>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {isMapHovered && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-[320px] pointer-events-auto"
                                            >
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-2">
                                                        <MapPin className="h-4 w-4 text-amber-600 mt-1 shrink-0" />
                                                        <div className="text-left">
                                                            <h4 className="font-bold text-slate-800 text-sm leading-tight normal-case tracking-normal">
                                                                {lang === 'EN' ? locationData.nameEN : locationData.nameKN}
                                                            </h4>
                                                            <p className="text-xs text-slate-500 mt-0.5 normal-case tracking-normal font-normal">
                                                                {lang === 'EN' ? 'Vrindavana / Sacred Site' : 'ಬೃಂದಾವನ / ಪವಿತ್ರ ಸ್ಥಳ'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="w-full h-[180px] rounded-xl overflow-hidden border border-slate-100 relative">
                                                        <iframe
                                                            src={locationData.embedUrl}
                                                            width="100%"
                                                            height="100%"
                                                            style={{ border: 0 }}
                                                            allowFullScreen={false}
                                                            loading="lazy"
                                                            referrerPolicy="no-referrer-when-downgrade"
                                                        />
                                                    </div>
                                                    
                                                    <div className="text-center pt-1 border-t border-slate-100">
                                                        <span className="text-[11px] font-bold text-amber-700 hover:text-amber-900 flex items-center justify-center gap-1 normal-case tracking-normal">
                                                            {lang === 'EN' ? 'Click to open in Google Maps ↗' : 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಲು ಕ್ಲಿಕ್ ಮಾಡಿ ↗'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4"/> {composer.ankita?.name ? t(composer.ankita.name) : '-'}
                                </span>
                            )}
                            <span className="flex items-center gap-2"><Calendar className="h-4 w-4"/> {t(composer.timeline || '')}</span>
                            <span className="flex items-center gap-2">({composer.compositions?.length ?? 0} {t('statsCompositions')})</span>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <Typography variant="h3" className="font-bold mb-4">{t('about')}</Typography>
                        <Typography variant="p" className="text-base text-slate-600 leading-relaxed mb-8 whitespace-pre-line">
                            {(lang === 'EN' && composer.biography && composer.biography.length > 100) 
                                ? composer.biography 
                                : t(getBioTranslationKey(composer.id))}
                        </Typography>

                        {/* Knowledge Graph Link Button */}
                        <div className="mt-6">
                            <Link 
                                href={`/graph?composerId=${composer.id}`}
                                className="inline-flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 text-amber-800 font-semibold text-xs py-2 px-4 rounded-full transition-colors shadow-sm group"
                            >
                                <Network className="w-3.5 h-3.5 text-amber-600" />
                                {t('Explore Knowledge Graph')}
                                <span className="text-amber-500 group-hover:translate-x-0.5 transition-transform">→</span>
                            </Link>
                        </div>
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
                                        lyrics={comp.lyrics}
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
