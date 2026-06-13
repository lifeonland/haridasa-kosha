import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find or create Raga and Tala
  const raga = await prisma.raga.upsert({
    where: { name: 'Atana' },
    update: {},
    create: { name: 'Atana' }
  });
  
  const tala = await prisma.tala.upsert({
    where: { name: 'Khanda Chapu' },
    update: {},
    create: { name: 'Khanda Chapu' }
  });

  // Update composition metadata
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-6' },
    data: { 
      ragaId: raga.id,
      talaId: tala.id,
    }
  });

  console.log('Successfully updated metadata for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
