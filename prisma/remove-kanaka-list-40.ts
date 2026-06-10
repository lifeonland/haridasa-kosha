import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compId = 'kanaka-list-40';
  console.log(`Removing composition ${compId} and all dependencies...`);

  // 1. Delete associated translations
  await prisma.translation.deleteMany({
    where: { compositionId: compId },
  });

  // 2. Delete associated reflections
  await prisma.reflection.deleteMany({
    where: { compositionId: compId },
  });

  // 3. Delete associated daily compositions
  await prisma.dailyComposition.deleteMany({
    where: { compositionId: compId },
  });

  // 4. Delete the composition
  try {
    await prisma.composition.delete({
      where: { id: compId },
    });
    console.log(`✅ Composition ${compId} and all dependencies removed successfully!`);
  } catch (e) {
    console.error(`⚠️ Error removing composition ${compId}:`, e);
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
