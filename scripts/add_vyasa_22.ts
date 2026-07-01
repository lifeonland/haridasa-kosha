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
  const ragaId = await getOrCreateRaga('Hamsadhwani');
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

  const id = 'vyasatirtha-22';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Naayalla Nariyalla',
      firstLine: 'Naayalla nariyalla katte sookaravalla',
      lyrics: `ಪಲ್ಲವಿ:
ನಾಯಲ್ಲ ನರಿಯಲ್ಲ ಕತ್ತೆ ಸೂಕರವಲ್ಲ |
ಕಾಯಜಪಿತ ನಿನ್ನ ಕರುಣೆಯಿಲ್ಲದ ಜನ್ಮ ||

ಅನುಪಲ್ಲವಿ:
ದೇವ ಜಗದೀಶ ಗೋವಿಂದ ಮಾಧವ ಎಂದು |
ನಾಲಿಗೆಯ ಮೇಲೊಮ್ಮೆ ನುಡಿಯದ ಕಶ್ಮಲ ||

ಚರಣಗಳು:
ಕೆಟ್ಟ ಮಾತುಗಳ ಕಿವಿಗಳಿಂದಲಿ ಕೇಳಿ |
ಮುಟ್ಟಿ ಹಿರಿಯರ ಸೇವೆ ಮಾಡದ ಪಾಪಿ |
ನೆಟ್ಟನೆ ನಿಮ್ಮಡಿ ಕೀರ್ತನೆ ಕೇಳದೆ |
ಹೊಟ್ಟೆಗೊಸುಗ ತಿರುಗುವ ಜಡ ಜೀವನು ||

ಪರ ಸತಿಯರ ನೋಡಿ ಭ್ರಮಿಸುವ ಕಂಗಳ |
ಪರ ನಿಂದೆಯ ಮಾಡಿ ನಗುವಂತ ಹಲ್ಲುಗಳ |
ಪರರ ದ್ರವ್ಯವ ನೋಡಿ ಹಾರುವ ಕೈಗಳ |
ಸ್ಥಿರವಲ್ಲದ ಕಾಯ ಸಾಕು ಮಾಡಿದೆ ರಂಗ ||

ಎಡಬಿಡದ ಭವದೊಳು ಎನ್ನ ನೀ ನೂಕದೆ |
ಕಡೆ ಹಾಯಿಸೊ ನಿನ್ನ ದಾಸಾನುದಾಸನ |
ದೃಢಭಕುತಿಯ ಕೊಟ್ಟು ಸಲಹೊ ಹರಿಯೇ ನಮ್ಮ |
ಪುಣ್ಯಮೂರ್ತಿ ಶ್ರೀಕೃಷ್ಣ ಕರುಣಾನಿಧಿಯೇ ||`,
      transliteration: `Pallavi:
Naayalla nariyalla katte sookaravalla |
Kaayajapita ninna karuneyillada janma ||

Anupallavi:
Deva jagadisha govinda madhava endu |
Naligeya melomme nudiyada kashmala ||

Charanagalu:
Ketta matugala kivigalindali keli |
Mutti hiriyara seve madada papi |
Nettane nimmadi kirtane kelade |
Hottegosuga tiruguva jada jivanu ||

Para satiyara nodi bhramisuva kangala |
Para nindeya madi naguvanta hallugala |
Parara dravyava nodi haruva kaigala |
Sthiravallada kaya saku madide ranga ||

Edabidada bhavadolu enna ni nukade |
Kade hayiso ninna dasanudasana |
Drudhabhakutiya kottu salaho hariye namma |
Punyamurti srikrishna karunanidhiye ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Naayalla Nariyalla',
      firstLine: 'Naayalla nariyalla katte sookaravalla',
      lyrics: `ಪಲ್ಲವಿ:
ನಾಯಲ್ಲ ನರಿಯಲ್ಲ ಕತ್ತೆ ಸೂಕರವಲ್ಲ |
ಕಾಯಜಪಿತ ನಿನ್ನ ಕರುಣೆಯಿಲ್ಲದ ಜನ್ಮ ||

ಅನುಪಲ್ಲವಿ:
ದೇವ ಜಗದೀಶ ಗೋವಿಂದ ಮಾಧವ ಎಂದು |
ನಾಲಿಗೆಯ ಮೇಲೊಮ್ಮೆ ನುಡಿಯದ ಕಶ್ಮಲ ||

ಚರಣಗಳು:
ಕೆಟ್ಟ ಮಾತುಗಳ ಕಿವಿಗಳಿಂದಲಿ ಕೇಳಿ |
ಮುಟ್ಟಿ ಹಿರಿಯರ ಸೇವೆ ಮಾಡದ ಪಾಪಿ |
ನೆಟ್ಟನೆ ನಿಮ್ಮಡಿ ಕೀರ್ತನೆ ಕೇಳದೆ |
ಹೊಟ್ಟೆಗೊಸುಗ ತಿರುಗುವ ಜಡ ಜೀವನು ||

ಪರ ಸತಿಯರ ನೋಡಿ ಭ್ರಮಿಸುವ ಕಂಗಳ |
ಪರ ನಿಂದೆಯ ಮಾಡಿ ನಗುವಂತ ಹಲ್ಲುಗಳ |
ಪರರ ದ್ರವ್ಯವ ನೋಡಿ ಹಾರುವ ಕೈಗಳ |
ಸ್ಥಿರವಲ್ಲದ ಕಾಯ ಸಾಕು ಮಾಡಿದೆ ರಂಗ ||

ಎಡಬಿಡದ ಭವದೊಳು ಎನ್ನ ನೀ ನೂಕದೆ |
ಕಡೆ ಹಾಯಿಸೊ ನಿನ್ನ ದಾಸಾನುದಾಸನ |
ದೃಢಭಕುತಿಯ ಕೊಟ್ಟು ಸಲಹೊ ಹರಿಯೇ ನಮ್ಮ |
ಪುಣ್ಯಮೂರ್ತಿ ಶ್ರೀಕೃಷ್ಣ ಕರುಣಾನಿಧಿಯೇ ||`,
      transliteration: `Pallavi:
Naayalla nariyalla katte sookaravalla |
Kaayajapita ninna karuneyillada janma ||

Anupallavi:
Deva jagadisha govinda madhava endu |
Naligeya melomme nudiyada kashmala ||

Charanagalu:
Ketta matugala kivigalindali keli |
Mutti hiriyara seve madada papi |
Nettane nimmadi kirtane kelade |
Hottegosuga tiruguva jada jivanu ||

Para satiyara nodi bhramisuva kangala |
Para nindeya madi naguvanta hallugala |
Parara dravyava nodi haruva kaigala |
Sthiravallada kaya saku madide ranga ||

Edabidada bhavadolu enna ni nukade |
Kade hayiso ninna dasanudasana |
Drudhabhakutiya kottu salaho hariye namma |
Punyamurti srikrishna karunanidhiye ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
It is not a dog, nor a fox, nor a donkey, nor a pig,
O Father of Manmatha (Krishna)! A life without your compassion (is worse than these).

Anupallavi:
Oh Deva! Jagadisha! Govinda! Madhava!
A filthy person who never once utters these names on their tongue.

Charanagalu:
Hearing bad words with the ears,
A sinner who does not touch and serve the elders.
Without steadfastly listening to songs of your feet,
A dull soul wandering just for the sake of the stomach.

Eyes that wander looking at others' wives,
Teeth that laugh while criticizing others,
Hands that fly out upon seeing others' wealth,
O Ranga, I have had enough of this unstable body.

Do not push me into this unceasing worldly existence,
Please take your servant of servants across to the other side.
Give me firm devotion and protect me, O Hari, our
Embodiment of merit, Sri Krishna, the ocean of mercy.`;
  
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
