import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Batch adding Jagannatha Dasaru compositions...');

  const composerId = 'jagannatha-dasaru';
  
  // Create or fetch Ankita
  let ankita = await prisma.ankita.findFirst({ where: { name: 'Jagannatha Vittala' } });
  if (!ankita) {
    ankita = await prisma.ankita.create({ data: { name: 'Jagannatha Vittala' } });
  }

  // Create or fetch Composer
  let composer = await prisma.composer.findFirst({ where: { id: composerId } });
  if (!composer) {
    composer = await prisma.composer.create({
      data: {
        id: composerId,
        name: 'Jagannatha Dasaru',
        biography: 'Jagannatha Dasaru (1728–1809) was a renowned Haridasa saint-composer, famous for his monumental work "Harikathamruta Saara".',
        ankitaId: ankita.id,
        timeline: '1728–1809',
      },
    });
  }

  // Create or fetch Deity (using a default/common one if not specified for each)
  let deity = await prisma.deity.findFirst({ where: { name: 'Vittala' } });
  if (!deity) {
    deity = await prisma.deity.create({ data: { name: 'Vittala' } });
  }

  const compositions = [
    "Krushnanna nodirai",
    "Neela lohitha",
    "Namo namaste narasimha deva",
    "Narasimha pahi Lakshmi",
    "Siri Ramana tava charana",
    "Roga Harane krupa",
    "Vithalayya vithalayya",
    "Apamrutyu parihariso yatarava nanayya",
    "Avakarana mogava idu ninage dharmave",
    "Dhanyanade vithalana kandu atisobisutide sripatiya",
    "Prana deva ninallade",
    "Balu ramyavagide",
    "Rama manoharane",
    "Ranga ninna kondaduva",
    "Vandhipe namma muddu saaradhe",
    "Madhwaantargata vedavyaasaa",
    "Rukmani vilasa",
    "Vaadiraaja guru nee daya",
    "Vadiraja asmadguru vadiraja",
    "Vadiraja prativadi gajendra dha",
    "Vandhisuve guru raghavendra raayara",
    "Namo namo sri ragavendra",
    "Surapanalayadante mantralaya",
    "Sri raghavendra nimma",
    "Raghavendra yati sarva bauma",
    "Namisi beduve",
    "Pondi badukiro karunigalolagene kaneno",
    "Dayamaade dayamaade taaye vaakdevee",
    "Baaro raghavendra baaro",
    "Dasoham tava dasoham shriniketana palayamam kruta krutyanadenindina",
    "Vrundavanagaliga namisi",
    "Gopala dasa raaya ninnaya pada",
    "Aparadhavenisadale kayabeku",
    "Binyaipe ninaganu bimasena",
    "Dasaraaya purandara dasaraaya",
    "Kichakantaka bimasenaraya",
    "Jayaraaya Jayaraaya",
    "Dasara pada on Sri vyasathathvagna thirtharu",
    "Dasara pada on Sri Vasudhindra thirtharu",
    "Dasara pada on Sri Sathyasandha thirtharu",
    "Dasara pada on Sri sathya vara theertharu",
    "Shobhanaevnnire sarvagna harige aa namipe guru santathige satata",
    "Smarisu guru santatiyanu manavE"
  ];

  for (let i = 0; i < compositions.length; i++) {
    const title = compositions[i];
    const id = `jagannatha-${i + 1}`;
    await prisma.composition.upsert({
      where: { id: id },
      update: {
        title: title,
        firstLine: title,
        composerId: composer.id,
        ankitaId: ankita.id,
      },
      create: {
        id: id,
        title: title,
        firstLine: title,
        lyrics: title, // Placeholder
        composerId: composer.id,
        ankitaId: ankita.id,
        deityId: deity.id,
      },
    });
  }

  console.log(`✅ ${compositions.length} Jagannatha Dasaru compositions added/updated successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
