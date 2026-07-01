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

  const id = 'vyasatirtha-33';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Esalugangala Kaanti',
      firstLine: 'Esalugangala kaanti holeva mukhada daala',
      lyrics: `ಪಲ್ಲವಿ:
ಎಸಳುಗಂಗಳ ಕಾಂತಿ ಹೊಳೆವ ಮುಖದ ಡಾಳ
ಶಶಿಮುಖಿ ಚಲುವಿಕೆಯ

ಅನುಪಲ್ಲವಿ:
ಕುಸುಮನಾಭನ ಕೂಡೇನೆಂಬೊ ಭರದಿಂದ
ಬಿಸಿ ಹಾಲನೆ ಹೊತ್ತಳೋ

ಚರಣಗಳು:
೧. ಹಾಲು ಕೊಂಡೀರೆಂದು ಸಾರಿದಡಾ ಬಾಲೆ
ಕೇರಿ ಕೇರಿಯ ಒಳಗೆ ನಿನ್ನ
ಹಾಲಿನ ಬೆಲೆಯನ್ನು ಹೇಳಿ ಮಾನಿನಿರನ್ನೆ
ಕೇಳಿದ್ದ ಕೊಡುವೆನೆಂದ

೨. ಕಮ್ಮನೆ ಕಾದಿಹ ಎಮ್ಮೆಯ ಹಾಲಿಗೆ
ಒಮ್ಮನ ಹೊನ್ನೆಂದಳು
ಬೆಣ್ಣೆಗಳ್ಳ ಕೃಷ್ಣ ಕಣ್ಣು ಸನ್ನೆಯ ಮಾಡಿ
ನಿನ್ನ ಒಯಿವೆನೆನ್ನಲು

೩. ಕೆಟ್ಟೆನೆಲೆಲೋ ಕೃಷ್ಣ ಇತ್ತಲ್ಯಾತಕೆ ಬಂದೆ
ಅತ್ತೆಮಾವಂದಿರುಂಟು
ಘಟ್ಟನೆ ಕಂಡರೆ ಬಿಟ್ಟು ಬಿಡರು ನಿನ್ನ
ಮುಟ್ಟದಿರೆಂದಳಾಕೆ

೪. ಎಂದ ಮಾತಿಗೆ ನಾನಂಜುವನಲ್ಲವೆ
ಇಂದಿನ ದಿನದೊಳಗೆ ಎನ್ನ
ಮಂದಿರದೊಳಗಿದ್ದು ಮರುದಿನ ಪೋಗೆಂದು
ಮುಂಗೈಯ ಪಿಡಿದುಕೊಂಡ

೫. ಗಂಡನುಳ್ಳವಳ ಮುಂಗೈಯ ಪಿಡಿವಂಥ
ಪುಂಡತನವು ಸರಿಯೆ
ಪುಂಡರೀಕಾಕ್ಷಿ ಕೇಳೆ ದುಂಡು ಮಲ್ಲಿಗೆ ಹೂವ
ಕಂಡರೆ ಬಿಡುವರೇನೆ

೬. ಬಾಳುವ ಹೆಣ್ಣಿನ ತೋಳನೆ ಪಿಡಿವುದು
ನ್ಯಾಯವೇನೋ ನಿನಗೆ
ಫುಲ್ಲನಯನೆ ಕೇಳೆ ಅಣ್ಣಮಲ್ಲಿಗೆ ಹೂವ
ಬಲ್ಲೋರು ಬಿಡುವರೇನೆ

೭. ಬೈಗಾಯಿತು ಬೈದಾರು ಮನೆಯಲ್ಲಿ
ಬಿಡುಬಿಡು ಎಲ್ಲೋ ಗೋವಳ
ಐಗಾರ ನಾ ಕಾಣೆ, ಜಗದಲ್ಲಿ ಜೀವರ
ಹಿಡಿದು ಬಿಡುವಲ್ಲದೆ

೮. ಸಕ್ಕರೆ ಚಲುಪಾಲು ಆರ್ತಿಯಾಯಿತೆಂದು
ಎತ್ತಿಕೊಂಡು ಕುಡಿದ
ಅಕ್ಕರೆಯಿಂದಲಿ ಬೇಡು ನೀ ಕೇಳಿದ
ವಸ್ತುವ ಕೊಡುವೆನೆಂದ

೯. ವಸ್ತುವ್ಯಾತಕೆ ಪರವಸ್ತುವೆ ನಾ ನಿನ್ನ
ಮೆಚ್ಚಿ ಬಂದೇನೆಂದಳು
ಭಕ್ತರ ಸಿರಿಕೃಷ್ಣ ಕುಕ್ಷಿಯೊಳಗೆ ಇಟ್ಟು
ರಕ್ಷಿಸು ಎಂದಳಾಕೆ`,
      transliteration: `Pallavi:
Esalugangala kaanti holeva mukhada daala
Shashimukhi chaluvekeya

Anupallavi:
Kusumanaabhana koodenembo bharadinda
Bisi haalane hottalo

Charanagalu:
1. Haalu kondeerendu saaridada baale
Keri keriya olage ninna
Haalina beleyannu heli maaniniranne
Kelidda koduvenenda

2. Kammane kaadiha emmeya haalige
Ommana honnendalu
Bennegalla krishna kannu sanneya maadi
Ninna oyivenennalu

3. Kettenelelo krishna ittalyatake bande
Attemaavandiruntu
Ghattane kandare bittu bidaru ninna
Muttadirendalaake

4. Enda maatige naananjuvanallave
Indina dinadolage enna
Mandiradolagiddu marudina pogendu
Mungaiya pididukonda

5. Gandanullavala mungaiya pidivantha
Pundatanavu sariye
Pundareekaakshi kele dundu mallige hoova
Kandare biduvarene

6. Baaluva hennina tolane pidivudu
Nyaayaveno ninage
Phullanayane kele annamallige hoova
Balloru biduvarene

7. Baigaayitu baidaaru maneyalli
Bidubidu ello govala
Aigaara naa kaane, jagadalli jeevara
Hididu biduvallade

8. Sakkare chalupaalu aartiyaayitendu
Ettikondu kudida
Akkareyindali bedu nee kelida
Vastuva koduvenenda

9. Vastuvyaatake paravastuve naa ninna
Mecchi bandenendalu
Bhaktara sirikrishna kukshiyolage ittu
Rakshisu endalaake`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Esalugangala Kaanti',
      firstLine: 'Esalugangala kaanti holeva mukhada daala',
      lyrics: `ಪಲ್ಲವಿ:
ಎಸಳುಗಂಗಳ ಕಾಂತಿ ಹೊಳೆವ ಮುಖದ ಡಾಳ
ಶಶಿಮುಖಿ ಚಲುವಿಕೆಯ

ಅನುಪಲ್ಲವಿ:
ಕುಸುಮನಾಭನ ಕೂಡೇನೆಂಬೊ ಭರದಿಂದ
ಬಿಸಿ ಹಾಲನೆ ಹೊತ್ತಳೋ

ಚರಣಗಳು:
೧. ಹಾಲು ಕೊಂಡೀರೆಂದು ಸಾರಿದಡಾ ಬಾಲೆ
ಕೇರಿ ಕೇರಿಯ ಒಳಗೆ ನಿನ್ನ
ಹಾಲಿನ ಬೆಲೆಯನ್ನು ಹೇಳಿ ಮಾನಿನಿರನ್ನೆ
ಕೇಳಿದ್ದ ಕೊಡುವೆನೆಂದ

೨. ಕಮ್ಮನೆ ಕಾದಿಹ ಎಮ್ಮೆಯ ಹಾಲಿಗೆ
ಒಮ್ಮನ ಹೊನ್ನೆಂದಳು
ಬೆಣ್ಣೆಗಳ್ಳ ಕೃಷ್ಣ ಕಣ್ಣು ಸನ್ನೆಯ ಮಾಡಿ
ನಿನ್ನ ಒಯಿವೆನೆನ್ನಲು

೩. ಕೆಟ್ಟೆನೆಲೆಲೋ ಕೃಷ್ಣ ಇತ್ತಲ್ಯಾತಕೆ ಬಂದೆ
ಅತ್ತೆಮಾವಂದಿರುಂಟು
ಘಟ್ಟನೆ ಕಂಡರೆ ಬಿಟ್ಟು ಬಿಡರು ನಿನ್ನ
ಮುಟ್ಟದಿರೆಂದಳಾಕೆ

೪. ಎಂದ ಮಾತಿಗೆ ನಾನಂಜುವನಲ್ಲವೆ
ಇಂದಿನ ದಿನದೊಳಗೆ ಎನ್ನ
ಮಂದಿರದೊಳಗಿದ್ದು ಮರುದಿನ ಪೋಗೆಂದು
ಮುಂಗೈಯ ಪಿಡಿದುಕೊಂಡ

೫. ಗಂಡನುಳ್ಳವಳ ಮುಂಗೈಯ ಪಿಡಿವಂಥ
ಪುಂಡತನವು ಸರಿಯೆ
ಪುಂಡರೀಕಾಕ್ಷಿ ಕೇಳೆ ದುಂಡು ಮಲ್ಲಿಗೆ ಹೂವ
ಕಂಡರೆ ಬಿಡುವರೇನೆ

೬. ಬಾಳುವ ಹೆಣ್ಣಿನ ತೋಳನೆ ಪಿಡಿವುದು
ನ್ಯಾಯವೇನೋ ನಿನಗೆ
ಫುಲ್ಲನಯನೆ ಕೇಳೆ ಅಣ್ಣಮಲ್ಲಿಗೆ ಹೂವ
ಬಲ್ಲೋರು ಬಿಡುವರೇನೆ

೭. ಬೈಗಾಯಿತು ಬೈದಾರು ಮನೆಯಲ್ಲಿ
ಬಿಡುಬಿಡು ಎಲ್ಲೋ ಗೋವಳ
ಐಗಾರ ನಾ ಕಾಣೆ, ಜಗದಲ್ಲಿ ಜೀವರ
ಹಿಡಿದು ಬಿಡುವಲ್ಲದೆ

೮. ಸಕ್ಕರೆ ಚಲುಪಾಲು ಆರ್ತಿಯಾಯಿತೆಂದು
ಎತ್ತಿಕೊಂಡು ಕುಡಿದ
ಅಕ್ಕರೆಯಿಂದಲಿ ಬೇಡು ನೀ ಕೇಳಿದ
ವಸ್ತುವ ಕೊಡುವೆನೆಂದ

೯. ವಸ್ತುವ್ಯಾತಕೆ ಪರವಸ್ತುವೆ ನಾ ನಿನ್ನ
ಮೆಚ್ಚಿ ಬಂದೇನೆಂದಳು
ಭಕ್ತರ ಸಿರಿಕೃಷ್ಣ ಕುಕ್ಷಿಯೊಳಗೆ ಇಟ್ಟು
ರಕ್ಷಿಸು ಎಂದಳಾಕೆ`,
      transliteration: `Pallavi:
Esalugangala kaanti holeva mukhada daala
Shashimukhi chaluvekeya

Anupallavi:
Kusumanaabhana koodenembo bharadinda
Bisi haalane hottalo

Charanagalu:
1. Haalu kondeerendu saaridada baale
Keri keriya olage ninna
Haalina beleyannu heli maaniniranne
Kelidda koduvenenda

2. Kammane kaadiha emmeya haalige
Ommana honnendalu
Bennegalla krishna kannu sanneya maadi
Ninna oyivenennalu

3. Kettenelelo krishna ittalyatake bande
Attemaavandiruntu
Ghattane kandare bittu bidaru ninna
Muttadirendalaake

4. Enda maatige naananjuvanallave
Indina dinadolage enna
Mandiradolagiddu marudina pogendu
Mungaiya pididukonda

5. Gandanullavala mungaiya pidivantha
Pundatanavu sariye
Pundareekaakshi kele dundu mallige hoova
Kandare biduvarene

6. Baaluva hennina tolane pidivudu
Nyaayaveno ninage
Phullanayane kele annamallige hoova
Balloru biduvarene

7. Baigaayitu baidaaru maneyalli
Bidubidu ello govala
Aigaara naa kaane, jagadalli jeevara
Hididu biduvallade

8. Sakkare chalupaalu aartiyaayitendu
Ettikondu kudida
Akkareyindali bedu nee kelida
Vastuva koduvenenda

9. Vastuvyaatake paravastuve naa ninna
Mecchi bandenendalu
Bhaktara sirikrishna kukshiyolage ittu
Rakshisu endalaake`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
The radiance of petal-like eyes, the glow of a shining face,
O moon-faced beauty!

Anupallavi:
In the rush to join the lotus-naveled Lord,
She carried hot milk on her head!

Charanagalu:
1. As the girl announced, 'Please buy milk',
In every street, He asked her,
'Tell me the price of your milk, O lady,
I will give you whatever you ask.'

2. For the sweet, boiled buffalo's milk,
She said, 'One measure of gold.'
Krishna, the butter-thief, winking his eye, said,
'I will take you away instead!'

3. 'I am ruined, O Krishna, why did you come here?
My mother-in-law and father-in-law are here.
If they see us, they will not spare you!
Do not touch me,' she said.

4. To her words, He replied, 'I am not one to fear!
Just for today, stay
Inside my house, and leave tomorrow,'
And He grabbed her wrist.

5. 'Is it right for you to show such rowdiness
By grabbing the wrist of a married woman?'
'Listen, O lotus-eyed one, if one sees a round jasmine flower,
Would they let it go?'

6. 'Is it justice for you
To grab the arm of a respectable woman?'
'Listen, O blossoming-eyed one, if one sees a blooming jasmine flower,
Would those who know its value let it go?'

7. 'It is getting late, they will scold me at home,
Let go, let go, O cowherd!
I don't know any trickery, other than you grabbing
And not letting go of souls in this world!'

8. Saying, 'I have a craving for sweet milk with sugar,'
He took it and drank it.
'Ask with love, I will give you
Whatever object you ask for,' He said.

9. 'What need do I have for objects? O Supreme Reality, I have
Come being pleased with you,' she said.
'O Sri Krishna of the devotees, keep me inside your womb
And protect me,' she said!`;
  
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
