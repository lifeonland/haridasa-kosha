import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.composer.update({
    where: { id: 'vadiraja-tirtha' },
    data: { name: 'Sri Vadiraja Tirtharu' }
  });
  console.log('Updated Sri Vadiraja Tirtharu in DB');
}
main();
