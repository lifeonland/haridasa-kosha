import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding translation for Hariye Idu Sariye (nt-002)...');

  const compositionId = 'nt-002';
  
  const translation = `Chorus: O Hari, is this fair? Why does compassion not arise in You for Your devoted servant who seeks refuge at Your feet?

Verse 1: If You, the Lord of Lakshmi (Shripati), do not protect me because I am a fallen soul, will Your famous title 'Purifier of the fallen' hold true?

Verse 2: You possess all power, yet You neglect Your devotee. Does this not make Your name 'Lover of devotees' meaningless?

Verse 3: You protected Bhrigu Muni, who kicked You without hesitation. O Lord who lifted the mountain, why do You abandon me?

Verse 4: You did not protect the despicable Ajamila. Am I not Your own, or am I a stranger to You?

Verse 5: You destroyed the trouble that was Hiranyakashipu. Am I not Your servant who considers You a relative?

Verse 6: You protected the fallen Ahalya. Did she offer You something special, or did I fail to offer something?

Verse 7: O Lord, do as You please according to Your mind. I have sought refuge in You, O complete Narahari.`;

  // Upsert the translation record
  // Assuming compositionId is unique in the Translation table
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: compositionId }
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
        compositionId: compositionId,
        english: translation,
        kannadaMeaning: '-', // Placeholder
        wordByWord: '-', // Placeholder
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
