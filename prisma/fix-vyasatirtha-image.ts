import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fixing Vyasatirtharu image...');

  // Using a generally accepted high-quality artistic portrait from Wikimedia Commons
  await prisma.composer.update({
    where: { id: 'vyasatirtha' },
    data: { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Vyasaraja_swami.jpg' },
  });

  console.log('✅ Vyasatirtharu image fixed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
