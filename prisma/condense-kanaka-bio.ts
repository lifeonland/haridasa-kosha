import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Condensing Kanaka Dasa biography...');

  const condensedBiography = `A warrior-turned-saint and a foremost poet of the Dasa Sahitya tradition, Kanaka Dasa was a dedicated disciple of Vyasatirtha. He is celebrated for his profound devotion and as a fearless social reformer who challenged caste hierarchies. His works, including Haribhakti Sara and Mohanatarangini, democratized spiritual knowledge by composing in lucid Kannada. He composed under the pen name "Kagineleya Adikeshava."`;

  await prisma.composer.update({
    where: { id: 'kanaka-dasa' },
    data: { biography: condensedBiography },
  });

  console.log('✅ Kanaka Dasa biography condensed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
