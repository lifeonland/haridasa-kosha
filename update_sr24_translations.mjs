import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const compId = "sr-24";
  
  const english = `I bow to the divine crown of Sri Ranga Vithala! (Pallavi)

I bow to the beautiful dark curls of hair adorning His head. I bow to the one with a half-moon like forehead, brother of Goddess Siri. (1)

I bow to His beautiful, compassionate eyes resembling peacock feathers. I bow to His nose, which is like a Champaka flower. I bow to His ear-ornaments made of red gems. I bow to His cheeks that shine like beautiful mirrors. (2)

I bow to His row of teeth that look like jasmine buds. I bow to His beautiful Bimba-fruit like lips. I bow to His sweet smile that shines like moonlight. I bow to the beloved child of Nanda Gopa. (3)

I bow to the divine, conch-like neck of Padmanabha. I bow to His chest where the lotus-faced Goddess resides. I bow to the shoulders that straightened the hunchback Kubja. I bow to the navel that gave birth to Brahma (who sits on a lotus). (4)

I bow to Your waist adorned with gem-studded bells. I bow to Your thighs that resemble golden banana trunks. I bow to the beautiful, matching knees that dance so well. (5)

I bow to the two feet that bring auspiciousness and joy. I bow to the hands that hold the high mountains. I bow to the fingers that play the golden flute. I bow to every single part of Ranga Vithala's body! (6)`;

  const kannadaMeaning = `ಶ್ರೀ ರಂಗವಿಠಲನ ದಿವ್ಯ ಕಿರೀಟಕ್ಕೆ ಶರಣು! (ಪಲ್ಲವಿ)

ಅವನ ತಲೆಯ ಮೇಲೆ ಶೋಭಿಸುವ ಕಪ್ಪಾದ ಗುಂಗುರು ಕೂದಲಿಗೆ ಶರಣು. ಚಂದ್ರನಂತಹ (ಸಿರಿಯ ಸಹೋದರನ) ಅರ್ಧ ಹಣೆಯುಳ್ಳವನಿಗೆ ಶರಣು. (೧)

ಕರುಣೆಯ ನೋಟವುಳ್ಳ, ನವಿಲುಗರಿಯಂತಹ ಸುಂದರ ಕಣ್ಣುಗಳಿಗೆ ಶರಣು. ಸಂಪಿಗೆ ಹೂವಿನಂತಹ ಮೂಗಿಗೆ ಶರಣು. ಕೆಂಪು ರತ್ನದ ಕಿವಿಯೋಲೆಗಳಿಗೆ ಶರಣು. ಕನ್ನಡಿಯಂತೆ ಹೊಳೆಯುವ ಸುಂದರ ಕೆನ್ನೆಗಳಿಗೆ ಶರಣು. (೨)

ಮಲ್ಲಿಗೆಯ ಮೊಗ್ಗಿನಂತಿರುವ ಹಲ್ಲುಗಳ ಸಾಲಿಗೆ ಶರಣು. ಚಂದವಾದ ಬಿಂಬಫಲದಂತಹ ತುಟಿಗಳಿಗೆ ಶರಣು. ದಿಂಗಳ ಬೆಳಕಿನಂತೆ ಹೊಳೆಯುವ ಮುದ್ದಾದ ಮಂದಹಾಸಕ್ಕೆ ಶರಣು. ನಂದಗೋಪನ ಮುದ್ದುಕಂದನಿಗೆ ಶರಣು. (೩)

ಕಮಲನಾಭನ ಶಂಖದಂತಹ ದಿವ್ಯ ಕುತ್ತಿಗೆಗೆ ಶರಣು. ಕಮಲಮುಖಿಯಾದ ಲಕ್ಷ್ಮಿಯು ನೆಲೆಸಿರುವ ಎದೆಗೆ ಶರಣು. ಕುಬ್ಜೆಯ ಡೊಂಕನ್ನು ತಿದ್ದಿದ ಆ ಭುಜಗಳಿಗೆ ಶರಣು. ಬ್ರಹ್ಮನಿಗೆ ಜನ್ಮ ನೀಡಿದ ನಾಭಿಗೆ (ಹೊಕ್ಕುಳಿಗೆ) ಶರಣು. (೪)

ರತ್ನದ ಗಂಟೆಗಳಿರುವ ನಿನ್ನ ಸೊಂಟಕ್ಕೆ ಶರಣು. ಚಿನ್ನದ ಬಾಳೆಯ ಕಂಬದಂತಿರುವ ತೊಡೆಗಳಿಗೆ ಶರಣು. ಸುಂದರವಾಗಿ ಕುಣಿಯುವ ಸಮವಾದ ಮೊಣಕಾಲುಗಳಿಗೆ ಶರಣು. (೫)

ಮಂಗಳವನ್ನು ಮತ್ತು ವೈಭೋಗವನ್ನು ತರುವ ಎರಡು ಪಾದಗಳಿಗೆ ಶರಣು. ಬೆಟ್ಟಗಳನ್ನು ಎತ್ತಿ ಹಿಡಿದ ಆ ಕೈಗಳಿಗೆ ಶರಣು. ಚಿನ್ನದ ಕೊಳಲನ್ನೂದುವ ಆ ಬೆರಳುಗಳಿಗೆ ಶರಣು. ರಂಗವಿಠಲನ ಸರ್ವಾಂಗಕ್ಕೂ (ಇಡೀ ದೇಹಕ್ಕೂ) ಶರಣು! (೬)`;

  const existing = await prisma.translation.findFirst({
    where: { compositionId: compId }
  });

  if (existing) {
    await prisma.translation.update({
      where: { id: existing.id },
      data: { english, kannadaMeaning }
    });
    console.log("Successfully updated sr-24 translations.");
  } else {
    await prisma.translation.create({
      data: {
        compositionId: compId,
        english,
        kannadaMeaning,
        wordByWord: "{}"
      }
    });
    console.log("Successfully created sr-24 translations.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
