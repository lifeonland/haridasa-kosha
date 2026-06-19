import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Vadiraja Tirtharu image...');

  await prisma.composer.update({
    where: { id: 'vadiraja-tirtha' },
    data: { imageUrl: '/assets/webp/vadiraja.webp' },
  });

  console.log('✅ Vadiraja Tirtharu image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
