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
  const ragaId = await getOrCreateRaga('Brindavana Saranga');
  const talaId = await getOrCreateTala('Triputa');

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

  const id = 'vyasatirtha-51';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Ranga Banda Brundaavanadali',
      firstLine: 'Ranga banda brundaavanadali ninda',
      lyrics: `ಪಲ್ಲವಿ:
ರಂಗ ಬಂದ ಬೃಂದಾವನದಲಿ ನಿಂದ
ಕೊಳಲಿನ ಧ್ವನಿ ಬಹು ಚೆಂದ

ಅನುಪಲ್ಲವಿ:
ನಂದಗೋಪಿಯರ ಕಂದ ಮುಕುಂದ
ಸುಂದರಿಯರ ಆನಂದಾರವಿಂದ

ಚರಣಗಳು:
೧. ಮಂದಗಮನೇರ ಕೂಡಿ ಸರಸವನಾಡುತ್ತ
ಇಂದಿರೆಯರಸ ನಗುತ ಕೊಳಲನೂದುತ್ತ
ಎಂದೆಂದಿಗೂ ತನ್ನ ನಂಬಿದ ಭಕುತರ
ಬಂದು ಪೊರೆವ ಗೋವಿಂದ ಮುಕುಂದ

೨. ಉದಧಿ ಸಂಚಾರ ಗುಣಗಂಭೀರ ನವನೀತ
ದಧಿಭಾಂಡಚೋರ ರುಕ್ಮಿಣೀ ಮನೋಹರ
ಮದನಗೋಪಾಲನು ಭಜಿಸುವ ಭಕುತರ
ಹೃದಯದೊಳಗೆ ನಿಂದು ಪದವಿಯ ಕೊಡುವ

೩. ಮಧುರೆಯಿಂದಲಿ ಬಂದ ಮಾವನ್ನ ಕೊಂದ
ಕಡೆಗೋಲ ನೇಣ ಕೈಲಿ ಪಿಡಿದ ದ್ವಾರಕಾವಾಸ
ಹಡಗಿನಿಂದಲಿ ಬಂದು ಉಡುಪಿಲಿ ನೆಲೆಸಿದ
ಬಿಡದೆ ಪೂಜೆಗೊಂಬ ಒಡೆಯ ಶ್ರೀಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Ranga banda brundaavanadali ninda
Kolalina dhvani bahu chenda

Anupallavi:
Nandagopiyara kanda mukunda
Sundariyara aanandaaravinda

Charanagalu:
1. Mandagamaneera koodi sarasavanaadutta
Indireyarasa naguta kolalanoodutta
Endendigoo tanna nambida bhakutara
Bandu poreva govinda mukunda

2. Udadhi sanchaara gunagambheera navaneeta
Dadhibhaandachora rukminee manohara
Madanagopaalanu bhajisuva bhakutara
Hrudayadolage nindu padaviya koduva

3. Madhureyindali banda maavanna konda
Kadegola nena kaili pidida dvaarakavaasa
Hadaginindali bandu udupili nelesida
Bidade poojegomba odeya shreekrishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Ranga Banda Brundaavanadali',
      firstLine: 'Ranga banda brundaavanadali ninda',
      lyrics: `ಪಲ್ಲವಿ:
ರಂಗ ಬಂದ ಬೃಂದಾವನದಲಿ ನಿಂದ
ಕೊಳಲಿನ ಧ್ವನಿ ಬಹು ಚೆಂದ

ಅನುಪಲ್ಲವಿ:
ನಂದಗೋಪಿಯರ ಕಂದ ಮುಕುಂದ
ಸುಂದರಿಯರ ಆನಂದಾರವಿಂದ

ಚರಣಗಳು:
೧. ಮಂದಗಮನೇರ ಕೂಡಿ ಸರಸವನಾಡುತ್ತ
ಇಂದಿರೆಯರಸ ನಗುತ ಕೊಳಲನೂದುತ್ತ
ಎಂದೆಂದಿಗೂ ತನ್ನ ನಂಬಿದ ಭಕುತರ
ಬಂದು ಪೊರೆವ ಗೋವಿಂದ ಮುಕುಂದ

೨. ಉದಧಿ ಸಂಚಾರ ಗುಣಗಂಭೀರ ನವನೀತ
ದಧಿಭಾಂಡಚೋರ ರುಕ್ಮಿಣೀ ಮನೋಹರ
ಮದನಗೋಪಾಲನು ಭಜಿಸುವ ಭಕುತರ
ಹೃದಯದೊಳಗೆ ನಿಂದು ಪದವಿಯ ಕೊಡುವ

೩. ಮಧುರೆಯಿಂದಲಿ ಬಂದ ಮಾವನ್ನ ಕೊಂದ
ಕಡೆಗೋಲ ನೇಣ ಕೈಲಿ ಪಿಡಿದ ದ್ವಾರಕಾವಾಸ
ಹಡಗಿನಿಂದಲಿ ಬಂದು ಉಡುಪಿಲಿ ನೆಲೆಸಿದ
ಬಿಡದೆ ಪೂಜೆಗೊಂಬ ಒಡೆಯ ಶ್ರೀಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Ranga banda brundaavanadali ninda
Kolalina dhvani bahu chenda

Anupallavi:
Nandagopiyara kanda mukunda
Sundariyara aanandaaravinda

Charanagalu:
1. Mandagamaneera koodi sarasavanaadutta
Indireyarasa naguta kolalanoodutta
Endendigoo tanna nambida bhakutara
Bandu poreva govinda mukunda

2. Udadhi sanchaara gunagambheera navaneeta
Dadhibhaandachora rukminee manohara
Madanagopaalanu bhajisuva bhakutara
Hrudayadolage nindu padaviya koduva

3. Madhureyindali banda maavanna konda
Kadegola nena kaili pidida dvaarakavaasa
Hadaginindali bandu udupili nelesida
Bidade poojegomba odeya shreekrishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Ranga has come and stood in Brindavana!
The sound of His flute is very beautiful!

Anupallavi:
He is the child of Nanda and Gopi, Mukunda!
He is the lotus of joy for the beautiful women!

Charanagalu:
1. Mingling with the slow-walking women and playing with them,
The Lord of Indira (Lakshmi) smiles and plays the flute!
For all eternity, to the devotees who trust Him,
Govinda Mukunda comes and protects them!

2. He who moves on the ocean, whose majestic nature is profound, the butter-thief,
The stealer of the pot of yogurt, the enchanter of Rukmini's mind!
Madanagopala stands in the hearts of the devotees who worship Him,
And grants them liberation (padavi)!

3. He came from Mathura and killed His uncle (Kamsa),
Holding the churning rod and rope in His hand, He is the resident of Dwaraka!
Arriving by ship, He settled in Udupi,
The Lord Sri Krishna who accepts unceasing worship!`;
  
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
