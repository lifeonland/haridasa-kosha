import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Restoring Purandara Dasaru image...');

  await prisma.composer.update({
    where: { id: 'purandara-dasa' },
    data: { imageUrl: 'https://i.pinimg.com/736x/29/e5/b0/29e5b084b9d40d29d2532141e0d662b8.jpg' },
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
