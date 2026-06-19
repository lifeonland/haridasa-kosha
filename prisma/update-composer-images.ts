import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating images for Pranesha Dasaru, Venu Gopaladasaru, and Mohana Dasaru...');

  // Pranesha Dasaru - Provided SoundCloud link is a set, but not a direct image URL. 
  // I will skip until a direct image URL is provided, or use a known reliable source if available. 
  // Wait, user provided: https://soundcloud.com/shriharivayu-gurugalu/sets/kritis-of-shri-pranesha-dasaru
  // This is not a direct image. I will not update this one to avoid broken images.
  
  // Venu Gopaladasaru
  await prisma.composer.update({
    where: { id: 'venugopala-dasa' },
    data: { imageUrl: 'https://i1.sndcdn.com/artworks-SKyhMz890frbh0s6-Y7sLTg-t500x500.jpg' },
  });

  // Mohana Dasaru
  await prisma.composer.update({
    where: { id: 'mohana-dasa' },
    data: { imageUrl: '/assets/webp/mohana-dasaru.webp' },
  });

  console.log('✅ Venu Gopaladasaru and Mohana Dasaru images updated successfully!');
  console.log('⚠️ Note: Pranesha Dasaru image was skipped as the provided URL was not a direct image link.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
