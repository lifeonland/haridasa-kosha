import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating composer names to Dasaru...');
  
  await prisma.composer.update({ where: { id: 'purandara-dasa' }, data: { name: 'Purandara Dasaru' } });
  await prisma.composer.update({ where: { id: 'kanaka-dasa' }, data: { name: 'Kanaka Dasaru' } });
  await prisma.composer.update({ where: { id: 'vijaya-dasa' }, data: { name: 'Vijaya Dasaru' } });

  console.log('✅ Composer names updated!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
