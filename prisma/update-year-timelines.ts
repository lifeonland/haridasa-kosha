import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating composer year timelines...');

  const updates = [
    { id: 'narahari-tirtha', timeline: '1243–1333' },
    { id: 'sripadaraja', timeline: '1404–1502' },
    { id: 'vyasatirtha', timeline: '1460–1539' },
    { id: 'vadiraja-tirtha', timeline: '1480–1600' },
    { id: 'purandara-dasa', timeline: '1484–1564' },
    { id: 'kanaka-dasa', timeline: '1509–1609' },
    { id: 'vijaya-dasa', timeline: '1682–1755' },
    { id: 'gopala-dasa', timeline: '1722–1762' },
    { id: 'jagannatha-dasa', timeline: '1728–1809' },
    { id: 'pranesha-dasa', timeline: '1736–1822' },
    { id: 'venugopala-dasa', timeline: '1728–1751' },
    { id: 'mohana-dasa', timeline: '18th Century' }, // Specific years less certain
    { id: 'srinivasa-dasa', timeline: '18th Century' }, // Specific years less certain
    { id: 'subbanna-dasa', timeline: '18th Century' }, // Specific years less certain
    { id: 'lakshmipati-dasa', timeline: '18th Century' },
    { id: 'madhwapati-dasa', timeline: '18th Century' },
    { id: 'raghavendra-dasa', timeline: '1595–1671' },
    { id: 'satyabodha-dasa', timeline: '1742–1783' },
    { id: 'venkatesha-dasa', timeline: '18th Century' },
    { id: 'narahari-dasa', timeline: '18th Century' },
    { id: 'achyuta-dasa', timeline: '18th Century' },
    { id: 'govinda-dasa', timeline: '18th Century' },
    { id: 'harapanahalli-bhimavva', timeline: '1822–1904' },
    { id: 'helavanakatte-giriyamma', timeline: '18th Century' },
    { id: 'ugabhoga-narayana-dasa', timeline: '18th Century' }
  ];

  for (const update of updates) {
    await prisma.composer.update({
      where: { id: update.id },
      data: { timeline: update.timeline },
    });
  }

  console.log('✅ Composer year timelines updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
