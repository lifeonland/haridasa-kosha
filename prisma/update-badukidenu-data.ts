import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Badukidenu Badukidenu (kanaka-list-22)...');

  const lyrics = `ಬದುಕಿದೆನು ಬದುಕಿದೆನು ಭವ ಎನಗೆ ಹಿಂಗಿತು
ಪದುಮನಾಭನ ಪಾದದೊಲುಮೆ ಎನಗಾಯಿತು
ಹರಿತೀರ್ಥ ಪ್ರಸಾದ ಎನ್ನ ಜಿಹ್ವೆಗೊದಗಿತು
ಹರಿಯ ನಾಮಾಮೃತ ಕಿವಿಗೊದಗಿತು
ಹರಿಯ ದಾಸರು ಎನ್ನ ಬಂಧು ಬಳಗವಾದರು
ಹರಿಯ ಶ್ರೀಮುದ್ರೆ ಆಭರಣವಾಯ್ತು ||೧||

ಮುಕುತರಾದರು ಎನ್ನ ನೂರೊಂದು ಕುಲದವರು
ಮುಕುತಿ ಮಾರ್ಗಕೆ ಯೋಗ್ಯ ನಾನಾದೆನೊ
ಅಕಳಂಕ ಶ್ರೀಹರಿ ಭಕುತಿಗೆನ್ನ ಮನ ಬೆಳೆದು
ರುಕುಮಿಣಿಯರಸ ಕೈವಶನಾದನೆನಗೆ ||೨||

ಇಂದೆನ್ನ ಜೀವಕ್ಕು ಸಕಲ ಸಂಪದವಾಯ್ತು
ಮುಂದೆನ್ನ ಜನ್ಮ ಸಫಲವಾಯಿತು
ತಂದೆ ಶ್ರೀ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವರಾಯ
ಬಂದೆನ್ನ ಹೃದಯದಲಿ ನೆಲೆಯಾಗಿ ನಿಂತ ||೩||`;

  const translation = `I have lived, I have lived, the cycle of birth and death (Bhava) has ended for me. The affection of the feet of Padmanabha (Lord Vishnu) has become mine. The Prasada of Hari’s holy water has reached my tongue, and the nectar of Hari’s name has reached my ears. The devotees of Hari have become my relatives and kin, and the holy mark (Shri Mudre) of Hari has become my ornament.

My hundred and one generations have attained liberation (Mukti). I have become eligible for the path of liberation. My mind has grown in devotion to the flawless Lord Hari, and the Lord of Rukmini has come under my control.

Today, my life has attained all wealth and prosperity. My future birth has become fruitful. My father, the Lord of Kaginele, Adikeshavaraya, has come and stood firmly in my heart.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-22' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-22' }
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
        compositionId: 'kanaka-list-22',
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
