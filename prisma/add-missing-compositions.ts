import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Batch adding compositions for Vadiraja, Vijaya, and Vyasarayaru...');

  const composers = [
    { id: 'vadiraja-tirtha', ankita: 'Hayavadana', compositions: [
        "Venunada priya gopalakrushna", "Lokabaritano ranganeka charitano", "Anjaneya amara vandhitha", "Ene yaro ninage hanumantaraya", 
        "Itane kaniro madhwamuni", "Yathakayya theertha", "Naaraayanana nene", "Manave", "Jaya bimasena vani parama kalyani namo namo ajana", 
        "Dasamas skandam Bagavatha(Neneve anu dhina)", "Ondu baari smarane", "Madhwaantargata vedavyaasaa", "Narayana varma", "Lakshmi hrudaya", 
        "Sadhaachaara smruthi", "Akshaya patre haadu", "Dhavala gangeya gangadhara", "Sundara Kandam", "Srinivasa kalyana", "Shobhana vennire!!!",
        "Baro murari bega baro bega baro nila meghavarna baro", "Ava ritiyindha", "Ishtu dayavullavana", "Maatu maatige bideno ninna charana",
        "Aava kadeyinda bande", "Neere torele", "Ananda mayage(Aarathi song)", "Raja beediyolagindha", "I muddu Krishna", "I kshanada charana toledu",
        "Indire arasa baaro", "Gajamukha vandisuve", "Belagu Jaavadi baaro vedava tandu vidhi", "Kondadalalave ninnaya keerti", "Keechaka vadha aa mahimege mangalaarathi",
        "Aarathi yetthire kesava naarayanage", "Keshava nama", "Badrani dehi me gauri", "Ranga baro narasinga baro", "Krushna murari kesava murari",
        "Gubbiyalo govinda govinda", "Aryanna yogadhuryanna", "Bajisivaryanna", "Ena bannipenamma", "Nerenambi padeyiro hitava", "Gajendra moksha",
        "Ekadasi nirnayaanalu samane manege", "Kudire bandide"
    ]},
    { id: 'vijaya-dasa', ankita: 'Vijaya Vittala', compositions: [
        "Aava janmadha punya", "Manave ni drudhavadare", "Dayamadu dayamadu enna mele", "Bandu nillo kanna munde", "Koduvavanu ninu kombuvanu nanu",
        "Charanava torai cheluvara", "Ele mana murariyane", "Ananda Ananda matte paramananda", "Yachakaru parara sankata", "Mosaru tandino ranga margava",
        "Yake bandeyo ele jiva", "Paradesi ninu svadesi nanu", "Endigahudo nanna darusana", "Hariya maredudakinta papavilla", "Elliddarenu sriharigalladavanu",
        "Namathraya nenayiro", "Sripathiya neivedhya koduva haadu", "Intha prabhuva kaneno", "Sada enna hrdayadalli", "De De adyaane",
        "Bakuta jana munde ninavara hinde", "Belagina javadi baro hariye", "Dayavirali ennalli dharanidharane", "Matanadai mannari krushna", "Vithala ninna nambide enna kayo",
        "Sadhanake bageganenennabahude", "shobana shobanavennire", "Balire balire narasimha", "Narasimha vajrasimha", "raama raama emberadara",
        "Raama ragukulabdhi soma", "Ninna darushanakke bandavanallavo", "Venkatachalanilaya enna odeya", "Hadinalku lokavanaluva tandege", "Sagi barayya bavarogada Baba",
        "Bakutara hrudayamandira", "Dasara pada on Brahmothsava", "Vyaasa badhari nivaasa", "Sathyavathisunu Vedavyasa Srisha", "Vedavyasanaadhanu",
        "Shreemahaa lakumi deviye", "Kshira varidhi kannike marajanake", "Kolhapura nilaya sarasijalaya", "Veni madhavana torise jane triveni", "Jagapatiya toramma enage karunava",
        "Kaye karunambudhiye", "Siteya bumijateya", "Sri tulasiya sevisi", "saranu vaayu thanuja saranu bhaskara deva", "Pavamaana pavamaana",
        "Entu varnipe nammamma", "Rakshisenna ramana pancaparana bheema shaama kaminiyadhanu", "Vatanna jayajatanna loka", "Hanumanta balavanta ati gunavanta", "Hanumanta balavanta ati dayavanta",
        "Munjane eddu sanjivanenni", "Pavamana madgurave pavamana", "Bharave bharathi ramana", "Pranadevara Parijatha", "Jayadevi jayadevi jaya pavanagange",
        "Jaya Jahnavi devi", "Jaya bakuta Gange shobana tharange", "JAya Jayathu Jahnaviye baktha sanjeevi", "Bharati janani palisu nitya marutana", "Bharati bavahariye",
        "Sri marutana manini bharatidevi", "Pasupatiya toramma amma pasupatiya sambo svayambu sambava", "Kailaasa vaasa goureesha eesha", "Pampatheeradha linga linga ennanta ranga", "Sivana nodiro indu stavana madiro",
        "ISha Kailaasavasa Pampapuradipa sri Virupaksha", "Uma Kathyayani gowri dhakshayaani naari gowri koumaari", "Saradeye karunavaridhiye", "Saradambike nitya sarada", "Jaya jaya mooshika",
        "Gajavadhana paliso", "Subbaraya subakaya", "Guruvasake namo embe namma santarana smarisi janaru", "Madhvamuniye enna hrutkumuda", "Madhvamuniye ninage eddu",
        "Ninnane nambide anyarobbara kane", "Madhwaraayara karuna", "Madhvamatava pondadavana", "Tikaacharyara paada", "Saari bhajisiro Jaya rayaara nodiro",
        "Vyasarayara smarisiro", "Vyasarayara seve lesagi madalu", "Sharanu sri vyasamuni saranaabja", "Vadiraja dhira yativara vadadi", "Guru vadiraja ravikoti teja",
        "Guru vadiraja yatiya nenasuvadu", "Ondanondu divasadalli guruvyasarayaru", "Purandara gururaya satppunya kaya", "Dasare purandaradasaru", "Dasara bagyavidu purandara dasara bagyavidu",
        "Besarade Bhajisiro Purandara dasaraayara", "Guru purandara dasare nimma", "Purandara dasarayara", "Nodide gurugala nodide(Raghavendra)", "durita jimutavata",
        "Parama mangala muruti", "Mantralaya nivasa Raghavendra gururaya", "Raghavendram bajeham", "Raghavendra pavana kaya", "Raghavendra",
        "Dasara padagalu on Sri Sathya priya theertharu", "Ekadashi Aacharane", "Chiranjeevu yaagelo chinna neenu", "Ninna olumeyindha", "Dasara pada on Madhwa sarovara, Udupi",
        "Dasara padagalu on Krishnaveni"
    ]},
    { id: 'vyasatirtha', ankita: 'Sri Krishna', compositions: [
        "namah parvati patinuta janapara", "Eduraro guruve samanaro", "Gajamukhane siddhi dhayakane", "Jaya vayu hanumantha", "Krishna ne begane baaro",
        "Baro bega nirajaksha", "Mahime saalade", "Elli mayavadane rangayyanu", "Bhagavad gita sara", "Antarangadhalli hariya kanadava",
        "Hari smarane yembo", "Nambi kettavarillavo", "Nyayave ninage", "Kadagola Tarenna Cinnave", "Jaana ne nahudo",
        "Dasarendare purandara", "Kolalanuduva chaduranyare", "Kalingana metti", "Mangala mukhya praaninge", "Entu pogalalo ninna",
        "Tulasi madhyadhi iruva krushnana"
    ]}
  ];

  const deity = await prisma.deity.upsert({
    where: { name: 'Unknown' },
    update: {},
    create: { name: 'Unknown' },
  });

  for (const composer of composers) {
    const ankitaRecord = await prisma.ankita.upsert({
      where: { name: composer.ankita },
      update: {},
      create: { name: composer.ankita },
    });

    for (let i = 0; i < composer.compositions.length; i++) {
      const title = composer.compositions[i];
      const id = `${composer.id}-${i + 1}`;
      await prisma.composition.upsert({
        where: { id: id },
        update: {
          title: title,
          firstLine: title,
          composerId: composer.id,
          ankitaId: ankitaRecord.id,
        },
        create: {
          id: id,
          title: title,
          firstLine: title,
          lyrics: title, // Placeholder
          composerId: composer.id,
          ankitaId: ankitaRecord.id,
          deityId: deity.id,
        },
      });
    }
  }

  console.log('✅ All missing compositions added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
