import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating all composer details...');

  const composerData: { [key: string]: { bio: string, timeline: string } } = {
    'achyuta-dasa': { bio: 'A prominent 18th-century Haridasa known for his devotion.', timeline: '18th Century' },
    'gopala-dasa': { bio: 'A major composer of the expansion period, known for deep spiritual insights.', timeline: '1722–1762' },
    'govinda-dasa': { bio: '18th-century composer contributing to the Dasa Sahitya tradition.', timeline: '18th Century' },
    'guru-jagannatha-dasa': { bio: 'A revered 19th-century composer and scholar.', timeline: '1837–1918' },
    'harapanahalli-bhimavva': { bio: 'A celebrated 19th-century devotional poetess.', timeline: '1822–1904' },
    'helavanakatte-giriyamma': { bio: 'An 18th-century poetess known for her intense bhakti.', timeline: '18th Century' },
    'jagannatha-dasa': { bio: 'Renowned scholar and author of Harikathamrutasara.', timeline: '1728–1809' },
    'kanaka-dasa': { bio: 'A great devotee, poet, and social reformer of the 16th century.', timeline: '1509–1609' },
    'krishnapriya-dasa': { bio: 'An 18th-century composer.', timeline: '18th Century' },
    'lakshmipati-dasa': { bio: 'An 18th-century composer.', timeline: '18th Century' },
    'madhwapati-dasa': { bio: 'An 18th-century composer.', timeline: '18th Century' },
    'mahipati-dasa': { bio: 'An 18th-century composer known for folk devotional style.', timeline: '18th Century' },
    'mohana-dasa': { bio: 'An 18th-century composer.', timeline: '18th Century' },
    'narahari-dasa': { bio: 'A late-tradition composer.', timeline: '18th–19th Century' },
    'narahari-tirtha': { bio: 'Progenitor of the Haridasa movement, direct disciple of Madhvacharya.', timeline: '1243–1333' },
    'pranesha-dasa': { bio: '18th-century composer of the expansion period.', timeline: '1736–1822' },
    'prasanna-venkata-dasa': { bio: 'Prominent 18th-century composer.', timeline: '1680–1752' },
    'purandara-dasa': { bio: 'Known as the Pitamaha (grandfather) of Carnatic music.', timeline: '1484–1564' },
    'raghavendra-dasa': { bio: 'A significant saint and philosopher in the Dvaita tradition.', timeline: '1595–1671' },
    'satyabodha-dasa': { bio: 'A renowned guru and saint.', timeline: '1742–1783' },
    'srinivasa-dasa': { bio: '18th-century composer.', timeline: '18th Century' },
    'sripadaraja': { bio: 'Founder of the Haridasa movement and Rajaguru of Vijayanagara.', timeline: '1404–1502' },
    'subbanna-dasa': { bio: '18th-century composer.', timeline: '18th Century' },
    'ugabhoga-narayana-dasa': { bio: 'Known for folk devotional compositions.', timeline: '18th–19th Century' },
    'vadiraja-tirtha': { bio: 'Prolific saint-composer and scholar.', timeline: '1480–1600' },
    'venkatesha-dasa': { bio: '18th-century composer.', timeline: '18th Century' },
    'venugopala-dasa': { bio: '18th-century composer.', timeline: '1728–1751' },
    'vijaya-dasa': { bio: 'A major composer of the expansion period.', timeline: '1682–1755' },
    'vishnu-dasa': { bio: 'An 18th-century composer.', timeline: '18th Century' },
    'vyasatirtha': { bio: 'Philosopher, scholar, and Rajaguru of Vijayanagara.', timeline: '1460–1539' }
  };

  for (const [id, data] of Object.entries(composerData)) {
    await prisma.composer.update({
      where: { id: id },
      data: { 
        biography: data.bio,
        timeline: data.timeline 
      },
    });
  }

  console.log('✅ All composer details updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
