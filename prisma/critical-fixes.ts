import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Applying critical fixes...');
  
  // 1. Rename and update image for Subbanna Dasaru
  await prisma.composer.update({
    where: { id: 'subbanna-dasa' },
    data: { 
        name: 'Kalluru Subbanna Dasaru',
        imageUrl: '/assets/webp/kalluru-subbanna-dasaru.webp' 
    },
  });
  console.log('✅ Kalluru Subbanna Dasaru updated.');

  // 2. Rename and update image for Satyabodha Tirtharu
  await prisma.composer.update({
    where: { id: 'satyabodha-dasa' },
    data: { 
        name: 'Satyabodha Tirtharu',
        imageUrl: 'https://cdn.umath.in/um-assets/parampara/images/24.jpg' 
    },
  });
  console.log('✅ Satyabodha Tirtharu updated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
