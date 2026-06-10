import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating images for Kanaka and Vijaya Dasaru...');

  await prisma.composer.update({
    where: { id: 'kanaka-dasa' },
    data: { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Kanakadasa_art.jpg' },
  });

  await prisma.composer.update({
    where: { id: 'vijaya-dasa' },
    data: { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Vijaya_Dasa.jpg/440px-Vijaya_Dasa.jpg' },
  });

  console.log('✅ Images updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
