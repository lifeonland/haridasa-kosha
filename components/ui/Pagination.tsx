'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const pages = [];
  const maxVisible = 5;
  const halfVisible = Math.floor(maxVisible / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  if (currentPage - halfVisible < 1) {
    endPage = Math.min(totalPages, endPage + (halfVisible - currentPage + 1));
  }
  if (currentPage + halfVisible > totalPages) {
    startPage = Math.max(1, startPage - (currentPage + halfVisible - totalPages));
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-12" aria-label="Pagination">
      {/* Previous button */}
      <Link
        href={getPageUrl(Math.max(1, currentPage - 1))}
        className={`p-2 rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:border-primary hover:text-primary ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>

      {/* Page numbers */}
      {startPage > 1 && (
        <>
          <Link href={getPageUrl(1)} className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white font-bold text-sm text-slate-600 hover:border-primary hover:text-primary">1</Link>
          {startPage > 2 && <span className="px-2 text-slate-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all font-bold text-sm ${
            page === currentPage
              ? 'bg-primary border-primary text-white shadow-md'
              : 'border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary'
          }`}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-slate-400">...</span>}
          <Link href={getPageUrl(totalPages)} className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white font-bold text-sm text-slate-600 hover:border-primary hover:text-primary">{totalPages}</Link>
        </>
      )}

      {/* Next button */}
      <Link
        href={getPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`p-2 rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:border-primary hover:text-primary ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </Link>
    </nav>
  );
}
