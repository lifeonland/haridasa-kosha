import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Harapanahalli Bhimavva image...');

  await prisma.composer.update({
    where: { id: 'harapanahalli-bhimavva' },
    data: { imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0t7DSDmFPTv9T0qLZrHphZOuqc9R4Hai_BY59LY2sGUD1xkUqUIrrIBWO21fLLMC-N8C8j0g5dICod6XhkmtEiik8zfj0npCUu6hPIqq8v1Syc2UvqjNfYi3YYNQfef5NAIXpr_-aTmE/s1600/NjwkmGfZ.jpg' },
  });

  console.log('✅ Harapanahalli Bhimavva image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
