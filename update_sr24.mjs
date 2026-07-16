import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compId = "sr-24";
  
  const transliteration = `Shri rangavithalana shreemakutake sharanu || P ||
Shiradalloppuva neelakuntalake sharanu |
Siri sahodaranardha lalaatake sharanu || A.P ||

Sompu notada cheluva sogegannige sharanu |
Sampigeya kusuma sama naasikake sharanu |
Gumpu ratnada karna kundalagalige sharanu |
Impu darpana nibha kapolagalige sharanu || 1 ||

Kundakutmala polva danta panktige sharanu |
Andavaagiruva bimbhoshmake sharanu |
Chandrikaanibha muddu mandahaasake sharanu |
Nandagopana muddu kandanige sharanu || 2 ||

Abjanaabhana divya kambu kanthake sharanu |
Abja mukhiyiruva vakshasthalake sharanu |
Kubjeyaa donkatiddida bhujagalige sharanu |
Abjajaasana petta naabhige sharanu || 3 ||

Rannagantegaliruva ninna katige sharanu |
Ponna kadalee polva todegalige sharanu |
Punnaaga karagetta dhvaya nitambake sharanu |
Chennaagi kuniva samaajaanuvige sharanu || 4 ||

Mangala vaibhogangala anghridvayake sharanu |
Tunga kuchagala pidida karagalige sharanu |
Pongolalanooduvaa anguligalige sharanu |
Rangaviththalana sarvaangake sharanu || 5 ||`;

  await prisma.composition.update({
    where: { id: compId },
    data: { transliteration }
  });

  console.log("Successfully updated sr-24 with English lyrics.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
