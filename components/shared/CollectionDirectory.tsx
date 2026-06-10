import Link from 'next/link';

export default function CollectionDirectory() {
  const collections = [
    { title: "Beginner Dasarapadas", icon: "🌱", desc: "A perfect start for newcomers." },
    { title: "Most Popular", icon: "🔥", desc: "Most played compositions." },
    { title: "Bhajana Essentials", icon: "🔔", desc: "Core hymns for devotion." },
    { title: "Children's Special", icon: "👶", desc: "Simple, engaging melodies." },
    { title: "Rare Gems", icon: "💎", desc: "Lesser-known masterpieces." },
    { title: "Madhwa Philosophy", icon: "📜", desc: "Deep philosophical works." }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h3 className="s font-bold mb-12 text-royal tracking-tight">Featured Collections</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {collections.map((col) => (
          <Link 
            key={col.title} 
            href="#" 
            className="group glass-card p-8 rounded-3xl border border-border hover:border-primary transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 bg-white"
          >
            <div className="s mb-6 transform group-hover:scale-110 transition-transform duration-300">{col.icon}</div>
            <h4 className="s font-bold text-foreground mb-3 group-hover:text-primary transition  tracking-wider">{col.title}</h4>
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">{col.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
