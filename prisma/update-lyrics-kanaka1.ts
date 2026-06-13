import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಹೆತ್ತ ತಾಯಿಗಿಂತ ಅತ್ಯಧಿಕ ಮಾಯವುಂಟೆ
ಉತ್ತಮ ಅಶ್ವವ ಕತ್ತೆ ಹೋಲುವುದುಂಟೆ ।।ಪ।।

ವಿತ್ತವುಳ್ಳವನ ಕುಲ ಎಣಿಸುವುದುಂಟೆ
ಸ್ವಾರ್ಥಕೆ ನ್ಯಾಯ ಎಂದಾದರೂ ಉಂಟೆ ।।೧।।

ಅತ್ತೆಮನೆ ಸೇರುವಗೆ ಅಭಿಮಾನವುಂಟೆ
ಬತ್ತಲೆ ತಿರುಗುವಗೆ ಭಯವು ಇನ್ನುಂಟೆ ।।೨।।

ಪೃಥ್ವಿಯೊಳಗೆ ಕಾಗಿನೆಲೆಯಾದಿ ಕೇಶವಗೆ
ಮರ್ತ್ಯದೊಳನ್ಯ ದೇವರು ಸರಿಯುಂಟೆ ।।೩।।`;

  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-1' },
    data: { lyrics: lyrics }
  });

  console.log('Successfully updated lyrics for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
