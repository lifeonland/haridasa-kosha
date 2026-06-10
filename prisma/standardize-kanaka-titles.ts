import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

async function main() {
  console.log('Standardizing Kanaka Dasa composition titles...');

  const kanakaCompositions = await prisma.composition.findMany({
    where: { composerId: 'kanaka-dasa' },
  });

  for (const comp of kanakaCompositions) {
    // Keep the type tag, but format the rest
    const match = comp.title.match(/(\[(.*?)\])?\s*(.*)/);
    const tag = match && match[1] ? match[1] : '';
    const name = match ? match[3] : comp.title;

    const newTitle = tag ? `${tag} ${toTitleCase(name)}` : toTitleCase(name);

    if (newTitle !== comp.title) {
      await prisma.composition.update({
        where: { id: comp.id },
        data: { title: newTitle },
      });
    }
  }

  console.log('✅ Kanaka Dasa composition titles standardized!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
