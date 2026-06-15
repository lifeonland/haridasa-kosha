import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const raga = await prisma.raga.findFirst({ where: { name: 'Kalyani' } });
  const tala = await prisma.tala.findFirst({ where: { name: 'Adi' } });
  
  const lyrics = `ಪಲ್ಲವಿ:
ಸಾಸಿರ ಜಿಹ್ವೆಗಳುಳ್ಳ ಶೇಷನೆ ಕೊಂಡಾಡಬೇಕುವ್ಯಾಸಮುನಿರಾಯರ ಸಂನ್ಯಾಸದಿರವ || ಪ ||

ಚರಣ ೧:
ಆಸೆಯಿಂದ ತಮ್ಮುದರ ಪೋಷಣಕಾಗಿ ಛಪ್ಪನ್ನದೇಶವ ತಿರುಗಿ ಸಂಚಾರ ಮಾಡುತ
ಮೀಸಲ ಮಡಿ ಬಚ್ಚಿಟ್ಟು ಮಿಂಚುಕೂಳನುಂಡು ದಿನಮೋಸಮಾಡಿ ಕಳೆವ ಸಂನ್ಯಾಸಿಗಳು ಸರಿಯೆ || ೧ ||

ಚರಣ ೨:
ಕೆರೆ ಬಾವಿ ಪುರ ಅಗ್ರಹಾರಂಗಳ ಮಾಡಿ ಭೂ-
ಸುರರೊಂದು ಲಕ್ಷಕುಟುಂಬಗಳಪೊರೆವ ವೈಭವ ಕೀರ್ತಿಯಿಂದಲಿ ವ್ಯಾಸರಾ-
ಯರ ಗುಣಗಣ ಗಾಂಭೀರ್ಯಾದಿಗಳ || ೨ ||

ಚರಣ ೩:
ಹಗಲಿರುಳೆನ್ನದೆ ಆವಾಗ ಶ್ರೀಹರಿ ಪದಪದ್ಮಯುಗಳವನರ್ಚಿಸಿ ಭಕುತಿಯಿಂದ
ರಘುಪತಿಭಜಕ ಬ್ರಹ್ಮಣ್ಯತೀರ್ಥರ ಕುವರರಂಗವಿಠಲನನ್ನು ಬಿಡೆಬಿಡೆನು ಎಂಬ || ೩ ||`;

  const translation = `Pallavi:
The thousand-tongued Shesha should praise the greatness of the renunciation of Vyasamuni Raya.

Charana 1:
Are the Sanyasis who wander through fifty-six countries to nourish their stomachs out of desire, pretending to be pure, eating dainty food, and wasting days in deception, truly Sanyasis?

Charana 2:
(Praising the glory and greatness of Vyasaraya), who built tanks, villages, and agraharas (settlements for Brahmins), and supported a hundred thousand families of Brahmins (Bhu-sura) with glory.

Charana 3:
Without considering day or night, always worshipping the lotus feet of Sri Hari with devotion, the worshipper of Raghupati (Vyasaraya) says, "I will not let go of Ranga Vitthala, the son of Brahmanya Tirtha."`;

  await prisma.composition.update({
    where: { id: 'sr-34' },
    data: {
      title: 'Sashira Jihveulla',
      firstLine: 'ಸಾಸಿರ ಜಿಹ್ವೆಗಳುಳ್ಳ ಶೇಷನೆ ಕೊಂಡಾಡಬೇಕುವ್ಯಾಸಮುನಿರಾಯರ ಸಂನ್ಯಾಸದಿರವ',
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
  console.log('Updated: sr-34');
  await prisma.$disconnect();
}

main();
