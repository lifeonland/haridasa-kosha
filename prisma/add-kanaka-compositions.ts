import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding Kanaka Dasa compositions...');

  const composerId = 'kanaka-dasa';
  
  // Ensure default Ankita and Deity exist
  const ankita = await prisma.ankita.upsert({
    where: { name: 'Kagineleya Adikeshava' },
    update: {},
    create: { name: 'Kagineleya Adikeshava' },
  });

  const deity = await prisma.deity.upsert({
    where: { name: 'Krishna' },
    update: {},
    create: { name: 'Krishna' },
  });

  const compositions = [
    "Nala Charitre", "Hari Bhakti Sara", "Nrisimhastava", "Rama Dhanya Charitre", "Mohana Tarangini",
    "Bantanaagi Baagila Kaayuve", "Dasa Daasara Maneya Daasaanu Daasa", "Ellaaru Maaduvudu Hottegaagi", 
    "Tallaanisadiru", "Baaro Namma Manetanaka", "Shiva Shiva Shiva Enniro", "Rama Namave Nene Manave", 
    "Nammamma Sharade", "Enu Illada Eradu Dina Samsaara", "Satyavanthara Sanghaviralu Theerthavetake", 
    "Bombeyaatava Naadisida", "Tanu Ninnadu Jeevana Ninnadu"
  ];

  for (let i = 0; i < compositions.length; i++) {
    const title = compositions[i];
    const id = `kanaka-${i + 1}`;
    await prisma.composition.upsert({
      where: { id: id },
      update: {
        title: title,
        firstLine: title,
        composerId: composerId,
        ankitaId: ankita.id,
      },
      create: {
        id: id,
        title: title,
        firstLine: title,
        lyrics: title, // Placeholder
        composerId: composerId,
        ankitaId: ankita.id,
        deityId: deity.id,
      },
    });
  }

  console.log(`✅ ${compositions.length} Kanaka Dasa compositions added successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
