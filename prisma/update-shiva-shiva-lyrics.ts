import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics for Shiva Shiva Shiva Enniro (kanaka-list-48)...');

  const lyrics = `ಶಿವ ಶಿವ ಶಿವ ಎನ್ನಿರೋ ಮೂರ್ಜಗದವರೆಲ್ಲ
ಶಿವ ಶಿವ ಶಿವ ಎನ್ನಿರೋ ||ಪ||

ಆಗಮ ಸಿದ್ಧಾಂತ ಮೂಲದ ಜಪವಿದು
ನಿಮ್ಮ ರೋಗದ ಮೂಲವ ಕೆಡಿಪ ಔಷಧವಿದು ||೧||

ಮನುಜ ಜನ್ಮದಿ ಹುಟ್ಟಿ ಮೈ ಮರೆದಿರಬೇಡಿ
ನಿಮ್ಮ ತನು ಮನ ಪ್ರಾಣವ ವ್ಯರ್ಥವ ಮಾಡದೆ ||೨||

ಅಪರಾಧದ ಕೋಟಿ ತ್ಯಜಿಸಬೇಕಾದರೆ ಮುಂದೆ
ಉಪಮಿತರೊರ್ವಿತರರಿಯದ ಜಪವಿದು ||೩||

ಜವನ ಬಾಧೆಯ ನೀನು ಜಯಿಸಬೇಕಾದರೆ
ನಿಜ ಸುವಿಮಲ ಮುಕ್ತಿಯ ಪಡೆಯಬೇಕಾದರೆ ||೪||

ಭುವನಕೆ ಬಲ್ಲಿದನಾಗ ಬೇಕಾದರೆ ನೀವು
ಭುವನ ಪದವಿಯನು ಪಡೆಯಬೇಕಾದರೆ ||೫||

ಗುರುಲಿಂಗ ಜಂಗಮನ ಅರಿಯ ಬೇಕಾದರೆ
ಮುಂದೆ ಪರಮಾತ್ಮನ ನೀವು ತಿಳಿಯಬೇಕಾದರೆ ||೬||

ಪೃಥ್ವಿಗೆ ಸದ್ಗುರುನಾಗ ಬೇಕಾದರೆ ನೀವು
ತತ್ತ್ವಪತಿ ಆದಿಕೇಶವನ ಕೂಡಬೇಕಾದರೆ ||೭||`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-48' },
    data: { lyrics: lyrics },
  });

  console.log('✅ Lyrics updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
