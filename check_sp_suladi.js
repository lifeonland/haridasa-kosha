const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const comps = await prisma.composition.findMany({
    where: { 
      composerId: 'sripadaraja'
    }
  });
  const matching = comps.filter(c => c.title.toLowerCase().includes('suladi') || c.title.toLowerCase().includes('ugabhoga'));
  console.log("Matching:", matching.map(c => c.title));
}
main().catch(console.error).finally(() => prisma.$disconnect());
