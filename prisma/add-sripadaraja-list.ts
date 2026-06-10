import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Batch adding missing Sripadarajaru compositions from list...');

  const composerId = 'sripadaraja';
  
  // Ensure default Ankita and Deity exist
  const ankita = await prisma.ankita.upsert({
    where: { name: 'Ranga Vittala' },
    update: {},
    create: { name: 'Ranga Vittala' },
  });

  const deity = await prisma.deity.upsert({
    where: { name: 'Krishna' },
    update: {},
    create: { name: 'Krishna' },
  });

  const compositionTitles = [
    "Kangalidyatako",
    "Kaaveri rangana nodada",
    "Kombu kolalanudutta",
    "Gollathiyarella koodi",
    "Ikko node ranganathana",
    "Maratheyeno ranga",
    "Marudamsara mata vamana charithre/vamana huttu",
    "Akatakata samsaaravanu",
    "Bhaaro namma manege gopala Krishna",
    "Hare venkata shaila ithaange iruvenu",
    "Idanaadaru dayapaalisadire",
    "Yakke intha duduku",
    "Vyarthavallave janma",
    "Vrushabanerida vishadharanyare",
    "Vaishnavane nambiri",
    "Paadava toro nanada nandana",
    "Paahi nalidaade enna naalige",
    "Modalondipe ninage",
    "Laali Govinda laali"
  ];

  for (let i = 0; i < compositionTitles.length; i++) {
    const title = compositionTitles[i];
    const id = `sr-new-${i + 1}`;
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

  console.log(`✅ ${compositionTitles.length} additional Sripadarajaru compositions added successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
