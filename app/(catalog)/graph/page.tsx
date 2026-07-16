import { prisma } from '@/lib/prisma';
import ComposerGraph from '@/components/ui/graph/ComposerGraph';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';

export const metadata = {
  title: 'Connections | Dasaverse',
  description: 'Interactive Connections of Haridasas and their relationships.',
};

export default async function GraphPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const composerId = typeof searchParams.composerId === 'string' ? searchParams.composerId : 'purandara-dasa';
  
  const composer = await prisma.composer.findUnique({
    where: { id: composerId },
    include: {
      ankita: true,
      compositions: {
        include: {
          raga: true,
          tala: true,
          translations: true,
        },
        take: 3
      }
    }
  });

  if (!composer) {
    return (
        <main className="min-h-screen bg-[#fcfaf7] py-24 px-6 flex items-center justify-center">
            <Typography variant="h2">Composer not found</Typography>
        </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfaf7] pt-24 pb-8 px-6 flex flex-col items-center">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      <div className="relative z-10 mb-6 flex flex-col items-center text-center">
          <Typography variant="h1" className="text-3xl font-bold tracking-tighter mb-2">
              Connections
          </Typography>
          <Typography variant="p" className="text-slate-500 text-sm max-w-2xl">
              Explore the lineage, attributes, and works of {composer.name}
          </Typography>
      </div>

      <div className="relative z-10 w-full max-w-5xl h-[600px] mx-auto rounded-[2.5rem] bg-white p-3 shadow-xl border border-amber-100/50">
        <ComposerGraph composer={composer} compositions={composer.compositions} />
      </div>
    </main>
  );
}
