import { PrismaClient } from '@prisma/client';

// Use a global variable to reuse the Prisma client instance
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Force re-initialization if models are missing
const createPrismaClient = () => {
  const client = new PrismaClient({
    log: ['query'],
  });
  return client;
};

export const prisma =
  globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  // Always recreate in development to avoid stale client issues
  globalForPrisma.prisma = createPrismaClient();
}
