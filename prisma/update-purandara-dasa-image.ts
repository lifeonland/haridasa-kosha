import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Purandara Dasaru image...');
  
  await prisma.composer.update({
    where: { id: 'purandara-dasa' },
    data: { imageUrl: 'https://d18x2uyjeekruj.cloudfront.net/wp-content/uploads/2020/05/pdas.jpg' },
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
