import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Renaming Vyasatirtha to Vyasatirtharu...');
  
  await prisma.composer.update({
    where: { id: 'vyasatirtha' },
    data: { name: 'Vyasatirtharu' },
  });

  console.log('✅ Composer renamed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
