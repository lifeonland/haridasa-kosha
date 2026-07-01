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

async function main() {
  const ragaId = await getOrCreateRaga('Bhupala');
  const talaId = await getOrCreateTala('Atte');

  // Find existing vyasatirtha to get proper references
  const composer = await prisma.composer.findUnique({ where: { id: 'vyasatirtha' } });
  
  if (!composer) {
    console.log("vyasatirtha not found, make sure he exists!");
    return;
  }
  
  const ankita = await prisma.ankita.upsert({
      where: { name: 'Krishna' },
      update: {},
      create: { name: 'Krishna' }
  });
  
  const deity = await prisma.deity.upsert({
      where: { name: 'Krishna' },
      update: {},
      create: { name: 'Krishna' }
  });

  const id = 'vyasatirtha-48';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Mauna Gouriya Hennu',
      firstLine: 'Mauna gouriya hennu haikala koode',
      lyrics: `ಪಲ್ಲವಿ:
ಮೌನ ಗೌರಿಯ ಹೆಣ್ಣು ಹೈಕಳ ಕೂಡೆ
ಶ್ರೀನಾಥ ನಿನಗೆ ಸಲ್ಲದು ಹಸುಮಕ್ಕಳಾಟ

ಚರಣಗಳು:
೧. ತರಳ ನೀ ನಮ್ಮ ಸೀರೆಯ ಹೊತ್ತುಕೊಂಡು
ತರುವನೇರಿ ಕಕ್ಕಸಗೆಲುವ
ತರುವಳಿತನಕೆ ನಿನ್ನ ಪೇರುರದ
ತರುಣಿ ನಗುತಾಳೆ ಪೊಕ್ಕಾಟ ಸಾಕೆಂಬ

೨. ಸ್ನಾನವ ಮಾಡಿ ಮೌನಗೌರಿಯ
ನೋನಲೇಯಿ ಮೌನವ ಕೆಡಿಸಿ
ಧ್ಯಾನವ ಮಾಡಲೇಯಿ ನಿನ್ನ ಚಿನ್ನಿರಂಗ
ನೆನಿಸುತ ವಾಸಿಯೆಂಬುದ ನಾವರಿಯೆವು

೩. ನಿನ್ನ ಪೊಕ್ಕಳ ಬೊಮ್ಮ ನಿನ್ನುದರದ ಜಗ
ನಿನ್ನಂಗದ ಸುರಮುನಿಗಳೆಲ್ಲ
ನಿನ್ನನೆ ನಗುವರೋ ನೀನರಿಯದೆ ನಮ್ಮ
ಚುನ್ನವಾಡುವ ಹೆಡ್ಡಾಟ ಸಾಕೆಂಬ

೪. ತುತಿಸಿ ತುತಿಸಿ ಕಾಣರು ಬ್ರಹ್ಮರುದ್ರರು
ಮತಿಗೊಳಗಾಗೆ ಮುನೀಶ್ವರರ
ಶ್ರುತಿಗಳು ನಿನ್ನನು ಪುಡುಕಲರಿಯವು ಬಾಲ
ಸತಿಯರೊಡನೆ ಖೇಳಮೇಲಾಟ ಸಾಕೆಂಬ

೫. ಎಸಳುಕಂಗಳ ಡಾಳ ನಸುನಗೆ ಕೌಸ್ತುಭ
ಎಸೇವ ಕಂಠದ ತುಲಸಿಯ ದಂಡೆ
ಮಿಸುನಿಯ ವಸನ ಉಲಿವ ಪೆಂಡೆಯ
ಹೊಸ ಹೊಸ ಚಿನ್ನಿಗ ಪರಿಹಾಸ ಸಾಕೆಂಬ

೬. ಅರಸನ ಮಗನೆಂದು ತಾಳಿದೆವಲ್ಲದೆ
ಸರಸಿಜಾಕ್ಷ ಯಮುನೆಯ ಮಳಲಲ್ಲಿ
ಸರಸದಲ್ಲಿದ್ದರೆ ನಿನ್ನಂಗದಲಿಹ
ಸುರರೋಡಬೇಕು ಸರಸ ಸಾಕೆಂದೆಂಬ

೭. ಚೆಲುವರ ತಿಲಕ ರಸಿಕರ ಶಿರೋಮಣಿ
ಲಲನೆಯರ ಮನ ಸೂರೆಗಾರ
ಫಲಿಸಿತ್ತು ವ್ರತವೆಮ್ಮ ಕೃಷ್ಣ ನಿನ್ನೊಲುಮೆಯ
ಬಲೆಗೆ ಸಿಕ್ಕದವರಾರು ಸೊಬಗಿನೊಬ್ಬುಳಿಯೆಂಬ`,
      transliteration: `Pallavi:
Mauna gouriya hennu haikala koode
Shreenaatha ninage salladu hasumakkalaata

Charanagalu:
1. Tarala nee namma seereya hottukondu
Taruvaneri kakkasageluva
Taruvalitanake ninna perurada
Taruni nagutaale pokkaata saakemba

2. Snaanava maadi maunagouriya
Nonaleyi maunava kedisi
Dhyanava maadaleyi ninna chinniranga
Nenisuta vaasiyembuda naavariyevu

3. Ninna pokkala bomma ninnudarada jaga
Ninnangada suramunigalella
Ninnane naguvaro neenariyade namma
Chunnavaaduva heddaata saakemba

4. Tutisi tutisi kaanaru brahmarudraru
Matigolagaage muneeshvarara
Shrutigalu ninnanu pudukalariyavu baala
Satiyarodane khelamelaata saakemba

5. Esalukangala daala nasunage kaustubha
Eseva kanthada tulasiya dande
Misuniya vasana uliva pendeya
Hosa hosa chinniga parihaasa saakemba

6. Arasana maganendu taaalidevallade
Sarasijaaksha yamuneya malalalli
Sarasadalliddare ninnangadaliha
Surarodabeku sarasa saakendemba

7. Cheluvara tilaka rasikara shiromani
Lalaneyara mana sooregaara
Phalisittu vratavemma krishna ninnolumeya
Balege sikkadavaraaru sobaginobbuliyemba`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Mauna Gouriya Hennu',
      firstLine: 'Mauna gouriya hennu haikala koode',
      lyrics: `ಪಲ್ಲವಿ:
ಮೌನ ಗೌರಿಯ ಹೆಣ್ಣು ಹೈಕಳ ಕೂಡೆ
ಶ್ರೀನಾಥ ನಿನಗೆ ಸಲ್ಲದು ಹಸುಮಕ್ಕಳಾಟ

ಚರಣಗಳು:
೧. ತರಳ ನೀ ನಮ್ಮ ಸೀರೆಯ ಹೊತ್ತುಕೊಂಡು
ತರುವನೇರಿ ಕಕ್ಕಸಗೆಲುವ
ತರುವಳಿತನಕೆ ನಿನ್ನ ಪೇರುರದ
ತರುಣಿ ನಗುತಾಳೆ ಪೊಕ್ಕಾಟ ಸಾಕೆಂಬ

೨. ಸ್ನಾನವ ಮಾಡಿ ಮೌನಗೌರಿಯ
ನೋನಲೇಯಿ ಮೌನವ ಕೆಡಿಸಿ
ಧ್ಯಾನವ ಮಾಡಲೇಯಿ ನಿನ್ನ ಚಿನ್ನಿರಂಗ
ನೆನಿಸುತ ವಾಸಿಯೆಂಬುದ ನಾವರಿಯೆವು

೩. ನಿನ್ನ ಪೊಕ್ಕಳ ಬೊಮ್ಮ ನಿನ್ನುದರದ ಜಗ
ನಿನ್ನಂಗದ ಸುರಮುನಿಗಳೆಲ್ಲ
ನಿನ್ನನೆ ನಗುವರೋ ನೀನರಿಯದೆ ನಮ್ಮ
ಚುನ್ನವಾಡುವ ಹೆಡ್ಡಾಟ ಸಾಕೆಂಬ

೪. ತುತಿಸಿ ತುತಿಸಿ ಕಾಣರು ಬ್ರಹ್ಮರುದ್ರರು
ಮತಿಗೊಳಗಾಗೆ ಮುನೀಶ್ವರರ
ಶ್ರುತಿಗಳು ನಿನ್ನನು ಪುಡುಕಲರಿಯವು ಬಾಲ
ಸತಿಯರೊಡನೆ ಖೇಳಮೇಲಾಟ ಸಾಕೆಂಬ

೫. ಎಸಳುಕಂಗಳ ಡಾಳ ನಸುನಗೆ ಕೌಸ್ತುಭ
ಎಸೇವ ಕಂಠದ ತುಲಸಿಯ ದಂಡೆ
ಮಿಸುನಿಯ ವಸನ ಉಲಿವ ಪೆಂಡೆಯ
ಹೊಸ ಹೊಸ ಚಿನ್ನಿಗ ಪರಿಹಾಸ ಸಾಕೆಂಬ

೬. ಅರಸನ ಮಗನೆಂದು ತಾಳಿದೆವಲ್ಲದೆ
ಸರಸಿಜಾಕ್ಷ ಯಮುನೆಯ ಮಳಲಲ್ಲಿ
ಸರಸದಲ್ಲಿದ್ದರೆ ನಿನ್ನಂಗದಲಿಹ
ಸುರರೋಡಬೇಕು ಸರಸ ಸಾಕೆಂದೆಂಬ

೭. ಚೆಲುವರ ತಿಲಕ ರಸಿಕರ ಶಿರೋಮಣಿ
ಲಲನೆಯರ ಮನ ಸೂರೆಗಾರ
ಫಲಿಸಿತ್ತು ವ್ರತವೆಮ್ಮ ಕೃಷ್ಣ ನಿನ್ನೊಲುಮೆಯ
ಬಲೆಗೆ ಸಿಕ್ಕದವರಾರು ಸೊಬಗಿನೊಬ್ಬುಳಿಯೆಂಬ`,
      transliteration: `Pallavi:
Mauna gouriya hennu haikala koode
Shreenaatha ninage salladu hasumakkalaata

Charanagalu:
1. Tarala nee namma seereya hottukondu
Taruvaneri kakkasageluva
Taruvalitanake ninna perurada
Taruni nagutaale pokkaata saakemba

2. Snaanava maadi maunagouriya
Nonaleyi maunava kedisi
Dhyanava maadaleyi ninna chinniranga
Nenisuta vaasiyembuda naavariyevu

3. Ninna pokkala bomma ninnudarada jaga
Ninnangada suramunigalella
Ninnane naguvaro neenariyade namma
Chunnavaaduva heddaata saakemba

4. Tutisi tutisi kaanaru brahmarudraru
Matigolagaage muneeshvarara
Shrutigalu ninnanu pudukalariyavu baala
Satiyarodane khelamelaata saakemba

5. Esalukangala daala nasunage kaustubha
Eseva kanthada tulasiya dande
Misuniya vasana uliva pendeya
Hosa hosa chinniga parihaasa saakemba

6. Arasana maganendu taaalidevallade
Sarasijaaksha yamuneya malalalli
Sarasadalliddare ninnangadaliha
Surarodabeku sarasa saakendemba

7. Cheluvara tilaka rasikara shiromani
Lalaneyara mana sooregaara
Phalisittu vratavemma krishna ninnolumeya
Balege sikkadavaraaru sobaginobbuliyemba`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Along with these young girls observing the Mauna Gouri vow,
O Lord of Lakshmi (Srinatha), this childish play does not suit You!

Charanagalu:
1. O boy, stealing our sarees
And climbing the tree to tease us,
For this mischievous act, the lady residing on Your broad chest (Lakshmi)
Will laugh at You! Stop this prank!

2. After bathing for the Mauna Gouri vow,
You disturbed our vow and broke our silence!
You did not let us meditate, O little Ranga!
We do not know the greatness of Your thoughts!

3. Brahma in Your navel, the universes in Your stomach,
And all the sages and gods in Your body—
They will all laugh at You! Without realizing this,
Stop this foolish act of teasing us!

4. Brahma and Rudra praise You endlessly but cannot see You,
You are beyond the minds of the great sages,
The Vedas themselves cannot find You! Yet, O boy,
Stop this playful teasing with us women!

5. With petal-like eyes, a gentle smile, the Kaustubha gem,
A garland of Tulasi shining on Your neck,
Wearing golden silk garments and jingling anklets,
O new little one, stop this mockery!

6. We only tolerated You because You are the King's son (Nanda's son)!
O lotus-eyed one, if we indulge in romance on the sands of the Yamuna,
The gods residing in Your body will run away!
Stop this romance!

7. You are the crest-jewel of handsome men, the crown of romantics,
The thief of the minds of young women!
Our vow has borne fruit, O Krishna, in attaining Your love!
Who can escape the net of Your charming beauty?`;
  
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

  console.log('Successfully created/updated ' + id + '!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
