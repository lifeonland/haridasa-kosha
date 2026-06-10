import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Batch adding remaining Purandara Dasa compositions...');

  const composerId = 'purandara-dasa';
  
  // Fetch existing Ankita and Deity for Purandara Dasa
  const ankita = await prisma.ankita.findFirst({ where: { name: 'Purandara Vittala' } });
  const deity = await prisma.deity.findFirst({ where: { name: 'Vittala' } });

  if (!ankita || !deity) {
    throw new Error('Ankita or Deity not found');
  }

  const compositionTitles = [
    "Hege maadali magivige", "Kandha bedovo", "Kaayalereno Krishna", "Boochi bandide", "Nodu nodu nodu krushna",
    "Baaramma ele muddu", "Sikkidhane jaane", "Gokuladholu ninna Magana", "Sahisalaarene gopi", "Kandhaneke malagane",
    "Bavvu bandhithalla", "Aada hodhalli", "utakke bandhevu", "Baaro brahmaadhi vandhya", "Yenu madelo magane",
    "Jo jo yashodeya kandha", "Helidhare namma mele yaake", "Kelalollane enna matanu ranga", "Hannu bandide kolliri niviga", "I pariya sobagava devarali kane",
    "Bandanene ranga bandanene", "Kandu kandu ni enna kai biduvare krushna", "Mannaru krushnage mangala", "Adidano ranga adbutadindali", "Krushna baro krushna baro",
    "Bannisi gopi ta harasidalu-Enne acchuva haadu", "Malagi eddanu ranga", "Muddu maada baarade", "Jaganmohanane krushna", "Pillangoviya cheluva",
    "Lalisidhalu Magana", "Jagadoddharana adisidale yashode", "Ambe kalikuthali", "yadava ne baa", "Entha punyava gopi",
    "Mella mellane", "amma nimma manegalalli", "tholu tholu tholu ranga", "Enu saviyo", "Yenu marulatheyamma",
    "Devaki kanda mukunda", "Gummana karayadire", "hogadhiralo", "Jo Jo Shri Krsna Paramananda", "Kadagola Tarenna Cinnave",
    "kolalanuthudha", "krishna ena barade", "Kande na udupiya krishnana", "yaare rangana yaare krishnana", "Rangana nodire",
    "Ada hogona baro ranga", "Aluvadyatako ranga attaranjipa gumma", "Ena pelale gopi ninna magana", "Krushnamurti kanna munde", "Mahadadi deva namo",
    "Nambide ninna pada narasimha", "Banda simha narasimha", "Narasimha mantravu", "idhu enanga mohananga", "simha roopa nadha sri hari",
    "Narasimhana paada", "Narasimha prathrurbhava(kannada)", "Karma bandhana chethana raghu ramana", "Jaya janaki kantha", "Raama raama raama",
    "Jayathu kothanda rama", "raama mantrava", "Alli nodalu Raama", "Raama raama raama seetaa raamaa enniro", "Raama namava nudi nudi",
    "saranu sakaloddhara", "Rama embuva eradu aksharada", "Venkatesha bedi", "Kaliyugadha mahinmeyanu", "Srinivasa kalyana by Puranadara dasaru",
    "odi barayya venkatapathi", "dasana madiko enna", "Barayya venkataramana", "Bandu nindiha nodi", "Enna manada Donka tiddaso",
    "Govinda namo govinda", "Vaidya banda nodi venkatanemba", "Neene dayaalu nirmala chitta govinda", "Govindaa ninna naamave chandaa", "Tirupathi Venkataramana",
    "Venkataramanane baaro", "Srinivasa neene paaliso", "Daniya nodidhano venkatana", "Venkataachala nilayam", "Ninna nodi dhanyanaadeno",
    "kande kande swamiya", "Indu ninna mareya hokke venkatesane", "Govinda ninnananda sakala", "Nanenu madideno venkataraya", "Srinivasa devaru betege hodhadhu",
    "Mutthaidhara irabeku", "Sakala graha bala", "Danguruva sari hariya", "Hariya neneyiro", "Kaliyugadhali hari namava",
    "Hari bhakuti ullavara", "Elayya shrihari belagayitu", "harinaama jihveyolirabeku", "Laali laali namma hariye laali", "Hari naaraayana hari naaraayana",
    "Hari kunidaa namma hari kunidaano", "smariso sarvada hariya", "tugire rangana", "Rama nama payasakke", "Murutiyane nilliso",
    "Avanavanu kayda", "enagu ane ranga", "hari namadaraginiyu", "Narayana ninna namada", "ondu namavu salade",
    "Smarane onde salade", "Rama krushnaru manege", "dharanige doreyendu", "hariyemba namamrutada", "Marayebeda manave",
    "I pariya sobagava", "kesava madhava govinda", "Ranga baaro panduranga", "shobhanave idhu shobhanave", "yamanelli kaananendu",
    "Kande na govindana(Kesava nama)", "Deva banda namma svami bandano", "Bandaddella barali govindana", "Nambi kettavarillavo rangayyana", "Idu bagya idu bagya idu bagyavayya",
    "Aru badukidarayya hari ninna nambi", "Dari yavudayya vaikunthake dari torisayya", "Dayamado ranga dayamado", "Nine anathabandhu", "Nimma bagya doddado namma bagya",
    "Pavadisu paramatmane svami", "Ba ba ranga bujangasayana", "Ranga baro ranga baro rangayya baro", "Narayana te namo namo Bava", "Elliruvano ranganemba samsaya beda",
    "Kande na kanasinali govindana", "Kaiya toro karunigalarasa", "Palaharavane mado", "Lakshmikanta baro", "Enu helali tangi timmayyana padavanu",
    "Samanyavalla sri hariya seve", "shobhanave idhu shobhanave(Purandara dasaru)", "Shobana shobhanave(Purandara dasaru)", "Pandharapura vemba dodda nagara", "Ittige mele ninta namma vittala tanu",
    "Sharanu ninage sharanembeno vittala", "Vithala salaho swaami namma", "Nere nambide madh hrudaya", "Yenu mecchidhe ele henne", "Aarige vadhuvaade ambujaakshi",
    "Aravindaalaye taaye", "Bandaalu namma manege", "Bhagyada Lakshmi baramma", "Marulu madi kondeyalle", "Sri Mahalakshmiya alankarisi",
    "enu dhanyalo", "paalise enna", "intha hennina nanelli", "Mangalam sri tulasi", "Elli shri tulasiya",
    "Kalyaanam tulasi kalyaanam", "Vrundavanave mandiravagiha", "importance of tulasi in pooja(Ollano hari kollano)", "Vrundavanadevi namo namo", "Jaya mangala vrundavanadevige",
    "Hanumantha ne balu", "sari bandane", "Svami mukya prana ninna", "entha balavanthano", "Hanuma namma thayi thande",
    "Gatika Chaladi ninta Sri hanumanta", "Sundaramurthi Mukhya prana", "Veera hanuma bahu paraakramaa", "Nodirayya hanumantana", "Karava mugida mukhyapraana",
    "kusina kandira", "Biduvennayya hanumaa", "enagobba dore dorakidanu", "Anjikinyatakayya sajjanarige", "Gururayara nambiro",
    "Sevakatanada ruci yenaridyo", "Ma maje bapure balire hanumanta", "Madhwa muniye namma guru madhva muniye", "Madhvarayara nenendu suttaragiro", "Shri madhva rayara seve dorakuvadu",
    "Shri madhva ramana ninna", "Madhva raayaa guru madhvaraayaa", "Idiryaro guruve samaryaro", "kande karunanidhiya gangeya", "entha cheluvage magalanu kottenu",
    "chandrachuda sivashankara", "Karunya muriteye", "Siva darusana namagayitu kele", "Sharanembe vani-poreye kalyani", "Onde manadali bhajisu vagdeviya",
    "Kodu bega divyamati Sarasvati", "Paalisema muddu shaarade", "Nalidade enna nalige mele", "bharathi deviya nene nene", "Bharatidevi taye ni kaye",
    "Saranu bharatidevige", "Bhagirathi devi bayanivarane gange", "Lambodhara lakumikara", "Vandisuvadadiyali gananathana", "Sharanu siddhi vinayaka",
    "Gajavathana beduve", "Madhwa mathakinnu sari", "Pankaja mukhiyarellaru", "Haridhyana vemba aabarana – aarathi song", "Mangalam dashaavathara",
    "Jayamangalam nitya subamangalam", "Mangalam jaya mangalam", "mangalaM mangalaM muKyaprANarAyage", "mangalaM jayamangalaM(akrUragolida trivikramage)", "mangalaM jayamangalaM (carisuva jaladali)",
    "Manasa pooje", "Gajendra Moksha", "Drowpathi maana rakshane", "Sudhaamana haadu", "Udaya Raaga(Gajendra moksha, Akshya patre & Ajamilana kathe)",
    "Mahabharata", "Betel leaves (viladhale)dharma", "Ughabhoga collections", "Ugabhoga on Madhwacharyaru", "Hari embodhe",
    "Ugabhoga on Tulasi", "Hari hararu hege samaru", "Hari hararu samarendu ariyada", "Hariyadhika haranadhika endu", "sri pathiyu namage",
    "Taratamya- Purandara dasara kriti", "Madhwa philosophy and Taratamya By purandara dasaru", "Ombattu bagilolu", "Onde kugalate", "eravina sirige",
    "uradevara madabekanna", "eke chintisutidi", "isabeku iddu jayisabeku", "hyange bareditto", "badukidenu badukidenu",
    "tarakka bindige na nirige", "Manava janma doddadu", "Huva taruvara manege", "Nanda tanaya govindana", "adadella olite ayitu",
    "urige bandare dasayya", "yake nirdayanade", "lolalotte ella", "Ivana hididukondu hogelo", "teliso illa mulugiso",
    "baiyiro baiyiro", "innu daya barade", "anubhavadadugeya madi", "Binnahake bayillavayya", "enu madidarenu",
    "donku balada nayakare", "Ambiga na ninna nambide", "Allide nammane illi bande", "Ragi tandira", "satyavantharigidu kaala illa",
    "Madi madi yendu", "Naneke badavanu", "Naa madida karma", "Ninnayako ninna", "Madhwarayara devatarcaneya",
    "Guruvina gulamanaguva", "Acharavillada nalige ninna", "Kallusakkare kolliro nivellaru", "Arenu maduvaru avaniyolage", "Jaliya maradante dhareyolu durjanaru",
    "Chinte yatako bayala branti yatako", "Paraku madade parambarisi", "Rokka eradakku duhka kanakka", "Muttu kolliro", "Noduvude kannu keluvude kivi",
    "Antakana dutarige kincittu dayavilla", "Aj~janigala kuda adhika", "Ikkalare kai enjalu , cikka", "Giliyu panjaradolilla", "Tappugalellava pariharisuva nammappanallave ninu",
    "Nambadiru I deha nityavalla", "Na madida karma balavantavadare", "Purvajanmadali na madida", "Yamana sasana kelo jiva", "Yama tanna puradi saridanu",
    "Hendati prana hinduti", "Hetta tayi tandegala", "Huccu hidiyitu enage", "Madhukara vrutti ennadu adu balu", "Gali banda kaiyalli",
    "Kagada bandide namma", "Nageyu barutide enage nageyu", "Tala beku takka mela beku", "Madhwacharyaru suladhi(By Purandara dasaru)", "Rudra devara suladhi(Purandara dasaru)",
    "Sulaadhi on Tulasi devi by Purandara dasaru"
  ];

  for (let i = 0; i < compositionTitles.length; i++) {
    const title = compositionTitles[i];
    const id = `purandara-${i + 200}`;
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

  console.log(`✅ ${compositionTitles.length} additional Purandara Dasa compositions added/updated successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
