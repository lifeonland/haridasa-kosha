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
  const talaId = await getOrCreateTala('Ata');

  // Find existing sripadaraja to get proper references
  const composer = await prisma.composer.findUnique({ where: { id: 'sripadaraja' } });
  
  if (!composer) {
    console.log("sripadaraja not found, make sure he exists!");
    return;
  }
  
  const ankita = await prisma.ankita.upsert({
      where: { name: 'Ranga Vittala' },
      update: {},
      create: { name: 'Ranga Vittala' }
  });
  
  const deity = await prisma.deity.upsert({
      where: { name: 'Krishna' },
      update: {},
      create: { name: 'Krishna' }
  });

  const id = 'sripadaraja-1'; // or unique ID

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Eke Dooruvire Rangayyana',
      firstLine: 'Eke dooruvire rangayyana',
      lyrics: `ಪಲ್ಲವಿ:
ಏಕೆ ದೂರುವಿರೇ ರಂಗಯ್ಯನ
ಏಕೆ ದೂರುವಿರೇ 

ಅನುಪಲ್ಲವಿ:
ಸಾಕು ನಿಮ್ಮ ದೂರು ಬಲ್ಲೆನು
ಈ ಕುವರನಾ ಕೃತ್ಯ ಮಾಳ್ವನೆ 

ಚರಣಗಳು:
೧. ದಟ್ಟಡಿಯಿಡಲರಿಯ ಗೋವತ್ಸವ
ಬಿಟ್ಟು ಚಲಿಸಬಲ್ಲನೆ
ಘಟ್ಟಿಯಾಗಿ ಗೊತ್ತಿನಲ್ಲಿ
ಕಟ್ಟಿನೊಳು ಕಟ್ಟಿದ್ದ ಕರುಗಳ
ಬಿಟ್ಟನೇ ಈ ಕೃಷ್ಣನ ಮೇ
ಲೆಷ್ಟು ಹೊಟ್ಟೆಕಿಚ್ಚು ನಿಮಗೆ 

೨. ಕೆನೆಹಾಲು ಬೆಣ್ಣೆಯನ್ನು ಇತ್ತರೆ ಆ
ದಿನವೊಲ್ಲನು ಊಟವ
ಮನೆ ಮನೆ ಮನೆಗಳನ್ನು ಹೊಕ್ಕು
ಬೆಣ್ಣೆಪಾಲೊಸರನ್ನು ತಿನ್ನುತ
ವನಿತೆಯರ ಕೂಡಾಡಿದನೆಂ-
ದನಲು ನಿಮಗೆ ನಾಚಿಕಿಲ್ಲವೆ

೩. ಹಾಲು ಮೊಸರು ಬೆಣ್ಣೆಯು ಇಲ್ಲವೆ ನ-
ಮ್ಮಾಲಯದೊಳು ನೋಡಿರೆ
ಹೇಳುವರೆ ಈ ಶಾಲಿಗಳ ಗೋ
ಪಾಲ ಬಾಲನ ನೋಡಿ ಸೈಸದೆ
ಬಾಳುವಿರ ಭವ ಜಲಧಿಯಿಂದಲಿ
ತೇಲಿಸುವನೆ ರಂಗವಿಠಲ`,
      transliteration: `Pallavi:
Eke dooruvire rangayyana
Eke dooruvire

Anupallavi:
Saaku nimma dooru ballenu
Ee kuvaranaa krutya maalvane

Charanagalu:
1. Dattadiyidalariya govatsava
Bittu chalisaballane
Ghattiyaagi gottinalli
Kattinolu kattidda karugala
Bittane ee krishnana me-
Leshtu hottekicchu nimage

2. Kenehaalu benneyannu ittare aa
Dinavollanu ootava
Mane mane manegalannu hokku
Bennepaalosarannu tinnuta
Vaniteyara koodaadidanem-
Danalu nimage naachikillave

3. Haalu mosaru benneyu illave na-
Mmaalayadolu nodire
Heluvare ee shaaligala go-
Paala baalana nodi saisade
Baaluvira bhava jaladhiyindali
Telisuvane rangavithala`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Eke Dooruvire Rangayyana',
      firstLine: 'Eke dooruvire rangayyana',
      lyrics: `ಪಲ್ಲವಿ:
ಏಕೆ ದೂರುವಿರೇ ರಂಗಯ್ಯನ
ಏಕೆ ದೂರುವಿರೇ 

ಅನುಪಲ್ಲವಿ:
ಸಾಕು ನಿಮ್ಮ ದೂರು ಬಲ್ಲೆನು
ಈ ಕುವರನಾ ಕೃತ್ಯ ಮಾಳ್ವನೆ 

ಚರಣಗಳು:
೧. ದಟ್ಟಡಿಯಿಡಲರಿಯ ಗೋವತ್ಸವ
ಬಿಟ್ಟು ಚಲಿಸಬಲ್ಲನೆ
ಘಟ್ಟಿಯಾಗಿ ಗೊತ್ತಿನಲ್ಲಿ
ಕಟ್ಟಿನೊಳು ಕಟ್ಟಿದ್ದ ಕರುಗಳ
ಬಿಟ್ಟನೇ ಈ ಕೃಷ್ಣನ ಮೇ
ಲೆಷ್ಟು ಹೊಟ್ಟೆಕಿಚ್ಚು ನಿಮಗೆ 

೨. ಕೆನೆಹಾಲು ಬೆಣ್ಣೆಯನ್ನು ಇತ್ತರೆ ಆ
ದಿನವೊಲ್ಲನು ಊಟವ
ಮನೆ ಮನೆ ಮನೆಗಳನ್ನು ಹೊಕ್ಕು
ಬೆಣ್ಣೆಪಾಲೊಸರನ್ನು ತಿನ್ನುತ
ವನಿತೆಯರ ಕೂಡಾಡಿದನೆಂ-
ದನಲು ನಿಮಗೆ ನಾಚಿಕಿಲ್ಲವೆ

೩. ಹಾಲು ಮೊಸರು ಬೆಣ್ಣೆಯು ಇಲ್ಲವೆ ನ-
ಮ್ಮಾಲಯದೊಳು ನೋಡಿರೆ
ಹೇಳುವರೆ ಈ ಶಾಲಿಗಳ ಗೋ
ಪಾಲ ಬಾಲನ ನೋಡಿ ಸೈಸದೆ
ಬಾಳುವಿರ ಭವ ಜಲಧಿಯಿಂದಲಿ
ತೇಲಿಸುವನೆ ರಂಗವಿಠಲ`,
      transliteration: `Pallavi:
Eke dooruvire rangayyana
Eke dooruvire

Anupallavi:
Saaku nimma dooru ballenu
Ee kuvaranaa krutya maalvane

Charanagalu:
1. Dattadiyidalariya govatsava
Bittu chalisaballane
Ghattiyaagi gottinalli
Kattinolu kattidda karugala
Bittane ee krishnana me-
Leshtu hottekicchu nimage

2. Kenehaalu benneyannu ittare aa
Dinavollanu ootava
Mane mane manegalannu hokku
Bennepaalosarannu tinnuta
Vaniteyara koodaadidanem-
Danalu nimage naachikillave

3. Haalu mosaru benneyu illave na-
Mmaalayadolu nodire
Heluvare ee shaaligala go-
Paala baalana nodi saisade
Baaluvira bhava jaladhiyindali
Telisuvane rangavithala`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Why do you blame Rangayya?
Why do you complain?

Anupallavi:
Enough of your complaints, I know!
Would this little boy commit such acts?

Charanagalu:
1. He barely knows how to take firm steps,
Could he let loose the calves and walk away?
The calves that were tied tightly
To the peg with a thick rope—
Did this Krishna release them?
How much jealousy you have against Him!

2. Even if I serve Him creamy milk and butter,
He refuses to eat on that day!
Yet you say He enters every house,
Eats their butter, milk, and curds,
And plays with the women!
Do you have no shame to say such things?

3. Are there no milk, curds, or butter
In our own house? Look here!
Will you speak like this just because you cannot bear
To see this beautiful cowherd boy (Gopala)?
Will you truly thrive (with this jealousy)?
Only Ranga Vittala can make us float across the ocean of worldly existence!`;
  
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
