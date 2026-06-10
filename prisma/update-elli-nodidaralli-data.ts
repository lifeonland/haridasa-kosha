import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Elli Nodidaralli Raamaa (kanaka-list-56)...');

  const lyrics = `ಎಲ್ಲಿ ನೋಡಿದರಲ್ಲಿ ರಾಮ – ಇದ
ಬಲ್ಲ ಜಾಣರ ದೇಹದೊಳಗೆ ನೋಡಣ್ಣ ||ಪ||

ಕಣ್ಣೇ ಕಾಮನ ಬೀಜ – ಈಕಣ್ಣಿಂದಲೆ ನೋಡು
ಮೋಕ್ಷ ಸಾಮ್ರಾಜ್ಯಕಣ್ಣಿನ ಮೂರುತಿ ಬಿಗಿದು – ಒಳಗಣ್ಣಿಂದಲೇ ದೇವರ ನೋಡಣ್ಣ ||೧||

ಮೂಗೇ ಶ್ವಾಸ ನಿಶ್ವಾಸ – ಈಮೂಗಿಂದಲೇ ಕಾಣೊ ಯೋಗ ಸಂನ್ಯಾಸ
ಮೂಗನಾದರೆ ವಿಶೇಷ – ಒಳಮೂಗಲಿ ನೋಡಣ್ಣ ಲೀಲಾವಿಲಾಸ ||೨||

ಕಿವಿಯೇ ಕರ್ಮಕೆ ದ್ವಾರ – ಈಕಿವಿಯಿಂದಲೇ ಕೇಳೋ ಮೋಕ್ಷದ ಸಾರ
ಕಿವಿಯೇ ಕರ್ಮ ಕುಠಾರ – ಒಳಗಿವಿಯಲ್ಲಿ ಕಾಣೊ ನಾದದ ಬೇರ ||೩||

ಬೊಮ್ಮ ಮಾಡಿದ ತನುಬಿಟ್ಟು – ವಿಶ್ವಕರ್ಮನು ಮಾಡಿದ ಬೊಂಬೆಯನಿಟ್ಟು
ಸುಮ್ಮನೆ ಕೂಗುಗಳಿಟ್ಟು – ಅದನಂಬುವನೆಂಬೋನು ಹೋಹ ಕಂಗೆಟ್ಟು ||೪||

ರೂಢಿಯೊಳಗೆ ಶುದ್ಧ ಮೂಢ – ಈಕಾಡುಕಲ್ಲುಗಳನ್ನು ನಂಬಬೇಡ
ನಾಡಾಡಿ ದೈವಗಳನೆಲ್ಲ – ನಮ್ಮಬಡದಾದಿ ಕೇಶವನೊಬ್ಬನೆ ಬಲ್ಲ ||೫||`;

  const translation = `Chorus: Rama is everywhere. Look for Him within the bodies of the wise.

Verse 1: The eye is the seed of desire; look through these eyes. Hold the form of the Lord in your eyes, which is the kingdom of liberation, and see God with your inner eye.

Verse 2: The nose is for breath and exhalation; see the yoga of renunciation through this nose. If you are wise, look within the nose to see the divine play (Leela Vilasa).

Verse 3: The ear is the gateway to action; listen to the essence of liberation through these ears. The ear is the axe for karma; see the root of the divine sound (Naada) within the inner ear.

Verse 4: Leaving the body created by Brahma, and clinging to the doll created by Vishwakarma, those who simply shout and believe in it will go astray, confused.

Verse 5: Oh pure fool in this world, do not believe in wild stones (idols). Our Adikeshavan alone knows all the wandering deities.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-56' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-56' }
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
        compositionId: 'kanaka-list-56',
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
