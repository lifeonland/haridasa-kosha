import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const id = 'vyasatirtha-24';

  const composition = await prisma.composition.findUnique({
      where: { id }
  });

  if (!composition) {
      console.log(`Composition with ID ${id} not found.`);
      return;
  }

  // Delete associated translations first (if any cascading issues exist, though Prisma usually handles this)
  await prisma.translation.deleteMany({
      where: { compositionId: id }
  });

  // Delete the composition
  await prisma.composition.delete({
      where: { id }
  });

  console.log(`Successfully removed composition ${id}!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
