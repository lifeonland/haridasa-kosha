import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಬದುಕಿದೆನು ಬದುಕಿದೆನು ಭವ ಎನಗೆ ಹಿಂಗಿತು
ಪದುಮನಾಭನ ಪಾದದೊಲುಮೆ ಎನಗಾಯಿತು ||ಪ||

ಹರಿತೀರ್ಥ ಪ್ರಸಾದ ಎನ್ನ ಜಿಹ್ವೆಗೊದಗಿತು
ಹರಿಯ ನಾಮಾಮೃತ ಕಿವಿಗೊದಗಿತು
ಹರಿಯ ದಾಸರು ಎನ್ನ ಬಂಧು ಬಳಗವಾದರು
ಹರಿಯ ಶ್ರೀಮುದ್ರೆ ಆಭರಣವಾಯ್ತು ||೧||

ಮುಕುತರಾದರು ಎನ್ನ ನೂರೊಂದು ಕುಲದವರು
ಮುಕುತಿ ಮಾರ್ಗಕೆ ಯೋಗ್ಯ ನಾನಾದೆನೊ
ಅಕಳಂಕ ಶ್ರೀಹರಿ ಭಕುತಿಗೆನ್ನ ಮನ ಬೆಳೆದು
ರುಕುಮಿಣಿಯರಸ ಕೈವಶನಾದನೆನಗೆ ||೨||

ಇಂದೆನ್ನ ಜೀವಕ್ಕು ಸಕಲ ಸಂಪದವಾಯ್ತು
ಮುಂದೆನ್ನ ಜನ್ಮ ಸಫಲವಾಯಿತು
ತಂದೆ ಶ್ರೀ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವರಾಯ
ಬಂದೆನ್ನ ಹೃದಯದಲಿ ನೆಲೆಯಾಗಿ ನಿಂತ ||೩||`;

  const englishTranslation = `Refrain:
I am saved, I am saved! The cycle of worldly existence (samsara) has ceased for me.
I have attained the love and grace of the lotus-navelled Lord Padmanabha's feet.

Stanza 1:
The sacred water (tirtha) and offerings (prasada) of Lord Hari have reached my tongue.
The nectar of Hari's name has reached my ears.
The devotees of Hari have become my kin and kinsmen.
The sacred seal (mudra) of Hari has become my ornament.

Stanza 2:
One hundred and one generations of my lineage have attained liberation (mukti).
I have become worthy of the path to salvation.
My mind has grown in devotion to the stainless Sri Hari,
And the Lord of Rukmini (Krishna) has come under my sway (is won over by my devotion).

Stanza 3:
Today, my life has attained all forms of wealth.
Henceforth, my birth has become fruitful and fulfilled.
The father, Lord Adikeshava of Kaginele,
Has come and taken a permanent seat within my heart.`;

  // Update composition with lyrics and translation
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-22' },
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
