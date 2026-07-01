import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const t = await prisma.translation.findMany({
        where: { kannadaMeaning: { not: '' } },
        include: { composition: true },
        take: 10
    });
    console.log(t.map(x => x.composition.title).join('\n'));
}

main().finally(() => prisma.$disconnect());
