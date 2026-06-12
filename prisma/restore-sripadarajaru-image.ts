import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Restoring Sripadarajaru image...');
  
  await prisma.composer.update({
    where: { id: 'sripadaraja' },
    data: { imageUrl: '/assets/srinivasa.png' },
  });

  console.log('✅ Image restored successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
