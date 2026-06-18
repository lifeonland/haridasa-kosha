import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ankitaMap: { [key: string]: string } = {
  'purandara-dasa': 'Purandara Vittala',
  'kanaka-dasa': 'Bagila Vittala',
  'vijaya-dasa': 'Vijaya Vittala',
  'gopala-dasa': 'Gopala Vittala',
  'jagannatha-dasa': 'Jagannatha Vittala',
  'sripadaraja': 'Ranga Vittala',
  'vyasatirtha': 'Vyasa Vittala',
  'pranesha-dasa': 'Pranesha Vittala',
  'helavanakatte-giriyamma': 'Giriyamma Vittala',
  'vadiraja-tirtha': 'Hayavadana',
  'narahari-tirtha': 'Narahari Vittala',
  'mahipati-dasa': 'Mahipati Vittala',
  'raghavendra-dasa': 'Raghavendra',
  // ... other mappings would follow
};

async function main() {
  console.log('Fixing Ankita mappings...');
  
  for (const [composerId, ankitaName] of Object.entries(ankitaMap)) {
    // Ensure Ankita exists
    const ankita = await prisma.ankita.upsert({
      where: { name: ankitaName },
      update: {},
      create: { name: ankitaName },
    });

    await prisma.composer.update({
      where: { id: composerId },
      data: { ankitaId: ankita.id },
    });
    console.log(`Updated ${composerId} -> ${ankitaName}`);
  }

  console.log('✅ Ankita mappings fixed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
