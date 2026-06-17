import { prisma } from './prisma';

// A small curated collection of wisdom to ensure content is always fresh and meaningful
const wisdomArchive = [
    {
        quote: { text: "ಪಾಲಿಸು ಬಾರೋ ಕರುಣಾಕರ ಕೃಷ್ಣ", source: "ಪುರಂದರ ದಾಸರು - ಪಾಲಿಸು ಬಾರೋ" },
        reflection: { question: "How can I practice humility in my interactions today?", action: "Perform one act of kindness without expecting recognition." },
        spotlight: { name: "Purandara Dasa", fact: "Known as the Pitamaha of Carnatic music. Composed over 4,500 songs." },
        practice: { title: "Gratitude Meditation", desc: "Spend 5 minutes in silent reflection on three things you are grateful for today." }
    },
    {
        quote: { text: "ಭಾಗ್ಯದ ಲಕ್ಷ್ಮೀ ಬಾರಮ್ಮ", source: "ಪುರಂದರ ದಾಸರು - ಭಾಗ್ಯದ ಲಕ್ಷ್ಮೀ ಬಾರಮ್ಮ" },
        reflection: { question: "What does abundance mean in my spiritual life?", action: "Take a moment to appreciate the simple joys around you." },
        spotlight: { name: "Kanaka Dasa", fact: "A devotional poet and social reformer whose songs democratized spiritual knowledge." },
        practice: { title: "Mindful Listening", desc: "Listen to a devotional composition with full attention for 10 minutes." }
    },
    {
        quote: { text: "ಕನಕದಾಸರ ಕೀರ್ತನೆಗಳ ಸಾರವೇ ಭಕ್ತಿ", source: "ಕನಕ ದಾಸರು - ಸಾಹಿತ್ಯ ಸಾರ" },
        reflection: { question: "Am I offering my actions with devotion?", action: "Dedicate your first work task to the Divine." },
        spotlight: { name: "Vijaya Dasa", fact: "A prominent Haridasa known for his powerful compositions and deep devotion to Lord Vittala." },
        practice: { title: "Silent Prayer", desc: "Offer silent prayer for the well-being of all living beings." }
    }
];

export async function getDailyWisdom(date?: Date) {
  const targetDate = date || new Date();
  targetDate.setHours(0, 0, 0, 0);
  
  const dayIndex = targetDate.getDate() % wisdomArchive.length;
  const content = wisdomArchive[dayIndex];

  let dailyComp = await prisma.dailyComposition.findUnique({
    where: { date: targetDate },
    include: { composition: true },
  });

  if (!dailyComp) {
    // If not found for target date, we might want to maintain current randomized behavior 
    // or just return null/default for past dates. For now, let's keep it robust.
    const count = await prisma.composition.count();
    const skip = Math.floor(Math.random() * count);
    const compositions = await prisma.composition.findMany({ 
        take: 1, 
        skip
    });
    
    dailyComp = await prisma.dailyComposition.create({
      data: {
        date: targetDate,
        compositionId: compositions[0].id,
        commentary: "Reflect on the divine message within this composition.",
      },
      include: { composition: true },
    });
  }

  return {
    composition: dailyComp.composition,
    ...content
  };
}
