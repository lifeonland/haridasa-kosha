import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Govindadasaru image...');

  await prisma.composer.update({
    where: { id: 'govinda-dasa' },
    data: { imageUrl: 'https://i1.sndcdn.com/artworks-000456665058-8o8gj0-t500x500.jpg' },
  });

  console.log('✅ Govindadasaru image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
