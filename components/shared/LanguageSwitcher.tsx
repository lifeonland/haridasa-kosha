'use client';
import { useLanguage } from './LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={lang === 'KN'}
      onClick={() => setLang(lang === 'EN' ? 'KN' : 'EN')}
      className="relative inline-flex h-10 w-20 items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm transition-all hover:border-slate-300"
    >
      <span
        className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-slate-100 shadow-sm transition-transform duration-300 ease-out ${lang === 'KN' ? 'translate-x-full' : 'translate-x-0'}`}
      />
      <span className="relative z-10 grid w-full grid-cols-2 items-center text-[10px] font-bold">
        <span className={`text-center transition-colors duration-300 ${lang === 'EN' ? 'text-black' : 'text-slate-400'}`}>
          EN
        </span>
        <span className={`text-center transition-colors duration-300 ${lang === 'KN' ? 'text-black' : 'text-slate-400'}`}>
          ಕ
        </span>
      </span>
    </button>
  );
}
