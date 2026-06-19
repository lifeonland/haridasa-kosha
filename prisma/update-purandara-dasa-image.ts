import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Purandara Dasaru image...');
  
  await prisma.composer.update({
    where: { id: 'purandara-dasa' },
    data: { imageUrl: '/assets/webp/purandaradasaru.webp' },
  });

  console.log('✅ Purandara Dasaru image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
