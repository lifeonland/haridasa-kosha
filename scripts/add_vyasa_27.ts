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

  const id = 'vyasatirtha-27';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Indigento Naalegento',
      firstLine: 'Indigento naalegento endu chintisabeda',
      lyrics: `ಪಲ್ಲವಿ:
ಇಂದಿಗೆಂತೋ ನಾಳೆಗೆಂತೋ ಎಂದು ಚಿಂತಿಸಬೇಡ |
ನಮ್ಮ ಕಂದರ್ಪಜನಕ ಶ್ರೀಕೃಷ್ಣನಿರಲಾಗಿ ||

ಅನುಪಲ್ಲವಿ:
ಹಿಂದೆ ಸಾಕಿ ಕಾಯ್ದ ದೇವ ಮುಂದೆಯೂ ಕಾಯ್ವ |
ಒಂದು ಸಾಸಿವೆಷ್ಟಾದರೂ ಸಂಶಯವ ಬೇಡ ||

ಚರಣಗಳು:
ಕಲ್ಲಿನೊಳಗಿನ ಕಪ್ಪೆಗೆ ಅನ್ನವಿತ್ತವರ್ಯಾರು |
ಅಡವಿಯ ಮೃಗಗಳಿಗೆ ಉಣಿಸು ನೀಡಿದವರ್ಯಾರು |
ಹೆತ್ತ ತಾಯಿಗಿಂತಲೂ ಹೆಚ್ಛಾಗಿ ಸಲಹುವ |
ಕರ್ತೃ ನಮ್ಮ ಶ್ರೀಕೃಷ್ಣ ಜಗತ್ಪತಿಯು ಇರಲಾಗಿ ||

ಸೃಷ್ಟಿ ಸ್ಥಿತಿ ಲಯಕೆ ಕಾರಣನು ತಾನಾಗಿ |
ಭಕ್ತರ ಕಾಪಾಡಲು ಕಂಕಣವ ತೊಟ್ಟವನು |
ವ್ಯಾಸರಾಜಾರ್ಚಿತ ಸಿರಿಕೃಷ್ಣ ರಾಯನ |
ದಾಸನಾಗಿ ನೀನು ನಿಶ್ಚಿಂತನಾಗು ಮನವೇ ||`,
      transliteration: `Pallavi:
Indigento naalegento endu chintisabeda |
Namma kandarpajanaka srikrishnaniralagi ||

Anupallavi:
Hinde saaki kaayda deva mundeyu kaayva |
Ondu saasiveshtadaru samshayava beda ||

Charanagalu:
Kallinolahina kappege annavittavaryaru |
Adaviya mrugagalige unisu needidavaryaru |
Hetta taayigintalu hecchagi salahuva |
Kartru namma srikrishna jagatpatiyu iralagi ||

Srushti sthiti layake kaarananu taanaagi |
Bhaktara kaapaadalu kankanava tottavanu |
Vyasarajaarchita sirikrishna raayana |
Daasanaagi neenu nischintanaagu manave ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Indigento Naalegento',
      firstLine: 'Indigento naalegento endu chintisabeda',
      lyrics: `ಪಲ್ಲವಿ:
ಇಂದಿಗೆಂತೋ ನಾಳೆಗೆಂತೋ ಎಂದು ಚಿಂತಿಸಬೇಡ |
ನಮ್ಮ ಕಂದರ್ಪಜನಕ ಶ್ರೀಕೃಷ್ಣನಿರಲಾಗಿ ||

ಅನುಪಲ್ಲವಿ:
ಹಿಂದೆ ಸಾಕಿ ಕಾಯ್ದ ದೇವ ಮುಂದೆಯೂ ಕಾಯ್ವ |
ಒಂದು ಸಾಸಿವೆಷ್ಟಾದರೂ ಸಂಶಯವ ಬೇಡ ||

ಚರಣಗಳು:
ಕಲ್ಲಿನೊಳಗಿನ ಕಪ್ಪೆಗೆ ಅನ್ನವಿತ್ತವರ್ಯಾರು |
ಅಡವಿಯ ಮೃಗಗಳಿಗೆ ಉಣಿಸು ನೀಡಿದವರ್ಯಾರು |
ಹೆತ್ತ ತಾಯಿಗಿಂತಲೂ ಹೆಚ್ಛಾಗಿ ಸಲಹುವ |
ಕರ್ತೃ ನಮ್ಮ ಶ್ರೀಕೃಷ್ಣ ಜಗತ್ಪತಿಯು ಇರಲಾಗಿ ||

ಸೃಷ್ಟಿ ಸ್ಥಿತಿ ಲಯಕೆ ಕಾರಣನು ತಾನಾಗಿ |
ಭಕ್ತರ ಕಾಪಾಡಲು ಕಂಕಣವ ತೊಟ್ಟವನು |
ವ್ಯಾಸರಾಜಾರ್ಚಿತ ಸಿರಿಕೃಷ್ಣ ರಾಯನ |
ದಾಸನಾಗಿ ನೀನು ನಿಶ್ಚಿಂತನಾಗು ಮನವೇ ||`,
      transliteration: `Pallavi:
Indigento naalegento endu chintisabeda |
Namma kandarpajanaka srikrishnaniralagi ||

Anupallavi:
Hinde saaki kaayda deva mundeyu kaayva |
Ondu saasiveshtadaru samshayava beda ||

Charanagalu:
Kallinolahina kappege annavittavaryaru |
Adaviya mrugagalige unisu needidavaryaru |
Hetta taayigintalu hecchagi salahuva |
Kartru namma srikrishna jagatpatiyu iralagi ||

Srushti sthiti layake kaarananu taanaagi |
Bhaktara kaapaadalu kankanava tottavanu |
Vyasarajaarchita sirikrishna raayana |
Daasanaagi neenu nischintanaagu manave ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Do not worry thinking 'how will it be today, how will it be tomorrow?'
When our Lord Sri Krishna, the father of Manmatha, is here!

Anupallavi:
The Lord who nurtured and protected you in the past, will protect you in the future as well.
Do not have even a mustard seed's worth of doubt!

Charanagalu:
Who provided food for the frog inside the stone?
Who gave nourishment to the wild animals in the forest?
When the creator, our Sri Krishna, the Lord of the universe,
Is here to protect us even more than a birth mother!

Being the ultimate cause for creation, sustenance, and dissolution,
He is the one who has taken a vow to protect His devotees!
Becoming a servant of Lord Sri Krishna, worshipped by Vyasaraja,
O mind, become completely free of all worries!`;
  
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
