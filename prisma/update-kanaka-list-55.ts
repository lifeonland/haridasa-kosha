import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಅಹುದಾದರಹುದೆನ್ನಿ ಅಲ್ಲವಾದರಲ್ಲವೆನ್ನಿ
ಬಹುಜನರು ನೆಲೆ ತಿಳಿದು ಪೇಳಿ ಮತ್ತಿದನು.

ದೇವರಿಲ್ಲದ ಗುಡಿಯು ಪಾಳು ಬಿದ್ದಂಗಡಿಯು
ಭಾವವಿಲ್ಲದ ಭಕುತಿ ಅದು ಕುಹಕ ಯುಕುತಿ
ಹೇವವಿಲ್ಲದ ಹೆಣ್ಣು ಗಜ್ಜುಗ ಬೆಳೆದಾ ಕಣ್ಣು
ಸೇವೆಯರಿಯದ ಧಣಿಯು ಕಲ್ಲಿನಾ ಖಣಿಯು.

ಧರ್ಮವಿಲ್ಲದ ಅರಸು ಮುರಿದ ಕಾಲಿನ ಗೊರಸು
ನಿರ್ಮಲಿಲ್ಲದ ಮನಸು ಅದು ಕಜ್ಜಿ ತಿನಿಸು
ಕರ್ಮವಿಲ್ಲದ ಗಂಡು ಕರಿಯ ಒನಕೆಯ ತುಂಡು
ಮರ್ಮವಿಲ್ಲದ ಮಾತು ಒಡಕು ಮಡಕೆಯ ತೂತು.

ಮಕ್ಕಳಿಲ್ಲದ ಸಿರಿಯು ಕೊಳೆತ ತೆಂಗಿನ ಕಾಯಿ
ಸೌಖ್ಯವಿಲ್ಲದ ಕೂಟ ಅದು ಕಾಳಕೂಟ
ಒಕ್ಕಲಿಲ್ಲದ ಊರು ಕೊಳೆತು ನಾರುವ ನೀರು
ಸೊಕ್ಕಿ ನಡೆಯುವ ಭೃತ್ಯ ಅವ ಕ್ರೂರಕೃತ್ಯ

ಕಂಡು ಕರೆಯದ ನೆಂಟ ಗಂಡುಗತ್ತೆಯ ಶಂಟ
ಉಂಡು ನಗದಿಹ ಮೋರೆ ಅದು ಕಹಿಯ ಸೋರೆ
ದಂಡಿಗಂಜುವ ಬಂಟ ಒಡಕು ಹರವಿಯ ಕಂಠ
ಗಂಡಗಂಜದ ನಾರಿ ಅವಳೆ ಹೆಮ್ಮಾರಿ.

ಬಿಟ್ಟು ನಡೆಯುವ ಗೆಳೆಯ ಹರಕು ತೊಗಲಿನ ಮಿಣಿಯು
ಕೊಟ್ಟು ಕೇಳುವ ದಾತ ಅವ ಹೀನಜಾತ
ಸೃಷ್ಟಿಯೊಳು ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನಂಘ್ರಿ
ಮುಟ್ಟಿ ಭಜಿಸದ ನರನು ಅವನು ಕಾಡುಮರನು.`;

  const englishTranslation = `No one can escape the effects of their past karma; it haunts even Brahma (Aja), Shiva (Hara), the gods (Sura), and the sages (Muni).

The brave Bhairava (Shiva) wanders naked; spirits like Mari and Masani eat food offered in graveyards. The Sun and Moon are chased by Rahu (eclipses), and Shiva carries a skull as a begging bowl in his hand.

The righteous King Harishchandra had to work in a crematorium. Brahma, the creator, lost one of his heads. The guardians of the eight directions (Dikpalakas) were once imprisoned, and Indra’s body was covered in a thousand eyes due to a curse.

The Kaurava (Duryodhana), despite having an army of eleven Akshohinis, lay in the battlefield with broken thighs. The lotus-eyed Lord (Vishnu as Vamana) had to beg from King Bali, and Kunti (mother of the Pandavas) had to beg for food during their exile.

Yudhisthira (Dharmaja) lived as Kanka Bhatta (a courtier in disguise). The mighty Bhima became a cook. The brave Arjuna (Phalguna) wore bangles (as Brihannala), and the younger twins Nakula and Sahadeva tended to cattle.

Shiva’s vehicle (Nandi) carries grass; Brahma’s vehicle (Hamsa) eats lotus stalks. Vishnu’s vehicle (Garuda) eats snakes, and the Lord Adikeshava himself became a thief of butter.`;

  // Update composition
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-55' },
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

  console.log('Successfully updated metadata and translation for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
