import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Bandevaya Govinda Setti (kanaka-list-24)...');

  const lyrics = `ಬಂದೆವಯ್ಯ ಗೋವಿಂದಶೆಟ್ಟಿ – ನಿಮ್ಮಹರಿವಾಣ ತೀರ್ಥಪ್ರಸಾದ ಉಂಟೆನಲಾಗಿ ||ಪ||

ಅಪ್ಪವು ಅತಿರಸ ತುಪ್ಪವು ಚಿನಿಪಾಲು
ಒಪ್ಪುವ ಸಕ್ಕರೆ ಯಾಲಕ್ಕಿಯು
ಅಪರೂಪವಾದ ಕಜ್ಜಾಯಗಳನೆಲ್ಲ
ಛಪ್ಪನ್ನ ದೇಶಕ್ಕೆ ಮಾರುವ ಶೆಟ್ಟಿ ||೧||

ಒಡೆದ ಮಡಕೆ ತಂದು ಇಡಿದು ನಾಮವ ಮಾಡಿಕೊಡುವೆ ನೀ ಕಾಸಿಗೆ ಒಂದೊಂದನು
ಒಡಲು ತುಂಬಿ ಮಿಕ್ಕ ಅನ್ನವ ಮಾರಿಸಿ
ಒಡವೆಯ ಗಳಿಸುವ ಕಡುಲೋಭಿ ಶೆಟ್ಟಿ ||೨||

ಶೇಷಗಿರಿಯಲ್ಲಿ ವಾಸ ಮಾಡಿಕೊಂಡು
ದೇಶದೇಶಕ್ಕೆ ಹೆಸರಾದ ಶೆಟ್ಟಿ
ಕಾಸುಕಾಸಿಗೆ ಬಡ್ಡಿ ಗಳಿಸಿಕೊಂಬ
ಆದಿಕೇಶವ ನಾರಾಯಣ ತಿಮ್ಮಶೆಟ್ಟಿ ||೩||`;

  const translation = `Chorus: Oh Govinda Setti (Lord), have You come? When asked if there is the Tirtha Prasada from Your plate.

Verse 1: Appa, Atirasa, ghee, milk, sugar, cardamom, and all kinds of rare Kajjayas—You are a Setti (merchant) who sells these to all fifty-six countries.

Verse 2: You bring a broken pot, prepare the sacred marks (Namas) in it, and sell them one by one for money. You are a very greedy Setti, who sells the leftover rice after filling Your stomach to earn wealth.

Verse 3: Residing in Seshagiri (Tirumala), You are a Setti famous in many lands, earning interest on every single coin. Oh Adi Keshava Narayana Timmappa Setti!`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-24' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-24' }
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
        compositionId: 'kanaka-list-24',
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
