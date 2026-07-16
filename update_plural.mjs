import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.composer.update({
    where: { id: 'mahipati-dasa' },
    data: { name: 'Mahipathi Dasaru' }
  });
  console.log('Updated Mahipathi Dasaru');

  await prisma.composer.update({
    where: { id: 'gopala-dasa' },
    data: { name: 'Gopala Dasaru' }
  });
  console.log('Updated Gopala Dasaru');

  await prisma.composer.update({
    where: { id: 'prasanna-venkata-dasa' },
    data: { name: 'Prasanna Venkata Dasaru' }
  });
  console.log('Updated Prasanna Venkata Dasaru');
}
main();
