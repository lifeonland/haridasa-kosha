import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Catalog | Haridasa Kosha',
  description: 'Explore our collection of Haridasa compositions',
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground">
      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
