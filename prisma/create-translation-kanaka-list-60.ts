import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Chorus:
No, no, O mind, do not.
No, no, O mind, do not seek anyone other than the Lord.

Stanza 1:
Do not covet the wealth of others.
Do not be deluded by looking at other women.
Do not go to hell by slandering others.
Do not forget the feet of the Supreme Being.

Stanza 2:
Do not fail to give food to those who come hungry.
Do not stay away from the devotees who serve.
Do not fail to worship the feet of the Lotus-naveled Lord (Vishnu).
Do not forget the incomparable Lord Hari.

Stanza 3:
The beloved of Kanaka Dasa, Adikeshava of Kaginele—
Remember Him in your heart and do not forget.
By meditating on Him day after day,
Rid yourself of the fear of the cycle of birth and death.`;

  // Create the translation record since it was missing
  const newTranslation = await prisma.translation.create({
    data: { 
      compositionId: 'kanaka-list-60',
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
