const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const comp = await prisma.composition.findUnique({
    where: { id: 'suladi-2' }
  });
  console.log("Title:", comp.title);
  console.log("First lines of lyrics:");
  console.log(comp.lyrics.split('\n').slice(0, 10).join('\n'));
}
main().catch(console.error).finally(() => prisma.$disconnect());
