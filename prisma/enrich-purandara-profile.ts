import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Enriching Purandara Dasaru profile with scholarly notes...');

  const enrichedBiography = `Born Srinivasa Nayaka, he was a wealthy merchant who renounced his riches to become a wandering saint. Revered as the Pitamaha (Father) of Carnatic music, he systematized music education (creating the Sarali Varisai, janTai varisai, and Geetams), specifically choosing the MaayamaaLavagowLa raga for its pedagogical utility. 

He composed thousands of Devaranamas under the pen name "Purandara Vittala," making philosophy accessible to the masses by composing in lucid Kannada. He identified and codified 84 ragas, many of which remain cornerstones of the tradition. His works serve as a vital bridge between Vedic philosophy and popular devotion, often featuring poetic fervor, logical depth, and social satire.`;

  await prisma.composer.update({
    where: { id: 'purandara-dasa' },
    data: { biography: enrichedBiography },
  });

  console.log('✅ Purandara Dasaru biography enriched successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
