import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics for Dasa Daasara (kanaka-7)...');

  const lyrics = `ದಾಸದಾಸರ ಮನೆಯ ದಾಸಾನುದಾಸ ನಾನು
ಶ್ರೀಶ ಶ್ರೀರಂಗ ನಿಮ್ಮ ಮನೆಯ ದಾಸ ।।ಪ।।

ಶಂಕುದಾಸರ ಮನೆಯ ಮಂಕುದಾಸನು ನಾನಯ್ಯ
ಮಂಕುದಾಸನು ನಾನು ಮರುಳದಾಸ
ಸಂಕೀರ್ತನೆಯ ಮಾಡಿ ನೆನೆವ ಭಕ್ತರ ಮನೆಯ
ಬಿಂಕದ ಬಾಗಿಲ ಕಾಯ್ವ ಬಡದಾಸ ನಾನು ।।೧।।

ಕಾಳಿದಾಸರ ಮನೆಯ ಕೀಳುದಾಸನು ನಾನಯ್ಯ
ಆಳುದಾಸನು ನಾನು ಮೂಳದಾಸ
ಫಾಲಾಕ್ಷಸಖ ನಿನ್ನ ಭಜಿಪ ಭಕ್ತರ ಮನೆಯ
ಆಳಿನಾಳಿನ ದಾಸನಡಿದಾಸ ನಾನಯ್ಯ ।।೨।।

ಹಲವು ದಾಸರ ಮನೆಯ ಹೊಲೆದಾಸ ನಾನಯ್ಯ
ಕುಲವಿಲ್ಲದ ದಾಸ ಕುರುಬದಾಸ
ಛಲದಿ ನಿನ್ನ ಭಜಿಸುವವರ ಮನೆಯ ಮಾದಿಗದಾಸ
ಸಲೆ ಮುಕ್ತಿ ಪಾಲಿಸೆನ್ನೊಡೆಯ ಆದಿಕೇಶವರಾಯ ।।೩।।`;

  await prisma.composition.update({
    where: { id: 'kanaka-7' },
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
