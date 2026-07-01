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
  const ragaId = await getOrCreateRaga('Bili');
  const talaId = await getOrCreateTala('Jhampe');

  // Find existing vyasatirtha to get proper references
  const composer = await prisma.composer.findUnique({ where: { id: 'vyasatirtha' } });
  
  if (!composer) {
    console.log("vyasatirtha not found, make sure he exists!");
    return;
  }
  
  const ankita = await prisma.ankita.upsert({
      where: { name: 'Udupi Krishna' },
      update: {},
      create: { name: 'Udupi Krishna' }
  });
  
  const deity = await prisma.deity.upsert({
      where: { name: 'Krishna' },
      update: {},
      create: { name: 'Krishna' }
  });

  const id = 'vyasatirtha-47';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Ninna Maganene Gopi',
      firstLine: 'Ninna maganene gopi gopamma',
      lyrics: `ಪಲ್ಲವಿ:
ನಿನ್ನ ಮಗನೇನೆ ಗೋಪಿ ಗೋಪಮ್ಮ

ಅನುಪಲ್ಲವಿ:
ಚಿನ್ನರ ಚೆಲುವ ಉಡುಪಿನ ಕೃಷ್ಣರಾಯ 

ಚರಣಗಳು:
೧. ಮುಂಗುರುಳ ಮುಂಡಲೆಗೆ ಬಂಗಾರದರಳೆಲೆ
ರಂಗುಮಾಣಿಕದ ಹೊನ್ನುಂಗುರವನಿಟ್ಟು
ಪೊಂಗೆಜ್ಜೆ ಚರಣದಂದುಗೆ ಘಲುಘಲುಕೆನುತ ನ-
ಮ್ಮಂಗಳದೊಳಗಾಡುತಿಹ ಈ ಮುದ್ದು ಬಾಲ

೨. ಕಟವಾಯ ಬೆಣ್ಣೆ ಕಾಡಿಗೆಗಣ್ಣು ಕಟಿಸೂತ್ರ
ಪಟ್ಟಾವಳಿ ಕೌಪೀನ ಕೊರಳಲಿ ಪದಕ
ಸಟೆಯಲ್ಲ ಬ್ರಹ್ಮಾಂಡ ಹೃದಯದೊಳಿಂಬಿಟ್ಟು
ಮಿಟಿ ಮಿಟಿ ನೋಡುತಿಹ ಈ ಮುದ್ದು ರಂಗ

೩. ಹರಿವ ಹಾವನೆ ಕಂಡು ಹೆಡೆ ಹಿಡಿದಾಡುವ
ಕರುವಾಗಿ ಆಕಳ ಮೊಲೆಯನುಂಬ
ಅರಿದಾಗಿ ನೋಡಿದರೆ ಅಂತರಂಗದ ಸ್ವಾಮಿ
ಧರೆಯೊಳಂಬುಧಿತೀರ ಉಡುಪಿಯ ಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Ninna maganene gopi gopamma

Anupallavi:
Chinnara cheluva udupina krishnaraaya

Charanagalu:
1. Mungurula mundalege bangaaradaralele
Rangumaanikada honnunguravanittu
Pongejje charanadanduge ghalughalukenuta na-
Mmangaladolagaadutiha ee muddu baala

2. Katavaaya benne kaadigegannu katisootra
Pattaavali koupeena koralali padaka
Sateyalla brahmaanda hrudayadolimbittu
Miti miti nodutiha ee muddu ranga

3. Hariva haavana kandu hede hididaaduva
Karuvaagi aakala moleyanumba
Aridaagi nodidare antarangada svaami
Dhareyolambudhiteera udupiya krishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Ninna Maganene Gopi',
      firstLine: 'Ninna maganene gopi gopamma',
      lyrics: `ಪಲ್ಲವಿ:
ನಿನ್ನ ಮಗನೇನೆ ಗೋಪಿ ಗೋಪಮ್ಮ

ಅನುಪಲ್ಲವಿ:
ಚಿನ್ನರ ಚೆಲುವ ಉಡುಪಿನ ಕೃಷ್ಣರಾಯ 

ಚರಣಗಳು:
೧. ಮುಂಗುರುಳ ಮುಂಡಲೆಗೆ ಬಂಗಾರದರಳೆಲೆ
ರಂಗುಮಾಣಿಕದ ಹೊನ್ನುಂಗುರವನಿಟ್ಟು
ಪೊಂಗೆಜ್ಜೆ ಚರಣದಂದುಗೆ ಘಲುಘಲುಕೆನುತ ನ-
ಮ್ಮಂಗಳದೊಳಗಾಡುತಿಹ ಈ ಮುದ್ದು ಬಾಲ

೨. ಕಟವಾಯ ಬೆಣ್ಣೆ ಕಾಡಿಗೆಗಣ್ಣು ಕಟಿಸೂತ್ರ
ಪಟ್ಟಾವಳಿ ಕೌಪೀನ ಕೊರಳಲಿ ಪದಕ
ಸಟೆಯಲ್ಲ ಬ್ರಹ್ಮಾಂಡ ಹೃದಯದೊಳಿಂಬಿಟ್ಟು
ಮಿಟಿ ಮಿಟಿ ನೋಡುತಿಹ ಈ ಮುದ್ದು ರಂಗ

೩. ಹರಿವ ಹಾವನೆ ಕಂಡು ಹೆಡೆ ಹಿಡಿದಾಡುವ
ಕರುವಾಗಿ ಆಕಳ ಮೊಲೆಯನುಂಬ
ಅರಿದಾಗಿ ನೋಡಿದರೆ ಅಂತರಂಗದ ಸ್ವಾಮಿ
ಧರೆಯೊಳಂಬುಧಿತೀರ ಉಡುಪಿಯ ಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Ninna maganene gopi gopamma

Anupallavi:
Chinnara cheluva udupina krishnaraaya

Charanagalu:
1. Mungurula mundalege bangaaradaralele
Rangumaanikada honnunguravanittu
Pongejje charanadanduge ghalughalukenuta na-
Mmangaladolagaadutiha ee muddu baala

2. Katavaaya benne kaadigegannu katisootra
Pattaavali koupeena koralali padaka
Sateyalla brahmaanda hrudayadolimbittu
Miti miti nodutiha ee muddu ranga

3. Hariva haavana kandu hede hididaaduva
Karuvaagi aakala moleyanumba
Aridaagi nodidare antarangada svaami
Dhareyolambudhiteera udupiya krishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Is this your son, Gopi, O mother Gopi?

Anupallavi:
The beautiful little one, Udupi's Krishnaraya!

Charanagalu:
1. With a golden peepal-leaf ornament on the forelock of His curly hair,
Wearing a colorful ruby ring made of gold,
With golden anklets and leg ornaments jingling 'ghalu-ghalu',
This cute boy is playing in our courtyard!

2. With butter on the corners of His mouth, collyrium in His eyes, a waist-thread,
Wearing a silk loincloth, and a pendant around His neck,
It is no lie! Holding the entire universe within His heart,
This cute Ranga is blinking His eyes innocently!

3. Seeing a moving snake, He catches its hood and plays with it,
Becoming a calf, He drinks milk from the cow,
If looked at with realization, He is the Lord of the inner self,
Sri Udupi Krishna, residing on the shores of the ocean on this earth!`;
  
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
