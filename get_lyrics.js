const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const comp = await prisma.composition.findUnique({
    where: { id: 'sr-11' }
  });
  console.log(comp.lyrics);
}
main().catch(console.error).finally(() => prisma.$disconnect());
