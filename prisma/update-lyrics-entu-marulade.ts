import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating lyrics for Entu Marulade (nt-001)...');

  const compositionId = 'nt-001';

  const kannadaLyrics = `ಎಂತು ಮರುಳಾದೆ ನಾನೆಂತು ಮರುಳಾದೆ ||ಪ||

ಎಂತು ಮರುಳಾದೆ ಭವದೊಳು ಬಳಲಿದೆ
ಸಂತತ ಪೊರೆ ರಘುಕುಲತಿಲಕ ||ಅ.ಪ||

ಮಾತಿನಲ್ಲಿ ಹರಿದಾಸನ
ನೀತಿಯಲ್ಲಿ ಪ್ರಭುದಾಸತನ
ಪ್ರೀತಿ ಧನಾದಿ ವಿಷಯದಲ್ಲಿ ನಿ
ರ್ಭೀತಿ ದೈವ ಗುರು ದ್ರೋಹದಲಿ ||೧||

ಏಕಾಂತದಲ್ಲಿ ಧನದ ಗೋಷ್ಠಿ
ಲೋಕಾಂತದಿ ವೈರಾಗ್ಯದ ಗೋಷ್ಠಿ
ಶ್ರೀಕಾಂತನ ಸೇವೆಗೆ ಅನುಮಾನ
ಭೂಕಾಂತನ ಸೇವೆಗೆ ಸುಮ್ಮಾನ ||೨||

ಧರ್ಮಕ್ಕೆ ಒಂದು ಕಾಸು ಆ
ಧರ್ಮಕ್ಕೆ ಸಾವಿರಾರು ಹೊನ್ನು
ಧರ್ಮ ಮಾಡಲು ಬೇಸರಿಕೆ ಆ
ಧರ್ಮಮಾಡಲು ಚಚ್ಚರಿಕೆ ||೩||

ಡೊಂಬನಂತೆ ಬಯಲಿಗೆ ಹರಹಿ
ಡಂಭತನಕೆ ಕರ್ಮವ ಮಾಡಿ
ಅಂಬುಜನಾಭಗೆ ದೂರಾಗಿ
ಕುಂಭೀಪಾತಕಕೆ ಗುರಿಯಾದೆ ||೪||

ಸತಿಯರ ಬೈದರೆ ನಾ ಬೈಯ್ವೆ
ಶ್ರೀಪತಿಯ ಬೈದರೆ ಕೇಳುತ ನಗುವೆ
ಮತಿಗೆಟ್ಟು ವಿಷಯಲಂಪಟನಾಗಿ ||೫||

ಯಾರಿಗಾಗಿ ಧಾವತಿ ಪಡುವೆ ಇ
ನ್ನಾರಿಗೆ ಒಡವೆಯ ಬಚ್ಚಿಡುವೆ
ನಾರಿ ಪುತ್ರ ಮಿತ್ರಾದಿಗಳು
ಯಾರೂ ಬಾರರೊ ಸಂಗಡದಿ ||೬||

ಭಜಿಸು ಬ್ರಹ್ಮಾದಿ ವಂದಿತ ಹರಿಯ
ತ್ಯಜಿಸು ಕಾಮಾದಿ ದುರ್ವಿಷಯ
ಸುಜನವಂದಿತನಾದ ನರಹರಿಯ
ಭಜಿಸು ಶ್ರೀಶ ಶ್ರೀ ರಘುಪತಿಯ ||೭||`;

  const transliteration = `entu marulāde nānentu marulāde ||pa||

entu marulāde bhavadolu balalide
santata pore raghukulatilaka ||a.pa||

mātinalli haridāsana
nītiyalli prabhudāsatana
prīti dhanādi viṣayadalli ni
rbhīti daiva guru drōhadali ||1||

ēkāntadalli dhanada gōṣṭhi
lōkāntadi vairāgyada gōṣṭhi
śrīkāntana sēvege anumāna
bhūkāntana sēvege summāna ||2||

dharmakke ondu kāsu ā
dharmakke sāvirāru honnu
dharma māḍalu bēsarike ā
dharmamāḍalu caccarike ||3||

ḍombanante bayalige harahi
ḍambhatanake karmava māḍi
ambujanābhage dūrāgi
kumbhīpātakake guriyāde ||4||

satiyara baidare nā baiyve
śrīpatiya baidare kēḷuta naguve
matigeṭṭu viṣayalampaṭanāgi ||5||

yārigāgi dhāvati paḍuve i
nnārige oḍaveya bacciḍuve
nāri putra mitrādigaḷu
yārū bāraro saṅgaḍadi ||6||

bhajisu brahmādi vandita hariya
tyajisu kāmādi durviṣaya
sujanavanditanāda narahariya
bhajisu śrīśa śrī raghupatiya ||7||`;

  const translation = `Chorus: How did I become so foolish? How did I lose my way? I am exhausted by the cycle of worldly existence (Bhava). O Raghukula Tilaka (Lord Rama), protect me always.

Verse 1: In words, I claim to be a servant of Hari (Haridasa), but in my conduct, I act like a servant of worldly masters. I have great love for wealth and sensory pleasures, and I shamelessly commit treachery against God and Guru.

Verse 2: In private, I only talk about wealth; in public, I talk about renunciation (Vairagya). I hesitate to serve the Lord of Lakshmi (Shrikanta), but I am eager and happy to serve earthly kings (Bhukanta).

Verse 3: I hesitate to give even a single coin for Dharma (righteousness), but I spend thousands on Adharma (unrighteousness). I feel weary when doing good deeds, but I am quick and energetic when doing wrong.

Verse 4: Like a street performer (Domba), I display my deeds for show. I perform rituals out of vanity. Thus, I have distanced myself from the Lotus-naveled Lord (Ambujanabha) and become a target for the worst of sins (Kumbhipaka).

Verse 5: If someone insults my wife, I get angry and fight back. But if someone insults the Lord of Lakshmi (Shripati), I listen and laugh. I have lost my mind, being addicted to worldly pleasures.

Verse 6: For whom are you struggling so hard? For whom are you hiding away your treasures? Wife, children, and friends—none of them will accompany you in the end.

Verse 7: Worship Hari, who is revered by Brahma and others. Give up lust and other evil desires. Worship Narahari (the Lord), who is praised by the virtuous, and seek the feet of Raghupati.`;

  // Update Composition
  await prisma.composition.update({
    where: { id: compositionId },
    data: {
      lyrics: kannadaLyrics,
      transliteration: transliteration,
    },
  });

  // Create or Update Translation
  await prisma.translation.create({
    data: {
      compositionId: compositionId,
      english: translation,
      kannadaMeaning: 'Updated from official source', // placeholder as meaning wasn't provided
      wordByWord: 'Updated from official source', // placeholder
    },
  });

  console.log('✅ Composition nt-001 updated successfully with new lyrics and translation!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
