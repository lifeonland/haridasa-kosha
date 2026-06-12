import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Raghavendra Tirtharu image...');
  
  await prisma.composer.update({
    where: { id: 'raghavendra-dasa' },
    data: { imageUrl: '/assets/rayaru.png' },
  });

  console.log('✅ Raghavendra Tirtharu image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
