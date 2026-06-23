import { PrismaClient } from '@prisma/client';

// Use a global variable to reuse the Prisma client instance
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Force re-initialization if models are missing
const createPrismaClient = () => {
  console.log('--- PRISMA INITIALIZATION ---');
  console.log('CWD:', process.cwd());
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  const client = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
  return client;
};

export const prisma =
  globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

