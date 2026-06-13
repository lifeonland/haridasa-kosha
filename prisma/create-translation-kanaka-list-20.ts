import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Refrain:
Is there any joy in solitude (intimacy) once the mouth begins to stench?
Is there any longing for one's maternal home once the mother has passed away?

Stanza 1:
Of what use is great beauty and form once the eyesight is lost?
What is the value of honors and awards once one's luster (reputation/health) has faded?
Can one achieve the higher worlds (salvation) once their merit (Punya) is exhausted?
Is a betel leaf preparation (paan) tasty if it lacks lime (chuna)?

Stanza 2:
Can one eat sour food mixed in a tarnished (verdigris-covered) brass vessel?
Is the application of sandalwood paste pleasant when one is shivering with fever?
Is there any pleasure in lusting after a woman whose youth has faded (sagging breasts)?
Can there be any profit in selling goods whose market value has already crashed?

Stanza 3:
Can there be daily happiness when one cannot follow a healthy diet (due to illness)?
Is there any strength left once the vital essence (Sattva) has diminished?
O Adikeshava of Kaginele, in this world,
Can a human ever attain liberation (Mukti) without devotion to You?`;

  // Create the translation record since it was missing
  const newTranslation = await prisma.translation.create({
    data: { 
      compositionId: 'kanaka-list-20',
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
