import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Categorizing compositions to "Unknown" deity to allow manual correction...');

  // Get the ID for "Unknown" deity, creating it if necessary
  const unknownDeity = await prisma.deity.upsert({
    where: { name: 'Unknown' },
    update: {},
    create: { name: 'Unknown' },
  });

  // Update all compositions currently assigned to "Krishna" to "Unknown"
  // to remove the incorrect blanket categorization.
  const krishnaDeity = await prisma.deity.findFirst({ where: { name: 'Krishna' } });
  
  if (krishnaDeity) {
    const result = await prisma.composition.updateMany({
      where: { deityId: krishnaDeity.id },
      data: { deityId: unknownDeity.id },
    });
    console.log(`✅ ${result.count} compositions moved from "Krishna" to "Unknown".`);
  } else {
    console.log('⚠️ Krishna deity not found in database.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
