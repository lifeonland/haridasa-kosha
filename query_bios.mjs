import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const composers = await prisma.composer.findMany({ select: { id: true, biography: true } });
  composers.slice(0, 10).forEach(c => console.log(c.id, ':', c.biography ? c.biography.substring(0, 30) : 'null'));
}
main();
