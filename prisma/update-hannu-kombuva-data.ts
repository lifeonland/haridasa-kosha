import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Hannu Kombuva Banniri Haridasaru (kanaka-list-37)...');

  const lyrics = `ಹಣ್ಣು ಕೊಂಬುವ ಬನ್ನಿರಿ ಹರಿದಾಸರು
ಚೆನ್ನ ಬಾಲಕೃಷ್ಣನೆಂಬ ಕನ್ನೆಗೊನೆಬಾಳೆಹಣ್ಣು ||ಪ||

ಸುತ್ತೇಳು ಲೋಕದಿ ಸುರರು ಬಿತ್ತಿದ ಹಣ್ಣು
ಭಕ್ತರ ಬಾಯೊಳು ನೆನೆವ ಹಣ್ಣು
ಅರ್ತಿಯುಳ್ಳವರೆಲ್ಲ ಕೊಳ್ಳಿ ಬೇಕಾದರೆ
ನಿತ್ಯ ಮಾಧವನೆಂಬ ಅಚ್ಚಮಾವಿನ ಹಣ್ಣು ||೧||

ಅಜನ ಪಡೆದ ಹಣ್ಣು ಗಜವ ಕಾಯ್ದ ಹಣ್ಣು
ನಿಜಮುನಿಗಳಿಗೆ ತೋರಿಸಿದ ಹಣ್ಣು
ತ್ರಿಜಗವಂದಿತ ಪಾಲ್ಗಡಲೊಡೆಯನೆ ಹಣ್ಣು
ಸುಜನಭಕ್ತರೆಲ್ಲ ಕೊಳ್ಳಬನ್ನಿರಿ ಹಣ್ಣು ||೨||

ತುರುವ ಕಾಯ್ದ ಹಣ್ಣು ತುರಗನ ತುಳಿದಾ ಹಣ್ಣು
ಕರೆದರೆ ಕಂಬದೊಳು ಓಯೆಂಬ ಹಣ್ಣು
ಮರುಗುವ ಧ್ರುವನಿಗೆ ಪಟ್ಟಗಟ್ಟಿದ ಹಣ್ಣು
ಕರುಣಾಳು ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ ಹಣ್ಣು ||೩||`;

  const translation = `Pallavi: Come, O Haridasas, to buy the fruit. The fruit is the beautiful child Krishna, like a bunch of bananas.

Verse 1: It is the fruit sown by the Devas in the seven worlds, the fruit that devotees cherish in their mouths. If those who have devotion want to buy it, it is the pure mango fruit called the eternal Madhava.

Verse 2: The fruit that gave birth to Aja (Brahma), the fruit that protected the elephant (Gajendra), the fruit that was shown to the true sages. The fruit is the Lord of the Milky Ocean, worshipped by the three worlds. O good devotees, all come and buy this fruit.

Verse 3: The fruit that protected the cows, the fruit that trampled the horse (demon), the fruit that says "O" (responds) when called from the pillar. The fruit that crowned the grieving Dhruva, the fruit is the compassionate Kaginele Adi Keshava.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-37' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-37' }
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
        compositionId: 'kanaka-list-37',
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
