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
  const ragaId = await getOrCreateRaga('Gaulipantu');
  const talaId = await getOrCreateTala('Ata');

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

  const id = 'vyasatirtha-31';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Endigaadaru Omme',
      firstLine: 'Endigaadaru omme kodu kandya hariye',
      lyrics: `ಪಲ್ಲವಿ:
ಎಂದಿಗಾದರೂ ಒಮ್ಮೆ ಕೊಡು ಕಂಡ್ಯ ಹರಿಯೆ (ಪ.)
ಬೃಂದಾವನಪತಿ ದಯದಿಂದಲೆನಗೆ (ಅ.ಪ.)

ಚರಣಗಳು:
೧. ಫಲಭಾರಗಳಿಂದ ತಲೆವಾಗಿ ಶುಕಪಿಕ
ಕಲಕಲದೊಳು ನಿನ್ನ ತುತಿಸಿ ತುಂಬಿಗಳ
ಗಳರವದಿಂ ಪಾಡಿ ಅಪ್ಸರಂತೆ ಪೂ
ಮಳೆಯಗರೆವ ತರುಲತೆಯ ಜನ್ಮವನು (೧)

೨. ಕೊಳಲ ಶ್ರುತಿಯ ಕೇಳಿ ಸುಖದ ಸಂಭ್ರಮದಲಿ
ಹೊಲಬುತಪ್ಪಿ ತಾವು ಅರೆಗಣ್ಣು ಮುಚ್ಚಿ
ನಳಿನಾಸನದಿ ಮೌನಗೊಂಡು ಪರಮಹಂಸ
ಕುಲದಂತೆ ಧ್ಯಾನಿಪ ಹಂಸಜನ್ಮವನು (೨)

೩. ನವಿಗಳೆಂಬ ಸಂತತ ಪೂರ್ಣಚಂದ್ರನ್ನ
ಅಕಳಂಕ ನವಚಂದ್ರಿಕೆಯನ್ನ ಸವಿದು
ಸುಖದ ಸುಗ್ಗಿಗಳಲ್ಲಿ ಸೊಕ್ಕಿ ಯೋಗಿಗಳಂತೆ
ಅಖಿಲವ ಮರೆತ ಚಕೋರ ಜನ್ಮವನು (೩)

೪. ಭಾವಜನೆಯ್ಯನ ಕಡುಚಳಿಕೆಯನ್ನು
ಭಾವಿಸಿ ನಿಡುಗಂಗಳಿಂದ ದಣಿದುಂಡು
ಗೋವರ್ಲೆರಂತೆ ಮನೆಮಕ್ಕಳ ಹಿಂಗಿ ನಿನ್ನ
ಆವಾಗ ಈಕ್ಷಿಸುವ ಗೋವುಗಳ ಜನ್ಮವನು (೪)

೫. ತೋಳದಂದಿಗೆ ಮಾಡಿ ಹೀಲೆಯ ಚಾಮರವ
ಮೇಲೆ ಎತ್ತಿದ ತಾವರೆಗೊಡೆಯಿಂದ
ಒಲೈಸಿ ನಿನ್ನನು ಒಲಿಸಿ ಮುಕುತರಂತೆ
ಸಾಲೋಕ್ಯ ಸುಖವೆಂಬ ಗೋಪರ ಜನ್ಮವನು (೫)

೬. ಕೊಳಲಧ್ವನಿಯ ಕೇಳಿ ಎದುರುಗೊಳ್ಳುತ ನಿನ್ನ
ನಳಿನನಾಭಾ ಅವಧಾರೆಂದು ಪೊಗಳಿ
ತಳಿಗೆ ಆರತಿಯೆತ್ತಿ ಲಕ್ಷ್ಮಿಯಂತೆ ನಿನ್ನ
ಚೆಲುವ ಸವಿವಂಥ ಗೋಪೇರ ಜನ್ಮವನು (೬)

೭. ಇಂದಿರೆಯರಸ ಬ್ರಹ್ಮೇಂದ್ರಾದಿ ವಂದಿತ
ಎಂದು ಮೊಸರ ಕಡೆಯುತಲಿ ನಿನ್ನ
ಅಂದಿನ ಶ್ರುತಿಯೊಳುಪ್ಪವಡಿಪ ವ್ರಜ
ದಿಂದುಮುಖಿಯರ ಜನ್ಮವ ಸಿರಿಕೃಷ್ಣ (೭)`,
      transliteration: `Pallavi:
Endigaadaru omme kodu kandya hariye (Pa.)
Brundaavanapati dayadindalenage (A.Pa.)

Charanagalu:
1. Phaladhaaragalinda talevaagi shukapika
Kalakaladolu ninna tutisi tumbigala
Galaravadim paadi apsarante poo
Maleyagareva tarulateya janmavanu (1)

2. Kolala shrutiya keli sukhada sambhramadali
Holabutappi taavu aregannu mucchi
Nalinaasanadi mounagondu paramahamsa
Kuladante dhyaanipa hamsajanmavanu (2)

3. Navigalemba santata poornachandranna
Akalanka navachandrikeyanna savidu
Sukhada suggigalalli sokki yogigalante
Akhilava mareta chakora janmavanu (3)

4. Bhaavajaneyyana kaduchalikeyu
Bhaavisi nidugangalinda danidundu
Govarlerante manemakkala hingi ninna
Aavaaga eekshisuva govugala janmavanu (4)

5. Toladandige maadi heeleya chaamarava
Mele ettida taavaregodeyinda
Olaisi ninnanu olisi mukutarante
Saalokya sukhavemba gopara janmavanu (5)

6. Kolaladhvaniya keli edurugolluta ninna
Nalinanaabha avadhaarendu pogali
Talige aaratiyetti lakshmiyante ninna
Cheluva savivantha gopera janmavanu (6)

7. Indireyarasa brahmendraadi vandita
Endu mosara kadeyutali ninna
Andina shrutiyoluppavadipa vraja
Dindumukhiyara janmava sirikrishna (7)`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Endigaadaru Omme',
      firstLine: 'Endigaadaru omme kodu kandya hariye',
      lyrics: `ಪಲ್ಲವಿ:
ಎಂದಿಗಾದರೂ ಒಮ್ಮೆ ಕೊಡು ಕಂಡ್ಯ ಹರಿಯೆ (ಪ.)
ಬೃಂದಾವನಪತಿ ದಯದಿಂದಲೆನಗೆ (ಅ.ಪ.)

ಚರಣಗಳು:
೧. ಫಲಭಾರಗಳಿಂದ ತಲೆವಾಗಿ ಶುಕಪಿಕ
ಕಲಕಲದೊಳು ನಿನ್ನ ತುತಿಸಿ ತುಂಬಿಗಳ
ಗಳರವದಿಂ ಪಾಡಿ ಅಪ್ಸರಂತೆ ಪೂ
ಮಳೆಯಗರೆವ ತರುಲತೆಯ ಜನ್ಮವನು (೧)

೨. ಕೊಳಲ ಶ್ರುತಿಯ ಕೇಳಿ ಸುಖದ ಸಂಭ್ರಮದಲಿ
ಹೊಲಬುತಪ್ಪಿ ತಾವು ಅರೆಗಣ್ಣು ಮುಚ್ಚಿ
ನಳಿನಾಸನದಿ ಮೌನಗೊಂಡು ಪರಮಹಂಸ
ಕುಲದಂತೆ ಧ್ಯಾನಿಪ ಹಂಸಜನ್ಮವನು (೨)

೩. ನವಿಗಳೆಂಬ ಸಂತತ ಪೂರ್ಣಚಂದ್ರನ್ನ
ಅಕಳಂಕ ನವಚಂದ್ರಿಕೆಯನ್ನ ಸವಿದು
ಸುಖದ ಸುಗ್ಗಿಗಳಲ್ಲಿ ಸೊಕ್ಕಿ ಯೋಗಿಗಳಂತೆ
ಅಖಿಲವ ಮರೆತ ಚಕೋರ ಜನ್ಮವನು (೩)

೪. ಭಾವಜನೆಯ್ಯನ ಕಡುಚಳಿಕೆಯನ್ನು
ಭಾವಿಸಿ ನಿಡುಗಂಗಳಿಂದ ದಣಿದುಂಡು
ಗೋವರ್ಲೆರಂತೆ ಮನೆಮಕ್ಕಳ ಹಿಂಗಿ ನಿನ್ನ
ಆವಾಗ ಈಕ್ಷಿಸುವ ಗೋವುಗಳ ಜನ್ಮವನು (೪)

೫. ತೋಳದಂದಿಗೆ ಮಾಡಿ ಹೀಲೆಯ ಚಾಮರವ
ಮೇಲೆ ಎತ್ತಿದ ತಾವರೆಗೊಡೆಯಿಂದ
ಒಲೈಸಿ ನಿನ್ನನು ಒಲಿಸಿ ಮುಕುತರಂತೆ
ಸಾಲೋಕ್ಯ ಸುಖವೆಂಬ ಗೋಪರ ಜನ್ಮವನು (೫)

೬. ಕೊಳಲಧ್ವನಿಯ ಕೇಳಿ ಎದುರುಗೊಳ್ಳುತ ನಿನ್ನ
ನಳಿನನಾಭಾ ಅವಧಾರೆಂದು ಪೊಗಳಿ
ತಳಿಗೆ ಆರತಿಯೆತ್ತಿ ಲಕ್ಷ್ಮಿಯಂತೆ ನಿನ್ನ
ಚೆಲುವ ಸವಿವಂಥ ಗೋಪೇರ ಜನ್ಮವನು (೬)

೭. ಇಂದಿರೆಯರಸ ಬ್ರಹ್ಮೇಂದ್ರಾದಿ ವಂದಿತ
ಎಂದು ಮೊಸರ ಕಡೆಯುತಲಿ ನಿನ್ನ
ಅಂದಿನ ಶ್ರುತಿಯೊಳುಪ್ಪವಡಿಪ ವ್ರಜ
ದಿಂದುಮುಖಿಯರ ಜನ್ಮವ ಸಿರಿಕೃಷ್ಣ (೭)`,
      transliteration: `Pallavi:
Endigaadaru omme kodu kandya hariye (Pa.)
Brundaavanapati dayadindalenage (A.Pa.)

Charanagalu:
1. Phaladhaaragalinda talevaagi shukapika
Kalakaladolu ninna tutisi tumbigala
Galaravadim paadi apsarante poo
Maleyagareva tarulateya janmavanu (1)

2. Kolala shrutiya keli sukhada sambhramadali
Holabutappi taavu aregannu mucchi
Nalinaasanadi mounagondu paramahamsa
Kuladante dhyaanipa hamsajanmavanu (2)

3. Navigalemba santata poornachandranna
Akalanka navachandrikeyanna savidu
Sukhada suggigalalli sokki yogigalante
Akhilava mareta chakora janmavanu (3)

4. Bhaavajaneyyana kaduchalikeyu
Bhaavisi nidugangalinda danidundu
Govarlerante manemakkala hingi ninna
Aavaaga eekshisuva govugala janmavanu (4)

5. Toladandige maadi heeleya chaamarava
Mele ettida taavaregodeyinda
Olaisi ninnanu olisi mukutarante
Saalokya sukhavemba gopara janmavanu (5)

6. Kolaladhvaniya keli edurugolluta ninna
Nalinanaabha avadhaarendu pogali
Talige aaratiyetti lakshmiyante ninna
Cheluva savivantha gopera janmavanu (6)

7. Indireyarasa brahmendraadi vandita
Endu mosara kadeyutali ninna
Andina shrutiyoluppavadipa vraja
Dindumukhiyara janmava sirikrishna (7)`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Please grant it to me at least once, someday, O Hari!
O Lord of Brindavan, out of your compassion to me!

Charanagalu:
1. The birth of trees and creepers, bowing down with the weight of fruits, praising you amidst the sweet chirping of parrots and cuckoos, singing with the hum of bees, and showering flowers like celestial nymphs.

2. The birth of swans (Hamsa), which upon hearing the melody of your flute, overwhelmed with joyful excitement, losing themselves, half-closing their eyes, sitting in silence on a lotus seat, and meditating like the lineage of supreme realized sages (Paramahamsas).

3. The birth of Chakora birds, which continuously taste the spotless new moonlight as if it were the full moon, getting intoxicated in the harvest of happiness, and forgetting the entire world like yogis.

4. The birth of the cows, which, feeling the intense shivering cold, exhausted from gazing with wide eyes, leaving behind their calves and household like the cowherds, constantly looking at you.

5. The birth of the cowherds (Gopas), who, making armlets, waving the chamara, and holding up umbrellas of lotuses, serve you to win your heart, experiencing the bliss of Salokya liberation like the liberated souls.

6. The birth of the Gopis, who, hearing the sound of your flute, come forward to receive you, praising you as 'O Nalinanabha (Lotus-naveled one), please accept this,' offering aarti on a plate, and relishing your beauty like Goddess Lakshmi herself.

7. The birth of the moon-faced maidens of Vraja, O Sri Krishna, who churn the curds while singing 'O Lord of Indira, worshipped by Brahma, Indra, and others,' immersing themselves in the divine sound of that time!`;
  
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
