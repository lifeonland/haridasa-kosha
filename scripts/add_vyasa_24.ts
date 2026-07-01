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
  const ragaId = await getOrCreateRaga('Desh');
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

  const id = 'vyasatirtha-24';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Kaanade Nillalaarade',
      firstLine: 'Kaanade nillalaarade enna manavu',
      lyrics: `ಪಲ್ಲವಿ:
ಕಾಣದೆ ನಿಲ್ಲಲಾರದೆ ಎನ್ನ ಮನವು |
ಪ್ರಾಣನಾಥ ನಿನ್ನ ಚರಣ ಕಮಲವ ||

ಅನುಪಲ್ಲವಿ:
ಬಾಣಾಸುರಹರ ಬಾಲಗೋಪಾಲ ಕೃಷ್ಣ |
ವೇಣುಲೋಲ ಕರುಣಿಸೊ ಮುಖ ಕಮಲವ ||

ಚರಣಗಳು:
ಹಗಲು ಇರುಳು ನಿನ್ನ ನೆನೆದು ನಾ ಬೆಂದೆನು |
ಜಗದೊಳು ನಿನ್ನ ಸರಿ ದೈವವ ಕಾಣೆನು |
ಯುಗ ಯುಗ ಕಳೆದರೂ ಮುಗಿಯದೀ ಪ್ರೇಮವ |
ನಗಧರ ಕೃಷ್ಣ ನೀ ತಿಳಿಯದಿದ್ದೀಯೇ ||

ತಾಯಿಯು ಮಗುವನು ಮರೆತಿರಲಾರಳು |
ಆಯಾಸಗೊಂಡಾಗ ಆಸರೆ ನೀನೇ |
ಮಾಯದ ಸಂಸಾರ ಸಾಗರದಿ ಮುಳುಗಿದೆ |
ಕಾಯೊ ನಮ್ಮ ಶ್ರೀಕೃಷ್ಣ ದಯಾನಿಧಿಯೇ ||`,
      transliteration: `Pallavi:
Kaanade nillalaarade enna manavu |
Praananaatha ninna charana kamalava ||

Anupallavi:
Baanasurahara balagopala krishna |
Venulola karuniso mukha kamalava ||

Charanagalu:
Hagalu irulu ninna nenedu naa bendenu |
Jagadolu ninna sari daivava kaanenu |
Yuga yuga kaledaru mugiyadi premava |
Nagadhara krishna nee tiliyadiddiye ||

Taayiyu maguvanu maretiralaaralu |
Aayaasagondaga aasare neene |
Maayada samsaara saagaradi mulugide |
Kaayo namma srikrishna dayanidhiye ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Kaanade Nillalaarade',
      firstLine: 'Kaanade nillalaarade enna manavu',
      lyrics: `ಪಲ್ಲವಿ:
ಕಾಣದೆ ನಿಲ್ಲಲಾರದೆ ಎನ್ನ ಮನವು |
ಪ್ರಾಣನಾಥ ನಿನ್ನ ಚರಣ ಕಮಲವ ||

ಅನುಪಲ್ಲವಿ:
ಬಾಣಾಸುರಹರ ಬಾಲಗೋಪಾಲ ಕೃಷ್ಣ |
ವೇಣುಲೋಲ ಕರುಣಿಸೊ ಮುಖ ಕಮಲವ ||

ಚರಣಗಳು:
ಹಗಲು ಇರುಳು ನಿನ್ನ ನೆನೆದು ನಾ ಬೆಂದೆನು |
ಜಗದೊಳು ನಿನ್ನ ಸರಿ ದೈವವ ಕಾಣೆನು |
ಯುಗ ಯುಗ ಕಳೆದರೂ ಮುಗಿಯದೀ ಪ್ರೇಮವ |
ನಗಧರ ಕೃಷ್ಣ ನೀ ತಿಳಿಯದಿದ್ದೀಯೇ ||

ತಾಯಿಯು ಮಗುವನು ಮರೆತಿರಲಾರಳು |
ಆಯಾಸಗೊಂಡಾಗ ಆಸರೆ ನೀನೇ |
ಮಾಯದ ಸಂಸಾರ ಸಾಗರದಿ ಮುಳುಗಿದೆ |
ಕಾಯೊ ನಮ್ಮ ಶ್ರೀಕೃಷ್ಣ ದಯಾನಿಧಿಯೇ ||`,
      transliteration: `Pallavi:
Kaanade nillalaarade enna manavu |
Praananaatha ninna charana kamalava ||

Anupallavi:
Baanasurahara balagopala krishna |
Venulola karuniso mukha kamalava ||

Charanagalu:
Hagalu irulu ninna nenedu naa bendenu |
Jagadolu ninna sari daivava kaanenu |
Yuga yuga kaledaru mugiyadi premava |
Nagadhara krishna nee tiliyadiddiye ||

Taayiyu maguvanu maretiralaaralu |
Aayaasagondaga aasare neene |
Maayada samsaara saagaradi mulugide |
Kaayo namma srikrishna dayanidhiye ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
My mind cannot stand still without seeing,
O Lord of my life, your lotus feet.

Anupallavi:
O destroyer of Banasura, O young cowherd Krishna,
O one fond of the flute, show mercy and reveal your lotus face.

Charanagalu:
Day and night, thinking of you, I have melted away (in longing),
In this world, I see no deity equal to you.
Even if eras pass, this love will not end,
O Krishna who lifted the mountain, do you not know this?

A mother cannot stay forgetting her child,
When I am exhausted, you are my only refuge.
I am drowning in this illusory ocean of worldly life,
Protect me, our Sri Krishna, O ocean of mercy.`;
  
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
