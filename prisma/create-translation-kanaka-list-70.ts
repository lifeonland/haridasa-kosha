import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Refrain:
O Mind, worship Hanuman, worship Hanuman.

Stanza 1:
Worship Him who has a beautiful form and is the divine one to be saluted.
He is like a lion providing the joy of devotion, the greatest among the godly beings on earth.

Stanza 2:
He is the destroyer of the forest of foolish demons (who roam at night).
He is the one who brought an end to the sorrow of Mother Sita.

Stanza 3:
His life story is the source of supreme bliss and the rising of noble virtues.
He is completely filled with the essence of compassion.

Stanza 4:
He is profound in his divine qualities.
He is the axe that destroys the forest of demons and giants.

Stanza 5:
He is the stage for Guru Chennakeshava (Lord Vishnu) in the Kadali forest.
He is the steady, true devotee and the Mukhya Prana (the primary life force).`;

  // Create the translation record since it is missing
  const newTranslation = await prisma.translation.create({
    data: { 
      compositionId: 'kanaka-list-70',
      english: englishTranslation,
      kannadaMeaning: "",
      wordByWord: ""
    }
  });

  console.log('Successfully created translation for:', newTranslation.compositionId);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
