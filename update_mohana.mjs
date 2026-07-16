import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.composer.update({
    where: { id: 'mohana-dasa' },
    data: { name: 'Mohana Dasaru' }
  });
  console.log('Updated Mohana Dasaru in DB');
}
main();
