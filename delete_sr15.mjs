import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compId = "sr-15";

  // Check if composition exists
  const existing = await prisma.composition.findUnique({
      where: { id: compId }
  });

  if (!existing) {
      console.log(`Composition ${compId} not found. Nothing to delete.`);
      return;
  }

  // Delete translation if exists (avoid foreign key constraint errors if cascade is not enabled)
  await prisma.translation.deleteMany({
      where: { compositionId: compId }
  });

  // Delete audio files if exists
  await prisma.audioFile.deleteMany({
      where: { compositionId: compId }
  });

  // Finally delete the composition
  await prisma.composition.delete({
      where: { id: compId }
  });

  console.log(`Successfully deleted composition: ${compId}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
