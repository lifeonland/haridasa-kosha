import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Govinda Hari Govindha (kanaka-list-61)...');

  const lyrics = `ಗೋವಿಂದ ಹರಿ ಗೋವಿಂದ
ಗೋವಿಂದ ಪರಮಾನಂದ ಮುಕುಂದ ||ಪ||

ಮಚ್ಛ್ಯಾವತಾರದೊಳಾಳಿದನೆ
ಮಂದರಾಚಲ ಬೆನ್ನೊಳು ತಾಳಿದನೆ
ಅಚ್ಛ ಸೂಕರನಾಗಿ ಬಾಳಿದನೆ
ಮದಹೆಚ್ಚೆ ಹಿರಣ್ಯಕನ ಸೀಳಿದನೆ ||೧||

ಕುಂಭಿನಿ ದಾನವ ಬೇಡಿದನೆ
ಕ್ಷಾತ್ರ-ರೆಂಬುವರನು ಹತ ಮಾಡಿದನೆ
ಅಂಬುಧಿಗೆ ಶರ ಹೂಡಿದನೆ
ಕಮಲಾಂಬಕ ಗೊಲ್ಲರೊಳಾಡಿದನೆ ||೨||

ವಸುದೇವನುದರದಿ ಪುಟ್ಟಿದನೆ
ಪಲ್‍ಮಸೆವ ದನುಜರೊಡೆಗುಟ್ಟಿದನೆ
ಎಸೆವ ಕಾಳಿಂಗನ ಮೆಟ್ಟಿದನೆ
ಬಾಧಿಸುವರ ಯಮಪುರಕಟ್ಟಿದನೆ ||೩||

ಪೂತನಿಯ ಮೈ ಸೋಕಿದನೆ
ಬಲುಘಾತದ ಮೊಲೆಯುಂಡು ತೇಕಿದನೆ
ಘಾತಕಿಯನತ್ತ ನೂಕಿದನೆ
ಗೋಪವ್ರಾತ ಗೋಗಳನೆಲ್ಲ ಸಾಕಿದನೆ ||೪||

ಸಾಧಿಸಿ ತ್ರಿಪುರರ ಗೆಲಿದವನೆ
ಮ್ಲೇಚ್ಛರಛೇದಿಸೆ ಹಯವೇರಿ ಕೆಲೆದವನೆ
ಸಾಧುಸಂತರೊಡನೆ ನಲಿದವನೆ
ಬಾಡದಾದಿಕೇಶವ ಕನಕಗೊಲಿದವನೆ ||೫||`;

  const translation = `Chorus: Oh Govinda, Hari, Govinda! Oh Govinda, the Supreme Bliss, the Giver of Liberation (Mukunda).

Verse 1: Did You not rule in the fish (Matsya) avatar? Did You not carry the Mandara mountain on Your back (Kurma avatar)? Did You not live as the pure boar (Varaha)? Did You not tear open the ego-filled Hiranyakashipu?

Verse 2: Did You not beg for land (as Vamana) from Bali? Did You not destroy those called the Kshatriyas (as Parashurama)? Did You not aim an arrow at the ocean (as Rama)? Did You not play among the cowherds (as Krishna)?

Verse 3: Were You not born from the womb of Vasudeva? Did You not crush the arrogant demons? Did You not trample the shining Kalinga serpent? Did You not send those who trouble You to the city of Yama?

Verse 4: Did You not touch the body of Putana? Did You not suck the deadly milk from her breasts and burp? Did You not push away that killer (Putana)? Did You not protect the herds of cows and the community of cowherds?

Verse 5: You who accomplished the victory over the three cities (Tripura-hari). You who rode a horse to destroy the Mlechhas. You who delight with the virtuous saints. O Kaginele Adi Keshava, You who are pleased by Kanaka (Dasa).`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-61' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-61' }
  });

  if (existingTranslation) {
    await prisma.translation.update({
      where: { id: existingTranslation.id },
      data: { english: translation },
    });
    console.log('✅ Translation updated successfully!');
  } else {
    await prisma.translation.create({
      data: {
        compositionId: 'kanaka-list-61',
        english: translation,
        kannadaMeaning: '-', 
        wordByWord: '-', 
      },
    });
    console.log('✅ Translation created successfully!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
