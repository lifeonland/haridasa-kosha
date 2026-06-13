import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಆರು ಹಿತವರು ಎಂದು ನಂಬಬೇಡ ।।ಪ।।
ಯಾರಿಗ್ಯಾರಿಲ್ಲ ಆಪತ್ತು ಬಂದೊದಗಿದಡೆ ।।ಅ.ಪ।।

ಜನಕ ಹಿತದವನೆಂದು ನಂಬಬಹುದೇ ಹಿಂದೆ
ತನಯ ಪ್ರಹ್ಲಾದನಿಗೆ ಪಿತ ಮುನಿದನು
ಜನನಿಯೇ ರಕ್ಷಿಪಳೆಂತೆಂಬೆನೆ ಅ ಕುಂತಿ
ತನಯ ರಾಧೇಯನಿಗೆ ಎರಡೆಣಿಸಿದ ಮೇಲೆ ।।೧।।

ಮಗನು ತೆತ್ತಿಗನೆನಲು ಕಂಸ ತನ್ನಯ ಪಿತನ
ವಿಗಡ ಬಂಧನದಿಂದ ಬಂಧಿಸಿದನು
ಜಗವರಿಯೇ ಸೋದರನು ಮಮತೆಯುಳ್ಳವನೆನಲು
ಹಗೆವರಸಿ ವಾಲಿಯನು ಅನುಜ ಕೊಲಿಸಿದ ಮೇಲೆ ।।೨।।

ತನಗೆ ದೇಹಾನುಬಂಧುಗಳೇ ಬಂಧುಗಳೆಂದು
ಮನದಿ ನಿಶ್ಚಯವಾಗಿ ನಂಬಬೇಡ
ಘನಕೃಪಾನಿಧಿ ಕಾಗಿನೆಲೆಯಾದಿ ಕೇಶವ
ಅನುದಿನ ನಂಬಿದವಗಿಹಪರದಿ ಸುಖವು ।।೩।।`;

  const englishTranslation = `Refrain:
Do not trust that anyone is truly your well-wisher; when calamity strikes, no one is there for anyone else.

Stanza 1:
Can a father be trusted? In the past, Hiranyakashipu turned against his son Prahlada.
Can a mother be called a protector? Kunti abandoned her son Radheya (Karna).

Stanza 2:
Can a son be a savior? Kamsa imprisoned his own father (Ugrasena).
Can a brother be full of affection? Sugriva caused the death of his brother Vali.

Stanza 3:
Do not firmly believe that bodily relatives are your true kin.
Only the merciful Adikeshava of Kaginele brings happiness in this world and the next to those who trust Him daily.`;

  // Update composition with lyrics and translation
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-39' },
    data: { 
      lyrics: lyrics,
      translations: {
        updateMany: {
          where: {}, 
          data: {
            english: englishTranslation,
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
