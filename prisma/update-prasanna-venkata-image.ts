import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Prasanna Venkata Dasaru image...');

  await prisma.composer.update({
    where: { id: 'prasanna-venkata-dasa' },
    data: { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Prasanna_venkata_dasaru.jpg/250px-Prasanna_venkata_dasaru.jpg' },
  });

  console.log('✅ Prasanna Venkata Dasaru image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
