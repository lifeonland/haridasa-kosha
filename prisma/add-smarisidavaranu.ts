import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding new composition "Smarisidavaranu Kayva Namma" for Sripadarajaru...');

  const composerId = 'sripadaraja';

  // Find Sripadarajaru
  const composer = await prisma.composer.findUnique({
    where: { id: composerId },
  });

  if (!composer) {
    throw new Error('Sripadarajaru composer not found in database!');
  }

  // Find or create Ankita "Ranga Vittala"
  const ankita = await prisma.ankita.upsert({
    where: { name: 'Ranga Vittala' },
    update: {},
    create: { name: 'Ranga Vittala' },
  });

  // Find or create Deity "Srinivasa" (since the song is dedicated to Venkateshwara/Srinivasa)
  const deity = await prisma.deity.upsert({
    where: { name: 'Srinivasa' },
    update: {},
    create: {
      name: 'Srinivasa',
      imageUrl: '/assets/webp/srinivasa.webp',
    },
  });

  const lyrics = `ಪಲ್ಲವಿ
ಸ್ಮರಿಸಿದವರನು ಕಾಯ್ವ ನಮ್ಮ ಸೂರ್ಯಾನೇಕ
ಪ್ರಭಾವ ಸುರ ಮುನಿಗಳ ಸಂಜೀವ ಶ್ರೀ ವೆಂಕಟ
ನಮ್ಮನು ಪೊರೆವ || ಪ ||

ಚರಣ 1
ವೈಕುಂಠದಿಂದ ಬಂದು ಶೇಷಾಚಲದಲಿ ನಿಂದು
ಭಕ್ತರ ಪಾಲಿಪೆನೆಂದು ಅಭಯ ದಯಾಕರ ಸಿಂಧು
ಭಕುತಿ ಮುಕುತಿಯೀವ ಮತ್ಕುಲದೇವನೆ
ಸಕಲ ಜನಸೇವಿತ ಘನ ಪರಿಪೂರ್ಣನೆ
ವಿಕಸಿತ ಕಮಲನಯನ ಕಂಜನಾಭನೆ
ಪ್ರಕಟಿತ ಶುಭಕೀರ್ತಿಯಿಂದ ಮೆರೆವನೆ || 1 ||

ಚರಣ 2
ಜ್ಞಾನಿಗಳ ಗೋಚರನೆ ತನ್ನ ಧ್ಯಾನಿಪರ ಮನೋಹರನೆ
ದಾನವರ ಸಂಹರನೆ ಮಹಾದೈನ್ಯಾದಿಗಳುದ್ಧರನೆ
ಆನಂದಮಯನೆ ಅನೇಕಾವತಾರನೆ
ಅನುದಿನ ನೆನೆವರ ಹೃದಯ ಮಂದಿರನೆ
ಘನ ಮಾಣಿಕ ಭೂಷಣ ಶೃಂಗಾರನೆ
ತನುವಿನ ಕ್ಲೇಶ ದುರಿತಸಂಹರನೆ || 2 ||

ಚರಣ 3
ಜಯತು ದೋಷವಿನಾಶ ಜಯ mahiಮಾ ವಿಶೇಷ
ಜಯತು ಲಕುಮೀ ಪರಿತೋಷ ಜಯ ಶ್ರೀ ವೆಂಕಟೇಶ
ಜಯ ಕಮಲಜಜನಕನೆ ಜಯ ಜಗದೀಶ
ಜಯ ಗಜವರದ ಪಾಲಿತ ಪುಣ್ಯಘೋಷ
ಜಯತು ಜನಾರ್ಧನ ಜಗನ್ಮೋಹನ ವೇಷ
ಜಯ ರಂಗ ವಿಠಲ ಕರುಣಾವಿಲಾಸ || 3 ||`;

  const transliteration = `Pallavi
Smarisidavaranu kāyva nam'ma sūryānēka
prabhāva sura munigaḷa san̄jīva śrī vēṅkaṭa
nam'manu porēva || pa ||

Charana 1
Vaikuṇṭhadinda bandu śēṣāceladali nindu
bhaktara pālipenendu abhaya dayākara sindhu
bhakuti mukutiyīva matkuladēvanē
sakala janasēvita ghana paripūrṇanē
vikasita kamalanayana kanjanābhanē
prakaṭita śubhakīrtiyinda merevanē || 1 ||

Charana 2
Jñānigaḷa gōcaranē tanna dhyānipara manōharanē
dānavara san'haranē mahādainyādigaḷuddharanē
ānandamayanē anēkāvatāranē
anudina nenevara hṛdaya mandiranē
ghana māṇika bhūṣaṇa śṛṅgāranē
tanuvina klēśa duritasaṅharanē || 2 ||

Charana 3
Jayatu dōṣavināśa jaya mahimā viśēṣa
jayatu lakumī paritōṣa jaya śrī vēṅkaṭēsa
jaya kamalajajanakane jaya jagadīśa
jaya gajavarada pālita puṇyaghōṣa
jayatu janārdhana jagan'mōhana vēṣa
jaya raṅga viṭhala karuṇāvilāsa || 3 ||`;

  const englishTranslation = `Pallavi:
Lord Venkateswara (Venkata), who protects those who remember Him, who has the brilliance of many suns, who is the life-giver to the gods and sages, protect us.

Charana 1:
Descending from Vaikuntha and standing on Sheshachala hill, promising to protect His devotees, He is the ocean of compassion and fearlessness. He is our family deity who grants devotion and liberation, served by everyone, complete and full, lotus-eyed, and shining with manifest glory.

Charana 2:
Visible to the wise, the captivator of those who meditate on Him, destroyer of demons, savior of the extremely humble, full of bliss, taking many incarnations, residing in the hearts of those who remember Him daily, adorned with precious gems, the destroyer of physical suffering and sins.

Charana 3:
Victory to the destroyer of faults, victory to His special glory, victory to the delight of Lakshmi, victory to Venkatesha. Victory to the father of Brahma, victory to the lord of the universe, victory to the protector of Gajendra praised in holy songs, victory to Janardhana who has a world-enchanting form, victory to Ranga Vittala of compassionate play.`;

  const compositionId = 'smarisidavaranu-1';

  // Upsert the composition
  const composition = await prisma.composition.upsert({
    where: { id: compositionId },
    update: {
      title: 'Smarisidavaranu Kayva Namma',
      firstLine: 'ಸ್ಮರಿಸಿದವರನು ಕಾಯ್ವ ನಮ್ಮ',
      lyrics: lyrics,
      transliteration: transliteration,
      composerId: composerId,
      deityId: deity.id,
      ankitaId: ankita.id,
    },
    create: {
      id: compositionId,
      title: 'Smarisidavaranu Kayva Namma',
      firstLine: 'ಸ್ಮರಿಸಿದವರನು ಕಾಯ್ವ ನಮ್ಮ',
      lyrics: lyrics,
      transliteration: transliteration,
      composerId: composerId,
      deityId: deity.id,
      ankitaId: ankita.id,
    },
  });

  // Upsert the translation
  await prisma.translation.upsert({
    where: { id: 'smarisidavaranu-trans-1' },
    update: {
      compositionId: composition.id,
      english: englishTranslation,
      kannadaMeaning: '',
      wordByWord: '',
    },
    create: {
      id: 'smarisidavaranu-trans-1',
      compositionId: composition.id,
      english: englishTranslation,
      kannadaMeaning: '',
      wordByWord: '',
    },
  });

  console.log('✅ Composition "Smarisidavaranu Kayva Namma" added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
