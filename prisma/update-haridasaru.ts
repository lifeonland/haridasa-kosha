import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const haridasaruList = [
  { name: 'Narahari Tirtha', ankita: 'Narahari Raghupathi', period: '13th Century' },
  { name: 'Sripadaraja', ankita: 'Ranga Vittala', period: '1404–1502' },
  { name: 'Vyasatirtha', ankita: 'Krishna', period: '1460–1539' },
  { name: 'Purandara Dasa', ankita: 'Purandara Vittala', period: '1484–1564' },
  { name: 'Kanaka Dasa', ankita: 'Adi Keshava', period: '1509–1609' },
  { name: 'Vadiraja Tirtha', ankita: 'Hayavadana', period: '1480–1600' },
  { name: 'Vijaya Dasa', ankita: 'Vijaya Vittala', period: '1682–1755' },
  { name: 'Gopala Dasa', ankita: 'Gopala Vittala', period: '1722–1762' },
  { name: 'Jagannatha Dasa', ankita: 'Jagannatha Vittala', period: '1728–1809' },
  { name: 'Prasanna Venkata Dasa', ankita: 'Prasanna Venkata Vittala', period: '1680–1752' },
  { name: 'Mohana Dasa', ankita: 'Mohana Vittala', period: '18th Century' },
  { name: 'Pranesha Dasa', ankita: 'Pranesha Vittala', period: '1736–1822' },
  { name: 'Venugopala Dasa', ankita: 'Venugopala Vittala', period: '1728–1751' },
  { name: 'Mahipati Dasa', ankita: 'Mahipati Vittala', period: '18th Century' },
  { name: 'Helavanakatte Giriyamma', ankita: 'Helavanakatte Ranga', period: '18th Century' },
  { name: 'Harapanahalli Bhimavva', ankita: 'Bhimesha Krishna', period: '19th Century' },
  { name: 'Guru Jagannatha Dasa', ankita: 'Guru Jagannatha Vittala', period: '19th Century' },
  { name: 'Srinivasa Dasa', ankita: 'Srinivasa Vittala', period: '18th Century' },
  { name: 'Venkatesha Dasa', ankita: 'Venkatesha Vittala', period: '18th Century' },
  { name: 'Subbanna Dasa', ankita: 'Subbanna Vittala', period: '18th Century' },
  { name: 'Ugabhoga Narayana Dasa', ankita: 'Narayana Vittala', period: '18th Century' },
  { name: 'Madhwapati Dasa', ankita: 'Madhwapati Vittala', period: '18th Century' },
  { name: 'Vishnu Dasa', ankita: 'Vishnu Vittala', period: '18th Century' },
  { name: 'Krishnapriya Dasa', ankita: 'Krishna Vittala', period: '18th Century' },
  { name: 'Raghavendra Dasa', ankita: 'Raghavendra Vittala', period: '18th Century' },
  { name: 'Narahari Dasa', ankita: 'Narahari Vittala', period: '18th Century' },
  { name: 'Govinda Dasa', ankita: 'Govinda Vittala', period: '18th Century' },
  { name: 'Lakshmipati Dasa', ankita: 'Lakshmipati Vittala', period: '18th Century' },
  { name: 'Satyabodha Dasa', ankita: 'Satyabodha Vittala', period: '18th Century' },
];

async function main() {
  console.log('Updating Haridasaru records...');

  for (const dasaru of haridasaruList) {
    // Upsert composer based on name
    await prisma.composer.upsert({
      where: { id: dasaru.name.toLowerCase().replace(/\s+/g, '-') },
      update: {
        timeline: dasaru.period,
        ankita: {
          connectOrCreate: {
            where: { name: dasaru.ankita },
            create: { name: dasaru.ankita },
          },
        },
      },
      create: {
        id: dasaru.name.toLowerCase().replace(/\s+/g, '-'),
        name: dasaru.name,
        timeline: dasaru.period,
        biography: `A prominent Haridasa known for the ankita ${dasaru.ankita}.`,
        ankita: {
          connectOrCreate: {
            where: { name: dasaru.ankita },
            create: { name: dasaru.ankita },
          },
        },
      },
    });
  }

  console.log('✅ Haridasaru records updated!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
