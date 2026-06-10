import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const translationId = 'cmq4ukybk000130lsiy7r5hty';
  
  const formattedTranslation = `Chorus: How did I become so foolish? How did I lose my way? I am exhausted by the cycle of worldly existence (Bhava). O Raghukula Tilaka (Lord Rama), protect me always.

Verse 1: In words, I claim to be a servant of Hari (Haridasa), but in my conduct, I act like a servant of worldly masters. I have great love for wealth and sensory pleasures, and I shamelessly commit treachery against God and Guru.

Verse 2: In private, I only talk about wealth; in public, I talk about renunciation (Vairagya). I hesitate to serve the Lord of Lakshmi (Shrikanta), but I am eager and happy to serve earthly kings (Bhukanta).

Verse 3: I hesitate to give even a single coin for Dharma (righteousness), but I spend thousands on Adharma (unrighteousness). I feel weary when doing good deeds, but I am quick and energetic when doing wrong.

Verse 4: Like a street performer (Domba), I display my deeds for show. I perform rituals out of vanity. Thus, I have distanced myself from the Lotus-naveled Lord (Ambujanabha) and become a target for the worst of sins (Kumbhipaka).

Verse 5: If someone insults my wife, I get angry and fight back. But if someone insults the Lord of Lakshmi (Shripati), I listen and laugh. I have lost my mind, being addicted to worldly pleasures.

Verse 6: For whom are you struggling so hard? For whom are you hiding away your treasures? Wife, children, and friends—none of them will accompany you in the end.

Verse 7: Worship Hari, who is revered by Brahma and others. Give up lust and other evil desires. Worship Narahari (the Lord), who is praised by the virtuous, and seek the feet of Raghupati.`;

  console.log('Updating translation formatting...');

  await prisma.translation.update({
    where: { id: translationId },
    data: {
      english: formattedTranslation,
    },
  });

  console.log('✅ Translation formatted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
