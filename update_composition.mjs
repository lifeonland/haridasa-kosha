import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ragaName = "Madhyamavati";
  let raga = await prisma.raga.findUnique({ where: { name: ragaName } });
  if (!raga) {
      raga = await prisma.raga.create({ data: { name: ragaName } });
  }

  const talaName = "Adi";
  let tala = await prisma.tala.findUnique({ where: { name: talaName } });
  if (!tala) {
      tala = await prisma.tala.create({ data: { name: talaName } });
  }

  await prisma.composition.update({
    where: { id: "sripadaraja-olide-yatakamma" },
    data: {
      title: "Olide Yaatakamma Lakumi",
      firstLine: "Olide yaatakamma lakumi",
      ragaId: raga.id,
      talaId: tala.id
    }
  });

  console.log("Updated composition successfully!");
}
main().catch(console.error).finally(() => prisma.$disconnect());
