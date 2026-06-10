import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating composer images...');

  await prisma.composer.update({
    where: { id: 'guru-jagannatha-dasa' },
    data: { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL222Ebc496-f-1C1JJdXH8haGkTdGd6ObZQ&s' },
  });

  await prisma.composer.update({
    where: { id: 'achyuta-dasa' },
    data: { imageUrl: 'https://nilume.net/wp-content/uploads/2013/11/bhadragiri-achyuta-dasa.jpg' },
  });

  console.log('✅ Composer images updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
