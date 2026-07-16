import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updates = [
    { id: 'narahari-tirtha', guruId: 'madhwacharya' },
    { id: 'vyasatirtha', guruId: 'sripadaraja' },
    { id: 'purandara-dasa', guruId: 'vyasatirtha' },
    { id: 'kanaka-dasa', guruId: 'vyasatirtha' },
    { id: 'vadiraja-tirtha', guruId: 'vyasatirtha' },
    { id: 'madhwapati-dasa', guruId: 'purandara-dasa' },
    { id: 'vijaya-dasa', guruId: 'purandara-dasa' },
    { id: 'gopala-dasa', guruId: 'vijaya-dasa' },
    { id: 'mohana-dasa', guruId: 'vijaya-dasa' },
    { id: 'jagannatha-dasaru', guruId: 'gopala-dasa' },
    { id: 'pranesha-dasaru', guruId: 'jagannatha-dasaru' },
  ];

  for (const { id, guruId } of updates) {
    try {
      await prisma.composer.update({
        where: { id },
        data: { guruId }
      });
      console.log(`Updated ${id} with guru ${guruId}`);
    } catch(e) {
      console.error(`Failed for ${id}:`, e.message);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
