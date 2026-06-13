import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಭಜರೇ ಹನುಮಂತಂ ಮಾನಸ
ಭಜರೇ ಹನುಮಂತಂ
ಕೋಮಲ ಕಾಯಂ, ನಾಮಸುದೇವಂ
ಭಜಸುಖ ಸಿಂಹಂ, ಭೂಸುರ ಶ್ರೇಷ್ಠಂ ।।೧।।

ಮೂರ್ಖ ನಿಶಾಚರ ವನಸಂಹಾರಂ
ಸೀತಾ ದುಃಖವಿನಾಶನ ಕಾರಂ ।।೨।।

ಪರಮಾನಂದ ಗುಣೋದಯ ಚರಿತಂ
ಕರುಣಾರಸ ಸಂಪೂರ್ಣಸುಭರಿತಂ ।।೩।।

ರಂಗ ರಂಗ ಗುಣ ಗಂಭೀರಂ
ದಾನವ ದೈತ್ಯಾರಣ್ಯ ಕುಠಾರಂ ।।೪।।

ಗುರು ಚೆನ್ನಕೇಶವ ಕದಳೀ ರಂಗಂ
ಸ್ಥಿರ ಸದ್ಭಕ್ತಾ ಮುಖ್ಯ ಪ್ರಾಣಂ ।।೫।।`;

  const englishTranslation = `Refrain:
O Mind, worship Hanuman, worship Hanuman.

Stanza 1:
Worship Him who has a beautiful form and is the divine one to be saluted.
He is like a lion providing the joy of devotion, the greatest among the godly beings on earth.

Stanza 2:
He is the destroyer of the forest of foolish demons (who roam at night).
He is the one who brought an end to the sorrow of Mother Sita.

Stanza 3:
His life story is the source of supreme bliss and the rising of noble virtues.
He is completely filled with the essence of compassion.

Stanza 4:
He is profound in his divine qualities.
He is the axe that destroys the forest of demons and giants.

Stanza 5:
He is the stage for Guru Chennakeshava (Lord Vishnu) in the Kadali forest.
He is the steady, true devotee and the Mukhya Prana (the primary life force).`;

  // Update composition with lyrics and translation
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-70' },
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
