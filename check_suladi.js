const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const comps = await prisma.composition.findMany({
    where: { 
      OR: [
        { title: { contains: 'Suladi', mode: 'insensitive' } },
        { title: { contains: 'Ugabhoga', mode: 'insensitive' } },
        { tags: { some: { name: { in: ['Suladi', 'Ugabhoga', 'Ugabhoga '] } } } }
      ]
    },
    include: { tags: true }
  });
  console.log("Found:", comps.length);
  console.log(JSON.stringify(comps.map(c => ({ id: c.id, tags: c.tags.map(t => t.name), title: c.title })), null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
