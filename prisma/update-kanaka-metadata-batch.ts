import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const metadata = [
    { id: 'kanaka-list-22', raga: 'Kambhoji', tala: 'Jhampa' },
    { id: 'kanaka-list-24', raga: 'Purvi', tala: 'Adi' },
    { id: 'kanaka-list-70', raga: 'Kapi', tala: 'Adi' },
  ];

  for (const item of metadata) {
    const raga = await prisma.raga.upsert({
      where: { name: item.raga },
      update: {},
      create: { name: item.raga }
    });
    
    const tala = await prisma.tala.upsert({
      where: { name: item.tala },
      update: {},
      create: { name: item.tala }
    });

    await prisma.composition.update({
      where: { id: item.id },
      data: { 
        ragaId: raga.id,
        talaId: tala.id,
      }
    });
    console.log(`Updated ${item.id} with ${item.raga} / ${item.tala}`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
