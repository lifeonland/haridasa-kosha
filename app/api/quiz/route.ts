import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, Schema, SchemaType } from "@google/generative-ai";
import { prisma } from '@/lib/prisma';
import { Question } from '@/components/quiz/types';

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined.");
    return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
  }

  try {
    const { ageGroup, difficulty, lang = 'EN', numQuestions = 10 } = await request.json();
    const languageName = lang === 'KN' ? 'Kannada' : 'English';
    const requestedCount = parseInt(numQuestions.toString(), 10);
    
    // 1. Check for cached quizzes in the database and pool them
    const cachedQuizzes = await prisma.cachedQuiz.findMany({
      where: {
        ageGroup,
        difficulty,
        language: lang
      }
    });

    let pool: Question[] = [];
    for (const quiz of cachedQuizzes) {
      if (Array.isArray(quiz.questions)) {
        pool.push(...(quiz.questions as unknown as Question[]));
      }
    }

    // Deduplicate by question text
    const uniquePoolMap = new Map<string, Question>();
    pool.forEach(q => uniquePoolMap.set(q.question.trim(), q));
    let uniquePool = Array.from(uniquePoolMap.values());

    console.log(`[Quiz Pool] Found ${uniquePool.length} unique questions in cache for ${ageGroup}/${difficulty}/${lang}`);

    // 2. Generate a new batch if pool is small (we want at least enough to satisfy the request with some variety)
    if (uniquePool.length < requestedCount * 2) {
      console.log(`[Quiz Pool] Pool too small. Generating new batch via Gemini...`);
      
      const genAI = new GoogleGenerativeAI(apiKey);
      const questionSchema: Schema = {
        type: SchemaType.ARRAY,
        description: `A list of multiple choice questions about Haridasa Sahitya in ${languageName}.`,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: { type: SchemaType.STRING, description: `The question text in ${languageName}.` },
            options: { type: SchemaType.ARRAY, description: `Exactly four multiple-choice options in ${languageName}.`, items: { type: SchemaType.STRING } },
            correctIndex: { type: SchemaType.INTEGER, description: "The 0-based index of the correct option (0, 1, 2, or 3)." },
            explanation: { type: SchemaType.STRING, description: `A brief explanation in ${languageName}.` }
          },
          required: ["question", "options", "correctIndex", "explanation"]
        }
      };

      const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
        generationConfig: { responseMimeType: "application/json", responseSchema: questionSchema, temperature: 0.9 }
      });

      const systemInstruction = `You are an expert in Haridasa Sahitya (Dasa literature of Karnataka). Create an engaging multiple-choice quiz.

CRITICAL INSTRUCTION FOR DIFFICULTY SCALING: 
- EASY: Questions should be tough and require a solid understanding of Haridasa Sahitya, not just superficial trivia.
- MEDIUM: Questions should be very tough, requiring deep textual knowledge and familiarity with specific compositions.
- HARD: Questions must be extremely scholarly, requiring deep knowledge of obscure compositions, intricate Dvaita philosophical details, and lesser-known historical facts.
In all cases, incorrect options MUST be highly plausible and tricky distractors, never obvious or trivial.

CRITICAL INSTRUCTION FOR TRANSLATION & LANGUAGE: 
- You MUST output EVERYTHING (questions, options, explanations) strictly in the ${languageName} language and script. 
- Do NOT output any English words, letters, or punctuation if the language is Kannada. Use authentic Kannada terminology and script entirely. 
- Ensure high-quality, natural-sounding translations without literal mechanical translation artifacts.`;

      const prompt = `${systemInstruction}\n\nGenerate exactly ${requestedCount} questions about Haridasa Sahitya for age group: ${ageGroup} with difficulty: ${difficulty}. The language MUST be strictly ${languageName}. Ensure the questions are diverse and cover various Haridasas.`;
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const newQuestions: Question[] = JSON.parse(responseText);
      
      // Save to cache
      try {
        await prisma.cachedQuiz.create({
          data: {
            ageGroup,
            difficulty,
            language: lang,
            numQuestions: newQuestions.length,
            questions: newQuestions as any
          }
        });
        console.log(`[Quiz Cache] Successfully saved new batch of ${newQuestions.length} questions to DB`);
      } catch (dbError) {
        console.error("[Quiz Cache] Failed to save to DB:", dbError);
      }

      // Add to pool and deduplicate again
      newQuestions.forEach(q => uniquePoolMap.set(q.question.trim(), q));
      uniquePool = Array.from(uniquePoolMap.values());
    }

    // 3. Shuffle and pick requested number of questions
    const shuffledPool = shuffleArray(uniquePool);
    const finalQuestions = shuffledPool.slice(0, requestedCount);

    return NextResponse.json({ questions: finalQuestions });
  } catch (error: any) {
    console.error("Quiz API Error:", error);
    return NextResponse.json({ error: 'Failed to generate quiz', details: error.message, stack: error.stack }, { status: 500 });
  }
}
