import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Muttabeda Muttabeda Muraharana Dasaranu (kanaka-list-69)...');

  const lyrics = `ಮುಟ್ಟಬೇಡ ಮುಟ್ಟಬೇಡ ಮುರಹರನ ದಾಸರನು
ಕಟ್ಟು ಮಾಡಿದ ಯಮನು ತನ್ನ ದೂತರಿಗೆ ||ಪ||

ತಿರುಮಣಿ ತಿರುಚೂರ್ಣ ಶೃಂಗಾರ ಧರಿಸುವರ
ಸಿರಿ ತುಳಸಿ ವನಮಾಲೆಯಿಂದೊಪ್ಪುವ
ವರತಿರುಮಂತ್ರ ತೀರ್ಥಪ್ರಸಾದಕೊಳಗಾದವರ
ತಿರುಪತಿ ಯಾತ್ರೆಯನು ಮಾಡುವ ಮಹಾತ್ಮರ ||೧||

ಬಡವರಾಗಲಿ ಭಾಗ್ಯವಂತರಾಗಲಿ ಅವರು
ಕಡು ಕರ್ಮಿ ಘೋರಪಾತಕರಾಗಲಿ ನಡೆ
ನುಡಿಗೆ ಮಾಧವನ ಬಿಡದೆ ಕೊಂಡಾಡುವ
ಗೊಡವೆ ಬೇಡೆಂದು ಯಮಧರ್ಮ ಸಾರಿದನು ||೨||

ವಾಸುದೇವನ ವಾಸರವನಾಚರಿಸುವ
ವರ ಬೇಸರಿಸದೆ ಹರಿ ಪ್ರಸಂಗ ಮಾಳ್ಪವರ
ಶೇಷಶಯನ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ
ಕೇಶವನದಾಸಾನುದಾಸರಿಗೆ ದಾಸರಾದವರ ||೩||`;

  const translation = `Chorus: Do not touch, do not touch the servants of Murahara (Hari). Yama (the God of Death) has strictly commanded his messengers.

Verse 1: Do not touch those who wear Tirumani and Tiruchurna, who are adorned with the divine Tulasi and Vanamala. They have partaken of the holy Tirtha and Prasada, and they are the great souls who perform the pilgrimage to Tirupati.

Verse 2: Whether they are poor or wealthy, whether they have committed terrible sins in the past—if they continuously praise Madhava in their words and actions, do not meddle with them. This is the command Yama-Dharma has issued.

Verse 3: Do not touch those who observe the auspicious days of Vasudeva, who tirelessly engage in the discourse of Hari. They are the servants of the servants of Adi Keshava of Kaginele, who rests upon Shesha.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-69' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-69' }
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
        compositionId: 'kanaka-list-69',
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
