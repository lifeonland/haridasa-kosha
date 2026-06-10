import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Tallaanisadiru (kanaka-list-10)...');

  const lyrics = `ತಲ್ಲಣಿಸದಿರು ಕಂಡ್ಯ ತಾಳು ಮನವೇ
ಎಲ್ಲರನು ಸಲಹುವನು ಇದಕೆ ಸಂಶಯ ಬೇಡ ।।ಪ।।

ಬೆಟ್ಟದ ತುದಿಯಲ್ಲಿ ಹುಟ್ಟಿದ ವೃಕ್ಷಕ್ಕೆ
ಕಟ್ಟೆಯನು ಕಟ್ಟಿ ನೀರೆರೆದವರು ಯಾರು
ಹುಟ್ಟಿಸಿದ ಸ್ವಾಮಿ ತಾ ಹೊಣೆಗಾರನಾಗಿರಲು
ಗಟ್ಯಾಗಿ ಸಲಹುವನು ಇದಕೆ ಸಂಶಯವಿಲ್ಲ ।।೧।।

ಅಡವಿಯೊಳಗೆ ಮೃಗ ಪಕ್ಷಿಗಳಿಗೆಲ್ಲ
ಅಡಿಗಡಿಗೆ ಆಹಾರವಿತ್ತವರು ಯಾರೊ
ಪಡೆದ ಜನನಿಯ ತೆರದಿ ಸ್ವಾಮಿ ಹೊಣೆಗೀಡಾಗಿ
ಬಿಡದೆ ರಕ್ಷಿಪನು ಇದಕೆ ಸಂಶಯವಿಲ್ಲ ।।೨।।

ನವಿಲಿಗೆ ಚಿತ್ರ ಬರೆದವರು ಯಾರು
ಪವಳದ ಲತೆಗೆ ಕೆಂಪಿಟ್ಟವರು ಯಾರು
ಸವಿಮಾತಿನರಗಿಳಿಗೆ ಹಸುರು ಬರೆದವರು ಯಾರು
ಅವನೇ ಸಲಹುವನು ಇದಕೆ ಸಂಶಯವಿಲ್ಲ ।।೩।।

ಕಲ್ಲಿನಲ್ಲಿ ಹುಟ್ಟಿ ಕೂಗುವ ಕಪ್ಪೆಗಳಿಗೆಲ್ಲ
ಅಲ್ಲಲ್ಲಿಗಾಹಾರವನ್ನು ತಂದಿತ್ತವರು ಯಾರು
ಬಲ್ಲಿದನು ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವರಾಯ
ಎಲ್ಲರನು ಸಲಹುವನು ಇದಕೆ ಸಂಶಯವಿಲ್ಲ ।।೪।।`;

  const translation = `Pallavi: Do not be anxious, O mind, have patience. He who sustains everyone will surely protect you; have no doubt about this.

Verse 1: Who built a platform and poured water for the tree that grew on the peak of the mountain? Since the Lord who created it is responsible for it, He will surely sustain it; there is no doubt about this.

Verse 2: Who provides food at every step for the animals and birds in the forest? Like a mother who has given birth, the Lord takes responsibility and protects them without fail; there is no doubt about this.

Verse 3: Who painted the patterns on the peacock? Who gave the red color to the coral creeper? Who painted the green color on the sweet-talking parrot? He alone sustains them; there is no doubt about this.

Verse 4: Who brings food to the frogs that are born and croak in the rocks? The omnipotent Lord of Kaginele, Adikeshava, sustains everyone; there is no doubt about this.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-10' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-10' }
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
        compositionId: 'kanaka-list-10',
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
