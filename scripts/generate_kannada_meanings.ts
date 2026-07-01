import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prisma = new PrismaClient();
const apiKey = process.env.GEMINI_API_KEY;

async function generateKannadaMeaning(englishText: string, model: any) {
  const prompt = `You are a translator specializing in Haridasa compositions and Dvaita philosophy. 
Translate the following English meaning of a Kannada composition back into a deeply poetic, pure Kannada translation (meaning). 
Provide ONLY the translated Kannada text without any introductions, markdown code blocks, or explanations. Keep the structure identical to the original English text (paragraphs, newlines, etc).

English text to translate:
${englishText}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  } catch (error) {
    console.error("AI Generation error:", error);
    return null;
  }
}

async function main() {
  if (!apiKey) {
    console.error("No GEMINI_API_KEY found in environment!");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  console.log("Fetching translations with missing Kannada meanings...");
  const translations = await prisma.translation.findMany({
    where: {
      kannadaMeaning: {
        equals: ""
      }
    },
    include: { composition: true }
  });

  console.log(`Found ${translations.length} translations to process.`);

  let successCount = 0;
  for (const t of translations) {
    console.log(`Processing [${t.composition.title}]...`);
    if (!t.english) {
      console.log(`  Skipping: No English text found.`);
      continue;
    }

    const kannadaMeaning = await generateKannadaMeaning(t.english, model);
    if (kannadaMeaning) {
      await prisma.translation.update({
        where: { id: t.id },
        data: { kannadaMeaning }
      });
      console.log(`  Updated!`);
      successCount++;
    } else {
      console.log(`  Failed to generate meaning.`);
    }

    // Add a 4.5 second delay to avoid rate limits (15 RPM free tier limit)
    await new Promise(resolve => setTimeout(resolve, 4500));
  }

  console.log(`Done! Successfully updated ${successCount} out of ${translations.length} translations.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
