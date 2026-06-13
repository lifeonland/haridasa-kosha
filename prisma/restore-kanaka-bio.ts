import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const biography = `Kanaka Dasa (1509–1609) was a renowned 16th-century saint, poet, philosopher, and musician from Karnataka, India. Born as Thimmappa Nayaka, he was a chieftain and warrior before a near-death experience led him to renounce his military life and dedicate himself to the path of devotion (Bhakti) under the guidance of his guru, Vyasaraja. He is a pivotal figure in the Haridasa movement, known for his fierce criticism of the caste system and his advocacy for social equality through his profound Kannada poetry. He is also famous for the legend of "Kanakana Kindi" at the Udupi Sri Krishna Temple. His major literary works include Ramadhanya Charite, Mohana Tarangini, Nala Charitre, and Haribhakti Sara, all bearing his signature ankita 'Kaginele Adhikeshava'.`;

  // Restore composer biography
  const updated = await prisma.composer.update({
    where: { id: 'kanaka-dasa' },
    data: { 
      biography: biography
    }
  });

  console.log('Successfully restored biography for:', updated.name);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
