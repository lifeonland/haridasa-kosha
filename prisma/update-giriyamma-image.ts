import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Helavanakatte Giriyamma image...');

  await prisma.composer.update({
    where: { id: 'helavanakatte-giriyamma' },
    data: { imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhx8moXg0fFMcCZb9qQCY4R-rvucxmy37OBe68H2Z_3gOlU2Vrjrmh-b2XcvkS5MMHQ9yzU1AvdyuJspoh8wCnsiTEXrd3u4-nd8G7JIKO7UmpDLNZt9-FDqFkvd2_QVnwHZY1mDWuhJ0/s1600/bhimavva.jpg' },
  });

  console.log('✅ Helavanakatte Giriyamma image updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
