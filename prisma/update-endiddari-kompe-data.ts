import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Endiddari Kompe Enage Nambikeyilla (kanaka-list-36)...');

  const lyrics = `ಎಂದಿದ್ದರೀ ಕೊಂಪೆ ಎನಗೆ ನಂಬಿಕೆಯಿಲ್ಲ
ಮುಂದರಿತು ಹರಿಪಾದ ಹೊಂದುವುದು ಲೇಸು ||ಪ||

ಎಲುವುಗಳು ತೊಳೆ ಜಂತೆ ನರಗಳವು ಬಿಗಿದಂತೆ
ಬಲಿದ ಚರ್ಮವು ಮೇಲು ಹೊದಿಕೆಯಂತೆ
ಗಳಗಳನೆ ನುಡಿವ ನಾಲಗೆ ಗಂಟೆಯುಲಿಯಂತೆ
ಕೆಲಕಾಲಕೀ ಕೊಂಪೆ ಕಡೆಗಾಹುದಂತೆ ||೧||

ಕಂಡಿಗಳು ಒಂಬತ್ತು ಕಳಬಂಟರೈವರು
ಅಂಡಲೆವುದೊತ್ತಿನಲಿ ಷಡುವರ್ಗವು
ಮಂಡಲಕೆ ಹೊಸಪರಿಯು ಮನ್ಮಥನ ಠಾಣ್ಯವಿದು
ಮಂಡೆಹೋಗುವುದನ್ನು ಅರಿಯದೀ ಕೊಂಪೆ ||೨||

ಕೊಂಪೆಯಲಿ ಶೃಂಗಾರ ಕೊಂಡಾಡಲಳವಲ್ಲ
ಕೆಂಪುಬಣ್ಣಗಳಿಂದ ಚೆನ್ನಾಯಿತು
ಇಂಪಿನಲಿ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನನ್ನು
ಸೊಂಪಿನಲಿ ನೆನೆನೆನೆದು ಸುಖಿಯಾಗೋ ಮನುಜಾ ||೩||`;

  const translation = `Chorus: I have no faith in this house (body) that I am living in. It is better to realize this early and seek the feet of Hari.

Verse 1: The bones are like the joints of a cart, and the nerves are tied like ropes. The thick skin is like an outer covering. The tongue that speaks loudly is like the ringing of a bell. This house (body) will eventually come to an end after some time.

Verse 2: There are nine openings (in the body), and five thieves (senses) reside within. The six enemies (lust, anger, greed, delusion, pride, and envy) wander around constantly. This is a new place for the world, and it is the abode of Manmatha (desire). This house (body) does not realize that it will eventually perish.

Verse 3: It is not possible to praise the beauty of this house (body). It looks beautiful because of its red color (blood/flesh). Oh human, remember Kaginele Adikeshavananda with joy and find happiness.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-36' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-36' }
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
        compositionId: 'kanaka-list-36',
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
