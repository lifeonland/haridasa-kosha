import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Jagannatha Dasaru image...');

  await prisma.composer.update({
    where: { id: 'jagannatha-dasa' },
    data: { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/JagannathaDasaru.png' },
  });

  console.log('✅ Jagannatha Dasaru image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
