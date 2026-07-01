const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.dailyComposition.deleteMany({});
  console.log("Cleared DailyCompositions!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
