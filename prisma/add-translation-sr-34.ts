import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compositionId = 'sr-34';
  const englishTranslation = `Pallavi:
The thousand-tongued Shesha should praise the greatness of the renunciation of Vyasamuni Raya.

Charana 1:
Are the Sanyasis who wander through fifty-six countries to nourish their stomachs out of desire, pretending to be pure, eating dainty food, and wasting days in deception, truly Sanyasis?

Charana 2:
(Praising the glory and greatness of Vyasaraya), who built tanks, villages, and agraharas (settlements for Brahmins), and supported a hundred thousand families of Brahmins (Bhu-sura) with glory.

Charana 3:
Without considering day or night, always worshipping the lotus feet of Sri Hari with devotion, the worshipper of Raghupati (Vyasaraya) says, "I will not let go of Ranga Vitthala, the son of Brahmanya Tirtha."`;

  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: compositionId }
  });

  if (existingTranslation) {
    await prisma.translation.update({
      where: { id: existingTranslation.id },
      data: { english: englishTranslation }
    });
    console.log('✅ Updated existing translation for sr-34');
  } else {
    await prisma.translation.create({
      data: {
        compositionId: compositionId,
        english: englishTranslation,
        kannadaMeaning: '',
        wordByWord: ''
      }
    });
    console.log('✅ Created new translation for sr-34');
  }

  await prisma.$disconnect();
}

main();
