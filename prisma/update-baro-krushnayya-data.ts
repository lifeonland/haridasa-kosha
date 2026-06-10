import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Baro Krushnayya (kanaka-list-7)...');

  const lyrics = `ಬಾರೋ ಕೃಷ್ಣಯ್ಯ ನಿನ್ನ ಭಕ್ತರ ಮನೆಗೀಗ ||ಪ||

ಬಾರೋ ನಿನ್ನ ಮುಖ ತೋರೋ ನಿನ್ನ
ಸರಿ ಯಾರೋ ಜಗಧಾರ ಶೀಲನೇ ||ಅ.ಪ||

ಅಂದುಗೆ ಪಾದವು ಕಾಲಂದುಗೆ ಕಿರು ಗೆಜ್ಜೆ
ಧಿಂಧಿಮಿ ಧಿಮಿ ಧಿಮಿ ಧಿಮಿ ಎನುತ
ಪೊಂಗೊಳನುದುತ್ತ ಬರಿಯ ಬಾರಯ್ಯ ||೧||

ಕಂಕಣ ಕರದಲ್ಲಿ ಪೊನ್ನುಂಗುರ ಹೊಳೆಯುತ
ಕಿಂಕಿಣಿ ಕಿಣಿ ಕಿಣಿ ಕಿಣಿ ಎನುತ
ಪೊಂಗೊಳಲನೂದುತ್ತ ಬಾರಯ್ಯ ಬಾರೋ ಕೃಷ್ಣಯ್ಯ ||೨||

ವಾಸ ಉಡುಪೀಲಿ ನೆಲೆಯಾದಿ ಕೇಶವನೇ
ದಾಸ ನಿನ್ನ ಪದ ದಾಸ ನಿನ್ನ ಪದ
ದಾಸ ನಿನ್ನ ಪದ ದಾಸ ಕರೆವೆನು ಬಾರಯ್ಯ ||೩||`;

  const translation = `Chorus: Come, O Krishna, to the homes of your devotees now.

Anupallavi: Come, show us your face; who is equal to you, O sustainer of the world?

Verse 1: With anklets on your feet and small bells jingling, making the sound "dhim-dhimi-dhimi-dhimi," playing the flute, come, O Krishna.

Verse 2: With bracelets on your hands and a golden ring shining, making the sound "kinkini-kini-kini-kini," playing the flute, come, O Krishna, come.

Verse 3: O Keshava, who resides in Udupi, I, your servant, call upon your feet, I call upon your feet, I call upon your feet, O Lord, please come.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-7' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-7' }
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
        compositionId: 'kanaka-list-7',
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
