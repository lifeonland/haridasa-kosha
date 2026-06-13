import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find or create Raga and Tala
  const raga = await prisma.raga.upsert({
    where: { name: 'Mukhari' },
    update: {},
    create: { name: 'Mukhari' }
  });
  
  const tala = await prisma.tala.upsert({
    where: { name: 'Adi' },
    update: {},
    create: { name: 'Adi' }
  });

  const englishTranslation = `If it is true, say it is true; if it is not, say it is not.
Many people come to know and speak this again.

A temple without a deity is like a deserted shop;
Devotion without feeling (bhava) is a deceptive trick.
A woman without modesty, eyes grown with gajuga,
A master who knows not service is like a stone in the eye.

A king without righteousness is like a broken sandal;
A mind without purity is like a skin itch.
A man without peace is like a piece of a black pestle;
Speech without depth is like a hole in a broken pot.

A friend who abandons you is like a torn leather strap;
A donor who brags about giving is of low birth.
In this creation, he who does not touch and worship 
The feet of Kaginele Adikeshava, that man is a monkey.`;

  // Update composition
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-71' },
    data: { 
      ragaId: raga.id,
      talaId: tala.id,
      translations: {
        updateMany: {
          where: {}, 
          data: {
            english: englishTranslation,
          }
        }
      }
    }
  });

  console.log('Successfully updated metadata and translation for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
