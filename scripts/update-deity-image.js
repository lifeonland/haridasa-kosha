const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Updating Vittala deity image...");
    
    const deity = await prisma.deity.update({
        where: { name: 'Vittala' },
        data: {
            imageUrl: '/assets/vittala.png',
        }
    });
    console.log("Updated Deity:", deity.name, "with image:", deity.imageUrl);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
