import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const comp = await prisma.composition.findUnique({
    where: { id: 'kanaka-list-24' },
    include: { translations: true },
  });
  
  if (comp) {
    console.log('Translations for kanaka-list-24:', JSON.stringify(comp.translations, null, 2));
  } else {
    console.log('Composition not found');
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
