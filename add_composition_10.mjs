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
  const ragaName = "Kalyani";
  let raga = await prisma.raga.findUnique({ where: { name: ragaName } });
  if (!raga) {
      raga = await prisma.raga.create({ data: { name: ragaName } });
  }

  // Handle Tala
  const talaName = "Atta";
  let tala = await prisma.tala.findUnique({ where: { name: talaName } });
  if (!tala) {
      tala = await prisma.tala.create({ data: { name: talaName } });
  }

  const compId = "sripadaraja-saddu-maadalu-byaadavo";

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
      title: "Saddu Maadalu Byaadavo",
      firstLine: "Saddu maadalu byaadavo ninna kaalige",
      lyrics: `ಸದ್ದು ಮಾಡಲು ಬ್ಯಾಡವೋ ನಿನ್ನ ಕಾಲಿಗೆ
ಬಿದ್ದು ನಾ ಬೇಡಿಕೊಂಬೆ                                                                                      ಪ.

ನಿದ್ದೆಗೆಯ್ಯುವರೆಲ್ಲ ಎದ್ದರೆ ನೀನು ಬಂ
ದಿದ್ದದ್ದು ಕಂಡರೇನಂಬುವರೋ ರಂಗ                                                                      ಅ.ಪ.

ಬಲೆ ಘಾತುಕನ್ನದೇನೊ ಕೈಯ ಪಿಡಿದು
ಎಳೆಯದಿರೊ ಸುಮ್ಮನೆ
ಮೊಲೆಗಳ ಮೇಲಿನ ಸೆರಗನೆಳೆಯಲು ಕೊ
ರಳ ಪದಕಂಗಳು ಧ್ವನಿಗೆಯ್ಯುವವೊ ರಂಗ                                                              ೧

ನಿರುಗೆಯ ಪಿಡಿಯದಿರೊ ಕಾಂಚಿಯ ದಾಮ
ಕಿರುಗಂಟೆ ಧ್ವನಿಗೆಯ್ಯದೆ
ಕಿರುದುಟಿಗಳ ನೀನು ಸವಿದು ಚಪ್ಪರಿಸಲು
ತರವಲ್ಲ ಗಂಡ ಮತ್ಸರವ ತಾಳುವನಲ್ಲ                                                                     ೨

ನಾಡ ಮಾತುಗಳೇತಕೊ ಸಂಗೀತವ
ಪಾಡುವ ಸಮಯವೇನೊ
ಗಾಡಿಕಾರ ಶ್ರೀರಂಗವಿಠಲನೆ
ಪಾಡುಪಂಥಗಳೊಡಗೂಡುವ ಸಮಯದಿ                                                                  ೩`,
      transliteration: `Saddu maadalu byaadavo ninna kaalige
biddu naa bedikombe (P)

Niddegeyyuvarella eddare neenu bam-
diddaddu kandarenambuvaro ranga (A.P)

Bale ghaatukannadeno kaiya pididu
eleyadiro summane
molegala melina seraganeleyalu ko-
rala padakangalu dhvanigeyyuvavo ranga (1)

Nirugeya pidiyadiro kaanchiya daama
kirugante dhvanigeyyade
kirudutigala neenu savidu chapparisalu
taravalla ganda matsarava taaluvanalla (2)

Naada maatugaletako sangeetava
paaduva samayaveno
gaadikaara shrirangavithalane
paadupanthagalodagooduva samayadi (3)`,
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
      english: `Please do not make a sound, I fall at your feet and beg you! (Pallavi)

If all those who are sleeping wake up and see that you have come here, what will they think, O Ranga? (Anupallavi)

Are you a great tormentor? Do not hold my hand and pull me needlessly. If you pull the pallu over my chest, the pendants on my neck will make a loud clinking sound, O Ranga! (1)

Do not grab the pleats of my saree, the small bells on my waistband will jingle. It is not proper for you to taste and smack my small lips, for my husband will become extremely jealous! (2)

Why are you speaking loudly? Is this the time to sing music? O enchanting Sri Ranga Vithala, is this the time to engage in musical competitions and teasing? (3)`,
      kannadaMeaning: `ದಯವಿಟ್ಟು ಸದ್ದು ಮಾಡಬೇಡವೋ, ನಿನ್ನ ಕಾಲಿಗೆ ಬಿದ್ದು ಬೇಡಿಕೊಳ್ಳುತ್ತೇನೆ! (ಪಲ್ಲವಿ)

ಮಲಗಿರುವವರೆಲ್ಲಾ ಎಚ್ಚರಗೊಂಡು ನೀನು ಇಲ್ಲಿಗೆ ಬಂದಿರುವುದನ್ನು ನೋಡಿದರೆ ಅವರು ಏನಂದುಕೊಳ್ಳುವರು ರಂಗ? (ಅನುಪಲ್ಲವಿ)

ನೀನು ಬಹಳ ಕಾಟ ಕೊಡುವವನೇನೋ? ಸುಮ್ಮನೆ ನನ್ನ ಕೈ ಹಿಡಿದು ಎಳೆಯಬೇಡ. ನೀನು ನನ್ನ ಎದೆಯ ಮೇಲಿನ ಸೆರಗನ್ನು ಎಳೆದರೆ, ಕೊರಳಲ್ಲಿರುವ ಪದಕಗಳು ಸದ್ದು ಮಾಡುತ್ತವೆ ರಂಗ. (೧)

ನನ್ನ ಸೀರೆಯ ನಿರಿಗೆಯನ್ನು ಹಿಡಿಯಬೇಡ, ಅದರಿಂದ ಸೊಂಟದ (ಕಾಂಚಿ) ಕಿರುಗಂಟೆಗಳು ಸದ್ದು ಮಾಡುತ್ತವೆ. ನೀನು ನನ್ನ ಕಿರುತುಟಿಗಳನ್ನು ಸವಿಯುತ್ತಾ ಚಪ್ಪರಿಸುವುದು ಸರಿಯಲ್ಲ, ನನ್ನ ಗಂಡನು ತೀವ್ರ ಮತ್ಸರ (ಅಸೂಯೆ) ಪಡುವನಲ್ಲಾ. (೨)

ಜೋರಾಗಿ (ನಾಡ) ಮಾತುಗಳನ್ನಾಡುವುದು ಏತಕ್ಕೆ? ಇದು ಸಂಗೀತವನ್ನು ಹಾಡುವ ಸಮಯವೇನೋ? ಜಾಲಗಾರನಾದ (ಮರುಳುಮಾಡುವವನಾದ) ಶ್ರೀರಂಗವಿಠಲನೇ, ಇದು ಹಾಡುಗಾರಿಕೆಯ ಪಂಥಗಳನ್ನು (ಸ್ಪರ್ಧೆಗಳನ್ನು) ಮಾಡುವ ಸಮಯವೇ? (೩)`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
