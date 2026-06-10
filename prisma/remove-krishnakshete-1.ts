import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Removing composition krishnakshete-1...');

  // First, delete any associated translations to avoid foreign key constraints
  await prisma.translation.deleteMany({
    where: { compositionId: 'krishnakshete-1' },
  });

  // Then delete the composition
  try {
    await prisma.composition.delete({
      where: { id: 'krishnakshete-1' },
    });
    console.log('✅ Composition krishnakshete-1 removed successfully!');
  } catch (e) {
    console.log('⚠️ Composition krishnakshete-1 not found, might have been removed already.');
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
