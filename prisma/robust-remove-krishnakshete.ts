import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compId = 'krishnakshete-1';
  console.log(`Removing composition ${compId} and all dependencies...`);

  // 1. Delete associated translations
  await prisma.translation.deleteMany({
    where: { compositionId: compId },
  });

  // 2. Delete associated reflections (foreign key dependency)
  await prisma.reflection.deleteMany({
    where: { compositionId: compId },
  });

  // 3. Delete the composition
  try {
    await prisma.composition.delete({
      where: { id: compId },
    });
    console.log(`✅ Composition ${compId} and dependencies removed successfully!`);
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
