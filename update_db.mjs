import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.composer.update({
    where: { id: 'purandara-dasa' },
    data: { imageUrl: '/assets/webp/purandaradasaru_v2.webp' }
  });
  console.log('Updated Purandara Dasa image URL');

  await prisma.composer.update({
    where: { id: 'vadiraja-tirtha' },
    data: { name: 'Vadiraja Tirtharu' }
  });
  console.log('Updated Vadiraja Tirtharu name');
}
main();
