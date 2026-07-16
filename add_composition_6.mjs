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
  const ragaName = "Kuranji";
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

  const compId = "sripadaraja-ninna-magana";

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
      title: "Ninna Magana Leeleya",
      firstLine: "Ninna magana leeleya taalalaareve",
      lyrics: `ನಿನ್ನ ಮಗನ ಲೀಲೆಯ ತಾಳಲಾರೆವೆ ನಾವು ತರಳನ ದುಡುಕು
ಹೇಳಬಾರದೆ ಗೋಪಾಲಕೃಷ್ಣಗೆ ಬುದ್ಧಿ ಅಮ್ಮ                                                                 ಪ.

ಇದು ಚೆನ್ನಾಯಿತು ತಿಳಿದವನಲ್ಲವೆ ನೀ ಕೇಳಿ ಯಶೋದೆ                                               ಅ.ಪ.

ಬಾಲಕನೆಂದು ಲಾಲಿಸಿ ಕರೆದರೆ
ಮೂಲೆ ಮನೆಯೊಳಗೆ ಪೊಕ್ಕು
ಪಾಲು ಬೆಣ್ಣೆ ಮೊಸರೆಲ್ಲವ ಮೆದ್ದು
ಕೋಲಲ್ಲಿ ನೀರ ಕೊಡವ ಒಡೆದನೇ
ಅಸಲ ವರ್ಣನವ ದಿಟ್ಟ ನಿತ್ಯ ಇವನ ಹೋರಾಟ
ಹೆಬ್ಬಾಲೆಯರಲ್ಲಿ ನೋಟ ಬಹಳ ಬಗೆಯಲಿ
ಪಿಡಿದೆವೆಂದರೆ ಮೇಲಿಯಂಜಲುಗಳವೋಡಿದಾ
ಅಮ್ಮ ಇದು ಚೆನ್ನಾಯಿತು                                                                                        ೧

ಮತ್ತೆ ಭಾಮಿನಿಯರೆಲ್ಲರು ಕೂಡಿ
ಮಡುವಿನಲ್ಲಿ ಜಲಕ್ರೀಡೆಯಾಡಲು
ಚಿತ್ತಚೋರ ಸೀರೆಗಳನೆಲ್ಲವ-
ನೆತ್ತಿಕೊಂಡು ಮುರನನೇರಿದನವ್ವಾ
ಬೆತ್ತಲೆ ಭಾಮೆಯರೆಲ್ಲ ಬೇಡಿದರೆ ಕೊಡನಲ್ಲ
ಈ ಯುಕ್ತಿಗಳ ಬಹುಬಲ್ಲ
ಹತ್ತಿಲಿ ಬಂದು ಕರವೆತ್ತಿ ಮುಗಿದರೆ
ವಸ್ತ್ರಗಳೆಲ್ಲವ ಕೊಡುವೆನೆಂದನೇ ಅಮ್ಮ                                                                        ೨

ಸದ್ದುಮಾಡದೆ ಸರುಹೊತ್ತಿನಲ್ಲಿ ನಾವು
ನಿದ್ದೆಗಣ್ಣಿನಲ್ಲಿ ನಾವಿರಲು
ಮುದ್ದುಕೃಷ್ಣ ನಮ್ಮನೆಯವರಂತೆ
ಮುದದಿಂದೆನ್ನ ಕೂಡಿದನವ್ವಾ
ಎದ್ದು ನೋಡಿದೆವಲ್ಲ ಆಹ ಏನೇ ನಮ್ಮವರಲ್ಲ
ಬುದ್ಧಿ ಮೋಸ ಬಂತಲ್ಲ
ಪೊದ್ದು ಸಲ್ಲಿಸಿದೀ ಜಾರ ನೀನೆಂದರೆ
ಪರಿಹಾಸ್ಯವ ಮಾಡಿದ ರಂಗವಿಠಲನೆ ಅಮ್ಮ                                                              ೩`,
      transliteration: `Ninna magana leeleya taalalaareve naavu taralana duduku
helabaarade gopalakrishnage buddhi amma (P)

Idu chennaayitu tilidavanallave nee keli yashode (A)

Baalakanendu laalisi karedare
moole maneyolage pokku
paalu benne mosarellava meddu
kolalli neera kodava odedane
asala varnanava ditta nitya ivana horaata
hebbaaleyaralli nota bahala bageyali
pididevendare meliyanjalugalavodidaa
amma idu chennaayitu (1)

Matte bhaaminiyarellaru koodi
maduvinalli jalakreedeyaadalu
chittachora seeregalanellava-
nettikondu murananeridanavvaa
bettale bhaameyarella bedidare kodanalla
ee yuktigala bahuballa
hattili bandu karavetti mugidare
vastragalellava koduvenendane amma (2)

Saddumaadade saruhottinalli naavu
niddeganninalli naaviralu
muddukrishna nammaneyavarante
mudadindenna koodidanavvaa
eddu nodidevalaa aaha ene nammavaralla
buddhi mosa bantalla
poddu sallisidee jaara neenendare
parihaasyava maadida rangavithalane amma (3)`,
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
      english: `We cannot bear the mischievous pranks of your son. Mother, won't you talk some sense into Gopalakrishna? (Pallavi)

This is not good at all, Yashoda, you should understand and listen. (Anupallavi)

If we affectionately call him thinking he is just a child, he sneaks into the corner room, eats all the milk, butter, and curds, and breaks the water pots with a stick. He acts so bold every day, picking fights and throwing various glances at the young women. When we try to catch him, he slips away easily! Oh Mother, this is not good. (1)

When all the young women gathered and were playing in the pond, this heart-stealer took all their sarees and climbed a tree. Even when the naked women begged him, he wouldn't return them. He knows many such tricks! He said he would only return the clothes if they came near and folded their hands in prayer. Oh Mother! (2)

In the middle of the night, when we were half-asleep, the lovely Krishna silently came and embraced us as if he were our own husband. When we woke up and realized, "Oh, this is not my husband, my mind has been deceived!", and accused him of being a thief, Ranga Vithala just laughed it off and mocked us. Oh Mother! (3)`,
      kannadaMeaning: `ನಿನ್ನ ಮಗನ ಲೀಲೆಗಳನ್ನು ಮತ್ತು ಆ ಬಾಲಕನ ತುಂಟಾಟಗಳನ್ನು ನಾವು ಸಹಿಸಲಾರೆವು. ಅಮ್ಮಾ, ನೀನು ಗೋಪಾಲಕೃಷ್ಣನಿಗೆ ಬುದ್ಧಿ ಹೇಳಬಾರದೇ? (ಪಲ್ಲವಿ)

ಯಶೋದೆ, ಇದು ಒಳ್ಳೆಯದಲ್ಲ, ನಿನಗೆ ತಿಳಿದಿಲ್ಲವೇ, ನೀನು ಕೇಳು. (ಅನುಪಲ್ಲವಿ)

ಅವನು ಚಿಕ್ಕ ಬಾಲಕನೆಂದು ಪ್ರೀತಿಯಿಂದ ಕರೆದರೆ, ಮನೆಯ ಮೂಲೆಯ ಒಳಗೆ ನುಗ್ಗಿ, ಹಾಲು, ಬೆಣ್ಣೆ ಮತ್ತು ಮೊಸರನ್ನೆಲ್ಲಾ ತಿಂದು, ಕೋಲಿನಿಂದ ನೀರಿನ ಮಡಕೆಗಳನ್ನು ಒಡೆಯುತ್ತಾನೆ. ಪ್ರತಿದಿನ ಅವನದು ಇದೇ ಹೋರಾಟ; ಯುವತಿಯರತ್ತ ಬಗೆಬಗೆಯ ನೋಟ ಬೀರುತ್ತಾನೆ. ಅವನನ್ನು ಹಿಡಿಯೋಣವೆಂದರೆ, ಸುಲಭವಾಗಿ ತಪ್ಪಿಸಿಕೊಂಡು ಓಡಿಹೋಗುತ್ತಾನೆ! ಅಮ್ಮಾ, ಇದು ಒಳ್ಳೆಯದಲ್ಲ. (೧)

ಹೆಣ್ಣುಮಕ್ಕಳೆಲ್ಲಾ ಸೇರಿ ಮಡುವಿನಲ್ಲಿ ಜಲಕ್ರೀಡೆ ಆಡುತ್ತಿರುವಾಗ, ಈ ಚಿತ್ರಚೋರನು ಅವರೆಲ್ಲರ ಸೀರೆಗಳನ್ನು ಎತ್ತಿಕೊಂಡು ಮರವೇರಿದನವ್ವಾ. ಬೆತ್ತಲೆ ನಿಂತ ಆ ಹೆಣ್ಣುಮಕ್ಕಳು ಬೇಡಿಕೊಂಡರೂ ಬಟ್ಟೆ ಕೊಡಲಿಲ್ಲ, ಇಂತಹ ಯುಕ್ತಿಗಳು ಅವನಿಗೆ ಬಹಳ ಗೊತ್ತು. "ಹತ್ತಿರ ಬಂದು ಕೈಮುಗಿದರೆ ಮಾತ್ರ ವಸ್ತ್ರಗಳನ್ನು ಕೊಡುತ್ತೇನೆ" ಎಂದನಮ್ಮಾ! (೨)

ರಾತ್ರಿಯ ಹೊತ್ತಿನಲ್ಲಿ ನಾವು ನಿದ್ದೆಗಣ್ಣಿನಲ್ಲಿದ್ದಾಗ, ಸದ್ದು ಮಾಡದೆ ಬಂದ ಮುದ್ದುಕೃಷ್ಣನು ನಮ್ಮ ಸ್ವಂತ ಗಂಡನಂತೆ ಪ್ರೀತಿಯಿಂದ ನಮ್ಮೊಡನೆ ಬೆರೆತನು. ಎಚ್ಚೆತ್ತು ನೋಡಿದಾಗ "ಆಹಾ, ಇವನು ನಮ್ಮವನಲ್ಲ, ನನ್ನ ಬುದ್ಧಿಗೆ ಮೋಸವಾಯಿತಲ್ಲ!" ಎಂದು ತಿಳಿದು, "ನೀನು ಕಳ್ಳ" ಎಂದು ಆರೋಪಿಸಿದರೆ, ಆ ರಂಗವಿಠಲನು ನಮ್ಮನ್ನು ನೋಡಿ ಪರಿಹಾಸ್ಯ ಮಾಡಿದನಮ್ಮಾ! (೩)`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
