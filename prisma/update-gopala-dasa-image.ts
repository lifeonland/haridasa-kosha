import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Gopala Dasaru image...');
  
  await prisma.composer.update({
    where: { id: 'gopala-dasa' },
    data: { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlstpQEu9y3xlgCGLYFf2YAQBFRjqq_ns3JA&s' },
  });

  console.log('✅ Gopala Dasaru image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
