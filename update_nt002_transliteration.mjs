import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const transliteration = `hariyē idu sariyē
caraṇasēvakanalli karuṇe bāradyāke ||pa||

patitanendu śrīpati rakṣisadire
vitatavāhude ninna patitapāvana kīrti? ||1||

śakta nīnāgiddu bhaktanupēkṣise
bhaktavatsala nāma vyarthavāgade? ||2||

digilillade odda bhṛguva pāliside
nagadhara enna biḍuva bage ēnidu? ||3||

hēya ajāmiḷana kāyalille sva
kīyane nā parakīyane ninage? ||4||

uṇṭu hiraṇyakana kaṇṭaka biḍisiddu
naṇṭane ninage baṇṭa nānallave? ||5||

keṭṭa ahalyeya diṭṭa pāliside
koṭṭaḷu avaḷēna biṭṭaddu nānēna? ||6||

dore ninna manasige saribandante māḍu
morehokkenu nā naraharipūrṇane ||7||`;

async function main() {
  await prisma.composition.update({
    where: { id: 'nt-002' },
    data: { transliteration: transliteration }
  });
  console.log('Updated transliteration for nt-002');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
