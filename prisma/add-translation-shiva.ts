import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding translation for Shiva Shiva Shiva Enniro (kanaka-list-48)...');

  const compositionId = 'kanaka-list-48';
  
  const translation = `Chorus: Chant "Shiva, Shiva, Shiva"—everyone in the three worlds, chant "Shiva, Shiva, Shiva."

Verse 1: This is a mantra rooted in the essence of the Agama Siddhanta (scriptural truth). Chant "Shiva, Shiva, Shiva"—it is the medicine that destroys the root cause of your diseases.

Verse 2: Do not be born as a human and forget yourself. Chant "Shiva, Shiva, Shiva"—do not waste your body, mind, and soul. If you wish to abandon crores of sins, chant "Shiva, Shiva, Shiva"—this is a mantra whose value cannot be compared to anything else.

Verse 3: If you wish to overcome the torments of Yama (the God of Death), chant "Shiva, Shiva, Shiva." If you desire to attain pure, perfect liberation, chant "Shiva, Shiva, Shiva." If you wish to become powerful in this world or attain a higher state in the hereafter, chant "Shiva, Shiva, Shiva."

Verse 4: If you wish to understand the Guru, Linga, and Jangama, chant "Shiva, Shiva, Shiva." If you wish to truly realize the Supreme Soul (Paramatma), chant "Shiva, Shiva, Shiva." If you wish to become a true Guru in this world and unite with Adi Keshava, the Lord of all truths, chant "Shiva, Shiva, Shiva."`;

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
