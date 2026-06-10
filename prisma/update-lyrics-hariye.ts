import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics for Hariye Idu Sariye (nt-002)...');

  const lyrics = `ಹರಿಯೇ ಇದು ಸರಿಯೇ
ಚರಣಸೇವಕನಲ್ಲಿ ಕರುಣೆ ಬಾರದ್ಯಾಕೆ    ||ಪ||

ಪತಿತನೆಂದು ಶ್ರೀಪತಿ ರಕ್ಷಿಸದಿರೆ
ವಿತತವಾಹುದೆ ನಿನ್ನ ಪತಿತಪಾವನ ಕೀರ್ತಿ?   ||೧||

ಶಕ್ತ ನೀನಾಗಿದ್ದು ಭಕ್ತನುಪೇಕ್ಷಿಸೆ
ಭಕ್ತವತ್ಸಲ ನಾಮ ವ್ಯರ್ಥವಾಗದೆ?    ||೨||

ದಿಗಿಲಿಲ್ಲದೆ ಒದ್ದ ಭೃಗುವ ಪಾಲಿಸಿದೆ
ನಗಧರ ಎನ್ನ ಬಿಡುವ ಬಗೆ ಏನಿದು?    ||೩||

ಹೇಯ ಅಜಾಮಿಳನ ಕಾಯಲಿಲ್ಲೆ ಸ್ವ
ಕೀಯನೆ ನಾ ಪರಕೀಯನೆ ನಿನಗೆ?    ||೪||

ಉಂಟು ಹಿರಣ್ಯಕನ ಕಂಟಕ ಬಿಡಿಸಿದ್ದು
ನಂಟನೆ ನಿನಗೆ ಬಂಟ ನಾನಲ್ಲವೆ?    ||೫||

ಕೆಟ್ಟ ಅಹಲ್ಯೆಯ ದಿಟ್ಟ ಪಾಲಿಸಿದೆ
ಕೊಟ್ಟಳು ಅವಳೇನ ಬಿಟ್ಟದ್ದು ನಾನೇನ?   ||೬||

ದೊರೆ ನಿನ್ನ ಮನಸಿಗೆ ಸರಿಬಂದಂತೆ ಮಾಡು
ಮೊರೆಹೊಕ್ಕೆನು ನಾ ನರಹರಿಪೂರ್ಣನೆ    ||೭||`;

  await prisma.composition.update({
    where: { id: 'nt-002' },
    data: { lyrics: lyrics },
  });

  console.log('✅ Lyrics for Hariye Idu Sariye updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
