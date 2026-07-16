import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const comp = await prisma.composition.findUnique({
    where: { id: 'sr-24' }
  });

  if (!comp) {
    console.error("Not found");
    return;
  }

  console.log("TITLE:");
  console.log(comp.title);
  console.log("\nLYRICS:");
  console.log(comp.lyrics);
  console.log("\nTRANSLITERATION:");
  console.log(comp.transliteration);
}

main().catch(console.error).finally(() => prisma.$disconnect());
