import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Vadiraja Tirtharu image...');

  await prisma.composer.update({
    where: { id: 'vadiraja-tirtha' },
    data: { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFs8UkKEyXda__AbaWW5sXr9y1_2Fehplcbg&s' },
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
