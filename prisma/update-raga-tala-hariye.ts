import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Raga and Tala for Hariye Idu Sariye (nt-002)...');

  // Find or create Raga "Kedara"
  const raga = await prisma.raga.upsert({
    where: { name: 'Kedara' },
    update: {},
    create: { name: 'Kedara' }
  });

  // Find or create Tala "Adi"
  const tala = await prisma.tala.upsert({
    where: { name: 'Adi' },
    update: {},
    create: { name: 'Adi' }
  });

  // Update Composition nt-002
  const updated = await prisma.composition.update({
    where: { id: 'nt-002' },
    data: {
      ragaId: raga.id,
      talaId: tala.id
    }
  });

  console.log('✅ Successfully updated raga & tala for:', updated.title);
  console.log('Raga:', raga.name);
  console.log('Tala:', tala.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
