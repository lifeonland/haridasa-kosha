import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Baagilanu Teredu (kanaka-list-6)...');

  const lyrics = `ಬಾಗಿಲನು ತೆರೆದು ಸೇವೆಯನು ಕೊಡೊ ಹರಿಯೆ || ಪ||
ಕೂಗಿದರು ಧ್ವನಿ ಕೇಳಲಿಲ್ಲವೇ ನರಹರಿಯೆ || ಅ.ಪ ||

ಪರಮಪದದೊಳಗೆ ವಿಷಧರನ ತಲ್ಪದಲಿ ನೀ
ಸಿರಿಸಹಿತ ಕ್ಷೀರವಾರಿಧಿಯೊಳಿರಲು
ಕರಿರಾಜ ಕಷ್ಟದಲಿ ಆದಿಮೂಲ ಎಂದು
ಕರೆಯಲಾಕ್ಷಣ ಬಂದು ಒದಗಿದೆಯೊ ನರಹರಿಯೇ || ೧ ||

ಕಡುಕೋಪದಿಂ ಖಳನು ಖಡುಗ ಕೈಯಲಿ ಪಿಡಿದು ನಿ
ನ್ನೊಡೆಯನೆಲ್ಲಿಹನೆಂದು ಕಂಬವನು ಜಡಿಯೆ
ದೃಢಭಕುತಿಯಿಂ ಶಿಶುವು ಬಿಡದೆ ನಿನ್ನನು ಭಜಿಸೆ
ಸಡಗರದಿ ಸ್ತಂಭದಿಂದೊಡೆದೆ ನರಹರಿಯೆ || ೨ ||

ಯಮಸುತನ ರಾಣಿಗಕ್ಷಯವಸನವನಿತ್ತೆ
ಸಮಯದಲಿ ಅಜಮಿಳನ ಪೊರೆದೆ
ಸಮಾಯಾಸಮಯವುಂಟೆ ಭಕ್ತವತ್ಸಲ ನಿನಗೆ
ಕಮಾಲಾಕ್ಷ ಕಾಗಿನೆಲೆಯಾದಿ ಕೇಶವನೆ || ೩ ||`;

  const translation = `Chorus: Open the door and grant me your service, O Hari. Did you not hear my voice when I called out, O Narahari?

Verse 1: While you were resting on the serpent bed in Paramapada, accompanied by Lakshmi in the Milky Ocean, when the King of Elephants (Gajendra) in distress called out "Adimula" (the Primal Source), You arrived instantly to help him, O Narahari.

Verse 2: When the wicked one (Hiranyakashipu), in great anger, held a sword in his hand and struck the pillar asking, "Where is your Lord?", when the child (Prahlada) worshipped you with firm devotion without ceasing, You emerged from the pillar with joy, O Narahari.

Verse 3: You gave inexhaustible garments to the queen of the son of Yama (Draupadi). At the right time, you protected Ajamila. Is there any difficulty for you, O Bhaktavatsala (lover of devotees)? O Lotus-eyed one, Kaginele Adi Keshava.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-6' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-6' }
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
        compositionId: 'kanaka-list-6',
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
