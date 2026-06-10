import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Varava Kodu Enage (kanaka-list-5)...');

  const lyrics = `ವರವ ಕೊಡು ಎನಗೆ ವಾಗ್ದೇವಿ ನಿನ್ನ
ಚರಣಕಮಲಂಗಳನ ದಯಮಾಡು ದೇವಿ ||ಪ||

ಶಶಿ ಮುಖದ ನಸುನಗೆಯ ಬಾಲೆ
ಎಸೆವ ಕರ್ಣದ ಮುತ್ತಿನೋಲೆ
ನಸುನಗುವ ಸುಲಿಪಲ್ಲ ಗುಣಶೀಲೆ ದೇವಿ
ಬಿಸಜಾಕ್ಷಿ ಎನ್ನ ಹೃದಯದೊಳು ನಿಂದು ||೧||

ಇಂಪು ಸೊಂಪಿನ ಚಂದ್ರಬಿಂಬೆ
ಕೆಂಪು ತುಟಿಗಳ ನಾಸಿಕದ ರಂಭೆ
ಜೋಂಪು ಮದನನ ಪೂರ್ಣಶಕ್ತಿ ಗೊಂಬೆ ಒಳ್ಳೆ
ಸಂಪಿಗೆಯ ಮುಡಿಗಿಟ್ಟು ರಾಜಿಪ ಶಾರದಾಂಬೆ ||೨||

ರವಿಕೋಟಿ ತೇಜಪ್ರಕಾಶೇ ಮಹಾ
ಕವಿಜನರ ಹ್ರಿತ್ಕಮಲ ವಾಸೇ
ಅವಿರಳಪುರಿಯ ಸಿರಿಕಾಗಿನೆಲೆಯಾದಿ ಕೇ
ಶವನ ಸುತನಿಗೆ ಸನ್ನುತ ರಾಣಿವಾಸೆ ||೩||`;

  const translation = `Pallavi: O Goddess of Speech (Vagdevi), please grant me the boon of your lotus feet.

Verse 1: O maiden with a moon-like face and a gentle smile, wearing pearl earrings that shine. O Goddess of virtuous character with a beautiful smile, O lotus-eyed one, please reside in my heart.

Verse 2: O one with the beauty and sweetness of the moon, with red lips and a nose like a Rambha (celestial beauty). O complete power of Manmatha (Cupid), O Sharadamba who shines with a Sampige flower in your hair.

Verse 3: O one who shines with the brilliance of a crore suns, who resides in the lotus hearts of great poets. O queen who is praised by the son of Kesava (referring to the lineage of Madhwacharya), who resides in the eternal city of Kaginele.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-5' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-5' }
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
        compositionId: 'kanaka-list-5',
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
