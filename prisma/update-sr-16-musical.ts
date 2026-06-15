import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.composition.update({
    where: { id: 'sr-16' },
    data: {
      ragaId: 'cmqavqho90000nmoiyn00c0c1',
      talaId: 'cmqaxe7ub0001aw3drt029lq1'
    }
  });
  console.log('Updated: sr-16');
  await prisma.$disconnect();
}

main();
