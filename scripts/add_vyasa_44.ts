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
  const ragaId = await getOrCreateRaga('Surati');
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

  const id = 'vyasatirtha-44';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Tumbitu Beladingalu',
      firstLine: 'Tumbitu beladingalu ee vanadolu',
      lyrics: `ಪಲ್ಲವಿ:
ತುಂಬಿತು ಬೆಳದಿಂಗಳು ಈ ವನದೊಳು
ತುಂಬಿತು ಬೆಳದಿಂಗಳು

ಅನುಪಲ್ಲವಿ:
ತುಂಬಿತು ಬೆಳದಿಂಗಳೀ ವನದೊಳಗಿಲ್ಲ
ಅಂಬುಜನಾಭನು ಬಾರ ಕಾಣಕ್ಕ

ಚರಣಗಳು:
ಮಾಗಿ ಹೋಗಿ ವಸಂತವು ಬರುತಿದೆ
ಕೋಗಿಲೆ ತುಂಬಿಲ್ಲಿ ಕೂಗುತಿದೆ

೧. ಆಗಲೆ ಎಳೆಮಾವು ತಳಿರೇಳುತಲಿದೆ
ನಾಗಶಯನ ಕೃಷ್ಣ ಬಾರ ಕಾಣಕ್ಕ

೨. ಕಟ್ಟಿಡ್ಡ ಬಿಳಿಯೆಲೆ ತೊಟ್ಟಾರುತಲಿದೆ
ಪಟ್ಲ ಜಾಜಿಯ ಮೊಗ್ಗು ಅರಳುತಿದೆ
ಬಟ್ಟೆ ಬಟ್ಟೆಯ ನೋಡಿ ಕಣ್ಣು ಝುಮ್ಮಿಟ್ಟಿಟ್ಟು
ದಿಟ್ಟತನದ ರಂಗ ಬಾರ ಕಾಣಕ್ಕ

೩. ಕಾದನೀರು ಎಲ್ಲ ಆರಿಹೋಗುತಿದೆ
ಕೊಯ್ದ ಮಲ್ಲಿಗೆ ಹೂವು ಬಾಡುತಿದೆ
ಮದನನ ಬಾಧೆಯು ಬಹಳವಾಗಿದೆ ಈಗ
ಮದನನಯ್ಯನು ಕೃಷ್ಣ ಬಾರ ಕಾಣಕ್ಕ

೪. ಹಾಸಿದ ಹಾಸು ಮಂಚ ಹಸಗೆಟ್ಟು ಹೋಗುತಿದೆ
ಪೂಸಿದ ಶ್ರೀಗಂಧ ಬೆವರುತಿದೆ
ಲೇಸಾದ ನಮ್ಮ ದೇಹ ಮಿಂಚೇರುತಲಿದೆ
ವಾಸುದೇವನು ಕೃಷ್ಣ ಬಾರ ಕಾಣಕ್ಕ

೫. ಅಡವಿಲಿ ಕೆರೆಕುಂಟೆ ಕುಡಿವೋರಿಲ್ಲದೆ ಬತ್ತಿ
ನಡೆವೋರಿಲ್ಲದೆ ದಾರಿ ಹಸಗೆಟ್ಟಿತ್ತು
ಕಾಡಮಲ್ಲಿಗೆ ಹೂವ ಕೊಯ್ದು ಮುಡಿವೋರಿಲ್ಲ
ನೋಡದೆ ಎನ್ನ ಜೀವ ಹಸಗೆಟ್ಟಿತ್ತಮ್ಮ

೬. ಕಾಯವ ಹೊಳವು ಮಾಡಿ ಕುಚವ ಸೋರೆಯ ಮಾಡಿ
ಮನವೆಂಬ ತಂತಿಯ ಹೂಡಿಕೊಂಡು
ಎರಡು ಕಂಗಳನ್ನು ಎರಡು ತಾಳವ ಮಾಡಿ
ಮ್ಯಾಳಕೊಪ್ಪುವ ರಂಗ ಬಾರ ಕಾಣಕ್ಕ

೭. ಒಳದೊಡೆ ನಡುಗಿತೆ ನೆರಿಯು ಹಾರುತಲಿದೆ
ಕಳಕಳಿಸುತಲಿದೆ ಕಳವಳವು
ಪುಳಕವಾಗುತಲಿದೆ ಕಲೆಯುಗುಂದುತಲಿದೆ
ನಳಿನನಾಭನು ಕೃಷ್ಣ ಬಾರ ಕಾಣಕ್ಕ`,
      transliteration: `Pallavi:
Tumbitu beladingalu ee vanadolu
Tumbitu beladingalu

Anupallavi:
Tumbitu beladingalee vanadolagilla
Ambujanaabhanu baara kaanakka

Charanagalu:
Maagi hogi vasantavu barutide
Kogile tumbilli koogutide

1. Aagale elemaavu talirelutalide
Naagashayana krishna baara kaanakka

2. Kattidda biliyele tottaarutalide
Patla jaajiya moggu aralutide
Batte batteya nodi kannu jhummittittu
Dittatanada ranga baara kaanakka

3. Kaadaneeru ella aarihogutide
Koyda mallige hoovu baadutide
Madanana baadheyu bahalavaagide eega
Madananayyanu krishna baara kaanakka

4. Haasida haasu mancha hasagettu hogutide
Poosida shreegandha bevarutide
Lesaada namma deha mincherutalide
Vaasudevanu krishna baara kaanakka

5. Adavili kerekunte kudivorillade batti
Nadevorillade daari hasagettittu
Kaadamallige hoova koydu mudivorilla
Nodade enna jeeva hasagettittamma

6. Kaayava holavu maadi kuchava soreya maadi
Manavemba tantiya hoodikondu
Eradu kangalannu eradu taalava maadi
Myalakoppuva ranga baara kaanakka

7. Oladode nadugite neriyu haarutalide
Kalakalisutalide kalavalavu
Pulakavaagutalide kaleyugundutalide
Nalinanaabhanu krishna baara kaanakka`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Tumbitu Beladingalu',
      firstLine: 'Tumbitu beladingalu ee vanadolu',
      lyrics: `ಪಲ್ಲವಿ:
ತುಂಬಿತು ಬೆಳದಿಂಗಳು ಈ ವನದೊಳು
ತುಂಬಿತು ಬೆಳದಿಂಗಳು

ಅನುಪಲ್ಲವಿ:
ತುಂಬಿತು ಬೆಳದಿಂಗಳೀ ವನದೊಳಗಿಲ್ಲ
ಅಂಬುಜನಾಭನು ಬಾರ ಕಾಣಕ್ಕ

ಚರಣಗಳು:
ಮಾಗಿ ಹೋಗಿ ವಸಂತವು ಬರುತಿದೆ
ಕೋಗಿಲೆ ತುಂಬಿಲ್ಲಿ ಕೂಗುತಿದೆ

೧. ಆಗಲೆ ಎಳೆಮಾವು ತಳಿರೇಳುತಲಿದೆ
ನಾಗಶಯನ ಕೃಷ್ಣ ಬಾರ ಕಾಣಕ್ಕ

೨. ಕಟ್ಟಿಡ್ಡ ಬಿಳಿಯೆಲೆ ತೊಟ್ಟಾರುತಲಿದೆ
ಪಟ್ಲ ಜಾಜಿಯ ಮೊಗ್ಗು ಅರಳುತಿದೆ
ಬಟ್ಟೆ ಬಟ್ಟೆಯ ನೋಡಿ ಕಣ್ಣು ಝುಮ್ಮಿಟ್ಟಿಟ್ಟು
ದಿಟ್ಟತನದ ರಂಗ ಬಾರ ಕಾಣಕ್ಕ

೩. ಕಾದನೀರು ಎಲ್ಲ ಆರಿಹೋಗುತಿದೆ
ಕೊಯ್ದ ಮಲ್ಲಿಗೆ ಹೂವು ಬಾಡುತಿದೆ
ಮದನನ ಬಾಧೆಯು ಬಹಳವಾಗಿದೆ ಈಗ
ಮದನನಯ್ಯನು ಕೃಷ್ಣ ಬಾರ ಕಾಣಕ್ಕ

೪. ಹಾಸಿದ ಹಾಸು ಮಂಚ ಹಸಗೆಟ್ಟು ಹೋಗುತಿದೆ
ಪೂಸಿದ ಶ್ರೀಗಂಧ ಬೆವರುತಿದೆ
ಲೇಸಾದ ನಮ್ಮ ದೇಹ ಮಿಂಚೇರುತಲಿದೆ
ವಾಸುದೇವನು ಕೃಷ್ಣ ಬಾರ ಕಾಣಕ್ಕ

೫. ಅಡವಿಲಿ ಕೆರೆಕುಂಟೆ ಕುಡಿವೋರಿಲ್ಲದೆ ಬತ್ತಿ
ನಡೆವೋರಿಲ್ಲದೆ ದಾರಿ ಹಸಗೆಟ್ಟಿತ್ತು
ಕಾಡಮಲ್ಲಿಗೆ ಹೂವ ಕೊಯ್ದು ಮುಡಿವೋರಿಲ್ಲ
ನೋಡದೆ ಎನ್ನ ಜೀವ ಹಸಗೆಟ್ಟಿತ್ತಮ್ಮ

೬. ಕಾಯವ ಹೊಳವು ಮಾಡಿ ಕುಚವ ಸೋರೆಯ ಮಾಡಿ
ಮನವೆಂಬ ತಂತಿಯ ಹೂಡಿಕೊಂಡು
ಎರಡು ಕಂಗಳನ್ನು ಎರಡು ತಾಳವ ಮಾಡಿ
ಮ್ಯಾಳಕೊಪ್ಪುವ ರಂಗ ಬಾರ ಕಾಣಕ್ಕ

೭. ಒಳದೊಡೆ ನಡುಗಿತೆ ನೆರಿಯು ಹಾರುತಲಿದೆ
ಕಳಕಳಿಸುತಲಿದೆ ಕಳವಳವು
ಪುಳಕವಾಗುತಲಿದೆ ಕಲೆಯುಗುಂದುತಲಿದೆ
ನಳಿನನಾಭನು ಕೃಷ್ಣ ಬಾರ ಕಾಣಕ್ಕ`,
      transliteration: `Pallavi:
Tumbitu beladingalu ee vanadolu
Tumbitu beladingalu

Anupallavi:
Tumbitu beladingalee vanadolagilla
Ambujanaabhanu baara kaanakka

Charanagalu:
Maagi hogi vasantavu barutide
Kogile tumbilli koogutide

1. Aagale elemaavu talirelutalide
Naagashayana krishna baara kaanakka

2. Kattidda biliyele tottaarutalide
Patla jaajiya moggu aralutide
Batte batteya nodi kannu jhummittittu
Dittatanada ranga baara kaanakka

3. Kaadaneeru ella aarihogutide
Koyda mallige hoovu baadutide
Madanana baadheyu bahalavaagide eega
Madananayyanu krishna baara kaanakka

4. Haasida haasu mancha hasagettu hogutide
Poosida shreegandha bevarutide
Lesaada namma deha mincherutalide
Vaasudevanu krishna baara kaanakka

5. Adavili kerekunte kudivorillade batti
Nadevorillade daari hasagettittu
Kaadamallige hoova koydu mudivorilla
Nodade enna jeeva hasagettittamma

6. Kaayava holavu maadi kuchava soreya maadi
Manavemba tantiya hoodikondu
Eradu kangalannu eradu taalava maadi
Myalakoppuva ranga baara kaanakka

7. Oladode nadugite neriyu haarutalide
Kalakalisutalide kalavalavu
Pulakavaagutalide kaleyugundutalide
Nalinanaabhanu krishna baara kaanakka`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
The moonlight has filled this forest,
The moonlight has filled!

Anupallavi:
Though the moonlight has filled this forest, He is not here.
O lotus-navelled one, please come, see sister!

Charanagalu:
Winter has gone and spring is arriving,
The cuckoos and bees are singing here.

1. The tender mango leaves are already sprouting,
O Krishna who sleeps on the serpent, please come, see sister!

2. The folded betel leaves have dried up at the stems,
The Patla and Jaji buds are blossoming,
Looking at every path, my eyes have become dizzy,
O brave Ranga, please come, see sister!

3. The heated water is cooling down,
The plucked jasmine flowers are withering,
The torment of Manmatha (Cupid) has become intense now,
O Krishna, father of Manmatha, please come, see sister!

4. The bed that was made is getting ruined,
The applied sandalwood paste is sweating away,
Our beautiful bodies are glowing like lightning,
O Vasudeva Krishna, please come, see sister!

5. In the forest, the ponds have dried up with no one to drink from them,
The paths are ruined with no one to walk on them,
There is no one to pluck and wear the wild jasmine flowers,
Without seeing Him, my life is ruined, O mother!

6. Making the body the sounding board, making the breasts the gourds,
Stringing the wire called the mind,
Making the two eyes the two cymbals (taala),
O Ranga who matches this melody, please come, see sister!

7. Inside, there is trembling, the garment is fluttering,
The anxiety is murmuring,
Thrills are arising, the radiance is fading,
O lotus-navelled Krishna, please come, see sister!`;
  
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
