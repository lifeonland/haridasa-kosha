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
    include: { 
      composition: {
        include: {
          composer: true,
          translations: true,
          raga: true,
          tala: true,
          deity: true,
          ankita: true,
        }
      } 
    },
  });

  // If a composition exists for this date but it lacks translations (from old code),
  // delete it so it gets regenerated with our new rich-content rules.
  if (dailyComp && (!dailyComp.composition.translations || dailyComp.composition.translations.length === 0)) {
    await prisma.dailyComposition.delete({ where: { id: dailyComp.id } });
    dailyComp = null;
  }

  if (!dailyComp) {
    // 1. Pick a random composer to ensure diversity (so we don't always get Purandara Dasa)
    // Only pick composers that actually have compositions with translations (rich content)
    const composers = await prisma.composer.findMany({
      where: {
        compositions: {
          some: {
            translations: { some: {} }
          }
        }
      },
      select: { id: true }
    });
    
    if (composers.length === 0) {
      throw new Error("No composers with translations found");
    }

    const randomComposer = composers[Math.floor(Math.random() * composers.length)];

    // 2. Pick a random rich composition from that composer
    const count = await prisma.composition.count({
      where: { 
        composerId: randomComposer.id,
        translations: { some: {} }
      }
    });
    const skip = Math.floor(Math.random() * count);
    
    const compositions = await prisma.composition.findMany({ 
        where: { 
          composerId: randomComposer.id,
          translations: { some: {} }
        },
        take: 1, 
        skip
    });
    
    dailyComp = await prisma.dailyComposition.create({
      data: {
        date: targetDate,
        compositionId: compositions[0].id,
        commentary: "Reflect on the divine message within this composition.",
      },
      include: { 
        composition: {
          include: {
            composer: true,
            translations: true,
            raga: true,
            tala: true,
            deity: true,
            ankita: true,
          }
        } 
      },
    });
  }

  const composition = dailyComp.composition;
  const translation = composition.translations?.[0];

  return {
    composition: {
      id: composition.id,
      title: composition.title,
    },
    quote: {
      text: composition.firstLine,
      source: composition.composer.name
    },
    translation: {
      english: translation?.english || dailyComp.commentary,
      kannada: translation?.kannadaMeaning || dailyComp.commentary,
      wordByWord: translation?.wordByWord,
    },
    transliteration: composition.transliteration,
    essence: {
      deity: composition.deity?.name,
      ankita: composition.ankita?.name,
      lyrics: composition.lyrics,
    },
    heritage: {
      raga: composition.raga?.name,
      tala: composition.tala?.name,
    },
    legacy: {
      name: composition.composer.name,
      timeline: composition.composer.timeline,
      biography: composition.composer.biography,
    },
    actionable: getActionableItems(composition.id)
  };
}

// Helper to deterministically pick actionable items based on composition ID
function getActionableItems(id: string) {
    const reflections = [
        { question: "How can I practice humility in my interactions today?", action: "Perform one act of kindness without expecting recognition." },
        { question: "What does abundance mean in my spiritual life?", action: "Take a moment to appreciate the simple joys around you." },
        { question: "Am I offering my actions with devotion?", action: "Dedicate your first work task to the Divine." },
        { question: "Where am I seeking happiness outside rather than within?", action: "Spend 5 minutes in silent introspection before sleeping." },
        { question: "How can I see the divine in everyone I meet today?", action: "Greet someone you usually ignore with genuine warmth." }
    ];
    
    const practices = [
        { title: "Gratitude Meditation", desc: "Spend 5 minutes in silent reflection on three things you are grateful for today." },
        { title: "Mindful Listening", desc: "Listen to a devotional composition with full attention, closing your eyes to the world." },
        { title: "Silent Prayer", desc: "Offer a silent prayer for the well-being and peace of all living beings." },
        { title: "Nama Japa", desc: "Chant the name of the Lord 108 times with deep focus and devotion." },
        { title: "Digital Fasting", desc: "Disconnect from all screens for one hour to connect with your inner self." }
    ];

    // Simple hash function to pick deterministically
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index1 = Math.abs(hash) % reflections.length;
    const index2 = Math.abs(hash + 1) % practices.length;

    return {
        reflection: reflections[index1],
        practice: practices[index2]
    };
}

export async function getRandomWisdom() {
  const composers = await prisma.composer.findMany({
    where: {
      compositions: {
        some: {
          translations: { some: {} }
        }
      }
    },
    select: { id: true }
  });
  
  if (composers.length === 0) {
    throw new Error("No composers with translations found");
  }

  const randomComposer = composers[Math.floor(Math.random() * composers.length)];

  const count = await prisma.composition.count({
    where: { 
      composerId: randomComposer.id,
      translations: { some: {} }
    }
  });
  const skip = Math.floor(Math.random() * count);
  
  const compositions = await prisma.composition.findMany({ 
      where: { 
        composerId: randomComposer.id,
        translations: { some: {} }
      },
      take: 1, 
      skip,
      include: {
        composer: true,
        translations: true,
        deity: true,
        ankita: true,
        raga: true,
        tala: true
      }
  });

  const composition = compositions[0];
  const translation = composition.translations?.[0];

  return {
    composition: {
      id: composition.id,
      title: composition.title,
    },
    quote: {
      text: composition.firstLine,
      source: composition.composer.name
    },
    translation: translation ? {
      english: translation.english,
      kannada: translation.kannadaMeaning,
      wordByWord: translation.wordByWord
    } : undefined,
    commentary: "Reflect on the divine message within this composition.",
    transliteration: composition.transliteration,
    heritage: {
      raga: composition.raga?.name,
      tala: composition.tala?.name,
    },
    essence: {
      deity: composition.deity?.name,
      ankita: composition.ankita?.name,
      lyrics: composition.lyrics,
    },
  };
}
