import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಆವ ಸಿರಿಯಲಿ ನೀನು ಎನ್ನ ಮರೆತೆ ?
ದೇವ ಜಾನಕಿರಮಣ ಪೇಳು ರಘುಪತಿಯೆ ? ।।ಪ॥

ಸುರರ ಸೆರೆಯನು ಬಿಡಿಸಿ ಬಂದನೆಂಬಾ ಸಿರಿಯೆ
ಕರಿ ಮೊರೆಯ ಲಾಲಿಸಿದೆನೆಂಬ ಸಿರಿಯೆ ?
ಶರಧಿ ಸೇತುವೆಯ ಕಟ್ಟಿದೆನೆನ್ನುವಾ ಸಿರಿಯೆ
ಸ್ಥಿರವಾಗಿ ಹೇಳೆನಗೆ ಹೇಳು ರಘುಪತಿಯೆ ।।೧।।

ಕಡಲೊಳಗೆ ಮನೆ ಮಾಡಿ ಮಲಗಿದೆನೆಂಬಾ ಸಿರಿಯೆ
ಮೃಡ ನಿನ್ನ ಸಖನಾದನೆಂಬ ಸಿರಿಯೆ ?
ಬಿಡದೆ ದ್ರೌಪದಿ ಮಾನ ಕಾಯ್ದನೆಂಬ ಸಿರಿಯೆ
ದೃಢವಾಗಿ ಹೇಳೆನಗೆ ದೇವಕೀಸುತನೆ ।।೨।।

ಭೂಮಿಯನು ಮೂರಡಿಯ ಮಾಡಿದೆನೆಂಬ ಸಿರಿಯೆ
ಕಾಮ ನಿನ್ನ ಸುತನಾದನೆಂಬ ಸಿರಿಯೆ
ಆ ಮಹಾಲಕುಮಿ ನಿನ್ನ ಸತಿಯಾದಳೆಂಬ ಸಿರಿಯೆ
ಪ್ರೇಮದಲಿ ಹೇಳೆನಗೆ ಸ್ವಾಮಿ ಅಚ್ಯುತನೆ ।।೩।।

ಮನುಜರೆಲ್ಲರು ನಿನ್ನ ಸ್ತುತಿಸುವರೆಂಬ ಸಿರಿಯೆ
ಹನುಮ ನಿನ್ನ ಬಂಟನಾದೆನೆಂಬ ಸಿರಿಯೆ
ಬಿನುಗುದೈವಗಳು ನಿನಗೆಣೆಯಿಲ್ಲವೆಂಬ ಸಿರಿಯೆ
ಅನುಮಾನ ಮಾಡದೆ ಪೇಳೋ ನರಹರಿಯೆ ।।೪।।

ಇಂತು ಸಿರಿಯಲಿ ನೀನು ಎನ್ನ ಮರೆತರೆ ಸ್ವಾಮಿ
ಪಂಥವೇ ನಿನಗಿದು ಆವಾ ನಡತೆ
ಕಂತುಪಿತ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ ರಂಗ
ಚಿಂತೆಯನು ಬಿಡಿಸಿ ಸಂತೋಷಪಡಿಸೊ ।।೫।।`;

  const englishTranslation = `Refrain:
In what pride (wealth/glory) have you forgotten me?
O Lord, the beloved of Janaki, tell me, O Raghupati?

Stanza 1:
Is it the pride of having released the Gods from their imprisonment?
Is it the pride of having listened to the elephant's (Gajendra's) cry for help?
Is it the pride of having built a bridge across the ocean?
Tell me firmly, O Raghupati.

Stanza 2:
Is it the pride of having made your home and sleeping within the ocean?
Is it the pride of having Mruda (Lord Shiva) as your friend?
Is it the pride of having protected Draupadi's honor without fail?
Tell me with certainty, O son of Devaki.

Stanza 3:
Is it the pride of having measured the entire earth in three steps?
Is it the pride of having Kama (Manmatha) as your son?
Is it the pride of having the great Lakshmi as your consort?
Tell me with love, O Lord Achyuta.

Stanza 4:
Is it the pride of all humans singing your praises?
Is it the pride of having Hanuma as your servant?
Is it the pride that no other shining deities are equal to you?
Tell me without any doubt, O Narahari.

Stanza 5:
If you forget me in such pride, O Lord,
Is this challenge or behavior appropriate for you?
O Kaginele Adikeshava, the father of Kama, O Ranga,
Relieve me of my worries and grant me joy.`;

  // Find or create Raga and Tala
  const raga = await prisma.raga.upsert({
    where: { name: 'Kambhoji' },
    update: {},
    create: { name: 'Kambhoji' }
  });
  
  const tala = await prisma.tala.upsert({
    where: { name: 'Adi' },
    update: {},
    create: { name: 'Adi' }
  });

  // Update composition with lyrics, translation, and metadata
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-18' },
    data: { 
      lyrics: lyrics,
      ragaId: raga.id,
      talaId: tala.id,
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

  console.log('Successfully updated lyrics, metadata, and translation for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
