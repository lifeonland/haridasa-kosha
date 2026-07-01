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
  const ragaId = await getOrCreateRaga('Revagupti');
  const talaId = await getOrCreateTala('Ata');

  // Find existing vyasatirtha to get proper references
  const composer = await prisma.composer.findUnique({ where: { id: 'vyasatirtha' } });
  
  if (!composer) {
    console.log("vyasatirtha not found, make sure he exists!");
    return;
  }
  
  const ankita = await prisma.ankita.upsert({
      where: { name: 'Vittala' },
      update: {},
      create: { name: 'Vittala' }
  });
  
  const deity = await prisma.deity.upsert({
      where: { name: 'Vittala' },
      update: {},
      create: { name: 'Vittala' }
  });

  const id = 'vyasatirtha-23';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Enna Bimba Moorutiya',
      firstLine: 'Enna bimba moorutiya poojipe naanu',
      lyrics: `ಪಲ್ಲವಿ:
ಎನ್ನ ಬಿಂಬ ಮೂರುತಿಯ ಪೂಜಿಪೆ ನಾನು |
ಅನ್ಯರ ಬೇಡೆನು ಇನ್ನಾರಿಗೂ ಅಂಜೇನು ||

ಅನುಪಲ್ಲವಿ:
ಚಿನ್ಮಯ ಮೂರುತಿ ಶ್ರೀಹರಿಯ ಚರಣವ |
ಹೃನ್ಮಂಟಪದೊಳು ನಿಲಿಸಿ ಸತತವು ||

ಚರಣಗಳು:
ತನು ಮಂಟಪದೊಳಗೆ ಜ್ಞಾನ ದೀಪವ ಹಚ್ಚಿ |
ಮನವನೇ ಆಸನವನ್ನಾಗಿ ಮಾಡಿ |
ಅನವರತವು ನಿನ್ನ ಧ್ಯಾನವ ಮಾಡುತ |
ದಿನ ದಿನ ಹೊಸ ಹೊಸ ಪೂಜೆಯ ಗೈವೆನು ||

ಪಂಚ ಪ್ರಾಣಗಳನ್ನೇ ಧೂಪವನ್ನಾಗಿ ಬಳಸಿ |
ನೆಲಸಿದ ಭಕ್ತಿಯ ನೈವೇದ್ಯವನ್ನಿಟ್ಟು |
ಸಂಸಾರ ಭ್ರಮೆಯನು ದೂರಕೆ ದೂಡುತ |
ರಂಗನ ಚರಣಕೆ ಶರಣೆಂದೆ ನಾ ||

ಶ್ರೀಕೃಷ್ಣಪ್ರಭುವೇ ಎನ್ನಂತರಂಗದೊಳು |
ಸಾಕ್ಷಾತ್ಕಾರವಾಗಿ ನೀ ನಿಲ್ಲೋ ದೇವ |
ಲೋಕದ ಬಾಧೆಯ ನೀಗಿ ಎನ್ನನು ಕಾಯೊ |
ವ್ಯಾಸರಾಜ ಮುನಿ ವಂದಿತ ವಿಠಲ ||`,
      transliteration: `Pallavi:
Enna bimba moorutiya poojipe naanu |
Anyara bedenu innarigu anjenu ||

Anupallavi:
Chinmaya mooruti srihariya charanava |
Hrunmantapadolu nilisi satatavu ||

Charanagalu:
Tanu mantapadolage jnana deepava hacchi |
Manavane aasanavannaagi maadi |
Anavaratavu ninna dhyanava maaduta |
Dina dina hosa hosa poojeya gaivenu ||

Pancha pranagalanne dhoopavannaagi balasi |
Nelasida bhaktiya naivedyavannittu |
Samsara bhrameyanu doorake dooduta |
Rangana charanake sharanende naa ||

Srikrishnaprabhuve ennantarangadolu |
Sakshatkaravagi nee nillo deva |
Lokada baadheya neegi ennanu kaayo |
Vyasaraja muni vandita vithala ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Enna Bimba Moorutiya',
      firstLine: 'Enna bimba moorutiya poojipe naanu',
      lyrics: `ಪಲ್ಲವಿ:
ಎನ್ನ ಬಿಂಬ ಮೂರುತಿಯ ಪೂಜಿಪೆ ನಾನು |
ಅನ್ಯರ ಬೇಡೆನು ಇನ್ನಾರಿಗೂ ಅಂಜೇನು ||

ಅನುಪಲ್ಲವಿ:
ಚಿನ್ಮಯ ಮೂರುತಿ ಶ್ರೀಹರಿಯ ಚರಣವ |
ಹೃನ್ಮಂಟಪದೊಳು ನಿಲಿಸಿ ಸತತವು ||

ಚರಣಗಳು:
ತನು ಮಂಟಪದೊಳಗೆ ಜ್ಞಾನ ದೀಪವ ಹಚ್ಚಿ |
ಮನವನೇ ಆಸನವನ್ನಾಗಿ ಮಾಡಿ |
ಅನವರತವು ನಿನ್ನ ಧ್ಯಾನವ ಮಾಡುತ |
ದಿನ ದಿನ ಹೊಸ ಹೊಸ ಪೂಜೆಯ ಗೈವೆನು ||

ಪಂಚ ಪ್ರಾಣಗಳನ್ನೇ ಧೂಪವನ್ನಾಗಿ ಬಳಸಿ |
ನೆಲಸಿದ ಭಕ್ತಿಯ ನೈವೇದ್ಯವನ್ನಿಟ್ಟು |
ಸಂಸಾರ ಭ್ರಮೆಯನು ದೂರಕೆ ದೂಡುತ |
ರಂಗನ ಚರಣಕೆ ಶರಣೆಂದೆ ನಾ ||

ಶ್ರೀಕೃಷ್ಣಪ್ರಭುವೇ ಎನ್ನಂತರಂಗದೊಳು |
ಸಾಕ್ಷಾತ್ಕಾರವಾಗಿ ನೀ ನಿಲ್ಲೋ ದೇವ |
ಲೋಕದ ಬಾಧೆಯ ನೀಗಿ ಎನ್ನನು ಕಾಯೊ |
ವ್ಯಾಸರಾಜ ಮುನಿ ವಂದಿತ ವಿಠಲ ||`,
      transliteration: `Pallavi:
Enna bimba moorutiya poojipe naanu |
Anyara bedenu innarigu anjenu ||

Anupallavi:
Chinmaya mooruti srihariya charanava |
Hrunmantapadolu nilisi satatavu ||

Charanagalu:
Tanu mantapadolage jnana deepava hacchi |
Manavane aasanavannaagi maadi |
Anavaratavu ninna dhyanava maaduta |
Dina dina hosa hosa poojeya gaivenu ||

Pancha pranagalanne dhoopavannaagi balasi |
Nelasida bhaktiya naivedyavannittu |
Samsara bhrameyanu doorake dooduta |
Rangana charanake sharanende naa ||

Srikrishnaprabhuve ennantarangadolu |
Sakshatkaravagi nee nillo deva |
Lokada baadheya neegi ennanu kaayo |
Vyasaraja muni vandita vithala ||`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
I will worship the indwelling reflection form of the Lord,
I will not beg from others, nor will I fear anyone anymore.

Anupallavi:
The consciousness-embodied feet of Sri Hari,
I will constantly establish them in the pavilion of my heart.

Charanagalu:
Lighting the lamp of knowledge within the pavilion of my body,
Making my very mind into a seat for Him,
Continuously meditating upon you,
Day by day, I will perform newer and newer forms of worship.

Using the five vital breaths themselves as the incense,
Offering the established devotion as the sacred food offering (naivedya),
Pushing far away the illusions of worldly existence,
I surrender to the feet of Lord Ranga.

O Lord Sri Krishna, within my inner self,
Please stand manifest, O Deva!
Removing the torments of the world, protect me,
O Vittala, worshipped by the sage Vyasaraja!`;
  
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
