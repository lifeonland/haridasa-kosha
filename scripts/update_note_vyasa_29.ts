import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const id = 'vyasatirtha-29';

  const composition = await prisma.composition.findUnique({
    where: { id }
  });
  
  if (!composition) {
      console.log("Composition not found!");
      return;
  }

  const newLyrics = composition.lyrics + `\n\n(ಗಮನಿಸಿ: ಈ ಕೀರ್ತನೆಯನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಪುರಂದರದಾಸರ ರಚನೆ ಎಂದು ಹಾಡಲಾಗುತ್ತದೆ, ಕೆಲವು ಕಡೆ ವ್ಯಾಸರಾಜರ ಅಂಕಿತದಲ್ಲೂ ಉಲ್ಲೇಖವಿದೆ).`;
  
  const newTransliteration = composition.transliteration + `\n\n(Note: This kirtana is generally sung as a composition of Purandara Dasa, but in some places, it is also referenced with Vyasaraja's ankita).`;

  await prisma.composition.update({
    where: { id },
    data: {
      lyrics: newLyrics,
      transliteration: newTransliteration
    }
  });

  let translation = await prisma.translation.findFirst({
      where: { compositionId: id }
  });
  
  if (translation) {
     const newEnglish = translation.english + `\n\n(Note: This kirtana is generally sung as a composition of Purandara Dasa, but in some places, it is also referenced with Vyasaraja's ankita).`;
     await prisma.translation.update({
         where: { id: translation.id },
         data: { english: newEnglish }
     });
  }

  console.log('Successfully updated note for ' + id + '!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
