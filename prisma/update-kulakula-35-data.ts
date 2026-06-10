import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Kulakula Kulavendu (kanaka-list-35)...');

  const lyrics = `ಕುಲ ಕುಲ ಕುಲವೆಂದು ಹೊಡೆದಾಡದಿರಿ ನಿಮ್ಮ
ಕುಲದ ನೆಲೆಯನೇನಾದರೂ ಬಲ್ಲಿರಾ ||ಪ||

ಹುಟ್ಟದ ಯೋನಿಗಳಿಲ್ಲ ಮೆಟ್ಟದ ಭೂಮಿಗಳಿಲ್ಲ
ಅಟ್ಟು ಉಣ್ಣದ ವಸ್ತುಗಳಿಲ್ಲವೋ
ಗುಟ್ಟುಕಾಣಿಸೆ ಬಂತು ಹಿರಿದೇನು ಕಿರಿದೇನು
ನೆಟ್ಟನೆ ಸರ್ವಜ್ಞನ ನೆನೆಕಂಡ್ಯ ಮನುಜ ||೧।।

ಜಲವೇ ಸಕಲ ಕುಲಕ್ಕೆ ತಾಯಿಯಲ್ಲವೆ ಆ
ಜಲದ ಕುಲವನೇನಾದರೂ ಬಲ್ಲಿರಾ
ಜಲದ ಬೊಬ್ಬುಳಿಯಂತೆ ಸ್ಥಿರವಲ್ಲ ಈ ದೇಹ
ನೆಲೆಯನರಿತು ನೀ ಹರಿಯ ನೆನೆ ಮನುಜ ||೨।।

ಹರಿಯೇ ಸರ್ವೋತ್ತಮ ಹರಿಯೇ ಸರ್ವೇಶ್ವರ
ಹರಿಮಯವೆಲ್ಲವೆನುತ ತಿಳಿದು
ಸಿರಿಕಾಗಿನೆಲೆಯಾದಿಕೇಶವರಾಯನ
ಚರಣಕಮಲವನು ಕೀರ್ತಿಸುವನೆ ಕುಲಜ ||೩।।`;

  const translation = `Chorus: Do not fight saying caste, caste, caste. Do you even know the foundation of your own caste?

Verse 1: There is no womb you haven't been born in, no land you haven't walked upon. There is nothing you haven't cooked and eaten. The secret is revealed—what is big and what is small? O human, firmly remember the All-Knowing Lord.

Verse 2: Is water not the mother of all castes? Do you know the caste of water? Like a bubble in water, this body is not permanent. Realizing this truth, O human, remember Hari.

Verse 3: Hari is the Supreme, Hari is the Lord of all. Knowing that everything is pervaded by Hari, he who praises the lotus feet of the glorious Kaginele Adi Keshavaraya is the true noble one (Kulaja).`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-35' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-35' }
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
        compositionId: 'kanaka-list-35',
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
