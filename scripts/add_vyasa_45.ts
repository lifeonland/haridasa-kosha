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
  const ragaId = await getOrCreateRaga('Mukhari');
  const talaId = await getOrCreateTala('Adi');

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

  const id = 'vyasatirtha-45';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Naranaadamyaale Harinaamu',
      firstLine: 'Naranaadamyaale harinaamu jihveyolagirabeku',
      lyrics: `ಪಲ್ಲವಿ:
ನರನಾದಮ್ಯಾಲೆ ಹರಿನಾಮು
ಜಿಹ್ವೆಯೊಳಗಿರಬೇಕು

ಚರಣಗಳು:
ಭೂತದಯಾಪರನಾಗಿರಬೇಕು
ಪಾತಕವೆಲ್ಲ ಕಳೆಯಲುಬೇಕು
ಮಾತುಮಾತಿಗೆ ಹರಿಯೆನಬೇಕು

ಶಾಂತಿ ಶಮೆ ದಮೆ ಹಿಡಿಯಲು ಬೇಕು
ಭ್ರಾಂತಿ ಕ್ರೋಧವ ಕಳೆಯಲು ಬೇಕು
ಸಂತತ ಸನ್ಮಾರ್ಗದಲ್ಲಿ ಇರಬೇಕು

ಕಾಮ ಕ್ರೋಧವ ತಾ ಬಿಡಬೇಕು
ಮಮತೆ ಅಹಂಕಾರವ ಕಳೆಯಲುಬೇಕು
ಸೌಮ್ಯರ ಸಂಗದೊಳಿರಬೇಕು

ವೇದ ಶಾಸ್ತ್ರವನೋದಲು ಬೇಕು
ಭೇದ ತತ್ವ ತಿಳಿಯಲು ಬೇಕು
ಮಾಧವನ ಸ್ಮರಣೆಯು ಮಾಡಲುಬೇಕು

ತಂದೆ ಕೃಷ್ಣನ ದಯವಿರಲು ಬೇಕು
ಬಂದುದುಂಡು ಸುಖಿಪಡಬೇಕು
ಚಂದಾಗಿ ಜಗದೊಳಿರಬೇಕು`,
      transliteration: `Pallavi:
Naranaadamyaale harinaamu
Jihveyolagirabeku

Charanagalu:
Bhootadayaaparanaagirabeku
Paatakavella kaleyalubeku
Maatumaatige hariyenabeku

Shaanti shame dame hidiyalu beku
Bhraanti krodhava kaleyalu beku
Santata sanmaargadalli irabeku

Kaama krodhava taa bidabeku
Mamate ahamkaarava kaleyalubeku
Soumyara sangadolirabeku

Veda shaastravanodalu beku
Bheda tatva tiliyalu beku
Maadhavana smaraneyu maadalubeku

Tande krishnana dayaviralu beku
Bandudundu sukhipadabeku
Chandaagi jagadolirabeku`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Naranaadamyaale Harinaamu',
      firstLine: 'Naranaadamyaale harinaamu jihveyolagirabeku',
      lyrics: `ಪಲ್ಲವಿ:
ನರನಾದಮ್ಯಾಲೆ ಹರಿನಾಮು
ಜಿಹ್ವೆಯೊಳಗಿರಬೇಕು

ಚರಣಗಳು:
ಭೂತದಯಾಪರನಾಗಿರಬೇಕು
ಪಾತಕವೆಲ್ಲ ಕಳೆಯಲುಬೇಕು
ಮಾತುಮಾತಿಗೆ ಹರಿಯೆನಬೇಕು

ಶಾಂತಿ ಶಮೆ ದಮೆ ಹಿಡಿಯಲು ಬೇಕು
ಭ್ರಾಂತಿ ಕ್ರೋಧವ ಕಳೆಯಲು ಬೇಕು
ಸಂತತ ಸನ್ಮಾರ್ಗದಲ್ಲಿ ಇರಬೇಕು

ಕಾಮ ಕ್ರೋಧವ ತಾ ಬಿಡಬೇಕು
ಮಮತೆ ಅಹಂಕಾರವ ಕಳೆಯಲುಬೇಕು
ಸೌಮ್ಯರ ಸಂಗದೊಳಿರಬೇಕು

ವೇದ ಶಾಸ್ತ್ರವನೋದಲು ಬೇಕು
ಭೇದ ತತ್ವ ತಿಳಿಯಲು ಬೇಕು
ಮಾಧವನ ಸ್ಮರಣೆಯು ಮಾಡಲುಬೇಕು

ತಂದೆ ಕೃಷ್ಣನ ದಯವಿರಲು ಬೇಕು
ಬಂದುದುಂಡು ಸುಖಿಪಡಬೇಕು
ಚಂದಾಗಿ ಜಗದೊಳಿರಬೇಕು`,
      transliteration: `Pallavi:
Naranaadamyaale harinaamu
Jihveyolagirabeku

Charanagalu:
Bhootadayaaparanaagirabeku
Paatakavella kaleyalubeku
Maatumaatige hariyenabeku

Shaanti shame dame hidiyalu beku
Bhraanti krodhava kaleyalu beku
Santata sanmaargadalli irabeku

Kaama krodhava taa bidabeku
Mamate ahamkaarava kaleyalubeku
Soumyara sangadolirabeku

Veda shaastravanodalu beku
Bheda tatva tiliyalu beku
Maadhavana smaraneyu maadalubeku

Tande krishnana dayaviralu beku
Bandudundu sukhipadabeku
Chandaagi jagadolirabeku`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Once born as a human, the name of Lord Hari
Must be upon the tongue!

Charanagalu:
One must be compassionate towards all beings,
One must wash away all sins,
In every word, one must say 'Hari'!

One must hold onto peace, self-control, and restraint,
One must cast away illusion and anger,
One must constantly walk on the righteous path!

One must abandon lust and anger,
One must discard attachment and ego,
One must remain in the company of the gentle and wise!

One must read the Vedas and Shastras,
One must understand the philosophy of difference (Bheda Tattva - Dvaita),
One must remember Lord Madhava!

One must have the grace of father Krishna,
One must be happy partaking in whatever comes their way,
One must live beautifully and righteously in this world!`;
  
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
