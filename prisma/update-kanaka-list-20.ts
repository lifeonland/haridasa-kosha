import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lyrics = `ಬಾಯಿ ನಾರಿದ ಮೇಲೆ ಏಕಾಂತವೆ
ತಾಯಿ ತೀರಿದ ಮೇಲೆ ತವರಾಸೆಯೆ ।।ಪ।।

ಕಣ್ಣು ಕೆಟ್ಟ ಮೇಲೆ ಕಡುರೂಪ ಚೆಲ್ವಿಕೆಯೆ
ಬಣ್ಣಗುಂದಿದ ಮೇಲೆ ಬಹುಮಾನವೆ
ಪುಣ್ಯತೀರಿದ ಮೇಲೆ ಪರಲೋಕ ಸಾಧನವೆ
ಸುಣ್ಣವಿಲ್ಲದ ವೀಳ್ಯವದು ಸ್ವಾದುಮಯವೆ ।।೧।।

ಕಿಲುಬಿನಾ ಬಟ್ಟಲೊಳು ಹುಳಿ ಕಲಸಿ ಉಣಬಹುದೆ
ಚಳಿಜ್ವರಕೆ ಚಂದನದ ಲೇಪ ಹಿತವೆ
ಮೊಲೆಬಿದ್ದ ಹೆಣ್ಣಿನೊಳು ಮೋಹಕ್ಕೆ ಸೊಗಸಹುದೆ
ಬೆಲೆಬಿದ್ದ ಸರಕಿನೊಳು ಲಾಭವುಂಟೆ ।।೨।।

ಪಥ್ಯ ಸೇರದ ಮೇಲೆ ನಿತ್ಯ ಸುಖವೆನಬಹುದೆ
ಸತ್ತ್ವ ತಗ್ಗಿದ ಮೇಲೆ ಸಾಮರ್ಥ್ಯವೆ
ಪೃಥ್ವಿಯೊಳು ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ ನಿನ್ನ
ಭಕ್ತಿ ಇಲ್ಲದವಗೆ ಮುಕ್ತಿಯುಂಟೆ ।।೩।।`;

  const englishTranslation = `Refrain:
Is there any joy in solitude (intimacy) once the mouth begins to stench?
Is there any longing for one's maternal home once the mother has passed away?

Stanza 1:
Of what use is great beauty and form once the eyesight is lost?
What is the value of honors and awards once one's luster (reputation/health) has faded?
Can one achieve the higher worlds (salvation) once their merit (Punya) is exhausted?
Is a betel leaf preparation (paan) tasty if it lacks lime (chuna)?

Stanza 2:
Can one eat sour food mixed in a tarnished (verdigris-covered) brass vessel?
Is the application of sandalwood paste pleasant when one is shivering with fever?
Is there any pleasure in lusting after a woman whose youth has faded (sagging breasts)?
Can there be any profit in selling goods whose market value has already crashed?

Stanza 3:
Can there be daily happiness when one cannot follow a healthy diet (due to illness)?
Is there any strength left once the vital essence (Sattva) has diminished?
O Adikeshava of Kaginele, in this world,
Can a human ever attain liberation (Mukti) without devotion to You?`;

  // Find or create Raga and Tala
  const raga = await prisma.raga.upsert({
    where: { name: 'Kambhoji' },
    update: {},
    create: { name: 'Kambhoji' }
  });
  
  const tala = await prisma.tala.upsert({
    where: { name: 'Jhampe' },
    update: {},
    create: { name: 'Jhampe' }
  });

  // Create/Update composition
  const updated = await prisma.composition.update({
    where: { id: 'kanaka-list-20' },
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
