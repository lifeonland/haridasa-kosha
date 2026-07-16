import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.composer.update({
    where: { id: 'pranesha-dasaru' },
    data: { name: 'Pranesha Dasaru' }
  });
  console.log('Updated Pranesha Dasaru in DB');
}
main();
