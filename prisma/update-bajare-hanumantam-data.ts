import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Bajare Hanumantam (kanaka-list-70)...');

  const lyrics = `ಭಜರೇ ಹನುಮಂತಂ ಮಾನಸ
ಭಜರೇ ಹನುಮಂತಂ
ಕೋಮಲ ಕಾಯಂ, ನಾಮಸುದೇವಂ
ಭಜಸುಖ ಸಿಂಹಂ, ಭೂಸುರ ಶ್ರೇಷ್ಠಂ ||೧||

ಮೂರ್ಖ ನಿಶಾಚರ ವನಸಂಹಾರಂ
ಸೀತಾ ದು:ಖವಿನಾಶನ ಕಾರಂ ||೨||

ಪರಮಾನಂದ ಗುಣೋದಯ ಚರಿತಂ
ಕರುಣಾರಸ ಸಂಪೂರ್ಣಸುಭರಿತಂ ||೩||

ರಂಗ ರಂಗ ಗುಣ ಗಂಭೀರಂ
ದಾನವ ದೈತ್ಯಾರಣ್ಯ ಕುಠಾರಂ ||೪||

ಗುರು ಚೆನ್ನಕೇಶವ ಕದಳೀ ರಂಗಂ
ಸ್ಥಿರ ಸದ್ಭಕ್ತಾ ಮುಖ್ಯ ಪ್ರಾಣಂ ||೫||`;

  const translation = `Verse 1: Oh mind, worship Hanuman. Worship Hanuman. He has a tender body, his name is like nectar, he is the lion of joy for those who worship him, and the best among the wise (Brahmins).

Verse 2: He is the destroyer of the foolish demons (Nishacharas) in the forest. He is the cause of destroying the sorrow of Sita.

Verse 3: His story is a rising sun of supreme bliss and virtuous qualities. He is completely filled with the essence of compassion.

Verse 4: He is Ranga, Ranga, deep in virtuous qualities. He is like an axe to the forest of demons and evil beings.

Verse 5: He is the Guru, the beautiful Keshava (Cennakeshava) in the Kadali grove. He is the firm, true devotee and the Mukhya Prana (Life-breath).`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-70' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-70' }
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
        compositionId: 'kanaka-list-70',
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
