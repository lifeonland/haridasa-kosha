import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating kanaka-list-46 and removing kanaka-list-29...');

  // Update kanaka-list-46
  const lyrics46 = `ದ್ಯಾವಿ ನಮ್ಮ ದ್ಯಾವರು ಬಂದರು ಬನ್ನೀರೆ, ನೋಡ ಬನ್ನಿರೆ ||ಪ||

ಕೆಂಗಣ್ಣ ಮೀನನಾಗಿ ನಮ ರಂಗಗುಂಗಾಡು ಸೋಮನ ಕೊಂದಾನ್ಮ್ಯಾ
ಗುಂಗಾಡು ಸೋಮನ ಕೊಂದು ವೇದವನುಬಂಗಾರದೊಡಲನಿಗಿತ್ತಾನ್ಮ್ಯಾ ||೧||

ದೊಡ್ಡ ಮಡುವಿನೊಳಗೆ ನಮ ರಂಗಗುಡ್ಡವ ಹೊತ್ಕೊಂಡು ನಿಂತಾನ್ಮ್ಯಾ
ಗುಡ್ಡವ ಹೊತ್ಕೊಂಡು ನಿಂತು ಸುರರನುದೊಡ್ಡವರನ್ನ ಮಾಡ್ಯಾನ್ಮ್ಯಾ ||೨||

ಚೆನ್ನ ಕಾಡಿನ ಹಂದಿಯಾಗಿ ನಮ ರಂಗಚಿನ್ನದ ಕಣ್ಣನ ಕೊಂದಾನ್ಮ್ಯಾ
ಚಿನ್ನದ ಕಣ್ಣನ ಕೊಂದು ಭೂಮಿಯವನಜಸಂಭವಗಿತ್ತಾನ್ಮ್ಯಾ ||೩||

ಸಿಟ್ಟಿಂದ ಸಿಂಹನಾಗಿ ನಮ ರಂಗಹೊಟ್ಟೆಯ ಕರುಳ ಬಗೆದಾನ್ಮ್ಯಾ
ಹೊಟ್ಟೆಯ ಕರುಳ ಹಾರವ ಮಾಡಿ ಪುಟ್ಟಗೆ ವರವ ಕೊಟ್ಟಾನ್ಮ್ಯಾ ||೪||

ಹುಡುಗ ಹಾರುವನಾಗಿ ನಮ ರಂಗಬೆಡಗಲಿ ಮುಗಿಲಿಗೆ ಬೆಳೆದಾನ್ಮ್ಯಾ
ಬೆಡಗಲಿ ಮುಗಿಲಿಗೆ ಬೆಳೆದು ಬಲಿಯನ್ನಅಡಿಯಿಂದ ಪಾತಾಳಕೊತ್ತ್ಯಾನ್ಮ್ಯಾ ||೫||`;

  const translation46 = `Chorus: Come and see, our Lord (Ranga) has come! Come and see Him!

Verse 1: As a red-eyed fish (Matsya avatar), our Lord Ranga killed the demon Somaka. After killing him, He restored the Vedas and gave them back to Brahma (the golden-bodied one).

Verse 2: Inside the great lake, our Lord Ranga stood holding up the mountain (Govardhana). By standing and holding the mountain, He made the gods great and protected them.

Verse 3: As a beautiful wild boar (Varaha avatar), our Lord Ranga killed the demon Hiranyaksha (the golden-eyed one). After killing him, He returned the earth to Brahma (the lotus-born).

Verse 4: In anger, becoming a lion (Narasimha avatar), our Lord Ranga tore open the stomach and entrails of the demon. He made a garland out of the entrails and gave a boon to the young Prahlada.

Verse 5: As a young Brahmin boy (Vamana avatar), our Lord Ranga grew to reach the sky. Having grown to the sky, He pushed Bali down to the netherworld (Patala) with His foot.`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-46' },
    data: { lyrics: lyrics46 },
  });

  const t46 = await prisma.translation.findFirst({ where: { compositionId: 'kanaka-list-46' } });
  if (t46) {
    await prisma.translation.update({ where: { id: t46.id }, data: { english: translation46 } });
  } else {
    await prisma.translation.create({ data: { compositionId: 'kanaka-list-46', english: translation46, kannadaMeaning: '-', wordByWord: '-' } });
  }

  // Remove kanaka-list-29
  await prisma.translation.deleteMany({
    where: { compositionId: 'kanaka-list-29' },
  });
  await prisma.composition.deleteMany({
    where: { id: 'kanaka-list-29' },
  });

  console.log('✅ Updated kanaka-list-46 and removed kanaka-list-29!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
