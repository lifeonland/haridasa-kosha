import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Map of composer ID to available image file in public/assets/
const imageMapping: { [key: string]: string } = {
  'purandara-dasa': 'https://i.pinimg.com/736x/29/e5/b0/29e5b084b9d40d29d2532141e0d662b8.jpg',
  'kanaka-dasa': 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Kanakadasa_art.jpg',
  'vijaya-dasa': '/assets/webp/vijayadasaru.webp',
  'gopala-dasa': '/assets/webp/gopaladasaru.webp',
  'jagannatha-dasaru': 'https://anandsp1.wordpress.com/wp-content/uploads/2018/09/jagannatha-dasaru.jpg?w=315&h=435',
  'sripadaraja': '/assets/webp/sripadaraja.webp',
  'vyasatirtha': '/assets/webp/vyasarajaru.webp',
  'vadiraja-tirtha': '/assets/webp/vadiraja.webp',
  'narahari-tirtha': '/assets/webp/narahari.webp',
  'pranesha-dasaru': '/assets/webp/praneshadasaru.webp',
  'raghavendra-dasa': '/assets/webp/rayaru.webp',
  'subbanna-dasa': '/assets/webp/kalluru-subbanna-dasaru.webp',
  'mohana-dasa': '/assets/webp/mohana-dasaru.webp',
  'helavanakatte-giriyamma': '/assets/webp/helavanakatte-giriyamma.webp',
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
