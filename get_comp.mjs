import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const comp = await prisma.composition.findFirst({ where: { NOT: { id: "sripadaraja-olide-yatakamma" } }, include: { raga: true, tala: true } });
  console.log(comp);
}
main().catch(console.error).finally(() => prisma.$disconnect());
