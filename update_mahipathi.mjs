import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.composer.update({
    where: { id: 'mahipati-dasa' },
    data: { name: 'Mahipathi Dasaru' }
  });
  console.log('Updated Mahipathi Dasaru in DB');
}
main();
