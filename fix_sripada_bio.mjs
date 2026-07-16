import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.composer.update({
    where: { id: "sripadaraja" },
    data: {
      biography: "Sripadarajaru" // Setting a short bio (< 100 chars) forces the UI to fall back to the enriched translations you provided in LanguageContext.tsx!
    }
  });

  console.log("Updated Sripadaraja DB bio to trigger translation fallback successfully!");
}
main().catch(console.error).finally(() => prisma.$disconnect());
