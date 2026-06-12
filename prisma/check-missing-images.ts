import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Identifying composers with missing images...');
  
  const composers = await prisma.composer.findMany({
    where: { OR: [{ imageUrl: null }, { imageUrl: '' }] },
    select: { id: true, name: true }
  });

  console.log('Composers needing images:', JSON.stringify(composers, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
