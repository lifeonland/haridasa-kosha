import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const deity = await prisma.deity.update({
        where: { name: 'Vittala' },
        data: {
            // Note: If Deity model doesn't have an 'imageUrl' field,
            // we may need to add it or store it elsewhere. 
            // Checking schema again...
        }
    });
    console.log("Updated Deity:", deity);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
