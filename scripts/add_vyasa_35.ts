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
  const ragaId = await getOrCreateRaga('Bhairavi');
  const talaId = await getOrCreateTala('Jhampe / Chapu');

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

  const id = 'vyasatirtha-35';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Olaga Sulabhavo Rangayyana',
      firstLine: 'Olaga sulabhavo rangayyana',
      lyrics: `ಪಲ್ಲವಿ:
ಓಲಗ ಸುಲಭವೊ ರಂಗಯ್ಯನ
ಓಲಗ ಸುಲಭವೊ

ಅನುಪಲ್ಲವಿ:
ಓಲಗ ಸುಲಭವೊ ಪುಸಿಯಲ್ಲ ಕರುಣಾಲ-
ವಾಲನಾದ ಕರಿರಾಜವರದನ

ಚರಣಗಳು:
೧. ದೂರ ಹೋಗಲಿ ಬ್ಯಾಡ ತೊಡೆಯ ಗುದ್ದಲಿಬ್ಯಾಡ
ನೀರನೆರೆಯ ಬ್ಯಾಡ ನಿಗಡದಲ್ಲಿರಬ್ಯಾಡ
ನಾರಾಯಣನೆಂಬೊ ನರನ ಯೋಗಕ್ಷೇಮ
ಭಾರ ತನ್ನದೆಂಬೊ ಪ್ರಹ್ಲಾದವರದನ

೨. ಸಂತೇಲಿ ಮಾಡಿದ ಸಾಷ್ಟಾಂಗ ನಮಸ್ಕಾರ-
ದಂತಲ್ಲವೆ ಅನ್ಯರ ಭಜಿಸುವುದು
ಅಂತರಂಗದಲ್ಲಿ ಹರಿ ನೀನೆ ಗತಿಯೆಂದು
ಚಿಂತಿಸಿದರೆ ಕಾಯ್ವ ಶ್ರೀರಾಮಚಂದ್ರನ

೩. ತಪ್ಪು ಸಾಸಿರಗಳ ತಾಳಿ ರಕ್ಷಿಸುವ
ಕಪ್ಪು ಮೇಘದ ಕಾಂತಿಯಿಂದೊಪ್ಪುವ
ಸರ್ಪಶಯನಾದ ಸರ್ವಲೋಕೇಶನ
ಅಪ್ರಮೇಯ ನಮ್ಮಪ್ಪ ಶ್ರೀಕೃಷ್ಣನ`,
      transliteration: `Pallavi:
Olaga sulabhavo rangayyana
Olaga sulabhavo

Anupallavi:
Olaga sulabhavo pusiyalla karunaala-
Vaalanaada kariraajavaradana

Charanagalu:
1. Doora hogali byaada todeya guddalibyaada
Neeranereya byaada nigadadallirabyaada
Naaraayananembo narana yogakshema
Bhaara tannadembo prahlaadavaradana

2. Santeli maadida saashtaanga namaskaara-
Dantallave anyara bhajisuvudu
Antarangadalli hari neene gatiyendu
Chintisidare kaayva sriramachandrana

3. Tappu saasiragala taali rakshisuva
Kappu meghada kaantiyindoppuva
Sarpashayanaada sarvalokeshana
Aprameya nammappa srikrishnana`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Olaga Sulabhavo Rangayyana',
      firstLine: 'Olaga sulabhavo rangayyana',
      lyrics: `ಪಲ್ಲವಿ:
ಓಲಗ ಸುಲಭವೊ ರಂಗಯ್ಯನ
ಓಲಗ ಸುಲಭವೊ

ಅನುಪಲ್ಲವಿ:
ಓಲಗ ಸುಲಭವೊ ಪುಸಿಯಲ್ಲ ಕರುಣಾಲ-
ವಾಲನಾದ ಕರಿರಾಜವರದನ

ಚರಣಗಳು:
೧. ದೂರ ಹೋಗಲಿ ಬ್ಯಾಡ ತೊಡೆಯ ಗುದ್ದಲಿಬ್ಯಾಡ
ನೀರನೆರೆಯ ಬ್ಯಾಡ ನಿಗಡದಲ್ಲಿರಬ್ಯಾಡ
ನಾರಾಯಣನೆಂಬೊ ನರನ ಯೋಗಕ್ಷೇಮ
ಭಾರ ತನ್ನದೆಂಬೊ ಪ್ರಹ್ಲಾದವರದನ

೨. ಸಂತೇಲಿ ಮಾಡಿದ ಸಾಷ್ಟಾಂಗ ನಮಸ್ಕಾರ-
ದಂತಲ್ಲವೆ ಅನ್ಯರ ಭಜಿಸುವುದು
ಅಂತರಂಗದಲ್ಲಿ ಹರಿ ನೀನೆ ಗತಿಯೆಂದು
ಚಿಂತಿಸಿದರೆ ಕಾಯ್ವ ಶ್ರೀರಾಮಚಂದ್ರನ

೩. ತಪ್ಪು ಸಾಸಿರಗಳ ತಾಳಿ ರಕ್ಷಿಸುವ
ಕಪ್ಪು ಮೇಘದ ಕಾಂತಿಯಿಂದೊಪ್ಪುವ
ಸರ್ಪಶಯನಾದ ಸರ್ವಲೋಕೇಶನ
ಅಪ್ರಮೇಯ ನಮ್ಮಪ್ಪ ಶ್ರೀಕೃಷ್ಣನ`,
      transliteration: `Pallavi:
Olaga sulabhavo rangayyana
Olaga sulabhavo

Anupallavi:
Olaga sulabhavo pusiyalla karunaala-
Vaalanaada kariraajavaradana

Charanagalu:
1. Doora hogali byaada todeya guddalibyaada
Neeranereya byaada nigadadallirabyaada
Naaraayananembo narana yogakshema
Bhaara tannadembo prahlaadavaradana

2. Santeli maadida saashtaanga namaskaara-
Dantallave anyara bhajisuvudu
Antarangadalli hari neene gatiyendu
Chintisidare kaayva sriramachandrana

3. Tappu saasiragala taali rakshisuva
Kappu meghada kaantiyindoppuva
Sarpashayanaada sarvalokeshana
Aprameya nammappa srikrishnana`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Service to Lord Rangayya is easy!
Service to Him is easy!

Anupallavi:
Service is easy, it is not a lie, to the compassionate one,
The giver of boons to the king of elephants (Gajendra)!

Charanagalu:
1. You need not go far, you need not beat your thighs in distress,
You need not pour water, you need not be in shackles;
The Lord who says, 'The burden of the well-being of the man who calls out Narayana
Is Mine alone', the giver of boons to Prahlada!

2. Worshipping other deities is like
Doing a full prostration right in the middle of a crowded market!
If one contemplates within their heart, 'Hari, you alone are my refuge',
Lord Sri Ramachandra will protect them!

3. He who forgives thousands of mistakes and protects,
Who shines with the radiance of a dark cloud,
Who reclines on the serpent, the Lord of all worlds,
The immeasurable one, our Father, Sri Krishna!`;
  
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
