import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Haridasa Kosha',
  description: 'The largest searchable digital library of Haridasa compositions',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background font-sans selection:bg-primary/20 selection:text-primary">
      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
