import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Enriching composer biographies...');

  const bioUpdates: { [key: string]: string } = {
    'purandara-dasa': 'Born Srinivasa Nayaka, he was a wealthy merchant who renounced his riches to become a wandering saint. Revered as the Pitamaha (Father) of Carnatic music, he systematized music education (creating the Sarali Varisai and Alankaras). He composed thousands of Devaranamas under the pen name "Purandara Vittala," making philosophy accessible to the masses.',
    'kanaka-dasa': 'Born Thimmappa Nayaka into a Kuruba (shepherd) family, he was a warrior-turned-saint and a disciple of Vyasatirtha. His works, such as Haribhakti Sara and Mohanatarangini, are celebrated for their philosophical depth and social reformist tone, often challenging caste hierarchies. He used the pen name "Kagineleya Adikeshava."',
    'sripadaraja': 'Often called the Dasa Pitamaha (Grandfather of the Haridasas), he was a Dvaita philosopher and the pontiff of the Mulbagal Matha. He is credited with pioneering the Suladi musical structure and composing devotional songs in Kannada to make philosophy accessible to the common person. He was the guru of Vyasatirtha.',
    'vyasatirtha': 'A towering figure in Dvaita Vedanta, he served as the Rajaguru of the Vijayanagara Empire under King Krishnadevaraya. A prolific scholar and poet, he was the mentor to both Purandara Dasa and Kanaka Dasa. He is credited with establishing 732 Hanuman temples and significantly shaping the Haridasa movement.',
    'vadiraja-tirtha': 'A renowned philosopher and pontiff of the Sode Matha, he lived for 120 years. He introduced the Paryaya system of temple administration in Udupi and authored significant works like Rukminisha Vijaya and Yuktimallika. He used the pen name "Hayavadana."',
    'vijaya-dasa': 'Considered the spiritual heir to Purandara Dasa, he was a scholar who studied in Varanasi before being initiated into the Haridasa tradition in a dream by Purandara Dasa. He composed approximately 25,000 works under the pen name "Vijaya Vittala" and is known for his profound influence on the 18th-century Bhakti movement.',
    'gopala-dasa': 'A disciple of Vijaya Dasa, he was a prolific composer and astrologer. He is famously remembered for "giving" 40 years of his life to his disciple, Jagannatha Dasa, to help him recover from a terminal illness. He composed under the pen name "Gopala Vittala."',
    'jagannatha-dasa': 'Originally a proud Sanskrit scholar named Srinivasacharya, he became a devoted Haridasa after being cured of a severe illness by Gopala Dasa. His magnum opus, Harikathamritasara, is a foundational text of Dvaita theology in Kannada. He used the pen name "Jagannatha Vittala."',
    'harapanahalli-bhimavva': 'A 19th-century saint who composed numerous devotional songs after the death of her husband. Her works, written in simple Kannada, are deeply emotional and focused on Lord Krishna. She used the pen name "Bhimesha Krishna."',
    'helavanakatte-giriyamma': 'A mystic saint who lived a life of intense devotion to Lord Ranganatha. She is known for her lyrical compositions and is often compared to Akka Mahadevi for her dedication. She composed under the pen name "Helavanakatte Ranga."'
  };

  for (const [id, bio] of Object.entries(bioUpdates)) {
    await prisma.composer.update({
      where: { id: id },
      data: { biography: bio },
    });
  }

  console.log('✅ Composer biographies enriched successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
