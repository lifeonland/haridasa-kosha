import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Satyavantara Sangaviralu (kanaka-list-13)...');

  const lyrics = `ಸತ್ಯವಂತರ ಸಂಗವಿರಲು ತೀರ್ಥವೇತಕೆ
ನಿತ್ಯ ಅನ್ನದಾನವಿರಲು ಭಯವು ಏತಕೆ ||ಪ||

ಗುರುಹಿರಿಯರ ಅರಿಯದವನ ಅರಿವದೇತಕೆ
ಪರಹಿತಾರ್ಥಕಿಲ್ಲದವನ ಶರೀರವೇತಕೆ
ಹರಿಯ ಪೂಜೆ ಮಾಡದವನ ಜನುಮವೇತಕೆ
ಸೇರಿದವರ ಹೊರೆಯದಂಥ ದೊರೆಯು ಏತಕೆ ||೧||

ಮಾತು ಕೇಳದೆ ಮಲೆತು ನಡೆವ ಮಕ್ಕಳೇತಕೆ
ಭೀತನಾಗಿ ಓಡಿಬರುವ ಬಂಟಾನೇತಕೆ
ಪ್ರೀತಿ ಇಲ್ಲದೆ ಎಡೆಯನಲಿಕ್ಕಿದ ಊಟವೇತಕೆ
ಸೋತು ಹೆಣ್ಣಿಗೆ ಹೆದರಿ ನಡೆಯದ ಸುಗುಣನೇತಕೆ ||೨||

ತಾನು ಉಣ್ಣದ ಪರರಿಗಿಕ್ಕದ ಧನವಿದ್ದೇತಕೆ
ಮಾನ ಹೀನನಾಗಿ ಬಾಳ್ವ ಮನುಜನೇತಕೆ
ನುಣ ಹೆಚ್ಚು ನೋಡುವಲ್ಲಿ ಇರುವುದೇತಕೆ
ತನ್ನ ಬಳಗವೆರಸಿ ಉಣ್ಣದ ಭಾಗ್ಯವೇತಕೆ ||೩||

ತಾನು ತನ್ನನರಿಯದಂಥ ಪ್ರೌಢನೇತಕೆ
ಸ್ನಾನ ಸಂಧ್ಯಾನವಿಲ್ಲದ ಶೀಲವೇತಕೆ
ಜ್ಞಾನವಿಲ್ಲದೆ ನುರುಕಾಲ ಬದುಕಲೇತಕೆ
ಧ್ಯಾನದೊಳಗೆ ಕೃಷ್ಣನಿಲ್ಲದ ತನುವಿದ್ದೇತಕೆ ||೪||

ಸಂಜ್ಞೆಯರಿತು ನಡೆಯದಿರುವ ಸತಿ ಇದ್ದೇತಕೆ
ಭಿನ್ನವರಿತು ನಡೆಯದಂಥ ಸ್ನೇಹವೇತಕೆ
ಮುನ್ನ ಕೊಟ್ಟು ಪಡೆಯಲಿಲ್ಲ ಬಯಸಲೇತಕೆ
ಚೆನ್ನ ಆದಿಕೇಶವನಿರಲು ಬೇರೆ ದೈವವೇತಕೆ ||೫||`;

  const translation = `Pallavi: When one is in the company of the truthful, why seek holy waters (Tirtha)? When there is daily charity (Annadana), why fear?

Verse 1: What is the use of knowledge for one who does not understand elders and gurus? What is the use of a body for one who does not work for the benefit of others? What is the use of birth for one who does not worship Hari? What is the use of a king who does not support those who depend on him?

Verse 2: What is the use of children who do not listen and act defiantly? What is the use of a servant who runs away in fear? What is the use of food served without love? What is the use of a virtuous man who is defeated and afraid of women?

Verse 3: What is the use of wealth that one does not consume nor give to others? What is the use of a human who lives without self-respect? What is the use of living where one only looks for faults? What is the use of fortune if one does not share it with their family and eat together?

Verse 4: What is the use of an intellectual who does not know himself? What is the use of character without daily rituals (Snana/Sandhya)? What is the use of living for a hundred years without wisdom? What is the use of a body that does not have Krishna in its meditation?

Verse 5: What is the use of a wife who does not understand signs and act accordingly? What is the use of a friendship that does not understand differences? What is the use of desiring something without having given anything in the past? When the beautiful Adikeshava is there, why seek any other God?`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-13' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-13' }
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
        compositionId: 'kanaka-list-13',
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
