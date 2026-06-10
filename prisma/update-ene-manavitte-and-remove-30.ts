import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Ene Manavitte Lalitaangi (kanaka-list-31)...');
  console.log('Removing composition kanaka-list-30...');

  // --- 1. Update kanaka-list-31 ---
  const lyrics = `ಏನೆ ಮನವಿತ್ತೆ ಲಲಿತಾಂಗಿ
ಅಸಮಾನ ಗೋವಳ ಕುಲವಿಲ್ಲದವನೊಳು ||ಪ||

ಮಗಗೆ ಮೈದುನನಾದ ಮಗಳಿಗೆ ಪತಿಯಾದ
ಮಗಳಿಗಳಿಯನಾದ ಅಳಿಯಗಳಿಯನಾದ ||೧||

ಮಗಳ ಮಗಗೆ ಮೈದುನನಾಗಿ ಮಾವನ
ಜಗವರಿಯಲು ಕೊಂದ ಕುಲಗೇಡಿ ಗೋವಳ ||೨||

ಅತ್ತೆಗೆ ವಲ್ಲಭನಾದ ಭೃತ್ಯರಿಗಾಳಾದ
ಚಿತ್ತ ಒಲಿದು ಚೆನ್ನ ಆದಿಕೇಶವನೊಳು ||೩||`;

  const translation = `Chorus: Oh beautiful lady, why did you give your heart to that incomparable cowherd who has no lineage?

Verse 1: He became the brother-in-law to the son, the husband to the daughter, the son-in-law to the daughter, and the son-in-law to the son-in-law.

Verse 2: He became the brother-in-law to the daughter's son, and for the world to know, that cowherd of no lineage killed his own uncle.

Verse 3: He became the beloved of the mother-in-law and the servant of his devotees, having won over the heart of our beautiful Lord Adikeshav.`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-31' },
    data: { lyrics: lyrics },
  });

  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-31' }
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
        compositionId: 'kanaka-list-31',
        english: translation,
        kannadaMeaning: '-', 
        wordByWord: '-', 
      },
    });
    console.log('✅ Translation created successfully!');
  }

  // --- 2. Remove kanaka-list-30 ---
  await prisma.translation.deleteMany({
    where: { compositionId: 'kanaka-list-30' },
  });
  
  try {
    await prisma.composition.delete({
      where: { id: 'kanaka-list-30' },
    });
    console.log('✅ Composition kanaka-list-30 removed successfully!');
  } catch (e) {
    console.log('⚠️ Composition kanaka-list-30 not found, might have been removed already.');
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
