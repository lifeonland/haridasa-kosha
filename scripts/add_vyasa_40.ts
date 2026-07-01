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
  const ragaId = await getOrCreateRaga('Poorvikalyani');
  const talaId = await getOrCreateTala('Atte');

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

  const id = 'vyasatirtha-40';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Karevaru Baa Manege',
      firstLine: 'Karevaru baa manege srikrishna',
      lyrics: `ಪಲ್ಲವಿ:
ಕರೆವರು ಬಾ ಮನೆಗೆ ಶ್ರೀಕೃಷ್ಣ

ಅನುಪಲ್ಲವಿ:
ಮೂ ಜಗಂಗಳಿಗೇ ರಾಜಾಧಿರಾಜ
ರಾಜಿಸುತಿರುವ ಸೋಜಿಗದ ಬಲು
ಸೋಜಿಗದ ಮನೆಗೆ ಬಾ ಶ್ರೀಕೃಷ್ಣ 

ಚರಣಗಳು:
೧. ಸಾರಸಲೋಚನ ಭೀಷ್ಮಕ ಕುವರಿ
ನೂರು ವಿಧದ ಬಲು ಪರಿಮಳದಾ
ಚಾರು ಕುಸುಮಗಳ ಹಾರವ ಪಿಡಿದು
ಮಾರು ಜನಕ ನಿನ್ನ ಕೋರುವಳೋ
ಗಂಭೀರದಲಿ ಮನೆಗೆ ಬಾ ಶ್ರೀಕೃಷ್ಣ

೨. ಚಿತ್ತಜನಯ್ಯನ ಚಿತ್ರದ ರಾಣಿ
ಯತ್ನದಿ ನಿನ್ನ ಕರೆಸಿದಳು
ಚಿತ್ರವಿಚಿತ್ರದ ಮುತ್ತು ರತ್ನಗಳ
ಉತ್ತಮ ಪೀಠಕೆ ದಯಮಾಡೋ ಪರಾಕ್
ದಯ ಮಾಡೋ ಮನೆಗೆ ಶ್ರೀಕೃಷ್ಣ

೩. ಯದುಕುಲ ನಂದನ ನೀ ಬಾರೋ
ಮಧುರಾನಾಥನೆ ನೀ ಬಾರೋ
ಮದಗಜಗಮನನೆ ಬಾರೋ ನೀ
ಪ್ರಸನ್ನ ವದನೆಯರಾರತಿ ಬೆಳಗುವರೊ ದೇವ
ದಯಮಾಡೋ ಮನೆಗೆ ಶ್ರೀಕೃಷ್ಣ ದೇವ`,
      transliteration: `Pallavi:
Karevaru baa manege srikrishna

Anupallavi:
Moo jagangalige rajaadhiraaja
Raajisutiruva sojigada balu
Sojigada manege baa srikrishna

Charanagalu:
1. Saarasalochana bheeshmaka kuvari
Nooru vidhada balu parimaladaa
Chaaru kusumagala haarava pididu
Maaru janaka ninna koruvalo
Gambheeradali manege baa srikrishna

2. Chittajanayyana chitrada raani
Yatnadi ninna karesidalu
Chitravichitrada muttu ratnagala
Uttama peethake dayamaado paraak
Daya maado manege srikrishna

3. Yadukula nandana nee baaro
Madhuraanaathane nee baaro
Madagajagamanane baaro nee
Prasanna vadaneyaraarati belaguvaro deva
Dayamaado manege srikrishna deva`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Karevaru Baa Manege',
      firstLine: 'Karevaru baa manege srikrishna',
      lyrics: `ಪಲ್ಲವಿ:
ಕರೆವರು ಬಾ ಮನೆಗೆ ಶ್ರೀಕೃಷ್ಣ

ಅನುಪಲ್ಲವಿ:
ಮೂ ಜಗಂಗಳಿಗೇ ರಾಜಾಧಿರಾಜ
ರಾಜಿಸುತಿರುವ ಸೋಜಿಗದ ಬಲು
ಸೋಜಿಗದ ಮನೆಗೆ ಬಾ ಶ್ರೀಕೃಷ್ಣ 

ಚರಣಗಳು:
೧. ಸಾರಸಲೋಚನ ಭೀಷ್ಮಕ ಕುವರಿ
ನೂರು ವಿಧದ ಬಲು ಪರಿಮಳದಾ
ಚಾರು ಕುಸುಮಗಳ ಹಾರವ ಪಿಡಿದು
ಮಾರು ಜನಕ ನಿನ್ನ ಕೋರುವಳೋ
ಗಂಭೀರದಲಿ ಮನೆಗೆ ಬಾ ಶ್ರೀಕೃಷ್ಣ

೨. ಚಿತ್ತಜನಯ್ಯನ ಚಿತ್ರದ ರಾಣಿ
ಯತ್ನದಿ ನಿನ್ನ ಕರೆಸಿದಳು
ಚಿತ್ರವಿಚಿತ್ರದ ಮುತ್ತು ರತ್ನಗಳ
ಉತ್ತಮ ಪೀಠಕೆ ದಯಮಾಡೋ ಪರಾಕ್
ದಯ ಮಾಡೋ ಮನೆಗೆ ಶ್ರೀಕೃಷ್ಣ

೩. ಯದುಕುಲ ನಂದನ ನೀ ಬಾರೋ
ಮಧುರಾನಾಥನೆ ನೀ ಬಾರೋ
ಮದಗಜಗಮನನೆ ಬಾರೋ ನೀ
ಪ್ರಸನ್ನ ವದನೆಯರಾರತಿ ಬೆಳಗುವರೊ ದೇವ
ದಯಮಾಡೋ ಮನೆಗೆ ಶ್ರೀಕೃಷ್ಣ ದೇವ`,
      transliteration: `Pallavi:
Karevaru baa manege srikrishna

Anupallavi:
Moo jagangalige rajaadhiraaja
Raajisutiruva sojigada balu
Sojigada manege baa srikrishna

Charanagalu:
1. Saarasalochana bheeshmaka kuvari
Nooru vidhada balu parimaladaa
Chaaru kusumagala haarava pididu
Maaru janaka ninna koruvalo
Gambheeradali manege baa srikrishna

2. Chittajanayyana chitrada raani
Yatnadi ninna karesidalu
Chitravichitrada muttu ratnagala
Uttama peethake dayamaado paraak
Daya maado manege srikrishna

3. Yadukula nandana nee baaro
Madhuraanaathane nee baaro
Madagajagamanane baaro nee
Prasanna vadaneyaraarati belaguvaro deva
Dayamaado manege srikrishna deva`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
They are calling You! Come home, Sri Krishna!

Anupallavi:
O Emperor of the three worlds!
To this wonderful, highly
Wondrous home where You shine, come Sri Krishna!

Charanagalu:
1. The lotus-eyed daughter of Bhishmaka (Rukmini)
Holding a garland of beautiful flowers
Filled with hundreds of sweet fragrances,
She, the mother of Manmatha (Pradyumna), is desiring You!
Come home majestically, Sri Krishna!

2. The beautiful queen of the father of Manmatha,
Has eagerly invited You!
Please grace the supreme throne
Adorned with wonderful pearls and gems!
Please grace our home, Sri Krishna!

3. O Son of the Yadu dynasty, please come!
O Lord of Mathura, please come!
O One with the gait of a majestic elephant, please come!
Those with pleasant faces are waving the arati to You, O Lord!
Please grace our home, Sri Krishna Deva!`;
  
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
