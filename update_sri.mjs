import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.composer.update({
    where: { id: 'gopala-dasa' },
    data: { name: 'Sri Gopala Dasaru' }
  });
  console.log('Updated Sri Gopala Dasaru');

  await prisma.composer.update({
    where: { id: 'mohana-dasa' },
    data: { name: 'Sri Mohana Dasaru' }
  });
  console.log('Updated Sri Mohana Dasaru');

  await prisma.composer.update({
    where: { id: 'pranesha-dasaru' },
    data: { name: 'Sri Pranesha Dasaru' }
  });
  console.log('Updated Sri Pranesha Dasaru');
}
main();
