import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Ni Mayeyolago (kanaka-list-17)...');

  const lyrics = `ನೀ ಮಾಯೆಯೊಳಗೊ ನಿನ್ನೊಳು ಮಾಯೆಯೊ
ನೀ ದೇಹದೊಳಗೊ ನಿನ್ನೊಳು ದೇಹವೊ ||ಪ||

ಬಯಲುಲೊಳಗೆ ಆಲಯವೊ ಆಲಯದೊಳಗೆ ಬಯಲೊ
ಬಯಲು ಆಲಯವೆರಡು ನಯನದೊಳಗೊ
ನಯನ ಬುದ್ಧಿಯ ಒಳಗೊ ಬುದ್ಧಿ ನಯನದೊಳಗೊ
ನಯನ ಬುದ್ಧಿಗಳೆರಡು ನಿನ್ನೊಳಗೊ ಹರಿಯೆ ||೧||

ಸವಿಯು ಸಕ್ಕರೆಯೊಳಗೊ ಸಕ್ಕರೆಯು ಸವಿಯೊಳಗೊ
ಸವಿಯು ಸಕ್ಕರೆಗಳೆರಡು ಜಿಹ್ವೆಯೊಳಗೊ
ಜಿಹ್ವೆ ಮನಸಿನ ಒಳಗೊ ಮನಸು ಜಿಹ್ವೆಯ ಒಳಗೊ
ಜಿಹ್ವೆ ಮನಸುಗಳೆರಡು ನಿನ್ನೊಳಗೊ ಹರಿಯೆ ||೨||

ಕುಸುಮದಲಿ ಗಂಧವೊ ಗಂಧದಲಿ ಕುಸುಮವೊ
ಕುಸುಮಗಂಧಗಳೆರಡು ಆಘ್ರಾಣದೊಳಗೊ
ಅಸಮಭವ ಕಾಗಿನೆಲೆಯಾದಿ ಕೇಶವರಾಯ
ಉಸುರಲೆನ್ನಳವಲ್ಲ ಎಲ್ಲ ನಿನ್ನೊಳಗೊ ಹರಿಯೆ ||೩||`;

  const translation = `Chorus: Are You within the Maya (illusion), or is the Maya within You? Are You within the body, or is the body within You?

Verse 1: Is the open space within the temple, or is the temple within the open space? Both the open space and the temple are within the eyes. Are the eyes within the intellect, or is the intellect within the eyes? Both the eyes and the intellect are within You, O Hari.

Verse 2: Is the sweetness within the sugar, or is the sugar within the sweetness? Both the sweetness and the sugar are within the tongue. Is the tongue within the mind, or is the mind within the tongue? Both the tongue and the mind are within You, O Hari.

Verse 3: Is the fragrance within the flower, or is the flower within the fragrance? Both the flower and the fragrance are within the sense of smell. O Kaginele Adi Keshavaraya, the incomparable One, it is beyond my ability to describe; everything is within You, O Hari.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-17' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-17' }
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
        compositionId: 'kanaka-list-17',
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
