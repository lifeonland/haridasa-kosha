import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getOrCreateRaga(name: string) {
    let raga = await prisma.raga.findUnique({ where: { name } });
    if (!raga) raga = await prisma.raga.create({ data: { name } });
    return raga.id;
}

async function getOrCreateTala(name: string) {
    let tala = await prisma.tala.findUnique({ where: { name } });
    if (!tala) tala = await prisma.tala.create({ data: { name } });
    return tala.id;
}

async function main() {
  const ragaId = await getOrCreateRaga('Kalyani');
  const talaId = await getOrCreateTala('Adi');

  // Find existing vyasatirtha to get proper references
  const composer = await prisma.composer.findUnique({ where: { id: 'vyasatirtha' } });
  
  if (!composer) {
    console.log("vyasatirtha not found, make sure he exists!");
    return;
  }
  
  const ankita = await prisma.ankita.upsert({
      where: { name: 'Sri Krishna' },
      update: {},
      create: { name: 'Sri Krishna' }
  });
  
  const deity = await prisma.deity.upsert({
      where: { name: 'Krishna' },
      update: {},
      create: { name: 'Krishna' }
  });

  const id = 'vyasatirtha-28';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Ninna Nambide Ranga',
      firstLine: 'Ninna nambide ranga ninna nambide',
      lyrics: `ಪಲ್ಲವಿ:
ನಿನ್ನ ನಂಬಿದೆ ರಂಗ ನಿನ್ನ ನಂಬಿದೆ |
ನಿನ್ನ ಪಾದಾಬ್ಜವನ್ನೇ ನಂಬಿದೆನು ಜಗದೊಳು ||

ಅನುಪಲ್ಲವಿ:
ಅನ್ಯ ದೈವಗಳೆಲ್ಲ ಸಾಸಿವೆಗೆ ಸರಿಯೆಂದು |
ಮಾನ್ಯ ಮುನಿಗಳು ಪೇಳುವ ಮಾತು ಕೇಳಿ ನಾ ||

ಚರಣ 1:
ಹೆತ್ತ ತಾಯಿ ತಂದೆಗಳು ಎನ್ನ ಸಲಹುವರಲ್ಲ |
ಚಿತ್ತಜಪಿತ ನೀನೇ ಸಲಹಬೇಕೊ ಎನ್ನ |
ಉತ್ತಮ ಶ್ಲೋಕನೆ ಉರಗಶಯನ ಮುಕುಂದ |
ಹೃತ್ಕಮಲದೊಳು ನಿನ್ನ ನಿಲಿಸಿಕೊಂಬೆನು ರಂಗ ||

ಚರಣ 2:
ಬಂಧು ಬಳಗಗಳೆಲ್ಲ ಒಣ ಹಗಲು ಕತ್ತಲೆಯು |
ಒಂದಿಷ್ಟು ಸುಖವಿಲ್ಲ ಈ ಮಾಯಾ ಸಂಸಾರದಿ |
ಸಿಂಧುಶಯನನೇ ನಿನ್ನ ಪಾದಸೇವೆಯ ಕೊಟ್ಟು |
ಮಂದಮತಿ ಎನ್ನ ನೀ ಕೈ ಹಿಡಿದು ಸಲಹೊ ||

ಚರಣ 3:
ಸಕಲ ಲೋಕನಾಥ ಸಚ್ಚಿದಾನಂದ ಮೂರುತಿ |
ಅಕಳಂಕ ಚರಿತ ನೀ ಕಾಯಬೇಕು ಎನ್ನ |
ವಿಕ್ರಮಾರ್ಚಿತ ನಮ್ಮ ಶ್ರೀಕೃಷ್ಣ ರಾಯನೇ |
ಭಕುತಿಯ ನೀಡಿ ಎನ್ನ ಮುಕ್ತಿ ಪಥಕೆ ಸೇರಿಸೊ ||`,
      transliteration: `Pallavi:
Ninna nambide ranga ninna nambide |
Ninna paadaabjavanne nambidenu jagadolu ||

Anupallavi:
Anya daivagalella saasivege sariyendu |
Maanya munigalu peluva maatu keli naa ||

Charana 1:
Hetta taayi tandegalu enna salahuvaralla |
Chittajapita neene salahabeko enna |
Uttama shlokane uragashayana mukunda |
Hrutkamaladolu ninna nilisikombenu ranga ||

Charana 2:
Bandhu balagagalella ona hagalu kattaleyu |
Ondishtu sukhavilla ee maaya samsaaradi |
Sindhushayanane ninna paadaseveya kottu |
Mandamati enna nee kai hididu salaho ||

Charana 3:
Sakala lokanaatha sacchidaananda mooruti |
Akalanka charita nee kaayabeku enna |
Vikramaarchita namma srikrishna raayane |
Bhakutiya needi enna mukti pathake seriso ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Ninna Nambide Ranga',
      firstLine: 'Ninna nambide ranga ninna nambide',
      lyrics: `ಪಲ್ಲವಿ:
ನಿನ್ನ ನಂಬಿದೆ ರಂಗ ನಿನ್ನ ನಂಬಿದೆ |
ನಿನ್ನ ಪಾದಾಬ್ಜವನ್ನೇ ನಂಬಿದೆನು ಜಗದೊಳು ||

ಅನುಪಲ್ಲವಿ:
ಅನ್ಯ ದೈವಗಳೆಲ್ಲ ಸಾಸಿವೆಗೆ ಸರಿಯೆಂದು |
ಮಾನ್ಯ ಮುನಿಗಳು ಪೇಳುವ ಮಾತು ಕೇಳಿ ನಾ ||

ಚರಣ 1:
ಹೆತ್ತ ತಾಯಿ ತಂದೆಗಳು ಎನ್ನ ಸಲಹುವರಲ್ಲ |
ಚಿತ್ತಜಪಿತ ನೀನೇ ಸಲಹಬೇಕೊ ಎನ್ನ |
ಉತ್ತಮ ಶ್ಲೋಕನೆ ಉರಗಶಯನ ಮುಕುಂದ |
ಹೃತ್ಕಮಲದೊಳು ನಿನ್ನ ನಿಲಿಸಿಕೊಂಬೆನು ರಂಗ ||

ಚರಣ 2:
ಬಂಧು ಬಳಗಗಳೆಲ್ಲ ಒಣ ಹಗಲು ಕತ್ತಲೆಯು |
ಒಂದಿಷ್ಟು ಸುಖವಿಲ್ಲ ಈ ಮಾಯಾ ಸಂಸಾರದಿ |
ಸಿಂಧುಶಯನನೇ ನಿನ್ನ ಪಾದಸೇವೆಯ ಕೊಟ್ಟು |
ಮಂದಮತಿ ಎನ್ನ ನೀ ಕೈ ಹಿಡಿದು ಸಲಹೊ ||

ಚರಣ 3:
ಸಕಲ ಲೋಕನಾಥ ಸಚ್ಚಿದಾನಂದ ಮೂರುತಿ |
ಅಕಳಂಕ ಚರಿತ ನೀ ಕಾಯಬೇಕು ಎನ್ನ |
ವಿಕ್ರಮಾರ್ಚಿತ ನಮ್ಮ ಶ್ರೀಕೃಷ್ಣ ರಾಯನೇ |
ಭಕುತಿಯ ನೀಡಿ ಎನ್ನ ಮುಕ್ತಿ ಪಥಕೆ ಸೇರಿಸೊ ||`,
      transliteration: `Pallavi:
Ninna nambide ranga ninna nambide |
Ninna paadaabjavanne nambidenu jagadolu ||

Anupallavi:
Anya daivagalella saasivege sariyendu |
Maanya munigalu peluva maatu keli naa ||

Charana 1:
Hetta taayi tandegalu enna salahuvaralla |
Chittajapita neene salahabeko enna |
Uttama shlokane uragashayana mukunda |
Hrutkamaladolu ninna nilisikombenu ranga ||

Charana 2:
Bandhu balagagalella ona hagalu kattaleyu |
Ondishtu sukhavilla ee maaya samsaaradi |
Sindhushayanane ninna paadaseveya kottu |
Mandamati enna nee kai hididu salaho ||

Charana 3:
Sakala lokanaatha sacchidaananda mooruti |
Akalanka charita nee kaayabeku enna |
Vikramaarchita namma srikrishna raayane |
Bhakutiya needi enna mukti pathake seriso ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
I have trusted you, O Ranga, I have trusted you!
I have trusted only your lotus feet in this world!

Anupallavi:
Hearing the words spoken by revered sages
That all other deities are merely equal to a mustard seed!

Charana 1:
The mother and father who bore me cannot protect me fully,
O Father of Manmatha (Krishna), you alone must protect me!
O one praised in excellent verses, resting on the serpent, O Mukunda,
I will establish you within the lotus of my heart, O Ranga!

Charana 2:
All relatives and kin are like dry daylight turning into darkness,
There is not a single bit of happiness in this illusory worldly existence!
O one reclining on the ocean, grant me the service of your feet,
Take my hand and protect me, a dull-minded one!

Charana 3:
O Lord of all worlds, embodiment of truth, consciousness, and bliss!
O one of unblemished character, you must protect me!
O our Lord Sri Krishna, worshipped by the valorous,
Granting me devotion, make me reach the path of liberation!`;
  
  let translation = await prisma.translation.findFirst({
      where: { compositionId: id }
  });
  
  if (translation) {
     await prisma.translation.update({
         where: { id: translation.id },
         data: { english: englishTranslation, kannadaMeaning: "", wordByWord: "" }
     });
  } else {
     await prisma.translation.create({
         data: {
             compositionId: id,
             english: englishTranslation,
             kannadaMeaning: "",
             wordByWord: ""
         }
     });
  }

  console.log('Successfully created/updated ' + id + '!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
