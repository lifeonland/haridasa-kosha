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
  const ragaId = await getOrCreateRaga('Kalyani');
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

  const id = 'vyasatirtha-29';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Dayamaado Rangayya',
      firstLine: 'Dayamaado rangayya dayamaado',
      lyrics: `ಪಲ್ಲವಿ:
ದಯಮಾಡೊ ರಂಗಯ್ಯ ದಯಮಾಡೊ |
ದಯಮಾಡೊ ಎನ್ನವಗುಣಗಳನೆಲ್ಲ ಹಿಂಗಿಸಿ ||

ಅನುಪಲ್ಲವಿ:
ಅಗಣಿತ ಮಹಿಮನೇ ಅತಿಶಯ ಗುಣವಂತ |
ಜಗದೊಳು ನಿನ್ನ ಸರಿ ದೈವವ ಕಾಣೆ ||

ಚರಣ 1:
ಹುಟ್ಟಿದಾರಭ್ಯವಾಗಿ ನಿನಗೆ ನಾ ಮಾಡಿದ |
ನಿಷ್ಠುರ ಕಾರ್ಯಗಳು ಎಣಿಕೆಗೆ ಬಾರವು |
ಹೊಟ್ಟೆ ಒಳಗಿನ ಕಿಚ್ಚು ನೀನೇ ಬಲ್ಲೆ ದೇವ |
ತಟ್ಟನೆ ಎನ್ನ ಕೈ ಬಿಡಬೇಡ ರಂಗ ||

ಚರಣ 2:
ಪರರ ದ್ರವ್ಯಕ್ಕೆ ಕೈಯನ್ನು ಚಾಚಿದೆ |
ಪರರ ನಿಂದನೆಯ ಜನ್ಮವೆಲ್ಲ ಮಾಡಿದೆ |
ಪರ ಸತಿಯರ ನೋಡಿ ಭ್ರಮಿಸಿದೆನೋ ರಂಗ |
ಸ್ಥಿರವಲ್ಲದ ಕಾಯ ಸಾಕು ಮಾಡಿದೆ ಕೃಷ್ಣ ||

ಚರಣ 3:
ಕರಚರಣಾದಿ ಇಂದ್ರಿಯಗಳು ಮಾಡುವ |
ಅಪರಾಧಗಳೆಲ್ಲ ನಿನಗೆ ಒಪ್ಪಿಸಿದೆ |
ವರದ ಸಿರಿಕೃಷ್ಣನೇ ಎನ್ನನು |
ಮರೆಯದೆ ಸಲಹೊ ಕರುಣಾನಿಧಿಯೇ ||`,
      transliteration: `Pallavi:
Dayamaado rangayya dayamaado |
Dayamaado ennavagunagalanella hingisi ||

Anupallavi:
Aganita mahimane atishaya gunavanta |
Jagadolu ninna sari daivava kaane ||

Charana 1:
Huttidaarabhyavaagi ninage naa maadida |
Nishthura kaaryagalu enikege baaravu |
Hotte olagina kicchu neene balle deva |
Tattane enna kai bidabeda ranga ||

Charana 2:
Parara dravyakke kaiyannu chaachide |
Parara nindaneya janmavella maadide |
Para satiyara nodi bhramisideno ranga |
Sthiravallada kaaya saaku maadide krishna ||

Charana 3:
Karacharanaadi indriyagalu maaduva |
Aparaadhagalella ninage oppiside |
Varada sirikrishnane ennanu |
Mareyade salaho karunaanidhiye ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Dayamaado Rangayya',
      firstLine: 'Dayamaado rangayya dayamaado',
      lyrics: `ಪಲ್ಲವಿ:
ದಯಮಾಡೊ ರಂಗಯ್ಯ ದಯಮಾಡೊ |
ದಯಮಾಡೊ ಎನ್ನವಗುಣಗಳನೆಲ್ಲ ಹಿಂಗಿಸಿ ||

ಅನುಪಲ್ಲವಿ:
ಅಗಣಿತ ಮಹಿಮನೇ ಅತಿಶಯ ಗುಣವಂತ |
ಜಗದೊಳು ನಿನ್ನ ಸರಿ ದೈವವ ಕಾಣೆ ||

ಚರಣ 1:
ಹುಟ್ಟಿದಾರಭ್ಯವಾಗಿ ನಿನಗೆ ನಾ ಮಾಡಿದ |
ನಿಷ್ಠುರ ಕಾರ್ಯಗಳು ಎಣಿಕೆಗೆ ಬಾರವು |
ಹೊಟ್ಟೆ ಒಳಗಿನ ಕಿಚ್ಚು ನೀನೇ ಬಲ್ಲೆ ದೇವ |
ತಟ್ಟನೆ ಎನ್ನ ಕೈ ಬಿಡಬೇಡ ರಂಗ ||

ಚರಣ 2:
ಪರರ ದ್ರವ್ಯಕ್ಕೆ ಕೈಯನ್ನು ಚಾಚಿದೆ |
ಪರರ ನಿಂದನೆಯ ಜನ್ಮವೆಲ್ಲ ಮಾಡಿದೆ |
ಪರ ಸತಿಯರ ನೋಡಿ ಭ್ರಮಿಸಿದೆನೋ ರಂಗ |
ಸ್ಥಿರವಲ್ಲದ ಕಾಯ ಸಾಕು ಮಾಡಿದೆ ಕೃಷ್ಣ ||

ಚರಣ 3:
ಕರಚರಣಾದಿ ಇಂದ್ರಿಯಗಳು ಮಾಡುವ |
ಅಪರಾಧಗಳೆಲ್ಲ ನಿನಗೆ ಒಪ್ಪಿಸಿದೆ |
ವರದ ಸಿರಿಕೃಷ್ಣನೇ ಎನ್ನನು |
ಮರೆಯದೆ ಸಲಹೊ ಕರುಣಾನಿಧಿಯೇ ||`,
      transliteration: `Pallavi:
Dayamaado rangayya dayamaado |
Dayamaado ennavagunagalanella hingisi ||

Anupallavi:
Aganita mahimane atishaya gunavanta |
Jagadolu ninna sari daivava kaane ||

Charana 1:
Huttidaarabhyavaagi ninage naa maadida |
Nishthura kaaryagalu enikege baaravu |
Hotte olagina kicchu neene balle deva |
Tattane enna kai bidabeda ranga ||

Charana 2:
Parara dravyakke kaiyannu chaachide |
Parara nindaneya janmavella maadide |
Para satiyara nodi bhramisideno ranga |
Sthiravallada kaaya saaku maadide krishna ||

Charana 3:
Karacharanaadi indriyagalu maaduva |
Aparaadhagalella ninage oppiside |
Varada sirikrishnane ennanu |
Mareyade salaho karunaanidhiye ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Have mercy, O Rangayya, have mercy!
Have mercy by removing all my faults and flaws!

Anupallavi:
O one of countless glories, possessor of extraordinary virtues!
In this world, I do not see a deity equal to you!

Charana 1:
Right from the time of my birth, the cruel deeds
I have done towards you are beyond count.
You alone know the fire (desire/hunger) inside my stomach, O Deva,
Do not suddenly let go of my hand, O Ranga!

Charana 2:
I have stretched my hands toward the wealth of others,
I have spent my whole life criticizing others.
I have wandered aimlessly looking at the wives of others, O Ranga!
I have had enough of this unstable body, O Krishna!

Charana 3:
All the offenses committed by my hands, feet, and other senses,
I have surrendered and offered them all to you.
O boon-giving Sri Krishna, without forgetting me,
Please protect me, O ocean of mercy!`;
  
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
