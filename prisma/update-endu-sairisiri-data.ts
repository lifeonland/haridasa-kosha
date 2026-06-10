import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Endu Sairisiri Sri Krishnana Tappa (kanaka-list-32)...');

  const lyrics = `ಇಂದು ಸೈರಿಸಿರಿ ಶ್ರೀಕೃಷ್ಣನ ತಪ್ಪ
ಮುಂದಕೆ ನಿಮ್ಮ ಮನೆಗೆ ಬಾರನಮ್ಮ ||ಪ||

ಮಗುವು ಬಲ್ಲುದೆ ಇಷ್ಟು ಬೆಣ್ಣೆಯ ಕದ್ದರೆ
ಬಿಗಿಯ ಬಹುದೇ ಶ್ರೀ ಚರಣವನು
ಅಗಣಿತ ಮಹಿಮನ ಅಂಜಿಸಲೇಕಮ್ಮ
ಬಗೆಯ ಬಾರದೆ ನಿಮ್ಮ ಮಕ್ಕಳಂತೆ ||೧||

ಹಸುಮಗುವನು ಕಂಡು ಮುದ್ದಿಸಲೊಲ್ಲದೆ
ಹುಸಿಗ ಕಳ್ಳನೆಂದು ಕಟ್ಟುವಿರಿ
ವಸುಧೆಯೊಳಗೆ ನಾನೊಬ್ಬಳೆ ಪಡೆದೆನೆ ನಿಮ್ಮ
ಹಸು ಮಗುವಿನಂತೆ ಭಾವಿಸಬಾರದೆ ||೨||

ಎಷ್ಟು ಸಾರಿಯು ನಾ ಬೇಡವೆಂದರೆ ಕೇಳ
ದುಷ್ಟ ಮಕ್ಕಳ ಕೂಡೆ ಒಡನಾಟವ
ಕಟ್ಟಿದ ನೆಲುವಿನ ಬೆಣ್ಣೆಯನೀವೆನು
ಬಿಟ್ಟು ಕಳುಹಿರಮ್ಮ ಆದಿಕೇಶವನ ||೩||`;

  const translation = `Chorus: Please forgive Sri Krishna’s mistake today; do not let him come to your house in the future.

Verse 1: Does a child know anything if he steals this much butter? Can you tie his divine feet? Why do you frighten the one who has immeasurable glory? Can you not think of him as your own child?

Verse 2: Seeing a young child, instead of caressing him, you tie him up calling him a thief. Did I alone give birth to him in this world? Can you not treat him like your own young child?

Verse 3: Even though I have asked many times, he does not listen and continues to associate with mischievous children. Please give him the butter that is tied to the post and let go of Adikeshavananda.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-32' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-32' }
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
        compositionId: 'kanaka-list-32',
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
