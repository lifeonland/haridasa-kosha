import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6 text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center s mb-8">
        🧐
      </div>
      <h1 className="s font-bold text-primary mb-4 tracking-tighter">404</h1>
      <h2 className="s font-bold text-foreground mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-10 s font-medium leading-relaxed">
        The divine melody you're looking for seems to have wandered off. Let's get you back to the library.
      </p>
      <Link 
        href="/" 
        className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 shadow-md shadow-primary/20"
      >
        Back to Home
      </Link>
    </div>
  );
}
