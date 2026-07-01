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
  const ragaId = await getOrCreateRaga('Arabhi');
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

  const id = 'vyasatirtha-25';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Haridasara Sangakke Sari',
      firstLine: 'Haridasara sangakke sariyunṭe jagadolu',
      lyrics: `ಪಲ್ಲವಿ:
ಹರಿದಾಸರ ಸಂಗಕ್ಕೆ ಸರಿಯುಂಟೆ ಜಗದೊಳು |
ನರಜನ್ಮ ಸಫಲವೋ ಹರಿನಾಮ ಸ್ಮರಣೆಯೊಳು ||

ಅನುಪಲ್ಲವಿ:
ಸಿರಿದೇವಿ ರಮಣನ ಚರಣವ ನೆನೆವುತ |
ಪರಮಾನಂದದಿ ಕುಣಿವ ಭಾಗವತರ ||

ಚರಣಗಳು:
ಕಾಶಿ ರಾಮೇಶ್ವರ ತೀರ್ಥಯಾತ್ರೆಗಿಂತ |
ದಾಸರ ಪಾದದ ಧೂಳಿಯೇ ಪಾವನ |
ಕೋಟಿ ಯಜ್ಞಗಳ ಮಾಡಿದ ಪುಣ್ಯವು |
ನೋಟದಿ ಸಿಗುವುದು ಹರಿದಾಸರ ಕಂಡಾಗ ||

ಕಾಮ ಕ್ರೋಧಗಳ ಹರಿದು ದೂರ ಮಾಡಿ |
ಕೋಮಲಾಂಗ ಶ್ರೀಕೃಷ್ಣನ ಧ್ಯಾನಿಪರ |
ಪ್ರೇಮದಿ ಅವರೆಲ್ಲರ ದಾಸನಾಗುವೆ ನಾ |
ಸ್ವಾಮಿ ಶ್ರೀಕೃಷ್ಣನ ಕರುಣೆ ಪಡಯಲು ||`,
      transliteration: `Pallavi:
Haridasara sangakke sariyunṭe jagadolu |
Narajanma saphalavo harinama smaraneyolu ||

Anupallavi:
Siridevi ramanana charanava nenevuta |
Paramanandadi kuniva bhagavatara ||

Charanagalu:
Kashi rameshwara tirthayatreginta |
Dasara padada dhuliye paavana |
Koti yajnagala madida punyavu |
Notadi siguvudu haridasara kandaga ||

Kama krodhagala haridu doora maadi |
Komalanga srikrishnana dhyanipara |
Premadi avarellara dasanaguve naa |
Swami srikrishnana karune padayalu ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Haridasara Sangakke Sari',
      firstLine: 'Haridasara sangakke sariyunṭe jagadolu',
      lyrics: `ಪಲ್ಲವಿ:
ಹರಿದಾಸರ ಸಂಗಕ್ಕೆ ಸರಿಯುಂಟೆ ಜಗದೊಳು |
ನರಜನ್ಮ ಸಫಲವೋ ಹರಿನಾಮ ಸ್ಮರಣೆಯೊಳು ||

ಅನುಪಲ್ಲವಿ:
ಸಿರಿದೇವಿ ರಮಣನ ಚರಣವ ನೆನೆವುತ |
ಪರಮಾನಂದದಿ ಕುಣಿವ ಭಾಗವತರ ||

ಚರಣಗಳು:
ಕಾಶಿ ರಾಮೇಶ್ವರ ತೀರ್ಥಯಾತ್ರೆಗಿಂತ |
ದಾಸರ ಪಾದದ ಧೂಳಿಯೇ ಪಾವನ |
ಕೋಟಿ ಯಜ್ಞಗಳ ಮಾಡಿದ ಪುಣ್ಯವು |
ನೋಟದಿ ಸಿಗುವುದು ಹರಿದಾಸರ ಕಂಡಾಗ ||

ಕಾಮ ಕ್ರೋಧಗಳ ಹರಿದು ದೂರ ಮಾಡಿ |
ಕೋಮಲಾಂಗ ಶ್ರೀಕೃಷ್ಣನ ಧ್ಯಾನಿಪರ |
ಪ್ರೇಮದಿ ಅವರೆಲ್ಲರ ದಾಸನಾಗುವೆ ನಾ |
ಸ್ವಾಮಿ ಶ್ರೀಕೃಷ್ಣನ ಕರುಣೆ ಪಡಯಲು ||`,
      transliteration: `Pallavi:
Haridasara sangakke sariyunṭe jagadolu |
Narajanma saphalavo harinama smaraneyolu ||

Anupallavi:
Siridevi ramanana charanava nenevuta |
Paramanandadi kuniva bhagavatara ||

Charanagalu:
Kashi rameshwara tirthayatreginta |
Dasara padada dhuliye paavana |
Koti yajnagala madida punyavu |
Notadi siguvudu haridasara kandaga ||

Kama krodhagala haridu doora maadi |
Komalanga srikrishnana dhyanipara |
Premadi avarellara dasanaguve naa |
Swami srikrishnana karune padayalu ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Is there anything equal to the association of Haridasas in this world?
Human birth becomes fruitful in the remembrance of Hari's name!

Anupallavi:
Thinking of the feet of the Lord of Goddess Lakshmi (Siridevi),
The Bhagavatars who dance in supreme bliss!

Charanagalu:
More than pilgrimages to Kashi or Rameshwara,
The dust from the feet of the Dasas is sacred.
The merit earned from performing ten million yajnas,
Can be obtained just by a glance upon seeing the Haridasas.

Destroying lust and anger and pushing them far away,
Those who meditate on the tender-bodied Sri Krishna,
With love, I will become a servant to all of them,
In order to obtain the mercy of Lord Sri Krishna!`;
  
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
