import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Sripadarajaru image...');
  
  await prisma.composer.update({
    where: { id: 'sripadaraja' },
    data: { imageUrl: '/assets/webp/sripadaraja.webp' },
  });

  console.log('✅ Sripadarajaru image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
