import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding Narahari Tirtharu compositions...');

  const composerId = 'narahari-tirtha';

  // Ensure Deities exist
  const rama = await prisma.deity.upsert({
    where: { name: 'Rama' },
    update: {},
    create: { name: 'Rama' },
  });

  const krishna = await prisma.deity.upsert({
    where: { name: 'Krishna' },
    update: {},
    create: { name: 'Krishna' },
  });

  // Ensure Ankitas exist
  const ankitaNarahari = await prisma.ankita.upsert({
    where: { name: 'Narahari' },
    update: {},
    create: { name: 'Narahari' },
  });

  const ankitaRaghupathi = await prisma.ankita.upsert({
    where: { name: 'Narahari Raghupathi' },
    update: {},
    create: { name: 'Narahari Raghupathi' },
  });

  const ankitaGopala = await prisma.ankita.upsert({
    where: { name: 'Narahari Dayarada Gopala' },
    update: {},
    create: { name: 'Narahari Dayarada Gopala' },
  });

  const ankitaRaghukulatilaka = await prisma.ankita.upsert({
    where: { name: 'Raghukulatilaka' },
    update: {},
    create: { name: 'Raghukulatilaka' },
  });

  const compositions = [
    {
      id: 'nt-001',
      title: 'Entu Marulade Naa Nentu Marulade',
      firstLine: 'Entu marulade naa nentu marulade',
      lyrics: 'Entu marulade naa nentu marulade...\nOne of the best-known surviving compositions of Narahari Tirtha.',
      composerId: composerId,
      deityId: rama.id,
      ankitaId: ankitaRaghukulatilaka.id,
    },
    {
      id: 'nt-002',
      title: 'Hariye Idu Sariye',
      firstLine: 'Hariye idu sariye',
      lyrics: 'Hariye idu sariye...\nUniversally accepted by scholars as an authentic composition.',
      composerId: composerId,
      deityId: rama.id,
      ankitaId: ankitaRaghupathi.id,
    },
  ];

  for (const comp of compositions) {
    await prisma.composition.upsert({
      where: { id: comp.id },
      update: comp,
      create: comp,
    });
  }

  console.log('✅ 2 Narahari Tirtharu compositions added/updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
