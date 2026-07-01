const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const comp = await prisma.composition.findFirst({
    where: { id: 'sr-11' }
  });
  console.log("Composition found:", comp ? comp.title : "Not found");
  
  if (comp) {
    const existingAudio = await prisma.audioFile.findFirst({
      where: { compositionId: 'sr-11' }
    });
    if (!existingAudio) {
      await prisma.audioFile.create({
        data: {
          compositionId: 'sr-11',
          title: 'YouTube Render',
          url: 'https://youtu.be/DhQ6b0gE0AE'
        }
      });
      console.log("Added AudioFile to sr-11!");
    } else {
      await prisma.audioFile.update({
        where: { id: existingAudio.id },
        data: { url: 'https://youtu.be/DhQ6b0gE0AE' }
      });
      console.log("Updated AudioFile for sr-11!");
    }
  } else {
    // maybe it is named something else?
    const all = await prisma.composition.findMany({ select: { id: true, title: true } });
    console.log("All compositions:");
    all.forEach(c => console.log(c.id, c.title));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
