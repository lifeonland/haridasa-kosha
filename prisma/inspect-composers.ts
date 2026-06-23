import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const composers = await prisma.composer.findMany();
  console.log('--- COMPOSERS IN DATABASE ---');
  composers.forEach((c) => {
    console.log(`ID: ${c.id}`);
    console.log(`Name: ${c.name}`);
    console.log(`Image URL: ${c.imageUrl}`);
    console.log('-----------------------------');
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
