import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಆರು ಬಲ್ಲರು ಹರಿ ಹರರ ಮಹಿಮೆಯನು
ವಾರಿಜೋದ್ಭವ ಸುರೇಂದ್ರಾದಿಗಳಿಗಳವಲ್ಲ ।।ಪ।।

ಪೌರತ್ರಯವ ಗೆಲುವ ಸಮಯದಲಿ ತಪವಮಾಡಿ
ನಾರಾಯಣಾಸ್ತ್ರವನು ಪಡೆದನೀತ
ಗೌರಿಮನೋಹರನ ಘನತರಾರ್ಚನೆಗೈದು
ಚಾರುತರ ಚಕ್ರವನು ಪಡೆದನಾ ಶೌರಿ ।।೧।।

ಬಲಿ ಚಕ್ರವರ್ತಿ ಭಕ್ತಿಗೆ ಮೆಚ್ಚಿ ಅವನ ಬಾ
ಗಿಲಕಾಯ್ದನಚ್ಯುತನು ಅನುಗಾಲದಿ
ಬಲಭುಜನು ಬಾಣಾಸುರನ ಗೃಹದ್ವಾರವನು
ಬಳಸಿ ಕಾಯ್ದನು ಹರನು ವರವ ತಾನಿತ್ತು ।।೨।।

ಭೋಗಿಶಯನನು ಆಗಿ ಭೋಗಿಭೂಷಣನಾಗಿ
ವಾಗೀಶನಾಗಿ ಸೃಷ್ಟಿ ಸ್ಥಿತಿ ಲಯಗಳಿಂಗೆ
ಆಗು ಕಾರಣ ಕಾರ್ಯ ಕರ್ಮಾದಿ ರೂಪಕ್ಕೆ
ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನ ಮಹಿಮೆಯನು ।।೩।।`;

  const englishTranslation = `Refrain
Who can truly know the greatness of Hari (Vishnu) and Hara (Shiva)? 
Even Brahma (the lotus-born) and Indra (the king of gods) cannot fully comprehend it.

Stanza 1
When Shiva was set to conquer the three cities (Tripura), he performed penance and obtained the powerful Narayana-astra (from Vishnu). 
Similarly, Vishnu (Sauri), by performing intense worship of Shiva (the charmer of Gauri), obtained the beautiful and mighty Sudarshana Chakra.

Stanza 2
Pleased by the devotion of King Bali, Achyuta (Vishnu) stood guard at his doorstep forever. 
Likewise, Hara (Shiva), after granting a boon to the demon Banasura, protected the entrance of his palace.

Stanza 3
One (Vishnu) reclines upon the serpent (Adisesha), while the other (Shiva) wears the serpent as an ornament. 
As the masters of speech and the forces behind creation, sustenance, and destruction, they are the cause and the effect of all actions. Such is the greatness of the Lord of Kaginele, Adikeshava.`;

  // Find or create Raga and Tala
  const raga = await prisma.raga.upsert({
    where: { name: 'Kambhoji' }, // Assuming Kambhoji as a placeholder or common raga for Kanaka Dasa
    update: {},
    create: { name: 'Kambhoji' }
  });
  
  const tala = await prisma.tala.upsert({
    where: { name: 'Adi' },
    update: {},
    create: { name: 'Adi' }
  });

  // Update composition with lyrics, translation, and metadata
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-19' },
    data: { 
      lyrics: lyrics,
      ragaId: raga.id,
      talaId: tala.id,
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

  console.log('Successfully updated lyrics, metadata, and translation for:', updated.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
