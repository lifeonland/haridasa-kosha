import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Vijaya Dasaru image...');
  
  await prisma.composer.update({
    where: { id: 'vijaya-dasa' },
    data: {
      imageUrl: 'https://i.pinimg.com/736x/81/6c/38/816c38482cc6922f073ed281fd3d837b.jpg',
    },
  });

  console.log('✅ Vijaya Dasaru image updated!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
