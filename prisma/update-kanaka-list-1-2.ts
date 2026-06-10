import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translations for Kanaka-list-1 and Kanaka-list-2...');

  // --- 1. Hetta Tayiginta Atyadhika (kanaka-list-1) ---
  const lyrics1 = `ಹೆತ್ತ ತಾಯಿಗಿಂತ ಅತ್ಯಧಿಕ ಮಾಯವುಂಟೆ
ಉತ್ತಮ ಅಶ್ವವ ಕತ್ತೆ ಹೋಲುವುದುಂಟೆ ||ಪ||

ವಿತ್ತವುಳ್ಳವನ ಕುಲ ಎಣಿಸುವುದುಂಟೆ
ಸ್ವಾರ್ಥಕೆ ನ್ಯಾಯ ಎಂದಾದರೂ ಉಂಟೆ ||೧||

ಅತ್ತೆಮನೆ ಸೇರುವಗೆ ಅಭಿಮಾನವುಂಟೆ
ಬತ್ತಲೆ ತಿರುಗುವಗೆ ಭಯವು ಇನ್ನುಂಟೆ ||೨||

ಪೃಥ್ವಿಯೊಳಗೆ ಕಾಗಿನೆಲೆಯಾದಿ ಕೇಶವಗೆ
ಮರ್ತ್ಯದೊಳನ್ಯ ದೇವರು ಸರಿಯುಂಟೆ ||೩||`;

  const translation1 = `Chorus: Is there any illusion greater than that of the mother who gave birth? Can a donkey ever be compared to a noble horse?

Verse 1: Is it right to count the lineage of a wealthy person? Is there ever any justice in selfishness?

Verse 2: Does one who has joined the in-laws' house have any self-respect? Does one who wanders naked have any fear left?

Verse 3: On this earth, is there any other god equal to Kaginele Adi Keshava?`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-1' },
    data: { lyrics: lyrics1 },
  });

  const t1 = await prisma.translation.findFirst({ where: { compositionId: 'kanaka-list-1' } });
  if (t1) {
    await prisma.translation.update({ where: { id: t1.id }, data: { english: translation1 } });
  } else {
    await prisma.translation.create({ data: { compositionId: 'kanaka-list-1', english: translation1, kannadaMeaning: '-', wordByWord: '-' } });
  }


  // --- 2. Yadavaraya Brundavanadolu (kanaka-list-2) ---
  const lyrics2 = `ಯಾದವರಾಯ ಬೃಂದಾವನದೊಳು
ವೇಣು ನಾದವ ಮಾಡುತಿರೆ ||ಪ||

ರಾಧಾ ಮುಂತಾದ ಗೋಪಿಯರೆಲ್ಲ
ಮಧುಸೂದನ ನಿನ್ನನು ಸೇವಿಸುತಿರೆ
ಸುರರು ಅಂಬರದಿ ಸಂದಣಿಸಿರೆ
ಅಪ್ಸರ ಸ್ತ್ರೀಯರು ಮೈ ಮರೆತಿರೇ||ಅ.ಪ||

ಕರದಲಿ ಕೊಳಲನು ಊದುತ ಪಾಡುತ
ಸ ರಿ ಗ ಮ ಪ ದ ನಿ ಸ್ವರಗಳ ನುಡಿಸುತ
ಹರಿ ಹರ ಬ್ರಹ್ಮರು ನಲಿದಾಡುತಿರೆ
ತುಂಬುರು ನಾರದರು ಪಾಡುತಿರೆ||೧||

ಅರವಿಂದ ದಳ ನಯನ
ಕರುಗಳ ಸಹಿತಲೇ ಗೋಕುಲವೆಲ್ಲ
ಸಿರಿ ಕಾಗಿನೆಲೆಯಾದಿ ಕೇಶವ ರಾಯ
ತರುಗಳ ಸಹಿತಲೇ ವರಗೋಪಾಲ||೨||`;

  const translation2 = `Chorus: Yadavaraya (Lord Krishna) is in the Brundavana, playing the melody of his flute.

Verse 1: Radha and all the Gopikas are serving You, O Madhusudana. The celestial beings are gathering in the sky, and the Apsaras (celestial maidens) have forgotten themselves.

Verse 2: Blowing the flute in his hands, playing the notes Sa-Ri-Ga-Ma-Pa-Da-Ni. Hari, Hara, and Brahma are dancing with joy, while Tumburu and Narada are singing.

Verse 3: With eyes like lotus petals, along with the calves, the entire Gokula is present. O Lord Kaginele Adi Keshava, You are the great Gopala, along with the trees.`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-2' },
    data: { lyrics: lyrics2 },
  });

  const t2 = await prisma.translation.findFirst({ where: { compositionId: 'kanaka-list-2' } });
  if (t2) {
    await prisma.translation.update({ where: { id: t2.id }, data: { english: translation2 } });
  } else {
    await prisma.translation.create({ data: { compositionId: 'kanaka-list-2', english: translation2, kannadaMeaning: '-', wordByWord: '-' } });
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
