const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const raga = await prisma.raga.findFirst({ where: { name: "Kalyani" } });
  const tala = await prisma.tala.findFirst({ where: { name: "Adi" } });

  const lyrics = `ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ಕೃಷ್ಣಯ್ಯ ನೀ,
ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ರಂಗಯ್ಯಾ?
ಬಾಲಯ್ಯ ನೀನೆನ್ನ ಕಣ್ಣ ಮುಂದಾಡದೆ,
ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ಕೃಷ್ಣಯ್ಯ ನೀ,
ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ರಂಗಯ್ಯಾ?

ಆಲಯದೊಳಗೇ ನೀನಾಡದೇ ಬೆಣ್ಣೆ,
ಹಾಲು ಸಕ್ಕರೆ ನೀ ಬೇಡದೆ,
ಇಲ್ಲಿ ಬಾಲರಿಂದೊಡಗೂಡಿ ಆಡದೇ,
ಮುದ್ದು ಬಾಲಯ್ಯ ನೀನೆನ್ನ ಕಣ್ಣ ಮುಂದಾಡದೆ,
ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ಕೃಷ್ಣಯ್ಯ ನೀ,
ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ರಂಗಯ್ಯಾ?

ಬಟ್ಟ ಮುತ್ತಿನ ಬೊಗಸೆ ಕಂಗಳೂ,
ಹಣೆಯೊಳ್ ಇಟ್ಟ ಕಸ್ತೂರಿ ತಿಲಕ ಗಂಧವೂ,
ದಿಟ್ಟತನದಿ ಓಡ್ಯಾಡಲೂ,
ಪುಟ್ಟ ಕೃಷ್ಣಯ್ಯ ನೀನೆನ್ನ ಕಣ್ಣ ಮುಂದಾಡದೆ,
ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ಕೃಷ್ಣಯ್ಯ ನೀ,
ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ರಂಗಯ್ಯಾ?

ಅಷ್ಟದಿಕ್ಕಲಿ ಅರಸಿ ಕಾಣದೇ,
ನಾ ದೃಷ್ಟಿಗೆಟ್ಟೆನೊ ನಿನ್ನ ನೋಡದೇ
ಇನ್ನೆಷ್ಟು ಹೇಳಲಿ ಕೇಳಬಾರದೇ?
ರಂಗವಿಠ್ಠಲ ನೀನೆನ್ನ ಕಣ್ಣ ಮುಂದಾಡದೆ,
ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ಕೃಷ್ಣಯ್ಯ ನೀ,
ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ರಂಗಯ್ಯಾ?`;

  const translation = `Refrain:
Where have you been wandering, my Krishna? Where have you been, my Ranga? Without playing before my eyes, where did you go?

Stanza 1:
You didn't stay inside the house to play; you didn't even ask for butter, milk, or sugar. You didn't play here with the other children. My dear child, why weren't you playing in front of me?

Stanza 2:
With your large, pearl-like eyes and the musk (Kasturi) tilak and sandalwood on your forehead, you run around so boldly. My little Krishna, why weren't you playing where I could see you?

Stanza 3:
I searched for you in all eight directions but couldn't find you. My eyes have grown weary from not seeing you. How much more should I call out? Won't you listen? Rangavittala (Krishna), why won't you play before my eyes?`;

  await prisma.composition.update({
    where: { id: "sr-29" },
    data: {
      lyrics: lyrics,
      firstLine: "ಎಲ್ಲಾಡಿ ಬಂದೇ ಎನ್ನ ಕೃಷ್ಣಯ್ಯ ನೀ",
      ragaId: raga?.id,
      talaId: tala?.id,
      translations: {
        deleteMany: {},
        create: {
          english: translation,
          kannadaMeaning: "",
          wordByWord: ""
        }
      }
    }
  });
  console.log("✅ Updated sr-29 with lyrics and translation");
  await prisma.$disconnect();
}
main();
