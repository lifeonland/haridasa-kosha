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
  const ragaName = "Ahiri";
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

  const compId = "sripadaraja-ollenavva";

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
      title: "Ollenavva Lakumiya Nalla",
      firstLine: "Ollenavva lakumiya nalla",
      lyrics: `ಒಲ್ಲೆನವ್ವಾ ಲಕುಮಿಯ ನಲ್ಲ ಬಾರದಿದ್ದರೆ
ತನು ಹೊರೆಯನೊಲ್ಲೆನವ್ವಾ                                                                    ಪ.

ಹಾರ ಕೊರಳಿಗೆ ಭಾರ ಹುಸ್ಸಿನ
ಭಾರ ಸೈರಿಸಲಾರೆನೆ
ಮಾರನಯ್ಯನು ಬಾರದಿದ್ದರೆ
ಮಾರನಂಬಿಗೆ ಗುರಿಯ ಮಾಡಿ                                                   ಅ.ಪ.

ಎಲ್ಲ ದೇವರ ವಲ್ಲಭನೆಂದು
ಒಲಿದೆ ಮನ ನಿಲ್ಲದೆ
ನಿಲ್ಲದೆ ರಂಗ ಪೋದ ಮಧುರೆಗೆ
ಬಿಲ್ಲ ಹಬ್ಬದ ನೆಪವ ಮಾಡಿ                                                          ೧

ಮಂದಾನಿಲನ ಸಹಿಸಲಾಗದು
ನೊಂದೆ ಶುಕ ಪಿಕ ರವಗಳಿಂದ
ಚಂದ್ರಕಿರಣದಿ ಬೆಂದೆ ಇನ್ನೀ
ವೃಂದಾವನವೇಕವನಗಲಿ                                                            ೨

ಮುನ್ನ ಆಡಿದ ಮಾತ ಮರೆತು
ಎನ್ನ ವನದೊಳಗೀಡಾಡಿ
ವನಜಾಕ್ಷನು ಬಾರ ಪುರದ
ವನಿತೆಯರನು ಮೆಚ್ಚಿ ಪೋದ                                                   ೩

ಪೊಂಗೊಳಲ ಧ್ವನಿಗೆ ಸಿಲುಕಿ
ಭಂಗಬಟ್ಟೆನಂಗಜಿನಿಂದಲಿ
ಪೆಂಗಳಿಗುಚಿತವಲ್ಲ
ರಂಗವಿಠಲನ ತೋರದಿದ್ದಡೆ                                                     ೪`,
      transliteration: `Ollenavva lakumiya nalla baaradiddare
tanu horeyanollenavva (P)

Haara koralige bhaara hussina
bhaara sairisalaarene
maaranayyanu baaradiddare
maaranambige guriya maadi (A)

Ella devara vallabhanendu
olide mana nillade
nillade ranga poda madhurege
billa habbada nepava maadi (1)

Mandaanilana sahisalaagadu
nonde shuka pika ravagalinda
chandrakiranadi bende innii
vrundaavanavekavanagali (2)

Munna aadida maata maretu
enna vanadolagidaadi
vanajaakshanu baara purada
vaniteyaranu mecchi poda (3)

Pongolala dhvanige siluki
bhangabattenangajinindali
pengaliguchitavalla
rangavithalana toradiddade (4)`,
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
      english: `I do not want anything, Mother, if the beloved of Lakshmi does not come. I do not even wish to bear the burden of this body. (Pallavi)

The garland around my neck feels like a heavy burden. I cannot bear this weight of false hopes. If the father of Manmatha (Krishna) does not come, I have become the target of Cupid's arrows. (Anupallavi)

Thinking He is the supreme lord of all gods, my mind fell in love with Him uncontrollably. But without staying, Ranga went away to Mathura under the pretext of the bow festival. (1)

I cannot bear this gentle breeze. I am tormented by the sounds of parrots and cuckoos. I am burning in the moonlight. Without Him, what is the use of this Vrindavana? (2)

Forgetting the words He spoke before, He has left me wandering in this forest. The lotus-eyed one does not come; He has become enamored by the women of the city and left. (3)

Caught by the captivating sound of His golden flute, I am suffering from the pangs of separation caused by Cupid. It is not proper for a woman to suffer like this, if you do not show me Ranga Vithala. (4)`,
      kannadaMeaning: `ಲಕ್ಷ್ಮೀಪತಿಯಾದ ಶ್ರೀಕೃಷ್ಣನು ಬರದಿದ್ದರೆ ನನಗೇನೂ ಬೇಡವವ್ವಾ. ಈ ದೇಹದ ಭಾರವನ್ನು ಹೊರಲು ಸಹ ನನಗೆ ಇಷ್ಟವಿಲ್ಲ. (ಪಲ್ಲವಿ)

ಕೊರಳಲ್ಲಿರುವ ಹಾರವು ಭಾರವೆನಿಸುತ್ತಿದೆ. ಈ ಸುಳ್ಳು ಭರವಸೆಗಳ ಭಾರವನ್ನು ನಾನು ಸಹಿಸಲಾರೆ. ಮನ್ಮಥನ ತಂದೆಯಾದ ಕೃಷ್ಣನು ಬರದಿದ್ದರೆ, ನಾನು ಮನ್ಮಥನ ಬಾಣಗಳಿಗೆ ಗುರಿಯಾಗಿದ್ದೇನೆ. (ಅನುಪಲ್ಲವಿ)

ಅವನು ಎಲ್ಲಾ ದೇವರುಗಳ ಒಡೆಯನೆಂದು ನನ್ನ ಮನಸ್ಸು ಅವನನ್ನು ನಿಯಂತ್ರಣವಿಲ್ಲದೆ ಪ್ರೀತಿಸಿತು. ಆದರೆ ರಂಗನು ಇಲ್ಲಿ ನಿಲ್ಲದೆ, ಬಿಲ್ಲಹಬ್ಬದ ನೆಪ ಮಾಡಿಕೊಂಡು ಮಥುರೆಗೆ ಹೊರಟುಹೋದನು. (೧)

ಈ ಮಂದಮಾರುತವನ್ನು ಸಹಿಸಲು ಆಗುತ್ತಿಲ್ಲ. ಗಿಳಿ ಮತ್ತು ಕೋಗಿಲೆಗಳ ಧ್ವನಿಯಿಂದ ನಾನು ನೊಂದಿದ್ದೇನೆ. ಚಂದ್ರನ ಬೆಳಕಿನಲ್ಲಿ ನಾನು ಬೇಯುತ್ತಿದ್ದೇನೆ. ಅವರಿಲ್ಲದೆ ಈ ಬೃಂದಾವನವಾದರೂ ಏಕಿರಬೇಕು? (೨)

ಮುಂಚೆ ಆಡಿದ ಮಾತುಗಳನ್ನು ಮರೆತು, ನನ್ನನ್ನು ಈ ಕಾಡಿನಲ್ಲಿ ಅಲೆಯುವಂತೆ ಮಾಡಿದ್ದಾನೆ. ಆ ಕಮಲಾಕ್ಷನು ಬರುವುದಿಲ್ಲ; ಅವನು ಪಟ್ಟಣದ (ಮಥುರೆಯ) ಹೆಂಗಸರಿಗೆ ಮರುಳಾಗಿ ಹೋಗಿದ್ದಾನೆ. (೩)

ಅವನ ಚಿನ್ನದ ಕೊಳಲಿನ ನಾದಕ್ಕೆ ಸಿಲುಕಿ, ನಾನು ಮನ್ಮಥನಿಂದ ವಿರಹ ವೇದನೆಯನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೇನೆ. ನನಗೆ ರಂಗವಿಠಲನನ್ನು ತೋರಿಸದಿದ್ದರೆ, ಹೆಣ್ಣಾಗಿ ಹೀಗೆ ಕಷ್ಟಪಡುವುದು ಸರಿಯಲ್ಲ. (೪)`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
