import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding translation for Dasa Daasara (kanaka-7)...');

  const compositionId = 'kanaka-7';
  
  const translation = `Chorus: I am the servant of the servants of the servants of the Lord. Oh Lord of Sri (Lakshmi), Oh Lord of Sriranga, I am the servant of Your house.

Verse 1: I am the foolish servant of the house of the servants of Shankukadasa. I am a foolish servant, a servant who is ignorant. I am a lowly servant who guards the proud door of the house of devotees who remember the Lord by singing His praises.

Verse 2: I am the lowly servant of the house of the servants of Kalidasa. I am a servant who is a mere instrument, a servant who is ignorant. I am the servant of the servant of the servants of the house of the devotees who worship You, Oh companion of the three-eyed Lord (Shiva).

Verse 3: I am the lowly servant of the house of many servants. I am a servant without caste, a servant who is like a shepherd. I am the Madiga (lowly) servant of the house of those who worship You with determination. Oh my Lord Adikeshavaraya, please grant me liberation.`;

  // Upsert the translation record
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
