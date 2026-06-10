import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some sample Ragas, Talas, Tags
  const raga = await prisma.raga.upsert({
    where: { name: 'Mohana' },
    update: {},
    create: { name: 'Mohana' },
  });

  const tala = await prisma.tala.upsert({
    where: { name: 'Adi' },
    update: {},
    create: { name: 'Adi' },
  });

  const tag = await prisma.tag.upsert({
    where: { name: 'Bhakti' },
    update: {},
    create: { name: 'Bhakti' },
  });

  // Example: Update a Kanaka Dasa composition (assuming we have one)
  // Let's find one by title or just get the first one for demonstration
  const composition = await prisma.composition.findFirst({
      where: { composer: { name: { contains: 'Kanaka' } } }
  });

  if (composition) {
      await prisma.composition.update({
          where: { id: composition.id },
          data: {
              ragaId: raga.id,
              talaId: tala.id,
              tags: {
                  connect: [{ id: tag.id }]
              }
          }
      });
      console.log(`Updated composition ${composition.title} with Raga, Tala, and Tag.`);
  } else {
      console.log("No Kanaka Dasa composition found to update.");
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
