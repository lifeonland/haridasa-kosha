import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Refrain:
In what pride (wealth/glory) have you forgotten me?
O Lord, the beloved of Janaki, tell me, O Raghupati?

Stanza 1:
Is it the pride of having released the Gods from their imprisonment?
Is it the pride of having listened to the elephant's (Gajendra's) cry for help?
Is it the pride of having built a bridge across the ocean?
Tell me firmly, O Raghupati.

Stanza 2:
Is it the pride of having made your home and sleeping within the ocean?
Is it the pride of having Mruda (Lord Shiva) as your friend?
Is it the pride of having protected Draupadi's honor without fail?
Tell me with certainty, O son of Devaki.

Stanza 3:
Is it the pride of having measured the entire earth in three steps?
Is it the pride of having Kama (Manmatha) as your son?
Is it the pride of having the great Lakshmi as your consort?
Tell me with love, O Lord Achyuta.

Stanza 4:
Is it the pride of all humans singing your praises?
Is it the pride of having Hanuma as your servant?
Is it the pride that no other shining deities are equal to you?
Tell me without any doubt, O Narahari.

Stanza 5:
If you forget me in such pride, O Lord,
Is this challenge or behavior appropriate for you?
O Kaginele Adikeshava, the father of Kama, O Ranga,
Relieve me of my worries and grant me joy.`;

  // Create the translation record since it was missing
  const newTranslation = await prisma.translation.create({
    data: { 
      compositionId: 'kanaka-list-18',
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
