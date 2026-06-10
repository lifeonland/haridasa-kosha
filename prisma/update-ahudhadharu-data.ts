import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Ahudhadharu Adhudhennni (kanaka-list-71)...');

  const lyrics = `ಅಹುದಾದರಹುದೆನ್ನಿ ಅಲ್ಲವಾದರಲ್ಲವೆನ್ನಿ
ಬಹುಜನರು ನೆಲೆ ತಿಳಿದು ಪೇಳಿ ಮತ್ತಿದನು ||ಪ||

ದೇವರಿಲ್ಲದ ಗುಡಿಯು ಪಾಳು ಬಿದ್ದಂಗಡಿಯು
ಭಾವವಿಲ್ಲದ ಭಕುತಿ ಅದು ಕುಹಕ ಯುಕುತಿ
ಹೇವವಿಲ್ಲದ ಹೆಣ್ಣು ಗಜ್ಜುಗ ಬೆಳೆದಾ ಕಣ್ಣು
ಸೇವೆಯರಿಯದ ಧಣಿಯು ಕಲ್ಲಿನಾ ಖಣಿಯು ||೧||

ಧರ್ಮವಿಲ್ಲದ ಅರಸು ಮುರಿದ ಕಾಲಿನ ಗೊರಸು
ನಿರ್ಮಲಿಲ್ಲದ ಮನಸು ಅದು ಕಜ್ಜಿ ತಿನಿಸು
ಕರ್ಮವಿಲ್ಲದ ಗಂಡು ಕರಿಯ ಒನಕೆಯ ತುಂಡು
ಮರ್ಮವಿಲ್ಲದ ಮಾತು ಒಡಕು ಮಡಕೆಯ ತೂತು ||೨||

ಮಕ್ಕಳಿಲ್ಲದ ಸಿರಿಯು ಕೊಳೆತ ತೆಂಗಿನ ಕಾಯಿ
ಸೌಖ್ಯವಿಲ್ಲದ ಕೂಟ ಅದು ಕಾಳಕೂಟ
ಒಕ್ಕಲಿಲ್ಲದ ಊರು ಕೊಳೆತು ನಾರುವ ನೀರು
ಸೊಕ್ಕಿ ನಡೆಯುವ ಭೃತ್ಯ ಅವ ಕ್ರೂರಕೃತ್ಯ ||೩||

ಕಂಡು ಕರೆಯದ ನೆಂಟ ಗಂಡುಗತ್ತೆಯ ಶಂಟ
ಉಂಡು ನಗದಿಹ ಮೋರೆ ಅದು ಕಹಿಯ ಸೋರೆ
ದಂಡಿಗಂಜುವ ಬಂಟ ಒಡಕು ಹರವಿಯ ಕಂಠ
ಗಂಡಗಂಜದ ನಾರಿ ಅವಳೆ ಹೆಮ್ಮಾರಿ ||೪||

ಬಿಟ್ಟು ನಡೆಯುವ ಗೆಳೆಯ ಹರಕು ತೊಗಲಿನ ಮಿಣಿಯು
ಕೊಟ್ಟು ಕೇಳುವ ದಾತ ಅವ ಹೀನಜಾತ
ಸೃಷ್ಟಿಯೊಳು ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನಂಘ್ರಿ
ಮುಟ್ಟಿ ಭಜಿಸದ ನರನು ಅವನು ಕಾಡುಮರನು ||೫||`;

  const translation = `Chorus: Whether it is true or false, say it as it is; let many people understand the truth and speak about it.

Verse 1: A temple without God is like a ruined shop; Devotion without feeling is mere hypocrisy and trickery. A woman without modesty is like an eye grown with a seed (useless); A master who does not know how to serve is like a stone mine.

Verse 2: A king without righteousness is like a horse with a broken leg; A mind without purity is like a scab that itches; A man without duty is like a piece of a black pestle; Words without essence are like the hole in a broken pot.

Verse 3: Wealth without children is like a rotten coconut; A gathering without happiness is like poison (Kāḷakūṭa); A village without inhabitants is like stagnant, foul-smelling water; A servant who acts arrogantly is a cruel act.

Verse 4: A relative who does not call when they see you is like a stubborn donkey; A face that does not smile after eating is like a bitter gourd; A soldier who fears punishment is like the neck of a broken vessel; A woman who does not fear her husband is a demoness.

Verse 5: A friend who leaves you midway is like a piece of torn leather; A giver who asks back (after giving) is a low-born person; In this creation, a human who does not touch and worship the feet of Kaginele Adikeshava is like a wild tree.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-71' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-71' }
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
        compositionId: 'kanaka-list-71',
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
