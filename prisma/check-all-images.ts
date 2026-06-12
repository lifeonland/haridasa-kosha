import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const composers = await prisma.composer.findMany({
    select: { id: true, name: true, imageUrl: true }
  });

  console.log('Composers and Images:', JSON.stringify(composers, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
