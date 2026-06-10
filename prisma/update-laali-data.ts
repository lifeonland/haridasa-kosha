import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics and translation for Laali Pavana Charana (kanaka-list-15)...');

  const lyrics = `ಲಾಲಿ ಪಾವನ ಚರಣ ಲಾಲಿ ಅಘಹರಣ
ಲಾಲಿ ವೆಂಕಟರಮಣ ಲಲಿತ ಕಲ್ಯಾಣ ||ಪ||

ವನಜಾಕ್ಷ ಮಾಧವ ವಸುದೇವ ತನಯ
ಸನಕಾದಿ ಮುನಿವಂದ್ಯ ಸಾಧುಜನಪ್ರಿಯ
ಇನಕೋಟಿಶತತೇಜ ಮುನಿಕಲ್ಪ ಭೂಜ
ಕನಕಾದ್ರಿ ನಿಲಯ ವೆಂಕಟರಾಯ ಜಜೀಯ ||೧||

ಜಗದೇಕನಾಯಕ ಜಲಜದಳನೇತ್ರ
ಖಗರಾಜ ವಾಹನ ಕಲ್ಯಾಣ ಚರಿತ
ಸಗರತನಯಾರ್ಚಿತ ಸನಕಾದಿ ವಿನುತ
ರಘುವಂಶಕುತಿಲಕ ರಮಣೀಯಗಾತ್ರ ||೨||

ನಂದಗೋಪ ಕುಮಾರ ನವನೀತ ಚೋರ
ಮಂದಾಕಿನೀ ಜನಕ ಮೋಹನಾಕಾರ
ಇಂದುಧರಸತಿ ವಿನುತ ವಿಶ್ವಸಂಚಾರ
ನಂದಗೋವಿಂದ ಮುಚುಕುಂದ ನುತಸಾರ ||೩||

ಪಕ್ಷಿವಾಹನ ವಿಷ್ಣುಪಾಹಿ ಪರಮೇಶ
ರಕ್ಷ ಕೌಸ್ತುಭಭೂಷ ವೈಕುಂಠವಾಸ
ಅಕ್ಷಯ ಫಲದಾಟ ಅಖಿಳ ಲೋಕೇಶ
ಲಕ್ಷಣ ಪರಿಪೂರ್ಣ ಲಕ್ಷ್ಮಿಪ್ರಾಣೇಶ ||೪||

ನರಮೃಗಾಕಾರಿ ಹಿರಣ್ಯಕ ವೈರಿ
ಕರಿರಾಜ ರಕ್ಷಕ ಕಾರುಣ್ಯಮೂರ್ತಿ
ಹರಿ ಆದಿಕೇಶವ ಗುರು ಅಪ್ರಮೇಯ
ಶ್ರೀಧರ ಶೇಷಗಿರಿ ವರ ತಿಮ್ಮರಾಯ ||೫||`;

  const translation = `Pallavi: Lali (lullaby) to the one with holy feet, lali to the destroyer of sins. Lali to Venkataramana, the one with the beautiful wedding.

Verse 1: O Lotus-eyed Madhava, son of Vasudeva. You are worshipped by sages like Sanaka and are dear to the righteous. You possess the brilliance of a hundred crore suns and are the wish-fulfilling tree (Kalpavriksha) for sages. O resident of Kanakadri (Tirumala), O Venkataraya, victory to you.

Verse 2: O Lord of the universe, O one with eyes like lotus petals. You have Garuda (the king of birds) as your vehicle and possess a glorious history. You are worshipped by the sons of Sagara and sages like Sanaka. You are the jewel of the Raghu dynasty and possess a beautiful form.

Verse 3: O son of Nandagopa, O stealer of butter. You are the father of Mandakini (Ganga) and possess a charming form. You are worshipped by the consort of Indudhara (Shiva) and you pervade the entire universe. O Nandagovinda, you are praised by Muchukunda and are the essence of everything.

Verse 4: O one with the bird (Garuda) as your vehicle, O Vishnu, please protect me, O Supreme Lord. You are the protector, adorned with the Kaustubha gem, and you reside in Vaikuntha. You are the giver of inexhaustible fruits and the Lord of all worlds. You are perfect in all attributes and the Lord of Lakshmi (Lakshmipranesha).

Verse 5: O one who took the form of a man-lion (Narasimha), O enemy of Hiranyakashipu. You are the protector of the king of elephants (Gajendra) and the embodiment of compassion. O Hari, O Adikesava, O Guru, you are beyond comprehension (Aprameya). O Sridhara, O Lord of Seshagiri, O great Timmaraya.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: 'kanaka-list-15' },
    data: { lyrics: lyrics },
  });

  // Upsert the translation record
  const existingTranslation = await prisma.translation.findFirst({
    where: { compositionId: 'kanaka-list-15' }
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
        compositionId: 'kanaka-list-15',
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
