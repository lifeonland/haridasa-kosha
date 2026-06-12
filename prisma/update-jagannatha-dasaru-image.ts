import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Jagannatha Dasaru images...');
  
  const imageUrl = 'https://anandsp1.wordpress.com/wp-content/uploads/2018/09/jagannatha-dasaru.jpg?w=315&h=435';
  
  await prisma.composer.update({
    where: { id: 'jagannatha-dasaru' },
    data: { imageUrl },
  });
  
  await prisma.composer.update({
    where: { id: 'jagannatha-dasa' },
    data: { imageUrl },
  });

  console.log('✅ Jagannatha Dasaru images updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
