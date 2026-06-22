import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const composers = [
  { id: 'purandara-dasa', name: 'Purandara Dasaru', timeline: '1484–1564' },
  { id: 'kanaka-dasa', name: 'Kanaka Dasaru', timeline: '1509–1609' },
  { id: 'vijaya-dasa', name: 'Vijaya Dasaru', timeline: '1682–1755' },
  { id: 'gopala-dasa', name: 'Gopala Dasaru', timeline: '1722–1762' },
  { id: 'jagannatha-dasa', name: 'Jagannatha Dasaru', timeline: '1728–1809' },
  { id: 'sripadaraja', name: 'Sripadarajaru', timeline: '1404–1502' },
  { id: 'vyasatirtha', name: 'Vyasatirtha', timeline: '1460–1539' },
  { id: 'vadiraja-tirtha', name: 'Vadiraja Tirtharu', timeline: '1480–1600' },
  { id: 'narahari-tirtha', name: 'Narahari Tirtharu', timeline: '1243–1333' },
  { id: 'pranesha-dasa', name: 'Pranesha Dasaru', timeline: '18th Century' },
  { id: 'mahipati-dasa', name: 'Mahipati Dasaru', timeline: '1611–1681' },
  { id: 'harapanahalli-bhimavva', name: 'Harapanahalli Bhimavva', timeline: '1822–1928' },
  { id: 'helavanakatte-giriyamma', name: 'Helavanakatte Giriyamma', timeline: '18th Century' },
  { id: 'subbanna-dasa', name: 'Subbanna Dasaru', timeline: '18th Century' },
  { id: 'prasanna-venkata-dasa', name: 'Prasanna Venkata Dasaru', timeline: '1780–1850' },
  { id: 'madhwapati-dasa', name: 'Madhwapati Dasaru', timeline: '18th Century' },
  { id: 'satyabodha-dasa', name: 'Satyabodha Dasaru', timeline: '18th Century' },
  { id: 'krishnapriya-dasa', name: 'Krishnapriya Dasaru', timeline: '19th Century' },
  { id: 'vishnu-dasa', name: 'Vishnu Dasaru', timeline: '18th Century' },
  { id: 'srinivasa-dasa', name: 'Srinivasa Dasaru', timeline: '18th Century' },
  { id: 'mohana-dasa', name: 'Mohana Dasaru', timeline: '18th Century' },
  { id: 'venkatesha-dasa', name: 'Venkatesha Dasaru', timeline: '18th Century' },
  { id: 'govinda-dasa', name: 'Govinda Dasaru', timeline: '18th Century' },
  { id: 'lakshmipati-dasa', name: 'Lakshmipati Dasaru', timeline: '18th Century' },
  { id: 'venugopala-dasa', name: 'Venugopala Dasaru', timeline: '18th Century' },
  { id: 'ugabhoga-narayana-dasa', name: 'Ugabhoga Narayana Dasaru', timeline: '18th Century' },
  { id: 'narahari-dasa', name: 'Narahari Dasaru', timeline: '18th Century' },
  { id: 'guru-jagannatha-dasa', name: 'Guru Jagannatha Dasaru', timeline: '18th Century' },
  { id: 'raghavendra-dasa', name: 'Raghavendra Tirtharu', timeline: '1595–1671' }
];

async function main() {
  console.log('Starting master composer seeding...');
  
  // Ensure default ankita exists
  const defaultAnkita = await prisma.ankita.upsert({
    where: { name: 'Purandara Vittala' },
    update: {},
    create: { name: 'Purandara Vittala' },
  });

  for (const composer of composers) {
    await prisma.composer.upsert({
      where: { id: composer.id },
      update: { name: composer.name, timeline: composer.timeline },
      create: {
        id: composer.id,
        name: composer.name,
        timeline: composer.timeline,
        ankitaId: defaultAnkita.id,
        biography: 'A revered Haridasa.'
      },
    });
    console.log(`Upserted: ${composer.name}`);
  }
  console.log('✅ All composers seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
