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

  const id = 'vyasatirtha-32';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Enna Mana Kanda Kadege',
      firstLine: 'Enna mana kanda kadege eragutide',
      lyrics: `ಪಲ್ಲವಿ:
ಎನ್ನ ಮನ ಕಂಡ ಕಡೆಗೆ ಎರಗುತಿದೆ
ನಿನ್ನಲ್ಲಿ ನಿಲಿಸಿ ಕಾಯೊ

ಚರಣಗಳು:
೧. ಚಕ್ಷುರಿಂದ್ರಿಯಗಳಿಂದ ಚದುರೆಯರ
ಈಕ್ಷಿಸಿ ನೊಂದೆನಯ್ಯ
ಶಿಕ್ಷಕನು ನೀನೆ ಎನಗೆ ಸಿರಿಯರಸ
ಭಕುತರೊಳಿಟ್ಟು ಕಾಯೊ

೨. ಶ್ರೋತ್ರೇಂದ್ರಿಯಗಳಿಂದ ಸತತ ದು
ವಾರ್ತೆಗಳ ಕೇಳಿ ಕೆಟ್ಟೆ
ಕರ್ತೃ ಎನಗೆ ನಿನ್ನಯಾ ಕಥೆಗಳನ್ನು
ಆರ್ತಿಯಿಂದೊರೆದು ಕಾಯೊ

೩. ಘ್ರಾಣೇಂದ್ರಿಯಗಳಿಂದ ದುರ್ಗಂಧಗಳ
ಘ್ರಾಣಿಸಿ ನೊಂದೆನಯ್ಯ
ಪ್ರಾಣೇಶ ನಿನಗರ್ಪಿತ ಪರಿಮಳವ
ಮಾಣದೆ ಇತ್ತು ಕಾಯೊ

೪. ರಸನೇಂದ್ರಿಯಗಳಿಂದ ಷಡ್ರಸಗಳನ್ನು
ಹಸಿದು ನಾ ಸೇವಿಸಿದೆನೊ
ಬಿಸಜಾಕ್ಷನೇ ನಿನ್ನಯ ಪ್ರಸಾದವನು
ಆಸ್ವಾದಿಸೆನಗೆ ದೇವಾ

೫. ತ್ವಗೇಂದ್ರಿಯಗಳಿಂದ ತಾಮಸರ
ಸೋಕಿ ನಾ ಕೆಟ್ಟೆನಯ್ಯ
ಕಾಕು ಮಾಡದೆ ಎನ್ನನು ಸಿರಿಕೃಷ್ಣ
ಸಾಕಾರನಾಗಿ ಸಲಹೊ`,
      transliteration: `Pallavi:
Enna mana kanda kadege eragutide
Ninnalli nilisi kaayo

Charanagalu:
1. Chakshurindriyagalinda chadureyara
Eekshisi nondenayya
Shikshakanu neene enage siriyarasa
Bhakutarolittu kaayo

2. Shrotrendriyagalinda satata du-
Vaartegala keli kette
Kartru enage ninnaya kathegalannu
Aartiyindoredu kaayo

3. Ghraanendriyagalinda durgandhagala
Ghraanisi nondenayya
Praanesha ninagarpita parimalava
Maanade ittu kaayo

4. Rasanendriyagalinda shadrasagalannu
Hasidu naa sevisideno
Bisajaakshane ninnaya prasaadavanu
Aasvaadisenage devaa

5. Tvagendriyagalinda taamasara
Soki naa kettenayya
Kaaku maadade ennanu sirikrishna
Saakaaranaagi salaho`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Enna Mana Kanda Kadege',
      firstLine: 'Enna mana kanda kadege eragutide',
      lyrics: `ಪಲ್ಲವಿ:
ಎನ್ನ ಮನ ಕಂಡ ಕಡೆಗೆ ಎರಗುತಿದೆ
ನಿನ್ನಲ್ಲಿ ನಿಲಿಸಿ ಕಾಯೊ

ಚರಣಗಳು:
೧. ಚಕ್ಷುರಿಂದ್ರಿಯಗಳಿಂದ ಚದುರೆಯರ
ಈಕ್ಷಿಸಿ ನೊಂದೆನಯ್ಯ
ಶಿಕ್ಷಕನು ನೀನೆ ಎನಗೆ ಸಿರಿಯರಸ
ಭಕುತರೊಳಿಟ್ಟು ಕಾಯೊ

೨. ಶ್ರೋತ್ರೇಂದ್ರಿಯಗಳಿಂದ ಸತತ ದು
ವಾರ್ತೆಗಳ ಕೇಳಿ ಕೆಟ್ಟೆ
ಕರ್ತೃ ಎನಗೆ ನಿನ್ನಯಾ ಕಥೆಗಳನ್ನು
ಆರ್ತಿಯಿಂದೊರೆದು ಕಾಯೊ

೩. ಘ್ರಾಣೇಂದ್ರಿಯಗಳಿಂದ ದುರ್ಗಂಧಗಳ
ಘ್ರಾಣಿಸಿ ನೊಂದೆನಯ್ಯ
ಪ್ರಾಣೇಶ ನಿನಗರ್ಪಿತ ಪರಿಮಳವ
ಮಾಣದೆ ಇತ್ತು ಕಾಯೊ

೪. ರಸನೇಂದ್ರಿಯಗಳಿಂದ ಷಡ್ರಸಗಳನ್ನು
ಹಸಿದು ನಾ ಸೇವಿಸಿದೆನೊ
ಬಿಸಜಾಕ್ಷನೇ ನಿನ್ನಯ ಪ್ರಸಾದವನು
ಆಸ್ವಾದಿಸೆನಗೆ ದೇವಾ

೫. ತ್ವಗೇಂದ್ರಿಯಗಳಿಂದ ತಾಮಸರ
ಸೋಕಿ ನಾ ಕೆಟ್ಟೆನಯ್ಯ
ಕಾಕು ಮಾಡದೆ ಎನ್ನನು ಸಿರಿಕೃಷ್ಣ
ಸಾಕಾರನಾಗಿ ಸಲಹೊ`,
      transliteration: `Pallavi:
Enna mana kanda kadege eragutide
Ninnalli nilisi kaayo

Charanagalu:
1. Chakshurindriyagalinda chadureyara
Eekshisi nondenayya
Shikshakanu neene enage siriyarasa
Bhakutarolittu kaayo

2. Shrotrendriyagalinda satata du-
Vaartegala keli kette
Kartru enage ninnaya kathegalannu
Aartiyindoredu kaayo

3. Ghraanendriyagalinda durgandhagala
Ghraanisi nondenayya
Praanesha ninagarpita parimalava
Maanade ittu kaayo

4. Rasanendriyagalinda shadrasagalannu
Hasidu naa sevisideno
Bisajaakshane ninnaya prasaadavanu
Aasvaadisenage devaa

5. Tvagendriyagalinda taamasara
Soki naa kettenayya
Kaaku maadade ennanu sirikrishna
Saakaaranaagi salaho`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
My mind wanders and bows down wherever it goes,
Please establish it in you and protect me!

Charanagalu:
1. Through the sense of sight (eyes), by looking at alluring women,
I have suffered, O Lord.
You alone are my guide, O Lord of Siri (Lakshmi),
Keep me among your devotees and protect me.

2. Through the sense of hearing (ears), by constantly listening to bad news,
I have been ruined.
O Creator, narrate your divine stories to me
With love, and protect me.

3. Through the sense of smell (nose), by smelling foul odors,
I have suffered, O Lord.
O Lord of Life (Pranesha), grant me unceasingly the fragrance
Offered to you, and protect me.

4. Through the sense of taste (tongue), driven by hunger,
I have consumed the six tastes.
O Lotus-eyed one, let me taste
Your divine prasadam, O Deva.

5. Through the sense of touch (skin), by touching those with tamasic qualities,
I have been ruined, O Lord.
Without rejecting me, O Sri Krishna,
Appear before me in a form and protect me!`;
  
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
