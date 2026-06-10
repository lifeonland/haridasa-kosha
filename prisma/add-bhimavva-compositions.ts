import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding Harapanahalli Bhimavva compositions...');

  const composerId = 'harapanahalli-bhimavva';
  
  // Ensure default Ankita and Deity exist
  const ankita = await prisma.ankita.upsert({
    where: { name: 'Bhimesha Krishna' },
    update: {},
    create: { name: 'Bhimesha Krishna' },
  });

  const deity = await prisma.deity.upsert({
    where: { name: 'Krishna' },
    update: {},
    create: { name: 'Krishna' },
  });

  const compositions = [
    { title: '[Padagalu] Lali Rakkasavairi', id: 'hb-1' },
    { title: '[Padagalu] Nadedu Barayya Krishna', id: 'hb-2' },
    { title: '[Padagalu] Kandu Dhanyanade Nanda', id: 'hb-3' },
    { title: '[Padagalu] Mareyade Salahennanu', id: 'hb-4' },
    { title: '[Padagalu] Entha Mahima Balavanta', id: 'hb-5' },
    { title: '[Padagalu] Smarisi Badukiro Sarvananda', id: 'hb-6' },
    { title: '[Padagalu] Nanda Nandane Aravinda', id: 'hb-7' },
    { title: '[Padagalu] Nodiri Raghavendrara', id: 'hb-8' },
    { title: '[Padagalu] Gange Bhageerathi', id: 'hb-9' },
    { title: '[Padagalu] Devi Ninnaya Mudi', id: 'hb-10' },
    { title: '[Padagalu] Gajamukha Ganapatige', id: 'hb-11' },
    { title: '[Padagalu] Arogane Maadamma Mangala Gowri', id: 'hb-12' },
    { title: '[Aarati song] Arutiya Belaga Bannire', id: 'hb-13' },
    { title: '[Aarati song] Hoova Mudisire', id: 'hb-14' },
    { title: '[Padagalu] Baare Draupadi', id: 'hb-15' },
    { title: '[Suladi] Dashavatara Suladi', id: 'hb-16' },
    { title: '[Narrative work] Venkatesha Mahatme', id: 'hb-17' },
    { title: '[Narrative] Sakuntala Charitre', id: 'hb-18' },
    { title: '[Narrative] Nala Charitre', id: 'hb-19' },
    { title: '[Stotra collection] Stutimani Malike', id: 'hb-20' }
  ];

  for (const comp of compositions) {
    await prisma.composition.upsert({
      where: { id: comp.id },
      update: {
        title: comp.title,
        firstLine: comp.title,
        composerId: composerId,
        ankitaId: ankita.id,
      },
      create: {
        id: comp.id,
        title: comp.title,
        firstLine: comp.title,
        lyrics: comp.title, // Placeholder
        composerId: composerId,
        ankitaId: ankita.id,
        deityId: deity.id,
      },
    });
  }

  console.log('✅ 20 Harapanahalli Bhimavva compositions added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
