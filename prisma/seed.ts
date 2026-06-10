import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create Ankitas
  const vittalaAn = await prisma.ankita.upsert({
    where: { name: 'Purandara Vittala' },
    update: {},
    create: { name: 'Purandara Vittala' },
  });

  const krishnaAn = await prisma.ankita.upsert({
    where: { name: 'Krishna' },
    update: {},
    create: { name: 'Krishna' },
  });

  const harihareAn = await prisma.ankita.upsert({
    where: { name: 'Hariharananda' },
    update: {},
    create: { name: 'Hariharananda' },
  });

  // Create Deities
  const vittala = await prisma.deity.upsert({
    where: { name: 'Vittala' },
    update: {},
    create: { name: 'Vittala' },
  });

  const krishna = await prisma.deity.upsert({
    where: { name: 'Krishna' },
    update: {},
    create: { name: 'Krishna' },
  });

  const lakshmi = await prisma.deity.upsert({
    where: { name: 'Lakshmi' },
    update: {},
    create: { name: 'Lakshmi' },
  });

  const narayana = await prisma.deity.upsert({
    where: { name: 'Narayana' },
    update: {},
    create: { name: 'Narayana' },
  });

  const hanuman = await prisma.deity.upsert({
    where: { name: 'Hanuman' },
    update: {},
    create: { name: 'Hanuman' },
  });

  // Create Composers
  const purandara = await prisma.composer.upsert({
    where: { id: 'purandara-dasa' },
    update: {},
    create: {
      id: 'purandara-dasa',
      name: 'Purandara Dasaru',
      biography:
        'Purandara Dasaru (1484-1564) is known as the Pitamaha (grandfather) of Carnatic music. He composed over 4,500 devotional songs and revolutionized the way music was taught and performed in South India. His Dasa Sahitya forms the backbone of Carnatic music education.',
      ankitaId: vittalaAn.id,
      timeline: '1484–1564',
      imageUrl: null,
    },
  });

  const kanaka = await prisma.composer.upsert({
    where: { id: 'kanaka-dasa' },
    update: {},
    create: {
      id: 'kanaka-dasa',
      name: 'Kanaka Dasaru',
      biography:
        'Kanaka Dasaru (1509-1609) was a great devotee and composer from Karnataka. He composed devotional songs in Kannada and was known for his intense devotion to Lord Krishna. His compositions are simple yet profound.',
      ankitaId: krishnaAn.id,
      timeline: '1509–1609',
      imageUrl: null,
    },
  });

  const vijaya = await prisma.composer.upsert({
    where: { id: 'vijaya-dasa' },
    update: {},
    create: {
      id: 'vijaya-dasa',
      name: 'Vijaya Dasaru',
      biography:
        'Vijaya Dasaru was a 16th-century Haridasa composer known for his beautiful compositions in Kannada. His songs reflect deep spiritual understanding and devotion to Krishna.',
      ankitaId: krishnaAn.id,
      timeline: '1520–1595',
      imageUrl: null,
    },
  });

  // Create compositions for Purandara Dasa
  await prisma.composition.upsert({
    where: { id: 'bhagyada-lakshmi-1' },
    update: {},
    create: {
      id: 'bhagyada-lakshmi-1',
      title: 'Bhagyada Lakshmi Baramma',
      firstLine: 'Bhagyada Lakshmi Baramma',
      lyrics:
        'Bhagyada lakshmi baramma, nammamma nee bhagyada lakshmi baramma\nSaryu janana maata varidhi hata payavali sutha, sarvabaumana sampadha sadhaka paramakamakari\nSarada kama smardhita marana mardhita parama jyoti viraja mana',
      transliteration:
        'Bhāgyada lakṣmī baramma, nammamma nē bhāgyada lakṣmī baramma',
      composerId: purandara.id,
      deityId: lakshmi.id,
      ankitaId: vittalaAn.id,
    },
  });

  await prisma.composition.upsert({
    where: { id: 'varadhana-1' },
    update: {},
    create: {
      id: 'varadhana-1',
      title: 'Sri Varadendra Purandareya',
      firstLine: 'Sri Varadendra Purandareya',
      lyrics:
        'Sri varadendra purandareya namana manidhilu nireekshite\nSuravara sampade nidhi parama pavardhanacharya',
      transliteration: 'Śrī varadendrā purandareyā namana maṇidhilu nīrīkṣitē',
      composerId: purandara.id,
      deityId: vittala.id,
      ankitaId: vittalaAn.id,
    },
  });

  // Create compositions for Kanaka Dasa
  await prisma.composition.upsert({
    where: { id: 'krishnakuruva-1' },
    update: {},
    create: {
      id: 'krishnakuruva-1',
      title: 'Krishna Kuruva',
      firstLine: 'Krishna Kuruva Mukundamukundamukundamukundakara Arupada Janardhana',
      lyrics:
        'Krishna kuruva mukundamukundamukundamukundakara arupada janardhana\nLokahita sadhanarthamu lokajana sampada sampadarthamu',
      transliteration:
        'Kṛṣṇa kuruvā mukundamukundamukundamukundakara ārupada jānardhana',
      composerId: kanaka.id,
      deityId: krishna.id,
      ankitaId: krishnaAn.id,
    },
  });

  await prisma.composition.upsert({
    where: { id: 'krishnakshete-1' },
    update: {},
    create: {
      id: 'krishnakshete-1',
      title: 'Krishna Kshetra Hanusha',
      firstLine: 'Krishna Kshetra Hanusha Ninna Vilasa',
      lyrics:
        'Krishna kshetra hanusha ninna vilasa drisyamanadol\nDristi dhyara drishta kuruvi villahila savira bhrama',
      transliteration: 'Kṛṣṇa kṣētra hanuśa ninna vilasa',
      composerId: kanaka.id,
      deityId: krishna.id,
      ankitaId: krishnaAn.id,
    },
  });

  // Create compositions for Vijaya Dasa
  await prisma.composition.upsert({
    where: { id: 'narayana-1' },
    update: {},
    create: {
      id: 'narayana-1',
      title: 'Narayana Narayana Sukha Karama',
      firstLine: 'Narayana Narayana Sukha Karama',
      lyrics:
        'Narayana narayana sukha karama sukha karamakara\nSarvajana sampadha sampadarthamu sarvasamarthana samarthana',
      transliteration: 'Nārāyaṇa nārāyaṇa sukha karama',
      composerId: vijaya.id,
      deityId: narayana.id,
      ankitaId: harihareAn.id,
    },
  });

  await prisma.composition.upsert({
    where: { id: 'hanuman-1' },
    update: {},
    create: {
      id: 'hanuman-1',
      title: 'Hanuman Jayaho',
      firstLine: 'Hanuman Jayaho Hanuman Jayaho',
      lyrics:
        'Hanuman jayaho hanuman jayaho\nPavana suthrama param teja purvaloka',
      transliteration: 'Hānuman jayaho hānuman jayaho',
      composerId: vijaya.id,
      deityId: hanuman.id,
      ankitaId: krishnaAn.id,
    },
  });

  console.log('✅ Seed data created successfully!');
  console.log('Composers: Purandara Dasa, Kanaka Dasa, Vijaya Dasa');
  console.log('Compositions: 6');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
