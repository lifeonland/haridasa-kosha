const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const transliteration = `Pallavi:
Aadalu pogoNa baaro ranga
Koodi yamunaa theeradalli ||

Charana 1:
ChiNNikolu chendu bugari
SaNNa saNNa aatagaLanu
KaNNumucchalike kunTalipi
BaNNa baNNada aatagaLanu ||

Charana 2:
Jaahnaviya theeravanthe
Janakaraajana kuvariyanthe
Jaanakiya vivaahavanthe
JaaNa neenu barabekanthe ||

Charana 3:
PunDareeya nagaravanthe
Bheeshmakaraajana kuvariyanthe
Shishupaalanna ollalanthe
Nimage ole baredaLanthe ||

Charana 4:
Kauravaru paaNDavaru
LettavaaDi sotharanthe
Raajyavannu biTTaranthe
Rangavithala barabekanthe ||`;

async function main() {
  await prisma.composition.update({
    where: { id: 'sr-11' },
    data: { transliteration }
  });
  console.log('Updated sr-11 transliteration in database');
}
main().catch(console.error).finally(() => prisma.$disconnect());
