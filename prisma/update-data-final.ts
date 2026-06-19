import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Sripadarajaru and composition data...');

  // 1. Update Sripadarajaru Details
  await prisma.composer.update({
    where: { id: 'sripadaraja' },
    data: { 
      imageUrl: '/assets/webp/sripadaraja.webp',
      biography: 'Sri Sripadarajaru (1404–1502) was a great scholar and saint in the Dvaita Vedantic tradition. He is regarded as the founder of the Haridasa movement and was the Rajaguru of the Vijayanagara Empire. He is well-known for his magnum opus "Vagvajra" and numerous devotional compositions.',
      timeline: '1404–1502'
    },
  });

  // 2. Update Hariye Idu Sariye (NT002) Lyrics
  const lyrics = `ಹರಿಯೇ ಇದು ಸರಿಯೇ ||ಪ||
ಪರಮ ಪುರುಷ ನೀ ಮರೆದರೆ ಯಾರಿಗೇನುಪಕಾರ ||ಅ.ಪ||

ಕರಿರಾಜ ವರದನೆ ಕರುಣಿಸೋ ಎನ್ನನೂ
ಮರಳಿ ಬರುವೆನು ನಾನೀ ಭವದೊಳು ||೧||

ಹರಿದಾಸರ ಒಡನಾಟವ ಕರುಣಿಸೋ
ಹರಿನಿನ್ನ ನಾಮವ ಸ್ಮರಿಸುವಂತಾಗಲಿ ||೨||`;

  await prisma.composition.update({
    where: { id: 'nt-002' },
    data: { lyrics: lyrics },
  });

  // 3. Setup Icons for Themes (Using placeholder approach)
  // We'll store the icon in the theme name or description for now to support the requested iconography.
  const themes = [
    { name: 'Bhakti', icon: '🪔' }, // Lamp
    { name: 'Jnana', icon: '✋' },  // Open Palm with Light (simplified)
    { name: 'Vairagya', icon: '🍃' } // Floating Leaf
  ];

  for (const t of themes) {
    await prisma.theme.upsert({
      where: { name: t.name },
      update: { name: `${t.icon} ${t.name}` },
      create: { name: `${t.icon} ${t.name}` },
    });
  }

  console.log('✅ Sripadarajaru, Lyrics, and Themes updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
