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
      where: { name: 'Udupi Krishna' },
      update: {},
      create: { name: 'Udupi Krishna' }
  });
  
  const deity = await prisma.deity.upsert({
      where: { name: 'Krishna' },
      update: {},
      create: { name: 'Krishna' }
  });

  const id = 'vyasatirtha-52';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Sikkidanele Jaane',
      firstLine: 'Sikkidanele jaane shree venugopaala',
      lyrics: `ಪಲ್ಲವಿ:
ಸಿಕ್ಕಿದನೆಲೆ ಜಾಣೆ ಶ್ರೀ ವೇಣುಗೋಪಾಲ
ಭಕ್ತವತ್ಸಲ ದೇವನು

ಅನುಪಲ್ಲವಿ:
ಮಕ್ಕಳ ಚೆಂಡಿಕೆ ಮರದ ಕೊನೆಗೆ ಕಟ್ಟಿ
ಪಕ್ಕನೆ ಕೈ ಚಪ್ಪಾಳಕ್ಕಿ ಕೂಗುವ ರಂಗ

ಚರಣಗಳು:
೧. ಹೆಣ್ಣು ಮಕ್ಕಳು ಬಚ್ಚಲೊಳಗಿಣ್ಣೆ ಮಂಡೆಯೊಳು
ಬಣ್ಣ ವಸ್ತ್ರವ ಬಿಟ್ಟು ಬರಿಯ ಮೈಯೊಳಗಿರೆ
ಚಿನ್ನಿಗ ಬಿಸಿನೀರು ಚೆಲ್ಲಿ ಸೀರೆಯನೊಯ್ದು
ಉನ್ನತವಾದ ವೃಕ್ಷವನೇರಿದ ಜಾಣ

೨. ಪಟ್ಟ ಮಂಚದ ಮ್ಯಾಲೆ ಪತಿಯಂತೆ ಮಲಗಿರೆ
ಎಷ್ಟು ಸ್ವತಂತ್ರವೆಂದು ಪೇಳಿದೆನು
ಉಟ್ಟ ಸೀರೆಯ ಬಿಚ್ಚಿ ಬಟ್ಟಕುಚವ ಪಿಡಿದು
ಎಷ್ಟಂತ ಪೇಳಲೆ ಭ್ರಷ್ಟ ಮಾಡಿದ ನಮ್ಮ

೩. ಸಡಗರದಲಿ ಸೋಳಸಾಸಿರ ಗೋಪೇರ
ಒಡಗೂಡಿ ಕೊಳಲನೂದುತ ಮೊಸರನ್ನೆ
ಕಡೆವ ಗೊಲ್ಲತ್ತೇರ ಕೈಪಿಡಿದಾಡುವ
ಒಡೆಯನೆ ಇವ ನಮ್ಮ ಉಡುಪಿಯ ಸಿರಿಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Sikkidanele jaane shree venugopaala
Bhaktavatsala devanu

Anupallavi:
Makkala chendike marada konege katti
Pakkane kai chappaalakki kooguva ranga

Charanagalu:
1. Hennumakkalu bachchalolaginne mandeyolu
Banna vastrava bittu bariya maiyolagire
Chinniga bisineeru chelli seereyanoydu
Unnatavaada vrukshavanerida jaana

2. Patta manchada myaale patiyante malagire
Eshtu svatantravendu pelidenu
Utta seereya bicchi battakuchava pididu
Eshtanta pelale bhrashta maadida namma

3. Sadagaradali solasaasira gopera
Odaguudi kolalanooduta mosaranne
Kadeva gollattera kaipididaaduva
Odeyane iva namma udupiya sirikrishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Sikkidanele Jaane',
      firstLine: 'Sikkidanele jaane shree venugopaala',
      lyrics: `ಪಲ್ಲವಿ:
ಸಿಕ್ಕಿದನೆಲೆ ಜಾಣೆ ಶ್ರೀ ವೇಣುಗೋಪಾಲ
ಭಕ್ತವತ್ಸಲ ದೇವನು

ಅನುಪಲ್ಲವಿ:
ಮಕ್ಕಳ ಚೆಂಡಿಕೆ ಮರದ ಕೊನೆಗೆ ಕಟ್ಟಿ
ಪಕ್ಕನೆ ಕೈ ಚಪ್ಪಾಳಕ್ಕಿ ಕೂಗುವ ರಂಗ

ಚರಣಗಳು:
೧. ಹೆಣ್ಣು ಮಕ್ಕಳು ಬಚ್ಚಲೊಳಗಿಣ್ಣೆ ಮಂಡೆಯೊಳು
ಬಣ್ಣ ವಸ್ತ್ರವ ಬಿಟ್ಟು ಬರಿಯ ಮೈಯೊಳಗಿರೆ
ಚಿನ್ನಿಗ ಬಿಸಿನೀರು ಚೆಲ್ಲಿ ಸೀರೆಯನೊಯ್ದು
ಉನ್ನತವಾದ ವೃಕ್ಷವನೇರಿದ ಜಾಣ

೨. ಪಟ್ಟ ಮಂಚದ ಮ್ಯಾಲೆ ಪತಿಯಂತೆ ಮಲಗಿರೆ
ಎಷ್ಟು ಸ್ವತಂತ್ರವೆಂದು ಪೇಳಿದೆನು
ಉಟ್ಟ ಸೀರೆಯ ಬಿಚ್ಚಿ ಬಟ್ಟಕುಚವ ಪಿಡಿದು
ಎಷ್ಟಂತ ಪೇಳಲೆ ಭ್ರಷ್ಟ ಮಾಡಿದ ನಮ್ಮ

೩. ಸಡಗರದಲಿ ಸೋಳಸಾಸಿರ ಗೋಪೇರ
ಒಡಗೂಡಿ ಕೊಳಲನೂದುತ ಮೊಸರನ್ನೆ
ಕಡೆವ ಗೊಲ್ಲತ್ತೇರ ಕೈಪಿಡಿದಾಡುವ
ಒಡೆಯನೆ ಇವ ನಮ್ಮ ಉಡುಪಿಯ ಸಿರಿಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Sikkidanele jaane shree venugopaala
Bhaktavatsala devanu

Anupallavi:
Makkala chendike marada konege katti
Pakkane kai chappaalakki kooguva ranga

Charanagalu:
1. Hennumakkalu bachchalolaginne mandeyolu
Banna vastrava bittu bariya maiyolagire
Chinniga bisineeru chelli seereyanoydu
Unnatavaada vrukshavanerida jaana

2. Patta manchada myaale patiyante malagire
Eshtu svatantravendu pelidenu
Utta seereya bicchi battakuchava pididu
Eshtanta pelale bhrashta maadida namma

3. Sadagaradali solasaasira gopera
Odaguudi kolalanooduta mosaranne
Kadeva gollattera kaipididaaduva
Odeyane iva namma udupiya sirikrishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Did you catch Him, O clever girl? Sri Venugopala,
The Lord who is deeply affectionate towards His devotees!

Anupallavi:
Tying the children's hair to the branch of a tree,
Ranga suddenly claps His hands and shouts!

Charanagalu:
1. When the young women were in the bathing house with oil on their heads,
Leaving their colorful clothes aside, bathing bare-bodied,
The little boy splashed hot water, took away their sarees,
And the clever one climbed up a tall tree!

2. When He was sleeping like a husband on the royal bed,
I asked Him, 'How can You be so audacious and independent?'
He untied the saree I wore, grabbed my full breasts,
How much can I tell? He completely ruined our modesty!

3. In a grand celebration, joining with sixteen thousand Gopis,
Playing His flute, He plays holding the hands
Of the cowherd women who are churning curds!
This Lord is our Udupi's Sri Krishna!`;
  
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
