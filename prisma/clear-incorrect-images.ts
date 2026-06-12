import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const incorrectImageUrls = ['/assets/vittala.png', '/assets/srinivasa.png'];

async function main() {
  console.log('Clearing incorrect deity image mappings...');
  
  const result = await prisma.composer.updateMany({
    where: { imageUrl: { in: incorrectImageUrls } },
    data: { imageUrl: null },
  });

  console.log(`✅ Cleared ${result.count} incorrect image mappings.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
