import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const composer = await prisma.composer.findUnique({
    where: { id: 'sripadaraja' },
    include: { ankita: true }
  });

  if (!composer) {
    console.error("Sripadarajaru not found!");
    process.exit(1);
  }

  let deity = await prisma.deity.findFirst({ where: { id: 'krishna' } });
  if (!deity) {
     deity = await prisma.deity.findFirst();
  }

  const compId = "sripadaraja-olide-yatakamma";

  // Check if composition exists to avoid duplicate translation entries
  const existing = await prisma.composition.findUnique({
      where: { id: compId }
  });

  if (existing) {
      console.log("Composition already exists, not adding duplicate.");
      return;
  }

  const composition = await prisma.composition.create({
    data: {
      id: compId,
      title: "ಒಲಿದೆ ಯಾತಕಮ್ಮಾ ಲಕುಮೀ",
      firstLine: "ಒಲಿದೆ ಯಾತಕಮ್ಮಾ ಲಕುಮೀ",
      lyrics: `ಒಲಿದೆ ಯಾತಕಮ್ಮಾ ಲಕುಮೀ
ವಾಸುದೇವಗೆ                                                                         ಪ.

ಶುದ್ಧ ನೀಲವರ್ಣದ ಮೈಯ
ಕಪ್ಪಿನವನಿಗೆ ಹ್ಯಾಗೆ                                                          ಅ.ಪ.

ಹುಟ್ಟಿದ ಮನೆಗಳ ಬಿಟ್ಟು ಕಳ್ಳ
ದಿಟ್ಟತನದಿ ಗೋಕುಲದಲಿ ಬೆಳೆದ
ಜುಟ್ಟಿ ಸಹಿತ ಹಾಲು ಕುಡಿದು ಅಲ್ಲಿ
ದಿಟ್ಟ ಕಾಲಿಂಗನ ಹೆಡೆಯ ತುಳಿದವನಿಗೆ                                      

ಗೊಲ್ಲರ ಮನೆಗಳ ಪೊಕ್ಕು ಅಲ್ಲಿ
ಗೊಲ್ಲು ಮಾಡದೆ ಮೊಸರೆಲ್ಲ ಸವಿದ
ಮೆಲ್ಲನೆ ಸವಿ ಮಾತನಾಡಿ ಅಲ್ಲಿ
ಎಲ್ಲ ಸಖಿಯರ ಅಭಿಮಾನಗೇಡಿಗೆ                                                  

ಮಾವನ ಮರ್ದಿಸಿದವಗೆ ಅಲ್ಲಿ
ಸೋಳಸಾಸಿರ ಗೋಪೇರಿಗೆ ಮದುವೆ ಆದವಗೆ
ಹಾವಿನ ಮ್ಯಾಲೋರಗಿದವಗೆ
ಕಾವೇರಿತೀರದ ರಂಗವಿಠಲಗೆ`,
      transliteration: `Olide yaatakammaa lakumii
vaasudevage (P)

Shuddha niilavarnada maiya
kappinavanige hyaage (A.P.)

Huttida manegala bittu kalla
dittatanadi gokuladali beleda
jutti sahita haalu kudidu alli
ditta kaalingana hedeya tulidavanige

Gollara manegala pokku alli
gollu maadade mosarella savida
mellane savi maatanaadi alli
ella sakhiyara abhimaanagedige

Maavana mardisidavage alli
solasaasira goperige maduve aadavage
haavina myaaloragidavage
kaaveriteerada rangavithalage`,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: composer.ankitaId
    }
  });

  await prisma.translation.create({
    data: {
      compositionId: composition.id,
      english: `Oh Goddess Lakshmi, why did you become so fond of this Vasudeva? (P)

How could you fall for one who has a purely dark, blue-colored body? (A.P)

Leaving the house where he was born, this thief grew up boldly in Gokula. Drinking milk eagerly with his tuft of hair, he boldly stepped on the hood of the serpent Kaliya.

Sneaking into the houses of the cowherds, without making any noise, he tasted all the curds. Speaking softly and sweetly, he stole the pride of all the gopis (friends).

He is the one who destroyed his uncle (Kamsa), the one who married sixteen thousand cowherd women, the one who reclines on a snake (Adisesha), the Ranga Vithala residing on the banks of the Kaveri river.`,
      kannadaMeaning: `ಹೇ ಲಕ್ಷ್ಮೀದೇವಿ, ನೀನು ಈ ವಾಸುದೇವನಿಗೆ ಏಕೆ ಇಷ್ಟಪಟ್ಟೆ? (ಪ)

ಶುದ್ಧ ನೀಲವರ್ಣದ ಕಪ್ಪು ಮೈಬಣ್ಣ ಹೊಂದಿರುವವನಿಗೆ ನೀನು ಹೇಗೆ ಒಲಿದೆ? (ಅ.ಪ)

ಹುಟ್ಟಿದ ಮನೆಯನ್ನು ಬಿಟ್ಟು, ಕಳ್ಳನಾಗಿ ಧೈರ್ಯದಿಂದ ಗೋಕುಲದಲ್ಲಿ ಬೆಳೆದನು. ಜುಟ್ಟಿನೊಂದಿಗೆ ಹಾಲನ್ನು ಕುಡಿದು, ಅಲ್ಲಿ ಕಾಳಿಂಗ ಸರ್ಪದ ಹೆಡೆಯನ್ನು ತುಳಿದವನಿಗೆ ನೀನು ಏಕೆ ಒಲಿದೆ?

ಗೊಲ್ಲರ ಮನೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ, ಸ್ವಲ್ಪವೂ ಸದ್ದು ಮಾಡದೆ ಮೊಸರನ್ನೆಲ್ಲಾ ಸವಿದನು. ಮೆಲ್ಲನೆ ಸಿಹಿಯಾದ ಮಾತುಗಳನ್ನಾಡಿ, ಅಲ್ಲಿನ ಎಲ್ಲಾ ಗೋಪಿಕೆಯರ ಅಭಿಮಾನವನ್ನು ಕದ್ದವನಿಗೆ ನೀನು ಒಲಿದೆಯಲ್ಲ?

ತನ್ನ ಮಾವನಾದ ಕಂಸನನ್ನು ಕೊಂದವನಿಗೆ, ಹದಿನಾರು ಸಾವಿರ ಗೋಪಿಕೆಯರನ್ನು ಮದುವೆಯಾದವನಿಗೆ, ಹಾವಿನ (ಆದಿಶೇಷನ) ಮೇಲೆ ಮಲಗಿರುವವನಿಗೆ, ಕಾವೇರಿ ನದಿ ತೀರದಲ್ಲಿರುವ ರಂಗವಿಠಲನಿಗೆ ನೀನು ಒಲಿದೆಯಲ್ಲ!`,
      wordByWord: "{}"
    }
  });

  console.log("Added successfully:", composition.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
