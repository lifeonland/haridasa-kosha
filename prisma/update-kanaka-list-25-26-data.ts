import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translations for Kanaka-list-25 and Kanaka-list-26...');

  // --- 1. Angaladolu Raamanaidha (kanaka-list-25) ---
  const lyrics25 = `ಅಂಗಳದೊಳು ರಾಮನಾಡಿದ ಚಂದ್ರ
ಬೇಕೆಂದು ತಾ ಹಠ ಮಾಡಿದ ||ಪ||

ತಾಯಿಯ ಕರೆದು ಕೈ ಮಾಡಿ ತೋರಿದ
ಮುಗಿಲ ಕಡೆಗೊಮ್ಮೆ ದಿಟ್ಟಿಸಿ ನೋಡಿದ
ಚಿನ್ನಿಕೊಳು ಚಂಡು ಬುಗುರಿ ಎಲ್ಲವ
ಬೇಡ ಬೇಡ ಎಂದು ತಾ ಬಿಸಾಡಿದ ||೧||

ಕಂದ ಬಾ ಎಂದು ತಾಯಿ ಕರೆದಳು ಮಮ್ಮು
ಉಣ್ಣೆಂದು ಬಣ್ಣಿಸುತ್ತಿದ್ದಳು
ತಾಯಿ ಕೌಸಲ್ಯ ಕಳವಳ ಗೊಂಡಳು ಕಂದ
ಅಂಜಿದನು ಎನ್ನುತಿದ್ದಳು ||೨||

ಅಳುವ ಧ್ವನಿ ಕೇಳಿ ರಾಜನು ಮಂತ್ರಿ
ಸಹಿತಾಗಿ ಧಾವಿಸಿ ಬಂದನು
ನಿಲುವ ಕನ್ನಡಿ ತಂದಿರಿಸಿದ
ಶ್ರೀ ರಾಮನ ಎತ್ತಿ ಮುದ್ದಾಡಿದ ||೩||

ಕನ್ನಡಿಯೊಳು ಬಿಂಬ ನೋಡಿದ ಚಂದ್ರ
ಸಿಕ್ಕಿದನೆಂದು ಕುಣಿದಾಡಿದ
ಈ ಸಂಭ್ರಮ ನೋಡಿ ಆದಿ ಕೇಶವ
ರಘು ವಂಶವನ್ನೇ ಕೊಂಡಾಡಿದ ||೪||`;

  const translation25 = `Chorus: Rama played in the courtyard and insisted on having the moon.

Verse 1: He called His mother and pointed with His hand, glancing once towards the sky. He threw away the sticks, balls, and tops, saying, "I don't want these, I don't want these."

Verse 2: Mother Kausalya called out, "Come, my child, eat," describing the food to Him. She became anxious, thinking her child was frightened.

Verse 3: Hearing the sound of his weeping, the King (Dasharatha) rushed in along with his ministers. He brought a standing mirror and held it up. He picked up Lord Rama and kissed Him.

Verse 4: Rama saw the reflection in the mirror and danced with joy, thinking He had caught the moon. Seeing this spectacle, Lord Adi Keshava praised the Raghu dynasty.`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-25' },
    data: { lyrics: lyrics25 },
  });

  const t25 = await prisma.translation.findFirst({ where: { compositionId: 'kanaka-list-25' } });
  if (t25) {
    await prisma.translation.update({ where: { id: t25.id }, data: { english: translation25 } });
  } else {
    await prisma.translation.create({ data: { compositionId: 'kanaka-list-25', english: translation25, kannadaMeaning: '-', wordByWord: '-' } });
  }


  // --- 2. Nemavillada Homa Innetake (kanaka-list-26) ---
  const lyrics26 = `ನೇಮವಿಲ್ಲದ ಹೋಮವೇತಕಯ್ಯ
ರಾಮನಾಮವಲ್ಲದೆ ಮತ್ತೆ ನಮಗೊಂದೆ
ನೀರ ಮುಳುಗಲೇಕೆ ನಾರಿಯ ಬಿಡಲೇಕೆ
ವಾರಕೊಂದುಪವಾಸ ಇರಲೇತಕೆ ||ಪ||

ನಾರಸಿಂಹನ ದಿವ್ಯನಾಮವನು ನೆನೆದರೆ
ಘೋರ ಪಾತಕವೆಲ್ಲ ತೊಲಗಿ ಹೋಗುವುದು
ಅಂಬರದೊಳಿರಲೇಕೆ ತಾಂಬೂಲವ ಬಿಡಲೇಕೆ
ಡಂಬಕತನದಲಿ ಇರಲೇತಕೆ ||೧||

ಅಂಬುಜನಾಭನನು ಭಾವದಲಿ ನೆನೆದರೆ
ಇಂಬುಂಟು ವೈಕುಂಠಪುರದ ಒಳಗಯ್ಯ
ಬಂಧದೊಳಗೆ ಬಿದ್ದು ಹರಿಯನೆ ನೆನೆಯುತಿರೆ
ಬೆಂದು ಹೋಗುವುದು ದುರಿತಂಗಳೆಲ್ಲ ||೨||

ಬಂದ ಪಾಪಗಳೆಲ್ಲ ನಿಲ್ಲದೆ ಕಳೆದಾವು
ಚಂದಾಗಿ ನೆಲೆಯಾದಿ ಕೇಶವನ ನೆನೆಯೊ ||೩||`;

  const translation26 = `Chorus: What is the use of rituals (Homa) performed without dedication? For us, there is only the name of Rama. Why bathe in water? Why abandon women (in a false sense of renunciation)? Why fast once a week?

Verse 1: If one remembers the divine name of Narasimha, all terrible sins will vanish. Why live in the sky (as an ascetic)? Why give up betel leaves? Why live with arrogance (in a facade of piety)?

Verse 2: If one remembers the Lotus-naveled Lord (Padmanabha) with devotion, there is a place for them in Vaikuntha. If one remembers Hari while caught in worldly bonds, all their sins will be burnt away.

Verse 3: All the sins one has committed will disappear without a trace. Beautifully remember the Lord of Kaginele, Adi Keshava.`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-26' },
    data: { lyrics: lyrics26 },
  });

  const t26 = await prisma.translation.findFirst({ where: { compositionId: 'kanaka-list-26' } });
  if (t26) {
    await prisma.translation.update({ where: { id: t26.id }, data: { english: translation26 } });
  } else {
    await prisma.translation.create({ data: { compositionId: 'kanaka-list-26', english: translation26, kannadaMeaning: '-', wordByWord: '-' } });
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
