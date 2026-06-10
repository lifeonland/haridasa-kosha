'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useLanguage } from '@/components/shared/LanguageContext';

interface FiltersProps {
  composers?: Array<{ id: string; name: string }>;
  deities?: Array<{ id: string; name: string }>;
  ankitas?: Array<{ id: string; name: string }>;
  ragas?: Array<{ id: string; name: string }>;
  talas?: Array<{ id: string; name: string }>;
  tags?: Array<{ id: string; name: string }>;
}

export default function Filters({
  composers = [],
  deities = [],
  ankitas = [],
  ragas = [],
  talas = [],
  tags = [],
}: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const getSelectedValue = (key: string) => searchParams.get(key) || '';

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page'); // Reset to first page on filter change
      const newUrl = window.location.pathname + '?' + params.toString();
      router.push(newUrl);
    },
    [searchParams, router]
  );

  const clearFilters = () => {
    router.push(window.location.pathname);
  };

  const hasActiveFilters = Array.from(searchParams.entries()).some(
    ([key]) => !['page', 'search'].includes(key)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-foreground">{t('filters')}</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-[10px] font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
          >
            {t('clearAll')}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {[
          { key: 'composer', label: 'composerLabel', options: composers, all: 'allComposers' },
          { key: 'deity', label: 'deityLabel', options: deities, all: 'allDeities' },
          { key: 'ankita', label: 'ankitaLabel', options: ankitas, all: 'allAnkitas' },
          { key: 'raga', label: 'ragaLabel', options: ragas, all: 'allRagas' },
          { key: 'tala', label: 'talaLabel', options: talas, all: 'allTalas' },
          { key: 'tag', label: 'tagLabel', options: tags, all: 'allTags' },
        ].map((filter) => (
          filter.options.length > 0 && (
            <div key={filter.key}>
              <label className="block text-[9px] font-bold text-slate-400 mb-1 tracking-widest uppercase">
                {t(filter.label)}
              </label>
              <select
                value={getSelectedValue(filter.key)}
                onChange={(e) => updateFilter(filter.key, e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl text-foreground bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all hover:border-slate-300"
              >
                <option value="">{t(filter.all)}</option>
                {filter.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {t(option.name)}
                  </option>
                ))}
              </select>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
