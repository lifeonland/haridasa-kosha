import Link from 'next/link';

export default function DailyWisdom() {
  const items = [
    { 
      title: "Quote of the Day", 
      content: "\"Inner peace is the highest melody.\"", 
      link: "/articles/quotes",
      accent: "text-accent",
      border: "hover:border-accent/30"
    },
    { 
      title: "Today's Haridasa", 
      content: "Purandara Dasaru", 
      link: "/haridasaru/purandara-dasa",
      accent: "text-royal",
      border: "hover:border-royal/30"
    },
    { 
      title: "Today's Raga", 
      content: "Mohana", 
      link: "/ragas/mohana",
      accent: "text-primary",
      border: "hover:border-primary/30"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Link 
            key={item.title} 
            href={item.link}
            className={`bg-white p-10 rounded-3xl border border-border shadow-sm transition-all duration-300 flex flex-col justify-between group ${item.border} hover:shadow-xl hover:-translate-y-1`}
          >
            <div>
              <h4 className="text-xs font-bold text-muted-foreground  tracking-widest mb-6">{item.title}</h4>
              <p className={`s font-bold mb-8 leading-tight ${item.accent}`}>{item.content}</p>
            </div>
            <div className="flex items-center gap-2 s font-bold text-royal group-hover:gap-4 transition-all">
              Explore Now <span className="text-primary">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
