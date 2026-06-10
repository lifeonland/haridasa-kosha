import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fixing Guru Jagannathadasaru image...');

  await prisma.composer.update({
    where: { id: 'guru-jagannatha-dasa' },
    data: { imageUrl: 'https://sgjd.files.wordpress.com/2012/06/guru-jagannatha-dasaru.jpg' },
  });

  console.log('✅ Guru Jagannathadasaru image fixed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
