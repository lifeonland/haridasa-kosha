import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const composerId = 'helavanakatte-giriyamma';
  const newImageUrl = '/assets/webp/helavanakatte-giriyamma.webp';
  
  console.log(`Updating image for: ${composerId}`);

  await prisma.composer.update({
    where: { id: composerId },
    data: { imageUrl: newImageUrl },
  });

  console.log(`✅ Updated image to ${newImageUrl}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
