import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಅರಿತು ನಡೆಯಲು ಬೇಕು ನರಕಾಯವೆತ್ತಿದ ಮೇಲೆ
ಅರಿಯದಿದ್ದರೆ ನರಕವೇ ಪ್ರಾಪ್ತಿ ।।ಪ।।

ದುರ್ಜನರ ಮನೆಯ ಪಾಯಸಾನ್ನಕಿಂತ
ಸಜ್ಜನರ ಮನೆಯ ರಬ್ಬಳಿಗೆ ಲೇಸು
ಹೆಜ್ಜೆಗೆ ಸಾವಿರಾರು ಹೊನ್ನನಿತ್ತರೂ ಬೇಡ ಬಲು
ದುರ್ಜನರ ಸಂಗ ಬಲು ಭಂಗ ಹರಿಯೆ ।।೧।।

ಭಕ್ತಿಹೀನರ ಮನೆಯ ಪಟ್ಟ ಸುಪ್ಪತಿಗೆಗಿಂತ
ಭಕ್ತರ ಮನೆಯ ಕಡೆಬಾಗಿಲ ಕಾಯುವುದು ಲೇಸು
ಮುಕ್ತಿ ಮಾರ್ಗವ ತೋರ್ಪ ಮುರಹರಣ ದಾಸರನು
ಸಕ್ತಿಯಿಂ ಸೇವಿಸುವುದು ಬಲು ಸೌಖ್ಯ ಹರಿಯೆ ।।೨।।

ಆಶೆಕಾರರ ಮನೆಯ ವಿಳಾಸ ಸುಖಕಿಂತ
ಆಶಾರಹಿತರ ಮನೆಯ ನಿರ್ಗತಿಕ ದೈನ್ಯ ಲೇಸು
ಭೂಸುರ ಪ್ರಿಯ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನ
ಮೀಸಲಿನ ಪಾದಭಜನೆ ಕಡುಲೇಸು ಮನವೆ ।।೩।।`;

  const englishTranslation = `Refrain:
One must live with awareness after attaining this human body.
If one lives without understanding, hell is the only destination.

Stanza 1:
Better is the simple gruel in the house of the righteous,
Than the sweet rice pudding in the house of the wicked.
Even if offered thousands of gold coins at every step, do not seek it;
The company of the wicked brings only ruin, O Hari!

Stanza 2:
Better is guarding the back door of a devotee's house,
Than resting on a silk bed in the house of those without devotion.
Serving with dedication the servants of the Slayer of Mura (Krishna), who show the path to liberation,
Brings great happiness and peace, O Hari!

Stanza 3:
Better is the humble poverty of those without desires,
Than the luxurious pleasures in the house of the greedy.
O Mind! Worshiping the sacred feet of Kaginele Adikeshava, the beloved of the gods,
Is the most auspicious and beneficial path.`;

  // Update composition with lyrics and translation
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-21' },
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
