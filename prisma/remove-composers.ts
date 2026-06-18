import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const composerIds = ['pranesha-dasa', 'jagannatha-dasa', 'achyuta-dasa'];
  
  for (const id of composerIds) {
    console.log(`Removing composer: ${id}`);
    
    // Delete compositions first (if any, though count is 0)
    await prisma.composition.deleteMany({
      where: { composerId: id },
    });

    // Delete composer
    try {
      await prisma.composer.delete({
        where: { id },
      });
      console.log(`✅ Removed composer ${id}.`);
    } catch (e) {
      console.error(`Error removing ${id}:`, e);
    }
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
