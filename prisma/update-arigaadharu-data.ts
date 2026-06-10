import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Arigaadharu Purva (kanaka-list-55)...');

  const lyrics = `ಆರಿಗಾದರೂ ಪೂರ್ವ ಕರ್ಮ ಬಿಡದು, ಅಜ
ಹರ ಸುರ ಮುನಿಗಳ ಕಾಡುತಿಹುದು ||ಪ||

ವೀರ ಭೈರವನಂತೆ ತಾನು ಬತ್ತಲೆಯಂತೆ
ಮಾರಿ ಮಸಣಿಗಳಂತೆ ಕೂಳನ್ನು ತಿಂಬರಂತೆ
ಸೂರ್ಯ ಚಂದ್ರಮರಂತೆ ರಾಹುವಟ್ಟುಳಿಯಂತೆ
ಮೂರೆರಡು ತಲೆ ಹರಗೆ ಕೈಯೊಳು ಕರ್ಪರವಂತೆ ||೧||

ಶಿಷ್ಟ ಹರಿಶ್ಚಂದ್ರಗೆ ಮಸಣದಡಿಗೆಯು ಅಂತೆ
ಸೃಷ್ಟಿಸುವ ಬೊಮ್ಮನಿಗೆ ಶಿರವು ತಾ ಹೋಯಿತಂತೆ
ಅಷ್ಟ ದಿಕ್ಪಾಲಕರು ಸೆರೆಯಾಗಿರುವರಂತೆ
ಕಟ್ಟುಗ್ರದಿಂದ ಇಂದ್ರನಿಗೆ ಮೈಯೆಲ್ಲ ಕಣ್ಣಂತೆ ||೨||

ಹನ್ನೊಂದಕ್ಷೋಹಿಣಿ ಬಲವುಳ್ಳ ಕೌರವನು
ರಣದೊಳಗೆ ತೊಡೆ ಮುರಿದು ಬಿದ್ದು ತಾನಿಹನಂತೆ
ವನಜಾಕ್ಷ ಸಿರಿಯರಸ ಬಲಿಯ ಬೇಡಿದನಂತೆ
ವನಿತೆ ಆ ಧರ್ಮಜನ ತಾಯಿ ತಿರಿದುಂಬಳಂತೆ ||೩||

ಧರೆಗೆ ಧರ್ಮಜನಂತೆ ಕಂಕ ಭಟ್ಟನು ಅಂತೆ
ಶೂರ ಭೀಮನು ತಾನು ಬಾಣಸಿಗನಾದಂತೆ
ವೀರ ಫಲುಗುಣನಂತೆ ಕೈಯೊಳಗೆ ಬಳೆಯಂತೆ
ಕಿರಿ ನಕುಲ ಸಹದೇವ ತುರುಗಳನು ಕಾಯ್ದರಂತೆ ||೪||

ಹರನ ವಾಹನವಂತೆ ಹುಲ್ಲು ಹೊರುವನಂತೆ
ವಿರಿಂಚಿ ವಾಹನವಂತೆ ಕಮಲ ಭಕ್ಷಿಪನಂತೆ
ಹರಿಯ ಹೊತ್ತಿಹನಂತೆ ಹಾವು ಭಕ್ಷಿಪನಂತೆ
ನೆರೆಯಾದಿಕೇಶವನು ತಾ ಬೆಣ್ಣೆಗಳ್ಳನಂತೆ ||೫||`;

  const translation = `Chorus: Karma from previous births does not spare anyone; it plagues even Brahma, Shiva, and other celestials and sages.

Verse 1: Shiva wanders like a brave Bhairava, naked; eats food like those who dwell in cremation grounds. Sun and Moon are swallowed by Rahu. Shiva, with his six heads, holds a skull in his hand.

Verse 2: Harishchandra, the virtuous, had to serve in a cremation ground. Brahma, the creator, lost a head. The guardians of the eight directions were imprisoned. Indra was cursed with eyes all over his body.

Verse 3: The Kaurava, who had an army of eleven Akshauhinis, broke his thigh and fell on the battlefield. Vishnu (Lord of Lakshmi) begged for land from Bali. The mother of the virtuous Dharmaraya had to beg for food.

Verse 4: Dharmaraya had to serve as a counselor named Kanka Bhatta. The brave Bhima became a cook. Arjuna (Phalguna) had to wear bangles on his arms. The younger ones, Nakula and Sahadeva, had to guard the cattle.

Verse 5: Shiva’s vehicle (Nandi) has to carry grass. Brahma’s vehicle (the swan) eats lotuses. Vishnu’s vehicle (Garuda) eats snakes. And finally, the Lord of Kaginele, Adi Keshava, is a butter thief.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-55' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-55' }
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
        compositionId: 'kanaka-list-55',
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
