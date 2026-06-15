import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const raga = await prisma.raga.findFirst({ where: { name: 'Kalyani' } });
  const tala = await prisma.tala.findFirst({ where: { name: 'Adi' } });
  
  const lyrics = `ವ್ಯರ್ಥವಲ್ಲವೆ ಜನ್ಮ ವ್ಯರ್ಥವಲ್ಲವೆ ||ಪ||
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

  const translation = `Pallavi:
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
      lyrics: lyrics,
      ragaId: raga?.id,
      talaId: tala?.id,
      translations: {
        deleteMany: {},
        create: {
          english: translation,
          kannadaMeaning: '',
          wordByWord: ''
        }
      }
    }
  });
  console.log('Updated: sr-new-13');
  await prisma.$disconnect();
}

main();
