import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Kesava Nama (kanaka-list-9)...');

  const lyrics = `ಈಶ ನಿನ್ನ ಚರಣ ಭಜನೆ | ಆಶೆಯಿಂದ ಮಾಡುವೆನು
ದೋಶರಾಶಿ ನಾಶಮಾಡು ಶ್ರೀಶ ಕೇಶವ ||ಪ||

ಶರಣು ಹೊಕ್ಕೆನಯ್ಯ ಎನ್ನ | ಮರಣ ಸಮಯದಲ್ಲಿ ನಿನ್ನ |
ಚರಣ ಸ್ಮರಣೆ ಕರುಣಿಸಯ್ಯ ನಾರಾಯಣ ||೧||

ಶೋಧಿಸೆನ್ನ ಭವದ ಕಲುಶ | ಭೋಧಿಸಯ್ಯ ಜ್ಞಾನವೆನಗೆ||
ಬಾಧಿಸುವ ಯಮನ ಬಾಧೆ | ಬಿಡಿಸು ಮಾಧವ ||೨||

ಹಿಂದನೇಕ ಯೋನಿಗಳಲಿ | ಬಂದು ಬಂದು ನೊಂದೆನಯ್ಯ ||
ಇಂದು ಭವದ ಬಂಧ ಬಿಡಿಸೋ ತಂದೆ ಗೋವಿಂದ ||೩||

ಭ್ರಷ್ಟನೆನಿಸಬೇಡ ಕೃಷ್ಣ | ಇಷ್ಟು ಮಾತ್ರ ಬೇಡಿಕೊಂಬೆ ||
ಶಿಷ್ಟರೊಡನೆ ಇಟ್ಟು ಕಷ್ಟ | ಬಿಡಿಸು ವಿಷ್ಣುವೇ ||೪||

ಮದನನಯ್ಯ ನಿನ್ನ ಮಹಿಮೆ | ವದನದಲ್ಲಿ ನುಡಿಯುವಂತೆ ||
ಹೃದಯದಲ್ಲಿ ಹುದುಗಿಸಯ್ಯ ಮಧುಸೂದನ ||೫||

ಕವಿದುಕೊಂಡು ಇರುವ ಪಾಪ | ಸವೆದು ಪೋಗುವಂತೆ ಮಾಡಿ ||
ಜವನ ಬಾಧೆಯನ್ನು ಬಿಡಿಸೋ | ಶ್ರೀತ್ರಿವಿಕ್ರಮ ||೬||

ಕಾಮಜನಕ ನಿನ್ನ ನಾಮ | ಪ್ರೇಮದಿಂದ ಪಾಡುವಂಥ ||
ನೇಮವೆನಗೆ ಪಾಲಿಸಯ್ಯ ಸ್ವಾಮಿ ವಾಮನ ||೭||

ಮೊದಲು ನಿನ್ನ ಪಾದಪೂಜೆ | ಒದಗುವಂತೆ ಮಾಡೋ ಎನ್ನ ||
ಹೃದಯದೊಳಗೆ ಸದನ ಮಾಡು ಮುದದಿ ಶ್ರೀಧರ ||೮||

ಹುಸಿಯನಾಡಿ ಹೊಟ್ಟೆ ಹೊರೆವ | ವಿಷಯದಲ್ಲಿ ರಸಿಕನೆಂದು ||
ಹುಸಿಗೆ ಹಾಕದಿರೋ ಎನ್ನ ಹೃಷೀಕೇಶನೇ ||೯||

ಕಾಮಕ್ರೋಧ ಬಿಡಿಸಿ ನಿನ್ನ | ನಾಮ ಜಿಹ್ವೆಯೊಳಗೆ ನುಡಿಸು ||
ಶ್ರೀಮಹಾನುಭಾವನಾದ ದಾಮೋದರ ||೧೦||

ಬಿದ್ದು ಭವದನೇಕ ಜನುಮ | ಬದ್ದನಾಗಿ ಕಲುಷದಿಂದ ||
ಗೆದ್ದು ಪೋಪ ಬುಧ್ಧಿ ತೋರೊ ಪದ್ಮನಾಭನೆ ||೧೧||

ಪಂಕಜಾಕ್ಷ ನೀನೆ ಎನ್ನ | ಮಂಕುಬುದ್ಧಿಯನ್ನು ಬಿಡಿಸಿ |
ಕಿಂಕರನ್ನ ಮಾಡಿಕೊಳ್ಳೋ ಸಂಕರ್ಷಣ ||೧೨||

ಏಸು ಜನ್ಮ ಬಂದರೇನು | ದಾಸನಲ್ಲವೇನು ನಾನು ||
ಘಾಸಿ ಮಾಡದಿರು ಇನ್ನು ವಾಸುದೇವನೇ ||೧೩||

ಬುದ್ಧಿ ಶೂನ್ಯನಾಗಿ ಎನ್ನ | ಬದ್ಧಕಾಯ ಕುಹಕ ಮನವ ||
ತಿದ್ದಿ ಹೃದಯ ಶುದ್ಧ ಮಾಡೋ ಪ್ರದ್ಯುಮ್ನನೇ ||೧೪||

ಜನನಿ ಜನಕ ನೀನೆಯೆಂದು | ನೆನೆವೆನಯ್ಯ ದೀನಬಂಧು ||
ಎನಗೆ ಮುಕ್ತಿ ಪಾಲಿಸಿನ್ನು ಅನಿರುದ್ಧನೇ ||೧೫||

ಹರುಶದಿಂದ ನಿನ್ನ ನಾಮ | ಸ್ಮರಿಸುವಂತೆ ಮಾಡು ಕ್ಷೇಮ ||
ಇರಿಸು ಚರಣದಲ್ಲಿ ಪ್ರೇಮ ಪುರುಷೋತ್ತಮ ||೧೬||

ಸಾಧುಸಂಗ ಕೊಟ್ಟು ನಿನ್ನ | ಪಾದಭಜನೆ ಇತ್ತು ಎನ್ನ ||
ಭೇದಮಾಡಿ ನೋಡದಿರೊ ಹೇ ಅಧೋಕ್ಷಜ ||೧೭||

ಚಾರುಚರಣ ತೋರಿ ಎನಗೆ | ಪಾರುಗಾಣಿಸಯ್ಯ ಕೊನೆಗೆ ||
ಭಾರ ಹಾಕಿರುವೆ ನಿನಗೆ ನಾರಸಿಂಹನೇ ||೧೮||

ಸಂಚಿತಾದಿ ಪಾಪಗಳು | ಕಿಂಚಿತಾದ ಪೀಡೆಗಳನು ||
ಮುಂಚಿತಾಗಿ ಕಳೆಯಬೇಕೋ ಸ್ವಾಮಿ ಅಚ್ಯುತ ||೧೯||

ಜ್ಞಾನ ಭಕುತಿ ಕೊಟ್ಟು ನಿನ್ನ | ಧ್ಯಾನದಲ್ಲಿ ಇಟ್ಟು ಸದಾ ||
ಹೀನ ಬುದ್ಧಿ ಬಿಡಿಸೊ ಮುನ್ನ ಶ್ರೀ ಜನಾರ್ಧನ ||೨೦||

ಜಪತಪಾನುಷ್ಠಾನವಿಲ್ಲ | ಕುಪಿತಗಾಮಿಯಾದ ಎನ್ನ ||
ಕೃಪೆಯ ಮಾಡಿ ಕ್ಷಮಿಸಬೇಕು ಹೇ ಉಪೇಂದ್ರನೇ ||೨೧||

ಮೊರೆಯ ಇಡುವೆನಯ್ಯ ನಿನಗೆ | ಶರಧಿಶಯನ ಶುಭಮತಿಯ||
ಇರಿಸೋ ಭಕ್ತರೊಳಗೆ ಪರಮಪುರುಷ ಶ್ರೀಹರೇ ||೨೨||

ಪುಟ್ಟಿಸಲೇಬೇಡ ಇನ್ನು | ಪುಟ್ಟಿಸಿದಕೆ ಪಾಲಿಸಿನ್ನು||
ಇಷ್ಟು ಮಾತ್ರ ಬೇಡಿಕೊಂಬೆ ಶ್ರೀ ಕೃಷ್ಣನೇ ||೨೩||

ಸತ್ಯವಾದ ನಾಮಗಲನು | ನಿತ್ಯದಲ್ಲಿ ಪಠಿಸುವರಿಗೆ ||
ಅರ್ಥಿಯಿಂದ ಸಲಹುತಿರುವ ಕರ್ತೃ ಕೇಶವ ||೨೪||

ಮರೆಯದಲೆ ಹರಿಯ ನಾಮ | ಬರೆದು ಓದಿ ಪೇಳ್ದವರಿಗೆ ||
ಕರೆದು ಮುಕ್ತಿ ಕೊಡುವ ನೆಲೆಯಾದಿಕೇಶವ ||೨೫||`;

  const translation = `Chorus: Oh Lord, I worship Your feet with desire. Oh Keshava, Lord of Lakshmi, destroy the accumulation of my sins.

Verse 1: I have taken refuge in You; at the time of my death, please grant me the remembrance of Your feet, O Narayana.

Verse 2: Purify the stains of my worldly existence, teach me wisdom, and release me from the torments of Yama (God of Death), O Madhava.

Verse 3: I have suffered through many births; today, release me from the bonds of worldly existence, O Father Govinda.

Verse 4: Do not let me be considered corrupt, O Krishna. This is all I ask of You—keep me among the virtuous and relieve my hardships, O Vishnu.

Verse 5: May Your glory, O Lord of Love, always be on my lips. Imprint Yourself in my heart, O Madhusudana.

Verse 6: Make all the sins that have covered me disappear, and release me from the torments of Yama, O Trivikrama.

Verse 7: Grant me the discipline to sing Your name with love, O Lord Vamana, who is the creator of desire (Manmatha).

Verse 8: First, grant me the opportunity to worship Your feet, and reside joyfully in my heart, O Sridhara.

Verse 9: Do not abandon me in falsehood, thinking that I only seek to fill my belly and am a slave to worldly pleasures, O Hrishikesha.

Verse 10: Remove my lust and anger, and let Your name dwell on my tongue, O Damodara, the great and glorious Lord.

Verse 11: I have been bound by the sins of many births; show me the wisdom to overcome this, O Padmanabha.

Verse 12: Oh Lotus-eyed Lord, remove my foolishness and make me Your humble servant, O Sankarshana.

Verse 13: What does it matter how many births I have taken? Am I not Your servant? Do not trouble me anymore, O Vasudeva.

Verse 14: My mind is devoid of wisdom and is full of deceit; please rectify it and purify my heart, O Pradyumna.

Verse 15: Thinking of You as my Mother and Father, I remember You, O friend of the helpless. Grant me liberation now, O Aniruddha.

Verse 16: Enable me to remember Your name with joy and grant me well-being. Place Your love in my heart, O Purushottama.

Verse 17: Grant me the company of the virtuous and the opportunity to worship Your feet. Do not look upon me with discrimination, O Adhokshaja.

Verse 18: Show me Your beautiful feet and guide me to the other shore at the end. I have placed all my burdens upon You, O Narasimha.

Verse 19: Please remove all my accumulated sins and the slightest of my sufferings in advance, O Acyuta.

Verse 20: Grant me wisdom and devotion, and keep me always in Your meditation. Purify my lowly mind, O Janardhana.

Verse 21: I have no discipline of chanting or penance. I am filled with anger; please show me mercy and forgive me, O Upendra.

Verse 22: I call out to You, O Lord of the ocean. Please include me among Your devotees, O supreme Lord Hari.

Verse 23: Do not let me be born again. Having brought me into this world, please protect me. This is all I ask of You, O Krishna.

Verse 24: To those who chant these truthful names daily, Keshava, the Creator, protects them with affection.

Verse 25: To those who write, read, and recite the name of Hari without forgetting, the eternal Lord Adi Keshava calls them to grant them liberation.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-9' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-9' }
  });

  if (existingTranslation) {
    await prisma.translation.update({
      where: { id: existingTranslation.id },
      data: { english: translation },
    });
    console.log('✅ Translation updated successfully!');
  } else {
    await prisma.translation.create({
      data: {
        compositionId: 'kanaka-list-9',
        english: translation,
        kannadaMeaning: '-', 
        wordByWord: '-', 
      },
    });
    console.log('✅ Translation created successfully!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
