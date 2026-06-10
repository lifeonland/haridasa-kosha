import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding "Dimbadhilliruva Jeeva" composition...');

  // Find Kanaka Dasa
  const composer = await prisma.composer.findFirst({ where: { id: 'kanaka-dasa' } });
  if (!composer) {
    console.error('Kanaka Dasaru not found. Please seed the database first.');
    return;
  }

  // Find/Create Ankita (Kanaka Dasa uses Kaginele Adikesava)
  let ankita = await prisma.ankita.findFirst({ where: { name: 'Kaginele Adikesava' } });
  if (!ankita) {
    ankita = await prisma.ankita.create({ data: { name: 'Kaginele Adikesava' } });
  }

  // Find/Create Deity (Krishna)
  let deity = await prisma.deity.findFirst({ where: { name: 'Krishna' } });
  if (!deity) {
    deity = await prisma.deity.create({ data: { name: 'Krishna' } });
  }

  const title = "Dimbadhilliruva Jeeva";
  const lyrics = `ಡಿಂಬದಲ್ಲಿ ಇರುವ ಜೀವ ಕಂಬಸೂತ್ರ ಗೊಂಬೆಯಂತೆ
ಎಂದಿಗಿದ್ದರೊಂದು ದಿನ ಸಾವು ತಪ್ಪದು ||pa||

ಹುಟ್ಟುತೇನು ತಾರಲಿಲ್ಲ ಸಾಯುತೇನು ಒಯ್ಯಲಿಲ್ಲ
ಸುಟ್ಟು ಸುಟ್ಟು ಸುಣ್ಣದ ಹರಳಾಯಿತೀ ದೇಹ|
ಹೊಟ್ಟೆ ಭಾಳ ಕೆಟ್ಟದೆಂದು ಎಷ್ಟು ಕಷ್ಟ ಪಟ್ಟರೂನು
ಬಿಟ್ಟು ಹೋಗುವಾಗ ಗೇಣು ಬಟ್ಟೆ ಕಾಣದು ||1||

ಹತ್ತು ಎಂಟು ಲಕ್ಷ ಗಳಿಸಿ ಮತ್ತೆ ಸಾಲದೆಂದು ಪರರ
ಅರ್ಥಕಾಗಿ ಆಸೆಪಟ್ಟು ಸುಳ್ಳು ನ್ಯಾಯ ಮಾಡ್ವರು
ಬಿತ್ತಿ ಬೆಳೆದು ತನ್ನದೆಂಬ ವ್ಯರ್ಥಚಿಂತೆಯನ್ನು ಮಾಡೆ
ಸತ್ತು ಹೋದ ಮೇಲೆ ಅರ್ಥ ಯಾರಿಗಾಹುದೊ ||2||

ಹೊನ್ನು ಹೆಣ್ಣು ಮಣ್ಣು ಮೂರು ತನ್ನಲಿದ್ದು ಉಣ್ಣಲಿಲ್ಲ
ಅಣ್ಣತಮ್ಮ ತಾಯಿ ತಂದೆ ಬಯಸಲಾಗದು
ಅನ್ನ ವಸ್ತ್ರ ಭೋಗಕಾಗಿ ತನ್ನ ಸುಖವ ಕಾಣಲಿಲ್ಲ
ಮಣ್ಣುಪಾಲು ಆದಮೇಲೆ ಯಾರಿಗಾಹುದೊ ||3||

ಬೆಳ್ಳಿ ಬಂಗರಿಟ್ಟುಕೊಂಡು ಒಳ್ಳೆ ವಸ್ತ್ರ ಹೊದ್ದುಕೊಂಡು
ಅಳ್ಳಾಚಾರಿ ಗೊಂಬೆಯಂತೆ ಆಡಿ ಹೋಯಿತು|
ಹಳ್ಳ ಹರಿದು ಹೋಗುವಾಗ ಗುಳ್ಳೆ ಬಂದು ಒಡೆಯುವಂತೆ
ಉಳ್ಳೆ ಪೊರೆಯಂತೆ ಕಾಣೊ ಸಂಸಾರದಾಟವು ||4||

ವಾರ್ತೆ ಕೀರ್ತಿಯೆಂಬುವೆರಡು ಸತ್ತ ಮೇಲೆ ಬಂದವಯ್ಯ
ವಸ್ತು ಪ್ರಾಣನಾಯಕನು ಎಲ್ಲಿ ದೊರಕ್ಯಾನು
ಕರ್ತೃ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನ ಚರಣಕಮಲ
ನಿತ್ಯದಲ್ಲಿ ಭಜಿಸಿ ಸುಖಿಯಾಗಿ ಬಾಳೆಲೊ ||5||`;

  const transliteration = `Dimbadalli iruva jiva kambasutra gombeyante
Endigadarondu dina savu tappadu || pa ||

Huttutenu taralilla sayutenu oyyalilla
Suttu suttu sunnada haralayiti deha
Hotte balu kettadendu eshtu kashta madidaru
Bittu hoguvaga genu batte kanadu || 1 ||

Hattu entu laksha galisi matte saladendu parara
Arthakagi asepattu nyaya madvaru
Bitti beledu tannademba vyarthachinteyannu made
Sattu hoda mele artha yarigahudo || 2 ||

Hennu honnu mannu muru tannaliddu unnalilla
Anna tamma tayi tande bayasalagadu
Anna vastra bogakagi tanna sukava kanalilla
Mannupalu adamele yarigahudo || 3 ||

Belli bangarittukondu olle vastra hoddukomdu
Calla pilla gombeyante adi hodane
Halla haridu hoguvaga gulle bandu odeyuvante
Gulle poreyante kano samsaradata || 4 ||

Varte kirtiyembuveradu satta mele bandavayya
Vastu prananayakanu hyange dorakuvano
Kartru kagineleyadikesavana charanakamala
Nityadalli Bajisi sukiyagi baliro || 5 ||`;

  await prisma.composition.upsert({
    where: { id: 'kanaka-dimbadhilliruva-jeeva' },
    update: {
      lyrics: lyrics,
      transliteration: transliteration,
    },
    create: {
      id: 'kanaka-dimbadhilliruva-jeeva',
      title: title,
      firstLine: 'Dimbadalli iruva jiva kambasutra gombeyante',
      lyrics: lyrics,
      transliteration: transliteration,
      composerId: composer.id,
      ankitaId: ankita.id,
      deityId: deity.id,
    },
  });

  console.log(`✅ Composition "${title}" added/updated successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
