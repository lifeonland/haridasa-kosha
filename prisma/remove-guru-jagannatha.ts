import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const composerId = 'guru-jagannatha-dasa';
  console.log(`Removing composer: ${composerId}`);

  // Delete compositions first
  await prisma.composition.deleteMany({
    where: { composerId },
  });

  // Delete composer
  await prisma.composer.delete({
    where: { id: composerId },
  });

  console.log(`✅ Removed composer ${composerId} and all associated compositions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
