const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const comp = await prisma.composition.findUnique({
    where: { id: 'sr-11' }
  });
  console.log("Transliteration:", JSON.stringify(comp.transliteration, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
