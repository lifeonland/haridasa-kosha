const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const comps = await prisma.composition.findMany({
    where: { composerId: 'sripadaraja' },
    include: { tags: true },
    take: 5
  });
  console.log(JSON.stringify(comps.map(c => ({ id: c.id, tags: c.tags.map(t => t.name), title: c.title })), null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
