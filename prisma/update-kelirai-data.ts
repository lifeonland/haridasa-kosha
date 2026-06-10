import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Kelirai Sivasaranaru (kanaka-list-4)...');

  const lyrics = `ಕೇಳಿರೈ ಶಿವಶರಣರು ಹೇಳಲಂಜಿಕೆ ಆವುದು ||ಪ||
ಭಾಳನೇತ್ರನ ಭಕ್ತರಿಂತು ನೋಡಿಕೊಳ್ಳಿರೈ ||ಅ.ಪ||

ಮೂರುಲಿಂಗ ತನ್ನೊಳು ಮುಖ್ಯವಾಗಿರುವಾಗ
ಬೇರೊಂದು ಲಿಂಗ ಬೆಲೆ ಮಾಡಿ ತಂದು
ತೋರುವಂಗೈಲಿಟ್ಟು ತೋಯ ಪುಷ್ಪವ ನೀಡಿಯಾರ
ಮನಕೊಪ್ಪಿಸುವರೀ ಶೀಲವಂತರು ||೧||

ಲಿಂಗವೊಂದು ತನ್ನೊಳು ಲೀನವಾಗಿರುವಾಗ
ಅಂಗಭವಿಗಳು ಕೂಡಿ ಆಡಿಕೊಂಬರು
ಅಂಗದನುಭವದರ್ಥವನರಿಯದ ಇಂತಹ
ಭಂಗಿ ಹುಚ್ಚರೆಲ್ಲ ಶಿವನ ಭಕ್ತರಹರೆ ||೨||

ನಾಗಲಿಂಗ ತನ್ನೊಳು ನಾಟ್ಯವಾಡುತಲಿರಲು
ಆಗಮಿಸಿದ ಲಿಂಗವ ಬೆದಕಲೇತಕ್ಕೆ
ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನೆ ನಾಗಶಯನನಾಗಿರಲು
ಬೇರೊಂದನರಸಲೇತಕ್ಕೆ ||೩||`;

  const translation = `Chorus: Listen, O devotees of Shiva! Why should there be any fear in speaking? Observe how the devotees of the three-eyed Lord (Shiva) conduct themselves.

Verse 1: When the three Lingas (the internal manifestations) are already primary within oneself, why go out, buy another Linga, hold it in your hand, and offer water and flowers? These virtuous ones seem to just perform rituals to satisfy their own minds.

Verse 2: When the true Linga is already absorbed within oneself, these 'Angabhavis' (those who focus only on the physical) gather and play around with it. These foolish fanatics, who do not understand the meaning of internal experience—are they truly devotees of Shiva?

Verse 3: When the Serpent-Linga (a reference to the Lord) is already dancing within oneself, why go searching for an external Linga that has come from elsewhere? When Kaginele Adi Keshava (who resides in the serpent-bed) is already within, why search for anything else?`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-4' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-4' }
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
        compositionId: 'kanaka-list-4',
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
