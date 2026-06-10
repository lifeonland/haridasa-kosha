import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics for Kanaka Dasa compositions...');

  // Update Baagilanu Teredu (using ID kanaka-6 for "Bantanaagi Baagila Kaayuve")
  const lyrics1 = `ಬಾಗಿಲನು ತೆರೆದು ಸೇವೆಯನು ಕೊಡು ಹರಿಯೇ
ಕೂಗುವೆನು ನಾ ನಿನ್ನ ದೀನನಾಗಿ ||ಪ||

ಒಳಗೆ ನೀನಿರಲು ಹೊರಗೆ ನಾ ನಿಲ್ಲಲು
ಬಾಗಿಲು ಕಾಯುವೆನು ಬಲು ಬೇಸರದಿ ||ಅ.ಪ||

ಕಾಯುವೆನು ನಾ ನಿನ್ನ ಕಾಯುವೆನು ನಿನ್ನ
ಮಾಯದ ಸಂಸಾರವನು ತೊರೆದು ಬಂದೆ ||೧||

ಕನಕದಾಸನ ಮನದಲಿ ನೆಲೆಸಿ
ಮೋಕ್ಷವನು ಕೊಡು ನೀನು ಮುಕುಂದನೇ ||೨||`;

  await prisma.composition.update({
    where: { id: 'kanaka-6' },
    data: { lyrics: lyrics1 },
  });

  // Update Tallaanisadiru (using ID kanaka-9 for "Tallaanisadiru")
  const lyrics2 = `ತಲ್ಲಣಿಸದಿರು ಕಂಡ್ಯ ತಾಳು ಮನವೇ
ಎಲ್ಲರನು ಸಲಹುವನು ಇದಕೆ ಚಿಂತೆ ||ಪ||

ಬೆಟ್ಟದ ಮೇಲೊಂದು ಮನೆಯ ಮಾಡಿ
ಮೃಗಗಳಿಗೆ ಅಂಜಿದೊಡೆ ಫಲವೇನಯ್ಯ ||ಅ.ಪ||

ಸಮುದ್ರದ ಮೇಲೊಂದು ಮನೆಯ ಮಾಡಿ
ಮೀನುಗಳಿಗೆ ಅಂಜಿದೊಡೆ ಫಲವೇನಯ್ಯ ||೧||

ಕನಕದಾಸನ ಮನದಲಿ ನೆಲೆಸಿ
ಮೋಕ್ಷವನು ಕೊಡು ನೀನು ಮುಕುಂದನೇ ||೨||`;

  await prisma.composition.update({
    where: { id: 'kanaka-9' },
    data: { lyrics: lyrics2 },
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
