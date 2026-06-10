import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Removing composition kanaka-6...');

  // First, delete any associated translations to avoid foreign key constraints
  await prisma.translation.deleteMany({
    where: { compositionId: 'kanaka-6' },
  });

  // Then delete the composition
  try {
    await prisma.composition.delete({
      where: { id: 'kanaka-6' },
    });
    console.log('✅ Composition kanaka-6 removed successfully!');
  } catch (e) {
    console.log('⚠️ Composition kanaka-6 not found, might have been removed already.');
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
