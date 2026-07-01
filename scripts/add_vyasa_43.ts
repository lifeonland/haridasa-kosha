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
  const ragaId = await getOrCreateRaga('Anandabhairavi');
  const talaId = await getOrCreateTala('Trishra Chapu');

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

  const id = 'vyasatirtha-43';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Tore Begane',
      firstLine: 'Tore begane toyajanayane madavaaranagamane',
      lyrics: `ಪಲ್ಲವಿ:
ತೋರೆ ಬೇಗನೆ ತೋಯಜನಯನೆ ಮದವಾರಣಗಮನೆ

ಅನುಪಲ್ಲವಿ:
ಮಾರನ ತಾಪವ ಸೈರಿಸಲಾರೆನೆ ನೀರೆ ನಿನಗೆ ಮುತ್ತಿನ್ಹಾರವ ಕೊಡುವೆನೆ

ಚರಣಗಳು:
೧. ನೀರೊಳು ಮುಳುಮುಳುಗಾಡುತ ಬಂದು ಮಥಿಸಿದ ಪಯಸ್ಸಿಂಧು
ಧಾರುಣಿ ಚಿಮ್ಮಿ ಮೇಲಕೆ ತಂದು ದನುಜನ ಕೊಂದು
ಮೂರು ಪಾದವ ಬೇಡುತ ನಿಂದು ಮುನಿಕುಲದಲಿ ಬಂದು
ನಾರಿಯಬಿಟ್ಟು ಪರನಾರಿಯರಾಳಿದ ತೋರಿ ಬತ್ತಲೆ ಹಯವೇರಿ ಮೆರೆದನ

೨. ಕತ್ತಲೆಯೊಡನೆ ಕಾದಿದ ಧೀರ ನೆಗದಿದ ಮಂದರ
ಕಿತ್ತುಮಣ್ಣಗೆದ್ದು ಮೆದ್ದನು ಬೇರ ದಾನವ ಸಂಹಾರ
ಒತ್ತಿದ್ದ ಬಲಿಯನು ಕಾಯ್ದನು ಶೂರ ಕುಜನಕುಠಾರ
ಹತ್ತು ಶಿರನ ಕತ್ತರಿಸಿ ಗೋಕುಲದೊಳು ಬತ್ತಲೆ ರಾವುತನಾಗಿ ಮೆರೆದನ

೩. ನಿಗಮ ಕದ್ದವನ ನೀಗಿದ ದಿಟ್ಟ ನೆಗದಿದ ಘನಬೆಟ್ಟ
ಮಿಗಿಲೊಯಿದು ಸ್ವಾಹಸ್ಥಳದೊಳಿಟ್ಟ ಫಾಡಿ ಘಡಿಸುವ ದಿಟ್ಟ
ಜಗವೆಲ್ಲ ನೋಡೆ ಎರಡಡಿಯಿಟ್ಟ ಕೊಡಲಿಯ ಪೆಟ್ಟ
ಮೃಗವಕೆಡಹಿ ಕುಂತಿಮಗಗೆ ಸಾರಥಿಯಾಗಿ ಜಗವ ಮೋಹಿಸಿ ಹಯವೇರ್ದ ಶ್ರೀಕೃಷ್ಣನ`,
      transliteration: `Pallavi:
Tore begane toyajanayane madavaaranagamane

Anupallavi:
Maarana taapava sairisalaarene neere ninage muttinhaarava koduvene

Charanagalu:
1. Neerolu mulumulugaaduta bandu mathisida payassindhu
Dhaaruni chimmi melake tandu danujana kondu
Mooru paadava beduta nindu munikuladali bandu
Naariyabittu paranaariyaraalida tori battale hayaveri meredana

2. Kattaleyodane kaadida dheera negadida mandara
Kittumannageddu meddanu bera daanava samhaara
Ottidda baliyanu kaaydanu shoora kujanakuthaara
Hattu shirana kattarisi gokuladolu battale raavutanaagi meredana

3. Nigama kaddavana neegida ditta negadida ghanabetta
Migiloyidu svaahasthaladolitta phaadi ghadisuva ditta
Jagavella node eradadiyitta kodaliya petta
Mrugavakedahi kuntimagage saarathiyaagi jagava mohisi hayaverda shreekrishnana`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Tore Begane',
      firstLine: 'Tore begane toyajanayane madavaaranagamane',
      lyrics: `ಪಲ್ಲವಿ:
ತೋರೆ ಬೇಗನೆ ತೋಯಜನಯನೆ ಮದವಾರಣಗಮನೆ

ಅನುಪಲ್ಲವಿ:
ಮಾರನ ತಾಪವ ಸೈರಿಸಲಾರೆನೆ ನೀರೆ ನಿನಗೆ ಮುತ್ತಿನ್ಹಾರವ ಕೊಡುವೆನೆ

ಚರಣಗಳು:
೧. ನೀರೊಳು ಮುಳುಮುಳುಗಾಡುತ ಬಂದು ಮಥಿಸಿದ ಪಯಸ್ಸಿಂಧು
ಧಾರುಣಿ ಚಿಮ್ಮಿ ಮೇಲಕೆ ತಂದು ದನುಜನ ಕೊಂದು
ಮೂರು ಪಾದವ ಬೇಡುತ ನಿಂದು ಮುನಿಕುಲದಲಿ ಬಂದು
ನಾರಿಯಬಿಟ್ಟು ಪರನಾರಿಯರಾಳಿದ ತೋರಿ ಬತ್ತಲೆ ಹಯವೇರಿ ಮೆರೆದನ

೨. ಕತ್ತಲೆಯೊಡನೆ ಕಾದಿದ ಧೀರ ನೆಗದಿದ ಮಂದರ
ಕಿತ್ತುಮಣ್ಣಗೆದ್ದು ಮೆದ್ದನು ಬೇರ ದಾನವ ಸಂಹಾರ
ಒತ್ತಿದ್ದ ಬಲಿಯನು ಕಾಯ್ದನು ಶೂರ ಕುಜನಕುಠಾರ
ಹತ್ತು ಶಿರನ ಕತ್ತರಿಸಿ ಗೋಕುಲದೊಳು ಬತ್ತಲೆ ರಾವುತನಾಗಿ ಮೆರೆದನ

೩. ನಿಗಮ ಕದ್ದವನ ನೀಗಿದ ದಿಟ್ಟ ನೆಗದಿದ ಘನಬೆಟ್ಟ
ಮಿಗಿಲೊಯಿದು ಸ್ವಾಹಸ್ಥಳದೊಳಿಟ್ಟ ಫಾಡಿ ಘಡಿಸುವ ದಿಟ್ಟ
ಜಗವೆಲ್ಲ ನೋಡೆ ಎರಡಡಿಯಿಟ್ಟ ಕೊಡಲಿಯ ಪೆಟ್ಟ
ಮೃಗವಕೆಡಹಿ ಕುಂತಿಮಗಗೆ ಸಾರಥಿಯಾಗಿ ಜಗವ ಮೋಹಿಸಿ ಹಯವೇರ್ದ ಶ್ರೀಕೃಷ್ಣನ`,
      transliteration: `Pallavi:
Tore begane toyajanayane madavaaranagamane

Anupallavi:
Maarana taapava sairisalaarene neere ninage muttinhaarava koduvene

Charanagalu:
1. Neerolu mulumulugaaduta bandu mathisida payassindhu
Dhaaruni chimmi melake tandu danujana kondu
Mooru paadava beduta nindu munikuladali bandu
Naariyabittu paranaariyaraalida tori battale hayaveri meredana

2. Kattaleyodane kaadida dheera negadida mandara
Kittumannageddu meddanu bera daanava samhaara
Ottidda baliyanu kaaydanu shoora kujanakuthaara
Hattu shirana kattarisi gokuladolu battale raavutanaagi meredana

3. Nigama kaddavana neegida ditta negadida ghanabetta
Migiloyidu svaahasthaladolitta phaadi ghadisuva ditta
Jagavella node eradadiyitta kodaliya petta
Mrugavakedahi kuntimagage saarathiyaagi jagava mohisi hayaverda shreekrishnana`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Show Him to me quickly, O lotus-eyed one, the one with the gait of a majestic elephant!

Anupallavi:
I cannot bear the torment of Manmatha (Cupid), O maiden, I will give you a pearl necklace!

Charanagalu:
1. Plunging deep into the waters (as Matsya), He churned the ocean of milk (as Kurma),
He lifted the earth from the depths (as Varaha) and killed the demon (as Narasimha).
He stood asking for three paces of land (as Vamana), born in the lineage of sages (as Parashurama),
Leaving His wife and ruling over others' wives (as Krishna), He rode the horse naked (as Kalki)!

2. The brave one who fought the darkness, the one who lifted the Mandara mountain,
The one who dug the earth and ate the root, the destroyer of demons,
The brave one who protected the pushed-down Bali, the axe to the wicked,
The one who severed the ten heads (as Rama), and paraded as a naked rider in Gokula!

3. The brave one who destroyed the thief of the Vedas, the one who lifted the great mountain,
The brave one who brought and placed it in the fire-pit,
Who took two steps while the whole world watched, the one who struck with the axe,
Who killed the beast and became the charioteer to Kunti's son (Arjuna), mesmerizing the world, Sri Krishna who rode the horse!`;
  
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
