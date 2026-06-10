import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Batch adding Pranesha Dasaru compositions...');

  const composerId = 'pranesha-dasaru';
  
  // Create or fetch Ankita (Using 'Pranesha Vittala' based on typical Haridasa naming conventions if not specified, 
  // though the article mentions his works, let's use a placeholder name based on his name)
  let ankita = await prisma.ankita.findFirst({ where: { name: 'Pranesha Vittala' } });
  if (!ankita) {
    ankita = await prisma.ankita.create({ data: { name: 'Pranesha Vittala' } });
  }

  // Create or fetch Composer
  let composer = await prisma.composer.findFirst({ where: { id: composerId } });
  if (!composer) {
    composer = await prisma.composer.create({
      data: {
        id: composerId,
        name: 'Pranesha Dasaru',
        biography: 'Pranesha Dasaru was a significant Haridasa who contributed several philosophical and devotional works, including Suladhis, Stotras, and Dasara Padagalu.',
        ankitaId: ankita.id,
        timeline: 'Unknown',
      },
    });
  }

  // Create or fetch Deity
  let deity = await prisma.deity.findFirst({ where: { name: 'Vittala' } });
  if (!deity) {
    deity = await prisma.deity.create({ data: { name: 'Vittala' } });
  }

  const compositions = [
    "Odhagi paaliso bavambudhiya",
    "Nodide naa dhanyanindige",
    "Gurugala pada pankaja",
    "Gurugala anudina neneve naa andhantamasa prapti",
    "Lambodhara pahi pahi",
    "Maha deva mahadeva palise ni ennanu gauri devi",
    "Adhadhayithu innadharu olle",
    "Vandhisuve guru santatige",
    "Kaye ninna pada",
    "Hari Vayu Stuti"
  ];

  for (let i = 0; i < compositions.length; i++) {
    const title = compositions[i];
    const id = `pranesha-${i + 1}`;
    await prisma.composition.upsert({
      where: { id: id },
      update: {
        title: title,
        firstLine: title,
        composerId: composer.id,
        ankitaId: ankita.id,
      },
      create: {
        id: id,
        title: title,
        firstLine: title,
        lyrics: title, // Placeholder
        composerId: composer.id,
        ankitaId: ankita.id,
        deityId: deity.id,
      },
    });
  }

  console.log(`✅ ${compositions.length} Pranesha Dasaru compositions added/updated successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
