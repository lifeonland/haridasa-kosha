import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getOrCreateRaga(name: string) {
    let raga = await prisma.raga.findUnique({ where: { name } });
    if (!raga) raga = await prisma.raga.create({ data: { name } });
    return raga.id;
}

async function getOrCreateTala(name: string) {
    let tala = await prisma.tala.findUnique({ where: { name } });
    if (!tala) tala = await prisma.tala.create({ data: { name } });
    return tala.id;
}

async function updateComposition(
    id: string, 
    title: string, 
    firstLine: string, 
    lyrics: string, 
    transliteration: string, 
    ragaName: string, 
    talaName: string,
    englishTranslation: string
) {
  const ragaId = await getOrCreateRaga(ragaName);
  const talaId = await getOrCreateTala(talaName);

  const composition = await prisma.composition.findUnique({ where: { id } });
  
  if (composition) {
    await prisma.composition.update({
      where: { id },
      data: {
        title,
        firstLine,
        lyrics,
        transliteration,
        ragaId,
        talaId
      }
    });
    
    let translation = await prisma.translation.findFirst({
        where: { compositionId: id }
    });
    
    if (translation) {
       await prisma.translation.update({
           where: { id: translation.id },
           data: { english: englishTranslation, kannadaMeaning: "", wordByWord: "" }
       });
    } else {
       await prisma.translation.create({
           data: {
               compositionId: id,
               english: englishTranslation,
               kannadaMeaning: "",
               wordByWord: ""
           }
       });
    }
    console.log(`Updated ${id} successfully!`);
  } else {
    console.log(`${id} not found.`);
  }
}

async function main() {
  await updateComposition(
    'vyasatirtha-9',
    'Narayana Varma',
    'Sarvadesadalle srihari nammannu rakshiso',
    `ಸರ್ವದೇಶದಲ್ಲೇ ಶ್ರೀಹರಿ ನಮ್ಮನ್ನು ರಕ್ಷಿಸೋ
ಜಲದಲ್ಲಿ ಮತ್ಸ್ಯಾವತಾರನಾಗಿ
ಸ್ಥಳದಲ್ಲಿ ವಾಮನನಾಗಿ ರಕ್ಷಿಸೋ ನಿನ್ನ ಭಕ್ತರನ್ನು
ಆಕಾಶದಲ್ಲಿ ತ್ರಿವಿಕ್ರಮನಾಗಿ ರಕ್ಷಿಸೋ।।

ಭಯಗಳಲ್ಲಿ ನಾರಸಿಂಹನಾಗಿ
ಮಾರ್ಗದಲ್ಲಿ ವರಾಹನಾಗಿ ರಕ್ಷಿಸೋ ನಿನ್ನ ಭಕ್ತರನ್ನು
ಪರ್ವತಾಗ್ರದಲ್ಲಿ ಪರಶುರಾಮನಾಗಿ ರಕ್ಷಿಸೋ
ವನವಾಸದಲ್ಲಿ ರಾಮಚಂದ್ರನಾಗಿ ।।

ಕರ್ಮಬಂಧಂಗಳ ಕಳೆದು ರಕ್ಷಿಸೋ ನಮ್ಮ ಕಪಿಲಮೂರ್ತಿ
ಕಾವೇಶದಲ್ಲಿ ಸನತ್ಕುಮರನಾಗಿ ರಕ್ಷಿಸೋ
ದುರ್ಮಾರ್ಗದಲ್ಲಿ ಹಯಗ್ರೀವನಾಗಿ
ಅನ್ಯದೇವತೆ ಪೂಜಾ ಅಲ್ಲೇ ರಕ್ಷಿಸೋ ನಮ್ಮ ಮಹಿದಾಸ ।।

ಪಾಷಂಡಮತದಲ್ಲಿ ಬೌದ್ಧನಾಗಿ ರಕ್ಷಿಸೋ
ಅನ್ಯ ದೂತಣಿ ಅವತರಿಸಿ ನಮ್ಮ ದುಂದುಭಿಯಾದಿಂದಲಿ ರಕ್ಷಿಸೋ
ನಮ್ಮ ಶ್ರೀವಿಶ್ವಮೂರ್ತಿ ನರಕಗಳಿಂದಲಿ ಕೂರ್ಮನಾಗಿ ರಕ್ಷಿಸೋ
ಆಪತ್ತುಗಳಿಗೆ ಧನ್ವಂತ್ರಿಯಾಗಿ ಕಲಿಯುಗ ಕಲ್ಮಶ ರಕ್ಷಿಸೋ ।।

ನಮ್ಮ ಕಲ್ಕಿ ಮೂರ್ತಿ
ಪ್ರಾತಃಕಾಲದಲ್ಲಿ ಕೇಶವ ನಮ್ಮನ್ನು ರಕ್ಷಿಸೋ
ಸಂಧ್ಯಾಕಾಲದಲ್ಲಿ ವಿಷ್ಣು ನಮ್ಮ ರಕ್ಷಿಸೋ
ಸಂಗಮದಲಿ ಗೋವಿಂದನಾಗಿ ಸಾಯಂಕಾಲದಲ್ಲಿ ರಕ್ಷಿಸೋ ।।

ನಮ್ಮ ಶ್ರೀಧರನಾಗಿ ಪೂರ್ವಕಾಲದಲ್ಲಿ ಹೃಷೀಕೇಶ ನಮ್ಮನ್ನು ರಕ್ಷಿಸೋ
ನಿಶಾಕಾಲದಲ್ಲಿ ಪದ್ಮನಾಭನಾಗಿ ಅಪರಾತ್ರಿ ಕಾಲದಲ್ಲಿ ರಕ್ಷಿಸೋ
ನಮ್ಮ ಶ್ರೀ ವಿಶ್ವಮೂರ್ತಿ ಉಷಃಕಾಲದಲ್ಲಿ ಜನಾರ್ಧನನಾಗಿ ರಕ್ಷಿಸೋ ।।

ಸಕಲ ಕಾಲವು ಸಂಧಿಸಿ ಶ್ರೀ ಹರಿ ನಿಮ್ಮ ಚಕ್ರವು
ಅತಿ ಶಾಲಪ್ರಭೆಯಂತೆ ಪ್ರಳಯಕಾಲದ ಅಗ್ನಿಯಂತೆ
ಈ ಮೂರು ಷಡವೈದು ಸೈನ್ಯಗಳ ಅಗ್ನಿವಾಯು ಒಡಗೂಡಿ ತೃಣವ
ಸುಡುವಂತೆ ಭೂತಗಂಧರ್ವರ ಪೂಷಾಂಡವ ಕೆಡಿಸಿ
ನಮ್ಮ ಸಲಹದೆನುತ ವಿಷ್ಣು ಶಂಖವೇ ನಿಮ್ಮ ಧ್ವನಿ ಕೇಳಿ
ರಾಕ್ಷಸರು ಭಯಬಿಡಿಸಿ ಎದೆಯೊಡೆಸಿ ಲಯವನ್ನು ಮಾಡಿ
ವಿಷ್ಣು ಗಜೇಂದ್ರ ರಾಕ್ಷಸರ ಕಡೆದು ಚೂರ್ಣವ ಮಾಡಿ
ಕಿವಿಗಳ೦ತುದುರಿಸಿ ಭೂಮಿಯಲ್ಲೇ ಅವತರಿಸಿ
ವೈಷ್ಣವ ಸುಜನರನು ಸಲಹೆಂದು ನಿಮ್ಮ ಪ್ರಾರ್ಥನೆಯ ನಾ ಮಾಡಿದೆ
ಸಾಮವೇದಕೆ ಭೀಮನಾದ ಗರುಡಗೆ ಸಲಹುವನು
ನಮ್ಮ ಪ್ರಾಣಾ೦ಗ ಭೂಮಿ ದಿಕ್ಕು ದಿಕ್ಕಿಗೆ ನಾರಸಿಂಹ ಮೂರುತಿಯಾಗಿ
ತಾ ಒಳ ಹೊರಗೆ ವ್ಯಾಪಕನಾಗಿ
ಶ್ರೀಹರಿ ಇದ್ದು ರಕ್ಷಿಸಲಿ ಘೋರ ದುರಿತಗಳೆಲ್ಲ
ಓಡುತಿರಲಿ ಅಂದಾಪರಿಯಲಿ ಸರ್ವವ್ಯಾಪಕನಾಗಿ ರಕ್ಷಿಸೋ
ಎಲ್ಲಾ ಪರಿಯಿಂದ ಭಕ್ತರನ್ನು ನೆನೆಯೆ ಮಧ್ವಗುರು ಅಂತರ್ಯಾಮಿ
ನಮ್ಮ ಶ್ರೀಮದಾನಂದತೀರ್ಥರನು ಸುವ್ವಿ ಸರ್ವೋತ್ತಮನೆ
ಸುವ್ವಿ ವಿಶ್ವರೂಪನೆ ಸುವ್ವಿ ನಮ್ಮ ಶ್ರೀಮದನಂತಾವತಾರಗಳಿಗೆ
ಸುವ್ವಿ ಎಂದು ಪಾಡಿ ಸುಖಿಯಾದ ಜಮದಗ್ನಿ ವತ್ಸಲ ಭೃಗುರಾಮ
ಭೂಮಿ ಜಲದಲ ಜಯ ಶ್ರೀರಾಮ ಜಾನಕಿ ವಲ್ಲಭ
ದಶರಥ ರಾಮ ರಾಮ ನಾಮಕ್ಕಿಂತ ಇನ್ನ್ಯಾವುದೂ ಸರಿಯಿಲ್ಲವೆಂದು
ಮೊರೆ ಹೊಕ್ಕೆನು ಶ್ರೀಹರಿಯೇ ಮುಕ್ತಿ ಬಲವಂತ
ಮುಕ್ತಿ ಗೋವಿಂದ ಕಾಮಧೇನು ಕಲ್ಪತರು ಗೋವಿಂದ
ನಾಮೋಚ್ಚರಣ ಪರಮಾತ್ಮ ಗೋವಿಂದ ಸ್ಮೃತಿತತಿಗಳ ಕೊಂಡಾಡುವೆ
ಹರೇ ನಾರಾಯಣ ಪುರಾಣ ಪುರುಷೋತ್ತಮ
ಆದಿನಾರಾಯಣ ಮಂತ್ರವೊಂದೇ ಅಂಬರೀಷನ ಮರಿಕಾಯ್ದಿತ್ತು
ಈ ಮಂತ್ರ ತುಂಬುರು ನಾರದರಿಗೆ ಶ್ರೀ ಕೃಷ್ಣಮಂತ್ರ
ಶಂಭು ನಾರಿಪಿತನ ಸಲಹಿತು`,
    `Sarvadesadalle srihari nammannu rakshiso
Jaladalli matsyavataranagi
Sthaladalli vamananagi rakshiso ninna Baktarannu
Akasadalli trivikramanagi rakshiso||

Bayagalalli narasimhanagi
Margadalli varahanagi rakshiso ninna Baktarannu
Parvatagradalli parasuramanagi rakshiso
Vanavasadalli ramachandranagi ||

Karmabandhangala kaledu rakshiso namma kapilamurti
Kavesadalli sanatkumaranagi rakshiso
Durmargadalli hayagrivanagi
Anyadevate puja alle rakshiso namma mahidasa ||

Pashandamatadalli bauddhanagi rakshiso
Anya dutani avatarisi namma dundubiyadindali rakshiso
Namma srivisvamurti narakagalindali kurmanagi rakshiso
Apattugalige dhanvantriyagi kaliyuga kalmasa rakshiso ||

Namma kalki murti
Pratahkaladalli kesava nammannu rakshiso
Sandhyakaladalli vishnu namma rakshiso
Sangamadali govindanagi sayankaladalli rakshiso ||

Namma sridharanagi purvakaladalli hrushikesa nammannu rakshiso
Nisakaladalli padmanabanagi aparatri kaladalli rakshiso
Namma sri visvamurti ushahkaladalli janardhananagi rakshiso ||

Sakala kalavu sandhisi sri hari nimma cakravu
Ati salaprabeyante pralayakalada agniyamte
I muru shadavaidu sainyagala agnivayu odagudi trunava
Suduvante butagandharvara pushandava kedisi
Namma salahadenuta vishnu sankave nimma dhvani keli
Rakshasaru bayabidisi edeyodesi layavannu madi
Vishnu gajendra rakshasara kadedu curnava madi
Kivigalantudurisi bumiyalle avatarisi
Vaishnava sujanaranu salahendu nimma prarthaneya na madide
Samavedake bimanada garudage salahuvanu
Namma prananga bumi dikku dikkige narasimha murutiyagi
Ta ola horage vyapakanagi
Srihari iddu rakshisali gora duritagalella
Odutirali andapariyali sarvavyapakanagi rakshiso
Ella pariyinda Baktarannu neneye madhvaguru antaryami
Namma srimadanandatirtharanu suvvi sarvottamane
Suvvi visvarupane suvvi namma srimadanantavataragalige
Suvvi endu padi sukiyada jamadagni vatsala brugurama
Bumi jaladala jaya srirama janaki vallaba
Dasaratha rama rama namakkinta innyavudu sariyillavemdu
More hokkenu srihariye mukti balavanta
Mukti govinda kamadhenu kalpataru govinda
Namoccarana paramatma govinda smrutitatigala kondaduve
Hare narayana purana purushottama
Adinarayana mantravonde ambarishana marikaydittu
I mantra tumburu naradarige sri krushnamantra
Sambu naripitana salahitu`,
    'Stotra',
    'Chanted',
    `May Sri Hari protect us in all places.
As Matsyavatara (the fish) in the water,
As Vamana on the land, protect your devotees,
As Trivikrama in the sky, protect us.

As Narasimha in our fears,
As Varaha on the path, protect your devotees,
As Parashurama on the mountain peak, protect us,
As Ramachandra during forest exile.

Removing the bonds of karma, may our Kapila Murti protect us,
As Sanatkumara in disguise, protect us,
As Hayagriva on the bad paths,
Where other gods are worshipped, protect us, our Mahidasa.

As Buddha among the heterodox sects, protect us,
Incarnating as another messenger, protect us with the sounds of our drums,
May our Sri Vishwamurti protect us from the hells as Kurma,
As Dhanvantari in dangers, protect us from the impurities of Kali Yuga.

Our Kalki Murti,
In the morning, may Keshava protect us,
At dusk, may Vishnu protect us,
As Govinda at the confluence, protect us in the evening.

As our Shridhara in the earlier times, may Hrishikesha protect us,
As Padmanabha in the night, protect us at midnight,
May our Sri Vishwamurti as Janardhana protect us at dawn.

When all times join, O Sri Hari, your discus,
Like the intense glow of the sal tree, like the fire of destruction,
Combining the fire and wind of these numerous armies, burning them like grass,
Destroying the illusions of ghosts and gandharvas,
Saying 'protect us', hearing the sound of your Vishnu conch,
Removing the fear of the demons, breaking their chests and causing destruction,
Vishnu destroying the demons and making them into powder,
Striking off their ears, incarnating right on this earth,
'Protect the good Vaishnava people', I have made this prayer to you.

He who protects Garuda, the sonorous voice of Samaveda,
Our life breath, Earth, in every direction, becoming the form of Narasimha,
Spreading both inside and outside,
May Sri Hari remain and protect us, driving away all terrible sins,
In that manner, being all-pervading, protect us.

By remembering the devotees in every way, the inner controller of Madhwa Guru,
Our Srimad Ananda Tirtha, Suvvi, the supreme one!
Suvvi, the universal form, Suvvi, to our infinite incarnations,
Singing 'Suvvi', the happy Bhrigurama, beloved of Jamadagni,
Victory on land and water, Sri Rama, the lord of Janaki.

Dasharatha Rama, thinking there is nothing equal to the name of Rama,
I took refuge in you, O Sri Hari, the strong one of liberation.
Govinda of liberation, Kamadhenu, Kalpataru Govinda,
Uttering your name, Supreme Soul Govinda, I will praise the collection of memories.

Hare Narayana, ancient Purushottama,
Only the mantra of Adinarayana protected the child of Ambarisha,
This mantra to Tumburu and Narada, Sri Krishna mantra,
Protected the father of Shambu's wife.`
  );
}

main().catch(console.error).finally(() => prisma.$disconnect());
