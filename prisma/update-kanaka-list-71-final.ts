import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಅಹುದಾದರಹುದೆನ್ನಿ ಅಲ್ಲವಾದರಲ್ಲವೆನ್ನಿ
ಬಹುಜನರು ನೆಲೆ ತಿಳಿದು ಪೇಳಿ ಮತ್ತಿದನು.

ದೇವರಿಲ್ಲದ ಗುಡಿಯು ಪಾಳು ಬಿದ್ದಂಗಡಿಯು
ಭಾವವಿಲ್ಲದ ಭಕುತಿ ಅದು ಕುಹಕ ಯುಕುತಿ
ಹೇವವಿಲ್ಲದ ಹೆಣ್ಣು ಗಜ್ಜುಗ ಬೆಳೆದಾ ಕಣ್ಣು
ಸೇವೆಯರಿಯದ ಧಣಿಯು ಕಲ್ಲಿನಾ ಖಣಿಯು.

ಧರ್ಮವಿಲ್ಲದ ಅರಸು ಮುರಿದ ಕಾಲಿನ ಗೊರಸು
ನಿರ್ಮಲಿಲ್ಲದ ಮನಸು ಅದು ಕಜ್ಜಿ ತಿನಿಸು
ಕರ್ಮವಿಲ್ಲದ ಗಂಡು ಕರಿಯ ಒನಕೆಯ ತುಂಡು
ಮರ್ಮವಿಲ್ಲದ ಮಾತು ಒಡಕು ಮಡಕೆಯ ತೂತು.

ಮಕ್ಕಳಿಲ್ಲದ ಸಿರಿಯು ಕೊಳೆತ ತೆಂಗಿನ ಕಾಯಿ
ಸೌಖ್ಯವಿಲ್ಲದ ಕೂಟ ಅದು ಕಾಳಕೂಟ
ಒಕ್ಕಲಿಲ್ಲದ ಊರು ಕೊಳೆತು ನಾರುವ ನೀರು
ಸೊಕ್ಕಿ ನಡೆಯುವ ಭೃತ್ಯ ಅವ ಕ್ರೂರಕೃತ್ಯ

ಕಂಡು ಕರೆಯದ ನೆಂಟ ಗಂಡುಗತ್ತೆಯ ಶಂಟ
ಉಂಡು ನಗದಿಹ ಮೋರೆ ಅದು ಕಹಿಯ ಸೋರೆ
ದಂಡಿಗಂಜುವ ಬಂಟ ಒಡಕು ಹರವಿಯ ಕಂಠ
ಗಂಡಗಂಜದ ನಾರಿ ಅವಳೆ ಹೆಮ್ಮಾರಿ.

ಬಿಟ್ಟು ನಡೆಯುವ ಗೆಳೆಯ ಹರಕು ತೊಗಲಿನ ಮಿಣಿಯು
ಕೊಟ್ಟು ಕೇಳುವ ದಾತ ಅವ ಹೀನಜಾತ
ಸೃಷ್ಟಿಯೊಳು ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನಂಘ್ರಿ
ಮುಟ್ಟಿ ಭಜಿಸದ ನರನು ಅವನು ಕಾಡುಮರನು.`;

  // We are assuming the translation record for kanaka-list-71 already exists 
  // from our previous operation, so we update it.
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-71' },
    data: { 
      lyrics: lyrics,
      translations: {
        updateMany: {
          where: {}, // Update all translations for this composition
          data: {
            kannadaMeaning: lyrics,
          }
        }
      }
    }
  });

  console.log('Successfully updated lyrics and translation for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
