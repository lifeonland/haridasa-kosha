import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating composer historical data...');

  const updates = [
    { id: 'narahari-tirtha', timeline: '13th Century', bio: 'Category: Foundation influence' },
    { id: 'sripadaraja', timeline: '15th Century', bio: 'Category: Guru / founder' },
    { id: 'vyasatirtha', timeline: '15th–16th Century', bio: 'Category: Philosopher / patron' },
    { id: 'vadiraja-tirtha', timeline: '16th Century', bio: 'Category: Saint composer' },
    { id: 'purandara-dasa', timeline: '16th Century', bio: 'Category: Composer' },
    { id: 'kanaka-dasa', timeline: '16th Century', bio: 'Category: Composer / reformer' },
    { id: 'vijaya-dasa', timeline: '17th–18th Century', bio: 'Category: Composer' },
    { id: 'gopala-dasa', timeline: '17th–18th Century', bio: 'Category: Composer' },
    { id: 'jagannatha-dasa', timeline: '18th Century', bio: 'Category: Scholar / composer' },
    { id: 'pranesha-dasa', timeline: '18th Century', bio: 'Category: Composer' },
    { id: 'venugopala-dasa', timeline: '18th Century', bio: 'Category: Composer' },
    { id: 'mohana-dasa', timeline: '18th Century', bio: 'Category: Composer' },
    { id: 'srinivasa-dasa', timeline: '18th Century', bio: 'Category: Composer' },
    { id: 'subbanna-dasa', timeline: '18th Century', bio: 'Category: Composer' },
    { id: 'lakshmipati-dasa', timeline: '18th Century', bio: 'Category: Composer' },
    { id: 'madhwapati-dasa', timeline: '18th Century', bio: 'Category: Composer' },
    { id: 'raghavendra-dasa', timeline: '17th–18th Century', bio: 'Category: Guru / saint' },
    { id: 'satyabodha-dasa', timeline: '18th Century', bio: 'Category: Guru' },
    { id: 'venkatesha-dasa', timeline: '18th Century', bio: 'Category: Composer' },
    { id: 'narahari-dasa', timeline: '18th–19th Century', bio: 'Category: Composer' },
    { id: 'achyuta-dasa', timeline: '18th–19th Century', bio: 'Category: Composer' },
    { id: 'govinda-dasa', timeline: '18th–19th Century', bio: 'Category: Composer' },
    { id: 'harapanahalli-bhimavva', timeline: '19th Century', bio: 'Category: Devotional poetess' },
    { id: 'helavanakatte-giriyamma', timeline: '19th Century', bio: 'Category: Devotional poetess' },
    { id: 'ugabhoga-narayana-dasa', timeline: '18th–19th Century', bio: 'Category: Folk devotional' }
  ];

  for (const update of updates) {
    await prisma.composer.update({
      where: { id: update.id },
      data: { 
        timeline: update.timeline,
        biography: update.bio 
      },
    });
  }

  console.log('✅ Composer historical data updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
