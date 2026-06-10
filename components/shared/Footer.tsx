import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="!bg-slate-950 text-white border-t border-white/10 py-6 px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="text-[10px] text-white font-bold tracking-widest">
          &copy; {new Date().getFullYear()} Haridasa Kosha. All Rights Reserved.
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-[10px] tracking-widest text-white font-bold hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-[10px] tracking-widest text-white font-bold hover:text-primary transition-colors">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
