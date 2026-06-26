import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(process.cwd(), 'current_data.json');
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(rawData);

  // Find composition in database
  const composition = await prisma.composition.findUnique({
    where: { id: 'nt-002' },
  });

  if (!composition) {
    throw new Error('Composition not found in DB');
  }

  // Update in JSON
  let updatedCount = 0;
  for (const composer of data) {
    if (composer.compositions) {
      for (const comp of composer.compositions) {
        if (comp.id === 'nt-002') {
          comp.ragaId = composition.ragaId;
          comp.talaId = composition.talaId;
          updatedCount++;
        }
      }
    }
  }

  if (updatedCount > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Updated ${updatedCount} occurrences in current_data.json`);
  } else {
    console.log('❌ Could not find nt-002 in current_data.json');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
