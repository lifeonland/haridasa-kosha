import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Batch adding Gopala Dasaru compositions...');

  const composerId = 'gopala-dasa';
  
  // Ensure default Ankita and Deity exist
  const ankita = await prisma.ankita.upsert({
    where: { name: 'Gopala Vittala' },
    update: {},
    create: { name: 'Gopala Vittala' },
  });

  const deity = await prisma.deity.upsert({
    where: { name: 'Krishna' },
    update: {},
    create: { name: 'Krishna' },
  });

  const compositionTitles = [
    "Karuna kavacha on vijaya dasaru- by sri gopaladasaru", "Daya virali daya Damodara", "Vadhiraja munipa", "baraiyya ba ba Bakutara priya",
    "bharathi bakutiyanu koduvadu", "Ava rogavo enage deva dhanvanthri", "Enna binnapa kelu dhanvantri", "Baruvudella barali", "Hyange maadalayya krushna",
    "parvati palisenna maninirenna", "Rathavanerida raghavendra", "Kaayo shreenaarasimha", "apta matidu nija", "durita varivaha",
    "Eneyaro nimage kumbiniya", "Ninne irulinali", "eke malagihe hariye", "irabeku sajjanarige", "entu tutisali enna",
    "eetaneega namma devanu", "Nadedu barayya", "Summane baruvade mukti", "Karunikayo ragavendra", "Ena bedali ninna balige bandu",
    "Idu Eno charita yantroddhara", "Kamalamukhiye kamalaalaye", "Karava mugida mukhya praana(Gopala dasaru)", "Kaapadale sakalaapadharini", "Komale Ramaadeviye",
    "Ide paalisu ide paalisu", "eke mamathe kottu", "mukya Kaarana vishnu sarvesha", "Nane Bramisideno vishayadi", "Guru vijaya vittala ninna",
    "Mooru namagala darisida", "Devi ambujavalli ramanane", "Bandya vithala badavanalli", "Gajavadana pavana", "Pore enna swamy",
    "Mangalam mangalam", "mangalam mangalam"
  ];

  for (let i = 0; i < compositionTitles.length; i++) {
    const title = compositionTitles[i];
    const id = `gopala-${i + 1}`;
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

  console.log(`✅ ${compositionTitles.length} Gopala Dasaru compositions added successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
