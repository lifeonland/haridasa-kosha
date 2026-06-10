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
    data: { imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVOKSMxV-rUIIBPVP7tsljfc3pivRFLQ3VMQkBTtEFaWHEk7xjaFTRVwVgM-zZVjAQ51J93M7lF9CtNXwJSlO9HZzGWJ0jLJ1nZdt3nwkHYR1YrN-7tV812EWN8HFd1ltsdGWdQ3hGq7Y7c-sJPUQHtpoNns8k3fELuaVCwG4eNAukBZ7n7-TOXnw0Hg/s400/WhatsApp%20Image%202022-06-04%20at%2010.35.00%20PM.jpeg' },
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
