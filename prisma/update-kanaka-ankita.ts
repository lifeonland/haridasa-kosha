import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find or create the correct Ankita
  const ankita = await prisma.ankita.upsert({
    where: { id: 'cmq-kaginele-adikesava' }, // Use a logical ID or existing one
    update: { name: 'Kaginele Adikeshava' },
    create: { 
      id: 'cmq-kaginele-adikesava',
      name: 'Kaginele Adikeshava' 
    }
  });

  // Update Kanaka Dasa's AnkitaId
  const updatedComposer = await prisma.composer.update({
    where: { id: 'kanaka-dasa' },
    data: { 
      ankitaId: ankita.id
    }
  });

  console.log('Successfully updated Ankita for:', updatedComposer.name);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
