import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding translation for Ellaaru Maaduvudu Hottegaagi (kanaka-8)...');

  const compositionId = 'kanaka-8';
  
  const translation = `Chorus: Everyone does everything for the sake of the belly, for a piece of cloth.

Verse 1: Studying the Vedas, Shastras, and Panchangas only to preach to others—all this is for the sake of the belly, for a piece of cloth.

Verse 2: Becoming a fierce soldier, walking with a sword and shield, hacking and cutting—all this is for the sake of the belly, for a piece of cloth.

Verse 3: Opening shops and businesses, using clever and sarcastic words, suffering setbacks while earning—all this is for the sake of the belly, for a piece of cloth.

Verse 4: Hoeing the fields, flattening the soil, ploughing and growing crops—all this is for the sake of the belly, for a piece of cloth.

Verse 5: Speaking sweet words like honey, deceiving everyone, telling lies to feed—all this is for the sake of the belly, for a piece of cloth.

Verse 6: Giving loans, grinding hard, carrying loads of wood, working in hardship to eat—all this is for the sake of the belly, for a piece of cloth.

Verse 7: Sannyasis (renunciates), Jangamas, Jogis, Jattis, mendicants, Bairagis—all these varied disguises are for the sake of the belly, for a piece of cloth.

Verse 8: Sitting in the ravine, holding stones and sticks, engaging in theft—all this is for the sake of the belly, for a piece of cloth.

Verse 9: Riding in a palanquin, surrounded by a crowd and entourage, displaying oneself grandly—all this is for the sake of the belly, for a piece of cloth.

Verse 10: Meditating upon the exalted Kaginele Adikeshava with a focused mind is for the sake of salvation (Mukti) and true bliss (Ananda).`;

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: compositionId }
  });

  if (existingTranslation) {
    await prisma.translation.update({
      where: { id: existingTranslation.id },
      data: { english: translation },
    });
    console.log('✅ Translation updated successfully!');
  } else {
    await prisma.translation.create({
      data: {
        compositionId: compositionId,
        english: translation,
        kannadaMeaning: '-', 
        wordByWord: '-', 
      },
    });
    console.log('✅ Translation created successfully!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
