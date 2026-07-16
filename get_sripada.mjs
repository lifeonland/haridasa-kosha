import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const comp = await prisma.composer.findUnique({ where: { id: "sripadaraja" } });
  console.log(JSON.stringify(comp, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
