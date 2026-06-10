import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Aritu Nadeyalu Beku (kanaka-list-21)...');

  const lyrics = `ಅರಿತು ನಡೆಯಲು ಬೇಕು ನರಕಾಯವೆತ್ತಿದ ಮೇಲೆ
ಅರಿಯದಿದ್ದರೆ ನರಕವೇ ಪ್ರಾಪ್ತಿ ||ಪ||

ದುರ್ಜನರ ಮನೆಯ ಪಾಯಸಾನ್ನಕಿಂತ
ಸಜ್ಜನರ ಮನೆಯ ರಬ್ಬಳಿಗೆ ಲೇಸು
ಹೆಜ್ಜೆಗೆ ಸಾವಿರಾರು ಹೊನ್ನನಿತ್ತರೂ ಬೇಡ ಬಲು
ದುರ್ಜನರ ಸಂಗ ಬಲು ಭಂಗ ಹರಿಯೆ ||೧||

ಭಕ್ತಿಹೀನರ ಮನೆಯ ಪಟ್ಟ ಸುಪ್ಪತಿಗೆಗಿಂತ
ಭಕ್ತರ ಮನೆಯ ಕಡೆಬಾಗಿಲ ಕಾಯುವುದು ಲೇಸು
ಮುಕ್ತಿ ಮಾರ್ಗವ ತೋರ್ಪ ಮುರಹರಣ ದಾಸರನು
ಸಕ್ತಿಯಿಂ ಸೇವಿಸುವುದು ಬಲು ಸೌಖ್ಯ ಹರಿಯೆ ||೨||

ಆಶೆಕಾರರ ಮನೆಯ ವಿಳಾಸ ಸುಖಕಿಂತ
ಆಶಾರಹಿತರ ಮನೆಯ ನಿರ್ಗತಿಕ ದೈನ್ಯ ಲೇಸು
ಭೂಸುರ ಪ್ರಿಯ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನ
ಮೀಸಲಿನ ಪಾದಭಜನೆ ಕಡುಲೇಸು ಮನವೆ ||೩||`;

  const translation = `Chorus: After having attained this human body, one must live with awareness; if one does not understand this, they will only attain hell.

Verse 1: Rather than eating sweet pudding (payasam) in the house of the wicked, it is better to eat plain porridge (rabbalige) in the house of the virtuous. Even if they offer thousands of gold coins for every step, do not accept them; the company of the wicked is only a source of ruin, O Hari.

Verse 2: Rather than sleeping on a royal bed in the house of those devoid of devotion, it is better to guard the back door of a devotee's house. To serve with devotion the servants of Lord Hari (Muraharana Dasaru) who show the path to liberation is true happiness, O Hari.

Verse 3: Rather than enjoying the luxury in the house of the greedy, it is better to live in the humble poverty of those who are free from desires. Oh my mind, to devote oneself exclusively to the feet of Kaginele Adikeshava, who is beloved by the virtuous, is supreme goodness.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-21' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-21' }
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
        compositionId: 'kanaka-list-21',
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
