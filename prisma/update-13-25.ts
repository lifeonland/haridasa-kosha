import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const raga = await prisma.raga.findFirst({ where: { name: 'Kalyani' } });
  const tala = await prisma.tala.findFirst({ where: { name: 'Adi' } });
  
  // Update sr-new-13 (Vyarthavallave Janma)
  const lyrics13 = `ವ್ಯರ್ಥವಲ್ಲವೆ ಜನ್ಮ ವ್ಯರ್ಥವಲ್ಲವೆ ||ಪ||
ತೀರ್ಥಪಾದರ ಭಜಿಸಿ ಕೃತಾರ್ಥನಾಗದವನ ಜನ್ಮ ||ಅ.ಪ||

ಅರುಣ ಉದಯದಲ್ಲಿ ಎದ್ದು ಸರಿತದಲಿ ಸ್ನಾನವ ಮಾಡಿ
ಅರಳುಮಲ್ಲಿಗೆ ಮಾಲೆ ಹರಿಯ ಚರಣಕರ್ಪಿಸದವನ ಜನ್ಮ ||೧||

ಒಂದು ಶಂಖ ಉದಕ ತಂದು ಚಂದದಿಂದ ಹರಿಗೆ ಎರೆದು
ಗಂಧ ಪುಷ್ಪದಿಂದ ಹರಿಯ ವಂದನೆ ಮಾಡದವನ ಜನ್ಮ ||೨||

ಮುಗುಳು ತೆನೆಯಲೆಸೆವ ತುಳಸಿದಳವ ತಂದು ಪ್ರೇಮದಿಂದ
ಜಗನ್ಮಯಗೆ ಅರ್ಪಿಸಿ ಕರವ ಮುಗಿದು ಸ್ತುತಿಸದವನ ಜನ್ಮ ||೩||

ಭೋಗಿಶಯನನ ದಿನದಿ ಸಕಲ ಭೋಗಗಳನು ತಾನು ತೊರೆದು
ಭಾಗವತರ ಮ್ಯಾಳದಿಂದ ಜಾಗರಣೆ ಮಾಡದವನ ಜನ್ಮ ||೪||

ಜಂಗಮರೊಳಗಧಿಕವನಿಪ ಭಂಗುರ ಮನುಷ್ಯದೇಹ ಪಡೆದು
ರಂಗವಿಠಲನನೆನಿಪ ಪಶ್ಚಿಮರಂಗಗರ್ಪಿಸದವನ ಜನ್ಮ ||೫||`;

  const translation13 = `Pallavi:
Is life not wasted? It is indeed wasted, the life of one who does not become fulfilled by worshipping the lotus-footed Lord.

Charana 1:
The life of one who does not wake up at sunrise, bathe in the river, and offer garlands of jasmine to Hari's feet is wasted.

Charana 2:
The life of one who does not offer water from a conch with devotion, and does not worship Hari with sandalwood and flowers, is wasted.

Charana 3:
The life of one who does not bring fresh Tulasi leaves with love, offer them to the Lord of the world, fold hands, and pray, is wasted.

Charana 4:
The life of one who does not renounce worldly pleasures on the auspicious day of the Lord, and does not stay awake in devotion with the assembly of devotees, is wasted.

Charana 5:
Having received this fragile human body, if one does not dedicate it to Ranga Vitthala, the life is truly wasted.`;

  await prisma.composition.update({
    where: { id: 'sr-new-13' },
    data: {
      title: 'Vyarthavallave Janma',
      firstLine: 'ವ್ಯರ್ಥವಲ್ಲವೆ ಜನ್ಮ ವ್ಯರ್ಥವಲ್ಲವೆ',
      lyrics: lyrics13,
      ragaId: raga?.id,
      talaId: tala?.id,
      translations: {
        deleteMany: {},
        create: {
          english: translation13,
          kannadaMeaning: '',
          wordByWord: ''
        }
      }
    }
  });

  // Update sr-25 (Ellyaadi Bandyo)
  const lyrics25 = `ಎಲ್ಯಾಡಿ ಬಂದ್ಯೋ ನೀ ಹೇಳಯ್ಯ
ನಿಲ್ಲು ನಿಲ್ಲು ಗೋಪಾಲ ಕೃಷ್ಣಯ್ಯ ||ಪ||

ನೊಸಲಲ್ಲಿ ಕಿರುಬೆವರಿಟ್ಟಿದೆ ಅಲ್ಲಿ
ಹೊಸಪರಿ ಸುದ್ದಿಯು ಹುಟ್ಟಿದೆ
ಪುಸಿಯಲ್ಲ ಈ ಮಾತು ನಿನ್ನ
ನಸುನಗೆ ಕೀರ್ತಿ ಹೆಚ್ಚಿದೆ ||೧||

ಬೆರಳ ಉಂಗುರವೆಲ್ಲಿ ಹೋಗಿದೆ ನಿನ್ನ
ಕೊರಳ ಪದಕವೆಲ್ಲಿ ನೀಗಿದೆ
ಸರಕೆಲ್ಲ ಅವಳಲ್ಲಿ ಸಾಗಿದೆ ಆ
ತರುಣಿ ಮಹಿಮೆ ಹೀಂಗಾಗಿದೆ ||೨||

ಕಳ್ಳತನವ ಹೀಗೆ ಮಾಡಿದೆ ನಿನ್ನ
ಸುಳ್ಳು ಕಡೆಗೆ ನಾ ನೋಡಿದೆ
ಎಲ್ಲರಿಗೂ ಠಕ್ಕು ಮಾಡಿದೆ
ಚಲುವ ರಂಗವಿಠಲ ನಗೆಗೀಡಾದೆ ||೩||`;

  const translation25 = `Pallavi:
Where have you come from, tell me? Stop, stop, O Gopala Krishnayya.

Charana 1:
There are beads of sweat on your forehead, a new story has arisen there. This is not a lie, your smile has increased your fame.

Charana 2:
Where has your finger ring gone? Where has your neck pendant gone? All your ornaments have gone to her, such is the greatness of that young woman.

Charana 3:
You have committed theft like this; I have seen through your lies. You have cheated everyone, O beautiful Ranga Vitthala, you have become a laughingstock.`;

  await prisma.composition.update({
    where: { id: 'sr-25' },
    data: {
      title: 'Ellyaadi Bandyo',
      firstLine: 'ಎಲ್ಯಾಡಿ ಬಂದ್ಯೋ ನೀ ಹೇಳಯ್ಯ',
      lyrics: lyrics25,
      ragaId: raga?.id,
      talaId: tala?.id,
      translations: {
        deleteMany: {},
        create: {
          english: translation25,
          kannadaMeaning: '',
          wordByWord: ''
        }
      }
    }
  });
  console.log('Updated: sr-new-13 and sr-25');
  await prisma.$disconnect();
}

main();
