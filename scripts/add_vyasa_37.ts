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
  const ragaId = await getOrCreateRaga('Mohana');
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

  const id = 'vyasatirtha-37';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Kangalige Habbavaayitayya',
      firstLine: 'Kangalige habbavaayitayya',
      lyrics: `ಪಲ್ಲವಿ:
ಕಂಗಳಿಗೆ ಹಬ್ಬವಾಯಿತಯ್ಯ

ಅನುಪಲ್ಲವಿ:
ಮಂಗಳಾತ್ಮಕ ಪುರಂದರದಾಸರನು ಕಂಡು

ಚರಣಗಳು:
೧. ಸಕಲ ತೀರ್ಥಕ್ಷೇತ್ರಯಾತ್ರೆ ಮಾಡಿದ ಫಲವು
ಸಕಲಸತ್ಕರ್ಮ ಸಾಧಿಸಿದ ಫಲವು
ಭಕುತಿಯಿಂ ಭಾಗೀರಥೀಮಜ್ಜನದ ಫಲವು
ರುಕುಮಿಣಿಪತಿಯ ಪದಭಕುತರನು ಕಂಡು

೨. ಇವರ ನರರೆಂದವರು ನರಕದಲಿ ಬೀಳುವರು
ಕವಿಜನರು ಒಪ್ಪಿ ಕೈಹೊಡೆದು ಹೇಳಿರಲು
ಅವನಿಯೊಳಗತಿ ದುರ್ಲಭವು ನಂದಗೋಪನ್ನ
ಕುವರನಿದ್ದೆಡೆಯೆ ವೈಕುಂಠವೆಂಬುವರ ಕಂಡು

೩. ಧನ್ಯನಾದೆನು ನಾನು ಮನುಜ ಜನ್ಮದಿ ಹುಟ್ಟಿ
ಮಾನ್ಯನಾದೆನು ಇನ್ನು ಈ ಜಗದೊಳಗೆ
ಪನ್ನಗಶಯನ ಶ್ರೀಕೃಷ್ಣನ ದಾಸರನು
ಚೆನ್ನಾಗಿ ಸ್ಮರಿಸಿ ಪಾವನನಾದೆನಿಂದು`,
      transliteration: `Pallavi:
Kangalige habbavaayitayya

Anupallavi:
Mangalaatmaka purandaradaasaranu kandu

Charanagalu:
1. Sakala teerthakshetrayaatre maadida phalavu
Sakalasatkarama saadhisida phalavu
Bhakutiyim bhaageeratheemajjanada phalavu
Rukuminipatiya padabhakutaranu kandu

2. Ivara nararendavaru narakadali beeluvaru
Kavijanaru oppi kaihodedu heliralu
Avaniyolagati durlabhavu nandagopanna
Kuvaraniddedeye vaikunthavembuvara kandu

3. Dhanyanaadenu naanu manuja janmadi hutti
Maanyanaadenu innu ee jagadolage
Pannagashayana srikrishnana daasaranu
Chennaagi smarisi paavananaadenindu`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Kangalige Habbavaayitayya',
      firstLine: 'Kangalige habbavaayitayya',
      lyrics: `ಪಲ್ಲವಿ:
ಕಂಗಳಿಗೆ ಹಬ್ಬವಾಯಿತಯ್ಯ

ಅನುಪಲ್ಲವಿ:
ಮಂಗಳಾತ್ಮಕ ಪುರಂದರದಾಸರನು ಕಂಡು

ಚರಣಗಳು:
೧. ಸಕಲ ತೀರ್ಥಕ್ಷೇತ್ರಯಾತ್ರೆ ಮಾಡಿದ ಫಲವು
ಸಕಲಸತ್ಕರ್ಮ ಸಾಧಿಸಿದ ಫಲವು
ಭಕುತಿಯಿಂ ಭಾಗೀರಥೀಮಜ್ಜನದ ಫಲವು
ರುಕುಮಿಣಿಪತಿಯ ಪದಭಕುತರನು ಕಂಡು

೨. ಇವರ ನರರೆಂದವರು ನರಕದಲಿ ಬೀಳುವರು
ಕವಿಜನರು ಒಪ್ಪಿ ಕೈಹೊಡೆದು ಹೇಳಿರಲು
ಅವನಿಯೊಳಗತಿ ದುರ್ಲಭವು ನಂದಗೋಪನ್ನ
ಕುವರನಿದ್ದೆಡೆಯೆ ವೈಕುಂಠವೆಂಬುವರ ಕಂಡು

೩. ಧನ್ಯನಾದೆನು ನಾನು ಮನುಜ ಜನ್ಮದಿ ಹುಟ್ಟಿ
ಮಾನ್ಯನಾದೆನು ಇನ್ನು ಈ ಜಗದೊಳಗೆ
ಪನ್ನಗಶಯನ ಶ್ರೀಕೃಷ್ಣನ ದಾಸರನು
ಚೆನ್ನಾಗಿ ಸ್ಮರಿಸಿ ಪಾವನನಾದೆನಿಂದು`,
      transliteration: `Pallavi:
Kangalige habbavaayitayya

Anupallavi:
Mangalaatmaka purandaradaasaranu kandu

Charanagalu:
1. Sakala teerthakshetrayaatre maadida phalavu
Sakalasatkarama saadhisida phalavu
Bhakutiyim bhaageeratheemajjanada phalavu
Rukuminipatiya padabhakutaranu kandu

2. Ivara nararendavaru narakadali beeluvaru
Kavijanaru oppi kaihodedu heliralu
Avaniyolagati durlabhavu nandagopanna
Kuvaraniddedeye vaikunthavembuvara kandu

3. Dhanyanaadenu naanu manuja janmadi hutti
Maanyanaadenu innu ee jagadolage
Pannagashayana srikrishnana daasaranu
Chennaagi smarisi paavananaadenindu`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
It was a feast for my eyes!

Anupallavi:
Upon seeing the auspicious-souled Purandara Dasa!

Charanagalu:
1. It is the fruit of undertaking pilgrimage to all holy rivers and shrines,
It is the fruit of achieving all virtuous deeds,
It is the fruit of bathing with devotion in the river Bhagirathi (Ganga),
Upon seeing the devotee of the feet of Rukmini's Lord!

2. Those who call him an ordinary human will fall into hell;
As the wise poets have agreed and declared it aloud!
It is exceedingly rare on this earth,
To see those who declare that wherever the son of Nanda Gopa (Krishna) resides, that itself is Vaikuntha!

3. I have become blessed by being born in this human birth,
I have become respected now in this world!
By beautifully remembering the servant of Sri Krishna, who reclines on a serpent,
I have become purified today!`;
  
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
