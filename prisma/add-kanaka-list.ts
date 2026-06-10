import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Batch adding Kanaka Dasa compositions from list...');

  const composerId = 'kanaka-dasa';
  const ankita = await prisma.ankita.findFirst({ where: { name: 'Kagineleya Adikeshava' } });
  const deity = await prisma.deity.findFirst({ where: { name: 'Krishna' } });

  if (!ankita || !deity) {
    throw new Error('Ankita or Deity not found');
  }

  const compositionTitles = [
    "Hetta tayiginta atyadhika", "Yadavaraya brundavanadolu", "Nammama sharade", "Kelirai sivasaranaru helalanjike", "Varava kodu enage vagdevi ninna",
    "Bagilanu teredu seveyanu kodo hariye", "Baro krushnayya krushnayya", "Itaniga vasudevanu", "Kesava nama", "Tallanisadiru kandya talu manave",
    "Dasadasara maneya dasanudasa nanu", "Kesavanolumeyu Aguva tanaka", "Satyavantara sangaviralu", "Elu narayana elu lakshmiramana", "Lali pavana charana lali agaharana",
    "Elliruvano ranga emba samsaya beda", "Ni mayeyolago ninnolu mayeyo", "Ava siriyali ninu enna marete", "Aru ballaru hari harara mahimeyanu", "Bayi narida mele ekantave",
    "Aritu nadeyalu beku narakayavettida mele", "Badukidenu badukidenu bhava enage hingitu", "enendu kondadi stutisalo deva", "Bandevaya govinda setti", "angaladolu raamanaidha",
    "Nemavillada homa innetake", "Toredu jivisabahude", "yenu kaarana baaya theredhiyo", "ellaru maduvudu hottegagi", "Enu illada eradu dinada samsara",
    "Ene manavitte lalitaangi", "Endu sairisiri sri krishnana tappa", "Nanninda nane janisi bandene deva", "Bandhu trijagake sri hariyallade mikka", "Kulakula kulavendu",
    "Endiddari kompe enage nambikeyilla", "Hannu kombuva banniri haridasaru", "Nadate hinanadarenayya", "Aru hitavaru endu nambabeda", "Yataravanendusurali jaga",
    "Halavu jeevanava ondele nungitu", "Ishtu dina I vaikuntha", "Dasanagu visheshanagu", "Mangalam jayamamgalam", "Puttadasanu nanalla",
    "Devi namma devaru bandaru bannire", "ombattu huvige onde", "Shiva shiva shiva enniro", "muttadiru ennanu rangayya", "ninna nane nendeno venkataraya",
    "kokoko enniro kumbhiniyarella", "Kula kula kulavennutiharu", "yenu olle hariye ninna stuthisi keluvudu", "Tanu ninnadhu", "Arigaadharu purva",
    "Elli nodidaralli raamaa", "Saku saku manuja seveyu", "Mareyadhiru mareyadhiru", "Japava madidharenu", "Beda beda elele",
    "Govinda hari govindha", "Sharanu sharanu", "Yaake ninilli pavadisidi", "Dimbadhilliruva jeeva", "Jaya Mangalam – avathara traya mukhya prana mangalam",
    "Neenupekshaya maade", "Mangalaratiya paadire", "Vara kavigala munde", "Muttabeda muttabeda muraharana dasaranu", "Bajare Hanumantam",
    "Ahudhadharu adhudhennni"
  ];

  for (let i = 0; i < compositionTitles.length; i++) {
    const title = compositionTitles[i];
    const id = `kanaka-list-${i + 1}`;
    await prisma.composition.upsert({
      where: { id: id },
      update: {
        title: title,
        firstLine: title,
        composerId: composerId,
        ankitaId: ankita.id,
      },
      create: {
        id: id,
        title: title,
        firstLine: title,
        lyrics: title, // Placeholder
        composerId: composerId,
        ankitaId: ankita.id,
        deityId: deity.id,
      },
    });
  }

  console.log(`✅ ${compositionTitles.length} Kanaka Dasa compositions added successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
