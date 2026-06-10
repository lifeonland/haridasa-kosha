const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Starting update...");
    const raga = await prisma.raga.upsert({
        where: { name: 'Mohana' },
        update: {},
        create: { name: 'Mohana' },
    });
    console.log("Raga created/updated");

    const tala = await prisma.tala.upsert({
        where: { name: 'Adi' },
        update: {},
        create: { name: 'Adi' },
    });
    console.log("Tala created/updated");

    const tag = await prisma.tag.upsert({
        where: { name: 'Bhakti' },
        update: {},
        create: { name: 'Bhakti' },
    });
    console.log("Tag created/updated");

    const composition = await prisma.composition.findFirst({
        where: { composer: { name: { contains: 'Kanaka' } } }
    });
    console.log("Composition found:", composition?.title);

    if (composition) {
        await prisma.composition.update({
            where: { id: composition.id },
            data: {
                ragaId: raga.id,
                talaId: tala.id,
                tags: {
                    connect: [{ id: tag.id }]
                }
            }
        });
        console.log(`Updated composition ${composition.title} with Raga, Tala, and Tag.`);
    }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
