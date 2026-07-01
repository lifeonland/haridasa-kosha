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
  const ragaId = await getOrCreateRaga('Arabhi');
  const talaId = await getOrCreateTala('Adi');

  // Find existing vyasatirtha to get proper references
  const composer = await prisma.composer.findUnique({ where: { id: 'vyasatirtha' } });
  
  if (!composer) {
    console.log("vyasatirtha not found, make sure he exists!");
    return;
  }
  
  const ankita = await prisma.ankita.upsert({
      where: { name: 'Sri Krishna' },
      update: {},
      create: { name: 'Sri Krishna' }
  });
  
  const deity = await prisma.deity.upsert({
      where: { name: 'Krishna' },
      update: {},
      create: { name: 'Krishna' }
  });

  const id = 'vyasatirtha-42';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Chee Chee Manave',
      firstLine: 'Chee chee manave naachada tanuve',
      lyrics: `ಪಲ್ಲವಿ:
ಛೀ ಛೀ ಮನವೆ ನಾಚದ ತನುವೆ
ನೀಚವೃತ್ತಿಯ ಬಿಟ್ಟು ನೆನೆ ಕಂಡ್ಯ ಹರಿಯ

ಚರಣಗಳು:
೧. ಕಿವಿಗೊಟ್ಟು ಗಂಟೆಯ ನಾದಕೆ ಹುಲ್ಲೆಯ
ನಿವಹ ಬಲೆಗೆ ಸಿಕ್ಕಿಬಿದ್ದುದನರಿಯಾ
ನವಯೌವನೆಯರ ಕೋಕಿಲಾಲಾಪದ
ಸವಿನುಡಿಗೇಳದಚ್ಯುತನ ಕಥೆ ಕೇಳಾ

೨. ಹಣ್ಣೆಂದು ಭ್ರಮಿಸಿ ಪತಂಗ ದೀಪದಿ ಬಿದ್ದು
ಉಣ್ಣದುರಿವುದನು ಕಂಡು ಕಂಡರಿಯಾ
ಬಣ್ಣದಬಲೆಯರ ಮೋಹಕ್ಕೆ ಮರುಳಾಗಿ
ಮಣ್ಣು ತಿನ್ನದೆ ಸ್ಮರನಯ್ಯನ ನೋಡು

೩. ಗಾಣದ ತುದಿಯ ಮಾಂಸವ ಮೆಲುತ ಮಚ್ಛನು
ಪ್ರಾಣವ ಬಿಡುವುದಂಗನೆಯರಧರವ
ಮಾಣದೆ ಬಯಸಿ ಬಹಳದೆ ಶ್ರೀನಾರಾ-
ಯಣನ ನಾಮಾಮೃತವನ್ನುಣ್ಣು ಮನವೆ

೪. ಆಳಿಯೆದ್ದು ಕರಿ ಕರಿಣೆಯ ಸ್ಮರುಶನಕಾಗಿ
ಗುಳಿಯ ಬಿದ್ದಿರವನು ಕೇಳಿ ಕೇಳರಿಯಾ
ಲಲನೆಯರಾಲಿಂಗನಕಳಸದೆ ಸಿರಿ
ಲಲನೇಶನಂಘ್ರಿಯನಪ್ಪಿಕೊ ಮನವೆ

೫. ಅಳಿ ಪರಿಮಳಕಾಗಿ ನಳಿನದೊಳಗೆ ಸಿಕ್ಕುವೊಲು
ಒಲಿವಂಗನೆಯರಂಗಂಧವ ಬಯಸಿ
ಬಳಲದೆ ವರದ ಶ್ರೀಕೃಷ್ಣನಂಘ್ರಿಯೊಳಿಪ್ಪ
ತುಳಸಿಯನಾಘ್ರಾಣಿಸು ಕಂಡ್ಯ ಮನವೆ`,
      transliteration: `Pallavi:
Chee chee manave naachada tanuve
Neechavruttiya bittu nene kandya hariya

Charanagalu:
1. Kivigottu ganteya naadake hulleya
Nivaha balege sikkibiddudanariyaa
Navayouvaneyara kokilaalaapada
Savinudigeladachyutana kathe kelaa

2. Hannendu bhramisi patanga deepadi biddu
Unnadurivudanu kandu kandariyaa
Bannadabaleyara mohakke marulaagi
Mannu tinnade smaranayyana nodu

3. Gaanada tudiya maamsava meluta machchanu
Praanava biduvudanganeyaradharava
Maanade bayasi bahalade shreenaaraa-
Yanana naamaamrutavannunnu manave

4. Aaliyeddu kari karineya smarushanakkaagi
Guliya biddiravanu keli kelariyaa
Lalaneyaraalinganakalasade siri
Lalaneshananghriyanappiko manave

5. Ali parimalakkaagi nalinadolage sikkuvolu
Olivanganeyarangandhava bayasi
Balalade varada shreekrishnananghriyolippa
Tulasiyanaaghraanisu kandya manave`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Chee Chee Manave',
      firstLine: 'Chee chee manave naachada tanuve',
      lyrics: `ಪಲ್ಲವಿ:
ಛೀ ಛೀ ಮನವೆ ನಾಚದ ತನುವೆ
ನೀಚವೃತ್ತಿಯ ಬಿಟ್ಟು ನೆನೆ ಕಂಡ್ಯ ಹರಿಯ

ಚರಣಗಳು:
೧. ಕಿವಿಗೊಟ್ಟು ಗಂಟೆಯ ನಾದಕೆ ಹುಲ್ಲೆಯ
ನಿವಹ ಬಲೆಗೆ ಸಿಕ್ಕಿಬಿದ್ದುದನರಿಯಾ
ನವಯೌವನೆಯರ ಕೋಕಿಲಾಲಾಪದ
ಸವಿನುಡಿಗೇಳದಚ್ಯುತನ ಕಥೆ ಕೇಳಾ

೨. ಹಣ್ಣೆಂದು ಭ್ರಮಿಸಿ ಪತಂಗ ದೀಪದಿ ಬಿದ್ದು
ಉಣ್ಣದುರಿವುದನು ಕಂಡು ಕಂಡರಿಯಾ
ಬಣ್ಣದಬಲೆಯರ ಮೋಹಕ್ಕೆ ಮರುಳಾಗಿ
ಮಣ್ಣು ತಿನ್ನದೆ ಸ್ಮರನಯ್ಯನ ನೋಡು

೩. ಗಾಣದ ತುದಿಯ ಮಾಂಸವ ಮೆಲುತ ಮಚ್ಛನು
ಪ್ರಾಣವ ಬಿಡುವುದಂಗನೆಯರಧರವ
ಮಾಣದೆ ಬಯಸಿ ಬಹಳದೆ ಶ್ರೀನಾರಾ-
ಯಣನ ನಾಮಾಮೃತವನ್ನುಣ್ಣು ಮನವೆ

೪. ಆಳಿಯೆದ್ದು ಕರಿ ಕರಿಣೆಯ ಸ್ಮರುಶನಕಾಗಿ
ಗುಳಿಯ ಬಿದ್ದಿರವನು ಕೇಳಿ ಕೇಳರಿಯಾ
ಲಲನೆಯರಾಲಿಂಗನಕಳಸದೆ ಸಿರಿ
ಲಲನೇಶನಂಘ್ರಿಯನಪ್ಪಿಕೊ ಮನವೆ

೫. ಅಳಿ ಪರಿಮಳಕಾಗಿ ನಳಿನದೊಳಗೆ ಸಿಕ್ಕುವೊಲು
ಒಲಿವಂಗನೆಯರಂಗಂಧವ ಬಯಸಿ
ಬಳಲದೆ ವರದ ಶ್ರೀಕೃಷ್ಣನಂಘ್ರಿಯೊಳಿಪ್ಪ
ತುಳಸಿಯನಾಘ್ರಾಣಿಸು ಕಂಡ್ಯ ಮನವೆ`,
      transliteration: `Pallavi:
Chee chee manave naachada tanuve
Neechavruttiya bittu nene kandya hariya

Charanagalu:
1. Kivigottu ganteya naadake hulleya
Nivaha balege sikkibiddudanariyaa
Navayouvaneyara kokilaalaapada
Savinudigeladachyutana kathe kelaa

2. Hannendu bhramisi patanga deepadi biddu
Unnadurivudanu kandu kandariyaa
Bannadabaleyara mohakke marulaagi
Mannu tinnade smaranayyana nodu

3. Gaanada tudiya maamsava meluta machchanu
Praanava biduvudanganeyaradharava
Maanade bayasi bahalade shreenaaraa-
Yanana naamaamrutavannunnu manave

4. Aaliyeddu kari karineya smarushanakkaagi
Guliya biddiravanu keli kelariyaa
Lalaneyaraalinganakalasade siri
Lalaneshananghriyanappiko manave

5. Ali parimalakkaagi nalinadolage sikkuvolu
Olivanganeyarangandhava bayasi
Balalade varada shreekrishnananghriyolippa
Tulasiyanaaghraanisu kandya manave`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Fie, fie upon you, O mind, and this shameless body!
Leave these lowly habits and remember Lord Hari!

Charanagalu:
1. Don't you know how a deer, entranced by the sound of a bell,
Falls into the hunter's net?
Do not listen to the sweet, cuckoo-like voices of young women,
Instead, listen to the glories of Lord Achyuta!

2. Don't you know how a moth, mistaking the flame for a fruit,
Falls into the lamp and is burnt to ashes?
Do not be mesmerized by the illusion of colorful women,
Do not eat mud (ruin yourself), but look at the father of Manmatha (Lord Hari)!

3. The fish, chewing on the piece of meat at the end of the hook,
Loses its life! Do not constantly desire the lips of women,
Instead, drink the nectar of the name of Sri Narayana, O my mind!

4. Don't you know how the majestic male elephant, rushing to touch the female,
Falls into the pit trap?
Do not desire the embrace of women,
Instead, embrace the feet of the Lord of Lakshmi (Lalanesha), O mind!

5. Just as a bee gets trapped inside a lotus in its greed for fragrance,
Do not suffer by desiring the fragrance of women!
Instead, smell the holy Tulasi that adorns
The feet of the boon-giving Sri Krishna, O my mind!`;
  
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
