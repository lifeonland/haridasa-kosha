import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Bandhu Trijagake (kanaka-list-34)...');

  const lyrics = `ಬಂಧು ತ್ರಿಜಗಕೆ ಶ್ರೀ ಹರಿಯಲ್ಲದೆ ಮಿಕ್ಕ
ಬಂಧುಗಳದಾರಿಗಾರಿದ್ದರೇನು ||ಪ||

ನೆಗಳ ಕೈಯಲ್ಲಿ ಮಾತಂಗವು ಸಿಕ್ಕಿ ಒದರಲಾಗಿ ಆ
ನೆಗಳೇನ ಮಾಡುತಿರ್ದವಡವಿಯಲ್ಲಿ
ನಗಜೆಯಾಳ್ದನ ಬ್ರಹ್ಮೇತಿ ಬಂದು ಕಡಲಾಗಿ ರುದ್ರಾ
ದಿಗಳೇನ ಮಾಡುತಿರ್ದರಾ ಶೈಲದೊಳಗೆ ||೧||

ದಿಂಡೆಯ ಮಾರ್ಗದಿ ಮಲತಾಯಿ ಮಗನ ಹೊಡೆಯಲು
ಮಂಡಲಪತಿ ಏನ ಮಾಡುತಿರ್ದನು
ಮಿಂಡಿ ಪೆಣ್ಣನು ಸಭೆಯಲಿ ಸೀರೆ ಸುಲಿಯಲು
ಗಂಡರೈವರು ನೋಡಿ ಏನು ಮಾಡುತಿರ್ದರಯ್ಯ ||೨||

ಮೃಗ ಚಕ್ರವರ್ತಿ ಬಹುವರನಾಗಿ ಪೋಗುತ್ತಿರೆ
ಮಿಗೆ ಸತಿಸುತರೇನ ಮಾಡುತಿರ್ದರು
ಮೃಗ ಮಾನವಾಕಾರ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನಲ್ಲದೆ
ಮಿಗು ಬಂಧುಗಳದಾರಿಗಾರಿದ್ದರೇನು ||೩||`;

  const translation = `Chorus: Who else is a true relative to the three worlds other than Sri Hari? Who else is there?

Verse 1: When the elephant (Gajendra) was caught in the crocodile's grip and cried out, what could the other elephants do in the forest? When Brahma and others came to the ocean, what could Rudra (Shiva) do on the mountain?

Verse 2: When the stepmother beat her son in a treacherous way, what could the king of the realm do? When a lecherous man stripped the sari of a woman in the assembly, what could the five husbands (Pandavas) do watching it?

Verse 3: When the lion (king of beasts) walked with great strength, what could his wife and children do? Other than Kaginele Adikeshavaraya, who takes the form of a man-lion (Narasimha), who else is a true relative to the three worlds?`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-34' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-34' }
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
        compositionId: 'kanaka-list-34',
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
