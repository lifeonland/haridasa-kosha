import { prisma } from '../lib/prisma';

async function main() {
  try {
    console.log('Testing database connection...');
    const composerCount = await prisma.composer.count();
    console.log(`Successfully connected to the database. Composer count: ${composerCount}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
