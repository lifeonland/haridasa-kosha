import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding Mundige compositions...');

  const composerId = 'purandara-dasa';
  const ankita = await prisma.ankita.findFirst({ where: { name: 'Purandara Vittala' } });
  const deity = await prisma.deity.findFirst({ where: { name: 'Unknown' } });

  if (!ankita || !deity) {
    throw new Error('Ankita or Deity not found');
  }

  const compositions = [
    {
      id: 'mundige-1',
      title: '[Mundige] Halliya Kadanake Aanegalu Odidavu',
      lyrics: `ಹಲ್ಲಿಯ ಕದನಕೆ ಆನೆಗಳು ಓಡಿದವು
ಇಲಿ ತನ್ನ ಹೆಡೆಯೆತ್ತಿ ಹಾವ ಹೆದರಿಸಿತು
ನೆಲ ಮುಗಿಲ ಹೊದ್ದಿತು ನೀರೊಳಗೆ ಬೆಂಕಿ ಬಿದ್ದಿತು!`,
    },
    {
      id: 'mundige-2',
      title: '[Mundige] Ondu Kodu Eradu Kombu',
      lyrics: `ಒಂದು ಕೊಡು ಎರಡು ಕೊಂಬು ಮೂರು ಕಾಲುಳ್ಳ ಪ್ರಾಣಿ
ಅದರ ಒಡಲೊಳಗೆ ನೂರು ಕಣ್ಣುಗಳು ಅಡಗಿವೆ!`,
    }
  ];

  for (const comp of compositions) {
    await prisma.composition.upsert({
      where: { id: comp.id },
      update: {
        title: comp.title,
        firstLine: comp.title,
        composerId: composerId,
        ankitaId: ankita.id,
      },
      create: {
        id: comp.id,
        title: comp.title,
        firstLine: comp.title,
        lyrics: comp.lyrics,
        composerId: composerId,
        ankitaId: ankita.id,
        deityId: deity.id,
      },
    });
  }

  console.log('✅ Mundige compositions added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
