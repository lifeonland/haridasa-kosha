import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Kokoko Enniro (kanaka-list-51)...');

  const lyrics = `ಕೊಕೊಕೋ ಎನ್ನಿರೊ ಕುಂಭಿನಿಯವರೆಲ್ಲ
ಕೊಕೊಕೋ ಎನ್ನಿರೊ – ನಮ್ಮ
ಗೋಕುಲದೊಳಗೊಬ್ಬ ಕಳ್ಳ ಬರುತಾನೆಂದು
ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||ಪ||

ಹೊದ್ದಿ ಮೊಲೆಯನುಂಡವಳಸುವನೆ ಕೊಂದ
ಮುದ್ದುಗಾರ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ಕದ್ದುಕೊಂಡೊಯ್ವ ರಕ್ಕಸರನೆಲ್ಲರ ಕಾಲ
ಲೊದ್ದೊರಸಿದ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೧||

ಹದ್ದು ಹಗೆಯ ಹಾಸಿಗೆಯ ಮೇಲೊರಗಿದ
ಮುದ್ದುಗಾರ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ಅರ್ಧದೇಹನ ಕೈಯ ತಲೆಯ ಕಪಟದಿಂದ
ಕದ್ದು ಬಿಸುಟ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೨||

ಕೆಂಜಾಜಿಯ ಮಣಿ ಮಲ್ಲಿಗೆ ದಂಡೆಯರಂಜೆ ಕದ್ದ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ಗುಂಜಿಯ ದಂಡೆಯ ಕಲ್ಲಿಯ ಚೀಲದ
ಮಂಜು ಮೈಯ್ಯ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೩||

ಅಂಜದೆ ಗೊಲ್ಲರ ಹಳ್ಳಿಯೊಳಗೆ ಹಾಲನೆಂಜಲಿಸಿದ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ಸಂಜೆ ಬೈಗಿನಲ್ಲಿ ಕರೆಯುವ ಸತಿಯರ
ಅಂಜಿಸಿದ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೪||

ಕೇಸರಿ ಎಂಬ ರಕ್ಕಸರನೆಲ್ಲರ ಕೊಂದ
ವೇಷಧಾರಿ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ಮೋಸದಿ ಬಲಿಯ ದಾನವ ಬೇಡಿ ಅನುದಿನ
ಬೇಸರಿಸಿದ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೫||

ಮೀಸಲ ಅನ್ನವ ಕೂಸಾಗಿ ಸವಿದುಂಡ
ವೇಷಧಾರಿ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ಸಾಸಿರ ನಾಮಕ್ಕೆ ಹೆಸರಾದ ಚಪ್ಪನ್ನ
ದೇಶದ ದಾರಿಗಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೬||

ಆಕಳೊಳಾಡಿ ಪರಲೋಕಕೆ ನಡೆದಂಥ
ಆಕೆವಾಳ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ಭೂಕಾಂತೆಯ ಸೊಸೆಯರನೆತ್ತೆ ಬಲುಹಿಂದನೂಕಿ ತಂದ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೭||

ಗೋಕುಲದೊಳು ಪುಟ್ಟಿ ಗೊಲ್ಲರೆಲ್ಲರ ಕೈಲಿ
ಸಾಕಿಸಿಕೊಂಡ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ಸಾಕಾರನಾಗಿ ಈ ಲೋಕವನೆಲ್ಲವ
ಆಕ್ರಮಿಸಿದ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೮||

ಕ್ಷೀರವಾರಿಧಿ ವೈಕುಂಠನಗರಿಯನು
ಸೇರಿಸಿದ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ದ್ವಾರಾವತಿಯನು ನೀರೊಳು ಬಚ್ಚಿಟ್ಟ
ಊರುಗಳ್ಳ ಬಂದ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೯||

ದ್ವಾರಕೆಯಾಳುವ ಉಭಯದಾಸರ ತನ್ನ
ಊರಿಗೊಯ್ದ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ
ಕಾರಣಾತ್ಮಕ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ
ಕ್ಷೀರ ಬೆಣ್ಣೆಯ ಕಳ್ಳ ಕೊಕೊಕೋ ಎನ್ನಿರೊ ||೧೦||`;

  const translation = `Chorus: Oh people of the earth, say "Kokoko" (a sound to drive away a thief). Say "Kokoko," for a thief is coming into our Gokula.

Verse 1: He is the charming thief who killed the one (Putana) who fed him milk. He is the thief who kicked and destroyed all the demons who came to steal.

Verse 2: He is the charming thief who rested on the bed of the enemy (the serpent). He is the thief who, through trickery, cut off the head of the one who had half a body (Rahu).

Verse 3: He is the thief who stole the garlands of red jasmine and jasmine flowers. He is the thief with a soft body, wearing a garland of gunji seeds and carrying a stone bag.

Verse 4: He is the thief who, without fear, drank the milk in the village of the cowherds and made it his own. He is the thief who frightened the women who called out in the evening.

Verse 5: He is the thief in disguise who killed all the demons named Kesari. He is the thief who, by trickery, begged for the gift of Bali and troubled him every day.

Verse 6: He is the thief in disguise who, as a child, ate the reserved food. He is the thief who travels the paths of the fifty-six lands, known by a thousand names.

Verse 7: He is the thief who played among the cows and walked to the other world. He is the thief who brought the daughters-in-law of the Earth Goddess from far away.

Verse 8: He is the thief who was born in Gokula and was raised by the hands of all the cowherds. He is the thief who, taking a form, occupied this entire world.

Verse 9: He is the thief who brought the city of Vaikuntha, the ocean of milk, to himself. He is the thief who hid Dwaravati in the water and came as a thief of cities.

Verse 10: He is the thief who took the two servants who rule Dwaraka to his own city. He is the thief of milk and butter, the Kaginele Adi Keshava, who is the cause of all.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-51' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-51' }
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
        compositionId: 'kanaka-list-51',
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
