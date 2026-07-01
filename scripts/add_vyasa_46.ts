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
  const ragaId = await getOrCreateRaga('Yadukula Kambhoji');
  const talaId = await getOrCreateTala('Atte');

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

  const id = 'vyasatirtha-46';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Ninagaaru Sariyilla',
      firstLine: 'Ninagaaru sariyilla enaganya gatiyilla',
      lyrics: `ಪಲ್ಲವಿ:
ನಿನಗಾರು ಸರಿಯಿಲ್ಲ ಎನಗನ್ಯ ಗತಿಯಿಲ್ಲ

ಅನುಪಲ್ಲವಿ:
ನಿನಗೂ ನನಗೂ ನ್ಯಾಯ ಪೇಳುವರಿಲ್ಲ

ಚರಣಗಳು:
೧. ಒಂದೇ ಗೂಡಿನೊಳು ಒಂದು ಕ್ಷಣವಗಲದೆ
ಎಂದೆಂದು ನಿನ್ನ ಪಾದ ಪೊಂದಿರಲಾಗಿ
ಬಂಧ ವಿಷಯಂಗಳಿಗೆ ಎನ್ನನೊಪ್ಪಿಸಿಕೊಟ್ಟು
ಅಂದಗಾರನಂತೆ ನೋಡುವುದುಚಿತವೆ

೨. ಪರಸತಿಗಳಿಳುಪಲು ಪರಮಪಾತಕಿಯೆಂದು
ಪರಿಪರಿ ನರಕಕ್ಕೆ ಗುರಿಮಾಡುವಿ
ಪರಸತಿಯರ ಒಲುಮೆ ನಿನಗೊಪ್ಪಿತೆಲೊ ಕೃಷ್ಣ
ದೊರೆತನಕಂಜಿ ನಾ ಶರಣೆಂಬೆನಲ್ಲದೆ

೩. ನಿನ್ನಾಜ್ಞಾನವನೊ ನಾ ನಿನ್ನ ಪ್ರೇರಣೆಯಿಂದ
ಅನಂತಕರ್ಮವ ನಾ ಮಾಡುವೆ
ಎನ್ನವಗುಣಗಳನೆಣಿಸಲಾಗದೊ ಸ್ವಾಮಿ
ಮನ್ನಿಸಿ ಸಲಹಯ್ಯ ಪರಮಪುರುಷ ಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Ninagaaru sariyilla enaganya gatiyilla

Anupallavi:
Ninagoo nanagoo nyaaya peluvarilla

Charanagalu:
1. Onde goodinolu ondu kshanavagalade
Endendu ninna paada pondiralaagi
Bandha vishayamgalige ennanoppisikottu
Andagaaranante noduvuduchitave

2. Parasatigalilupalu paramapaatakiyendu
Paripari narakakke gurimaaduvi
Parasatiyara olume ninagoppitelo krishna
Doretanakanji naa sharanembenallade

3. Ninnaajnaanavano naa ninna preraneyinda
Anantakarmava naa maaduve
Ennavagunagalanenisalaagado svaami
Mannisi salahayya paramapurusha krishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Ninagaaru Sariyilla',
      firstLine: 'Ninagaaru sariyilla enaganya gatiyilla',
      lyrics: `ಪಲ್ಲವಿ:
ನಿನಗಾರು ಸರಿಯಿಲ್ಲ ಎನಗನ್ಯ ಗತಿಯಿಲ್ಲ

ಅನುಪಲ್ಲವಿ:
ನಿನಗೂ ನನಗೂ ನ್ಯಾಯ ಪೇಳುವರಿಲ್ಲ

ಚರಣಗಳು:
೧. ಒಂದೇ ಗೂಡಿನೊಳು ಒಂದು ಕ್ಷಣವಗಲದೆ
ಎಂದೆಂದು ನಿನ್ನ ಪಾದ ಪೊಂದಿರಲಾಗಿ
ಬಂಧ ವಿಷಯಂಗಳಿಗೆ ಎನ್ನನೊಪ್ಪಿಸಿಕೊಟ್ಟು
ಅಂದಗಾರನಂತೆ ನೋಡುವುದುಚಿತವೆ

೨. ಪರಸತಿಗಳಿಳುಪಲು ಪರಮಪಾತಕಿಯೆಂದು
ಪರಿಪರಿ ನರಕಕ್ಕೆ ಗುರಿಮಾಡುವಿ
ಪರಸತಿಯರ ಒಲುಮೆ ನಿನಗೊಪ್ಪಿತೆಲೊ ಕೃಷ್ಣ
ದೊರೆತನಕಂಜಿ ನಾ ಶರಣೆಂಬೆನಲ್ಲದೆ

೩. ನಿನ್ನಾಜ್ಞಾನವನೊ ನಾ ನಿನ್ನ ಪ್ರೇರಣೆಯಿಂದ
ಅನಂತಕರ್ಮವ ನಾ ಮಾಡುವೆ
ಎನ್ನವಗುಣಗಳನೆಣಿಸಲಾಗದೊ ಸ್ವಾಮಿ
ಮನ್ನಿಸಿ ಸಲಹಯ್ಯ ಪರಮಪುರುಷ ಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Ninagaaru sariyilla enaganya gatiyilla

Anupallavi:
Ninagoo nanagoo nyaaya peluvarilla

Charanagalu:
1. Onde goodinolu ondu kshanavagalade
Endendu ninna paada pondiralaagi
Bandha vishayamgalige ennanoppisikottu
Andagaaranante noduvuduchitave

2. Parasatigalilupalu paramapaatakiyendu
Paripari narakakke gurimaaduvi
Parasatiyara olume ninagoppitelo krishna
Doretanakanji naa sharanembenallade

3. Ninnaajnaanavano naa ninna preraneyinda
Anantakarmava naa maaduve
Ennavagunagalanenisalaagado svaami
Mannisi salahayya paramapurusha krishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
There is no one equal to You, and I have no other refuge!

Anupallavi:
There is no one to judge the dispute between You and me!

Charanagalu:
1. Being in the same nest (body), without separating even for a moment,
Having surrendered to Your feet forever,
Is it fair for You to hand me over to worldly attachments and bondage,
And just watch like a handsome spectator?

2. If we associate with other women, You call us great sinners,
And subject us to various kinds of hells!
But You Yourself enjoy the love of other women (Gopis), O Krishna!
I surrender to You only because I fear Your authority!

3. Under Your command and by Your inspiration alone,
I perform countless actions.
My faults cannot be counted, O Lord!
Please forgive me and protect me, O Supreme Being, Krishna!`;
  
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
