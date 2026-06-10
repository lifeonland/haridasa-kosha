import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating image for Vijaya Dasaru...');

  await prisma.composer.update({
    where: { id: 'vijaya-dasa' },
    data: { imageUrl: 'https://pbs.twimg.com/media/DsSq9g9U0AAwaZi?format=jpg&name=small' },
  });

  console.log('✅ Vijaya Dasaru image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
