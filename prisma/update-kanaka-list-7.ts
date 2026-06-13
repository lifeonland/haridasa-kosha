import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ದಾಸದಾಸರ ಮನೆಯ ದಾಸಾನುದಾಸ ನಾನು
ಶ್ರೀಶ ಶ್ರೀರಂಗ ನಿಮ್ಮ ಮನೆಯ ದಾಸ ।।ಪ।।

ತಾಳುದಾಸರ ಮನೆಯ ಆಳುದಾಸ ನಾನಯ್ಯ
ತೀಳುದಾಸನು ನಾನು ತಿರಿಯದಾಸ
ಫಾಲಾಕ್ಷಸಖನಾಗಿ ಭಜಿಪ ದೇವರ ಮನೆಯ
ಆಳಿನಾಳಿನ ಆಳಿನಡಿದಾಸ ನಾನು ।।೧।।

ಪಂಕಜನಾಭನ ಮನೆಯ ಮಂಕುದಾಸನಯ್ಯ
ಕುಂಕುದಾಸನು ನಾನು ಕುರುಡುದಾಸ
ಸಂಕೀರ್ತನೆಯ ಮಾಡಿ ನೆನೆವ ಭಕ್ತರ ಮನೆಯ
ಬಿಂಕದ ಬಾಗಿಲ ಕಾಯ್ವ ಬಡದಾಸ ನಾನು ।।೨।।

ಹಲವು ದಾಸರ ಮನೆಯ ಹೊಲೆದಾಸ ನಾನಯ್ಯ
ಕುಲವಿಲ್ಲದ ದಾಸ ಕುನ್ನಿದಾಸ
ಮಲಹರ ರಂಗ ನಿನ್ನ ಮನೆಯ ಮಾದಿಗದಾಸ
ಸಲೆ ಮುಕ್ತಿ ಪಾಲಿಸೋ ಆದಿಕೇಶವರಾಯ ।।೩।।`;

  const englishTranslation = `Refrain:
I am the servant of the servants of the servants' house,
O Lord of Lakshmi (Shrisha), Lord of Sriranga, I am a servant of Your house.

Stanza 1:
I am the working servant in the house of the servants,
I am a humble servant, a simple-minded servant.
In the houses of devotees who worship You as the friend of the three-eyed Shiva (Phalakshasakha),
I am the servant of the servant's servant, a servant at their feet.

Stanza 2:
I am the foolish servant (Mankudasa) in the house of the Lotus-naveled Lord (Pankajanabha),
I am an ignorant servant, a blind servant.
In the houses of devotees who remember You through songs of praise (Sankirtana),
I am the poor servant guarding their proud doors.

Stanza 3:
I am the outcaste servant (Holedasa) in the houses of many servants,
A servant without a lineage, a lowly servant.
O Malahara Ranga, I am the cobbler servant in Your house;
O Adikeshava Raya, grant me liberation (Mukti) completely.`;

  // Find or create Raga and Tala
  const raga = await prisma.raga.upsert({
    where: { name: 'Shankarabharana' },
    update: {},
    create: { name: 'Shankarabharana' }
  });
  
  const tala = await prisma.tala.upsert({
    where: { name: 'Adi' },
    update: {},
    create: { name: 'Adi' }
  });

  // Update composition with lyrics, translation, and metadata
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-7' },
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
