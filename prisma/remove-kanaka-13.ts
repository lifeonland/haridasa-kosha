import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Removing composition kanaka-13...');

  // First, delete any associated translations to avoid foreign key constraints
  await prisma.translation.deleteMany({
    where: { compositionId: 'kanaka-13' },
  });

  // Then delete the composition
  try {
    await prisma.composition.delete({
      where: { id: 'kanaka-13' },
    });
    console.log('✅ Composition kanaka-13 removed successfully!');
  } catch (e) {
    console.log('⚠️ Composition kanaka-13 not found, might have been removed already.');
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
