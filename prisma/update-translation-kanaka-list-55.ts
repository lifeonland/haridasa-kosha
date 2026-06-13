import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const englishTranslation = `Refrain:
No one can escape the effects of their past karma; it haunts even Brahma (Aja), Shiva (Hara), the gods (Sura), and the sages (Muni).

Stanza 1:
The brave Bhairava (Shiva) wanders naked; spirits like Mari and Masani eat food offered in graveyards. The Sun and Moon are chased by Rahu (eclipses), and Shiva carries a skull as a begging bowl in his hand.

Stanza 2:
The righteous King Harishchandra had to work in a crematorium. Brahma, the creator, lost one of his heads. The guardians of the eight directions (Dikpalakas) were once imprisoned, and Indra’s body was covered in a thousand eyes due to a curse.

Stanza 3:
The Kaurava (Duryodhana), despite having an army of eleven Akshohinis, lay in the battlefield with broken thighs. The lotus-eyed Lord (Vishnu as Vamana) had to beg from King Bali, and Kunti (mother of the Pandavas) had to beg for food during their exile.

Stanza 4:
Yudhisthira (Dharmaja) lived as Kanka Bhatta (a courtier in disguise). The mighty Bhima became a cook. The brave Arjuna (Phalguna) wore bangles (as Brihannala), and the younger twins Nakula and Sahadeva tended to cattle.

Stanza 5:
Shiva’s vehicle (Nandi) carries grass; Brahma’s vehicle (Hamsa) eats lotus stalks. Vishnu’s vehicle (Garuda) eats snakes, and the Lord Adikeshava himself became a thief of butter.`;

  // Update translation
  const updatedTranslation = await prisma.translation.upsert({
    where: { id: 'kanaka-list-55-trans' }, // Assumed ID or use a different lookup
    update: {
      english: englishTranslation,
    },
    create: {
      id: 'kanaka-list-55-trans',
      compositionId: 'kanaka-list-55',
      english: englishTranslation,
      kannadaMeaning: "", // Can be filled later if needed
      wordByWord: ""
    }
  });

  console.log('Successfully updated translation for:', updatedTranslation.id);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
