import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding lyrics and translation for Kanaka Dasa compositions...');

  const compositions = [
    {
      id: 'kanaka-1',
      title: 'Nala Charitre',
      lyrics: 'Nala Charitre... [Historical narrative work by Kanaka Dasa]',
      translation: 'Nala Charitre retells the ancient epic story of King Nala and Damayanti. It highlights the power of fate, the trials of righteousness (Dharma), and the ultimate victory of virtue through devotion to the Lord.',
    },
    {
      id: 'kanaka-2',
      title: 'Hari Bhakti Sara',
      lyrics: 'Hari Bhakti Sara... [Shatpadi composition, 101+ stanzas]\n\n"Just as the learned ones bring up a young parrot, teach it and pleasingly listen to its gentle words, O Lord, kindly instruct me so that my tongue utters your string of names, and protect me forever."',
      translation: 'Hari Bhakti Sara is a celebrated devotional masterpiece, traditionally believed to have been composed outside the Udupi temple. It extols the glory of Lord Hari (Vishnu), emphasizing that true devotion transcends caste and social status.',
    },
    {
      id: 'kanaka-3',
      title: 'Nrisimhastava',
      lyrics: 'Nrisimhastava... [Stotra in praise of Lord Narasimha]',
      translation: 'Nrisimhastava is a powerful stotra (hymn) dedicated to Lord Narasimha, the fierce man-lion avatar of Vishnu. It invokes his protective grace and extols his power to destroy internal and external obstacles.',
    },
    {
      id: 'kanaka-4',
      title: 'Rama Dhanya Charitre',
      lyrics: 'Rama Dhanya Charitre... [Narrative work using Ragi as a metaphor]',
      translation: 'Rama Dhanya Charitre is a unique narrative poem where Kanaka Dasa uses the metaphor of "Ragi" (finger millet) as a superior grain favored by Rama to teach a profound moral lesson: that true worth lies in humility, not in outward splendor or social status.',
    },
    {
      id: 'kanaka-5',
      title: 'Mohana Tarangini',
      lyrics: 'Mohana Tarangini... [Epic narrative]',
      translation: 'Mohana Tarangini is a major epic poem detailing the life of Lord Krishna. It is highly regarded for its lyrical beauty, vivid descriptions, and its ability to weave complex philosophical themes into an engaging narrative format.',
    },
  ];

  for (const comp of compositions) {
    // Update lyrics
    await prisma.composition.update({
      where: { id: comp.id },
      data: { lyrics: comp.lyrics },
    });

    // Create translation
    await prisma.translation.create({
      data: {
        compositionId: comp.id,
        english: comp.translation,
        kannadaMeaning: '-',
        wordByWord: '-',
      },
    });
  }

  console.log('✅ Top 5 Kanaka Dasa compositions enriched successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
