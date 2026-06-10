import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Mahipati Dasaru image...');

  await prisma.composer.update({
    where: { id: 'mahipati-dasa' },
    data: { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2z_A1Tzd_HN2XScoNsm0a-4p2r72A2uLBHQ&s' },
  });

  console.log('✅ Mahipati Dasaru image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
