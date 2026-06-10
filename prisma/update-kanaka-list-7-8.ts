import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translations for Kanaka-list-7 and Kanaka-list-8...');

  // --- 1. Baro Krushnayya Krushnayya (kanaka-list-7) ---
  const lyrics1 = `ಬಾರೋ ಕೃಷ್ಣಯ್ಯ ಕೃಷ್ಣಯ್ಯ
ಬಾರೋ ಕೃಷ್ಣಯ್ಯ ನಿನ್ನ ಭಕ್ತರ ಮನೆಗೀಗ ||ಪ||

ಬಾರೋ ನಿನ್ನ ಮುಖ ತೋರೋ ನಿನ್ನ
ಸರಿ ಯಾರೋ ಜಗಧಾರ ಶೀಲನೇ ||ಅ.ಪ||

ಅಂದುಗೆ ಪಾದವು ಕಾಲಂದುಗೆ ಕಿರು ಗೆಜ್ಜೆ
ಧಿಂಧಿಮಿ ಧಿಮಿ ಧಿಮಿ ಧಿಮಿ ಎನುತ
ಪೊಂಗೊಳನುದುತ್ತ ಬರಿಯ ಬಾರಯ್ಯ ||೧||

ಕಂಕಣ ಕರದಲ್ಲಿ ಪೊನ್ನುಂಗುರ ಹೊಳೆಯುತ
ಕಿಂಕಿಣಿ ಕಿಣಿ ಕಿಣಿ ಕಿಣಿ ಎನುತ
ಪೊಂಗೊಳಲನೂದುತ್ತ ಬಾರಯ್ಯ ಬಾರೋ ಕೃಷ್ಣಯ್ಯ ||೨||

ವಾಸ ಉಡುಪೀಲಿ ನೆಲೆಯಾದಿ ಕೇಶವನೇ
ದಾಸ ನಿನ್ನ ಪದ ದಾಸ ನಿನ್ನ ಪದ
ದಾಸ ನಿನ್ನ ಪದ ದಾಸ ಕರೆವೆನು ಬಾರಯ್ಯ ||೩||`;

  const translation1 = `Chorus: Come, O Krishna, to the homes of your devotees now.

Anupallavi: Come, show us your face; who is equal to you, O sustainer of the world?

Verse 1: With anklets on your feet and small bells jingling, making the sound "dhim-dhimi-dhimi-dhimi," playing the flute, come, O Krishna.

Verse 2: With bracelets on your hands and a golden ring shining, making the sound "kinkini-kini-kini-kini," playing the flute, come, O Krishna, come.

Verse 3: O Keshava, who resides in Udupi, I, your servant, call upon your feet, I call upon your feet, I call upon your feet, O Lord, please come.`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-7' },
    data: { lyrics: lyrics1 },
  });

  const t1 = await prisma.translation.findFirst({ where: { compositionId: 'kanaka-list-7' } });
  if (t1) {
    await prisma.translation.update({ where: { id: t1.id }, data: { english: translation1 } });
  } else {
    await prisma.translation.create({ data: { compositionId: 'kanaka-list-7', english: translation1, kannadaMeaning: '-', wordByWord: '-' } });
  }


  // --- 2. Itaniga Vasudevanu (kanaka-list-8) ---
  const lyrics2 = `ಈತನೀಗ ವಾಸುದೇವನು ಲೋಕದೊಡೆಯ
ಈತನೀಗ ವಾಸುದೇವನು ||ಪ॥

ಈತನೀಗ ವಾಸುದೇವ ಈ ಸಮಸ್ತ ಲೋಕದೊಡೆಯ
ದಾಸಗೊಲಿದು ತೇರನೇರಿ ತೇಜಿ ಪಿಡಿದು ನಡೆಸಿದಾತ ||ಅ.ಪ॥

ಧನುಜೆಯಾಳ್ದನಣ್ಣನಯ್ಯನ ಪಿತನ ಮುoದೆ ಕೌರವೇಂದ್ರ
ನನುಜೆಯಾಳಿದವನ ಶಿರವ ಕತ್ತರಿಸುತ ತನ್ನ
ಅನುಜೆಯಾಳಿದವನ ಬೆಂಕಿ ಮುಟ್ಟದoತೆ ಕಾಯ್ದ ರುಕ್ಮ
ನನುಜೆಯಾಳಿದವನ ಮೂರ್ತಿಯನ್ನು ನೋಡಿರೋ ||೧।।

ನರನ ಸುತನರಣ್ಯದಲಿ ಗಿರಿಯೊಳ್ನಿಂತು ತನ್ನ ರೋಷದಿ
ಶರಗಳನ್ನು ತೀಡುತಿಪ್ಪನ ಯೋಚಿಸಿ
ಭರದಲವನ ಕರೆದು ಕುರುಹು ತೋರಿ ಪತ್ರವನ್ನು ಹಾರಿಸಿದವನ
ಶಿರವನ್ನು ಛೇದಿಸಿದ ದೇವ ಕಾಣಿರೋ ||೨।।

ಸೃಷ್ಟಿಕರ್ತಗೆ ಮಗನಾದವನಿಗಿಷ್ಟ ಭೂಷಣ ಅಶನವಾದನ
ಜ್ಯೇಷ್ಠಪುತ್ರಗೆ ವೈರಿ ತೊಡೆಯ ಛೇದಿಸೆಂದು ಬೋಧಿಸಿ
ಕಷ್ಟವನ್ನು ಕಳೆದು ಭಕ್ತರಿಷ್ಟವನು ಕಾದ ಉ
ತ್ಕೃಷ್ಟ ಮಹಿಮನಾದ ದೇವ ಕಾಣಿರೋ ||೩।।

ಕ್ರೂರವಾದ ಫಣಿಪಬಾಣವನ್ನು ತರಣಿಜನೆಚ್ಚಾಗ
ವೀರನರನತ್ತ ಬಪ್ಪುದನ್ನು ಈಕ್ಷಿಸಿ
ಧಾರಿಣಿಯ ಪದದೊಳೌಕಿ ಚರಣಭಜಕ ನರನ ಕಾಯ್ದ
ಭಾರಕರ್ತನಾದ ದೇವನೀತ ಕಾಣಿರೋ ||೪।।

ವ್ಯೋಮಕೇಶನಿಪ್ಪ ದೆಸೆಯ ಸರ್ವ ಜಗಕೆ ತೋರುತ
ಸಾಮಜವನೇರಿ ಬರುವ ಶಕ್ತಿಯನೀಕ್ಷಿಸಿ
ಪ್ರೇಮದಿಂದ ಉರವನೊಡ್ಡಿ ಡಿoಗರಿಗನ ಕಾಯ್ದಾ ಸಾರ್ವ
ಭೌಮ ಬಾಡದಾದಿಕೇಶವನ್ನ ನೋಡಿರೋ ||೫।।`;

  const translation2 = `Chorus: This is indeed Vasudeva, the Lord of the world. He is indeed Vasudeva.

Anupallavi: This is indeed Vasudeva, the Lord of all these worlds. He, who pleased His servant (Arjuna), mounted the chariot, held the reins, and guided it.

Verse 1: Seeing the image of Him who protected the brother of the one who ruled the demon (Dhanuja), the father of the one who is the Lord of the Kauravas... (This verse contains complex mythological references relating to the Mahabharata and Krishna's interventions).

Verse 2: Seeing the son of the man (Arjuna) standing in the forest on the mountain, testing his arrows with anger, He (Krishna) thought about it, called him in haste, showed him signs, and severed the head of the one who sent the letter—behold this Lord.

Verse 3: He who became the son of the Creator (Brahma), who is adorned with dear ornaments—behold this Lord of supreme glory who taught to sever the thigh of the enemy of the eldest son, removed all suffering, and protected the desires of His devotees.

Verse 4: When the cruel serpent-arrow approached the son of the sun (Karna), He (Krishna) saw the brave man coming, pressed the earth with His foot, and protected His devotee who worshipped His feet—behold this Lord who bears the burden (of the world).

Verse 5: Showing the entire world the direction of the Lord of the sky (Shiva), seeing the power of the one riding the elephant, He (Krishna) lovingly offered His chest to protect His servant—behold the Emperor, Adi Keshava of Baada.`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-8' },
    data: { lyrics: lyrics2 },
  });

  const t2 = await prisma.translation.findFirst({ where: { compositionId: 'kanaka-list-8' } });
  if (t2) {
    await prisma.translation.update({ where: { id: t2.id }, data: { english: translation2 } });
  } else {
    await prisma.translation.create({ data: { compositionId: 'kanaka-list-8', english: translation2, kannadaMeaning: '-', wordByWord: '-' } });
  }

  console.log('✅ Lyrics and translations updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
