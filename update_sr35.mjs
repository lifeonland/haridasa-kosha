import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compId = "sr-35";

  await prisma.composition.update({
    where: { id: compId },
    data: {
      title: "Kaala Beladingalu",
      transliteration: `Kaalabeladingalu ee samsaara kattale beladingalu || P ||

Satyakke dharmanu lettavanaadalu 
ardha bhandaaravellava sotu
matte viraataraayana maneyalli
tottaadalu draupadi ondu varusha || 1 ||

Pundarikaksha purushottama hariyu
bandibovanaada paarthanige bhuu -
mandalanaaluva harishchandraraayanu
kondava kaayidanu holeyanaalaagi || 2 ||

Untaada kaalakke nentaru ishtaru
bantaraagi baagila kaayvaru
untaadatana tappi badatana bandare
onteyante gona melettuvaru || 3 ||

Umbaaga uduvaaga kombaaga koduvaaga
bembaladali nalinalivutiharu
bembalatana tappi badatana bandare
imbu ninagilla nadeyembaru || 4 ||

Eruva dandige nooraalu mandiyu
moorudinada bhagyavu jhanajhanavu
nooraaru saavira dandava tettare
rangavithalanane sariyemborayya || 5 ||`
    }
  });

  const translations = await prisma.translation.findMany({
      where: { compositionId: compId }
  });

  if (translations.length > 0) {
      await prisma.translation.update({
          where: { id: translations[0].id },
          data: {
              english: `This worldly life (samsara) is like a dark moonlight—a deceptive light in the darkness. (Pallavi)

When Dharmaraya played dice for the sake of truth, losing half his treasury and kingdom, Draupadi had to become a maidservant in King Virata's palace for a year. (1)

The lotus-eyed Lord Hari (Purushottama) became a mere chariot driver for Arjuna. King Harishchandra, who once ruled the entire earth, had to become a lowly servant guarding a cremation ground. (2)

When you have wealth, your relatives and friends act as your loyal guards at the door. But when wealth is lost and poverty strikes, they lift their heads high and walk away like a camel. (3)

While you eat, dress well, take, and give, they happily dance around you offering their support. But when that support is lost and poverty strikes, they tell you, "There is no place for you here, walk away." (4)

Riding a grand palanquin, surrounded by a hundred men—this fortune lasts but three days, a mere jingling of coins. Even if you pay a fine of a hundred thousand, can anything ever equal the grace of Ranga Vithala? (5)`,
              kannadaMeaning: `ಈ ಸಂಸಾರವು (ಪ್ರಾಪಂಚಿಕ ಜೀವನ) ಕತ್ತಲೆಯಲ್ಲಿರುವ ಬೆಳದಿಂಗಳಂತೆ ಮೋಸಗೊಳಿಸುವಂಥದ್ದು. (ಪಲ್ಲವಿ)

ಸತ್ಯಕ್ಕಾಗಿ ಧರ್ಮರಾಯನು ಪಗಡೆಯಾಡಿ ತನ್ನ ಅರ್ಧ ರಾಜ್ಯ ಮತ್ತು ಸಂಪತ್ತನ್ನೆಲ್ಲಾ ಸೋತಾಗ, ದ್ರೌಪದಿಯು ವಿರಾಟರಾಜನ ಮನೆಯಲ್ಲಿ ಒಂದು ವರ್ಷ ಕಾಲ ದಾಸಿಯಾಗಿ ದುಡಿಯಬೇಕಾಯಿತು. (೧)

ಕಮಲಾಕ್ಷನಾದ ಪುರುಷೋತ್ತಮ ಹರಿಯು ಅರ್ಜುನನಿಗೆ ಕೇವಲ ಸಾರಥಿಯಾದನು. ಇಡೀ ಭೂಮಂಡಲವನ್ನೇ ಆಳುತ್ತಿದ್ದ ಹರಿಶ್ಚಂದ್ರ ಮಹಾರಾಜನು, ಸ್ಮಶಾನ ಕಾಯುವವನಿಗೆ ದಾಸನಾಗಿ ಕೆಲಸ ಮಾಡಬೇಕಾಯಿತು. ಕಾಲದ ಮಹಿಮೆ ಎಂತಹುದು! (೨)

ನಮ್ಮ ಬಳಿ ಸಂಪತ್ತಿರುವಾಗ, ನೆಂಟರು ಮತ್ತು ಇಷ್ಟಮಿತ್ರರು ನಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ ಕಾವಲುಗಾರರಂತೆ ನಿಲ್ಲುತ್ತಾರೆ. ಆದರೆ ಸಂಪತ್ತು ಕರಗಿ ಬಡತನ ಬಂದಾಗ, ಒಂಟೆಯಂತೆ ಕತ್ತೆತ್ತಿಕೊಂಡು ನಮ್ಮನ್ನು ತಿರುಗಿಯೂ ನೋಡದೆ ಹೋಗುತ್ತಾರೆ. (೩)

ನಾವು ಉಣ್ಣುವಾಗ, ಉಡುವಾಗ, ಮತ್ತು ಕೊಡುಕೊಳ್ಳುವಾಗ ಅವರು ನಮ್ಮ ಬೆಂಬಲಕ್ಕೆ ನಿಂತು ನಲಿಯುತ್ತಾರೆ. ಆದರೆ ನಮ್ಮ ಆರ್ಥಿಕ ಬೆಂಬಲ ತಪ್ಪಿ ಬಡತನ ಬಂದಾಗ, "ನಿನಗಿಲ್ಲಿ ಜಾಗವಿಲ್ಲ, ಹೊರಡು" ಎಂದು ಹೇಳುತ್ತಾರೆ. (೪)

ನೀನು ಹತ್ತುವ ಪಲ್ಲಕ್ಕಿ, ನಿನ್ನ ಹಿಂದಿರುವ ನೂರಾರು ಮಂದಿ, ಮತ್ತು ಈ ಮೂರು ದಿನದ ಸಿರಿ-ಸಂಪತ್ತು ಕೇವಲ ಕ್ಷಣಿಕ. ಲಕ್ಷಾಂತರ ರೂಪಾಯಿ ದಂಡ ತೆತ್ತರೂ, ರಂಗವಿಠಲನ ಕೃಪೆಗೆ ಯಾವುದಾದರೂ ಸರಿಸಮಾನವಾಗಬಲ್ಲದೇ? (೫)`
          }
      });
  }

  console.log("Updated sr-35 successfully!");
}
main().catch(console.error).finally(() => prisma.$disconnect());
