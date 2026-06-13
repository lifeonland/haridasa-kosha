import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Refrain:
Who else is a true relative in the three worlds other than Sri Hari? 
What does it matter who else exists as a relative (if He is not there)?

Stanza 1:
When the elephant (Gajendra) was caught in the jaws of the crocodile and cried out in pain, what did the other elephants in the forest do to help?
When the sin of Brahma (Brahmahatya) came like a vast ocean to the husband of Parvati (Shiva), what were Rudra and the other gods doing in the mountains? (Only Hari could save them).

Stanza 2:
When the stepmother (Suruchi) insulted and pushed the young son (Dhruva) away, what did the King (his father, Uttanapada) do to protect him?
When the virtuous woman (Draupadi) was being stripped of her saree in the open assembly, what did her five husbands do while watching helplessly?

Stanza 3:
When the king of animals (referring to the soul or a specific devotee) departs from this world, what can the wife and children do to stop it?
Other than the one who took the Man-Lion form (Narasimha), the Adikesava of Kaginele, who else is a superior relative who stands by us in times of ultimate need?`;

  // Create the translation record since it was missing
  const newTranslation = await prisma.translation.create({
    data: { 
      compositionId: 'kanaka-list-34',
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
