const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const comp = await prisma.composition.findUnique({
    where: { id: 'sr-11' },
    include: { translations: true }
  });
  console.log(JSON.stringify(comp.translations, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
