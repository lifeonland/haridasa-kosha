import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Refrain:
We have come, O Govinda Setti (Lord Venkateshwara addressed as a merchant)! We have come asking if there is any Teertha (holy water) or Prasada (sanctified food) in your platter.

Stanza 1:
You are the merchant who sells Appa, Athirasa (sweet pancakes), ghee, sugar, milk, and fragrant cardamom. You sell these rare and delicious sweets across the fifty-six kingdoms (the whole world).

Stanza 2:
You take broken pots, grind them to make Nama (the sacred mark), and sell each one for a coin. You are a shrewd merchant who even sells the leftover food after your stomach is full, just to accumulate more wealth and jewelry.

Stanza 3:
Residing on the Sheshagiri hills (Tirumala), you are a merchant famous across all nations. You are the one who collects interest on every single coin—the Lord Adi Keshava Narayana, also known as Timma Setti.`;

  // Create the translation record since it is missing
  const newTranslation = await prisma.translation.create({
    data: { 
      compositionId: 'kanaka-list-24',
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
