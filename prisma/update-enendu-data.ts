import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Enendu Kondadi Stutisalo Deva (kanaka-list-23)...');

  const lyrics = `ಏನೆಂದು ಕೊಂಡಾಡಿ ಸ್ತುತಿಸಲೋ ದೇವನಾನೇನು
ಬಲ್ಲೆ ನಿನ್ನ ಮಹಿಮೆಗಳ ಮಾಧವ ||ಪ||

ಹರಿಮುಕುಂದನು ನೀನು ನರಜನ್ಮ ಹುಳು ನಾನು
ಪರಮಾತ್ಮನು ನೀನು ಪಾಮರನು ನಾನು
ಗರುಡ ಗಮನನು ನೀನು ಮರುಳು ಪಾಪಿಯು ನಾನು
ಪರಂಜ್ಯೋತಿಯು ನೀನು ದುರುಳ ತಿರುಕನು ನಾನು ||೧||

ವಾರಿಧಿಶಯನನಾದ ಕಾರುಣ್ಯನಿಧಿ ನೀನು
ಘೋರದಿಂದಿಹ ಕಾಮಿಕ್ರೋಧಿ ನಾನು
ಈರೇಳು ಭುವನದೊಳು ಇರುವ ಮೂರುತಿ ನೀನು
ದೂರಿ ನಿನ್ನನು ಬೈವ ದುಷ್ಟ ನಾನು ||೨||

ಅಣುರೇಣು ತೃಣಗಳಲಿ ಪರಿಪೂರ್ಣನು ನೀನು
ಕ್ಷಣಕ್ಷಣಕೆ ಅವಗುಣದ ಕುಕರ್ಮಿ ನಾನು
ವಾಣಿಯರಸನ ಪೆತ್ತ ವೈಕುಂಠಪತಿ ನೀನು
ಕ್ಷಣಭಂಗುರ ತನುವಿನ ಗೊಂಬೆ ನಾನು ||೩||

ಕಂಬದಲಿ ಬಂದ ಆನಂದ ಮೂರುತಿ ನೀನು
ನಂಬಿಕೆಯಿಲ್ಲದ ಪ್ರಪಂಚಕನು ನಾನು
ಅಂಬರೀಷಗೆ ಒಲಿದ ಅಕ್ರೂರಸಖ ನೀನು
ಡಂಬ ಕರ್ಮಿಯು ನಾನು ನಿರ್ಜಿತನು ನೀನು ||೪||

ತಿರುಪತಿಯ ವಾಸ ಶ್ರೀವೆಂಕಟೇಶನೆ ನಿನ್ನ
ಚರಣಸೇವಕರ ಸೇವಕನು ನಾನು
ಬಿರುದುಳ್ಳವನು ನೀನು ಮೊರೆಹೊಕ್ಕವನು ನಾನು
ಸಿರಿ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನು ನೀನು ||೫||`;

  // As the source did not provide an English translation, I am creating a paragraph-wise summary based on the lyrical content.
  const translation = `Chorus: Oh Madhava, what words can I use to praise and celebrate You? I do not know the extent of Your greatness.

Verse 1: You are Hari, the giver of liberation (Mukunda), while I am but a lowly insect in this human birth. You are the Supreme Soul (Paramatma), while I am a simpleton. You are the one who rides Garuda, while I am a foolish sinner. You are the Supreme Light, while I am a wretched beggar.

Verse 2: You are the treasure of compassion who rests upon the ocean, while I am consumed by terrible lust and anger. You are the form that resides in all the fourteen worlds, while I am a wicked person who blames and insults You.

Verse 3: You are complete and perfect, residing in every atom and blade of grass, while I am a sinner filled with flaws at every moment. You are the Lord of Vaikuntha, who gave birth to the Lord of speech (Brahma), while I am but a fragile doll of this fleeting body.

Verse 4: You are the form of bliss that emerged from the pillar, while I am a worldly person lacking true faith. You are the friend of Akrura and the one beloved by Ambarisha, while I am a performer of vain deeds and am conquered by my own mind.

Verse 5: Oh Sri Venkatesha, who resides in Tirupati, I am the servant of Your servants. You are the one with great titles, and I am the one who has sought Your refuge. You are the Lord of Kaginele, Adi Keshava.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-23' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-23' }
  });

  if (existingTranslation) {
    await prisma.translation.update({
      where: { id: existingTranslation.id },
      data: { english: translation },
    });
    console.log('✅ Translation updated successfully!');
  } else {
    await prisma.translation.create({
      data: {
        compositionId: 'kanaka-list-23',
        english: translation,
        kannadaMeaning: '-', 
        wordByWord: '-', 
      },
    });
    console.log('✅ Translation created successfully!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
