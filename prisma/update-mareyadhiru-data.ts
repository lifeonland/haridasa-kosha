import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Mareyadhiru Mareyadhiru (kanaka-list-58)...');

  const lyrics = `ಮರೆಯದಿರು ಮರೆಯದಿರು ಮರುಳು ಮನುಜ
ನಾರಾಯಣನ ಸ್ಮರಣೆಯನ್ನು ಮಾಡು ಮನುಜ ||ಪ||

ರಂಗನಾಥನು ಇರಲಿಕ್ಕೆ ಜಂಗುಳಿ ದೈವಗಳೇಕೆ
ತುಂಗಭದ್ರೆ ಇರಲಿಕ್ಕೆ ಬಾವಿ ಕೆರೆಗಳೇಕೆ
ಅಂಗನಾ ಸತಿ ಇರಲಿಕ್ಕೆ ಬನಗು ಹೆಣ್ಣುಗಳೇಕೆ
ಮಂಗಳಾತ್ಮನಿರಲಿಕ್ಕೆ ಪರದೈವವೇಕೆ ||೧||

ಹಾಲು ಹಲ್ಲವಿರಲಿಕ್ಕೆ ವಲಿಯವ ತರಲೇಕೆ
ಮೇಲುನಾಮ ವಿರಲಿಕ್ಕೆ ಕಟಕು ಇನ್ನೇಕೆ
ಬಾಲ ಹನುಮನಿರಲಿಕ್ಕೆ ಹುಳು ಕಪಿಗಳೇಕೆ
ಒಳ್ಳೆ ತುಳಸಿಯಿರೇ ಕಗ್ಗೊರಲೆಯೇಕೆ ||೨||

ಚಿನ್ನದ ಗಿರಿ ಇರಲಿಕ್ಕೆ ಕಬ್ಬಿನದ ಮೊರಡಿಯೇಕೆ
ರನ್ನ ಮಾಣಿಕ ವಿರಲಿಕ್ಕೆ ಕಾಜಿನ ಹರಳೇಕೆ
ಅನ್ನ ತುಪ್ಪ ವಿರಲಿಕ್ಕೆ ಮದ್ಯ ಪಾನಗಳೇಕೆ
ಚೆನ್ನ ಆದಿಕೇಶವನಿರೇ ಬಿಣುಗು ದೈವಗಳೇಕೆ ||೩||`;

  const translation = `Chorus: Do not forget, do not forget, O foolish human; always remember the name of Narayana, O human.

Verse 1: When Lord Ranganatha is there, why seek other minor deities? When the holy Tungabhadra river is there, why seek ordinary wells and ponds? When the virtuous wife is there, why seek other women? When the auspicious Lord is there, why seek other gods?

Verse 2: When milk and honey are available, why seek ordinary drinks? When the supreme name (of the Lord) is there, why seek other trivial things? When the mighty Hanuman is there, why seek ordinary monkeys? When the holy Tulasi is there, why seek ordinary weeds?

Verse 3: When the golden mountain (Meru) is there, why seek a mound of iron? When precious gems and rubies are there, why seek ordinary glass beads? When food and ghee are there, why seek intoxicating drinks? When the beautiful Lord Keshava is there, why seek other minor deities?`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-58' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-58' }
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
        compositionId: 'kanaka-list-58',
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
