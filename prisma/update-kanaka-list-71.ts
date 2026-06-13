import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಅಹುದಾದರಹುದೆನ್ನಿ ಅಲ್ಲವಾದರಲ್ಲವೆನ್ನಿ |
ಬಹುಜನರು ನೆರೆ ತಿಳಿದು ಪೇಳಿ ಮತ್ತಿದನು ||ಪ||

ದೇವರಿಲ್ಲದ ಗುಡಿಯು ಪಾಳು ಬಿದ್ದಂಗಡಿಯು |
ಭಾವವಿಲ್ಲದ ಭಕುತಿ ಅದು ಕುಹಕ ಯುಕುತಿ |
ಹೇವವಿಲ್ಲದ ಹೆಣ್ಣು ಗಜುಗ ಬೆಳೆದ ಕಣ್ಣು |
ಸೇವೆಯರಿಯದ ದಣಿಯು ಕಲ್ಲಿನಾ ಕಣಿಯು ||೧||

ಧರ್ಮವಿಲ್ಲದ ಅರಸು ಮುರಿದ ಕಾಲಿನ ಹೊರಸು |
ನಿರ್ಮಲಿಲ್ಲದ ಮನಸು ಅದು ಕಜ್ಜಿ ತಿನಿಸು |
ಶರ್ಮವಿಲ್ಲದ ಗಂಡು ಕರಿಯ ಒನಕೆಯ ತುಂಡು |
ಮರ್ಮವಿಲ್ಲದ ಮಾತು ಒಡಕು ಮಡಕೆ ತೂತು ||೨||

ಬಿಟ್ಟು ನಡೆಯುವ ಗೆಣೆಯು ಹರಕು ತೊಗಲಿನ ಮಿಣಿಯು |
ಕೊಟ್ಟು ಪೇಳುವ ದಾತ ಅವ ಹೀನ ಜಾತ |
ಸೃಷ್ಟಿಯೊಳು ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನಂಘ್ರಿ |
ಮುಟ್ಟಿ ಭಜಿಸದ ನರನು ಅವನೆ ವಾನರನು ||೫||`;

  const englishTranslation = `If it is true, say it is true; if it is not, say it is not.
Many people come to know and speak this again.

A temple without a deity is like a deserted shop;
Devotion without feeling (bhava) is a deceptive trick.
A woman without modesty, eyes grown with gajuga,
A master who knows not service is like a stone in the eye.

A king without righteousness is like a broken sandal;
A mind without purity is like a skin itch.
A man without peace is like a piece of a black pestle;
Speech without depth is like a hole in a broken pot.

A friend who abandons you is like a torn leather strap;
A donor who brags about giving is of low birth.
In this creation, he who does not touch and worship 
The feet of Kaginele Adikeshava, that man is a monkey.`;

  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-71' },
    data: { 
      lyrics: lyrics,
      translations: {
        create: {
          english: englishTranslation,
          kannadaMeaning: lyrics, // Setting lyrics as meaning if no separate meaning provided
          wordByWord: ""
        }
      }
    }
  });

  console.log('Successfully updated lyrics and translation for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
