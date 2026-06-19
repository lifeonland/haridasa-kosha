import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Restoring Purandara Dasaru image...');

  await prisma.composer.update({
    where: { id: 'purandara-dasa' },
    data: { imageUrl: '/assets/webp/purandaradasaru.webp' },
  });

  console.log('✅ Purandara Dasaru image restored successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
