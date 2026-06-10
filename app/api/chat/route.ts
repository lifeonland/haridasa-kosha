import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json({ reply: 'Please ask a question about Haridasa literature or philosophy.' });
    }

    // 1. Semantic Search: Find relevant compositions/commentaries
    // Using simple keyword search as a functional placeholder for RAG
    const compositions = await prisma.composition.findMany({
      where: {
        OR: [
          { title: { contains: message, mode: 'insensitive' } },
          { lyrics: { contains: message, mode: 'insensitive' } },
        ],
      },
      take: 2,
      include: { composer: true }
    });

    // 2. Construct context
    let reply = "";
    let citations: string[] = [];

    if (compositions.length > 0) {
      const context = compositions.map(c => 
        `"${c.title}" by ${c.composer.name}: ${c.lyrics.substring(0, 100)}...`
      ).join(' ');
      
      reply = `In the context of Haridasa literature, I found references related to "${message}": ${context}. These compositions often highlight the core tenets of Dvaita philosophy, such as bhakti and devotion to Lord Vittala.`;
      citations = compositions.map(c => `${c.title} - ${c.composer.name}`);
    } else {
      reply = `I am still learning about "${message}". The Haridasa tradition is vast, focusing on the works of composers like Purandara Dasa and Kanaka Dasa. Could you ask about a specific composition or philosophical concept?`;
    }

    return NextResponse.json({
      reply,
      citations,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ reply: 'Sorry, I am having trouble connecting to the knowledge base right now.' }, { status: 500 });
  }
}
