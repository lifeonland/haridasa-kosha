import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const raga = await prisma.raga.findFirst({ where: { name: 'Kalyani' } });
  const tala = await prisma.tala.findFirst({ where: { name: 'Adi' } });
  
  const lyrics = `ಸಾಗಿ ಬಾರಯ್ಯ ನೀ | ಬಾಗಿ ನಮಿಸುವೆ
ಯೋಗಿಗಳರಸನೇ ಶ್ರೀನಿವಾಸ ||ಪ||

ಭೋಗಿಶಯನನೇ ನಿನ್ನ ಭಾಗವತರು ಬಂದು
ಜಾಗು ಮಾಡದೆ ನಿನ್ನ ಬಾಗಿಲೊಳು ನಿಂತಿಹರೋ ||ಅ.ಪ||

ಇಂದಿರೇ ರಮಣ ಗೋವಿಂದ ನೀನೇ ಗತಿಯೆಂದು ಭಜಿಸುತಿರಲು ಆನಂದದಿಂದ
ತಂದೆಯಂ ಬಾಧೆಗೆ ತಂದು ತೋರಲು ಸ್ತಂಭ ತಂದೆ ತಾಡನೆಯ ಮಾಡಲಂ
ಬಂದೆರಡಾ ಪರಿಪರಿ ವಿಧ ಭಯದಿಂದವೋದೇಲು ಬಂದು ಅಸುರನ್ನ ಅರ್ಭಟಿಸಿ ಕೆಡೆಹಂತ
ಥಂದದಿಂದಲಿ ಬಗೆಯುತಸುರನ್ನ ಕೊರಳುಳು ಮಾಲೆ ಅಂದ ಧರಿಸಿಧಿ ಅಧಿಕ ಸಂಪನ್ನ |
ಪ್ರಳಯಾಗ್ನಿಯಂತಿರೇ ನಿನ್ನ ಸ್ಮೃತಿ ಸಲಂ ಆರಿಗೊನೆದಿನಂ ಅನಿತಿರಲು ನಿನ್ನಯಂ
ವಂದಿಪೇ ಭಜಿಸುತ ಕಂಡು ಬರಲಾನಂದದಿಂದಲಿ ಚಂದದಿ ಸಲಹೊ [ದೊಲು]
ನಂದದಲಿ ಮಂದರೋದ್ಧರ ಎನ್ನ ಸಲಹೋ ||೧||

ತ್ರೇತಾಯುಗದಿ ನಿನ್ನ ವರಾತರಾಜ್ಯೆಯ ಕೊಂಡು ಪ್ರೀತಿಯಿಂದಲಿ ವನಕೆ ನೀ ಪೋದಲು
ಆತರದಿ ಮೃಗ ಸೀತೆ ಬೇಡಲು ಬಾಣ ಎಸೆಯಲು ಅದು ಲಕ್ಷ್ಮಣಾಯೆಂದಂ ಕೂಗಲಂ
ಮತ್ತಾತ್ರ ಪೋಗಲು ಇತ್ತ ರಾವಣನು ಕರೆದೊಯ್ಯೊ ಸತಿಯಳ ವಾತಸಂತ ತಾನಿನಿಸೇ
ನೀ ಮಣ್ಣಾ ಅವ ಪೋಗೇ ಉಂಗುರ ಖ್ಯಾತಿಯಿಂದಲಿ ನೀಡಲದಕಿನ್ನು ತನವಂದದ
ಲತಿ ಭೋಗದಿ ಶಿಖೆಯ ಶಿರೋಮಣಿಯನ್ನೇ ಕೊಡಲನುಗ್ರ[ಹ]ದಲಿ
ಭಾತಿಯಿಂದಲಿ ಅವಗೆ ವಿಧಾತಪದವಿಯು ಪಾಲಿಸಿದೇ ಜಗನ್ನಾಥ
ಇಂದ್ರಾ[ದ]ಮರ ವಂದಿತ ವೀತಭಯ ಜಗನ್ನಾಥ ಸಲಹೋ ||೨||

ಮಂಗಳಾಂಗನೇ ಎನ್ನ ಸಂಜೀವ ಕೊಟ್ಟಿಲ್ಲ ಅಂಗನೆಯರ ಬಾಧೆ ಬಿಡಿಸೊ ಇಂದಂ
ಅಂಗನೆಯರು ಬಂದು ಭಂಗಪಡಿಸಲದಕೆ ಪೋಗುತಾ ಮಾರನ್ನ ಬಾಧೆಯ ಕಳೆಯಂತಾ
ಪರಿಪರಿಯಂ ಸಂವಿಗಳ ಸಂಗವಿಲ್ಲದೇ ನೀಡಿಯೊ [ದೊ?] ಮಲ್ಲ ಮರ್ದನನೇ ಎನಂತಿರೇ
ಬೇಗದಿಂದಲಿ ಓಡಿಪೋದಲ್ಲೊ ಭಕ್ತರನು ಸಲಹುವನಂಬೋ ಬಿರಂದಂ ನಿನಗೆ ಉಂಟಲ್ಲಾ
ಅನಿತಿರಲು ನಿನ್ನಯ ಎನ್ನ ಮನ ಉತ್ತಂಗುತಸತ್ಸಂಗವೀವುದು ವಿಹಿತದೇವನೇ
ತುರಂಗನಾಥನೇ ರಂಗವಿರಲನೇ ದೇವ ದೇವರ ದೇವ ಸಲಹೋ ||೩||`;

  const translation = `Pallavi:
Come forward, I bow to you, O Lord of Yogis, Srinivasa.

Anupallavi:
O Lord who reclines on the serpent (Bhogi-shayana), your devotees have come and are standing at your door without delay.

Charana 1:
You are the Lord of Indira, O Govinda! You are my only refuge... (A lengthy verse about the Lord's glory and protection of devotees).

Charana 2:
In the Treta Yuga... (A lengthy verse about the Ramayana story).

Charana 3:
O Auspicious one, you have given me life... (A lengthy verse about his devotion and protection).`;

  await prisma.composition.create({
    data: {
      id: 'sr-new-12',
      title: 'Saagi Baarayya',
      firstLine: 'ಸಾಗಿ ಬಾರಯ್ಯ ನೀ | ಬಾಗಿ ನಮಿಸುವೆ',
      lyrics: lyrics,
      composerId: 'sripadaraja',
      deityId: 'cmqafdtg40000yz61qv2umawr',
      ankitaId: 'cmqafh5f20000oi0c14pn24p3',
      ragaId: raga?.id,
      talaId: tala?.id,
      translations: {
        create: {
          english: translation,
          kannadaMeaning: '',
          wordByWord: ''
        }
      }
    }
  });
  console.log('Added: sr-new-12');
  await prisma.$disconnect();
}

main();
