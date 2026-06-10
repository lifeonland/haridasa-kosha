import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Nammama Sharade (kanaka-list-3)...');

  const lyrics = `ನಮ್ಮಮ್ಮ ಶಾರದೆ ಉಮಾ ಮಹೇಶ್ವರಿ
ನಿಮ್ಮೊಳಗಿಹನ್ಯಾರಮ್ಮ ||ಪ||

ಕಮ್ಮಗೋಲನ ವೈರಿಸುತನಾದ ಸೊಂಡಿಲ
ಹೆಮ್ಮೈಯ್ಯ ಗಣನಾಥನೆ ಅಮ್ಮಯ್ಯ ||ಅ.ಪ||

ಮೋರೆ ಕಪ್ಪಿನ ಭಾವ ಮೊರದಗಲ ಕಿವಿಯುಳ್ಳ
ಕೋರೆ ದಾಡೆಯವನ್ಯಾರಮ್ಮ
ಮೂರು ಕಣ್ಣನ ಸುತ ಮುರಿದಿಟ್ಟ ಚಂದ್ರನ
ಧೀರ ತಾ ಗಣನಾಥನೆ ಅಮ್ಮಯ್ಯ ||೧||

ಉಟ್ಟ ದಟ್ಟಿಯು ಮತ್ತೆ ಬಿಗಿದುಟ್ಟ ಚಲ್ಲಣದ
ದಿಟ್ಟ ತಾನಿವನ್ಯಾರಮ್ಮ
ಪಟ್ಟದ ರಾಣಿ ಪಾರ್ವತಿಯ ಕುಮಾರ
ಹೊಟ್ಟೆಯ ಗಣನಾಥನೆ ಅಮ್ಮಯ್ಯ ||೨||

ರಾಶಿ ವಿದ್ಯೆಯ ಬಲ್ಲ ರಮಣಿ ಹಂಬಲನೊಲ್ಲ
ಭಾಷಿಗನಿವನ್ಯಾರಮ್ಮ
ಲೇಸಾಗಿ ಸುಜನರ ಸಲಹುವ ನೆಲೆಯಾದಿ
ಕೇಶವನ ದಾಸ ಕಾಣೆ ಅಮ್ಮಯ್ಯ ||೩||`;

  const translation = `Chorus: Oh Mother Sharade, Oh Mother Uma Maheshwari, who is this among You?

Chorus (cont.): Oh Mother, who is this Lord Ganesha, the elephant-faced son of the enemy of Kama (Shiva)?

Verse 1: Who is this one with a dark face, broad ears like a winnowing fan, and protruding tusks? Oh Mother, who is this brave Lord Ganesha, the son of the three-eyed Lord (Shiva) who wears the crescent moon?

Verse 2: Who is this bold one, wearing a tight loincloth and sturdy trousers? Oh Mother, who is this Lord Ganesha, the son of Queen Parvati, with a large belly?

Verse 3: Who is this one, learned in vast knowledge, who does not desire the company of women, and is an eloquent speaker? Oh Mother, he is the servant of Adi Keshava (Kaginele Adikeshava), who graciously protects the virtuous.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-3' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-3' }
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
        compositionId: 'kanaka-list-3',
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
