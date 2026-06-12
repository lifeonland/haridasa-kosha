import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding Sri Madhwacharya to the database...');

  // 1. Ensure Ankita exists
  const ankita = await prisma.ankita.upsert({
    where: { name: 'Sri Krishna' },
    update: {},
    create: { name: 'Sri Krishna' },
  });

  // 2. Add Madhwacharya
  await prisma.composer.upsert({
    where: { id: 'madhwacharya' },
    update: {
      name: 'Sri Madhwacharya',
      imageUrl: 'https://i.pinimg.com/736x/de/a6/6e/dea66e53fb4c928547dc05c38ccedeac.jpg',
      biography: 'madhwacharyaBio',
      timeline: '1238–1317',
      ankitaId: ankita.id
    },
    create: {
      id: 'madhwacharya',
      name: 'Sri Madhwacharya',
      imageUrl: 'https://i.pinimg.com/736x/de/a6/6e/dea66e53fb4c928547dc05c38ccedeac.jpg',
      biography: 'madhwacharyaBio',
      timeline: '1238–1317',
      ankitaId: ankita.id
    },
  });

  console.log('✅ Sri Madhwacharya added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
