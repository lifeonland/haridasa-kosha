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
  const ragaId = await getOrCreateRaga('Todi');
  const talaId = await getOrCreateTala('Khandajhampe');

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

  const id = 'vyasatirtha-39';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Kandanige Kaalillavammaa',
      firstLine: 'Kandanige kaalillavammaa putti',
      lyrics: `ಪಲ್ಲವಿ:
ಕಂದನಿಗೆ ಕಾಲಿಲ್ಲವಮ್ಮಾ ಪುಟ್ಟಿ
ದಂದಿಂದಿಗೂ ಅಂಬೆಗಾಲು ಬಿಡನಮ್ಮಾ

ಚರಣಗಳು:
೧. ಮಳೆಹೊಳೆಯ ಕತ್ತಲೊಳು ತರಳ ಮಗ ಬೆದರಿದನೊ
ಕಳೆಯುಳ್ಳ ಮುಖಕೀಗ ಗ್ರಹ ಸೋಂಕಿತೊ
ಎಳೆಯ ಬೆಳದಿಂಗಳೊಳು ಎತ್ತಣ ದೃಷ್ಟಿ ತಾಕಿತೊ
ಲಲನೆ ಮೀಸಲ ಹಾಲ ಮರೆದರೆದ ಪರಿಯೊ

೨. ಬೆಣ್ಣೆಯನ್ನು ಮೆಲುತ ಬಳಲಿ ಬಾಯಾರಿದನೊ
ಉಣ್ಣೆ ಪೂತನಿ ಮೊಲೆಯ ವಿಷ ಸೋಂಕಿತೊ
ಅಣ್ಣ ಪಾಪಿಯ ಭಯಕೆ ಅಂಜಿ ಕಾಲಿಟ್ಟನೊ
ಹೆಣ್ಣು ದೈತ್ಯೋರ ಕಾಲಲಿ ಬಂದ ಸರಕೊ

೩. ಧುರವಿಜಯ ಶ್ರೀಕೃಷ್ಣರಾಯಗೆ ನಿಮ್ಮ ಚಿಕ್ಕ
ಹರದೇರಂದವ ತೋರಬಂದ ಪರಿಯೊ
ಧರೆಗಧಿಕವೆಂದೆನಿಪ ವಿದ್ಯನಗರ ಒಳಿತೆಂದು ಉದಯ
ಗಿರಿಯಿಂದ ಬಂದ ಮುದ್ದು ಬಾಲಕೃಷ್ಣಗೆ`,
      transliteration: `Pallavi:
Kandanige kaalillavammaa putti
Dandindigoo ambegaalu bidanammaa

Charanagalu:
1. Maleholeya kattalolu tarala maga bedaridano
Kaleyulla mukhakeega graha sonkito
Eleya beladingalolu ettana drushti taakito
Lalane meesala haala maredareda pariyo

2. Benneyannu meluta balali baayaaridano
Unne pootani moleya visha sonkito
Anna paapiya bhayake anji kaalittano
Hennu daityora kaalali banda sarako

3. Dhuravijaya srikrishnaraayage nimma chikka
Haraderandava toorabanda pariyo
Dharegadhikavendenipa vidyanagara olitendu udaya
Giriyinda banda muddu baalakrishnage`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Kandanige Kaalillavammaa',
      firstLine: 'Kandanige kaalillavammaa putti',
      lyrics: `ಪಲ್ಲವಿ:
ಕಂದನಿಗೆ ಕಾಲಿಲ್ಲವಮ್ಮಾ ಪುಟ್ಟಿ
ದಂದಿಂದಿಗೂ ಅಂಬೆಗಾಲು ಬಿಡನಮ್ಮಾ

ಚರಣಗಳು:
೧. ಮಳೆಹೊಳೆಯ ಕತ್ತಲೊಳು ತರಳ ಮಗ ಬೆದರಿದನೊ
ಕಳೆಯುಳ್ಳ ಮುಖಕೀಗ ಗ್ರಹ ಸೋಂಕಿತೊ
ಎಳೆಯ ಬೆಳದಿಂಗಳೊಳು ಎತ್ತಣ ದೃಷ್ಟಿ ತಾಕಿತೊ
ಲಲನೆ ಮೀಸಲ ಹಾಲ ಮರೆದರೆದ ಪರಿಯೊ

೨. ಬೆಣ್ಣೆಯನ್ನು ಮೆಲುತ ಬಳಲಿ ಬಾಯಾರಿದನೊ
ಉಣ್ಣೆ ಪೂತನಿ ಮೊಲೆಯ ವಿಷ ಸೋಂಕಿತೊ
ಅಣ್ಣ ಪಾಪಿಯ ಭಯಕೆ ಅಂಜಿ ಕಾಲಿಟ್ಟನೊ
ಹೆಣ್ಣು ದೈತ್ಯೋರ ಕಾಲಲಿ ಬಂದ ಸರಕೊ

೩. ಧುರವಿಜಯ ಶ್ರೀಕೃಷ್ಣರಾಯಗೆ ನಿಮ್ಮ ಚಿಕ್ಕ
ಹರದೇರಂದವ ತೋರಬಂದ ಪರಿಯೊ
ಧರೆಗಧಿಕವೆಂದೆನಿಪ ವಿದ್ಯನಗರ ಒಳಿತೆಂದು ಉದಯ
ಗಿರಿಯಿಂದ ಬಂದ ಮುದ್ದು ಬಾಲಕೃಷ್ಣಗೆ`,
      transliteration: `Pallavi:
Kandanige kaalillavammaa putti
Dandindigoo ambegaalu bidanammaa

Charanagalu:
1. Maleholeya kattalolu tarala maga bedaridano
Kaleyulla mukhakeega graha sonkito
Eleya beladingalolu ettana drushti taakito
Lalane meesala haala maredareda pariyo

2. Benneyannu meluta balali baayaaridano
Unne pootani moleya visha sonkito
Anna paapiya bhayake anji kaalittano
Hennu daityora kaalali banda sarako

3. Dhuravijaya srikrishnaraayage nimma chikka
Haraderandava toorabanda pariyo
Dharegadhikavendenipa vidyanagara olitendu udaya
Giriyinda banda muddu baalakrishnage`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Mother, doesn't this child have legs?
Since the day He was born, He never stops crawling on His hands and knees!

Charanagalu:
1. Did the young boy get scared in the dark, rainy night?
Has some evil planet struck His radiant face?
In the tender moonlight, whose evil eye has fallen on Him?
Is it because the young lady (Yashoda) forgot to offer the dedicated milk?

2. Did He become tired and thirsty while chewing butter?
Has the poison from Putana's breast, which He drank, affected Him?
Did He step down in fear of the wicked brother (Kamsa)?
Or is this some trouble that came during the time of the demoness?

3. Is this the way the victorious Sri Krishna Raya came to show
The beauty of your small steps?
Thinking that Vidyanagara (Vijayanagara), considered the greatest on earth, is a good place,
The charming baby Krishna has come from the eastern mountains (Udayagiri)!`;
  
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
