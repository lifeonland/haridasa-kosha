import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Refrain:
One must live with awareness after attaining this human body.
If one lives without understanding, hell is the only destination.

Stanza 1:
Better is the simple gruel in the house of the righteous,
Than the sweet rice pudding in the house of the wicked.
Even if offered thousands of gold coins at every step, do not seek it;
The company of the wicked brings only ruin, O Hari!

Stanza 2:
Better is guarding the back door of a devotee's house,
Than resting on a silk bed in the house of those without devotion.
Serving with dedication the servants of the Slayer of Mura (Krishna), who show the path to liberation,
Brings great happiness and peace, O Hari!

Stanza 3:
Better is the humble poverty of those without desires,
Than the luxurious pleasures in the house of the greedy.
O Mind! Worshiping the sacred feet of Kaginele Adikeshava, the beloved of the gods,
Is the most auspicious and beneficial path.`;

  // Create the translation record since updateMany failed
  const newTranslation = await prisma.translation.create({
    data: { 
      compositionId: 'kanaka-list-21',
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
