import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // We already know IDs for:
  // "Krishna Kuruva" -> krishnakuruva-1
  // "Krishna Kshetra Hanusha" -> krishnakshete-1
  // "Nala Charitre" -> kanaka-1
  
  const toDeleteTitles = ["Hari Bhakti Sara"];
  const idsToDelete = ["krishnakuruva-1", "krishnakshete-1", "kanaka-1"];

  // Find "Hari Bhakti Sara" ID
  const hariBhaktiSara = await prisma.composition.findFirst({
    where: { title: { contains: 'Hari Bhakti Sara' } }
  });

  if (hariBhaktiSara) {
    idsToDelete.push(hariBhaktiSara.id);
  }

  console.log('Deleting IDs:', idsToDelete);

  // Perform deletion
  
  // First, delete related DailyComposition records
  await prisma.dailyComposition.deleteMany({
    where: {
      compositionId: { in: idsToDelete }
    }
  });

  // Then delete compositions
  const deleted = await prisma.composition.deleteMany({
    where: {
      id: { in: idsToDelete }
    }
  });

  console.log('Deleted compositions:', deleted.count);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
