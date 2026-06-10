import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compositionId = 'kanaka-list-64';
  const englishTranslation = `
The soul residing in this body is like a puppet on a string.
Death is inevitable for everyone, one day or another. ||pallavi||

One brings nothing at birth, and takes nothing at death.
This body, when cremated, becomes mere ash.
After suffering so much, complaining about hunger,
When leaving the body, one does not even take a single piece of cloth. ||1||

Earning ten or eight lakhs, still feeling it is not enough,
Wishing for others' wealth, people perform false justice.
Sowing and growing, feeling it is all 'mine' - a wasteful thought.
After dying, who gets all this wealth? ||2||

One did not enjoy the wealth, women, or land while alive,
One cannot desire brothers, sisters, mother, or father.
One did not enjoy the food, clothing, or worldly pleasures,
After becoming dust, who gets it? ||3||

Adorning oneself with silver and gold, wearing fine clothes,
Like a doll made for play, it danced and is gone.
Like a bubble breaking when the stream flows,
Such is the play of this samsara (worldly life). ||4||

Fame and reputation come only after death.
Where can one find the Lord, the master of life?
Worship the lotus feet of Adikesava of Kaginele,
And live happily. ||5||
`;

  console.log(`Updating translation for ${compositionId}...`);

  // We need to create a Translation entry linked to this composition
  // First, verify the composition exists
  const composition = await prisma.composition.findFirst({ where: { id: compositionId } });
  if (!composition) {
    console.error(`Composition with id ${compositionId} not found.`);
    return;
  }

  await prisma.translation.create({
    data: {
      compositionId: composition.id,
      english: englishTranslation,
      kannadaMeaning: "See original lyrics", // Placeholder
      wordByWord: "Not available", // Placeholder
    },
  });

  console.log(`✅ Translation for "${composition.title}" added successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
