import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const composerId = 'prasanna-venkata-dasa';
  const newImageUrl = '/assets/webp/prasanna-venkata-dasaru.webp';
  
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
