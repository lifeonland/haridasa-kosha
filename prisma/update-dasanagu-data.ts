import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Dasanagu Visheshanagu (kanaka-list-43)...');

  const lyrics = `ದಾಸನಾಗು ವಿಶೇಷನಾಗು
ಏಸು ಕಾಯಂಗಳ ಕಳೆದು ಎಂಬತ್ನಾಲ್ಕು ಲಕ್ಷ
ಜೀವರಾಶಿಯನ್ನು ದಾಟಿ ಬಂದ ಈ ಶರೀರ
ತಾನಲ್ಲ ತನ್ನದಲ್ಲ ತಾನಲ್ಲ ತನ್ನದಲ್ಲ
ಆಸೆ ಥರವಲ್ಲ ಮುಂದೆ ಬಹುದಲ್ಲ
ದಾಸನಾಗು ವಿಶೇಷನಾಗು ದಾಸನಾಗು ವಿಶೇಷನಾಗು ||ಪ||

ಆಶ-ಕ್ಲೇಶ- ದೋಷವೆಂಬ ಅಬ್ಧಿಯೊಳು ಮುಳುಗಿ ಯಮನ
ಪಾಶಕ್ಕೊಳಗಾಗದೆ ನಿರ್ದೋಷಿಯಾಗು ಸಂತೋಷಿಯಾಗು
ಕಾಶಿವಾರಣಾಸಿ ಕಂಚಿ ಕಾಣ- ಹಸ್ತಿ ರಾಮೇಶ್ವರ
ಏಸು ದೇಸ ತಿರುಗಿದರೆ ಬಹುದೇನೋ ಅಲ್ಲಿ ಹೋದೇನೋ
ದೋಷ ನಾಶಿ ಕೃಷ್ಣೆ ಗಂಗೆ ಗೋದಾವರಿ ಭವನಾಶಿ
ತುಂಗಭದ್ರೆ ಯಮುನೆ ವಾಸದಲ್ಲಿ ಉಪವಾಸದಲ್ಲಿ
ಮೀಸಲಾಗಿ ಮಿಂದು ಜಪ ತಪ ಹೋಮ ನೇಮಗಳ
ಏಸು ಬರಿ ಮಾಡಿದರು ಫಲವೇನು? ಈ ಛಲವೇನು?
ದಾಸನಾಗು ವಿಶೇಷನಾಗು ದಾಸನಾಗು ವಿಶೇಷನಾಗು ||೧||

ಅಂದಿಗೋ ಇಂದಿಗೋ ಒಮ್ಮೆ ಸಿರಿಕಮಲೇಶನನ್ನು
ಒಂದು ಬಾರಿಯಾರು ಹಿಂದ ನೆನೆಯಲಿಲ್ಲ ಮನದಣಿಯಲಿಲ್ಲ
ಬಂದು ಬಂದು ಭ್ರಮೆಗೊಂಡು ಮಾಯಾಮೋಹಕ್ಕೆ ಸಿಕ್ಕಿ
ನೊಂದು ಬೆಂದು ಒಂದರಿಂದ ಉಳಿಯಲಿಲ್ಲ ಬಂಧ ಕಳೆಯಲಿಲ್ಲ
ಸಂದೇಹವ ಮಾಡದಿರು ಅರಿವು ಎಂಬ ದೀಪವಿಟ್ಟು
ಇಂದು ಕಂಡ್ಯ ದೇಹದಲ್ಲಿ ಪಿಂಡಾಂಡ ಹಾಗೆ ಬ್ರಹ್ಮಾಂಡ
ಇಂದು ಹರಿಯ ಧ್ಯಾನವನ್ನು ಮಾಡಿ ವಿವೇಕದಿ
ಮುಕುಂದನಿಂದ ಮುಕ್ತಿ ಬೇಡು ಕಂಡ್ಯ ನೀ ನೋಡು ಕಂಡ್ಯ
ದಾಸನಾಗು ವಿಶೇಷನಾಗು ದಾಸನಾಗು ವಿಶೇಷನಾಗು ||೨||

ನೂರು ಬಾರಿ ಶರಣು ಮಾಡಿ ನೀರ ಮುಳುಗಲ್ಯಾಕೆ
ಪರ ನಾರಿಯರ ನೋಟಕೆ ಗುರಿಯ ಮಾಡಿದಿ ಮನ ಸೆರೆಯ ಮಾಡಿದಿ
ಸುರೆಯೊಳು ಸುರೆ ತುಂಬಿ ಮೇಲೆ ಹೂವಿನ ಹಾರ
ಗೀರು ಗಂಧ ಅಕ್ಷತೆಯ ಧರಿಸಿದಂತೆ ನೀ ಮೆರೆಸಿದಂತೆ
ಗಾರುಢಿಯ ಮಾತ ಬಿಟ್ಟು ನಾದಬ್ರಹ್ಮನ ಪಿಡಿದು
ಸಾರಿ ಸೂರಿ ಮುಕ್ತಿಯನ್ನು ಶಮನದಿಂದ ಮತ್ತೆ ಸುಮನದಿಂದ
ನಾರಾಯಣ ಅಚ್ಯುತ ಅನಂತಾದಿ ಕೇಶವನ
ಸಾರಾಮ್ರಿತವನುಂಡು ಸುಖಿಸೋ ಲಂಡ ಜೀವವೇ ಎಲೋ ಭಂಡ ಜೀವವೇ
ದಾಸನಾಗು ವಿಶೇಷನಾಗು ದಾಸನಾಗು ವಿಶೇಷನಾಗು ||೩||`;

  const translation = `Chorus: Become a servant (of the Lord), become special. Having crossed eighty-four lakh species of life, this body that you have attained is not yours, it is not yours. Desires are not the way, and there is much ahead. Become a servant, become special.

Verse 1: Drowning in the ocean of desires, troubles, and faults, do not fall into the trap of Yama (the god of death). Become faultless and become joyful. You may visit Kashi, Varanasi, Kanchi, Kalahasti, or Rameshwara; what is the use of wandering through so many lands? What have you achieved there? Bathing in the holy rivers like Krishna, Ganga, Godavari, Tungabhadra, and Yamuna, and performing fasts, japa, tapa, homa, and rituals—what is the fruit of all this? Why this stubbornness?

Verse 2: From time immemorial, have you ever remembered the Lord of Lakshmi even once? Your mind has never been satisfied. Coming and going, caught in the illusion of worldly attachment, you have suffered and burned, unable to break the bonds of life. Do not doubt; light the lamp of knowledge. See the universe within this body (Pindanda). Meditate on Hari with wisdom and seek liberation from Mukunda.

Verse 3: Why do you dip in water and bow a hundred times? You have made your mind a target for the gaze of others' wives and kept it imprisoned. Like filling a pot with liquor and decorating it with flower garlands, sandalwood, and akshata, you are merely putting on a show. Leave aside deceptive talk, hold onto the Nada Brahma (the Lord of sound), and attain liberation with peace and a pure mind. Drink the essence of the nectar of Narayana, Achyuta, Ananta, and Keshava, and be happy, you foolish soul.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-43' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-43' }
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
        compositionId: 'kanaka-list-43',
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
