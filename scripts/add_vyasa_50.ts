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
  const ragaId = await getOrCreateRaga('Madhyamavati');
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

  const id = 'vyasatirtha-50';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Rangayya Manege Bandare',
      firstLine: 'Rangayya manege bandare anta rangadi gudikatti kunive naa',
      lyrics: `ಪಲ್ಲವಿ:
ರಂಗಯ್ಯ ಮನೆಗೆ ಬಂದರೆ ಅಂತ
ರಂಗದಿ ಗುಡಿಕಟ್ಟಿ ಕುಣಿವೆ ನಾ

ಚರಣಗಳು:
೧. ಎಳೆತುಳಸಿ ವನಮಾಲೆಯು ರಂಗ
ಎಳೆನೀಲದ ಮೈಯ ಧಾಳವು
ಹೊಳೆವ ಪೊಂಗೊಳಲೊಪ್ಪೆ ಚಲುವನು ನಮ್ಮ
ನಿಲಯಕ್ಕೆ ಬಂದ ಭಾಗ್ಯವ ನೋಡಾ

೨. ಬಾಡಿದ ಮಾವು ಪಲ್ಲವಿಸಿತು ಹರಿ
ನೋಡಲು ಜಗವು ಭುಲ್ಲವಿಸಿತು
ಕೂಡಿದ ಮನದ ತಾಪಗಳೆಲ್ಲ ಎತ್ತ
ಲೋಡಿತೊ ಹರಿಬಂದ ಭರದಿಂದ ನೋಡಾ

೩. ಬಿಸಿಲು ಬೆಳದಿಂಗಳಾಯಿತು ತಾ
ಮಸ ಹೋಗಿ ಜ್ಞಾನೋದಯವಾಯಿತು
ಕುಸುಮನಾಭನು ತಾ ಬಂದರೆ ಅಲ್ಲಿ
ವಿಷ ಹೋಗಿ ಅಮೃತವಾಯಿತು ನೋಡಾ

೪. ಹಾವು ನ್ಯಾವಳವಾಯಿತು ಅಲ್ಲಿ
ದಾವಾನಳ ತಂಪಾಯಿತು
ಬೇವು ಸಕ್ಕರೆಯಾಯಿತು ನಮ್ಮ
ದೇವಕಿಸುತ ತಾ ಬಂದರೆ ನೋಡಾ

೫. ಜಾಣೆಯರರಸ ನೋಡು ರಂಗನು ಅವ
ತಾನಾಗಿ ಬೆನ್ನ ಬಿಡ ನಮ್ಮನು
ಏನಾದರೂ ಅಗಲದಲೆ ನಮ್ಮ
ಮಾನಾಭಿಮಾನದೊಡೆಯ ಶ್ರೀಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Rangayya manege bandare anta
Rangadi gudikatti kunive naa

Charanagalu:
1. Eletulasi vanamaaleyu ranga
Eleneelada maiya dhaalavu
Holeva pongolaloppe chaluvanu namma
Nilayakke banda bhaagyava nodaa

2. Baadida maavu pallavisitu hari
Nodalu jagavu bhullavisitu
Koodida manada taapagalella etta
Lodito haribanda bharadinda nodaa

3. Bisilu beladingalaayitu taa
Masa hogi jnaanodayavaayitu
Kusumanaabhanu taa bandare alli
Visha hogi amrutavaayitu nodaa

4. Haavu nyaavalavaayitu alli
Daavaanala tampaayitu
Bevu sakkareyaayitu namma
Devakisuta taa bandare nodaa

5. Jaaneyararasa nodu ranganu ava
Taanaagi benna bida nammanu
Enaadaaroo agaladale namma
Maanaabhimaanadodeya shreekrishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Rangayya Manege Bandare',
      firstLine: 'Rangayya manege bandare anta rangadi gudikatti kunive naa',
      lyrics: `ಪಲ್ಲವಿ:
ರಂಗಯ್ಯ ಮನೆಗೆ ಬಂದರೆ ಅಂತ
ರಂಗದಿ ಗುಡಿಕಟ್ಟಿ ಕುಣಿವೆ ನಾ

ಚರಣಗಳು:
೧. ಎಳೆತುಳಸಿ ವನಮಾಲೆಯು ರಂಗ
ಎಳೆನೀಲದ ಮೈಯ ಧಾಳವು
ಹೊಳೆವ ಪೊಂಗೊಳಲೊಪ್ಪೆ ಚಲುವನು ನಮ್ಮ
ನಿಲಯಕ್ಕೆ ಬಂದ ಭಾಗ್ಯವ ನೋಡಾ

೨. ಬಾಡಿದ ಮಾವು ಪಲ್ಲವಿಸಿತು ಹರಿ
ನೋಡಲು ಜಗವು ಭುಲ್ಲವಿಸಿತು
ಕೂಡಿದ ಮನದ ತಾಪಗಳೆಲ್ಲ ಎತ್ತ
ಲೋಡಿತೊ ಹರಿಬಂದ ಭರದಿಂದ ನೋಡಾ

೩. ಬಿಸಿಲು ಬೆಳದಿಂಗಳಾಯಿತು ತಾ
ಮಸ ಹೋಗಿ ಜ್ಞಾನೋದಯವಾಯಿತು
ಕುಸುಮನಾಭನು ತಾ ಬಂದರೆ ಅಲ್ಲಿ
ವಿಷ ಹೋಗಿ ಅಮೃತವಾಯಿತು ನೋಡಾ

೪. ಹಾವು ನ್ಯಾವಳವಾಯಿತು ಅಲ್ಲಿ
ದಾವಾನಳ ತಂಪಾಯಿತು
ಬೇವು ಸಕ್ಕರೆಯಾಯಿತು ನಮ್ಮ
ದೇವಕಿಸುತ ತಾ ಬಂದರೆ ನೋಡಾ

೫. ಜಾಣೆಯರರಸ ನೋಡು ರಂಗನು ಅವ
ತಾನಾಗಿ ಬೆನ್ನ ಬಿಡ ನಮ್ಮನು
ಏನಾದರೂ ಅಗಲದಲೆ ನಮ್ಮ
ಮಾನಾಭಿಮಾನದೊಡೆಯ ಶ್ರೀಕೃಷ್ಣ`,
      transliteration: `Pallavi:
Rangayya manege bandare anta
Rangadi gudikatti kunive naa

Charanagalu:
1. Eletulasi vanamaaleyu ranga
Eleneelada maiya dhaalavu
Holeva pongolaloppe chaluvanu namma
Nilayakke banda bhaagyava nodaa

2. Baadida maavu pallavisitu hari
Nodalu jagavu bhullavisitu
Koodida manada taapagalella etta
Lodito haribanda bharadinda nodaa

3. Bisilu beladingalaayitu taa
Masa hogi jnaanodayavaayitu
Kusumanaabhanu taa bandare alli
Visha hogi amrutavaayitu nodaa

4. Haavu nyaavalavaayitu alli
Daavaanala tampaayitu
Bevu sakkareyaayitu namma
Devakisuta taa bandare nodaa

5. Jaaneyararasa nodu ranganu ava
Taanaagi benna bida nammanu
Enaadaaroo agaladale namma
Maanaabhimaanadodeya shreekrishna`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
If Rangayya comes to my house,
I will build a temple for Him in my inner heart and dance!

Charanagalu:
1. With a garland of tender wild Tulasi, O Ranga,
And a body shining like a young dark-blue gem!
With a glowing golden flute, the handsome one
Has come to our home! Behold this fortune!

2. The withered mango tree has sprouted fresh leaves,
Upon seeing Hari, the world is thrilled!
All the accumulated sorrows of the mind—where
Have they run away with the arrival of Hari? Behold!

3. The scorching sun has become like cool moonlight,
The darkness (ignorance) has vanished, and the dawn of knowledge has arrived!
When the lotus-navelled Lord arrives,
Poison turns into nectar! Behold!

4. The snake has become a jewelled waist-belt there,
The raging forest fire has become cool!
The bitter neem has turned into sweet sugar,
When our Devaki's son arrives! Behold!

5. Look at Ranga, the king of intelligent women, He
Will not leave our backs on His own accord!
No matter what happens, without separating,
Sri Krishna is the Lord of our honor and pride!`;
  
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
