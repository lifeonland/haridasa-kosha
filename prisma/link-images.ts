import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Map of composer ID to available image file in public/assets/
const imageMapping: { [key: string]: string } = {
  'purandara-dasa': '/assets/vittala.png',
  'kanaka-dasa': '/assets/krishna.png',
  'vijaya-dasa': '/assets/srinivasa.png',
  'gopala-dasa': '/assets/vittala.png',
  'jagannatha-dasaru': '/assets/vittala.png',
  'sripadaraja': '/assets/srinivasa.png',
  'vyasatirtha': '/assets/vittala.png',
  'vadiraja-tirtha': '/assets/vittala.png',
  'narahari-tirtha': '/assets/vittala.png',
};

async function main() {
  console.log('Linking available images to composers...');
  
  for (const [id, imageUrl] of Object.entries(imageMapping)) {
    await prisma.composer.update({
      where: { id: id },
      data: { imageUrl: imageUrl },
    });
    console.log(`Updated image for ${id}`);
  }

  console.log('✅ Image linking completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
