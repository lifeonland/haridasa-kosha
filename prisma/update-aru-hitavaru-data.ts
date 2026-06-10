import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Aaru Hitavaru Endu Nambabeda (kanaka-list-39)...');

  const lyrics = `ಆರು ಹಿತವರು ಎಂದು ನಂಬಬೇಡ
ಯಾರಿಗ್ಯಾರಿಲ್ಲ ಆಪತ್ತು ಬಂದೊದಗಿದಡೆ ||ಪ||

ಜನಕ ಹಿತದವನೆಂದು ನಂಬಬಹುದೇ ಹಿಂದೆ
ತನಯ ಪ್ರಹ್ಲಾದನಿಗೆ ಪಿತ ಮುನಿದನು
ಜನನಿಯೇ ರಕ್ಷಿಪಳೆಂತೆಂಬೆನೆ ಅ ಕುಂತಿ
ತನಯ ರಾಧೇಯನಿಗೆ ಎರಡೆಣಿಸಿದ ಮೇಲೆ ||೧||

ಮಗನು ತೆತ್ತಿಗನೆನಲು ಕಂಸ ತನ್ನಯ ಪಿತನ
ವಿಗಡ ಬಂಧನದಿಂದ ಬಂಧಿಸಿದನು
ಜಗವರಿಯೇ ಸೋದರನು ಮಮತೆಯುಳ್ಳವನೆನಲು
ಹಗೆವರಸಿ ವಾಲಿಯನು ಅನುಜ ಕೊಲಿಸಿದ ಮೇಲೆ ||೨||

ತನಗೆ ದೇಹಾನುಬಂಧುಗಳೇ ಬಂಧುಗಳೆಂದು
ಮನದಿ ನಿಶ್ಚಯವಾಗಿ ನಂಬಬೇಡ
ಘನಕೃಪಾನಿಧಿ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ
ಅನುದಿನ ನಂಬಿದವಗಿಹಪರದಿ ಸುಖವು ||೩||`;

  const translation = `Chorus: Do not trust anyone thinking they are your well-wishers. When trouble strikes, there is no one for anyone.

Verse 1: Can one trust that a father is a well-wisher? In the past, the father (Hiranyakashipu) turned against his own son, Prahlada. Can one say that a mother will protect? Consider Kunti, who turned against her own son, Radheya (Karna).

Verse 2: When his son (Kamsa) became powerful, he imprisoned his own father. The world knows this. When one thinks a brother is full of affection, consider how the younger brother (Sugriva) had the enemy (Rama) kill the brother (Vali).

Verse 3: Do not firmly believe in your mind that those related to your body are your true relatives. Always trust the ocean of mercy, Kaginele Adi Keshava; those who trust Him daily will find happiness in this world and the next.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-39' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-39' }
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
        compositionId: 'kanaka-list-39',
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
