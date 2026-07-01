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
  const talaId = await getOrCreateTala('Jhampe');

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

  const id = 'vyasatirtha-38';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Kande Kanasinali',
      firstLine: 'Kande kanasinali kaarunya mooruti hariya',
      lyrics: `ಪಲ್ಲವಿ:
ಕಂಡೆ ಕನಸಿನಲಿ ಕಾರುಣ್ಯ ಮೂರುತಿ ಹರಿಯ
ಪುಂಡರೀಕಾಕ್ಷ ಪುರುಷೋತ್ತಮನ ಸಿರಿಯ

ಚರಣಗಳು:
೧. ಚಂದು ರನ್ನದ ಮುಡಕು ಅರಳಲೆ ಹೊನ್ನ
ಗೊಂಚೆಗಳ ಬಿಗಿದ ಶಿಖಿದಾರದೆಡೆಯು
ದುಂಡುಮಲ್ಲಿಗೆಯ ಪರಿಮಳವು ಅಳಿ
ವಿಂಡುಗಳ ಜರಿವ ಸುಲಿಗುರುಳಿನಿರವ

೨. ಶಶಿವದನ ನಯನ ನಾಸಾಪುಟದ ಚಲುವಿಕೆಯು
ನೊಸಲ ಸಿರಿಯನಾಮ ಕಸ್ತೂರಿ ತಿಲಕದಾ
ಎಸೆವ ಕುಡಿಹುಬ್ಬುಗಳ ಕುಂಡಲದ ಕಾಂತಿಗಳ
ದೆಸೆದೆಸೆಗೆ ಬೆಳಗುತಿಹ ದೀಪ್ತಿಗಳನ್ನು

೩. ಕೆತ್ತನೆಯ ಪದಕ ಕೆಳಬಳಕೆ ಒಲೆದಾಡುತಿಹ
ಮುತ್ತು ಮಾಣಿಕದ ಹುಲಿಯುಗುರ ಸರದ
ಚಿತ್ತಾರದ ಹೊನ್ನ ಬಂದಿಯ ಎಣ್ಣೆಮಣಿ ಇದರ
ಒತ್ತಿನಲಿ ಸಿರಿಹಾರ ವೈಯಾರದರವ

೪. ತೋಳ ಬಳೆ ತಾಯ್ತು ಕಡಗ ಹವಳಕಂಕಣ ವಾರು
ನೀಲಮಾಣಿಕದ ಬೆರಳುಂಗುರಗಳ
ಸಾಲುಗಂಟೆಗಳ ರಂಜಿಸುವ ಕಾಂತಿಗಳು ಈ
ರೇಳು ಭುವನಗಳ ಧರಿಸಿದ ಉದರವನ್ನು

೫. ಪಟ್ಟದೊಡಿಗೆಗಳಿಗೆ ಬಿಗಿದುಟ್ಟ ಚೆಲ್ವಾ ಮೈಯ
ತೊಟ್ಟ ಜರತಾರದಂಗಿಯ ಚರಣದಿ
ಕಟ್ಟಿರುವ ಗೆಜ್ಜೆ ಸರಪಣಿ ಕಾಲ ಕಡಗಗಳ
ದಟ್ಟಡಿಯನಿಡುತ ಬಹ ಪುಟ್ಟ ಗೋಪಾಲಕನ

೬. ಬಾಲಕನು ಕರೆಯೆ ಬಹು ಕಂಬದಲಿ ಬಂದೊಡೆದು
ಬಾಲಕನ ತಂದು ಸಾಂದೀಪಗಿತ್ತಾ
ಬಾಲೆ ಚೀರಿದರೆ ಅಕ್ಷಯವಿತ್ತ ದೇವಕಿಯ
ಬಾಲಕನ ಬಹುಬಗೆಯ ಲೀಲೆಗಳನ್ನು

೭. ಪೊಗಳಲೆನ್ನಳವೆ ಪೊಸಬಗೆಯ ಮಹಿಮೆಗಳ
ಅಘಹರನ ಅಗಣಿತದ ಗುಣಗಣಗಳ ಧರೆಗೆ
ನಿಗಮನಿಕರಕೆ ಮೈಗೊಡದ ಉಡುಪಿನ ಕೃಷ್ಣನ
ಒಗುಮಿಗೆಯ ಉನ್ನತದ ವೈಯಾರಗಳನ್ನು`,
      transliteration: `Pallavi:
Kande kanasinali kaarunya mooruti hariya
Pundareekaaksha purushottamana siriya

Charanagalu:
1. Chandu rannada mudaku aralale honna
Gonshegala bigida shikhidaaradadeyu
Dundumalligeya parimalavu ali
Vindugala jariva suligurulinirava

2. Shashivadana nayana naasaaputada chaluvekeyu
Nosala siriya naama kastoori tilakadaa
Eseva kudihubbugala kundalada kaantigala
Desedesege belagutiha deeptigalannu

3. Kettaneya padaka kelabalake oledaadutiha
Muttu maanikada huliyugura sarada
Chittaarada honna bandiya ennemani idara
Ottinali sirihaara vaiyaaradarava

4. Tola bale taaytu kadaga havalakankana vaaru
Neelamaanikada beralunguragala
Saalugantegala ranjisuva kaantigalu ee
Relu bhuvanagala dharisida udaravannu

5. Pattadodigegalige bigidutta chelvaa maiya
Totta jarataaradangiya charanadi
Kattiruva gejje sarapani kaala kadagagala
Dattadiyaniduta baha putta gopaalakana

6. Baalakanu kareye bahu kambadali bandodedu
Baalakana tandu saandeepagittaa
Baale cheeridare akshayavitta devakiya
Baalakana bahubageya leelegalannu

7. Pogalalennalave posabageya mahimegala
Aghaharana aganitada gunaganagala dharege
Nigamanikarake maigodada udupinakrishnana
Ogumigeya unnatada vaiyaaragalannu`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Kande Kanasinali',
      firstLine: 'Kande kanasinali kaarunya mooruti hariya',
      lyrics: `ಪಲ್ಲವಿ:
ಕಂಡೆ ಕನಸಿನಲಿ ಕಾರುಣ್ಯ ಮೂರುತಿ ಹರಿಯ
ಪುಂಡರೀಕಾಕ್ಷ ಪುರುಷೋತ್ತಮನ ಸಿರಿಯ

ಚರಣಗಳು:
೧. ಚಂದು ರನ್ನದ ಮುಡಕು ಅರಳಲೆ ಹೊನ್ನ
ಗೊಂಚೆಗಳ ಬಿಗಿದ ಶಿಖಿದಾರದೆಡೆಯು
ದುಂಡುಮಲ್ಲಿಗೆಯ ಪರಿಮಳವು ಅಳಿ
ವಿಂಡುಗಳ ಜರಿವ ಸುಲಿಗುರುಳಿನಿರವ

೨. ಶಶಿವದನ ನಯನ ನಾಸಾಪುಟದ ಚಲುವಿಕೆಯು
ನೊಸಲ ಸಿರಿಯನಾಮ ಕಸ್ತೂರಿ ತಿಲಕದಾ
ಎಸೆವ ಕುಡಿಹುಬ್ಬುಗಳ ಕುಂಡಲದ ಕಾಂತಿಗಳ
ದೆಸೆದೆಸೆಗೆ ಬೆಳಗುತಿಹ ದೀಪ್ತಿಗಳನ್ನು

೩. ಕೆತ್ತನೆಯ ಪದಕ ಕೆಳಬಳಕೆ ಒಲೆದಾಡುತಿಹ
ಮುತ್ತು ಮಾಣಿಕದ ಹುಲಿಯುಗುರ ಸರದ
ಚಿತ್ತಾರದ ಹೊನ್ನ ಬಂದಿಯ ಎಣ್ಣೆಮಣಿ ಇದರ
ಒತ್ತಿನಲಿ ಸಿರಿಹಾರ ವೈಯಾರದರವ

೪. ತೋಳ ಬಳೆ ತಾಯ್ತು ಕಡಗ ಹವಳಕಂಕಣ ವಾರು
ನೀಲಮಾಣಿಕದ ಬೆರಳುಂಗುರಗಳ
ಸಾಲುಗಂಟೆಗಳ ರಂಜಿಸುವ ಕಾಂತಿಗಳು ಈ
ರೇಳು ಭುವನಗಳ ಧರಿಸಿದ ಉದರವನ್ನು

೫. ಪಟ್ಟದೊಡಿಗೆಗಳಿಗೆ ಬಿಗಿದುಟ್ಟ ಚೆಲ್ವಾ ಮೈಯ
ತೊಟ್ಟ ಜರತಾರದಂಗಿಯ ಚರಣದಿ
ಕಟ್ಟಿರುವ ಗೆಜ್ಜೆ ಸರಪಣಿ ಕಾಲ ಕಡಗಗಳ
ದಟ್ಟಡಿಯನಿಡುತ ಬಹ ಪುಟ್ಟ ಗೋಪಾಲಕನ

೬. ಬಾಲಕನು ಕರೆಯೆ ಬಹು ಕಂಬದಲಿ ಬಂದೊಡೆದು
ಬಾಲಕನ ತಂದು ಸಾಂದೀಪಗಿತ್ತಾ
ಬಾಲೆ ಚೀರಿದರೆ ಅಕ್ಷಯವಿತ್ತ ದೇವಕಿಯ
ಬಾಲಕನ ಬಹುಬಗೆಯ ಲೀಲೆಗಳನ್ನು

೭. ಪೊಗಳಲೆನ್ನಳವೆ ಪೊಸಬಗೆಯ ಮಹಿಮೆಗಳ
ಅಘಹರನ ಅಗಣಿತದ ಗುಣಗಣಗಳ ಧರೆಗೆ
ನಿಗಮನಿಕರಕೆ ಮೈಗೊಡದ ಉಡುಪಿನ ಕೃಷ್ಣನ
ಒಗುಮಿಗೆಯ ಉನ್ನತದ ವೈಯಾರಗಳನ್ನು`,
      transliteration: `Pallavi:
Kande kanasinali kaarunya mooruti hariya
Pundareekaaksha purushottamana siriya

Charanagalu:
1. Chandu rannada mudaku aralale honna
Gonshegala bigida shikhidaaradadeyu
Dundumalligeya parimalavu ali
Vindugala jariva suligurulinirava

2. Shashivadana nayana naasaaputada chaluvekeyu
Nosala siriya naama kastoori tilakadaa
Eseva kudihubbugala kundalada kaantigala
Desedesege belagutiha deeptigalannu

3. Kettaneya padaka kelabalake oledaadutiha
Muttu maanikada huliyugura sarada
Chittaarada honna bandiya ennemani idara
Ottinali sirihaara vaiyaaradarava

4. Tola bale taaytu kadaga havalakankana vaaru
Neelamaanikada beralunguragala
Saalugantegala ranjisuva kaantigalu ee
Relu bhuvanagala dharisida udaravannu

5. Pattadodigegalige bigidutta chelvaa maiya
Totta jarataaradangiya charanadi
Kattiruva gejje sarapani kaala kadagagala
Dattadiyaniduta baha putta gopaalakana

6. Baalakanu kareye bahu kambadali bandodedu
Baalakana tandu saandeepagittaa
Baale cheeridare akshayavitta devakiya
Baalakana bahubageya leelegalannu

7. Pogalalennalave posabageya mahimegala
Aghaharana aganitada gunaganagala dharege
Nigamanikarake maigodada udupinakrishnana
Ogumigeya unnatada vaiyaaragalannu`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
In my dream, I saw Hari, the embodiment of compassion,
The lotus-eyed one, Purushottama, along with Sri (Lakshmi)!

Charanagalu:
1. Wearing a beautiful gem-studded crown with blooming golden
Clusters tied to the peacock feather,
Emitting the fragrance of round jasmine flowers that outshines
Even the swarms of bees, with beautiful curly hair.

2. The beauty of His moon-like face, eyes, and nostrils,
The auspicious nama and kasturi (musk) tilaka on His forehead,
The brilliance of His expressive eyebrows and earrings
That spread their radiant light in all directions!

3. With intricately carved pendants swaying back and forth,
Necklaces of pearls, rubies, and tiger claws,
Artistic golden bands, dark beads, and
Alongside these, the majestic beauty of the divine garland.

4. Armlets, bracelets, amulets, and coral bangles,
Rings studded with blue sapphires on His fingers,
Rows of jingling bells radiating light, and
The stomach that holds all the fourteen worlds!

5. Wearing beautiful silk garments tightly around His lovely body,
Dressed in a gold-laced tunic, and at His feet,
Wearing jingling anklets, chains, and leg bangles,
The little Gopalaka who comes taking firm, small steps.

6. When the boy (Prahlada) called, He burst forth from the pillar,
He brought back the son and gave him to Sandipani,
When the lady (Draupadi) cried out, He gave endless garments,
The many types of divine leelas of Devaki's son!

7. Is it within my capacity to praise His ever-new glories?
The countless virtues of the destroyer of sins, who came to earth,
Who does not reveal Himself even to the multitude of Vedas, Krishna of Udupi,
His supreme, majestic, and exalted beauty!`;
  
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
