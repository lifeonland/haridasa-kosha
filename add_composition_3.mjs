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
  const ragaName = "Surati";
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

  const compId = "sripadaraja-keertisi-janarella";

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
      title: "Keertisi Janarella Hariya Guna",
      firstLine: "Keertisi janarella hariya guna",
      lyrics: `ಕೀರ್ತಿಸಿ ಜನರೆಲ್ಲ ಹರಿಯ ಗುಣ                                                                    ಪ.

ಕೀರ್ತಿಸಿ ಜನರು ಕೃತಾರ್ಥರಾಗಿರೊ                                                              ಅ.ಪ.

ಅವನು ವನದೊಳಗೆ ನಿತ್ಯದಿ
ಬಾಹ ಜನರ ಬಡಿದು
ಜೀವನ ಮಾಡ್ಪ ಕಿರಾತನು ಕೀರ್ತಿಸಿ
ತಾ ಒಲದಾತನ ಕೋವಿದನೆನಿಸಿದ                                                              ೧

ಅವನ ಪಾದರಜ ಸೋಕಲು
ಆ ವನಿತೆಯ ಜಡ
ಭಾವವ ತೊಲಗಿಸಿ ಆ ವನಿತೆಯನು
ಪಾವನ ಮಾಡಿದ ದೇವಾಧಿದೇವನ                                                              ೨

ಅಂದು ಶಬರಿ ತಾನು ಪ್ರೇಮದಿ
ತಿಂದ ಫಲವ ಕೊಡಲು
ಕುಂದು ನೋಡದೆ ಆನಂದದಿ ಗ್ರಹಿಸಿ
ಕುಂದದ ಪದವಿಯನಂದು ಕೊಟ್ಟವನ                                                      ೩

ದುಷ್ಟ ರಾವಣ ತಾನು ಸುರರಿಗೆ
ಕಷ್ಟಬಡಿಸುತಿರಲು
ಪುಟ್ಟ ಭುವನದೊಳು ಕುಟ್ಟಿ ಖಳನ ಸುರ-
ರಿಷ್ಟವ ಸಲಿಸಿದ ಸೃಷ್ಟಿಗೊಡೆಯನ                                                               ೪

ತನ್ನ ನಂಬಿದ ಜನರ ಮತ್ತೆ ತಾ-
ನನ್ಯರಿಗೊಪ್ಪಿಸದೆ
ಮುನ್ನಿನಘವ ಕಳಿದಿನ್ನು ಕಾಪಾಡುವ
ಘನಮಹಿಮ ಶ್ರೀರಂಗವಿಠಲನ್ನ                                                                ೫`,
      transliteration: `Keertisi janarella hariya guna (P)

Keertisi janaru krutaartharaagiro (A)

Avanu vanadolage nityadi
baaha janara badidu
jeevana maadpa kiraatanu keertisi
taa oladaatana kovidanenisida (1)

Avana paadaraja sokalu
aa vaniteya jada
bhaavava tolagisi aa vaniteyanu
paavana maadida devaadhidevana (2)

Andu shabari taanu premadi
tinda phalava kodalu
kundu nodade aanandadi grahisi
kundada padaviyanandu kottavana (3)

Dushta raavana taanu surarige
kashtabadisutiralu
putta bhuvanadolu kutti khalana sura-
rishtava salisida srushtigodeyana (4)

Tanna nambida janara matte taa-
nanyarigoppisade
munninaghava kalidinnu kaapaaduva
ghanamahima srirangavithalanna (5)`,
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
      english: `Sing the praises of Hari's qualities, O people! (Pallavi)

Sing His praises and make your lives meaningful and blessed! (Anupallavi)

By singing His praises, even the cruel hunter (Valmiki), who lived in the forest by constantly beating and robbing travelers, won His grace and became a great scholar and sage. (1)

He is the God of gods, whose mere touch of the dust of His feet removed the lifeless, stony state of that woman (Ahalya) and purified her. (2)

When Shabari, out of pure love, offered the fruits she had already tasted, He gladly accepted them without finding fault, and granted her an imperishable status. (3)

When the wicked Ravana was tormenting the demigods, He, the Lord of the universe, was born on this earth, crushed the villain, and fulfilled the desires of the gods. (4)

He is the immensely glorious Sri Ranga Vithala, who never abandons those who trust in Him to others. He washes away past sins and protects us forever. (5)`,
      kannadaMeaning: `ಎಲ್ಲಾ ಜನರೇ, ಶ್ರೀಹರಿಯ ಗುಣಗಳನ್ನು ಕೀರ್ತಿಸಿರಿ (ಹಾಡಿ ಹೊಗಳಿರಿ)! (ಪಲ್ಲವಿ)

ಜನರೇ, ಅವನನ್ನು ಕೀರ್ತಿಸುವ ಮೂಲಕ ನಿಮ್ಮ ಜನ್ಮವನ್ನು ಸಾರ್ಥಕಗೊಳಿಸಿಕೊಳ್ಳಿ. (ಅನುಪಲ್ಲವಿ)

ಕಾಡಿನಲ್ಲಿ ದಾರಿಹೋಕರನ್ನು ಹೊಡೆದು, ದೋಚಿ ಬದುಕುತ್ತಿದ್ದ ಕ್ರೂರ ಬೇಡನು (ವಾಲ್ಮೀಕಿ) ಶ್ರೀಹರಿಯನ್ನು ಕೀರ್ತಿಸಿದ ಕಾರಣ, ಭಗವಂತನು ಒಲಿದು ಅವನನ್ನು ಮಹಾನ್ ಜ್ಞಾನಿಯನ್ನಾಗಿ ಮಾಡಿದನು. (೧)

ತನ್ನ ಪಾದದ ಧೂಳು ತಾಗಿದ ತಕ್ಷಣ, ಆ ಹೆಣ್ಣಿನ (ಅಹಲ್ಯೆಯ) ಜಡವಾದ ಕಲ್ಲಿನ ರೂಪವನ್ನು ಹೋಗಲಾಡಿಸಿ, ಅವಳನ್ನು ಪವಿತ್ರಳನ್ನಾಗಿ ಮಾಡಿದ ದೇವಾಧಿದೇವನ ಗುಣಗಳನ್ನು ಕೀರ್ತಿಸಿ. (೨)

ಅಂದು ಶಬರಿಯು ಪ್ರೀತಿಯಿಂದ ತಾನು ಕಚ್ಚಿ ತಿಂದ (ಎಂಜಲು) ಹಣ್ಣುಗಳನ್ನು ಕೊಟ್ಟಾಗ, ಅದರಲ್ಲಿ ಯಾವುದೇ ದೋಷವನ್ನು ಹುಡುಕದೆ, ಆನಂದದಿಂದ ಸ್ವೀಕರಿಸಿ ಅವಳಿಗೆ ಶಾಶ್ವತವಾದ ಮುಕ್ತಿಯನ್ನು ಕರುಣಿಸಿದ ಹರಿಯನ್ನು ಕೀರ್ತಿಸಿ. (೩)

ದುಷ್ಟ ರಾವಣನು ದೇವತೆಗಳಿಗೆ ಕಷ್ಟ ಕೊಡುತ್ತಿದ್ದಾಗ, ಈ ಭೂಮಿಯ ಮೇಲೆ ಹುಟ್ಟಿ, ಆ ಖಳನನ್ನು ಸಂಹರಿಸಿ ದೇವತೆಗಳ ಇಷ್ಟವನ್ನು ಪೂರೈಸಿದ ಸೃಷ್ಟಿಯ ಒಡೆಯನನ್ನು ಕೀರ್ತಿಸಿ. (೪)

ತನ್ನನ್ನು ನಂಬಿದ ಭಕ್ತರನ್ನು ಅವನು ಎಂದಿಗೂ ಇತರರ ಕೈಗೆ ಒಪ್ಪಿಸುವುದಿಲ್ಲ. ನಮ್ಮ ಹಿಂದಿನ ಪಾಪಗಳನ್ನು ಕಳೆದು, ಮುಂದೆಯೂ ನಮ್ಮನ್ನು ಕಾಪಾಡುವ ಮಹಾನ್ ಮಹಿಮೆಯುಳ್ಳ ಆ ಶ್ರೀರಂಗವಿಠಲನನ್ನು ಕೀರ್ತಿಸಿ. (೫)`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
