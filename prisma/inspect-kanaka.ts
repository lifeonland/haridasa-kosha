import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const kanaka = await prisma.composer.findUnique({
    where: { id: 'kanaka-dasa' },
    include: { compositions: true },
  });
  
  if (kanaka) {
    console.log(JSON.stringify(kanaka.compositions.slice(0, 5), null, 2));
  } else {
    console.log('Composer kanaka-dasa not found');
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
