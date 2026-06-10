import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Vyasaraja Tirtharu image...');

  await prisma.composer.update({
    where: { id: 'vyasatirtha' },
    data: { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeDKhsjkHk65drD1nTqi8E_UG5eN6JKLfXNA&s' },
  });

  console.log('✅ Vyasaraja Tirtharu image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
