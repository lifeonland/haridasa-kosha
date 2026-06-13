import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Refrain:
Do not trust that anyone is truly your well-wisher; when calamity strikes, no one is there for anyone else.

Stanza 1:
Can a father be trusted? In the past, Hiranyakashipu turned against his son Prahlada.
Can a mother be called a protector? Kunti abandoned her son Radheya (Karna).

Stanza 2:
Can a son be a savior? Kamsa imprisoned his own father (Ugrasena).
Can a brother be full of affection? Sugriva caused the death of his brother Vali.

Stanza 3:
Do not firmly believe that bodily relatives are your true kin.
Only the merciful Adikeshava of Kaginele brings happiness in this world and the next to those who trust Him daily.`;

  // Create the translation record
  const newTranslation = await prisma.translation.create({
    data: { 
      compositionId: 'kanaka-list-39',
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
