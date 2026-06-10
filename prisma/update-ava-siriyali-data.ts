import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Ava Siriyali (kanaka-list-18)...');

  const lyrics = `ಆವ ಸಿರಿಯಲಿ ನೀನು ಎನ್ನ ಮರೆತೆ ?
ದೇವ ಜಾನಕಿರಮಣ ಪೇಳು ರಘುಪತಿಯೆ ? ||ಪ||

ಸುರರ ಸೆರೆಯನು ಬಿಡಿಸಿ ಬಂದನೆಂಬಾ ಸಿರಿಯೆ
ಕರಿ ಮೊರೆಯ ಲಾಲಿಸಿದೆನೆಂಬ ಸಿರಿಯೆ ?
ಶರಧಿ ಸೇತುವೆಯ ಕಟ್ಟಿದೆನೆನ್ನುವಾ ಸಿರಿಯೆ
ಸ್ಥಿರವಾಗಿ ಹೇಳೆನಗೆ ಹೇಳು ರಘುಪತಿಯೆ ||೧||

ಕಡಲೊಳಗೆ ಮನೆ ಮಾಡಿ ಮಲಗಿದೆನೆಂಬಾ ಸಿರಿಯೆ
ಮೃಡ ನಿನ್ನ ಸಖನಾದನೆಂಬ ಸಿರಿಯೆ ?
ಬಿಡದೆ ದ್ರೌಪದಿ ಮಾನ ಕಾಯ್ದನೆಂಬ ಸಿರಿಯೆ
ದೃಢವಾಗಿ ಹೇಳೆನಗೆ ದೇವಕೀಸುತನೆ ||೨||

ಭೂಮಿಯನು ಮೂರಡಿಯ ಮಾಡಿದೆನೆಂಬ ಸಿರಿಯೆ
ಕಾಮ ನಿನ್ನ ಸುತನಾದನೆಂಬ ಸಿರಿಯೆ
ಆ ಮಹಾಲಕುಮಿ ನಿನ್ನ ಸತಿಯಾದಳೆಂಬ ಸಿರಿಯೆ
ಪ್ರೇಮದಲಿ ಹೇಳೆನಗೆ ಸ್ವಾಮಿ ಅಚ್ಯುತನೆ ||೩||

ಮನುಜರೆಲ್ಲರು ನಿನ್ನ ಸ್ತುತಿಸುವರೆಂಬ ಸಿರಿಯೆ
ಹನುಮ ನಿನ್ನ ಬಂಟನಾದೆನೆಂಬ ಸಿರಿಯೆ
ಬಿನುಗುದೈವಗಳು ನಿನಗೆಣೆಯಿಲ್ಲವೆಂಬ ಸಿರಿಯೆ
ಅನುಮಾನ ಮಾಡದೆ ಪೇಳೋ ನರಹರಿಯೆ ||೪||

ಇಂತು ಸಿರಿಯಲಿ ನೀನು ಎನ್ನ ಮರೆತರೆ ಸ್ವಾಮಿ
ಪಂಥವೇ ನಿನಗಿದು ಆವಾ ನಡತೆ
ಕಂತುಪಿತ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ ರಂಗ
ಚಿಂತೆಯನು ಬಿಡಿಸಿ ಸಂತೋಷಪಡಿಸೊ ||೫||`;

  const translation = `Chorus: In which wealth (or prosperity) did you forget me? O Lord Janakiramana (Rama), please tell me, O Raghupati.

Verse 1: Is it the wealth of having released the gods from captivity? Is it the wealth of having listened to the cry of the elephant (Gajendra)? Is it the wealth of having built a bridge across the ocean? O Raghupati, please tell me firmly.

Verse 2: Is it the wealth of having made your home in the ocean (as Narayana)? Is it the wealth of having Shiva as your friend? Is it the wealth of having protected Draupadi’s honor without fail? O Devakisutane (Krishna), please tell me firmly.

Verse 3: Is it the wealth of having measured the earth in three steps (as Vamana)? Is it the wealth of having Manmatha (Kama) as your son? Is it the wealth of having Mahalakshmi as your consort? O Lord Achyuta, please tell me with love.

Verse 4: Is it the wealth of all humans praising you? Is it the wealth of Hanuman becoming your servant? Is it the wealth of there being no gods equal to you? O Narahari, please tell me without hesitation.

Verse 5: If you have forgotten me in such wealth, O Lord, what kind of behavior is this, and what is your vow? O Kaginele Adikeshava Ranga, please remove my worries and make me happy.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-18' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-18' }
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
        compositionId: 'kanaka-list-18',
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
