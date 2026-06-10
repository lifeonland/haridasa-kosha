import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Yenu Kaarana Baaya Theredhiyo (kanaka-list-28)...');

  const lyrics = `ಏನು ಕಾರಣ ಬಾಯಿ ತೆರೆದಿ – ಪೇಳೆಲೊದಾನವಾಂತಕ ಅಹೋಬಲ ನಾರಸಿಂಹನೆ ||ಪ||

ನಿಗಮ ಚೋರನ ಕೊಲಲು ತೆರೆದೆಯೋ ಈ ಬಾಯ
ನಗವ ಬೆನ್ನಲಿ ಹೊತ್ತು ನಡುಗಿ ತೆರೆದೆಯೋ ಬಾಯ
ಭೂ-ಮಿಗಳ್ಳನ ಕೊಂದು ಬಳಲಿ ತೆರೆದೆಯೊ ಬಾಯ
ಜಗವರಿಯೆ ಪೇರುರವಿರಿದ ಪ್ರಹ್ಲಾದವರದ ಅಹೋಬಲ ನಾರಸಿಂಹನೆ ||೧||

ಬಲಿಯ ದಾನವ ಬೇಡಲೆಂದು ತೆರೆದೆಯೊ ಬಾಯ
ಛಲದಿಂದ ಕ್ಷತ್ರಿಯರ ಕೊಲಲು ತೆರೆದೆಯೊ ಬಾಯ
ಕುಲಸತಿಯ ಅರಸಿ ಕಾಣದೆ ತೆರೆದೆಯೊ ಬಾಯ
ಮರೆತು ಮಾವನ ಕೊಂದು ನಿಂದೆ – ಇಂಥ ಇಳಿಯ ಬಾರದ ಭೂಮಿಗಿಳಿದ ನಾರಸಿಂಹ ||೨||

ನಾರಿಯರ ಚೆಲ್ವಿಕೆಯ ನೋಡಿ ತೆರೆದೆಯೊ ಬಾಯ
ಏರಿ ಅಶ್ವವ ಮೆಟ್ಟಿ ಅಳಲಿ ತೆರೆದೆಯೊ ಬಾಯ
ಮಾರಪಿತ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ ರಂಗಧೀರ
ಶ್ರೀನಾಥ ಭವನಾಶ ಪೇಳೋ ಪೇಳು ಏತಕೆ ಅಹೋಬಲ ನಾರಸಿಂಹನೆ ||೩||`;

  const translation = `Chorus: For what reason have You opened Your mouth? O slayer of the demon, O Narasimha of Ahobala, please tell me.

Verse 1: Did You open Your mouth to kill the thief of the Vedas (Somaka)? Did You open it in fear while carrying the mountain on Your back? Did You open it, weary from killing the demon who stole the earth? O Narasimha of Ahobala, the boon-giver to Prahlada, the world knows You tore open the chest of the demon.

Verse 2: Did You open Your mouth to beg for Bali's land? Did You open it to kill the Kshatriyas with persistence? Did You open it while searching for Your virtuous wife? You forgot and killed Your uncle (Kamsa) and stood there—Oh Narasimha, who descended to this earth where such things should not happen.

Verse 3: Did You open Your mouth upon seeing the beauty of women? Did You open it, crying while riding and stepping on the horse? O Father of Manmatha, Kaginele Adikeshava, O brave Ranga, O Lord of Lakshmi, O destroyer of worldly existence—please tell me, O Narasimha of Ahobala, why did You open it?`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-28' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-28' }
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
        compositionId: 'kanaka-list-28',
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
