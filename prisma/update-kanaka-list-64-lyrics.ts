import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compositionId = 'kanaka-list-64';
  const lyrics = `ಡಿಂಬದಲ್ಲಿ ಇರುವ ಜೀವ ಕಂಬಸೂತ್ರ ಗೊಂಬೆಯಂತೆ
ಎಂದಿಗಿದ್ದರೊಂದು ದಿನ ಸಾವು ತಪ್ಪದು ||pa||

ಹುಟ್ಟುತೇನು ತಾರಲಿಲ್ಲ ಸಾಯುತೇನು ಒಯ್ಯಲಿಲ್ಲ
ಸುಟ್ಟು ಸುಟ್ಟು ಸುಣ್ಣದ ಹರಳಾಯಿತೀ ದೇಹ|
ಹೊಟ್ಟೆ ಭಾಳ ಕೆಟ್ಟದೆಂದು ಎಷ್ಟು ಕಷ್ಟ ಪಟ್ಟರೂನು
ಬಿಟ್ಟು ಹೋಗುವಾಗ ಗೇಣು ಬಟ್ಟೆ ಕಾಣದು ||1||

ಹತ್ತು ಎಂಟು ಲಕ್ಷ ಗಳಿಸಿ ಮತ್ತೆ ಸಾಲದೆಂದು ಪರರ
ಅರ್ಥಕಾಗಿ ಆಸೆಪಟ್ಟು ಸುಳ್ಳು ನ್ಯಾಯ ಮಾಡ್ವರು
ಬಿತ್ತಿ ಬೆಳೆದು ತನ್ನದೆಂಬ ವ್ಯರ್ಥಚಿಂತೆಯನ್ನು ಮಾಡೆ
ಸತ್ತು ಹೋದ ಮೇಲೆ ಅರ್ಥ ಯಾರಿಗಾಹುದೊ ||2||

ಹೊನ್ನು ಹೆಣ್ಣು ಮಣ್ಣು ಮೂರು ತನ್ನಲಿದ್ದು ಉಣ್ಣಲಿಲ್ಲ
ಅಣ್ಣತಮ್ಮ ತಾಯಿ ತಂದೆ ಬಯಸಲಾಗದು
ಅನ್ನ ವಸ್ತ್ರ ಭೋಗಕಾಗಿ ತನ್ನ ಸುಖವ ಕಾಣಲಿಲ್ಲ
ಮಣ್ಣುಪಾಲು ಆದಮೇಲೆ ಯಾರಿಗಾಹುದೊ ||3||

ಬೆಳ್ಳಿ ಬಂಗರಿಟ್ಟುಕೊಂಡು ಒಳ್ಳೆ ವಸ್ತ್ರ ಹೊದ್ದುಕೊಂಡು
ಅಳ್ಳಾಚಾರಿ ಗೊಂಬೆಯಂತೆ ಆಡಿ ಹೋಯಿತು|
ಹಳ್ಳ ಹರಿದು ಹೋಗುವಾಗ ಗುಳ್ಳೆ ಬಂದು ಒಡೆಯುವಂತೆ
ಉಳ್ಳೆ ಪೊರೆಯಂತೆ ಕಾಣೊ ಸಂಸಾರದಾಟವು ||4||

ವಾರ್ತೆ ಕೀರ್ತಿಯೆಂಬುವೆರಡು ಸತ್ತ ಮೇಲೆ ಬಂದವಯ್ಯ
ವಸ್ತು ಪ್ರಾಣನಾಯಕನು ಎಲ್ಲಿ ದೊರಕ್ಯಾನು
ಕರ್ತೃ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನ ಚರಣಕಮಲ
ನಿತ್ಯದಲ್ಲಿ ಭಜಿಸಿ ಸುಖಿಯಾಗಿ ಬಾಳೆಲೊ ||5||`;

  console.log(`Updating Kannada lyrics for ${compositionId}...`);

  const updatedComposition = await prisma.composition.update({
    where: { id: compositionId },
    data: {
      lyrics: lyrics,
    },
  });

  console.log(`✅ Kannada lyrics for "${updatedComposition.title}" updated successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
