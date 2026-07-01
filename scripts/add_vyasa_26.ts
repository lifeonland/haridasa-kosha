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
  const ragaId = await getOrCreateRaga('Pantuvarali');
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

  const id = 'vyasatirtha-26';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Pooje Yaatako Manuja',
      firstLine: 'Pooje yaatako manuja pooje yaatako',
      lyrics: `ಪಲ್ಲವಿ:
ಪೂಜೆ ಯಾತಕೋ ಮನುಜ ಪೂಜೆ ಯಾತಕೋ |
ಹೃದಯದೊಳು ಹರಿಯ ಕಾಣದ ಮಂದಮತಿಯೇ ||

ಅನುಪಲ್ಲವಿ:
ಒಳಗೆ ಕಪಟವನ್ನಿಟ್ಟು ಹೊರಗೆ ಮಂತ್ರವ ಜಪಿಪ |
ಛಲಗಾರ ನಿನಗೆ ಈ ಆಡಂಬರ ಯಾತಕೋ ||

ಚರಣಗಳು:
ಗಂಗೆಯೊಳು ಮುಳುಗಿದರೆ ಕಾಗೆ ಕಪ್ಪೆಗಳಂತೆ |
ಅಂಗಕೆ ಭಸ್ಮವ ಹಚ್ಚಿದರೆ ಕತ್ತೆಯಂತೆ |
ತಿಂಗಳ ಪರ್ಯಂತ ಉಪವಾಸವಿದ್ದರೇನು |
ರಂಗನ ಒಲಿಸದ ಆಚಾರ ಯಾತಕೋ ||

ಕ್ರೂರ ಕೋಪವ ಬಿಟ್ಟು ಶಾಂತ ಚಿತ್ತನಾಗು |
ದೂಷಿಸದೆ ಪರರ ಸನ್ಮಾರ್ಗದೊಳು ನಡೆ |
ಶ್ರೀಕೃಷ್ಣನಾಮವ ಜಪಿಪ ದಾಸರ ಕೂಡಿ |
ಮೋಕ್ಷ ಹಾದಿಯ ನೀನು ಸೇರೊ ಮನುಜನೇ ||`,
      transliteration: `Pallavi:
Pooje yaatako manuja pooje yaatako |
Hrudayadolu hariya kaanada mandamatiye ||

Anupallavi:
Olage kapatavannittu horage mantrava japipa |
Chhalagara ninage ee aadambara yaatako ||

Charanagalu:
Gangeyolu mulugidare kaage kappegalante |
Angake bhasmava hacchidare katteyante |
Tingala paryanta upavasaviddarenu |
Rangana olisada aachara yaatako ||

Kroora kopava biṭṭu shaanta chittanaagu |
Dooshisade parara sanmaargadolu nade |
Srikrishnanaamava japipa daasara koodi |
Moksha haadiya neenu sero manujane ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Pooje Yaatako Manuja',
      firstLine: 'Pooje yaatako manuja pooje yaatako',
      lyrics: `ಪಲ್ಲವಿ:
ಪೂಜೆ ಯಾತಕೋ ಮನುಜ ಪೂಜೆ ಯಾತಕೋ |
ಹೃದಯದೊಳು ಹರಿಯ ಕಾಣದ ಮಂದಮತಿಯೇ ||

ಅನುಪಲ್ಲವಿ:
ಒಳಗೆ ಕಪಟವನ್ನಿಟ್ಟು ಹೊರಗೆ ಮಂತ್ರವ ಜಪಿಪ |
ಛಲಗಾರ ನಿನಗೆ ಈ ಆಡಂಬರ ಯಾತಕೋ ||

ಚರಣಗಳು:
ಗಂಗೆಯೊಳು ಮುಳುಗಿದರೆ ಕಾಗೆ ಕಪ್ಪೆಗಳಂತೆ |
ಅಂಗಕೆ ಭಸ್ಮವ ಹಚ್ಚಿದರೆ ಕತ್ತೆಯಂತೆ |
ತಿಂಗಳ ಪರ್ಯಂತ ಉಪವಾಸವಿದ್ದರೇನು |
ರಂಗನ ಒಲಿಸದ ಆಚಾರ ಯಾತಕೋ ||

ಕ್ರೂರ ಕೋಪವ ಬಿಟ್ಟು ಶಾಂತ ಚಿತ್ತನಾಗು |
ದೂಷಿಸದೆ ಪರರ ಸನ್ಮಾರ್ಗದೊಳು ನಡೆ |
ಶ್ರೀಕೃಷ್ಣನಾಮವ ಜಪಿಪ ದಾಸರ ಕೂಡಿ |
ಮೋಕ್ಷ ಹಾದಿಯ ನೀನು ಸೇರೊ ಮನುಜನೇ ||`,
      transliteration: `Pallavi:
Pooje yaatako manuja pooje yaatako |
Hrudayadolu hariya kaanada mandamatiye ||

Anupallavi:
Olage kapatavannittu horage mantrava japipa |
Chhalagara ninage ee aadambara yaatako ||

Charanagalu:
Gangeyolu mulugidare kaage kappegalante |
Angake bhasmava hacchidare katteyante |
Tingala paryanta upavasaviddarenu |
Rangana olisada aachara yaatako ||

Kroora kopava biṭṭu shaanta chittanaagu |
Dooshisade parara sanmaargadolu nade |
Srikrishnanaamava japipa daasara koodi |
Moksha haadiya neenu sero manujane ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Why this worship, O man, why this worship?
O dull-minded one who does not see Hari within your heart!

Anupallavi:
Keeping deceit inside, while chanting mantras outside,
O stubborn one, why this empty show for you?

Charanagalu:
If one immerses in the Ganga, isn't it just like the crows and frogs?
If one smears ash on the body, isn't it just like a donkey?
What is the use if one fasts for an entire month?
Why these rituals that fail to please Lord Ranga?

Abandoning cruel anger, become one with a peaceful mind,
Without criticizing others, walk on the righteous path.
Joining the Dasas who chant the name of Sri Krishna,
O man, you too reach the path to liberation!`;
  
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
