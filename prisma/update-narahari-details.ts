import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Narahari Tirtharu details...');

  await prisma.composer.update({
    where: { id: 'narahari-tirtha' },
    data: { 
      imageUrl: '/assets/webp/narahari.webp',
      biography: 'Sri Narahari Tirtha (c. 1243 – c. 1333) was a prominent scholar and the second direct disciple of Sri Madhvacharya. He is considered the progenitor of the Haridasa movement. Before taking sanyasa, he served as a regent for the Kalinga Kingdom. He is famously credited with bringing the sacred idols of Moola Rama and Sita from the Kalinga treasury to Sri Madhvacharya. His Kannada compositions are considered the earliest examples of Haridasa Sahitya.',
      timeline: '1243–1333'
    },
  });

  console.log('✅ Narahari Tirtharu updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
