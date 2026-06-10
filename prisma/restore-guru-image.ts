import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Restoring Guru Jagannathadasaru image...');

  await prisma.composer.update({
    where: { id: 'guru-jagannatha-dasa' },
    data: { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL222Ebc496-f-1C1JJdXH8haGkTdGd6ObZQ&s' },
  });

  console.log('✅ Guru Jagannathadasaru image restored successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
