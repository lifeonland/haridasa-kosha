import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Refrain:
Come, O Krishna, come to the homes of your devotees now.

Anupallavi:
Come and show your face; who is equal to you? 
O virtuous one, who supports the entire universe!

Stanza 1:
With anklets on your feet and small bells tinkling, 
Making the rhythmic sound "Dhim-dhimi dhimi dhimi," 
Come playing your golden flute, please come.

Stanza 2:
With bracelets on your wrists and golden rings shining, 
With the "Kinkini" bells making a "Kini kini" sound, 
Come playing your golden flute, come O Krishna.

Stanza 3:
O Adi Keshava, who has made Udupi your abode, 
I am a servant of your feet, a servant of your feet, 
Calling out as your servant, I beg you to come.`;

  // Create the translation record since it was missing
  const newTranslation = await prisma.translation.create({
    data: { 
      compositionId: 'kanaka-list-7',
      english: englishTranslation,
      kannadaMeaning: "",
      wordByWord: ""
    }
  });

  console.log('Successfully created translation for:', newTranslation.compositionId);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
