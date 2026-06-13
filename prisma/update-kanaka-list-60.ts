import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಬೇಡ ಬೇಡ ಎಲೆಲೆ ಮನವೇ ಬೇಡ ಬೇಡ ಎಲೆಲೆ
ಬೇಡ ಬೇಡ ಎಲೆಲೆ ಮನವೇ ಕೂಡಲ ಸಂಗಮದೇವನಲ್ಲದೆ

ಪರರ ದ್ರವ್ಯಕ್ಕೆ ಆಸೆ ಮಾಡಬೇಡ
ಪರರ ಸ್ತ್ರೀಯರ ನೋಡಿ ಮರುಳಾಗಬೇಡ
ಪರರ ನಿಂದೆಯ ಮಾಡಿ ನರಕಕ್ಕೆ ಹೋಗಬೇಡ
ಪರಮ ಪುರುಷನ ಪಾದ ಮರೆಯಬೇಡ ।।೧।।

ಹಸಿದು ಬಂದವರಿಗೆ ಅನ್ನವ ನೀಡದಿರಬೇಡ
ಬೆಸಗೈವ ಭಕ್ತರ ಬಿಟ್ಟು ಇರಬೇಡ
ಕುಸುಮನಾಭನ ಪಾದ ಭಜಿಸದೆ ಇರಬೇಡ
ಅಸದೃಶನಾದ ಹರಿಯ ಮರೆಯಬೇಡ ।।೨।।

ಕನಕದಾಸರ ಪ್ರಿಯ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನ
ಮನದೊಳಗೆ ನೆನೆದು ಮರೆಯದಿರು ನೀನು
ದಿನದಿನವು ಆತನ ಧ್ಯಾನವ ಮಾಡುತ
ಜನನ ಮರಣದ ಭಯವ ನೀಗಿಸಿಕೊ ।।೩।।`;

  const englishTranslation = `Chorus:
No, no, O mind, do not.
No, no, O mind, do not seek anyone other than the Lord.

Stanza 1:
Do not covet the wealth of others.
Do not be deluded by looking at other women.
Do not go to hell by slandering others.
Do not forget the feet of the Supreme Being.

Stanza 2:
Do not fail to give food to those who come hungry.
Do not stay away from the devotees who serve.
Do not fail to worship the feet of the Lotus-naveled Lord (Vishnu).
Do not forget the incomparable Lord Hari.

Stanza 3:
The beloved of Kanaka Dasa, Adikeshava of Kaginele—
Remember Him in your heart and do not forget.
By meditating on Him day after day,
Rid yourself of the fear of the cycle of birth and death.`;

  // Find or create Raga and Tala
  const raga = await prisma.raga.upsert({
    where: { name: 'Shri' },
    update: {},
    create: { name: 'Shri' }
  });
  
  const tala = await prisma.tala.upsert({
    where: { name: 'Adi' },
    update: {},
    create: { name: 'Adi' }
  });

  // Create/Update composition
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-60' },
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
