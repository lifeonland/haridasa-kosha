import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const id = 'vyasatirtha-10';
  const composition = await prisma.composition.findUnique({
    where: { id }
  });
  console.log("Found:", composition?.title);
  
  if (composition) {
    await prisma.composition.update({
      where: { id },
      data: {
        title: "Antarangadalli Hariya Kanadava",
        firstLine: "Antarangadalli hariya kanadava huttu kurudano",
        lyrics: `ಅಂತರಂಗದಲಿ ಹರಿಯ ಕಾಣದವನೆಹುಟ್ಟು ಕುರುಡನೋ ||ಪ||
ಸಂತತ ಸಿರಿಕೃಷ್ಣ ಚರಿತೆ ಕೇಳದವನೆಜಡಮತಿ ಕಿವುಡನೊ ಎಂದೆಂದಿಗು||ಅ.ಪ||

ಹರುಷದಲಿ ನರಹರಿಯ ಪೂಜೆಯ ಮಾಡದವನೆ ಕೈ ಮುರಿದವನೊ|
ಕುರುವರ ಸೂತನ ಮುಂದೆ ಕೃಷ್ಣಾಯೆಂದುಕುಣಿಯದವನೆ ಕುಂಟನೋ
ನರಹರಿ ಚರಣೋದಕ ಧರಿಸದ ಶಿರನಾಯುಂಡ ಹೆಂಚು ಕಾಣೊ
ಸುರವರ ಕೃಷ್ಣ ಪ್ರಸಾದವಿಲ್ಲದ ಊಟಸೂಕರ ಭೋಜನವೋ ಎಂದೆಂದಿಗು ||೧||

ಅಮರೇಶ ಕೃಷ್ಣಗರ್ಪಿತವಿಲ್ಲದಾ ಕರ್ಮಅಸತಿಯ ವ್ರತನೇಮವೋ|
ರಮೆಯರಸಗೆ ಪ್ರೀತಿಯಿಲ್ಲದ ವಿತರಣೆರಂಡೆ ಕೊರಳ ಸೂತ್ರವೊ
ಕಮಲನಾಭನ ಪಾಡಿ ಪೊಗಳದ ಸಂಗೀತಗಾರ್ಧಭ ರೋದನವೊ|
ಮಮತೆಯಿಂದಲಿ ಕೇಶವಗೆ ನಮಸ್ಕಾರಮಾಡದವನೆ ಮೃಗವೊ, ಎಂದೆಂದಿಗು||೨||

ಜರೆ ಪುಟ್ಟು ಮರಣವ ತೊಡೆವ ಸುಧೆಯ ಬಿಟ್ಟುಸುರೆಯ ಸೇವಿಸಬೇಡವೊ|
ಸುರಧೇನುವಿರಲಾಗಿ ಸೂಕರ ಮೊಲೆಹಾಲುಕರೆದು ಕುಡಿಯಬೇಡವೊ
ಕರಿರಥಾ ತುರಗವಿರಲು ಬಿಟ್ಟು ಕೆಡಹುವಕತ್ತೆಯೇರಲಿಬೇಡವೊ
ಪರಮ ಪದವನೀವ ಸಿರಿಕೃಷ್ಣನಿರಲಾಗಿನರರ ಸೇವಿಸಬೇಡವೊ, ಎಂದೆಂದಿಗು||೩||`,
        transliteration: `Antarangadalli hariya kanadava huttu kurudano ||pa||
Santata sri krushna carite keladava jadamati kivudano endendigu ||a.pa||

Harushadindali narahariya puje madadavane kai muridavano
Kuruvarasutana munde krushnayendu kuniyadavane kuntano
Narahari charanodakava dharisada Sira nayunda henchu kano
Suravara krushna prasadavillada uta sukara bojanavo endendigu ||1||

Amaresa krushnagarpitavallada karma Asatiya vratanemavo
Ramayarasage pritiyillada vitarane randekorala sutravo
Kamalanabana padi pogalada samgita gardhabarodhanavo
Mamate imdali kesavage namaskara madadavane mrugavo endendigu ||2||

Jare puttu maranava todeva sudheya bittu sureya sevisabedavo
Suradhenuviralagi sukara molehalu karedu kudiyabedavo
Kari ratha turagaviralu bittu kedahuva katteyeralu bedavo
Paramapadavaniva sirikrushnaniralagi narara sevisabedavo endendigu ||3||`,
      }
    });
    
    // Check for translation
    let translation = await prisma.translation.findFirst({
        where: { compositionId: id }
    });
    
    const englishText = "One who cannot see Hari in his inner self is born blind ||pa||\n\nOne who constantly doesn't hear Sri Krishna's stories is a deaf fool forever ||a.pa||\n\nOne who doesn't happily worship Narahari has broken hands\nOne who doesn't dance saying 'Krishna' before the charioteer of Kurus is lame\nThe head that doesn't wear the holy water from Narahari's feet is like a pot eaten from by a dog\nA meal without the offering to Lord Krishna is like a pig's feast forever ||1||\n\nKarma not offered to immortal Lord Krishna is like the fasting vows of an unchaste woman\nCharity without the love of Rama's Lord (Krishna) is like a widow's necklace\nMusic that doesn't sing and praise the lotus-naveled Lord is like a donkey's cry\nOne who doesn't bow to Keshava with affection is an animal, forever ||2||\n\nAbandoning the nectar that wipes away old age, birth, and death, do not drink liquor\nWhen the divine cow (Suradhenu) is present, do not milk and drink from a pig\nWhen elephants, chariots, and horses are present, do not ride a donkey that throws you down\nWhen Sri Krishna, who gives the supreme abode, is present, do not serve mere mortals, forever ||3||";

    if (translation) {
       await prisma.translation.update({
           where: { id: translation.id },
           data: { english: englishText }
       });
    } else {
       await prisma.translation.create({
           data: {
               compositionId: id,
               english: englishText,
               kannadaMeaning: ""
           }
       });
    }
    console.log("Updated vyasatirtha-10 successfully!");
  } else {
    console.log("vyasatirtha-10 not found.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
