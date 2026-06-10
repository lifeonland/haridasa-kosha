import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Puttadasanu Nanalla (kanaka-list-45)...');

  const lyrics = `ಪುಟ್ಟದಾಸನು ನಾನಲ್ಲ ದಿಟ್ಟದಾಸನು ನಾನಲ್ಲ
ಸಿಟ್ಟುದಾಸನು ನಾನಲ್ಲ ಸುಟ್ಟದಾಸನು ನಾನಲ್ಲ ||ಪ||

ಕಷ್ಟದಾಸನು ನಾನಲ್ಲ ಕೊಟ್ಟದಾಸನು ನಾನಲ್ಲ
ಹೊಟ್ಟೆದಾಸನು ನಾನಲ್ಲ ಇಟ್ಟಿಗೆದಾಸನು ನಾನಲ್ಲ ||೧||

ಶಿಷ್ಟದಾಸನು ನಾನಲ್ಲ ನಿಷ್ಟದಾಸನು ನಾನಲ್ಲ
ಭ್ರಷ್ಟದಾಸನು ನಾನಲ್ಲ ಶ್ರೇಷ್ಠದಾಸನು ನಾನಲ್ಲ ||೨||

ವಿತದಾಸನು ನಾನಲ್ಲ ಹುಟ್ಟಿದಾಸನು ನಾನಲ್ಲ
ದಾಸದಾಸರ ಮನೆಯ ದಾಸಾನುದಾಸ ನಾನು ||೩||`;

  const translation = `Chorus: I am not a small servant, I am not a proud servant. I am not an angry servant, I am not a ruined servant.

Verse 1: I am not a servant in distress, I am not a servant who gives. I am not a servant of the belly, I am not a brick-servant.

Verse 2: I am not a refined servant, I am not a loyal servant. I am not a corrupt servant, I am not a superior servant.

Verse 3: I am not a false servant, I am not a servant born by caste. I am the servant of the servants of the house of the Lord’s devotees, O Adikeshavaraya.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-45' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-45' }
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
        compositionId: 'kanaka-list-45',
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
