import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Mangalaratiya Paadire (kanaka-list-67)...');

  const lyrics = `ಮಂಗಳಾರತಿಯ ಪಾಡಿರೆ ಮಾನಿನಿಯರು ||ಪ||

ಅಂಧಕನನುಜನ ಕಂದನ ತಂದೆಯ ಕೊಂದನ ಶಿರದಲಿ ನಿಂದವನ
ಚೆಂದದಿ ಪಡೆದವನ ನಂದನೆಯಳ ನಲವಿಂದ ಧರಿಸಿದ ಮುಕುಂದನಿಗೆ ||೧||

ರಥವನಡರಿ ಸುರ ಪಥದಲಿ ತಿರುಗುವನಸುತನಿಗೆ ಶಾಪವನಿತ್ತವನ
ಖತಿಯನ್ನು ತಡೆದನ ಸತಿಯ ಜನನಿ ಸುತನ ಸತಿಯರನಾಳಿದ ಚತುರನಿಗೆ ||೨||

ಹರಿಯ ಮಗನ ಶಿರ ಹರಿದನ ತಂದೆಯ ಹಿರಿಯ ಮಗನ ತಂದೆಯ
ಪಿತನ ಭರದಿ ಭುಜಿಸಿದವನ ಶಿರದಲಿ ನಟಿಸಿದವರ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವಗೆ ||೩||`;

  const translation = `Chorus: Oh ladies, sing the Mangalarati (auspicious lamp offering).

Verse 1: To Mukunda (Lord Krishna), who is the father of Manmatha (the son of the one who is the younger brother of Andhaka, i.e., Shiva), who stood on the head of the one who killed the demon, who obtained the earth beautifully, and who happily bore the daughter of Nanda.

Verse 2: To the clever one who ruled over the wives and sons, who gave a curse to the son of the one who travels in the sky riding a chariot, and who stopped the destruction.

Verse 3: To the glorious Kaginele Adikeshavaraya, who danced on the head of the one who consumed with haste, and who is the father of the father of the elder son of the father of the son of Hari.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-67' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-67' }
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
        compositionId: 'kanaka-list-67',
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
