import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
  }

  try {
    const { level, topic, lang = 'EN' } = await request.json();
    const languageName = lang === 'KN' ? 'Kannada' : 'English';
    
    // 1. Check for cached lesson in the database
    const cachedLesson = await prisma.cachedLesson.findFirst({
      where: {
        level,
        topic,
        language: lang
      }
    });

    if (cachedLesson) {
      console.log(`[Learn Cache Hit] Loaded lesson for ${level} - ${topic}`);
      return NextResponse.json({ content: cachedLesson.content });
    }

    console.log(`[Learn Cache Miss] Generating new lesson for ${level} - ${topic} in ${lang}`);

    // 2. Generate a new lesson using Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
      generationConfig: {
        temperature: 0.7,
      },
      systemInstruction: `You are a renowned academic and spiritual scholar of Haridasa Sahitya (Dasa literature of Karnataka). You are writing an official, definitive study guide for a student preparing for the highly prestigious "${level}" level examination. The specific topic for this module is: "${topic}".

Your output must be a MASTERPIECE of academic writing and beautiful formatting. It should read like a premium, modern digital textbook.

FORMATTING REQUIREMENTS (Markdown):
1. Use a grand \`# Title\` for the module.
2. CRITICAL: You MUST break the module down into EXACTLY 6 distinct main sections using \`##\` headers. Our parser splits the content by \`##\` to create interactive "Units" in the UI. 
    - Section 1: Introduction (\`## Introduction\`)
    - Section 2, 3, 4: Body chapters (e.g. \`## Early Life\`, \`## Musical Mastery\`, etc.)
    - Section 5: Key Takeaways & Exam Tip (\`## Summary and Exam Prep\`)
    - Section 6: Practice Questions for Self-Assessment (\`## Practice Questions for Self-Assessment\`)
3. Use \`###\` for sub-sections within a unit if needed, but DO NOT use \`##\` for sub-sections.
4. Use blockquotes (\`>\`) for important spiritual quotes, philosophical tenets, or direct translated verses.
5. Use **bolding** for important terms (like Raga, Tala, Ankita, names, philosophical concepts).
6. If discussing a composition, present a small snippet of the lyrics in a beautifully formatted blockquote.
7. Use tables (\`| Header | Header |\`) if comparing things (e.g., Dasa Koota vs Vyasa Koota, or listing works).

CONTENT REQUIREMENTS:
- Depth: Do not be superficial. Provide historical context, specific names of Gurus/Shishyas, and exact philosophical definitions (e.g., Dvaita concepts like Hari Sarvottamatva).
- Tone: Inspiring, reverent, highly academic, and structured.

CRITICAL INSTRUCTION: You MUST output all text in ${languageName} script and language exclusively. If ${languageName} is Kannada, use the Kannada alphabet for all text. Do NOT wrap the entire response in a JSON object. Return pure, stunning Markdown text.`
    });

    const prompt = `Write a comprehensive, engaging lesson about "${topic}" for the ${level} exam level in ${languageName} language.`;
    
    const result = await model.generateContent(prompt);
    const lessonContent = result.response.text();
    
    // 3. Save the newly generated lesson to the database cache
    try {
      await prisma.cachedLesson.create({
        data: {
          level,
          topic,
          language: lang,
          content: lessonContent
        }
      });
      console.log(`[Learn Cache] Successfully saved new lesson to DB`);
    } catch (dbError) {
      console.error("[Learn Cache] Failed to save to DB:", dbError);
    }

    return NextResponse.json({ content: lessonContent });
  } catch (error) {
    console.error("Learn API Error:", error);
    return NextResponse.json({ error: 'Failed to generate lesson' }, { status: 500 });
  }
}
