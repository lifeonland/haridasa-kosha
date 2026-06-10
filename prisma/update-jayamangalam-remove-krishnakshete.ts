import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics/translation for kanaka-list-44 and removing krishnakshete-1...');

  // --- 1. Update kanaka-list-44 (Jayamangalam) ---
  const lyrics = `ಮಂಗಲಂ ಜಯ ಮಂಗಲಂ ಮಂಗಲಂ ಜಯ ಮಂಗಲಂ ||ಪ||

ಅಂಧಕನನುಜನ ಕಂದನ ತಂದೆಯ ಕೊಂದನ ಶಿರದಲಿ ನಿಂದವನ
ಚೆಂದದಿ ಪಡೆದನ ನಂದನೆಯಳನೊಲವಿಂದದಿ ಧರಿಸಿದ ಮುಕುಂದನಿಗೆ ||೧||

ರಥನಡರಿ ಸುರಪಥದಲಿ ತಿರುಗುವ ಸುತನಿಗೆ ಶಾಪವನಿತ್ತವನ
ಖತಿಯನ್ನು ತಡೆದನ ಸತಿಯ ಜನನಿ ಸುತ ಸತಿಯರನಾಳಿದ ಚತುರನಿಗೆ ||೨||

ಹರಿಯ ಮಗನ ಶಿರ ಹರಿದನ ತಂದೆಯ ಹಿರಿಯ ಮಗನ ತಮ್ಮನ ಪಿತನ
ಭರದಿ ಭಕ್ಶಿಸುವನ ಶಿರದಲಿ ನಟಿಸಿದ ವರಕಾಗಿನೆಲೆಯಾದಿಕೇಶವರಾಯಗೆ ||೩||`;

  const translation = `Chorus: May there be victory, may there be auspiciousness.

Verse 1: Victory to the Lord (Mukunda) who stands on the head of the one who killed the father of the child of the younger brother of Andhaka (Shiva), and who gracefully bore the child of the Lord (the universe).

Verse 2: Victory to the clever one who rules over the wives and sons, who stopped the glory of the one who cursed the son who travels in the celestial path.

Verse 3: Victory to the glorious Kaginele Adikeshava, who danced on the head of the one who consumes with great speed (the serpent), and who is the Lord of all.`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-44' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-44' }
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
        compositionId: 'kanaka-list-44',
        english: translation,
        kannadaMeaning: '-', 
        wordByWord: '-', 
      },
    });
    console.log('✅ Translation created successfully!');
  }

  // --- 2. Remove krishnakshete-1 ---
  await prisma.translation.deleteMany({
    where: { compositionId: 'krishnakshete-1' },
  });
  
  try {
    await prisma.composition.delete({
      where: { id: 'krishnakshete-1' },
    });
    console.log('✅ Composition krishnakshete-1 removed successfully!');
  } catch (e) {
    console.log('⚠️ Composition krishnakshete-1 not found, might have been removed already.');
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
