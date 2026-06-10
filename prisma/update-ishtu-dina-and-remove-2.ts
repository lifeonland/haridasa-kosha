import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Ishtu Dina I Vaikuntha (kanaka-list-42)...');
  console.log('Removing composition kanaka-2...');

  // --- 1. Update kanaka-list-42 ---
  const lyrics = `ಇಷ್ಟು ದಿನ ಈ ವೈಕುಂಠ
ಎಷ್ಟು ದೂರವೋ ಎನುತಲಿದ್ದೆ
ದೃಷ್ಟಿಯಿಂದಲಿ ನಾನು ಕಂಡೆ
ಸೃಷ್ಟಿಗೀಶನೇ ಶ್ರೀರಂಗಶಾಯಿ ||ಪ||

ಎಂಟು ಏಳನು ಕಳೆದುದರಿಂದ
ಬಂಟರೈವರ ತುಳಿದುದರಿಂದ
ಕಂಟಕನೊಬ್ಬನ ತರಿದುದರಿಂದ
ಬಂಟನಾಗಿ ಬಂದನೋ ಶ್ರೀರಂಗಶಾಯಿ ||೧||

ವನ ಉಪವನಗಳಿಂದ
ಘನ ಸರೋವರಗಳಿಂದ
ಕನಕ ಗೋಪುರಗಳಿಂದ
ಘನಶೋಭಿತನೆ ಶ್ರೀರಂಗಶಾಯಿ ||೨||

ವಜ್ರ ವೈಢೂರ್ಯದ ತೊಲೆಗಳ ಕಂಡೆ
ಪ್ರಜ್ವಲಿಪ ಮಹಾದ್ವಾರವ ಕಂಡೆ
ನಿರ್ಜರಾದಿ ಮುನಿಗಳ ಕಂಡೆ
ದುರ್ಜನಾಂತಕನೆ ಶ್ರೀರಂಗಶಾಯಿ ||೩||

ರಂಭೆ ಊರ್ವಶಿಯರ ಮೇಳವ ಕಂಡೆ
ತುಂಬುರು ಮುನಿ ನಾರದರನು ಕಂಡೆ
ಅಂಬುಜೋದ್ಭವ ರುದ್ರರ ಕಂಡೆ
ಶಂಬರಾರಿಪಿತನೆ ಶ್ರೀರಂಗಶಾಯಿ ||೪||

ನಾಗಶಯನನ ಮೂರುತಿ ಕಂಡೆ
ಭೋಗಿಭೂಷಣ ಶಿವನನು ಕಂಡೆ
ಭಾಗವತರ ಸಮ್ಮೇಳವ ಕಂಡೆ
ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ ಶ್ರೀರಂಗಶಾಯಿ ||೫||`;

  const translation = `Chorus: I thought this Vaikuntha (Heaven) was so far away, but I have seen it with my own eyes. O Lord of creation, You are the Lord of Sriranga!

Verse 1: By conquering the eight-seven (senses/enemies) and trampling the five thieves, by slaying the one thorn (Hiranyakashipu), You came as a servant, O Lord of Sriranga!

Verse 2: With forests, gardens, and vast lakes, and golden towers, You shine with great splendor, O Lord of Sriranga!

Verse 3: I saw the pillars of diamond and gems. I saw the blazing main gate. I saw the celestials and sages. O destroyer of the wicked, You are the Lord of Sriranga!

Verse 4: I saw the assembly of Rambha and Urvashi. I saw Tumburu, the sage Narada. I saw the lotus-born Brahma and Shiva. O Father of Manmatha, You are the Lord of Sriranga!

Verse 5: I saw the form of the one who rests on the serpent (Narayana). I saw Shiva, who is adorned with snakes. I saw the gathering of devotees. O Kaginele Adi Keshava, You are the Lord of Sriranga!`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-42' },
    data: { lyrics: lyrics },
  });

  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-42' }
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
        compositionId: 'kanaka-list-42',
        english: translation,
        kannadaMeaning: '-', 
        wordByWord: '-', 
      },
    });
    console.log('✅ Translation created successfully!');
  }

  // --- 2. Remove kanaka-2 ---
  await prisma.translation.deleteMany({
    where: { compositionId: 'kanaka-2' },
  });
  
  try {
    await prisma.composition.delete({
      where: { id: 'kanaka-2' },
    });
    console.log('✅ Composition kanaka-2 removed successfully!');
  } catch (e) {
    console.log('⚠️ Composition kanaka-2 not found, might have been removed already.');
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
