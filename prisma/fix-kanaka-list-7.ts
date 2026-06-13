import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಬಾರೋ ಕೃಷ್ಣಯ್ಯ ನಿನ್ನ ಭಕ್ತರ ಮನೆಗೀಗ ||

ಬಾರೋ ನಿನ್ನ ಮುಖ ತೋರೋ ನಿನ್ನ 
ಸರಿ ಯಾರೋ ಜಗಧಾರ ಶೀಲನೇ ||

ಅಂದುಗೆ ಪಾದವು ಕಾಲಂದುಗೆ ಕಿರು ಗೆಜ್ಜೆ 
ಧಿಂಧಿಮಿ ಧಿಮಿ ಧಿಮಿ ಧಿಮಿ ಎನುತ 
ಪೊಂಗೊಳನುದುತ್ತ ಬರಿಯ ಬಾರಯ್ಯ ||

ಕಂಕಣ ಕರದಲ್ಲಿ ಪೊನ್ನುಂಗುರ ಹೊಳೆಯುತ 
ಕಿಂಕಿಣಿ ಕಿಣಿ ಕಿಣಿ ಕಿಣಿ ಎನುತ 
ಪೊಂಗೊಳಲನೂದುತ್ತ ಬಾರಯ್ಯ ಬಾರೋ ಕೃಷ್ಣಯ್ಯ ||

ವಾಸ ಉಡುಪೀಲಿ ನೆಲೆಯಾದಿ ಕೇಶವನೇ 
ದಾಸ ನಿನ್ನ ಪದ ದಾಸ ನಿನ್ನ ಪದ 
ದಾಸ ನಿನ್ನ ಪದ ದಾಸ ಕರೆವೆನು ಬಾರಯ್ಯ ||`;

  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-7' },
    data: { 
      lyrics: lyrics,
    }
  });

  console.log('Successfully updated lyrics for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
