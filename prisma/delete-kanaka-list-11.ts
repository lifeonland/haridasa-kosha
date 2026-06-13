import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compIdToDelete = "kanaka-list-11";

  console.log('Deleting composition ID:', compIdToDelete);

  // First, delete related DailyComposition records
  await prisma.dailyComposition.deleteMany({
    where: {
      compositionId: compIdToDelete
    }
  });

  // Then delete the composition
  const deleted = await prisma.composition.delete({
    where: {
      id: compIdToDelete
    }
  });

  console.log('Successfully deleted composition:', deleted.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
