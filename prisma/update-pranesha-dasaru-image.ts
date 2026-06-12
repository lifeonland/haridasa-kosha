import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Pranesha Dasaru images...');
  
  const imageUrl = 'https://i1.sndcdn.com/artworks-000422572932-f7mz30-t500x500.jpg';
  
  // Updating both IDs just in case
  const ids = ['pranesha-dasaru', 'pranesha-dasa'];
  
  for (const id of ids) {
    try {
        await prisma.composer.update({
            where: { id: id },
            data: { imageUrl },
        });
        console.log(`✅ Updated image for ${id}`);
    } catch (e) {
        console.log(`ℹ️ Composer ${id} not found, skipping.`);
    }
  }

  console.log('✅ Pranesha Dasaru images updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
