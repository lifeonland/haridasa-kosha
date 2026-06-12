import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const composers = await prisma.composer.findMany({
    select: { id: true, name: true, biography: true }
  });

  console.log('Composers and Biographies:', JSON.stringify(composers, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
