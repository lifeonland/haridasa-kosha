import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const start = Date.now();
  const composers = await prisma.composer.count();
  const compositions = await prisma.composition.count();
  const time = Date.now() - start;
  console.log(`✅ Successfully connected to Neon DB!`);
  console.log(`⏱️ Query time: ${time}ms`);
  console.log(`📊 Stats: ${composers} Composers, ${compositions} Compositions found in database.`);
}
main().catch(e => {
  console.error('❌ Connection failed:', e);
}).finally(() => prisma.$disconnect());
