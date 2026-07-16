import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const c = await prisma.composer.findUnique({ where: { id: 'purandara-dasa' }});
  console.log('Image URL:', c?.imageUrl);
}
main();
