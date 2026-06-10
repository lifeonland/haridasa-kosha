import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Enriching Kanaka Dasa profile with scholarly notes...');

  const enrichedBiography = `A warrior-turned-saint and prominent poet of the Dasa Sahitya tradition, Kanaka Dasa was a contemporary of Purandara Dasa and a dedicated disciple of the great Vyasatirtha. Born into the Kuruba community, he is celebrated not only for his profound devotion but also as a fearless social reformer who challenged the rigid caste hierarchies of his time.

His literary contributions are masterful, characterized by both deep philosophical inquiry and lucid, accessible Kannada. His major works include the Haribhakti Sara, a profound theological text in shatpadi meter, and epic narrative poems like Mohanatarangini and Nalacharitre. By composing in the vernacular, he democratized spiritual knowledge, emphasizing that true devotion transcends social status. He composed his works using the pen name "Kagineleya Adikeshava."`;

  await prisma.composer.update({
    where: { id: 'kanaka-dasa' },
    data: { biography: enrichedBiography },
  });

  console.log('✅ Kanaka Dasa biography enriched successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
