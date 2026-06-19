import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updates = [
    {
      id: 'purandara-dasa',
      name: 'Purandara Dasaru',
      imageUrl: '/assets/webp/purandaradasaru.webp',
    },
    {
      id: 'gopala-dasa',
      name: 'Gopala Dasaru',
      imageUrl: 'https://i0.wp.com/www.sushameendra.org/wp-content/uploads/2018/01/gopaladasaru.png?resize=267%2C300',
    },
  ];

  for (const item of updates) {
    await prisma.composer.update({
      where: { id: item.id },
      data: { imageUrl: item.imageUrl },
    });
    console.log(`✅ ${item.name} image updated.`);
  }
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
