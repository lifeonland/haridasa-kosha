import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const raga = await prisma.raga.findFirst({ where: { name: 'Kalyani' } });
  const tala = await prisma.tala.findFirst({ where: { name: 'Adi' } });
  
  const lyrics = `ಪಲ್ಲವಿ:
ಸರಸಿಜನಾಭನೆ ಸೆರಗೊಡ್ಡಿ ಬೇಡುವೆ
ದುರಿತಗಳೆಲ್ಲವ ತರಿದು ವರವಿತ್ತು ಕರುಣಿಸೋ ||

ಚರಣ ೧:
ಕರುಣಾಸಾಗರ ನಿನ್ನ ಚರಣವ ನಂಬಿದೆ
ಪರಮ ಪಾವನ ನಿನ್ನ ಶರಣನ ಪೊರೆಯೆಂದು ||

ಚರಣ ೨:
ಈಶವಿನುತ ನಿನ್ನ ವಾಸಿಯ ಪೊಗಳುವೆ
ದಾಸ ಎಂದೆನ್ನನು ಗಾಸಿ ಮಾಡದೆ ಕಾಯೊ ||

ಚರಣ ೩:
ಬಾರಿಬಾರಿಗೆ ಬರುವ ದಾರಿದ್ರ್ಯ ದುಃಖದ
ದೂರಗೈಸುವಂಥ ದಾರಿ ತೋರಿಸೆಂದು ||
(ಶ್ರೀರಂಗವಿಠಲನೆ ಶರಣಾಗತರಿಗೊಲಿದೆ)`;

  const translation = `Pallavi:
O Lotus-navelled one (Sarasijanabhane), I beg of you, holding the edge of your garment. Please cut away all my sins, grant me a boon, and show compassion.

Charana 1:
O Ocean of Mercy, I have trusted your feet. O supremely pure one, protect your devotee.

Charana 2:
O Lord praised by Shiva (Isha), I praise your glory. Please protect me as your servant without causing me distress.

Charana 3:
Show me the way to remove the poverty and sorrow that come time and again. (O Sri Ranga Vitthala, you are pleased with those who surrender).`;

  await prisma.composition.update({
    where: { id: 'sr-8' },
    data: {
      title: 'Sarasijanabhane Seragoddi Beduve',
      firstLine: 'ಸರಸಿಜನಾಭನೆ ಸೆರಗೊಡ್ಡಿ ಬೇಡುವೆ',
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
  console.log('Updated: sr-8');
  await prisma.$disconnect();
}

main();
