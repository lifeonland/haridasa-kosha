import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Elliruvano Ranga (kanaka-list-16)...');

  const lyrics = `ಎಲ್ಲಿರುವನೋ ರಂಗ ಎಂಬ ಸಂಶಯ ಬೇಡ
ಎಲ್ಲಿ ಭಕ್ತರು ಕರೆಯೆ ಅಲ್ಲಿ ಬಂದೊದಗುವನು ||ಪ||

ತರಳ ಪ್ರಹ್ಲಾದ ಹರಿ ವಿಶ್ವಮಯನೆಂದು
ಭರದೊದೆಯಲವನಪಿತ ಕೋಪದಿಂದ
ಸ್ಥಿರವಾದೊಡೀ ಕಂಭದಲಿ ತೋರು ತೋರೆನಲು
ಭರದಿಂದ ಬರಲದಕೆ ವೈಕುಂಠ ನೆರೆಮನೆಯೇ? ||೧||

ಪಾಪಕರ್ಮವ ಮಾಡಿದಜಮಿಳನ ಯಮಭಟರು
ಕೋಪದಿಂದೆಳೆಯುತಿರೆ ಭೀತಿಯಿಂದ
ತಾ ಪುತ್ರನನು ಕರೆಯೆ ಕೇಳಿ ರಕ್ಷಿಸೆ
ಶ್ವೇತದ್ವೀಪವೀ ಧರೆಗೆ ಸಮೀಪದಲ್ಲಿಹುದೇ? ||೨||

ಕರಿರಾಜನನು ನಕ್ರನು ನುಂಗುತಿರೆ ಭಯದಿಂದ
ಮೊರೆಯಿಡಲು ಕೇಳಿ ತ್ವರಿತದಲಿ ಬಂದು
ಕರುಣದಲಿ ಬಂದವನ ಪರಿಹರಿಸೆ ಗಜರಾಜ
ನಿರುವ ಸರಸಿಯು ಅನಂತಾಸನಕೆ ಮುಮ್ಮನೆಯೇ? ||೩||

ಕುರುಪತಿಯು ದ್ರೌಪದಿಯ ಸೀರೆಯನು ಸೆಳೆಯುತಿರೆ
ತರುಹಿ ಹಾ ಕೃಷ್ಣ ಎಂದೊರೆ ಕೇಳ್ದು
ಭರದಿಂದ ಅಕ್ಷಯಾಂಬರವೀಯೆ ಹಸ್ತಿನಾ
ಪುರಿಗೆ ದ್ವಾರಾವತಿಯು ಕೂಗಳತೆಯೇ? ||೪||

ಅಣುಹೊತ್ತಿನೊಳೆಲ್ಲ ಪರಿಪೂರ್ಣ ವಿಶ್ವಮಯ
ಗಣನೆಯಿಲ್ಲದ ಮಹಾಮಹಿಮನೆನಿಪ
ಘನ ಕೃಪಾನಿಧಿ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನು
ನೆನೆವರು ಮನದೊಳಿಹನೆಂಬ ಬಿರುದುಂಟಾಗಿ ||೫||`;

  const translation = `Chorus: Do not have any doubt about where Ranga (Lord Hari) resides. Wherever devotees call Him, He will appear there.

Verse 1: When the young Prahlada asserted that Hari is omnipresent, his father (Hiranyakashipu) angrily asked him to show Hari in the pillar. When He appeared instantly, was Vaikuntha (His abode) next door to that pillar?

Verse 2: When the servants of Yama were dragging Ajamila, who had committed sinful deeds, he called out to his son (named Narayana) in fear. Hearing this, Hari came to protect him. Was Shweta Dwipa (His abode) nearby to this earth?

Verse 3: When the elephant king (Gajendra) was being swallowed by a crocodile, he called out in fear. Hearing his plea, Hari came instantly and saved him. Was the lake where the elephant resided next door to Anantasana (His abode)?

Verse 4: When the king of the Kurus (Duryodhana) was pulling Draupadi's saree, she cried out "Ha Krishna!" Hearing her plea, He instantly provided the endless saree. Was Hastinapura next door to Dwaravati (Dwaraka)?

Verse 5: He is the all-pervading, omnipresent Lord who is complete in every atom. He is the great, glorious Lord who is beyond measure. The compassionate Lord Kaginele Adikeshava resides in the hearts of those who remember Him.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-16' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-16' }
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
        compositionId: 'kanaka-list-16',
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
