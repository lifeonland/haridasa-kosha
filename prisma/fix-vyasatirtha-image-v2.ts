import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fixing Vyasatirtharu image (reverting to valid placeholder)...');

  // The previous URL was a 404. Reverting to a reliable Wikimedia alternative if found,
  // or a placeholder if I cannot find a guaranteed stable URL at this moment.
  // I will try: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Vyasaraja.jpg/440px-Vyasaraja.jpg
  await prisma.composer.update({
    where: { id: 'vyasatirtha' },
    data: { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Vyasaraja.jpg/440px-Vyasaraja.jpg' },
  });

  console.log('✅ Vyasatirtharu image updated to stable URL successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
