'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 rounded-xl text-primary font-bold bg-white border border-primary/30 hover:border-primary hover:bg-accent transition-all duration-300 shadow-sm"
        >
          Previous
        </Link>
      )}

      {/* Page numbers */}
      {startPage > 1 && (
        <>
          <Link
            href={getPageUrl(1)}
            className="px-4 py-2 rounded-xl text-primary font-bold bg-white border border-primary/30 hover:border-primary hover:bg-accent transition-all duration-300 shadow-sm"
          >
            1
          </Link>
          {startPage > 2 && <span className="text-muted-foreground px-2 font-bold">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`px-5 py-2 rounded-xl transition-all duration-300 border font-bold shadow-sm ${
            page === currentPage
              ? 'bg-primary border-primary text-white shadow-md'
              : 'text-primary bg-white border-primary/30 hover:border-primary hover:bg-accent'
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next button */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-muted-foreground px-2 font-bold">...</span>}
          <Link
            href={getPageUrl(totalPages)}
            className="px-4 py-2 rounded-xl text-primary font-bold bg-white border border-primary/30 hover:border-primary hover:bg-accent transition-all duration-300 shadow-sm"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 rounded-xl text-primary font-bold bg-white border border-primary/30 hover:border-primary hover:bg-accent transition-all duration-300 shadow-sm"
        >
          Next
        </Link>
      )}
    </div>
  );
}
