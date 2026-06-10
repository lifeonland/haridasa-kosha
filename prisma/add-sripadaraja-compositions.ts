import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding Sripadarajaru compositions...');

  const composerId = 'sripadaraja';

  // Ensure Ankita exists (Sripadarajaru's ankita is typically "Ranga Vittala")
  const ankita = await prisma.ankita.upsert({
    where: { name: 'Ranga Vittala' },
    update: {},
    create: { name: 'Ranga Vittala' },
  });

  const compositions = [
    "Uttamara Sangha Yengittu Salaho",
    "Enu Brame Manujarige",
    "Chittajanayyana Chintisu Manave",
    "Jo Jo Jo Jo Jo Rangadhama",
    "Palolagaddu Nirlolage Addu Hari",
    "Bhakti Beku Virakti Beku",
    "Na Ninegenu Beduvudilla",
    "Sarasijanabhane Seragoddi Beduve",
    "Jayamangalam Nitya Shubha Mangalam",
    "Madhwanama",
    "Ada Pogona Baaro Ranga",
    "Nandanandana Pahi Gunavrunda",
    "Naninnolanyava Beduvudilla",
    "Ranga Manege Baro",
    "Saddu Maadalu",
    "Sarasijaksha Sarasadinda",
    "Yalladi Bandyo",
    "Naane Sajjananadode",
    "Bhushanake Bhooshana",
    "Baro Manege Govinda",
    "Ekko Node Ranghanathana Chikka Paadava",
    "Kangalidyatako Kaveri Rangana Nodada",
    "Mosa Hodenalla Sakalavu Vasudeva Balla",
    "Sri Rangavittalana Makutake Sharanu",
    "Yalladi Bandeyo Ni Hellayya",
    "Dayamadi Salahayya",
    "Kombu Kolalanudutta Nambisi Podanavva",
    "Popu Hogona Baro Ranga",
    "Yalladi Bande Muddu Rangayya",
    "Vrushabhaerida Vishadhari",
    "Ennivanu Ega Baralidake",
    "Ediradavanu Ninagee Dhareyolu",
    "Oodo Manamohana",
    "Sashira Jihveulla",
    "Kaala Beladingalu",
    "Sri Lakshmi Narasimha Pradurbhava Dandaka"
  ];

  // Ensure a default deity exists
  const deity = await prisma.deity.upsert({
    where: { name: 'Unknown' },
    update: {},
    create: { name: 'Unknown' },
  });

  for (let i = 0; i < compositions.length; i++) {
    const title = compositions[i];
    await prisma.composition.upsert({
      where: { id: `sr-${i + 1}` },
      update: {
        title: title,
        firstLine: title,
        composerId: composerId,
        ankitaId: ankita.id,
      },
      create: {
        id: `sr-${i + 1}`,
        title: title,
        firstLine: title,
        lyrics: title, // Adding placeholder lyrics
        composerId: composerId,
        ankitaId: ankita.id,
        deityId: deity.id, // Adding required deityId
      },
    });
  }

  console.log('✅ 36 Sripadarajaru compositions added/updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
