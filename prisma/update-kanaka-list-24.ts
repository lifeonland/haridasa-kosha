import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಬಂದೆವಯ್ಯ ಗೋವಿಂದಶೆಟ್ಟಿ – ನಿಮ್ಮ
ಹರಿವಾಣ ತೀರ್ಥಪ್ರಸಾದ ಉಂಟೆನಲಾಗಿ ।।ಪ।।

ಅಪ್ಪವು ಅತಿರಸ ತುಪ್ಪವು ಚಿನಿಪಾಲು
ಒಪ್ಪುವ ಸಕ್ಕರೆ ಯಾಲಕ್ಕಿಯು
ಅಪರೂಪವಾದ ಕಜ್ಜಾಯಗಳನೆಲ್ಲ
ಛಪ್ಪನ್ನ ದೇಶಕ್ಕೆ ಮಾರುವ ಶೆಟ್ಟಿ ।।೧।।

ಒಡೆದ ಮಡಕೆ ತಂದು ಇಡಿದು ನಾಮವ ಮಾಡಿ
ಕೊಡುವೆ ನೀ ಕಾಸಿಗೆ ಒಂದೊಂದನು
ಒಡಲು ತುಂಬಿ ಮಿಕ್ಕ ಅನ್ನವ ಮಾರಿಸಿ
ಒಡವೆಯ ಗಳಿಸುವ ಕಡುಲೋಭಿ ಶೆಟ್ಟಿ ।।೨।।

ಶೇಷಗಿರಿಯಲ್ಲಿ ವಾಸ ಮಾಡಿಕೊಂಡು
ದೇಶದೇಶಕ್ಕೆ ಹೆಸರಾದ ಶೆಟ್ಟಿ
ಕಾಸುಕಾಸಿಗೆ ಬಡ್ಡಿ ಗಳಿಸಿಕೊಂಬ
ಆದಿಕೇಶವ ನಾರಾಯಣ ತಿಮ್ಮಶೆಟ್ಟಿ ।।೩।।`;

  const englishTranslation = `Refrain:
We have come, O Govinda Setti (Lord Venkateshwara addressed as a merchant)! We have come asking if there is any Teertha (holy water) or Prasada (sanctified food) in your platter.

Stanza 1:
You are the merchant who sells Appa, Athirasa (sweet pancakes), ghee, sugar, milk, and fragrant cardamom. You sell these rare and delicious sweets across the fifty-six kingdoms (the whole world).

Stanza 2:
You take broken pots, grind them to make Nama (the sacred mark), and sell each one for a coin. You are a shrewd merchant who even sells the leftover food after your stomach is full, just to accumulate more wealth and jewelry.

Stanza 3:
Residing on the Sheshagiri hills (Tirumala), you are a merchant famous across all nations. You are the one who collects interest on every single coin—the Lord Adi Keshava Narayana, also known as Timma Setti.`;

  // Update composition with lyrics and translation
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-24' },
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
