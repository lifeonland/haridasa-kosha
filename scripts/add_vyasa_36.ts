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
  const ragaId = await getOrCreateRaga('Saurashtra');
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

  const id = 'vyasatirtha-36';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Kaalingana Metti Naatyavaadida',
      firstLine: 'Kaalingana metti naatyavaadida',
      lyrics: `ಪಲ್ಲವಿ:
ಕಾಳಿಂಗನ ಮೆಟ್ಟಿ ನಾಟ್ಯವಾಡಿದ
ಕಂಜನಾಭ ಕೃಷ್ಣನು

ಅನುಪಲ್ಲವಿ:
ಕಾಳಿಂಗನ ಮೆಟ್ಟಿ ಆಡಿದ ಭರದಲ್ಲಿ
ಶ್ರೀವತ್ಸ ಉರದಲ್ಲಿ ಕೊರಳಲ್ಲಿ ವನಮಾಲೆ
ತರಳತನದಲಿ ಯಮುನೆಯ ಮಡುವಿನಲ್ಲಿ ಆಡುತ್ತ ಪಾಡುತ್ತ

ಚರಣಗಳು:
೧. ಕಾಲಲಿ ಗೆಜ್ಜೆ ಘಲು ಘಲು ಘಲುಕೆಂದು
ಕರ್ಣ ಕುಂಡಲವು ಧಳಧಳ ಧಳಕೆಂದು
ಫಾಲದಿ ತಿಲಕವು ಹೊಳೆ ಹೊಳೆ ಹೊಳೆಯುತ
ಜ್ವಲಿತ ಮಣಿಮಯ ಲಲಿತ ಪದಕಹಾರ
ಚಲಿತ ಕಾಂತಿ ಬೆಳಗೆ ದಿಕ್ಕುಗಳನೆಲ್ಲ

೨. ಸುರರು ದುಂದುಭಿಯ ಢಣ ಢಣ ಢಣರೆಂದು
ಮೊರೆಯೆ ತಾಳಗಳು ಝುಣಝುಣ ಝುಣರೆಂದು
ಹರಬ್ರಹ್ಮ ಪುರುಹೂತ ತಾಥೈ ತಾಥೈಯನಲು
ನಾರದರು ತುಂಬುರರು ಸಿದ್ದರು ವಿದ್ಯಾಧರರು ಆ-
ಪ್ಸರರು ಅಂಬರದಲ್ಲಿ ಆಡುತ ಪಾಡಲು

೩. ಯೋಗಿಗಳೆಲ್ಲ ಜಯ ಜಯ ಜಯವೆಂದು
ಭೋಗಿಗಳೆಲ್ಲ ಭಯಭಯ ಭಯವೆಂದು
ನಾಗಕನ್ನೇರಭಯ ಅಭಯವೆನಲು
ಜಗದೀಶ ಶ್ರೀಕೃಷ್ಣ ಜನನಿಯ ಕಂಡೊಡೆ
ಧಿಗಿಧಿಗಿನೆ ಬಂದು ಬಿಗಿ ಬಿಗಿದಪ್ಪಿದ`,
      transliteration: `Pallavi:
Kaalingana metti naatyavaadida
Kanjanaabha krishnanu

Anupallavi:
Kaalingana metti aadida bharadalli
Srivatsa uradalli koralalli vanamaale
Taralatanadali yamuneya maduvinalli aadutta paadutta

Charanagalu:
1. Kaalali gejje ghalu ghalu ghalukendu
Karna kundalavu dhaladhala dhalakendu
Phaaladi tilakavu hole hole holeyuta
Jvalita manimaya lalita padakahaara
Chalita kaanti belage dikkugalanella

2. Suraru dundubhiya dhana dhana dhanarendu
Moreye taalagalu jhunajhuna jhunarendu
Harabrahma puruhoota taathai taathaiyanalu
Naaradaru tumburaru siddharu vidyaadhararu aa-
Psararu ambaradalli aaduta paadalu

3. Yogigalella jaya jaya jayavendu
Bhogigalella bhayabhaya bhayavendu
Naagakanneerabhaya abhayavenalu
Jagadeesha srikrishna jananiya kandode
Dhigidhigine bandu bigi bigidappida`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Kaalingana Metti Naatyavaadida',
      firstLine: 'Kaalingana metti naatyavaadida',
      lyrics: `ಪಲ್ಲವಿ:
ಕಾಳಿಂಗನ ಮೆಟ್ಟಿ ನಾಟ್ಯವಾಡಿದ
ಕಂಜನಾಭ ಕೃಷ್ಣನು

ಅನುಪಲ್ಲವಿ:
ಕಾಳಿಂಗನ ಮೆಟ್ಟಿ ಆಡಿದ ಭರದಲ್ಲಿ
ಶ್ರೀವತ್ಸ ಉರದಲ್ಲಿ ಕೊರಳಲ್ಲಿ ವನಮಾಲೆ
ತರಳತನದಲಿ ಯಮುನೆಯ ಮಡುವಿನಲ್ಲಿ ಆಡುತ್ತ ಪಾಡುತ್ತ

ಚರಣಗಳು:
೧. ಕಾಲಲಿ ಗೆಜ್ಜೆ ಘಲು ಘಲು ಘಲುಕೆಂದು
ಕರ್ಣ ಕುಂಡಲವು ಧಳಧಳ ಧಳಕೆಂದು
ಫಾಲದಿ ತಿಲಕವು ಹೊಳೆ ಹೊಳೆ ಹೊಳೆಯುತ
ಜ್ವಲಿತ ಮಣಿಮಯ ಲಲಿತ ಪದಕಹಾರ
ಚಲಿತ ಕಾಂತಿ ಬೆಳಗೆ ದಿಕ್ಕುಗಳನೆಲ್ಲ

೨. ಸುರರು ದುಂದುಭಿಯ ಢಣ ಢಣ ಢಣರೆಂದು
ಮೊರೆಯೆ ತಾಳಗಳು ಝುಣಝುಣ ಝುಣರೆಂದು
ಹರಬ್ರಹ್ಮ ಪುರುಹೂತ ತಾಥೈ ತಾಥೈಯನಲು
ನಾರದರು ತುಂಬುರರು ಸಿದ್ದರು ವಿದ್ಯಾಧರರು ಆ-
ಪ್ಸರರು ಅಂಬರದಲ್ಲಿ ಆಡುತ ಪಾಡಲು

೩. ಯೋಗಿಗಳೆಲ್ಲ ಜಯ ಜಯ ಜಯವೆಂದು
ಭೋಗಿಗಳೆಲ್ಲ ಭಯಭಯ ಭಯವೆಂದು
ನಾಗಕನ್ನೇರಭಯ ಅಭಯವೆನಲು
ಜಗದೀಶ ಶ್ರೀಕೃಷ್ಣ ಜನನಿಯ ಕಂಡೊಡೆ
ಧಿಗಿಧಿಗಿನೆ ಬಂದು ಬಿಗಿ ಬಿಗಿದಪ್ಪಿದ`,
      transliteration: `Pallavi:
Kaalingana metti naatyavaadida
Kanjanaabha krishnanu

Anupallavi:
Kaalingana metti aadida bharadalli
Srivatsa uradalli koralalli vanamaale
Taralatanadali yamuneya maduvinalli aadutta paadutta

Charanagalu:
1. Kaalali gejje ghalu ghalu ghalukendu
Karna kundalavu dhaladhala dhalakendu
Phaaladi tilakavu hole hole holeyuta
Jvalita manimaya lalita padakahaara
Chalita kaanti belage dikkugalanella

2. Suraru dundubhiya dhana dhana dhanarendu
Moreye taalagalu jhunajhuna jhunarendu
Harabrahma puruhoota taathai taathaiyanalu
Naaradaru tumburaru siddharu vidyaadhararu aa-
Psararu ambaradalli aaduta paadalu

3. Yogigalella jaya jaya jayavendu
Bhogigalella bhayabhaya bhayavendu
Naagakanneerabhaya abhayavenalu
Jagadeesha srikrishna jananiya kandode
Dhigidhigine bandu bigi bigidappida`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Stepping on the serpent Kaliya, the Lotus-naveled
Krishna danced!

Anupallavi:
In the vigor of dancing upon Kaliya,
With the Srivatsa mark on His chest and a garland of wild flowers (Vanamala) around His neck,
In His childhood, playing and singing in the depths of the river Yamuna!

Charanagalu:
1. With the anklets on His feet jingling 'ghalu ghalu ghaluk',
With the earrings on His ears shining 'dhaladhala dhalak',
With the tilaka on His forehead gleaming 'hole hole hole',
The swaying radiance of the delicate, blazing, gem-studded pendant necklace
Illuminated all the directions!

2. As the celestial gods beat the drums 'dhana dhana dhana',
As the cymbals resounded 'jhunajhuna jhuna',
As Shiva, Brahma, and Indra kept the beat saying 'taathai taathai',
As Narada, Tumbura, Siddhas, Vidyadharas, and
Apsaras danced and sang in the sky!

3. As all the yogis hailed 'Jaya Jaya Jaya' (Victory),
As all the serpents trembled 'Bhaya Bhaya Bhaya' (Fear),
As the serpent-maidens pleaded 'Abhaya Abhaya' (Fearlessness / Protection),
The Lord of the Universe, Sri Krishna, upon seeing His mother,
Came running 'dhigidhigine' and hugged her tightly!`;
  
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
