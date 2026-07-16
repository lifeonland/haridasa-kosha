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
  const ragaName = "Todi";
  let raga = await prisma.raga.findUnique({ where: { name: ragaName } });
  if (!raga) {
      raga = await prisma.raga.create({ data: { name: ragaName } });
  }

  // Handle Tala
  const talaName = "Jhampe";
  let tala = await prisma.tala.findUnique({ where: { name: talaName } });
  if (!tala) {
      tala = await prisma.tala.create({ data: { name: talaName } });
  }

  const compId = "sripadaraja-vidhige-dayavilladakke";

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
      title: "Vidhige Dayavilladakke",
      firstLine: "Vidhige dayavilladakke emma myaale",
      lyrics: `ವಿಧಿಗೆ ದಯವಿಲ್ಲದಕ್ಕೆ ಎಮ್ಮ ಮ್ಯಾಲೆ
ಯದುಪತಿಯನಗಲಿಸಿದ ಒಮ್ಮಿಂದಲೊಮ್ಮೆ                                                                    ಪ.

ಎವೆಯ ಮರೆಯ ಮಾಡಿ ಪೋದ ಯಾತಕೋ ವಿಧಿಯೇ
ಕುವಲಯದ ಕಡೆಗಣ್ಣ ನೋಟದಿಂದಲಿ
ಕವಕವಿಸಿ ನಗುವ ಮುದ್ದು ಮುಖವನು
ತವಕದಿಂದ ಮರಳಿ ಮರಳಿ ನೋಡದೊಡವೆ                                                                    ೧

ಹಕ್ಕಿಯ ಮ್ಯಾಲುಳ್ಳ ದಯ ನಮ್ಮ ಮ್ಯಾಲೆ
ಇಕ್ಕದೇಕೆ ಹೋದ್ಯೋ ವಿಧಿಯೇ
ರೆಕ್ಕೆ ಎರಡುಳ್ಳರೆ ಮಧುರೆಗೆ ಪೋಗಿ
ಫಕ್ಕನೆ ಶ್ರೀಹರಿಯೊಡನೆ ಕೂಡುತಿದ್ದೆವಲ್ಲ                                                                       ೨

ತಂಗೀ ನಮ್ಮೆದೆಯು ಕಲ್ಲಾಗಿ ಇದ್ದವೆ
ಹಿಂಗುವರೆ ಸಖಿಯರು ಒಮ್ಮಿಂದಲೊಮ್ಮೆ
ರಂಗವಿಠಲನ್ನ ಅಂಗ ಸಂಗವ ಬಿಟ್ಟು ಇಂಥ
ಭಂಗಜೀವಿ ಸುಡಸುಡಸುಡಲ್ಯಾಟಕೋ                                                                           ೩`,
      transliteration: `Vidhige dayavilladakke emma myaale
yadupatiyanagalisida ommindalomme (P)

Eveya mareya maadi poda yaatako vidhiye
kuvalayada kadeganna notadindali
kavakavisi naguva muddu mukhavanu
tavakadinda marali marali nodadodave (1)

Hakkiya myaalulla daya namma myaale
ikkadeke hodyo vidhiye
rekke eradullare madhurege pogi
phakkane shrihariyodane koodutiddevalla (2)

Tangee nammedeyu kallaagi iddave
hinguvare sakhiyaru ommindalomme
rangavithalanna anga sangava bittu intha
bhangajeevi sudasudasudalyaatako (3)`,
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
      english: `Because fate has no mercy on us, it has suddenly separated us from Yadupati (Krishna). (Pallavi)

Why did fate make Him disappear in the blink of an eye? We did not even get the chance to eagerly and repeatedly gaze upon His lotus-like sidelong glances and His sweet, radiantly smiling face. (1)

Oh fate, why didn't you show us the mercy you show to a bird? If only we had two wings, we would have immediately flown to Mathura and joined Sri Hari! (2)

Oh sister, have our hearts turned to stone? Will friends suddenly abandon each other like this? Having lost the divine physical association of Ranga Vithala, why should this broken, burning life continue to exist? Burn it down! (3)`,
      kannadaMeaning: `ವಿಧಿಗೆ ನಮ್ಮ ಮೇಲೆ ದಯೆಯಿಲ್ಲ, ಅದಕ್ಕಾಗಿಯೇ ಯದುಪತಿಯನ್ನು (ಕೃಷ್ಣನನ್ನು) ಒಮ್ಮೆಗೇ ನಮ್ಮಿಂದ ಅಗಲಿಸಿದನು. (ಪಲ್ಲವಿ)

ಕಣ್ಣು ಮಿಟುಕಿಸುವಷ್ಟರಲ್ಲಿ ವಿಧಿಯು ಅವನನ್ನು ಮರೆಮಾಡಿ ಹೋದದ್ದೇಕೆ? ಕಮಲದಂತಹ ಕಡೆಗಣ್ಣಿನ ನೋಟದಿಂದ ಕೂಡಿದ ಆತನ ಮುದ್ದಾದ, ನಗುವ ಮುಖವನ್ನು ತವಕದಿಂದ ಪದೇ ಪದೇ ನೋಡುವ ಭಾಗ್ಯವೂ ನಮಗೆ ಇಲ್ಲವಾಯಿತಲ್ಲಾ. (೧)

ಹಕ್ಕಿಯ ಮೇಲಿರುವ ದಯೆಯನ್ನು ವಿಧಿಯು ನಮ್ಮ ಮೇಲೆ ಏಕೆ ತೋರಲಿಲ್ಲ? ನಮಗೆ ಎರಡು ರೆಕ್ಕೆಗಳಿದ್ದಿದ್ದರೆ, ಕೂಡಲೇ ಮಧುರೆಗೆ ಹಾರಿಹೋಗಿ ಆ ಶ್ರೀಹರಿಯೊಂದಿಗೆ ಸೇರಿಕೊಳ್ಳುತ್ತಿದ್ದೆವಲ್ಲಾ! (೨)

ತಂಗಿ, ನಮ್ಮ ಹೃದಯಗಳು ಕಲ್ಲಾಗಿವೆಯೇ? ಸ್ನೇಹಿತರು (ಸಖಿಯರು) ಒಮ್ಮೆಗೇ ಹೀಗೆ ಅಗಲುವರೇ? ರಂಗವಿಠಲನ ದಿವ್ಯ ಸಾಂಗತ್ಯವನ್ನು ಕಳೆದುಕೊಂಡು, ಇಂತಹ ಭಂಗಗೊಂಡ ಜೀವನವು ಸುಟ್ಟುಹೋಗಲಿ, ಇದು ನಮಗೇಕೆ? (೩)`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
