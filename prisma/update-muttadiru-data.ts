import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Muttadiru Ennanu Rangayya (kanaka-list-49)...');

  const lyrics = `ಮುಟ್ಟದಿರೊ ಎನ್ನ ಮುಂಗೈಯ ಸೆಳವಿಗೆ
ಮುತ್ತೆಲ್ಲ ಸಡಲ್ಯಾವೊ ಹೇ ಮುದ್ದುರಂಗ ||ಪ||

ಅತ್ತೆಯೊಬ್ಬಳ ಕೂಡ ಆಡಿ ಬರುವುದ ಕಂಡೆ
ಸತ್ಯವ ಮಾಡದಿರೊ – ಹೇ ಸರಿನಂಟ
ನೂರೆಂಟ ಬಣ್ಣದ ಬಂಟ ಬಿಡು ಎನ್ನ ಗಂಟ ||ಅ.ಪ||

ಹಡೆದವರ ತಲೆಗೆ ಮರಳು ಚೆಲ್ಲಿದಂತೆ
ಮಡದೇರ ಕೂಡ್ಯಾಡಿ – ಕಲಿತ್ಯೆಲ್ಲೊ ಮಿರುಗ
ದಿಮ್ಮದಿರುಗ ಸೊಕ್ಕಿಮುರುಗ ಬಿಡು ಎನ್ನ ಸೆರಗ ||೧||

ಅಂಗೈಯ ನೊರೆಹಾಲು ಮುಂಗೈಯ ಮೇಲುಗಡೆ
ಸಿಂಗಾರವಾದುದ – ಕಂಡೆ ಕಲೆಯ ಕಾಗಿನೆಲೆಯ
ಬಟ್ಟಮೊಲೆಯ ಕನಕಯ್ಯನಿಗೊಲೆಯ ||೨||`;

  const translation = `Chorus: Do not touch my forearm, O lovely Ranga, the pearls on my armlet are getting loose.

Anupallavi: I saw you coming after playing with another woman. Do not swear to the truth, O you who are always with her; O you who have a hundred and eight tricks, leave my garment's knot.

Verse 1: Like scattering sand on the heads of those who gave birth (your parents), you played with others—where did you learn this mischief? O you who are arrogant and stubborn, leave the edge of my saree.

Verse 2: I saw the foam of milk on your palm and forearm, and how it was decorated. O Lord of Kaginele, I saw the beauty, O Kanakayya, the one who wears the garland.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-49' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-49' }
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
        compositionId: 'kanaka-list-49',
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
