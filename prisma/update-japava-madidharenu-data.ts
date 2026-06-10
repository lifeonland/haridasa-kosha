import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Japava Madidharenu (kanaka-list-59)...');

  const lyrics = `ಜಪವ ಮಾಡಿದರೇನು ತಪವ ಮಾಡಿದರೇನು
ವಿಪರೀತ ಕಪಟಗುಣ ಕಲುಷವಿದ್ದವರು ||ಪ||

ಆದಿಗುರುವರಿಯದೆ ಅತ್ತಲಿತ್ತಲು ತೊಳಲಿ
ವೇದಶಾಸ್ತ್ರವನೋದಿ ಬಾಯಾರಲು
ಹಾದಿಯನು ಕಾಣದಂತಿರುತಿರ್ದು ಹಲವೆಂಟು
ವಾದ ತರ್ಕದೊಳಿದ್ದ ಭೇದವಾದಿಗಳು ||೧||

ನುಡಿ ನಡೆವ ಕಾಲದಲಿ ದಾನ ಮಾಡದೆ ಇರಲು
ಅಡವಿಯೊಳು ಕೆರೆ ತುಂಬಿ ಬತ್ತಿದಂತೆ
ಮಡದಿ ಮಕ್ಕಳಿಗೆಂದು ಒಡವೆ ವಸ್ತ್ರವ ಗಳಿಸೆ
ಹಿಡಿಯಲಾ ಯಮನವರ ಕಟ್ಟಿಗೊಳಗಾಗಿ ||೨||

ಚಳಿಮಳೆಯ ಅತಿ ಕಾರುಗತ್ತಲೆಯೊಳಗೆ ಎದ್ದು
ಹೊಳೆಯೊಳಗೆ ಮುಳುಗಿ ಜಪ ತಪವ ಮಾಡಿ
ಕಳವಳಿಸಿ ನೂರೆಂಟು ಹಲುಬಿ ಬಳಲಲು ಬೇಡ
ನಳಿನಾಕ್ಷ ಆದಿಕೇಶವನ ನೆನೆ ಮನವೆ ||೩||`;

  const translation = `Chorus: What is the use of performing Japa or Tapa if one possesses excessive deceitful qualities and impurities?

Verse 1: Without knowing the true Guru, they wander here and there, and dry their throats reading the Vedas and Shastras. Like those who cannot find the right path, they are merely dualists (Bhedavadis) trapped in various debates and arguments.

Verse 2: If one does not perform charity in words and deeds, it is like filling a pond in a forest that eventually dries up. If one earns wealth and clothes only for their wife and children, they will be caught and tied by Yama (the God of Death).

Verse 3: There is no need to get up in the bitter cold, rain, or deep darkness to bathe in the river and perform Japa or Tapa. Oh mind, do not tire yourself by lamenting and worrying about a hundred things; instead, remember the lotus-eyed Lord, Adi Keshava.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-59' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-59' }
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
        compositionId: 'kanaka-list-59',
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
