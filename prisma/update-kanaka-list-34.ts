import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಬಂಧು ತ್ರಿಜಗಕೆ ಶ್ರೀ ಹರಿಯಲ್ಲದೆ ಮಿಕ್ಕ
ಬಂಧುಗಳದಾರಿಗಾರಿದ್ದರೇನು ।।ಪ।।

ನೆಗಳ ಕೈಯಲ್ಲಿ ಮಾತಂಗವು ಸಿಕ್ಕಿ ಒದರಲಾಗಿ ಆ
ನೆಗಳೇನ ಮಾಡುತಿರ್ದವಡವಿಯಲ್ಲಿ
ನಗಜೆಯಾಳ್ದನ ಬ್ರಹ್ಮೇತಿ ಬಂದು ಕಡಲಾಗಿ ರುದ್ರಾ
ದಿಗಳೇನ ಮಾಡುತಿರ್ದರಾ ಶೈಲದೊಳಗೆ ।।೧।।

ದಿಂಡೆಯ ಮಾರ್ಗದಿ ಮಲತಾಯಿ ಮಗನ ಹೊಡೆಯಲು
ಮಂಡಲಪತಿ ಏನ ಮಾಡುತಿರ್ದನು
ಮಿಂಡಿ ಪೆಣ್ಣನು ಸಭೆಯಲಿ ಸೀರೆ ಸುಲಿಯಲು
ಗಂಡರೈವರು ನೋಡಿ ಏನು ಮಾಡುತಿರ್ದರಯ್ಯ ।।೨।।

ಮೃಗ ಚಕ್ರವರ್ತಿ ಬಹುವರನಾಗಿ ಪೋಗುತ್ತಿರೆ
ಮಿಗೆ ಸತಿಸುತರೇನ ಮಾಡುತಿರ್ದರು
ಮೃಗ ಮಾನವಾಕಾರ ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವನಲ್ಲದೆ
ಮಿಗು ಬಂಧುಗಳದಾರಿಗಾರಿದ್ದರೇನು ।।೩।।`;

  const englishTranslation = `Refrain:
Who else is a true relative in the three worlds other than Sri Hari? 
What does it matter who else exists as a relative (if He is not there)?

Stanza 1:
When the elephant (Gajendra) was caught in the jaws of the crocodile and cried out in pain, what did the other elephants in the forest do to help?
When the sin of Brahma (Brahmahatya) came like a vast ocean to the husband of Parvati (Shiva), what were Rudra and the other gods doing in the mountains? (Only Hari could save them).

Stanza 2:
When the stepmother (Suruchi) insulted and pushed the young son (Dhruva) away, what did the King (his father, Uttanapada) do to protect him?
When the virtuous woman (Draupadi) was being stripped of her saree in the open assembly, what did her five husbands do while watching helplessly?

Stanza 3:
When the king of animals (referring to the soul or a specific devotee) departs from this world, what can the wife and children do to stop it?
Other than the one who took the Man-Lion form (Narasimha), the Adikesava of Kaginele, who else is a superior relative who stands by us in times of ultimate need?`;

  // Find or create Raga and Tala
  const raga = await prisma.raga.upsert({
    where: { name: 'Mukhari' },
    update: {},
    create: { name: 'Mukhari' }
  });
  
  const tala = await prisma.tala.upsert({
    where: { name: 'Adi' },
    update: {},
    create: { name: 'Adi' }
  });

  // Create/Update composition
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-34' },
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
