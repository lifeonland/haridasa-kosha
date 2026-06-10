import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Enu Illada Eradu Dina Samsaara (kanaka-14)...');

  const lyrics = `ಏನು ಇಲ್ಲದ ಎರಡು ದಿನದ ಸಂಸಾರ
ಜ್ಞಾನದಲಿ ದಾನಧರ್ಮವ ಮಾಡಿರಯ್ಯ ||ಪ||

ಹಸಿದು ಬಂದವರಿಂಗೆ ಅಶನವೀಯಲುಬೇಕು
ಶಿಶುವಿಂಗೆ ಪಾಲ್ಬೆಣ್ಣೆಯನು ನಡೆಸಬೇಕು
ಹಸನಾದ ಭೂಮಿಯನು ಧಾರೆಯೆರೆಯಲುಬೇಕು
ಭಾಷೆ ಕೊಟ್ಟ ಬಳಿಕ ನಿಜವಿರಲು ಬೇಕು ||೧||

ಕಳ್ಳತನಗಳ ಮಾಡಿ ಒಡಲು ಹೊರೆಯಲು ಬೇಡ
ಠೌಳಿಗಾರನು ಆಗಿ ತಿರುಗಬೇಡ
ಕುಳ್ಳಿರ್ದ ಸಭೆಯೊಳಗೆ ತಿತ್ಯವ ನಡೆಸಬೇಡ
ಒಳ್ಳೆಯವನೆಂಬ ಉಬ್ಬಲು ಬೇಡ ಮನುಜ ||೨||

ದೊರೆತನವು ಬಂದಾಗ ಕೆಟ್ಟು ನುಡಿಯಲು ಬೇಡ
ಸಿರಿ ಬಂದ ಕಾಲಕ್ಕೆ ಮೆರೆಯಬೇಡ
ಸಿರಿವಂತನಾದರೇ ನೆಲೆಯಾದಿಕೇಶವನ
ಚರಣ ಕಮಲವ ಸೇರಿ ಸುಖಿಯಾಗು ಮನುಜ ||೩||`;

  const translation = `Pallavi: This worldly life is only for two days and holds nothing permanent. Perform acts of charity and righteousness with wisdom.

Verse 1: One must provide food to those who come hungry. One must feed milk and butter to children. One must donate fertile land (as an act of charity). Once a promise is made, one must remain true to it.

Verse 2: Do not fill your stomach by stealing. Do not wander around as a trickster. Do not behave crookedly in a seated assembly. Do not be arrogant, thinking you are a good person, O human.

Verse 3: When you attain a position of authority, do not speak ill of others. Do not boast when wealth comes to you. If you become wealthy, seek the lotus feet of the eternal Lord Adikeshavana and find happiness, O human.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-14' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-14' }
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
        compositionId: 'kanaka-14',
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
