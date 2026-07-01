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
  const talaId = await getOrCreateTala('Ata');

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

  const id = 'vyasatirtha-30';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Aparaadhavennaayya',
      firstLine: 'Aparaadhavennaayya he jeeya',
      lyrics: `ಪಲ್ಲವಿ:
ಅಪರಾಧವೆನ್ನದಯ್ಯ ಹೇ ಜೀಯ
ಅಪರಾಧವೆನ್ನದಯ್ಯ ಅಪರಿಮಿತವೆ ಸರಿ
ಕೃಪೆ ಮಾಡೋದಿಲ್ಲವೆ ಕೃಪಣವತ್ಸಲ ಕೃಷ್ಣ

ಚರಣಗಳು:
೧. ಹುಡುಗರು ಮಾಡುವ ತಪ್ಪಿಗೆ ಜನನಿ ತಾ
ಬಡುವಳೆ ಅದರಿಂದ ಕೃಪೆಯ ಮಾಡದಲೇ
ನಡೆವ ಕುದುರೆ ತಾನು ಎಡವಿದರೆ ಸ್ವಾಮಿ
ಕಡೆಗೆ ಕಟ್ಟುವನೋ ತಿರುಗಿ ನೋಡದಲೇ

೨. ಮಾಡು ಎಂದದ್ದನ್ನು ಬಿಟ್ಟರೆ ಅಪರಾಧ
ಬೇಡವೆಂದದ್ದನ್ನು ಮಾಡುವುದಪರಾಧ
ಈಡಿಲ್ಲ ನಿನ್ನ ದಯ ಬೇಡುವೆನೋ ನಿನಗೆ
ಮಾಡುವ ಬಿನ್ನಹ ನಾಚಿಕೆಯಿಲ್ಲದಲೇ

೩. ಬೇಡಿಕೊಂಬೆನೊ ವಾಸುದೇವ ಶ್ರೀಹರಿಯೆ
ನೋಡದಿದ್ದರ ಭಕುತ ಜನರು ತಮ್ಮ
ಬೇಡ ಸೇರಿಸರನ್ನ ಕೇಳೆನೊ ಇದಕಿಂತ
ನೋಡೊ ನೀ ದಯದಿಂದ ಭಕುತವತ್ಸಲ ಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Aparaadhavennaayya he jeeya
Aparaadhavennaayya aparimitave sari
Krupe maadodillave krupanavatsala krishna

Charanagalu:
1. Hudugaru maaduva tappige janani taa
Baduvale adarinda krupeya maadadale
Nadeva kudure taanu edavidare swami
Kadege kattuveno tirugi noadadale

2. Maadu endaddannu bittare aparaadha
Bedavendaddannu maaduvudaparaadha
Eedilla ninna daya beduveno ninage
Maaduva binnaha naachikeyilladale

3. Bedikombeno vasudeva shrihariye
Nodadiddara bhakuta janaru tamma
Beda serisaranna keleno idakinta
Nodo nee dayadinda bhakutavatsala krishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Aparaadhavennaayya',
      firstLine: 'Aparaadhavennaayya he jeeya',
      lyrics: `ಪಲ್ಲವಿ:
ಅಪರಾಧವೆನ್ನದಯ್ಯ ಹೇ ಜೀಯ
ಅಪರಾಧವೆನ್ನದಯ್ಯ ಅಪರಿಮಿತವೆ ಸರಿ
ಕೃಪೆ ಮಾಡೋದಿಲ್ಲವೆ ಕೃಪಣವತ್ಸಲ ಕೃಷ್ಣ

ಚರಣಗಳು:
೧. ಹುಡುಗರು ಮಾಡುವ ತಪ್ಪಿಗೆ ಜನನಿ ತಾ
ಬಡುವಳೆ ಅದರಿಂದ ಕೃಪೆಯ ಮಾಡದಲೇ
ನಡೆವ ಕುದುರೆ ತಾನು ಎಡವಿದರೆ ಸ್ವಾಮಿ
ಕಡೆಗೆ ಕಟ್ಟುವನೋ ತಿರುಗಿ ನೋಡದಲೇ

೨. ಮಾಡು ಎಂದದ್ದನ್ನು ಬಿಟ್ಟರೆ ಅಪರಾಧ
ಬೇಡವೆಂದದ್ದನ್ನು ಮಾಡುವುದಪರಾಧ
ಈಡಿಲ್ಲ ನಿನ್ನ ದಯ ಬೇಡುವೆನೋ ನಿನಗೆ
ಮಾಡುವ ಬಿನ್ನಹ ನಾಚಿಕೆಯಿಲ್ಲದಲೇ

೩. ಬೇಡಿಕೊಂಬೆನೊ ವಾಸುದೇವ ಶ್ರೀಹರಿಯೆ
ನೋಡದಿದ್ದರ ಭಕುತ ಜನರು ತಮ್ಮ
ಬೇಡ ಸೇರಿಸರನ್ನ ಕೇಳೆನೊ ಇದಕಿಂತ
ನೋಡೊ ನೀ ದಯದಿಂದ ಭಕುತವತ್ಸಲ ಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Aparaadhavennaayya he jeeya
Aparaadhavennaayya aparimitave sari
Krupe maadodillave krupanavatsala krishna

Charanagalu:
1. Hudugaru maaduva tappige janani taa
Baduvale adarinda krupeya maadadale
Nadeva kudure taanu edavidare swami
Kadege kattuveno tirugi noadadale

2. Maadu endaddannu bittare aparaadha
Bedavendaddannu maaduvudaparaadha
Eedilla ninna daya beduveno ninage
Maaduva binnaha naachikeyilladale

3. Bedikombeno vasudeva shrihariye
Nodadiddara bhakuta janaru tamma
Beda serisaranna keleno idakinta
Nodo nee dayadinda bhakutavatsala krishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
The fault is mine, O Lord!
The fault is mine, truly it is boundless.
Will you not show mercy, O Krishna, the lover of the helpless?

Charanagalu:
1. For the mistakes made by children, will a mother
Beat them instead of showing mercy?
If a walking horse happens to stumble, will the master
Tie it aside without even looking back at it?

2. Leaving undone what was told to be done is an offense,
Doing what was forbidden is an offense.
I beg for your incomparable mercy,
I make this plea to you without any shame.

3. I beg of you, O Vasudeva, Sri Hari!
If you do not look at me, will your devotees
Take me into their fold? Listen, more than this,
Please look at me with compassion, O Krishna, lover of devotees!`;
  
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
