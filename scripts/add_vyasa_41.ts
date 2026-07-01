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
  const ragaId = await getOrCreateRaga('Shankarabharana');
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

  const id = 'vyasatirtha-41';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Kaanade Nillalaare',
      firstLine: 'Kaanade nillalaare kamaneeya moorutiya',
      lyrics: `ಪಲ್ಲವಿ:
ಕಾಣದೆ ನಿಲ್ಲಲಾರೆ ಕಮನೀಯ ಮೂರುತಿಯ
ಪ್ರಾಣೇಶನ ತೋರೆ ಗಿಣಿಯೆ

ಅನುಪಲ್ಲವಿ:
ಮಾಣಿಕ್ಯ ಪದಕವ ಮನ್ನಿಸಿ ನಿನಗೀವೆ
ಜಾಣೆ ಕೃಷ್ಣನ ತೋರೆ ಗಿಣಿಯೆ

ಚರಣಗಳು:
೧. ಮಕರ ಕುಂಡಲಧರನ ಮಕರಧ್ವಜನ ಪಿತನ
ಮಕುಟಭೂಷಣನ ತೋರೆ ಗಿಣಿಯೆ
ಮಕರಾಕ್ಷಸಂಹರನ ಮಕರಾರಿ ರಕ್ಷಕನ
ಮಕರಶಿಕ್ಷಕನ ತೋರೆ ಗಿಣಿಯೆ

೨. ಇಂದುಕುಲಪಾವನನ ಇಂದೀವರಲೋಚನನ
ಇಂದು ನೀ ಕರೆತಾರೆ ಗಿಣಿಯೆ
ಇಂದುಶೇಖರನುತನ ಇಂದಿರೆಯರಸನ
ತಂದು ತೋರೆ ಮುದ್ದುಗಿಣಿಯೆ

೩. ಒಂದು ನಿಮಿಷವೊಂದು ಯುಗವಾಗಿ ತೋರಿತೆ
ಸೌಂದರ್ಯನ ತೋರೆ ಗಿಣಿಯೆ
ಮಂದಮಾರುತ ಸೋಕೆ ಮರುಳುಗೊಂಡೆನೆ ಎನ್ನ
ಮಂದಿರಕೆ ಕರೆತಾರೆ ಗಿಣಿಯೆ

೪. ಕಾಯಜನ ಬಾಣದಲಿ ಕಾಯವೆಲ್ಲವು ಬಹಳ
ಗಾಯವಾಯಿತು ನೋಡೆ ಗಿಣಿಯೆ
ಮಾಯಗಳ ಮಾಡದೆ ಮಮತೆಯಿಂದಲಿ ಎನ್ನ
ನಾಯಕನ ಕರೆತಾರೆ ಗಿಣಿಯೆ

೫. ಪಂಕಜೋದ್ಭವಪಿತನ ಪಂಕಜನಯನನ
ಪಂಕಜನಾಭನ ತೋರೆ ಗಿಣಿಯೆ
ಪಂಕಜಾಕ್ಷ ಸಿರಿಕೃಷ್ಣನ ಪದಪದ್ಮ
ಶಂಕೆಯಿಲ್ಲದೆ ತೋರೆ ಗಿಣಿಯೆ`,
      transliteration: `Pallavi:
Kaanade nillalaare kamaneeya moorutiya
Praaneshana tore giniye

Anupallavi:
Maanikya padakava mannisi ninageeve
Jaane krishnana tore giniye

Charanagalu:
1. Makara kundaladharana makaradhvajana pitana
Makutabhooshanana tore giniye
Makaraakshasamharana makaraari rakshakana
Makarashikshakana tore giniye

2. Indukulapaavanana indeevaralochanana
Indu nee karetaare giniye
Indushekharanutana indireyarasana
Tandu tore mudduginiye

3. Ondu nimishavondu yugavaagi torite
Soundaryana tore giniye
Mandamaaruta soke marulugondene enna
Mandirake karetaare giniye

4. Kaayajana baanadali kaayavellavu bahala
Gaayavaayitu node giniye
Maayagala maadade mamateyindali enna
Naayakana karetaare giniye

5. Pankajodbhavapitana pankajanayanana
Pankajanaabhana tore giniye
Pankajaaksha sirikrishnana padapadma
Shankeyillade tore giniye`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Kaanade Nillalaare',
      firstLine: 'Kaanade nillalaare kamaneeya moorutiya',
      lyrics: `ಪಲ್ಲವಿ:
ಕಾಣದೆ ನಿಲ್ಲಲಾರೆ ಕಮನೀಯ ಮೂರುತಿಯ
ಪ್ರಾಣೇಶನ ತೋರೆ ಗಿಣಿಯೆ

ಅನುಪಲ್ಲವಿ:
ಮಾಣಿಕ್ಯ ಪದಕವ ಮನ್ನಿಸಿ ನಿನಗೀವೆ
ಜಾಣೆ ಕೃಷ್ಣನ ತೋರೆ ಗಿಣಿಯೆ

ಚರಣಗಳು:
೧. ಮಕರ ಕುಂಡಲಧರನ ಮಕರಧ್ವಜನ ಪಿತನ
ಮಕುಟಭೂಷಣನ ತೋರೆ ಗಿಣಿಯೆ
ಮಕರಾಕ್ಷಸಂಹರನ ಮಕರಾರಿ ರಕ್ಷಕನ
ಮಕರಶಿಕ್ಷಕನ ತೋರೆ ಗಿಣಿಯೆ

೨. ಇಂದುಕುಲಪಾವನನ ಇಂದೀವರಲೋಚನನ
ಇಂದು ನೀ ಕರೆತಾರೆ ಗಿಣಿಯೆ
ಇಂದುಶೇಖರನುತನ ಇಂದಿರೆಯರಸನ
ತಂದು ತೋರೆ ಮುದ್ದುಗಿಣಿಯೆ

೩. ಒಂದು ನಿಮಿಷವೊಂದು ಯುಗವಾಗಿ ತೋರಿತೆ
ಸೌಂದರ್ಯನ ತೋರೆ ಗಿಣಿಯೆ
ಮಂದಮಾರುತ ಸೋಕೆ ಮರುಳುಗೊಂಡೆನೆ ಎನ್ನ
ಮಂದಿರಕೆ ಕರೆತಾರೆ ಗಿಣಿಯೆ

೪. ಕಾಯಜನ ಬಾಣದಲಿ ಕಾಯವೆಲ್ಲವು ಬಹಳ
ಗಾಯವಾಯಿತು ನೋಡೆ ಗಿಣಿಯೆ
ಮಾಯಗಳ ಮಾಡದೆ ಮಮತೆಯಿಂದಲಿ ಎನ್ನ
ನಾಯಕನ ಕರೆತಾರೆ ಗಿಣಿಯೆ

೫. ಪಂಕಜೋದ್ಭವಪಿತನ ಪಂಕಜನಯನನ
ಪಂಕಜನಾಭನ ತೋರೆ ಗಿಣಿಯೆ
ಪಂಕಜಾಕ್ಷ ಸಿರಿಕೃಷ್ಣನ ಪದಪದ್ಮ
ಶಂಕೆಯಿಲ್ಲದೆ ತೋರೆ ಗಿಣಿಯೆ`,
      transliteration: `Pallavi:
Kaanade nillalaare kamaneeya moorutiya
Praaneshana tore giniye

Anupallavi:
Maanikya padakava mannisi ninageeve
Jaane krishnana tore giniye

Charanagalu:
1. Makara kundaladharana makaradhvajana pitana
Makutabhooshanana tore giniye
Makaraakshasamharana makaraari rakshakana
Makarashikshakana tore giniye

2. Indukulapaavanana indeevaralochanana
Indu nee karetaare giniye
Indushekharanutana indireyarasana
Tandu tore mudduginiye

3. Ondu nimishavondu yugavaagi torite
Soundaryana tore giniye
Mandamaaruta soke marulugondene enna
Mandirake karetaare giniye

4. Kaayajana baanadali kaayavellavu bahala
Gaayavaayitu node giniye
Maayagala maadade mamateyindali enna
Naayakana karetaare giniye

5. Pankajodbhavapitana pankajanayanana
Pankajanaabhana tore giniye
Pankajaaksha sirikrishnana padapadma
Shankeyillade tore giniye`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
I cannot stand being without seeing His charming form,
O parrot! Show me the Lord of my life!

Anupallavi:
I will graciously offer you a pendant of rubies!
O clever parrot, show me Krishna!

Charanagalu:
1. Show me the one who wears Makara Kundala (crocodile-shaped earrings), the father of Makaradwaja (Manmatha),
And the one adorned with a crown, O parrot!
Show me the destroyer of the crocodile-demon (Makaraksha) and the protector of the enemy of the crocodile (Gajendra),
Show me the punisher of the crocodile, O parrot!

2. Please bring Him today, the purifier of the lunar dynasty, the lotus-eyed one,
O parrot!
Bring and show me the one praised by Shiva (who bears the moon) and the Lord of Indira (Lakshmi),
O my dear pet parrot!

3. One single minute feels like a whole yuga (aeon) to me,
Show me that beautiful one, O parrot!
Touched by the gentle breeze, I have become enchanted,
Please bring Him to my home, O parrot!

4. Struck by the arrows of Manmatha, my entire body
Is deeply wounded, see O parrot!
Without making any illusions, out of your affection,
Bring my beloved Lord to me, O parrot!

5. Show me the father of Brahma (who was born from the lotus), the lotus-eyed one,
And the one with a lotus emerging from His navel, O parrot!
Without any doubt, show me the lotus-feet
Of the lotus-eyed Sri Krishna, O parrot!`;
  
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
