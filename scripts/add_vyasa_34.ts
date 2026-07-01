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

  const id = 'vyasatirtha-34';

  const composition = await prisma.composition.upsert({
    where: { id },
    update: {
      title: 'Eke Dayamaadalolle',
      firstLine: 'Eke dayamaadalolle elo swami',
      lyrics: `ಪಲ್ಲವಿ:
ಏಕೆ ದಯಮಾಡಲೊಲ್ಲೆ ಎಲೋ ಸ್ವಾಮಿ
ಮೂಕನಾಗುವರೆ ಹೀಗೆ ಮೂರು
ಲೋಕವನಾಳ್ವ ಲಕ್ಷ್ಮೀಕಾಂತ ನಮ್ಮ
ವಾಕ್ಯ ನುಡಿಗಳ ಒಲಿದು ದಯಮಾಡೊ

ಚರಣಗಳು:
೧. ಅರ್ಥವಿಲ್ಲದೆ ಬಾಳ್ವುದು ಎಲೋ ಸ್ವಾಮಿ
ವ್ಯರ್ಥವಲ್ಲವೊ ಹೀಗೆ
ಕರ್ತೃ ನಿನ್ನನು ನಾನು ಕಾಡಿ ಬೇಡುವನಲ್ಲ
ತ್ವರ್ರಿತದಲಿ ದಯಮಾಡೊ ತುಳಸಿದಳ ಪ್ರಿಯ

೨. ಮನದ ಒಳಗಿನ ಬಯಕೆಯ ಎಲೋ ಸ್ವಾಮಿ
ನಿನಗೆ ಪೇಳುವನಲ್ಲದೆ
ಬಿನುಗು ದೈವಂಗಳನ್ನು ಕಾಡಲರಿಯೆನು ನಾನು
ತನುಮನವು ನಿನ್ನದು ಒಲಿದು ದಯಮಾಡೊ

೩. ಮೂರು ಲೋಕವನಾಳುವಿ ಎಲೋ ಸ್ವಾಮಿ
ಭಾರವೆ ನಿನಗೆ ನಾನು
ಕಾರುಣ್ಯನಿಧಿವಾಸ ಉಡುಪಿಯ ಕೃಷ್ಣರಾಯ
ಧೀರ ಗಂಭೀರ ಉದಾರ ಸಲಹೆನ್ನನು`,
      transliteration: `Pallavi:
Eke dayamaadalolle elo swami
Mookanaaguvare heege mooru
Lokavanaalva lakshmeekaanta namma
Vaakya nudigala olidu dayamaado

Charanagalu:
1. Arthavillade baalvudu elo swami
Vyarthavallavo heege
Kartru ninnanu naanu kaadi beduvanalla
Tvaritadali dayamaado tulasidala priya

2. Manada olagina bayakeya elo swami
Ninage peluvanallade
Binugu daivangalannu kaadalariyenu naanu
Tanumanavu ninnadu olidu dayamaado

3. Mooru lokavanaaluvi elo swami
Bhaarave ninage naanu
Kaarunyanidhivaasa udupiya krishnaraya
Dheera gambheera udaara salahennanu`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    },
    create: {
      id,
      title: 'Eke Dayamaadalolle',
      firstLine: 'Eke dayamaadalolle elo swami',
      lyrics: `ಪಲ್ಲವಿ:
ಏಕೆ ದಯಮಾಡಲೊಲ್ಲೆ ಎಲೋ ಸ್ವಾಮಿ
ಮೂಕನಾಗುವರೆ ಹೀಗೆ ಮೂರು
ಲೋಕವನಾಳ್ವ ಲಕ್ಷ್ಮೀಕಾಂತ ನಮ್ಮ
ವಾಕ್ಯ ನುಡಿಗಳ ಒಲಿದು ದಯಮಾಡೊ

ಚರಣಗಳು:
೧. ಅರ್ಥವಿಲ್ಲದೆ ಬಾಳ್ವುದು ಎಲೋ ಸ್ವಾಮಿ
ವ್ಯರ್ಥವಲ್ಲವೊ ಹೀಗೆ
ಕರ್ತೃ ನಿನ್ನನು ನಾನು ಕಾಡಿ ಬೇಡುವನಲ್ಲ
ತ್ವರ್ರಿತದಲಿ ದಯಮಾಡೊ ತುಳಸಿದಳ ಪ್ರಿಯ

೨. ಮನದ ಒಳಗಿನ ಬಯಕೆಯ ಎಲೋ ಸ್ವಾಮಿ
ನಿನಗೆ ಪೇಳುವನಲ್ಲದೆ
ಬಿನುಗು ದೈವಂಗಳನ್ನು ಕಾಡಲರಿಯೆನು ನಾನು
ತನುಮನವು ನಿನ್ನದು ಒಲಿದು ದಯಮಾಡೊ

೩. ಮೂರು ಲೋಕವನಾಳುವಿ ಎಲೋ ಸ್ವಾಮಿ
ಭಾರವೆ ನಿನಗೆ ನಾನು
ಕಾರುಣ್ಯನಿಧಿವಾಸ ಉಡುಪಿಯ ಕೃಷ್ಣರಾಯ
ಧೀರ ಗಂಭೀರ ಉದಾರ ಸಲಹೆನ್ನನು`,
      transliteration: `Pallavi:
Eke dayamaadalolle elo swami
Mookanaaguvare heege mooru
Lokavanaalva lakshmeekaanta namma
Vaakya nudigala olidu dayamaado

Charanagalu:
1. Arthavillade baalvudu elo swami
Vyarthavallavo heege
Kartru ninnanu naanu kaadi beduvanalla
Tvaritadali dayamaado tulasidala priya

2. Manada olagina bayakeya elo swami
Ninage peluvanallade
Binugu daivangalannu kaadalariyenu naanu
Tanumanavu ninnadu olidu dayamaado

3. Mooru lokavanaaluvi elo swami
Bhaarave ninage naanu
Kaarunyanidhivaasa udupiya krishnaraya
Dheera gambheera udaara salahennanu`,
      ragaId,
      talaId,
      composerId: composer.id,
      deityId: deity.id,
      ankitaId: ankita.id
    }
  });

  const englishTranslation = `Pallavi:
Why do you refuse to show mercy, O Lord?
Will you become mute like this, O Lord
Who rules the three worlds, O Lakshmikanta!
Please be pleased with our words and utterances and show mercy!

Charanagalu:
1. To live without wealth or meaning, O Lord,
Is it not completely useless like this?
O Creator, I am not one to persistently nag and beg you,
Please show mercy swiftly, O lover of Tulasi leaves!

2. The desires held within my mind, O Lord,
Unless I express them to you,
I do not know how to pester other petty deities.
My body and mind are yours, please be pleased and show mercy!

3. You rule the three worlds, O Lord,
Am I such a burden to you?
O abode of mercy, Lord Krishna of Udupi,
O brave, majestic, and generous one, please protect me!`;
  
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
