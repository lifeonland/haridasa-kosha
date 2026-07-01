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
  const ragaId = await getOrCreateRaga('Shahana');
  const talaId = await getOrCreateTala('Chapu');

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

  const id = 'vyasatirtha-49';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Yaake Brundaavanavu',
      firstLine: 'Yaake brundaavanavu yaake gokula namage',
      lyrics: `ಪಲ್ಲವಿ:
ಯಾಕೆ ಬೃಂದಾವನವು ಯಾಕೆ ಗೋಕುಲ ನಮಗೆ
ಯಾಕೆ ಬಂದೆಯೊ ಉದ್ಧವ

ಅನುಪಲ್ಲವಿ:
ಯಾಕೆ ಸ್ನೇಹದ ಮಾತು ಲೋಕಮೋಹಕ ತಾನು
ಆ ಕುಬುಜೆಯನೆ ಕೂಡಿದ ಉದ್ಧವ 

ಚರಣಗಳು:
೧. ಬಿಲ್ಲುಗಾರನಯ್ಯನ ಬೇಟ ನಗೆ ಕುಡಿನೋಟ
ವಿಲ್ಲದಂತಾಯಿತಲ್ಲ
ತಲ್ಲಣಿಸುತಿದೆ ದೇಹ ತಾಪಮೈಯೊಳು ಹೆಚ್ಚಿ
ಪರವಶವಾಯಿತಲ್ಲೊ
ಎಲ್ಲರನು ಅಗಲಿಸಿದ ಮಿಲ್ಲ ಅಕ್ರೂರ ನ-
ಮ್ಮೊಲ್ಲಭನ ಕರೆದೊಯ್ದನೊ
ಮಲ್ಲರನು ಮರ್ದಿಸಿದ ಮಾವ ಕಂಸನ ಕೊಂದ
ವಲ್ಲಭನ ತೋರಿಸಯ್ಯ

೨. ಅನುದಿನವು ಆದರಿಸಿ ಅಧರಾಮೃತವನಿತ್ತು
ಆನಂದವನು ತೋರುವ
ಮನದ ಮರ್ಮವ ತಿಳಿದು ಮನಸಿಜನಯ್ಯನು
ಮಧುರ ಮಾತಲಿ ದಣಿಸುವ
ಕನಸಿನೊಳು ಕಂಡ ತೆರನಾಯಿತು
ಮುನಿವಂದ್ಯ ತಾನೆಬಲ್ಲ
ವನಜಾಕ್ಷ ವಾಸುದೇವನ ತಂದು ತೋರಿಸಿ
ಒಡಗೂಡಿಸಯ್ಯ ನೀನೇ ಉದ್ಧವ

೩. ಕರುಣಿ ನೀನೆಂಬರ ಕಪಟನಾಟಕದವನ
ಸರಸ ವಿರಸ ಮಾಡಿದ
ಸ್ಮರಿಸಿದವರನು ಕಾಯ್ವ ಶರಣಜನ ಪರಿಪಾಲ
ತೊರೆದನ್ಯಾತಕೊ ಎಮ್ಮನು
ತ್ವರ್ರಿತದಿಂದಲಿ ಪೋಗಿ ತರುಣೆಯರ ಗೋಳ್ಕೇಳಿ
ಬರಮಾಡಬೇಕೆಂಬೆವೊ
ನೆರೆ ನಂಬಿದವರನು ಪೊರೆವ ಶ್ರೀಕೃಷ್ಣ ನೀ
ಪರಿಯೆಲ್ಲ ಪೇಳಿ ಬಾರೊ ಉದ್ಧವ`,
      transliteration: `Pallavi:
Yaake brundaavanavu yaake gokula namage
Yaake bandeyo uddhava

Anupallavi:
Yaake snehada maatu lokamohaka taanu
Aa kubujeyane koodida uddhava

Charanagalu:
1. Billugaaranayyana beta nage kudinota
Villadantaayitalla
Tallanisutide deha taapamaiyolu hecchi
Paravashavaayitallo
Ellaranu agalisida milla akroora na-
Mmolabhana karedoydano
Mallaranu mardisida maava kamsana konda
Vallabhana torisayya

2. Anudinavu aadarisi adharaamrutavanittu
Aanandavanu toruva
Manada marmava tilidu manasijanayyanu
Madhura maatali danisuva
Kanasinolu kanda teranaayitu
Munivandya taaneballa
Vanajaaksha vaasudevana tandu torisi
Odaguudisayya neene uddhava

3. Karuni neenemba kapata naatakadavana
Sarasa virasa maadida
Smarisidavaranu kaayva sharanajana paripaala
Toredanyaatako emmanu
Tvarritadindali pogi taruneyara golkeli
Baramaadabekemba
Nere nambidavaranu poreva shreekrishna nee
Pariyella peli baaro uddhava`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Yaake Brundaavanavu',
      firstLine: 'Yaake brundaavanavu yaake gokula namage',
      lyrics: `ಪಲ್ಲವಿ:
ಯಾಕೆ ಬೃಂದಾವನವು ಯಾಕೆ ಗೋಕುಲ ನಮಗೆ
ಯಾಕೆ ಬಂದೆಯೊ ಉದ್ಧವ

ಅನುಪಲ್ಲವಿ:
ಯಾಕೆ ಸ್ನೇಹದ ಮಾತು ಲೋಕಮೋಹಕ ತಾನು
ಆ ಕುಬುಜೆಯನೆ ಕೂಡಿದ ಉದ್ಧವ 

ಚರಣಗಳು:
೧. ಬಿಲ್ಲುಗಾರನಯ್ಯನ ಬೇಟ ನಗೆ ಕುಡಿನೋಟ
ವಿಲ್ಲದಂತಾಯಿತಲ್ಲ
ತಲ್ಲಣಿಸುತಿದೆ ದೇಹ ತಾಪಮೈಯೊಳು ಹೆಚ್ಚಿ
ಪರವಶವಾಯಿತಲ್ಲೊ
ಎಲ್ಲರನು ಅಗಲಿಸಿದ ಮಿಲ್ಲ ಅಕ್ರೂರ ನ-
ಮ್ಮೊಲ್ಲಭನ ಕರೆದೊಯ್ದನೊ
ಮಲ್ಲರನು ಮರ್ದಿಸಿದ ಮಾವ ಕಂಸನ ಕೊಂದ
ವಲ್ಲಭನ ತೋರಿಸಯ್ಯ

೨. ಅನುದಿನವು ಆದರಿಸಿ ಅಧರಾಮೃತವನಿತ್ತು
ಆನಂದವನು ತೋರುವ
ಮನದ ಮರ್ಮವ ತಿಳಿದು ಮನಸಿಜನಯ್ಯನು
ಮಧುರ ಮಾತಲಿ ದಣಿಸುವ
ಕನಸಿನೊಳು ಕಂಡ ತೆರನಾಯಿತು
ಮುನಿವಂದ್ಯ ತಾನೆಬಲ್ಲ
ವನಜಾಕ್ಷ ವಾಸುದೇವನ ತಂದು ತೋರಿಸಿ
ಒಡಗೂಡಿಸಯ್ಯ ನೀನೇ ಉದ್ಧವ

೩. ಕರುಣಿ ನೀನೆಂಬರ ಕಪಟನಾಟಕದವನ
ಸರಸ ವಿರಸ ಮಾಡಿದ
ಸ್ಮರಿಸಿದವರನು ಕಾಯ್ವ ಶರಣಜನ ಪರಿಪಾಲ
ತೊರೆದನ್ಯಾತಕೊ ಎಮ್ಮನು
ತ್ವರ್ರಿತದಿಂದಲಿ ಪೋಗಿ ತರುಣೆಯರ ಗೋಳ್ಕೇಳಿ
ಬರಮಾಡಬೇಕೆಂಬೆವೊ
ನೆರೆ ನಂಬಿದವರನು ಪೊರೆವ ಶ್ರೀಕೃಷ್ಣ ನೀ
ಪರಿಯೆಲ್ಲ ಪೇಳಿ ಬಾರೊ ಉದ್ಧವ`,
      transliteration: `Pallavi:
Yaake brundaavanavu yaake gokula namage
Yaake bandeyo uddhava

Anupallavi:
Yaake snehada maatu lokamohaka taanu
Aa kubujeyane koodida uddhava

Charanagalu:
1. Billugaaranayyana beta nage kudinota
Villadantaayitalla
Tallanisutide deha taapamaiyolu hecchi
Paravashavaayitallo
Ellaranu agalisida milla akroora na-
Mmolabhana karedoydano
Mallaranu mardisida maava kamsana konda
Vallabhana torisayya

2. Anudinavu aadarisi adharaamrutavanittu
Aanandavanu toruva
Manada marmava tilidu manasijanayyanu
Madhura maatali danisuva
Kanasinolu kanda teranaayitu
Munivandya taaneballa
Vanajaaksha vaasudevana tandu torisi
Odaguudisayya neene uddhava

3. Karuni neenemba kapata naatakadavana
Sarasa virasa maadida
Smarisidavaranu kaayva sharanajana paripaala
Toredanyaatako emmanu
Tvarritadindali pogi taruneyara golkeli
Baramaadabekemba
Nere nambidavaranu poreva shreekrishna nee
Pariyella peli baaro uddhava`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Why this Brindavana? Why this Gokula for us?
Why did you come, O Uddhava?

Anupallavi:
Why these words of friendship? That enchanter of the world
Has joined that Kubja, O Uddhava!

Charanagalu:
1. The father of Manmatha (the archer Cupid), His charming smile and sidelong glances
Are no longer there!
The body trembles, the heat of separation increases within,
And we have become lost in agony!
The cruel Akrura, who separated everyone,
Has taken away our beloved!
He crushed the wrestlers and killed his uncle Kamsa;
Show us that beloved Lord!

2. Everyday He used to care for us, giving the nectar of His lips,
And showing us immense joy!
Understanding the secrets of the heart, the father of Manmatha
Used to satisfy us with sweet words!
It has all become like something seen in a dream!
The one worshipped by sages alone knows!
Bring that lotus-eyed Vasudeva and show Him to us,
You yourself unite us with Him, O Uddhava!

3. You call Him merciful, but that deceitful actor
Has turned our romance into discord!
The protector of those who remember Him, the savior of the surrendered ones,
Why did He abandon us?
Go quickly, tell Him the lament of these young women,
And bring Him back!
The protector of those who completely trust Him, Sri Krishna—
Tell Him everything and bring Him, O Uddhava!`;
  
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
