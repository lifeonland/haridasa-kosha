import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Halavu Jeevanava (kanaka-list-41)...');

  const lyrics = `ಹಲವು ಜೀವನವ ಒಂದೆಲೆ ನುಂಗಿತು
ಕಾಗಿ ನೆಲೆಯಾದಿಕೇಶವನು ಬಲ್ಲನೀ ಬೆಡಗ ||ಪ||

ಹರಿಯ ನುಂಗಿತು ಹರ ಬ್ರಹ್ಮರ ನುಂಗಿತು ಸುರರಿಗುಂಟಾದ ದೇವರ ನುಂಗಿತು
ಉರಿಗಣ್ಣಶಿವನ ಒಂದೆಲೆ ನುಂಗಿತೋ ದೇವ ಹರಿಯ ಬಳಗವ ಒಂದೆಲೆ ನುಂಗಿತು ||೧||

ಎಂಟುಗಜವನು ನುಂಗಿ ಕಂಟಕರೈವರ ನುಂಗಿ ಉಂಟಾದ ಗಿರಿಯ ತಲೆಯ ನುಂಗಿತು
ಕಂಟವ ಪಿಡಿದ ಬ್ರಹ್ಮನ ನುಂಗಿತೆಲೊ ದೇವ ಎಂಟಾರು ಲೋಕ ಒಂದೆಲೆ ನುಂಗಿತು ||೨||

ಗಿಡವ ನುಂಗಿತು ಗಿಡದೊಡತೊಟ್ಟ ನುಂಗಿತು ಗಿಡದ ತಾಯಿ ತಂದೆಯ ನುಂಗಿತು
ಬೆಡಗ ಬಲ್ಲರೆ ಪೇಳಿ ಬಾಡ ಕನಕದಾಸ ನೊಡೆಯಾದಿಕೇಶವನ ಬಲ್ಲನೀ ಬೆಡಗ ||೩||`;

  const translation = `Chorus: The single leaf swallowed many lives. Only the Lord of Kagi Nele, Adikeshava, knows this mystery.

Verse 1: It swallowed Hari (Vishnu), it swallowed Hara (Shiva) and Brahma, and it swallowed the gods who were born. It swallowed the fire-eyed Shiva on a single leaf, and it swallowed the entire clan of Hari on a single leaf.

Verse 2: It swallowed the eight elephants, it swallowed the five thorns (senses), and it swallowed the head of the mountain that existed. It swallowed Brahma who held the throat, and it swallowed the sixty-four worlds on a single leaf.

Verse 3: It swallowed the plant, it swallowed the one who owned the plant, and it swallowed the mother and father of the plant. If you know the mystery, tell me, O Kanaka Dasa; only the Lord Adikeshava knows this mystery.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-41' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-41' }
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
        compositionId: 'kanaka-list-41',
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
