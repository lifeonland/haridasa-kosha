import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Beda Beda Elele (kanaka-list-60)...');

  const lyrics = `ಬೇಡ ಬೇಡ ಎಲೆಲೆ ದುರಿತಗಳಿರಾ ನಮ್ಮ
ಬಾಡದಾಧಿಪನ ಕಿಂಕರನ ಕೂಡ ತೊಡರು ||ಪ||

ವಾರಿಕಲ್ಲಾನೆ ವಜ್ರದ ಮೃಗೇಂದ್ರನ ಕೂಡೆ
ಹೋರಿ ಹೊದುಕುಳಿಗೊಂಡು ಗೆಲಬಲ್ಲುದೆ
ಭೂರಿ ಭೂತಗಳೆ ಭೂಸತಿಯ ಕಾಂತನ ನಾಮ
ಧಾರಿಗಳ ತೊಡರು ನಿಮಗಳವಡದು ನಾನರಿವೆ ||೧||

ಮೇಣದಹಿಕೋಟಿ ದಳ್ಳುರಿಯ ಗರುಡನ ಕೂಡ
ಪ್ರಾಣದಿಂ ಕಾದಿ ಜಯಿಸುವುದೆ ಹೇಳಾ
ಕ್ಷೋಣಿಯೊಳು ಕ್ಷೀಣದೈವ ಬ್ರಹ್ಮಾಂಡ ಕೋಟಿಗಳು
ದಾನವಾರಿಯ ದಾಸಗಳವಡವು ನಾನರಿವೆ ||೨||

ಹುಲಿಯ ಮೀಸೆಯ ಪಾಶವಿಡಿದು ಗೋವತ್ಸಗಳು
ನಲಿದು ಉಯ್ಯಾಲೆಯನಾಡುವವೆ ಹೇಳಾ
ಕಲಿ ಬಾಡದಾದಿಕೇಶವರಾಯ ಚಕ್ರದಲಿ
ತಲೆಗಳನು ಚೆಂಡಾಡಿಸುವ ಕಾಣೊ ಬೇಡ ||೩||`;

  const translation = `Chorus: O sins, do not bother us! Do not clash with the servant of the eternal Lord.

Verse 1: Can a mere bull fight and win against a lion made of diamond? O beings, I know that you cannot stand against those who bear the name of the Lord (the husband of Bhusathi/Bhudevi).

Verse 2: Tell me, can you win a fight against Garuda, who is like a blazing fire? I know that millions of universes and lesser gods cannot stand against the servants of the enemy of demons (Vishnu).

Verse 3: Tell me, can calves dance happily in a swing, holding onto the whiskers of a tiger? Behold the brave Adi Keshava of Baada (Kaginele), who plays with heads like balls using His discus; do not clash with Him.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-60' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-60' }
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
        compositionId: 'kanaka-list-60',
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
