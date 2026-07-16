import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const composer = await prisma.composer.findUnique({
    where: { id: 'sripadaraja' },
    include: { ankita: true }
  });

  if (!composer) {
    console.error("Sripadarajaru not found!");
    process.exit(1);
  }

  let deity = await prisma.deity.findFirst({ where: { id: 'krishna' } });
  if (!deity) {
     deity = await prisma.deity.findFirst();
  }

  // Handle Raga
  const ragaName = "Poorvi";
  let raga = await prisma.raga.findUnique({ where: { name: ragaName } });
  if (!raga) {
      raga = await prisma.raga.create({ data: { name: ragaName } });
  }

  // Handle Tala
  const talaName = "Adi";
  let tala = await prisma.tala.findUnique({ where: { name: talaName } });
  if (!tala) {
      tala = await prisma.tala.create({ data: { name: talaName } });
  }

  const compId = "sripadaraja-naane-sajjananaadade";

  // Check if composition exists
  const existing = await prisma.composition.findUnique({
      where: { id: compId }
  });

  if (existing) {
      console.log("Composition already exists, not adding duplicate.");
      return;
  }

  const composition = await prisma.composition.create({
    data: {
      id: compId,
      title: "Naane Sajjananaadade Intha",
      firstLine: "Naane sajjananaadade intha",
      lyrics: `ನಾನೇ ಸಜ್ಜನನಾಡಡೆ ಇಂಥ
ಹೀನ ವಿಷಯಗಳಿಗರಗುವೆನೇನಯ್ಯ                                                                          ಪ.

ನಿರುತದಿ ಪರರ ನಿಂದಿಸುತಿಹೆನೆ
ಗುರುಹಿರಿಯರು ಸಜ್ಜನರೆನ್ನದೆ
ಹರಿ ಪರದೈವವೆಂದರಿತು ಭಜಿಸದೆ
ಪರರ ಒಡವೆಗಳ ಬಯಸುವೆನೇನಯ್ಯಾ                                                                         ೧

ಚಿತ್ತವ ಪುರುಷೋತ್ತಮನಲ್ಲಿಡದೆ
ಉತ್ತಮರಾದವರೊಡನಾಡದೆ
ತತ್ವ ವಿಚಾರವ ಮಾಡದೆ ನಾನು
ನೃತ್ಯರ ಸಂಗವ ಮಾಡುವೆನೇನಯ್ಯ                                                                           ೨

ಹೇಯ ಶರೀರವ ಪೋಷಿಸಿಕೊಂಡು ಉ-
ಪಾಯವ ಚಿಂತಿಸಿ ಬಳಲುವೆನು
ರಾಯರ ಶರಣರ ಸಲಹುವ
ರಂಗವಿಠಲನ ಬಿಡುವೆನೇನಯ್ಯ                                                                                ೩`,
      transliteration: `Naane sajjananaadade intha
heena vishayagaligaraguvenenayya (P)

Nirutadi parara nindisutihene
guruhiriyaru sajjanarennade
hari paradaivavendaritu bhajisade
parara odavegala bayasuvenenayya (1)

Chittava purushottamanallidade
uttumaraadavarudanaadade
tatva vichaarava maadade naanu
nrutyara sangava maaduvenenayya (2)

Heya shareerava poshishikondu u-
paayava chintisi balaluvenu
raayara sharanara salahuva
rangavithalana biduvenenayya (3)`,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: composer.ankitaId,
      ragaId: raga.id,
      talaId: tala.id
    }
  });

  await prisma.translation.create({
    data: {
      compositionId: composition.id,
      english: `If I truly were a good person (sajjana), would I crave such lowly, worldly objects, O Lord? (Pallavi)

I constantly criticize others without respecting elders and virtuous people. Without realizing that Hari is the supreme deity and worshipping Him, I desire the wealth and belongings of others. How could I? (1)

Without fixing my mind on Purushottama (the Supreme Lord), without associating with noble people, and without reflecting on the supreme truth (tattva), I keep company with lowly people. How could I? (2)

Constantly nourishing this despicable body, I suffer by scheming various ways for worldly gains. Yet, will I ever abandon Ranga Vithala, who protects the kings and the surrendered devotees? (3)`,
      kannadaMeaning: `ನಾನೇ ನಿಜವಾದ ಸಜ್ಜನನಾಗಿದ್ದರೆ, ಇಂತಹ ಕೀಳು ಲೌಕಿಕ ವಿಷಯಗಳಿಗೆ ಆಸೆಪಡುತ್ತಿದ್ದೆನೇನಯ್ಯ? (ಪಲ್ಲವಿ)

ಗುರು-ಹಿರಿಯರು ಮತ್ತು ಸಜ್ಜನರನ್ನು ಗೌರವಿಸದೆ ನಾನು ಸದಾ ಬೇರೆಯವರನ್ನು ನಿಂದಿಸುತ್ತಿರುತ್ತೇನೆ. ಶ್ರೀಹರಿಯೇ ಪರದೈವ ಎಂದು ತಿಳಿದು ಅವನನ್ನು ಭಜಿಸದೆ, ಪರರ ಒಡವೆಗಳನ್ನು (ಸಂಪತ್ತನ್ನು) ಬಯಸುತ್ತೇನಲ್ಲಾ? (೧)

ನನ್ನ ಮನಸ್ಸನ್ನು ಪುರುಷೋತ್ತಮನಲ್ಲಿ ಇಡದೆ, ಉತ್ತಮರೊಂದಿಗೆ ಬೆರೆಯದೆ, ಮತ್ತು ತತ್ವ ವಿಚಾರವನ್ನು ಮಾಡದೆ, ನಾನು ಕೀಳು ಜನರ (ನೃತ್ಯರ) ಸಹವಾಸವನ್ನು ಮಾಡುತ್ತೇನಲ್ಲಾ? (೨)

ಈ ಹೇಯವಾದ (ನಶ್ವರವಾದ) ಶರೀರವನ್ನು ಪೋಷಿಸಿಕೊಳ್ಳಲು ಉಪಾಯಗಳನ್ನು ಚಿಂತಿಸುತ್ತಾ ನಾನು ಬಳಲುತ್ತಿದ್ದೇನೆ. ಆದರೂ, ರಾಜರನ್ನು ಮತ್ತು ಶರಣರನ್ನು ಕಾಪಾಡುವ ಆ ರಂಗವಿಠಲನನ್ನು ನಾನು ಎಂದಿಗೂ ಬಿಡುವುದಿಲ್ಲ. (೩)`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
