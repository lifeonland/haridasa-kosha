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
  const ragaName = "Anandabhairavi";
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

  const compId = "sripadaraja-drushti-taakito";

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
      title: "Drushti Taakito Beedi Muttabyadavo",
      firstLine: "Drushti taakito beedi muttabyadavo",
      lyrics: `ದೃಷ್ಟಿ ತಾಕೀತೋ ಬೀದಿ ಮುಟ್ಟಬ್ಯಾಡವೋ
ಸೃಷ್ಟಿಯ ನಾರಿಯರೆಲ್ಲ ಕಣ್ಣಿಟ್ಟು ಹೀರುವರೋ ನಿನ್ನ                                                                    ಪ.

ಪುಟ್ಟ ಪದಕಮಲದಿ ಮೆಟ್ಟಿ ರತುನ ಪಾದುಕಾ
ಇಟ್ಟ ಕಿರುಗೆಜ್ಜೆ ಪೆಂಡೆ ದಿಟ್ಟತನದಿ
ಘಟ್ಟಿ ಸಾವಿರ ಬಾಳುವ ಪಟ್ಟಿಯನೆ ಬಿಗಿ
ದುಟ್ಟು ಮೇಗಿಲ್ಲದೆ ಬೆಲೆಯಾದ ಪಟ್ಟದುಡುದಾರವಿಟ್ಟು                                                               ೧

ಸಿರಿಯಿರುವ ಉರದಲ್ಲಿ ಪರಿಮಳ ಗಂಧವ ಪೂಸಿ
ಪರಿಪರಿ ಪದಕ ಮುತ್ತು ಸರ ವೈಜಯಂತಿ
ಕೊರಳ ಕೌಸ್ತುಭದ ಕಾಂತಿ ನಿರುಪಮ ಶ್ರೀವತ್ಸಲಾಂಛನ
ಸರಿಗೆ ತಾಳಿ ಪದಕವು ಸೇರಿದ ಮುತ್ತಿನ ಜಲ್ಲೆ                                                                      ೨

ಉಗುರ ಗೋರಂಟಿ ಛಾಯಾ ಚಿಗುರು ಪೋಲುವ ಬೆರಳು
ಬಗೆಬಗೆ ರತುನಗಳ ನಗರಗಳನಿಟ್ಟು
ನಗವನೆತ್ತಿದ ಭುಜಕೆ ಬಿಗಿದ ಬಾಹುಪುರಿ ಕೆಂಪು
ನಿಗಿನಿಗುಟ್ಟುವ ಕಾಂತಿ ನಗುತಿದೆ ಬಾಲ ಭಾನುವ                                                                  ೩

ಎಳಮಾವಿನ ಸೊಬಗಿನ ತಳಿರುಪೋಲುವ ಕೆಂಡುಟಿ
ಸುಲಿಪಲ್ಲು ಮಂದಹಾಸವು ನಳಿನದಳಾಕ್ಷ
ಧಳಧಳಿಪ ಕುಂಡಲವು ಪೊಳವ ನಾಸಿಕ ಲಲಾಟ
ಚೆಲುವ ಪುಬ್ಬು ಕಸ್ತೂರಿಯ ತಿಲಕ ಒಪ್ಪುವ ಮುಖದಿ                                                             ೪

ಕೋಟಿ ಹೊನ್ನು ಬಾಳುವ ಕಿರೀಟವಿಟ್ಟು ಕಡೆಗಣ್ಣ
ನೋಟದಿಂದ ತರುಣೇರ ಪೋಟಿ ಮಾಡುತ
ಚಾಟುಮಾತುಗಳಾಡುತ ಪೊಟ್ಟನಂತೆ ತಿರುಗಿದರೆ
ನೀಟಲವೊ ನಿನಗಿದು ಪಾಟಲಾಧರನೆ ಕೇಳು                                                                      ೫

ಬಿಂಕದಿಂದ ಎರಡು ಕರದಿ ಶಂಖ ಚಕ್ರವ ಪಿಡಿದು
ಅಂಕಿತ ವೇಣುನೂದುತ ಶಂಕೆ ಇಲ್ಲದೆ
ಮಂಕು ಮಾಡುತ ಬಾಲೇರ ಪಂಕಜಾಕ್ಷ ಸುಳಿದರೆ
ಮಂಕುಗಾರನೆಂದು ನಿನ್ನ ಅಂಕಿತ ಮಾಡುವರಲ್ಲೋ                                                              ೬

ಮಂಗಲಮೂರುತಿ ಮುಂಚೆ ಶೃಂಗಾರಗಳನೆ ಮಾಡಿ
ಪೊಂಗೊಳಲನೂದುತ ಶ್ರೀರಂಗ ಸುಳಿದರೆ
ಹೆಂಗಳ ರಂಭೇರೊಂದಾಗಿ ಕಂಗಳಿಡಲು ಉನ್ನಂತ
ರಂಗವಿಠಲಗಲದಿರೋ ಹಿಂಗದೆ ನರಸಿಂಗನೇ                                                                      ೭`,
      transliteration: `Drushti taakito beedi muttabyadavo
srushtiya naariyarella kannittu heeruvaro ninna (P)

Putta padakamaladi metti ratuna paadukaa
itta kirugejje pende dittatanadi
ghatti saavira baaluva pattiyane bigi
duttu megillade beleyaada pattadududaaravittu (1)

Siriyiruva uradalli parimala gandhava poosi
paripari padaka muttu sara vaijayanti
korala kaustubhada kaanti nirupama shrivatsalaanchana
sarige taali padakavu serida muttina jalle (2)

Ugura goranti chaaya chiguru poluva beralu
bagebage ratunagala nagaragalunittu
nagavanettida bhujake bigida baahupuri kempu
niginiguttuva kaanti nagutide baala bhaanuva (3)

Elamaavina sobagina talirupoluva kenduti
sulipallu mandahaasavu nalinadalaaksha
dhaladhalipa kundalavu polava naasika lalaata
cheluva pubbu kasturiya tilaka oppuva mukhadi (4)

Koti honnu baaluva kireetavittu kadeganna
notadinda tarunera poti maaduta
chaatumaatugalaaduta pottanante tirugidare
neetalavo ninagidu paatalaadharane kelu (5)

Binkadinda eradu karadi shankha chakrava pididu
ankita venunooduta shanke illade
manku maaduta baalera pankajaaksha sulidare
mankugaaranendu ninna ankita maaduvarallo (6)

Mangalamooruti munche shrungaaragalane maadi
pongolalanooduta shriranga sulidare
hengala ramberondaagi kangalidalu unnanta
rangavithalagaladiro hingade narasingane (7)`,
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
      english: `Mother Yashoda affectionately tells child Krishna: "Do not go out into the street, my child, you might catch the evil eye! All the women of the world will stare at you and drain your beauty with their eyes." (Pallavi)

"On your small lotus feet, you wear gem-studded sandals, small jingling anklets, and a strong waist-band worth thousands, tied firmly over your precious silk clothes." (1)

"On your chest where Goddess Siri (Lakshmi) resides, you have smeared fragrant sandalwood paste. You wear various pendants, pearl necklaces, the Vaijayanti garland, the radiant Kaustubha gem on your neck, the matchless Srivatsa mark, and chains of pearls." (2)

"Your fingernails shine like henna, your fingers are like tender shoots, adorned with various gem-studded rings. On your shoulders that lifted the mountain (Govardhana), you wear tight armlets, glowing red like the rising sun." (3)

"Your lips are like tender mango leaves, your teeth are like jasmine buds, you have a gentle smile and lotus-like eyes. You wear dazzling earrings, your nose and forehead are shining, and your face is adorned with beautiful eyebrows and a musk (kasturi) tilaka." (4)

"Wearing a crown worth a crore of gold coins, casting sidelong glances, competing with the young women, speaking sweet words, if you wander around like an innocent boy, it is not proper for you, listen O Lord with red lips!" (5)

"Proudly holding the conch and discus in your two hands, playing your signature flute without hesitation, if you wander around mesmerizing the young girls, O lotus-eyed one, they will brand you as a mesmerizer (Mankugaara)." (6)

"O auspicious form, if Sri Ranga wanders around playing the golden flute after being dressed up so beautifully, women will stare at you like Rambhas. Therefore, do not leave Sri Ranga Vithala (Narasimha) even for a moment." (7)`,
      kannadaMeaning: `ತಾಯಿ ಯಶೋದೆಯು ಬಾಲಕೃಷ್ಣನಿಗೆ ಪ್ರೀತಿಯಿಂದ ಹೇಳುತ್ತಿದ್ದಾಳೆ: "ಬೀದಿಗೆ ಹೋಗಬೇಡವೋ ಮಗುವೇ, ನಿನಗೆ ದೃಷ್ಟಿ ತಾಕೀತು! ಈ ಸೃಷ್ಟಿಯ ಎಲ್ಲಾ ಹೆಂಗಸರು ತಮ್ಮ ಕಣ್ಣುಗಳಿಂದ ನಿನ್ನ ಸೌಂದರ್ಯವನ್ನು ಹೀರಿಬಿಡುತ್ತಾರೆ." (ಪಲ್ಲವಿ)

"ನಿನ್ನ ಪುಟ್ಟ ಪಾದಕಮಲಗಳಲ್ಲಿ ರತ್ನದ ಪಾದುಕೆಗಳನ್ನು ಮೆಟ್ಟಿ, ಕಿರುಗೆಜ್ಜೆಗಳನ್ನು ಧರಿಸಿ, ಸಾವಿರಾರು ಬೆಲೆಬಾಳುವ ಪಟ್ಟಿಯನ್ನು ಬಿಗಿದು, ಅದರ ಮೇಲೆ ಬೆಲೆಬಾಳುವ ಪಟ್ಟೆಯ ಉಡುದಾರವನ್ನು ಕಟ್ಟಿಕೊಂಡಿದ್ದೀಯೆ." (೧)

"ಸಿರಿ (ಲಕ್ಷ್ಮಿ) ನೆಲೆಸಿರುವ ನಿನ್ನ ಎದೆಯ ಮೇಲೆ ಪರಿಮಳಯುಕ್ತ ಗಂಧವನ್ನು ಪೂಸಿದ್ದೀಯೆ. ಬಗೆಬಗೆಯ ಪದಕಗಳು, ಮುತ್ತಿನ ಸರ, ವೈಜಯಂತಿ ಮಾಲೆ, ಕೊರಳಲ್ಲಿ ಕೌಸ್ತುಭ ಮಣಿಯ ಕಾಂತಿ, ಸಾಟಿಯಿಲ್ಲದ ಶ್ರೀವತ್ಸ ಲಾಂಛನ, ಮತ್ತು ಮುತ್ತಿನ ಜಾಲರಿಗಳನ್ನು ಧರಿಸಿದ್ದೀಯೆ." (೨)

"ನಿನ್ನ ಉಗುರುಗಳು ಗೋರಂಟಿಯ ಬಣ್ಣದಂತಿವೆ, ಬೆರಳುಗಳು ಚಿಗುರಿನಂತಿವೆ, ಬಗೆಬಗೆಯ ರತ್ನದ ಉಂಗುರಗಳನ್ನು ಇಟ್ಟಿದ್ದೀಯೆ. ಬೆಟ್ಟವನ್ನು ಎತ್ತಿದ ನಿನ್ನ ಭುಜಗಳಿಗೆ ಬಿಗಿದ ತೋಳ್ಬಂದಿಗಳು ಎಳೆಯ ಸೂರ್ಯನಂತೆ ಕೆಂಪಾಗಿ ಹೊಳೆಯುತ್ತಿವೆ." (೩)

"ಎಳೆಯ ಮಾವಿನ ಚಿಗುರಿನಂತಹ ಕೆಂಪು ತುಟಿಗಳು, ಮಲ್ಲಿಗೆಯಂತಹ ಹಲ್ಲುಗಳು, ಮಂದಹಾಸ, ಕಮಲದಂತಹ ಕಣ್ಣುಗಳು. ಥಳಥಳಿಸುವ ಕುಂಡಲಗಳು, ಹೊಳೆಯುವ ಮೂಗು ಮತ್ತು ಹಣೆ, ಸುಂದರವಾದ ಹುಬ್ಬುಗಳು ಮತ್ತು ಕಸ್ತೂರಿ ತಿಲಕದಿಂದ ನಿನ್ನ ಮುಖವು ಕಂಗೊಳಿಸುತ್ತಿದೆ." (೪)

"ಕೋಟಿ ಹೊನ್ನಿನ ಬೆಲೆಬಾಳುವ ಕಿರೀಟವನ್ನು ಧರಿಸಿ, ಕಡೆಗಣ್ಣಿನ ನೋಟದಿಂದ ಯುವತಿಯರೊಂದಿಗೆ ಸ್ಪರ್ಧಿಸುತ್ತಾ, ಸಿಹಿಮಾತುಗಳನ್ನು ಆಡುತ್ತಾ ಮುಗ್ಧನಂತೆ ತಿರುಗಾಡಿದರೆ, ಅದು ನಿನಗೆ ಶೋಭಿಸುವುದಿಲ್ಲ, ಕೇಳು ಕೆಂಪು ತುಟಿಯವನೇ!" (೫)

"ಹೆಮ್ಮೆಯಿಂದ ಎರಡು ಕೈಗಳಲ್ಲಿ ಶಂಖ ಮತ್ತು ಚಕ್ರವನ್ನು ಹಿಡಿದು, ನಿಸ್ಸಂಕೋಚವಾಗಿ ಕೊಳಲನ್ನು ಊದುತ್ತಾ, ಯುವತಿಯರನ್ನು ಮರುಳು ಮಾಡುತ್ತಾ ಸುಳಿದಾಡಿದರೆ, ಅವರು ನಿನ್ನನ್ನು 'ಮರುಳು ಮಾಡುವವನು' (ಮಂಕುಗಾರ) ಎಂದು ಅಂಕಿತ ಮಾಡಿಬಿಡುತ್ತಾರೆ!" (೬)

"ಮಂಗಳಮೂರ್ತಿಯೇ, ಇಷ್ಟು ಸುಂದರವಾಗಿ ಶೃಂಗಾರಗೊಂಡು, ಚಿನ್ನದ ಕೊಳಲನ್ನೂದುತ್ತಾ ಶ್ರೀರಂಗನು ಸುಳಿದಾಡಿದರೆ, ಹೆಂಗಸರೆಲ್ಲಾ ರಂಭೆಯರಂತೆ ನಿನ್ನನ್ನೇ ನೋಡುತ್ತಾರೆ. ಆದ್ದರಿಂದ ರಂಗವಿಠಲನಿಂದ (ನರಸಿಂಹನಿಂದ) ಎಂದಿಗೂ ಅಗಲದಿರು." (೭)`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
