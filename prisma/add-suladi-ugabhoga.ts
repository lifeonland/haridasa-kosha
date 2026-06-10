import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding Suladi and Ugabhoga compositions...');

  const composerId = 'sripadaraja';
  const ankita = await prisma.ankita.findFirst({ where: { name: 'Ranga Vittala' } });
  const deity = await prisma.deity.findFirst({ where: { name: 'Unknown' } });

  if (!ankita || !deity) {
    throw new Error('Ankita or Deity not found');
  }

  const compositions = [
    { title: '[Suladi] Anatakalakalli Ninna Nannu Ariyade', id: 'suladi-1' },
    { title: '[Suladi] E Vanadegalu', id: 'suladi-2' },
    { title: '[Suladi] Ninnadhena Shareera Karana Chestegala', id: 'suladi-3' },
    { title: '[Ugabhoga] Dhyanavu Krutayugadi', id: 'ugabhoga-1' }
  ];

  for (const comp of compositions) {
    await prisma.composition.upsert({
      where: { id: comp.id },
      update: {
        title: comp.title,
        firstLine: comp.title,
        composerId: composerId,
        ankitaId: ankita.id,
      },
      create: {
        id: comp.id,
        title: comp.title,
        firstLine: comp.title,
        lyrics: comp.title, // Placeholder lyrics
        composerId: composerId,
        ankitaId: ankita.id,
        deityId: deity.id,
      },
    });
  }

  console.log('✅ Suladi and Ugabhoga compositions added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
