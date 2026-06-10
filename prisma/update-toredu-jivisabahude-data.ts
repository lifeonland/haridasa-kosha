import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Toredu Jivisabahude (kanaka-list-27)...');

  const lyrics = `ತೊರೆದು ಜೀವಿಸಬಹುದೆ ಹರಿ ನಿನ್ನ ಚರಣವ
ತೊರೆದು ಜೀವಿಸಬಹುದೆ ||ಪ||

ಬರಿದೆ ಮಾತೇಕಿನ್ನು ಅರಿತು ಪೇಳುವೆನಯ್ಯ
ಕರಪಿಡಿದೆನ್ನನು ಕಾಯೊ ಕರುಣಾನಿಧಿ ||ಅ.ಪ||

ತಾಯಿ ತಂದೆಯ ಬಿಟ್ಟು ತಪವ ಮಾಡಲು ಬಹುದು
ದಾಯಾದಿ ಬಂಧುಗಳ ಬಿಡಲು ಬಹುದು
ರಾಯ ಮುನಿದರೆ ರಾಜ್ಯವ ಬಿಡಬಹುದು
ಕಾಯಜಪಿತ ನಿನ್ನಡಿಯ ಬಿಡಲಾಗದು ||೧||

ಒಡಲು ಹಸಿದರೆ ಅನ್ನವ ಬಿಡಬಹುದು
ಪಡೆದ ಕ್ಷೇತ್ರವ ಬಿಟ್ಟು ಹೊರಡಲು ಬಹುದು
ಮಡದಿ ಮಕ್ಕಳ ಕಡೆಗೆ ತೊಲಗಿಸಿಬಿಡಬಹುದು
ಕಡಲೊಡೆಯ ನಿಮ್ಮಡಿಯ ಘಳಿಗೆ ಬಿಡಲಾಗದು ||೨||

ಪ್ರಾಣವ ಪರರಿಗೆ ಬೇಡಿದರೆ ಕೊಡಬಹುದು
ಮಾನಾಭಿಮಾನವ ತಗ್ಗಿಸಬಹುದು
ಪ್ರಾಣದಾಯಕನಾದ ಆದಿಕೇಶವರಾಯ
ಜಾಣ ಶ್ರೀಕೃಷ್ಣ ನಿನ್ನಡಿಯ ಬಿಡಲಾಗದು ||೩||`;

  const translation = `Chorus: Can I live by abandoning Your feet, O Hari? Can I live by abandoning (them)?

Anupallavi: Why speak empty words? I speak after realizing the truth. O Ocean of Mercy, please hold my hand and protect me.

Verse 1: One may leave mother and father to perform penance. One may leave relatives and kinsmen. If a king is angry, one may even leave the kingdom. But O Father of Manmatha (Kama), I cannot leave Your feet.

Verse 2: If the body is hungry, one may give up food. One may leave the place where one was born and set out. One may even cast aside wife and children. But O Lord of the Ocean, I cannot leave Your feet even for a moment.

Verse 3: If someone asks for my life, I may give it. I may lower my pride and self-respect. O Adikeshavaraya, the Giver of Life, O Clever Sri Krishna, I cannot leave Your feet.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-27' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-27' }
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
        compositionId: 'kanaka-list-27',
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
