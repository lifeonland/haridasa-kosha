import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating images for Purandara and Kanaka Dasaru...');

  // Purandara Dasaru
  await prisma.composer.update({
    where: { id: 'purandara-dasa' },
    data: { imageUrl: '/assets/webp/purandaradasaru.webp' },
  });

  // Kanaka Dasaru
  await prisma.composer.update({
    where: { id: 'kanaka-dasa' },
    data: { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Kanakadasa_art.jpg' },
  });

  console.log('✅ Purandara Dasaru and Kanaka Dasaru images updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
