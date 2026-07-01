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
  const ragaId = await getOrCreateRaga('Goula');
  const talaId = await getOrCreateTala('Khandajhampe');

  // Find existing vyasatirtha to get proper references
  const composer = await prisma.composer.findUnique({ where: { id: 'vyasatirtha' } });
  
  if (!composer) {
    console.log("vyasatirtha not found, make sure he exists!");
    return;
  }
  
  const ankita = await prisma.ankita.upsert({
      where: { name: 'Krishna' },
      update: {},
      create: { name: 'Krishna' }
  });
  
  const deity = await prisma.deity.upsert({
      where: { name: 'Krishna' },
      update: {},
      create: { name: 'Krishna' }
  });

  const id = 'vyasatirtha-53';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Samsaaravemba Maarige',
      firstLine: 'Samsaaravemba maarige silukide',
      lyrics: `ಪಲ್ಲವಿ:
ಸಂಸಾರವೆಂಬ ಮಾರಿಗೆ ಸಿಲುಕಿದೆ

ಅನುಪಲ್ಲವಿ:
ಕಂಸಾರಿ ಕರುಣದಿಂದನ್ನ ನೋಡಯ್ಯ

ಚರಣಗಳು:
೧. ಬಲಿಗಾಯಿತವಾದ ಕುರಿ ಮೆಲುವಂತೆ ಹಡೆ
ತಲೆ ಮಿತ್ತವನರಿಯದೆ ಮುತ್ತ್ಯಾಗಿಪ್ಪೆ

೨. ಕಂಡು ಕಂಡು ಪತಂಗ ಕಿಚ್ಚಿನೊಳು ಬೀಳುವಂತೆ
ಕಂಡ ಕಂಡ ಹೆಯ ವಿಷಯಂಗಳಿಗರುವೆ

೩. ಪತಿಯರಲು ಸತಿ ಅನ್ಯಗೈಯುವಂತೆ
ಗತಿ ನೀನಿರಲು ಅನ್ಯರ ಗತಿಯಿಂಬೆ

೪. ಒಂದು ಮೊಲೆತೆ ಆರು ಹುಲಿ ಬಂದದರಂತೆ
ಬಂಧಕವತರಲಿವೆ ಅರಿಷಡ್ವರ್ಗಗಳು

೫. ಜೋಗಿಯಾಗಿ ಕೂಡಗೆ ಹಾಡುವದರಂತೆ
ಲೋಗರಿಗಾಗಿ ಧಾವತಿಬಿಟ್ಟು ಬಳಲುವೆ

೬. ಶುಕನ ಒಡಗಳಂತೆ ಎನ್ನ ಒಡಗಳಯ್ಯ
ಆಟುಕಟ್ಟುವೆನಗೆ ಬಂಧಮಾಡುವೆನೋ

೭. ಮಿಂದುನಿಂದಾನೆ ಹುಡಿಯ ಹೋಯ್ಕೊಂಬಂತೆ
ಮುಂದೆ ಮತಿಯಾದನೋ ತಂದೆ ಕರುಣಿಸೋ ಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Samsaaravemba maarige silukide

Anupallavi:
Kamsaari karunadindanna nodayya

Charanagalu:
1. Baligaayitavaada kuri meluvante hade
Tale mittavanariyade muttyaagippe

2. Kandu kandu patanga kicchinolu beeluvante
Kanda kanda heya vishayangalgaruve

3. Patiyaralu sati anyagaiyuvante
Gati neeniralu anyara gatiyimbe

4. Ondu moletu aaru huli bandadarante
Bandhakavataralive arishadvargagalu

5. Jogiyaagi koodage haaduvadarante
Logarigaagi dhaavatibittu balaluve

6. Shukana odagalante enna odagalayya
Aatukattuvenage bandhamaaduveno

7. Mindunindaane hudiya hoykombante
Munde matiyaadano tande karuniso krishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Samsaaravemba Maarige',
      firstLine: 'Samsaaravemba maarige silukide',
      lyrics: `ಪಲ್ಲವಿ:
ಸಂಸಾರವೆಂಬ ಮಾರಿಗೆ ಸಿಲುಕಿದೆ

ಅನುಪಲ್ಲವಿ:
ಕಂಸಾರಿ ಕರುಣದಿಂದನ್ನ ನೋಡಯ್ಯ

ಚರಣಗಳು:
೧. ಬಲಿಗಾಯಿತವಾದ ಕುರಿ ಮೆಲುವಂತೆ ಹಡೆ
ತಲೆ ಮಿತ್ತವನರಿಯದೆ ಮುತ್ತ್ಯಾಗಿಪ್ಪೆ

೨. ಕಂಡು ಕಂಡು ಪತಂಗ ಕಿಚ್ಚಿನೊಳು ಬೀಳುವಂತೆ
ಕಂಡ ಕಂಡ ಹೆಯ ವಿಷಯಂಗಳಿಗರುವೆ

೩. ಪತಿಯರಲು ಸತಿ ಅನ್ಯಗೈಯುವಂತೆ
ಗತಿ ನೀನಿರಲು ಅನ್ಯರ ಗತಿಯಿಂಬೆ

೪. ಒಂದು ಮೊಲೆತೆ ಆರು ಹುಲಿ ಬಂದದರಂತೆ
ಬಂಧಕವತರಲಿವೆ ಅರಿಷಡ್ವರ್ಗಗಳು

೫. ಜೋಗಿಯಾಗಿ ಕೂಡಗೆ ಹಾಡುವದರಂತೆ
ಲೋಗರಿಗಾಗಿ ಧಾವತಿಬಿಟ್ಟು ಬಳಲುವೆ

೬. ಶುಕನ ಒಡಗಳಂತೆ ಎನ್ನ ಒಡಗಳಯ್ಯ
ಆಟುಕಟ್ಟುವೆನಗೆ ಬಂಧಮಾಡುವೆನೋ

೭. ಮಿಂದುನಿಂದಾನೆ ಹುಡಿಯ ಹೋಯ್ಕೊಂಬಂತೆ
ಮುಂದೆ ಮತಿಯಾದನೋ ತಂದೆ ಕರುಣಿಸೋ ಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Samsaaravemba maarige silukide

Anupallavi:
Kamsaari karunadindanna nodayya

Charanagalu:
1. Baligaayitavaada kuri meluvante hade
Tale mittavanariyade muttyaagippe

2. Kandu kandu patanga kicchinolu beeluvante
Kanda kanda heya vishayangalgaruve

3. Patiyaralu sati anyagaiyuvante
Gati neeniralu anyara gatiyimbe

4. Ondu moletu aaru huli bandadarante
Bandhakavataralive arishadvargagalu

5. Jogiyaagi koodage haaduvadarante
Logarigaagi dhaavatibittu balaluve

6. Shukana odagalante enna odagalayya
Aatukattuvenage bandhamaaduveno

7. Mindunindaane hudiya hoykombante
Munde matiyaadano tande karuniso krishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
I am caught in the plague called Samsara (worldly existence)!

Anupallavi:
O enemy of Kamsa, please look at me with compassion!

Charanagalu:
1. Like a sheep meant for sacrifice grazing happily,
Ignorant of my impending death, I live foolishly.

2. Like a moth knowingly falling into the fire,
I crave every vile worldly pleasure I see.

3. Like a wife seeking another when her husband is present,
With You as my refuge, I seek refuge in others.

4. Like six tigers attacking a single cow,
The six inner enemies (lust, anger, etc.) are binding me!

5. Like a Yogi singing in a group just for show,
I wander and suffer for the sake of other people!

6. Like the words of a parrot, are my words, O Lord,
Will You tie me up and bind me?

7. Like a person who bathes and then pours dust on himself,
I have lost my mind, O Father Krishna, have mercy on me!`;
  
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
