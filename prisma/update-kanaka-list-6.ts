import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಬಾಗಿಲನು ತೆರೆದು ಸೇವೆಯನು ಕೊಡೊ ಹರಿಯೆ || ಪ ||
ಕೂಗಿದರು ಧ್ವನಿ ಕೇಳಲಿಲ್ಲವೇ ನರಹರಿಯೆ || ಅ.ಪ ||

ಪರಮಪದದೊಳಗೆ ವಿಷಧರನ ತಲ್ಪದಲಿ ನೀ
ಸಿರಿಸಹಿತ ಕ್ಷೀರವಾರಿಧಿಯೊಳಿರಲು
ಕರಿರಾಜ ಕಷ್ಟದಲಿ ಆದಿಮೂಲ ಎಂದು
ಕರೆಯಲಾಕ್ಷಣ ಬಂದು ಒದಗಿದೆಯೊ ನರಹರಿಯೇ || ೧ ||

ಕಡುಕೋಪದಿಂ ಖಳನು ಖಡುಗ ಕೈಯಲಿ ಪಿಡಿದು ನಿ
ನ್ನೊಡೆಯನೆಲ್ಲಿಹನೆಂದು ಕಂಬವನು ಜಡಿಯೆ
ದೃಢಭಕುತಿಯಿಂ ಶಿಶುವು ಬಿಡದೆ ನಿನ್ನನು ಭಜಿಸೆ
ಸಡಗರದಿ ಸ್ತಂಭದಿಂದೊಡೆದೆ ನರಹರಿಯೆ || ೨ ||

ಯಮಸುತನ ರಾಣಿಗಕ್ಷಯವಸನವನಿತ್ತೆ
ಸಮಯದಲಿ ಅಜಮಿಳನ ಪೊರೆದೆ
ಸಮಾಯಾಸಮಯವುಂಟೆ ಭಕ್ತವತ್ಸಲ ನಿನಗೆ
ಕಮಾಲಾಕ್ಷ ಕಾಗಿನೆಲೆಯಾದಿ ಕೇಶವನೆ || ೩ ||`;

  const englishTranslation = `Refrain:
O Hari, open the door and grant me the opportunity to serve You.
O Narahari, did You not hear my voice even though I called out to You?

Stanza 1:
When You were in the supreme abode, resting on the serpent bed (Adisesha)
In the ocean of milk along with Goddess Lakshmi (Siri),
When the King of Elephants (Gajendra) in great distress called out "O Primordial Root" (Adimoola),
You arrived instantly to rescue him, O Narahari!

Stanza 2:
When the wicked one (Hiranyakashipu) in extreme anger held a sword in his hand
And struck the pillar asking, "Where is your Lord?",
When the child (Prahlada) with firm devotion worshipped You without ceasing,
You emerged joyfully from the pillar, O Narahari!

Stanza 3:
You granted endless robes to the queen of the son of Yama (Draupadi),
You protected Ajamila at the right moment.
Is there a right or wrong time for You, who are the lover of Your devotees?
O Lotus-eyed one, the Adikeshava of Kaginele!`;

  // Update composition with lyrics and translation
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-6' },
    data: { 
      lyrics: lyrics,
      translations: {
        updateMany: {
          where: {}, 
          data: {
            english: englishTranslation,
          }
        }
      }
    }
  });

  console.log('Successfully updated lyrics and translation for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
