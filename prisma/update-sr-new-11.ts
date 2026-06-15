import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const raga = await prisma.raga.findUnique({ where: { name: 'Kalyani' } });
  const tala = await prisma.tala.findUnique({ where: { name: 'Adi' } });
  
  const lyrics = `ಇದನಾದರು ಕೊಡದಿದ್ದರೆ ನಿನ್ನ
ಪದಕಮಲವ ನಂಬಿ ಭಜಿಸುವದೆಂತೊ ||ಪ||

ಗ್ರಾಸವಾಸಗಳಿಗೆ ಇಲ್ಲವೆಂದು ನಿನ್ನ
ಬೇಸರಿಸಿ ಬೇಡ ಬಂದುದಿಲ್ಲ
ವಾಸುದೇವನೆ ನಿನ್ನ ದಾಸರ ದಾಸರ
ದಾಸರ ದಾಸ್ಯವ ಕೊಡು ಸಾಕೆಂದರೆ ||೧||

ಸತಿಸುತರುಗಳ ಸಹಿತನಾಗಿ ನಾ
ಹಿತದಿಂದ ಇರಬೇಕೆಂಬೊದಿಲ್ಲ
ಇತರ ವಿಷಯಂಗಳಿಗೆರಗಿಸದೆ ಮನಕೆ ನಿನ್ನ
ಕಥಾಮೃತವನೆ ಕೊಡು ಸಾಕೆಂದರೆ ||೨||

ಸಾಲವಾಯಿತು, ಸಂಬಳ ಎನಗೆ
ಸಾಲದೆಂದು ಬೇಡ ಬಂದುದಿಲ್ಲ
ನಾಲಗೆಯಲಿ ನಿನ್ನ ನಾಮದುಚ್ಚರಣೆಯ
ಪಾಲಿಸಬೇಕೆಂದು ಬೇಡಿದೆನಲ್ಲದೆ ||೩||

ಒಡವೆ ಒಡ್ಯಾಣಗಳಿಲ್ಲೆಂದು
ಬಡವನೆಂದು ಬೇಡಬಂದುದಿಲ್ಲ
ಒಡೆಯ ನಿನ್ನಡಿಗಳಿಗೆರಗುವುದಕೆ ಮನ
ಬಿಡದಿಹದೊಂದನು ಕೊಡು ಸಾಕೆಂದರೆ ||೪||

ಆಗಬೇಕು ರಾಜ್ಯಭೋಗಗಳೆನಗೆಂದು
ಈಗ ನಾನು ಬೇಡಬಂದುದಿಲ್ಲ
ನಾಗಶಯನ ರಂಗವಿಠಲ ನಾ ನಿನ್ನ
ಬಾಗಿಲ ಕಾಯುವ ಭಾಗ್ಯ ಸಾಕೆಂದರೆ ||೫||`;

  const translation = `Pallavi:
If you do not grant even this, how can I trust and worship your lotus feet?

Charana 1:
I have not come to trouble you saying I lack food or shelter. O Vasudeva, it is enough if you grant me the service of being a servant to your servants.

Charana 2:
I do not say that I must live in comfort with my wife and children. Without letting my mind wander toward other worldly objects, it is enough if you grant me the nectar of your stories (Kathaamruta).

Charana 3:
I have not come to beg because I am in debt or because my salary is insufficient. I have only prayed that you should bless me with the constant chanting of your name on my tongue.

Charana 4:
I have not come to beg saying I am poor and lack jewelry or ornaments. O Lord, it is enough if you grant me a mind that never ceases to bow at your feet.

Charana 5:
I have not come to beg now for kingdoms or royal pleasures. O Rangavithala, who reclines on the serpent (Naga), it is enough if I have the fortune of guarding your doorstep.`;

  const updated = await prisma.composition.update({
    where: { id: 'sr-new-11' },
    data: {
      title: 'Idanaadaru Dayapaalisadire',
      firstLine: 'ಇದನಾದರು ಕೊಡದಿದ್ದರೆ ನಿನ್ನ',
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
  console.log('Updated:', updated.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
