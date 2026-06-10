import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Elu Narayana (kanaka-list-14)...');

  const lyrics = `ಏಳು ನಾರಾಯಣ ಏಳು ಲಕ್ಷ್ಮೀರಮಣ
ಏಳು ಶ್ರೀಗಿರಿಗೊಡೆಯ ಶ್ರೀವೆಂಕಟೇಶ
ಏಳಯ್ಯ ಬೆಳಗಾಯಿತು ||

ಕಾಸಿದ್ದ ಹಾಲನ್ನು ಕಾವಡಿಯೊಳು ಹೆಪ್ಪಿಟ್ಟು
ಲೇಸಾಗಿ ಕಡೆದು ಹೊಸಬೆಣ್ಣೆ ಕೊಡುವೆ
ಶೇಷಶಯನನೆ ಏಳು ಸಮುದ್ರ ಮಂಥನವ ಮಾಡು
ದೇಶ ಕೆಂಪಾಯಿತು ಏಳಯ್ಯ ಹರಿಯೇ ||

ಅರಳು ಮಲ್ಲಿಗೆ ಜಾಜಿ ಪರಿಮಳದ ಪುಷ್ಪಗಳ
ಸುರರು ತಂದಿದ್ದಾರೆ ಬಲು ಭಕುತಿಯಿಂದ
ಅರವಿಂದನಾಭ ಸಿರಿವಿಧಿಭವಾದಿಗಳೊಡೆಯ
ಹಿರಿದಾಗಿ ಕೋಳಿ ಕೂಗಿತೇಳಯ್ಯ ಹರಿಯೇ ||

ದಾಸರೆಲ್ಲರು ಬಂದು ಧೂಳಿನದರ್ಶನಕೊಂಡು
ಲೇಸಾಗಿ ತಾಳ ದಂಡಿಗೆಯ ಪಿಡಿದು
ಶ್ರೀಶನೆಲೆಯಾದಿ ಕೇಶವ ನಿಮ್ಮ ಪಾದವನು
ಲೇಸಾಗಿ ಸ್ಮರಿಸಿ ಪೊಗಳುವರು ಹರಿಯೇ ||`;

  const translation = `Pallavi: Wake up, Narayana! Wake up, O consort of Lakshmi! Wake up, O Lord of Srigiri (Tirupati), Sri Venkatesha! Wake up, it is dawn.

Verse 1: I have set the boiled milk in a vessel to curdle, I will churn it well and offer you fresh butter. O Lord who rests on Shesha, wake up and perform the churning of the ocean, The horizon has turned red, wake up, O Hari!

Verse 2: The celestials (Suras) have brought fragrant flowers like Aralu, Mallige, and Jaji, with great devotion. O Lord with a lotus in your navel, O Lord of Brahma and Shiva, the rooster has crowed loudly, wake up, O Hari!

Verse 3: All the devotees (Dasaru) have come to have your holy vision (Darshana), holding the cymbals and stringed instruments (Dandige) properly. O Lord of Lakshmi, O Adi Keshava, they are remembering your feet and praising you, O Hari!`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-14' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-14' }
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
        compositionId: 'kanaka-list-14',
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
