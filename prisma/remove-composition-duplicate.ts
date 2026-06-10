import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compositionId = 'kanaka-dimbadhilliruva-jeeva';

  console.log(`Attempting to remove composition: ${compositionId}...`);

  try {
    // Check if translation exists first to avoid foreign key issues, though cascading delete might handle it depending on schema
    await prisma.translation.deleteMany({
        where: { compositionId: compositionId }
    });

    const deleted = await prisma.composition.delete({
      where: { id: compositionId },
    });
    console.log(`✅ Composition "${deleted.title}" (id: ${compositionId}) removed successfully!`);
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.log(`Composition with id ${compositionId} not found.`);
    } else {
      console.error('Error removing composition:', error);
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
