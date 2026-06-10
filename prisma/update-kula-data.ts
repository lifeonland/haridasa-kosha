import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Kula Kula Kulavennutiharu (kanaka-list-52)...');

  const lyrics = `ಕುಲ ಕುಲ ಕುಲವೆನ್ನುತಿಹರು ||ಪ||
ಕುಲವ್ಯಾವುದು ಸತ್ಯಸುಖವುಳ್ಳ ಜನರಿಗೆ ||ಅ.ಪ||

ಕೆಸರೊಳು ತಾವರೆ ಪುಟ್ಟಲು ಅದ ತಂದು
ಬಿಸಜನಾಭನಿಗರ್ಪಿಸಲಿಲ್ಲವೆ
ಹಸುವಿನ ಮಾಂಸದೊಳುತ್ಪತ್ತಿ ಕ್ಷೀರವ
ವಸುಧೆಯೊಳಗೆ ಭೂಸುರರುಣಲಿಲ್ಲವೆ ||೧||

ಮೃಗಗಳ ಮೈಯಲಿ ಪುಟ್ಟಿದ ಕತ್ತುರಿಯ
ತೆಗೆದು ಪೂಸುವರು ದ್ವಿಜರೆಲ್ಲರು
ಬಗೆಯಿಂದ ನಾರಾಯಣನ್ಯಾವ ಕುಲ
ಅಗಜ ವಲ್ಲಭನ್ಯಾತರ ಕುಲದವನು ||೨||

ಆತ್ಮ ಯಾವ ಕುಲ ಜೀವ ಯಾವ ಕುಲ
ತತ್ತ್ವೇಂದ್ರಿಯಗಳ ಕುಲ ಪೇಳಿರಯ್ಯ
ಆತ್ಮಾಂತರಾತ್ಮ ನೆಲೆಯಾದಿಕೇಶವನು
ಆತನೊಲಿದ ಮೇಲೆ ಯಾತರ ಕುಲವಯ್ಯ ||೩||`;

  const translation = `Chorus: People keep asking about caste, caste, and caste. What is the significance of caste for those who possess true happiness (spiritual bliss)?

Verse 1: Does a lotus not grow in the mud? Yet, is it not offered to the Lord (Vishnu, the lotus-navelled one)? Does milk not originate from the flesh of a cow? Yet, do the Brahmins (earth-gods) not consume it?

Verse 2: Musk originates from the body of a deer. Yet, do all the twice-born (Brahmins) not apply it to themselves? In this manner, to which caste does Narayana belong? To which caste does the Lord of Parvati (Shiva) belong?

Verse 3: To which caste does the Atma (soul) belong? To which caste does the Jiva (life force) belong? Tell me the caste of the senses and the elements. When the Lord Adikeshavananda, who resides as the inner soul of all, is pleased with you, what does caste matter?`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-52' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-52' }
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
        compositionId: 'kanaka-list-52',
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
