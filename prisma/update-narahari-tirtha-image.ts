import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Narahari Tirtharu image...');
  
  await prisma.composer.update({
    where: { id: 'narahari-tirtha' },
    data: { imageUrl: '/assets/webp/narahari.webp' },
  });

  console.log('✅ Narahari Tirtharu image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
