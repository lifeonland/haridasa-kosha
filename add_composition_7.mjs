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

  let deity = await prisma.deity.findFirst({ where: { id: 'ranganatha' } });
  if (!deity) {
     deity = await prisma.deity.findFirst({ where: { id: 'krishna' } });
  }
  if (!deity) {
     deity = await prisma.deity.findFirst();
  }

  // Handle Raga
  const ragaName = "Naati";
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

  const compId = "sripadaraja-ranganaathana-noduva";

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
      title: "Ranganaathana Noduva Banni",
      firstLine: "Ranganaathana noduva banni shree",
      lyrics: `ರಂಗನಾಥನ ನೋಡುವ ಬನ್ನಿ ಶ್ರೀ
ರಂಗನ ದಿವ್ಯ ವಿಮಾನದಲ್ಲಿಹನ                                                                              ಪ.

ಕಮನೀಯಗಾತ್ರನ ಕರುಣಾಂತರಂಗನ
ಕಾಮಿತಾರ್ಥವೀವ ಕಲ್ಪವೃಕ್ಷನ
ಕಮಲದಳ ನೇತ್ರನ ಕಸ್ತೂರಿ ರಂಗನ
ಕಾಮಧೇನು ಕಾವೇರಿ ರಂಗನ                                                                                   ೧

ವಾಸುಕಿಶಯನನ ವಾರಿಧಿನಿಲಯನ
ವಾಸುದೇವ ವಾರಿಜನಾಭನ
ವಾಸವಾದಿ ಭಕ್ತಹೃದಯಾಂಬುಜದಲ್ಲಿ
ವಾಸವಾಗಿರುತಿಹ ವಸುದೇವಸುತನ                                                                          ೨

ಮಂಗಳಗಾತ್ರನ ಮಂಜುಳಭಾಷಣ
ಗಂಗಾಜನಕನ ಅಜಜನಕನ
ಸಂಗೀತಲೋಲನ ಸಾಧುಸಮ್ಮತನ
ರಂಗವಿಠಲ ರಾಜೀವನೇತ್ರನ                                                                                   ೩`,
      transliteration: `Ranganaathana noduva banni shree
rangana divya vimaanadallihana (P)

Kamaneeyagaatrana karunaantarangana
kaamitaarthaveeva kalpavrukshana
kamaladala netrana kastoori rangana
kaamadhenu kaaveri rangana (1)

Vaasukishayanana vaaridhinilayana
vaasudeva vaarijanaabhana
vaasavaadi bhaktahrudayaambujadalli
vaasavaagikutiha vasudevasutana (2)

Mangalagaatrana manjulaabhaashana
gangaajanakana ajajanakana
sangeetalolana saadhusammatana
rangavithala raajeevanetrana (3)`,
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
      english: `Come and behold Ranganatha, who resides in the divine Vimana (temple) in Srirangam. (Pallavi)

Behold the one with an attractive form, a heart full of compassion, the wish-fulfilling tree (Kalpavriksha) who grants desired boons. Behold the lotus-eyed Kasturi Ranga, the wish-fulfilling cow (Kamadhenu) of the Kaveri river. (1)

Behold the one who reclines on the serpent Vasuki (Adisesha), whose abode is the ocean. Behold Vasudeva, the one with a lotus navel (Padmanabha). Behold the son of Vasudeva, who resides in the lotus-hearts of devotees like Indra (Vasava) and others. (2)

Behold the one with an auspicious form, who speaks sweet words. Behold the father of the river Ganga, the father of Aja (Brahma). Behold Ranga Vithala, who rejoices in music, is revered by sages, and possesses lotus-like eyes. (3)`,
      kannadaMeaning: `ಶ್ರೀರಂಗದ ದಿವ್ಯ ವಿಮಾನದಲ್ಲಿ (ಗರ್ಭಗುಡಿಯಲ್ಲಿ) ನೆಲೆಸಿರುವ ರಂಗನಾಥನನ್ನು ನೋಡಲು ಬನ್ನಿರಿ. (ಪಲ್ಲವಿ)

ಆಕರ್ಷಕವಾದ ದೇಹವುಳ್ಳವನನ್ನು, ಕರುಣಾಮಯ ಹೃದಯವುಳ್ಳವನನ್ನು, ಭಕ್ತರು ಬೇಡಿದ ವರಗಳನ್ನು ಕರುಣಿಸುವ ಕಲ್ಪವೃಕ್ಷನನ್ನು, ಕಮಲದಂತಹ ಕಣ್ಣುಗಳುಳ್ಳ ಕಸ್ತೂರಿ ರಂಗನನ್ನು, ಕಾವೇರಿ ತೀರದ ಕಾಮಧೇನುವನ್ನು (ರಂಗನಾಥನನ್ನು) ನೋಡಲು ಬನ್ನಿ. (೧)

ಸರ್ಪರಾಜನಾದ ವಾಸುಕಿಯ (ಆದಿಶೇಷನ) ಮೇಲೆ ಮಲಗಿರುವವನನ್ನು, ಸಾಗರದಲ್ಲಿ ನೆಲೆಸಿರುವವನನ್ನು, ವಾಸುದೇವನನ್ನು, ಕಮಲನಾಭನನ್ನು, ಇಂದ್ರನೇ (ವಾಸವನೇ) ಮೊದಲಾದ ಭಕ್ತರ ಹೃದಯ ಕಮಲದಲ್ಲಿ ಸದಾ ವಾಸವಾಗಿರುವ ವಸುದೇವನ ಮಗನನ್ನು ನೋಡಲು ಬನ್ನಿ. (೨)

ಮಂಗಳಕರವಾದ ದೇಹವುಳ್ಳವನನ್ನು, ಮಧುರವಾಗಿ ಮಾತನಾಡುವವನನ್ನು, ಗಂಗೆಗೆ ಜನ್ಮ ನೀಡಿದವನನ್ನು, ಬ್ರಹ್ಮನ (ಅಜನ) ತಂದೆಯನ್ನು, ಸಂಗೀತದಲ್ಲಿ ಒಲವುಳ್ಳವನನ್ನು, ಸಾಧು-ಸಜ್ಜನರಿಗೆ ಪ್ರಿಯನಾದವನನ್ನು, ಕಮಲದಂತಹ ಕಣ್ಣುಗಳುಳ್ಳ ರಂಗವಿಠಲನನ್ನು ನೋಡಲು ಬನ್ನಿ. (೩)`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
