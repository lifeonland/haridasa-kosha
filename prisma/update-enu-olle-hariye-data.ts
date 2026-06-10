import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Enu Olle Hariye (kanaka-list-53)...');

  const lyrics = `ಏನು ಒಳ್ಳೆ ಹರಿಯೇ ನಿನ್ನ ಸ್ತುತಿಸಿ ಕೇಳುವುದು
ಜ್ಞಾನ ಭಕ್ತಿ ಕೊಡು ಯನಗೆ ಇದೊಂದೆ ದೊಡ್ಡದು ||ಪ||

ಒಂದು ನೆವದಿಂದ ನನ್ನ ಕಾಡಿದವರಿಗೆ
ಹೆಣ್ಣು ಹೊನ್ನು ಗಂಡು ಮಕ್ಕಳು ಆಗಲಿ ಅವರಿಗೆ
ಕಂಡಿ ಕುಂದಿ ಎನ್ನ ಬಾಧೆ ಪಡಿಸಿದವರಿಗೆ
ಕನ್ಯಾದಾನದ ಫಲ ಬಂದು ತಟಾಲಿ ಅವರಿಗೆ ||೧||

ಹಿಂದೆ ನನ್ನ ಬೈದವರೆಲ್ಲ ಚೆಂದಗಿರಲಿ
ಮುಂದೆ ನನ್ನ ಬೈಯುವವರೆಲ್ಲ ಅಂದಾನವರಲಿ
ಕುಂದು ಇಟ್ಟವರೆಲ್ಲ ಕುದುರೆಯ ಕಟ್ಟಿ ಬಾಳಲಿ
ಬಂದು ಒದ್ದವರಿಗೆ ಭತ್ತದ ಗದ್ದೆ ಬೆಳೆಯಲಿ ||೨||

ಜನರೊಳಗೆ ಮಾನಭಂಗ ಮಾಡಿದವರಿಗೆ
ಜೇನು ತುಪ್ಪ ಸಕ್ಕರೆ ಊಟ ಅಗಲಿ ಅವರಿಗೆ
ಹಾನಿ ಬಾರದಂತ ಲೋಕ ಅಗಲಿ ಅವರಿಗೆ
ಮಹಾನುಭಾವ ಮುಕ್ತಿಯ ಕೊಡುವ ನೆಲೆ ಆದಿಕೇಶವ ||೩||`;

  const translation = `Chorus: Oh Hari, what a great thing it is to praise and pray to You! Please grant me knowledge and devotion; this is the only great thing I ask for.

Verse 1: To those who have troubled me for one reason or another, may they be blessed with women, gold, and male children. To those who have constantly caused me pain and suffering, may they receive the merit of performing a Kanya Daana (giving away a daughter in marriage).

Verse 2: May those who have abused me in the past be well. May those who will abuse me in the future also be well. May those who have pointed out my flaws live prosperously, tying horses (a sign of wealth). May those who have come to trouble me have their fields grow abundant paddy.

Verse 3: To those who have humiliated me in front of people, may they be blessed with meals of honey, ghee, and sugar. May they live in a world where no harm comes to them. Oh Kaginele Adikeshava, You are the great one who grants liberation.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-53' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-53' }
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
        compositionId: 'kanaka-list-53',
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
