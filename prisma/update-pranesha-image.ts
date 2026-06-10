import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Pranesha Dasaru image...');

  await prisma.composer.update({
    where: { id: 'pranesha-dasa' },
    data: { imageUrl: 'https://i1.sndcdn.com/artworks-000422572932-f7mz30-t500x500.jpg' },
  });

  console.log('✅ Pranesha Dasaru image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
