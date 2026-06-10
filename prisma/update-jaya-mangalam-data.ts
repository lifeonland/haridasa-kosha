import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Jaya Mangalam (kanaka-list-65)...');

  const lyrics = `ಜಯಮಂಗಲಂ ನಿತ್ಯ ಶುಭಮಂಗಲಂ ||ಪ||

ವಾತಜಾತನು ಆಗಿ ಖ್ಯಾತಿಯಲಿ ಮೆರೆದಗೆ
ಸೇತುವೆಯ ಭರದಿಂದ ಲಂಘಿಸಿದಗೆ
ಸೀತೆಯನು ವಂದಿಸುತೆ ಉಂಗುರವನಿತ್ತವಗೆ
ದೈತ್ಯಪುರವನು ಭರದಲುರಿಸಿದವಗೆ ||೧||

ವಸುಧೆಯಲಿ ಕುಂತಿನಂದನನಾಗಿ ಉದಿಸಿದಗೆ
ಕುಸುಮವನು ತಂದು ದ್ರೌಪದಿಗಿತ್ತಗೆ
ಕುಶಲತನದಲಿ ಕೌರವಾದಿಗಳ ಸಂಹರಿಸಿದ
ಸಹಾಯ ವೀರ ಶ್ರೀ ಭೀಮಸೇನಗೆ ||೨||

ಮಧ್ಯಗೃಹದಾತನಾ ಸತಿಯಲ್ಲಿ ಉದಿಸಿದಗೆ
ಬೌದ್ಧ ಚಾರ್ವಾಕ ಮಾಯ್ಗಳ ಜರಿದಗೆ
ಮಧ್ವಶಾಸ್ತ್ರವನೆಲ್ಲ ಸಜ್ಜನರಿಗೊರೆದಗೆ
ಮುದ್ದು ಶ್ರೀಆದಿಕೇಶವನ ಭಜಕಗೆ ||೩||`;

  const translation = `Chorus: May there be victory, may there be eternal auspiciousness.

Verse 1: Victory to Him who was born of the Wind (Vayu), who shined in fame, who crossed the sea with speed to build the bridge. Victory to Him who bowed to Sita, gave her the ring, and burned the city of the demons with force.

Verse 2: Victory to Him who was born as the son of Kunti on this earth, who brought the flower (Saugandhika) and gave it to Draupadi. Victory to the brave Bhimasena who skillfully destroyed the Kauravas and assisted the Pandavas.

Verse 3: Victory to Him who was born to the wife of Madhyageha (Madhvacharya), who criticized the Bauddha and Charvaka illusions. Victory to Him who taught the entire Madhva Shastra to the virtuous, and who is the devotee of the beautiful Lord Adi Keshava.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-65' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-65' }
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
        compositionId: 'kanaka-list-65',
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
