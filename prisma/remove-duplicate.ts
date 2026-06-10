import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Removing duplicate composition kanaka-11...');

  await prisma.composition.delete({
    where: { id: 'kanaka-11' },
  });

  console.log('✅ Duplicate composition removed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
