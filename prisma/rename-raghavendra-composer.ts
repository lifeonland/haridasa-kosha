import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const oldName = 'Raghavendra Dasaru';
  const newName = 'Raghavendra Tirtharu';
  const composerId = 'raghavendra-dasa';

  console.log(`Renaming composer '${oldName}' to '${newName}' (ID: ${composerId})...`);

  try {
    const updatedComposer = await prisma.composer.update({
      where: { id: composerId },
      data: {
        name: newName,
      },
    });
    console.log(`✅ Composer renamed successfully to: ${updatedComposer.name}`);
  } catch (error) {
    console.error('Error renaming composer:', error);
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
