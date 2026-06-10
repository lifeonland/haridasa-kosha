import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Kesavanolumeyu Aguva Tanaka (kanaka-list-12)...');

  const lyrics = `ಕೇಶವನೊಲುಮೆಯು ಆಗುವ ತನಕ ಹರಿ
ದಾಸರೊಳಿರುತಿರು ಹೇ ಮನುಜ ||ಪ||

ಕ್ಲೇಶಪಾಶಂಗಳ ಹರಿದು ವಿಲಾಸದಿ
ಶ್ರೀಶನ ನುತಿಗಳ ಪೋಗಳುತ ಮನದೊಳು ||ಅ.ಪ||

ಮೋಸದಿ ಜೀವರ ಘಾಸಿ ಮಾಡಿದ ಪಾಪ
ಕಾಶಿಗೆ ಹೋದರೆ ಹೋದೀತೆ
ಶ್ರೀಶನ ಭಕುತರ ದೂಷಿಸಿದ ಫಲ
ಕಾಸು ಕೊಟ್ಟರೆ ಬಿಟ್ಟೀತೆ
ಭಾಷೆಯ ಕೊಟ್ಟು ನಿರಾಶೆಯ ಗೈದ ಫಲ
ಕ್ಲೇಶವ ಗೊಳಿಸದೆ ಇದ್ದೀತೆ
ಭೂಸುರಸರ್ವಸ್ವವ ಹ್ರಾಸ ಮಾಡಿದ ಫಲ
ಏಸೇಸು ಜನುಮಕು ಬಿಟ್ಟೀತೆ ||೧||

ಜೀವನ ವಶದೊಳು ನಾನಾ ದ್ರವ್ಯವಿರೆ
ದಾನ ಧರ್ಮಕೆ ಮನಸಾದೀತೆ
ಹೀನ ಮನುಜನಿಗೆ ಜ್ಞಾನವ ಭೋಧಿಸೆ
ಹೀನ ವಿಷಯ ಅಳಿದ್ಹೋದೀತೆ
ಮಾನಿನಿ ಮನಸು ನಿಧಾನವಿರದಿರೆ
ಮಾನಾಭಿಮಾನಗಳು ಉಳಿದೀತೇ
ಭಾನುಪ್ರಕಾಶನ ಭಜನೆಯ ಮಾಡದ
ಹೀನಗೆ ಮುಕುತಿಯು ದೊರಕೀತೆ ||೨||

ಸತ್ಯಧರ್ಮಗಳ ನಿತ್ಯವೂ ಬೋಧಿಸೆ
ತೊತ್ತಿನ ಮನಸಿಗೆ ಸೊಗಸೀತೆ
ತತ್ವದ ಅರ್ಥವ ವಿಚಿತ್ರದಿ ಪೇಳೆ
ಕತ್ತೆಯ ಚಿತ್ತಕೆ ಹತ್ತೀತೆ
ಪುತ್ಥಳಿ ಬೊಂಬೆಯ ಚಿತ್ರದಿ ಬಣ್ಣಿಸಿ
ಮುತ್ತುಕೊಟ್ಟರೆ ಮಾತನಾಡೀತೆ
ಕತ್ತುರಿ ತಿಲಕವನೊತ್ತಿ ಫಣೆಯೊಳಿಡೆ
ಅರ್ತಿಯ ತೋರದೆ ಇದ್ದೀತೆ ||೩||

ನ್ಯಾಯವ ಬಿಟ್ಟನ್ಯಾಯವ ಪೇಳಲು
ನಾಯಿಗೆ ನರಕವು ತಪ್ಪೀತೆ
ಬಾಯಿ ಕೊಬ್ಬಿನಲಿ ಬಯ್ಯುವ ಮನುಜಗೆ
ಘಾಯವಾಗದೆ ಬಿಟ್ಟೀತೆ
ತಾಯಿತಂದೆಗಳ ನೋಯಿಸಿದವನಿಗೆ
ಮಾಯದ ಮರಣವು ತಪ್ಪೀತೆ
ಮಾಯಾಜಾಲವ ಕಲಿತ ಮನುಜನಿಗೆ
ಕಾಯ ಕಷ್ಟವ ಬಿಟ್ಟೀತೆ ||೪||

ಸಾಧು ಸಜ್ಜನರ ನೋಯಿಸಿದ ಮಾಯಾ
ವಾದಿಗೆ ನರಕವು ತಪ್ಪೀತೆ
ಬಾಧಿಸಿ ಪರರರ್ಥವ ದೋಚುವವಗೆ
ವ್ಯಾಧಿಯು ಕಾಡದೆ ಬಿಟ್ಟೀತೆ
ಭೇದವೆಣಿಸಿ ಬಲು ಕ್ಷುದ್ರವ ಕಲಿತರೆ
ಮೋದವೆಂದಿಗು ಆದೀತೆ
ಕದ್ದು ಒಡಲ ಪೊರೆವವನ ಮನೆಯೊಳು
ಇದ್ದದ್ದು ಹೋಗದೆ ಉಳಿದೀತೆ ||೫||

ಅಂಗಜ ವಿಷಯಗಳನು ತೊರೆದಾತಗೆ
ಅಂಗನೆಯರ ಸುಖ ಸೊಗಸೀತೆ
ಸಂಗ ದುಃಖಗಳು ಹಿಂಗಿದ ಮನುಜಗೆ
ಶೃಂಗಾರದ ಬಗೆ ರುಚಿಸೀತೆ
ಇಂಗಿತವರಿತ ನಿಸ್ಸಂಗಿ ಶರೀರ ವ-
ಜ್ರಾಂಗಿಯಾಗದೆ ತಾನಿದ್ದೀತೆ
ಮಂಗಳ ಮಹಿಮನ ಅಂಘ್ರಿಯ ಕಾಣದ
ಮಂಗಗೆ ಮುಕುತಿಯು ದೊರಕೀತೆ ||೬||

ಕರುಣಾಮೃತದಾಭರಣವ ಧರಿಸಿದ
ಶರಣಗೆ ಸಿರಿಯು ತಪ್ಪೀತೆ
ಶರಣ ಪಾಶದುರವಣೆ ಹರಿದಾತಗೆ
ಶರಣರ ಕರುಣವು ತಪ್ಪೀತೆ
ಅರಿತು ಶಾಸ್ತ್ರವನಾಚರಿಪ ಯೋಗ್ಯಗೆ
ಗುರು ಉಪದೇಶವು ತಪ್ಪೀತೆ
ವರ ವೇಲಾಪುರದಾದಿಕೇಶವನ
ಸ್ಮರಿಸುವವನಿಗೆ ಮೋಕ್ಷ ತಪ್ಪೀತೆ ||೭||`;

  const translation = `Chorus: O human, until you attain the grace of Keshava, remain in the company of Hari's devotees.

Anupallavi: Severing the bonds of suffering with ease, praise the Lord (Shrisha) within your mind.

Verse 1: Will the sins committed by deceiving and harming living beings vanish just by going to Kashi? Will the result of criticizing the devotees of the Lord go away just by paying money? Will the result of breaking a promise and causing disappointment leave you without suffering? Will the result of diminishing the wealth of Brahmins leave you even after many births?

Verse 2: When one has various forms of wealth in their control, will the mind turn towards charity and righteousness? If one teaches knowledge to a lowly person, will their lowly nature vanish? If a woman's mind lacks patience, will her honor and pride remain? Will liberation be attained by a lowly person who does not worship the Sun-like radiant Lord?

Verse 3: If one teaches truth and righteousness daily, will it please a servant-like mind? If one explains the meaning of truth in a strange way, will it be grasped by the mind of a donkey? If one paints a doll and kisses it, will it speak back? If one applies musk tilaka on the forehead, will it be there without devotion?

Verse 4: If one abandons justice and speaks injustice, will hell be avoided by such a dog-like person? Will a person who abuses others with arrogance escape from being wounded? Will death be avoided by one who hurts their parents? Will the body escape suffering for one who learns the web of illusion?

Verse 5: Will hell be avoided by a deceptive debater who hurts the virtuous and good people? Will disease not haunt one who harasses others and loots their wealth? If one learns lowly things while thinking of differences, will happiness ever be attained? In the house of one who sustains their body by stealing, will what is there remain without being lost?

Verse 6: For one who has abandoned the pleasures of the senses, will the happiness of women be pleasing? For one whose sorrows of association have vanished, will the ways of worldly decoration be tasteful? Will the body of a detached person who knows the inner meaning not become as strong as a diamond (Vajra)? Will liberation be attained by a monkey-like person who does not see the feet of the auspicious glorious Lord?

Verse 7: Will wealth be denied to a devotee who wears the ornament of the nectar of compassion? Will the compassion of devotees be denied to one who has severed the bonds of surrender? Will the instruction of the Guru be denied to a worthy person who understands and practices the scriptures? Will liberation be denied to one who remembers the boon-giving Adikesava of Velapura?`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-12' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-12' }
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
        compositionId: 'kanaka-list-12',
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
