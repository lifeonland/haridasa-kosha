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
  const ragaName = "Naati";
  let raga = await prisma.raga.findUnique({ where: { name: ragaName } });
  if (!raga) {
      raga = await prisma.raga.create({ data: { name: ragaName } });
  }

  // Handle Tala
  const talaName = "Khanda Jhampe";
  let tala = await prisma.tala.findUnique({ where: { name: talaName } });
  if (!tala) {
      tala = await prisma.tala.create({ data: { name: talaName } });
  }

  const compId = "sripadaraja-shrirangavithalana-shreemakutake";

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
      title: "Shrirangavithalana Shreemakutake Sharanu",
      firstLine: "Shrirangavithalana shreemakutake sharanu",
      lyrics: `ಶ್ರೀರಂಗವಿಠಲನ ಶ್ರೀಮಕುಟಕೆ ಶರಣು                                                              ಪ.

ಶಿರದೊಳೊಪ್ಪುವ ನೀಲಕುಂತಳಕೆ ಶರಣು
ಸಿರಿಸಹೋದರನರ್ಧಫಾಲನಿಗೆ ಶರಣು                                                              ೧

ಕಂಪು ನೋಟದ ಚೆಲುವ ಸೋಗೆಗಣ್ಣಿಗೆ ಶರಣು
ಸಂಪಿಗೆಯ ಕುಸುಮಸಮ ನಾಸಿಕಕೆ ಶರಣು
ಕೆಂಪುರತ್ನದ ಕರ್ಣಕುಂಡಲಗಳಿಗೆ ಶರಣು
ಇಂಪುದರ್ಪಣ ನಿಭ ಕಪೋಲಗಳಿಗೆ ಶರಣು                                                          ೨

ಕುಂದಕುಟ್ಮಲ ಪೋಲ್ವ ದಂತಪಂಕ್ತಿಗೆ ಶರಣು
ಚಂದವಾಗಿರುವ ಬಿಂಬೋಷ್ಠಕೆ ಶರಣು
ಚಂದ್ರಿಕಾನಿಭ ಮುದ್ದು ಮಂದಹಾಸಕೆ ಶರಣು
ನಂದಗೋಪನ ಮುದ್ದುಕಂದನಿಗೆ ಶರಣು                                                          ೩

ಅಬ್ಜನಾಭನ ದಿವ್ಯ ಕಂಬುಕಂಠಕೆ ಶರಣು
ಅಬ್ಜಮುಖಿಯಿರುವ ವಕ್ಷಸ್ಥಲಕೆ ಶರಣು
ಕುಬ್ಜೆಯಾ ಡೊಂಕ ತಿದ್ದಿದ ಭುಜಗಳಿಗೆ ಶರಣು
ಅಬ್ಜಶಾಸನನ ಪೆತ್ತ ನಾಭಿಗೆ ಶರಣು                                                                  ೪

ರತ್ನಗಂಟೆಗಳಿರುವ ನಿನ್ನ ಕಟಿಗೆ ಶರಣು
ಪೊನ್ನ ಕದಳೀಪೋಲ್ವ ತೊಡೆಗಳಿಗೆ ಶರಣು
ಪುನ್ನಾಗಕರಗೆತ್ತ ದ್ವಯನಿತಂಬಕೆ ಶರಣು
ಚೆನ್ನಾಗಿ ಕುಣಿಪ ಸಮಜಾನುವಿಗೆ ಶರಣು                                                           ೫

ಮಂಗಳ ವೈಭೋಗಂಗಳ ಅಂಘ್ರಿದ್ವಯಕೆ ಶರಣು
ತುಂಗ ಕುಚಗಳ ಪಿಡಿದ ಕರಗಳಿಗೆ ಶರಣು
ಪೊಂಗೊಳಲನೂದುವಾ ಅಂಗುಲಿಗಳಿಗೆ ಶರಣು
ರಂಗವಿಠಲನ ಸರ್ವಾಂಗಕೆ ಶರಣು                                                                  ೬`,
      transliteration: `Shrirangavithalana shreemakutake sharanu (P)

Shiradoloppuva neelakuntalake sharanu
sirisahodaranardhaphaalanige sharanu (1)

Kampu notada cheluva sogegannige sharanu
sampigeya kusumasama naasikake sharanu
kempuratnada karnakundalagalige sharanu
impudarpana nibha kapolagalige sharanu (2)

Kundakutmala polva dantapanktige sharanu
chandavaagiruva bimboshtake sharanu
chandrikaanibha muddu mandahaasake sharanu
nandagopana muddukandanige sharanu (3)

Abjanaabhana divya kambukantake sharanu
abjamukhiyiruva vakshasthalake sharanu
kubjeyaa donka tiddida bhujagalige sharanu
abjashaasanana petta naabhige sharanu (4)

Ratnagantegaliruva ninna katige sharanu
ponna kadaleepolva todegalige sharanu
punnaagakaragetta dvayanitambake sharanu
chennaagi kunipa samajaanuvige sharanu (5)

Mangala vaibhogangala anghridvayake sharanu
tunga kuchagala pidida karagalige sharanu
pongolalanooduvaa anguligalige sharanu
rangavithalana sarvaangake sharanu (6)`,
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
      english: `I bow to the divine crown of Sri Ranga Vithala! (Pallavi)

I bow to the beautiful dark curls of hair adorning His head. I bow to the one with a half-moon like forehead, brother of Goddess Siri. (1)

I bow to His beautiful, compassionate eyes resembling peacock feathers. I bow to His nose, which is like a Champaka flower. I bow to His ear-ornaments made of red gems. I bow to His cheeks that shine like beautiful mirrors. (2)

I bow to His row of teeth that look like jasmine buds. I bow to His beautiful Bimba-fruit like lips. I bow to His sweet smile that shines like moonlight. I bow to the beloved child of Nanda Gopa. (3)

I bow to the divine, conch-like neck of Padmanabha. I bow to His chest where the lotus-faced Goddess resides. I bow to the shoulders that straightened the hunchback Kubja. I bow to the navel that gave birth to Brahma (who sits on a lotus). (4)

I bow to Your waist adorned with gem-studded bells. I bow to Your thighs that resemble golden banana trunks. I bow to the beautiful, matching knees that dance so well. (5)

I bow to the two feet that bring auspiciousness and joy. I bow to the hands that hold the high mountains. I bow to the fingers that play the golden flute. I bow to every single part of Ranga Vithala's body! (6)`,
      kannadaMeaning: `ಶ್ರೀ ರಂಗವಿಠಲನ ದಿವ್ಯ ಕಿರೀಟಕ್ಕೆ ಶರಣು! (ಪಲ್ಲವಿ)

ಅವನ ತಲೆಯ ಮೇಲೆ ಶೋಭಿಸುವ ಕಪ್ಪಾದ ಗುಂಗುರು ಕೂದಲಿಗೆ ಶರಣು. ಚಂದ್ರನಂತಹ (ಸಿರಿಯ ಸಹೋದರನ) ಅರ್ಧ ಹಣೆಯುಳ್ಳವನಿಗೆ ಶರಣು. (೧)

ಕರುಣೆಯ ನೋಟವುಳ್ಳ, ನವಿಲುಗರಿಯಂತಹ ಸುಂದರ ಕಣ್ಣುಗಳಿಗೆ ಶರಣು. ಸಂಪಿಗೆ ಹೂವಿನಂತಹ ಮೂಗಿಗೆ ಶರಣು. ಕೆಂಪು ರತ್ನದ ಕಿವಿಯೋಲೆಗಳಿಗೆ ಶರಣು. ಕನ್ನಡಿಯಂತೆ ಹೊಳೆಯುವ ಸುಂದರ ಕೆನ್ನೆಗಳಿಗೆ ಶರಣು. (೨)

ಮಲ್ಲಿಗೆಯ ಮೊಗ್ಗಿನಂತಿರುವ ಹಲ್ಲುಗಳ ಸಾಲಿಗೆ ಶರಣು. ಚಂದವಾದ ಬಿಂಬಫಲದಂತಹ ತುಟಿಗಳಿಗೆ ಶರಣು. ದಿಂಗಳ ಬೆಳಕಿನಂತೆ ಹೊಳೆಯುವ ಮುದ್ದಾದ ಮಂದಹಾಸಕ್ಕೆ ಶರಣು. ನಂದಗೋಪನ ಮುದ್ದುಕಂದನಿಗೆ ಶರಣು. (೩)

ಕಮಲನಾಭನ ಶಂಖದಂತಹ ದಿವ್ಯ ಕುತ್ತಿಗೆಗೆ ಶರಣು. ಕಮಲಮುಖಿಯಾದ ಲಕ್ಷ್ಮಿಯು ನೆಲೆಸಿರುವ ಎದೆಗೆ ಶರಣು. ಕುಬ್ಜೆಯ ಡೊಂಕನ್ನು ತಿದ್ದಿದ ಆ ಭುಜಗಳಿಗೆ ಶರಣು. ಬ್ರಹ್ಮನಿಗೆ ಜನ್ಮ ನೀಡಿದ ನಾಭಿಗೆ (ಹೊಕ್ಕುಳಿಗೆ) ಶರಣು. (೪)

ರತ್ನದ ಗಂಟೆಗಳಿರುವ ನಿನ್ನ ಸೊಂಟಕ್ಕೆ ಶರಣು. ಚಿನ್ನದ ಬಾಳೆಯ ಕಂಬದಂತಿರುವ ತೊಡೆಗಳಿಗೆ ಶರಣು. ಸುಂದರವಾಗಿ ಕುಣಿಯುವ ಸಮವಾದ ಮೊಣಕಾಲುಗಳಿಗೆ ಶರಣು. (೫)

ಮಂಗಳವನ್ನು ಮತ್ತು ವೈಭೋಗವನ್ನು ತರುವ ಎರಡು ಪಾದಗಳಿಗೆ ಶರಣು. ಬೆಟ್ಟಗಳನ್ನು ಎತ್ತಿ ಹಿಡಿದ ಆ ಕೈಗಳಿಗೆ ಶರಣು. ಚಿನ್ನದ ಕೊಳಲನ್ನೂದುವ ಆ ಬೆರಳುಗಳಿಗೆ ಶರಣು. ರಂಗವಿಠಲನ ಸರ್ವಾಂಗಕ್ಕೂ (ಇಡೀ ದೇಹಕ್ಕೂ) ಶರಣು! (೬)`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
