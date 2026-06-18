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
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous button */}
      <Link
        href={getPageUrl(Math.max(1, currentPage - 1))}
        className={`flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-primary transition-colors ${currentPage === 1 ? 'pointer-events-none opacity-40' : ''}`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Link>

      <div className="flex items-center gap-1 mx-2">
        {/* Page numbers */}
        {startPage > 1 && (
            <>
            <Link href={getPageUrl(1)} className="w-8 h-8 flex items-center justify-center rounded-md text-sm text-slate-600 hover:bg-slate-100">1</Link>
            {startPage > 2 && <span className="px-1 text-slate-400">...</span>}
            </>
        )}

        {pages.map((page) => (
            <Link
            key={page}
            href={getPageUrl(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                page === currentPage
                ? 'bg-primary text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            >
            {page}
            </Link>
        ))}

        {endPage < totalPages && (
            <>
            {endPage < totalPages - 1 && <span className="px-1 text-slate-400">...</span>}
            <Link href={getPageUrl(totalPages)} className="w-8 h-8 flex items-center justify-center rounded-md text-sm text-slate-600 hover:bg-slate-100">{totalPages}</Link>
            </>
        )}
      </div>

      {/* Next button */}
      <Link
        href={getPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-primary transition-colors ${currentPage === totalPages ? 'pointer-events-none opacity-40' : ''}`}
        aria-label="Next page"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
