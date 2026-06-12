import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Comprehensive Ankita mapping based on tradition
const ankitaMap: { [key: string]: string } = {
  'venkatesha-dasa': 'Venkatesha Vittala',
  'achyuta-dasa': 'Achyuta Vittala',
  'narahari-dasa': 'Narahari Vittala',
  'krishnapriya-dasa': 'Krishnapriya Vittala',
  'srinivasa-dasa': 'Srinivasa Vittala',
  'harapanahalli-bhimavva': 'Saraswati Vittala',
  'lakshmipati-dasa': 'Lakshmipati Vittala',
  'madhwapati-dasa': 'Madhwapati Vittala',
  'mohana-dasa': 'Mohana Vittala',
  'satyabodha-dasa': 'Satyabodha Vittala',
  'subbanna-dasa': 'Subbanna Vittala',
  'ugabhoga-narayana-dasa': 'Narayana Vittala',
  'venugopala-dasa': 'Venugopala Vittala',
  'vishnu-dasa': 'Vishnu Vittala',
};

async function main() {
  console.log('Fixing remaining Ankita mappings...');
  
  for (const [composerId, ankitaName] of Object.entries(ankitaMap)) {
    // Ensure Ankita exists
    const ankita = await prisma.ankita.upsert({
      where: { name: ankitaName },
      update: {},
      create: { name: ankitaName },
    });

    await prisma.composer.update({
      where: { id: composerId },
      data: { ankitaId: ankita.id },
    });
    console.log(`Updated ${composerId} -> ${ankitaName}`);
  }

  console.log('✅ Remaining Ankita mappings fixed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
