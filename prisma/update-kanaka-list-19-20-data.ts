import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translations for kanaka-list-19 and kanaka-list-20...');

  // --- 1. Aaru Ballaru Hari Harara Mahimeyanu (kanaka-list-19) ---
  const lyrics19 = `ಆರು ಬಲ್ಲರು ಹರಿ ಹರರ ಮಹಿಮೆಯನು
ವಾರಿಜೋದ್ಭವ ಸುರೇಂದ್ರಾದಿಗಳಿಗಳವಲ್ಲ ||ಪ||

ಪೌರತ್ರಯವ ಗೆಲುವ ಸಮಯದಲಿ ತಪವಮಾಡಿ
ನಾರಾಯಣಾಸ್ತ್ರವನು ಪಡೆದನೀತ
ಗೌರಿಮನೋಹರನ ಘನತರಾರ್ಚನೆಗೈದು
ಚಾರುತರ ಚಕ್ರವನು ಪಡೆದನಾ ಶೌರಿ ||೧||

ಬಲಿ ಚಕ್ರವರ್ತಿ ಭಕ್ತಿಗೆ ಮೆಚ್ಚಿ ಅವನ ಬಾ
ಗಿಲಕಾಯ್ದನಚ್ಯುತನು ಅನುಗಾಲದಿ
ಬಲಭುಜನು ಬಾಣಾಸುರನ ಗೃಹದ್ವಾರವನು
ಬಳಸಿ ಕಾಯ್ದನು ಹರನು ವರವ ತಾನಿತ್ತು ||೨||

ಭೋಗಿಶಯನನು ಆಗಿ ಭೋಗಿಭೂಷಣನಾಗಿ
ವಾಗೀಶನಾಗಿ ಸೃಷ್ಟಿ ಸ್ಥಿತಿ ಲಯಗಳಿಂಗೆ
ಆಗು ಕಾರಣ ಕಾರ್ಯ ಕರ್ಮಾದಿ ರೂಪಕ್ಕೆ
ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನ ಮಹಿಮೆಯನು ||೩||`;

  const translation19 = `Chorus: Who can know the greatness of Hari and Hara? Even Brahma (born from lotus) and Indra and others cannot know it.

Verse 1: Having performed penance at the time of winning the three cities (Tripura), he (Shiva) obtained the Narayana Astra. Having performed great worship of the one who pleases Gauri (Shiva), that Sauri (Vishnu) obtained the beautiful discus (Sudarshana Chakra).

Verse 2: Pleased by the devotion of Bali Chakravarti, Achyuta (Vishnu) guarded his door always. The strong-armed one (Vishnu) guarded the house door of Banasura, and Hara (Shiva) gave him a boon.

Verse 3: He who is the one resting on the serpent (Vishnu), and he who is the one adorned with serpents (Shiva), he who is the Lord of speech (Brahma), for creation, sustenance, and dissolution, he is the cause for action, work, and form. Such is the greatness of Kaginele Adikesava.`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-19' },
    data: { lyrics: lyrics19 },
  });

  const t19 = await prisma.translation.findFirst({ where: { compositionId: 'kanaka-list-19' } });
  if (t19) {
    await prisma.translation.update({ where: { id: t19.id }, data: { english: translation19 } });
  } else {
    await prisma.translation.create({ data: { compositionId: 'kanaka-list-19', english: translation19, kannadaMeaning: '-', wordByWord: '-' } });
  }

  // --- 2. Bayi Narida Mele Ekantave (kanaka-list-20) ---
  const lyrics20 = `ಬಾಯಿ ನಾರಿದ ಮೇಲೆ ಏಕಾಂತವೆ
ತಾಯಿ ತೀರಿದ ಮೇಲೆ ತವರಾಸೆಯೆ ||ಪ||

ಕಣ್ಣು ಕೆಟ್ಟ ಮೇಲೆ ಕಡುರೂಪ ಚೆಲ್ವಿಕೆಯೆ
ಬಣ್ಣಗುಂದಿದ ಮೇಲೆ ಬಹುಮಾನವೆ
ಪುಣ್ಯತೀರಿದ ಮೇಲೆ ಪರಲೋಕ ಸಾಧನವೆ
ಸುಣ್ಣವಿಲ್ಲದ ವೀಳ್ಯವದು ಸ್ವಾದುಮಯವೆ ||೧||

ಕಿಲುಬಿನಾ ಬಟ್ಟಲೊಳು ಹುಳಿ ಕಲಸಿ ಉಣ ಬಹುದೆ
ಚಳಿಯುರಿಗೆ ಚಂದನದ ಲೇಪ ಹಿತವೆ
ಮೊಲೆಬಿದ್ದ ಹೆಣ್ಣಿನೊಳು ಮೋಹಕ್ಕೆ ಸೊಗಸಹುದೆ
ಬೆಲೆಬಿದ್ದ ಸರಕಿನೊಳು ಲಾಭವುಂಟೆ ||೨||

ಪಥ್ಯ ಸೇರದ ಮೇಲೆ ನಿತ್ಯಸುಖವೆನಬಹುದೆ
ಸತ್ತ್ವ ತಗ್ಗಿದ ಮೇಲೆ ಸಾಮರ್ಥ್ಯವೆ
ಪೃಥ್ವಿಯೊಳು ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ ನಿನ್ನ
ಭಕ್ತಿಯಿಲ್ಲದ ನರಗೆ ಮುಕ್ತಿಯುಂಟೆ? ||೩||`;

  const translation20 = `Chorus: Is there any solitude after the mouth has become foul-smelling? Is there any longing for the maternal home after the mother has passed away?

Verse 1: Is there any beauty in a harsh form after the eyes have gone bad? Is there any reward after the color has faded? Is there any means to reach the other world after the merit (punya) has been exhausted? Is a betel leaf without lime tasty?

Verse 2: Can one eat sour food mixed in a rusted vessel? Is the application of sandalwood paste pleasant in the cold season? Is it appropriate to have desire for a woman whose breasts have sagged? Is there any profit in goods that have lost their value?

Verse 3: Can one call it eternal happiness after the diet (pathya) is not followed? Is there any capability after the strength (sattva) has diminished? In this world, O Kaginele Adikesava, is there any liberation (mukti) for a person who lacks devotion to you?`;

  await prisma.composition.update({
    where: { id: 'kanaka-list-20' },
    data: { lyrics: lyrics20 },
  });

  const t20 = await prisma.translation.findFirst({ where: { compositionId: 'kanaka-list-20' } });
  if (t20) {
    await prisma.translation.update({ where: { id: t20.id }, data: { english: translation20 } });
  } else {
    await prisma.translation.create({ data: { compositionId: 'kanaka-list-20', english: translation20, kannadaMeaning: '-', wordByWord: '-' } });
  }

  console.log('✅ Lyrics and translations for kanaka-list-19 and kanaka-list-20 updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
