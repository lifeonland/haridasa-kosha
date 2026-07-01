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
  const ragaId = await getOrCreateRaga('Nadanamakriya');
  const talaId = await getOrCreateTala('Adi');

  // Find existing vadiraja-tirtha to get proper references
  const composer = await prisma.composer.findUnique({ where: { id: 'vadiraja-tirtha' } });
  
  if (!composer) {
    console.log("vadiraja-tirtha not found, make sure he exists!");
    return;
  }
  
  const ankita = await prisma.ankita.upsert({
      where: { name: 'Hayavadana' },
      update: {},
      create: { name: 'Hayavadana' }
  });
  
  const deity = await prisma.deity.upsert({
      where: { name: 'Lakshmi Narayana' },
      update: {},
      create: { name: 'Lakshmi Narayana' }
  });

  const id = 'vadiraja-tirtha-1';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Aanandamayage Chinmayage',
      firstLine: 'Aanandamayage chinmayage lakshmee',
      lyrics: `ಪಲ್ಲವಿ:
ಆನಂದಮಯಗೆ ಚಿನ್ಮಯಗೆ ಲಕ್ಷ್ಮೀ
ನಾರಾಯಣಗಾರುತಿಯೆತ್ತಿರೆ 

ಚರಣಗಳು:
೧. ವೇದವ ತಂದು ಬೆಟ್ಟವ ಹೊತ್ತು ಧರಣಿಯ
ಸಾಧಿಸಿ ಕಂಬದೊಳುದಿಸಿದಗೆ
ಭೂದಾನವ ಬೇಡಿ ನೃಪರ ಸಂಹರಿಸಿದ
ಆದಿಮೂರುತಿಗಾರುತಿ ಎತ್ತಿರೆ 

೨. ಇಂದುವದನೆ ಸೀತೆ ಸಹಿತಲರಣ್ಯದಿ
ನಂದಗೋಕುಲದಲ್ಲಿ ನಲಿದವಗೆ
ಮಂದಗಮನೆಯರ ಮುಂದೆ ನಿರ್ವಾಣದಿ
ನಿಂದ ಮೂರುತಿಗಾರುತಿಯೆತ್ತಿರೆ

೩. ತುರಗವನೇರಿ ದುಷ್ಟರ ಸೀಳಿ ಸುಜನರ
ಪೊರೆವ ಮಂಗಳ ಹಯವದನನಿಗೆ
ವರದ ವೇಲಾಪುರ ಚೆನ್ನಿಗರಾಯನ
ಚರಣಕಮಲಕಾರುತಿ ಎತ್ತಿರೆ`,
      transliteration: `Pallavi:
Aanandamayage chinmayage lakshmee
Naaraayanagaarutiyettire

Charanagalu:
1. Vedava tandu bettava hottu dharaniya
Saadhisi kambadoludisidage
Bhoodaanava bedi nrupara samharisida
Aadimoorutigaaruti ettire

2. Induvadane seete sahitalaranyadi
Nandagokuladalli nalidavage
Mandagamaneyara munde nirvaanadi
Ninda moorutigaarutiyettire

3. Turagavaneri dushtara seeli sujanara
Poreva mangala hayavadananige
Varada velaapura chennigaraayana
Charanakamalakaaruti ettire`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Aanandamayage Chinmayage',
      firstLine: 'Aanandamayage chinmayage lakshmee',
      lyrics: `ಪಲ್ಲವಿ:
ಆನಂದಮಯಗೆ ಚಿನ್ಮಯಗೆ ಲಕ್ಷ್ಮೀ
ನಾರಾಯಣಗಾರುತಿಯೆತ್ತಿರೆ 

ಚರಣಗಳು:
೧. ವೇದವ ತಂದು ಬೆಟ್ಟವ ಹೊತ್ತು ಧರಣಿಯ
ಸಾಧಿಸಿ ಕಂಬದೊಳುದಿಸಿದಗೆ
ಭೂದಾನವ ಬೇಡಿ ನೃಪರ ಸಂಹರಿಸಿದ
ಆದಿಮೂರುತಿಗಾರುತಿ ಎತ್ತಿರೆ 

೨. ಇಂದುವದನೆ ಸೀತೆ ಸಹಿತಲರಣ್ಯದಿ
ನಂದಗೋಕುಲದಲ್ಲಿ ನಲಿದವಗೆ
ಮಂದಗಮನೆಯರ ಮುಂದೆ ನಿರ್ವಾಣದಿ
ನಿಂದ ಮೂರುತಿಗಾರುತಿಯೆತ್ತಿರೆ

೩. ತುರಗವನೇರಿ ದುಷ್ಟರ ಸೀಳಿ ಸುಜನರ
ಪೊರೆವ ಮಂಗಳ ಹಯವದನನಿಗೆ
ವರದ ವೇಲಾಪುರ ಚೆನ್ನಿಗರಾಯನ
ಚರಣಕಮಲಕಾರುತಿ ಎತ್ತಿರೆ`,
      transliteration: `Pallavi:
Aanandamayage chinmayage lakshmee
Naaraayanagaarutiyettire

Charanagalu:
1. Vedava tandu bettava hottu dharaniya
Saadhisi kambadoludisidage
Bhoodaanava bedi nrupara samharisida
Aadimoorutigaaruti ettire

2. Induvadane seete sahitalaranyadi
Nandagokuladalli nalidavage
Mandagamaneyara munde nirvaanadi
Ninda moorutigaarutiyettire

3. Turagavaneri dushtara seeli sujanara
Poreva mangala hayavadananige
Varada velaapura chennigaraayana
Charanakamalakaaruti ettire`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Wave the arati to the blissful, pure consciousness,
To Sri Lakshmi Narayana!

Charanagalu:
1. He who brought back the Vedas (Matsya), bore the mountain (Kurma), and rescued the earth (Varaha),
Who emerged from the pillar (Narasimha),
Who asked for the gift of land (Vamana), and who destroyed kings (Parashurama),
Wave the arati to this primal form!

2. He who was with the moon-faced Sita in the forest (Rama),
Who played joyfully in Nanda Gokula (Krishna),
And who stood naked before the slow-walking women (Buddha/Jina),
Wave the arati to this form!

3. He who rides a horse and destroys the wicked to protect the virtuous (Kalki),
To the auspicious Lord Hayavadana,
To the lotus feet of the boon-giving Chennigaraya of Velapura (Belur),
Wave the arati!`;
  
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
