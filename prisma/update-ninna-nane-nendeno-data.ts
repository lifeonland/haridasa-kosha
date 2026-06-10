import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Ninna Nane Nendeno Venkataraaya (kanaka-list-50)...');

  const lyrics = `ನಿನ್ನ ನಾನೇನೆಂದೆನೊ – ರಂಗಯ್ಯ ರಂಗ
ನಿನ್ನ ನಾನೇಂದೆನೊ ||ಪ||
ನಿನ್ನ ನಾನೇನೆಂದೆ ನಿಗಮಗೋಚರ ಸ್ವಾಮಿ
ಪನ್ನಗಶಯನ ಪಾಲ್ಗಡಲೊಡೆಯನೆ ರಂಗ ||ಅ.ಪ||

ಧೀರ ಸೋಮಕ ವೇದಚೋರ ಖಳನನು ಸೀಳಿ
ವಾರಿಧಿಗಿಳಿದು ಪರ್ವತವನೆತ್ತಿ
ಧಾರಿಣಿಯನು ಕದ್ದ ದನುಜದಲ್ಲಣನಾದ
ನಾರಸಿಂಹ ನಿನಗೆ ನಮೊ ಎಂದೆನಲ್ಲದೆ
ನೀರ ಪೊಕ್ಕವನೆಂದೆನೆ – ಬೆನ್ನಲಿ ಘನ್ನ
ಭಾರ ಪೊತ್ತವನೆಂದೆನೆ – ಮಣ್ಣನಗೆದು
ಬೇರ ಮೆದ್ದವನೆಂದೆನೆ – ರಕ್ಕಸನೊಳು
ಹೋರಿ ಹೊಯ್ದನೆಂದು ಹೊಗಳಿದೆನಲ್ಲದೆ ||೧||

ಧರೆಯ ದಾನವ ಬೇಡಿ ನೆಲನ ಈರಡಿ ಮಾಡಿ
ಪರಶು ಪಿಡಿದು ಕ್ಷತ್ರಿಯರ ಸವರಿ
ಚರಣದಿ ಪಾಷಾಣ ಪೆಣ್ಣು ಮಾಡಿದ ಪುಣ್ಯಚರಿತ
ಯಾದವ ಪತಿ ಶರಣೆಂದೆನಲ್ಲದೆ
ತಿರುಕ ಹಾರುವನೆಂದೆನೆ – ಹೆತ್ತ ತಾಯ
ಶಿರವ ತರಿದನೆಂದೆನೆ – ವನವಾಸಕೆ
ಭರದಿ ಚರಿಸಿದನೆಂದೆನೆ – ಪೂತನಿಯನು
ಸರಕು ಮಾಡದೆ ಕೊಂದ ಹರಿಯೆಂದೆನಲ್ಲದೆ ||೨||

ಚಿತ್ತಜಕೋಟಿ ಲಾವಣ್ಯ ಮುಪ್ಪುರದ
ಉತ್ತಮಸ್ತ್ರೀಯರ ವ್ರತವಳಿದು
ಮತ್ತೆ ಕಲ್ಕಿಯಾಗಿ ಮಧುಪರ ಮಡುಹಿದ
ಹತ್ತವತಾರದ ಹರಿಯೆಂದೆನಲ್ಲದೆ
ಬತ್ತಲೆ ನಿಂತವನೆಂದೆನೆ – ತೇಜಿಯನೇರಿ
ಒತ್ತಿ ನಡೆದವನೆಂದೆನೆ – ಬಾರಿಬಾರಿಗೆ
ಸತ್ತು ಹುಟ್ಟುವನೆಂದೆನೆ – ಆದಿಕೇಶವ
ಭಕ್ತವತ್ಸಲನೆಂದು ಪೊಗಳಿದೆನಲ್ಲದೆ ||೩||`;

  const translation = `Chorus: Oh Rangayya, how should I address you? Oh Lord, who is known through the Vedas, how should I address you? Oh Lord who reclines on the serpent, who is the master of the Milky Ocean, how should I address you?

Verse 1: You are the brave one who tore apart the wicked Somaka. You descended into the ocean, lifted the mountain (Govardhana), and destroyed the demon who stole the earth. Oh Narasimha, I salute you. Should I call you the one who entered the water (as Matsya), or the one who carried the heavy burden on your back (as Kurma)? Should I call you the one who dug the earth (as Varaha), or the one who ate the root (as Vamana)? I praise you as the one who fought and destroyed the demons.

Verse 2: You are the one who begged for land (as Vamana) from Bali and measured it in two steps. You held the axe (as Parashurama) and destroyed the Kshatriyas. You are the one whose feet turned a stone into a woman (Ahalya). Oh Lord of the Yadavas, I surrender to you. Should I call you a beggar (as Vamana), or the one who cut off his mother's head (as Parashurama)? Should I call you the one who wandered in the forest (as Rama), or the one who killed Putana without a second thought? I praise you as Hari.

Verse 3: You are the one with the beauty of millions of Manmathas (Cupids). You destroyed the vows of the women of the three cities. You are the one who will return as Kalki to destroy the wicked. Oh Hari of the ten avatars, I praise you. Should I call you the one who stood naked (as a mendicant), or the one who rode a horse? Should I call you the one who is born and dies repeatedly? Oh Adikesava, I praise you as the one who is dear to his devotees.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-50' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-50' }
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
        compositionId: 'kanaka-list-50',
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
